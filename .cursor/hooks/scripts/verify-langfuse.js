#!/usr/bin/env node
/**
 * Sends a test trace to Langfuse. Run from repo root:
 *   npm run test:langfuse --prefix .cursor/hooks
 */
import { getLangfuseClient, flushLangfuse, isLangfuseConfigured } from '../lib/langfuse-client.js';

if (!isLangfuseConfigured()) {
  console.error('Missing LANGFUSE_SECRET_KEY or LANGFUSE_PUBLIC_KEY in project .env');
  process.exit(1);
}

const id = `cursor-hook-verify-${Date.now()}`;
const lf = getLangfuseClient();
lf.trace({ id, name: 'Cursor hook verify', sessionId: 'cursor-verify' }).generation({
  name: 'ping',
  input: 'verify-langfuse.js',
});
await flushLangfuse();
console.log(`Sent test trace "${id}". Check Langfuse UI (Traces).`);
