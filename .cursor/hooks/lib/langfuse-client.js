/**
 * Langfuse Client Module
 *
 * Handles Langfuse SDK initialization and trace management
 * with support for sessions, scoring, and dynamic metadata.
 */

import { Langfuse } from "langfuse";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { generateTraceName, generateSessionId, generateTags } from "./utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Project root: .cursor/hooks/lib -> ../../.. = workspace root
const projectRoot = resolve(__dirname, "..", "..", "..");

function loadEnvFile() {
  const candidates = [
    resolve(projectRoot, ".env"),
    resolve(projectRoot, ".cursor", "hooks", ".env"),
    resolve(process.cwd(), ".env"),
  ];
  for (const envPath of candidates) {
    config({ path: envPath });
    if (process.env.LANGFUSE_SECRET_KEY && process.env.LANGFUSE_PUBLIC_KEY) {
      return;
    }
  }
}

loadEnvFile();

/** Langfuse cloud/self-hosted API URL (LANGFUSE_BASE_URL or LANGFUSE_HOST). */
function getLangfuseBaseUrl() {
  return (
    process.env.LANGFUSE_BASE_URL ||
    process.env.LANGFUSE_HOST ||
    "https://cloud.langfuse.com"
  );
}

export function isLangfuseConfigured() {
  return Boolean(
    process.env.LANGFUSE_SECRET_KEY && process.env.LANGFUSE_PUBLIC_KEY
  );
}

export const HOOK_HANDLER_VERSION = "1.2.0";

let langfuseInstance = null;

export function getLangfuseClient() {
  if (!isLangfuseConfigured()) {
    throw new Error(
      "Langfuse keys missing. Add LANGFUSE_SECRET_KEY and LANGFUSE_PUBLIC_KEY to .env at the project root."
    );
  }
  if (!langfuseInstance) {
    langfuseInstance = new Langfuse({
      secretKey: process.env.LANGFUSE_SECRET_KEY,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY,
      baseUrl: getLangfuseBaseUrl(),
      release: HOOK_HANDLER_VERSION,
    });
  }
  return langfuseInstance;
}

function resolveTraceId(input) {
  return (
    input.conversation_id ||
    input.session_id ||
    (input.generation_id ? `cursor-gen-${input.generation_id}` : null)
  );
}

export function getOrCreateTrace(input, customName = null) {
  const langfuse = getLangfuseClient();
  const sessionId = generateSessionId(input.workspace_roots);
  const traceName =
    customName ||
    generateTraceName(input.prompt, input.model) ||
    `${input.hook_event_name || "Cursor"} - ${input.model || "Agent"}`;
  const tags = generateTags(input.hook_event_name, input);

  const traceId = resolveTraceId(input);
  if (!traceId) {
    throw new Error(
      "Cannot create Langfuse trace: missing conversation_id (and no session_id fallback)."
    );
  }

  return langfuse.trace({
    id: traceId,
    name: traceName,
    sessionId: sessionId,
    userId: input.user_email || undefined,
    release: HOOK_HANDLER_VERSION,
    version: input.cursor_version,
    metadata: {
      cursor_version: input.cursor_version,
      model: input.model,
      workspace_roots: input.workspace_roots,
      generation_id: input.generation_id,
    },
    tags: tags,
  });
}

export function addTagsToTrace(trace, newTags) {
  if (trace && newTags && newTags.length > 0) {
    trace.update({ tags: newTags });
  }
}

export function addScore(
  trace,
  name,
  value,
  comment = null,
  dataType = "NUMERIC"
) {
  if (trace) {
    trace.score({ name, value, comment, dataType });
  }
}

export function addCompletionScores(trace, input) {
  let statusScore = 0;
  let statusComment = "";

  switch (input.status) {
    case "completed":
      statusScore = 1;
      statusComment = "Agent completed successfully";
      break;
    case "aborted":
      statusScore = 0.5;
      statusComment = "Agent was aborted by user";
      break;
    case "error":
      statusScore = 0;
      statusComment = "Agent encountered an error";
      break;
    default:
      statusScore = 0.5;
      statusComment = `Unknown status: ${input.status}`;
  }

  addScore(trace, "completion_status", statusScore, statusComment);

  // Efficiency score: fewer loops = higher score (10+ loops = 0)
  if (typeof input.loop_count === "number") {
    const efficiencyScore = Math.max(0, 1 - input.loop_count / 10);
    addScore(
      trace,
      "efficiency",
      efficiencyScore,
      `Completed in ${input.loop_count} loops`
    );
  }
}

export async function flushLangfuse() {
  const langfuse = getLangfuseClient();
  await langfuse.flushAsync();
}

export async function shutdownLangfuse() {
  const langfuse = getLangfuseClient();
  await langfuse.shutdownAsync();
}
