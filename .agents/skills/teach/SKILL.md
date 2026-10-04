---
name: teach
description: Teach the user a new skill or concept, within this workspace.
disable-model-invocation: true
argument-hint: "What would you like to learn about?"
---
Caveman format:

The user has asked you to teach them something. Stateful request — they intend to learn topic over multiple sessions.

## Teaching Workspace

Treat current directory as teaching workspace. Learning state captured in several files:

- `MISSION.md`: Document capturing the _reason_ the user is interested in the topic. Grounds all teaching. Use format in [MISSION-FORMAT.md](./MISSION-FORMAT.md).
- `./reference/*.html`: Reference materials — compressed learnings from lessons: cheat sheets, reference algorithms, syntax, yoga poses, glossaries. Raw units of learning. Should print well, designed for quick reference.
- `RESOURCES.md`: List of resources to ground teaching in contextual knowledge, or acquire knowledge + wisdom. Use format in [RESOURCES-FORMAT.md](./RESOURCES-FORMAT.md).
- `./learning-records/*.md`: Learning records — capture what user has learned. Like architectural decision records — capture non-obvious lessons + key insights, may be revised later or drive future sessions. Use to calculate zone of proximal development. Titled `0001-<dash-case-name>.md`, number increments each time. Use format in [LEARNING-RECORD-FORMAT.md](./LEARNING-RECORD-FORMAT.md).
- `./lessons/*.html`: Directory of lessons. A **lesson** is single, self-contained HTML output teaching one tightly-scoped thing tied to mission. Primary unit of teaching in workspace.
- `./assets/*`: Reusable **components** shared across lessons. See [Assets](#assets).
- `NOTES.md`: Scratchpad for user preferences or working notes.

## Philosophy

Deep learning needs three things:

- **Knowledge**, captured from high-quality, high-trust resources
- **Skills**, acquired through highly-relevant interactive lessons devised by you, based on knowledge
- **Wisdom**, from interacting with other learners + practitioners

Before `RESOURCES.md` well-populated, focus on finding high-quality resources for knowledge acquisition. Never trust parametric knowledge.

Some topics need more skills than knowledge. Theoretical physics more knowledge-based. Yoga more skills-based.

### Fluency vs Storage Strength

Split two types of learning:

- **Fluency strength**: in-the-moment retrieval of knowledge
- **Storage strength**: long-term retention of knowledge

Fluency gives illusory sense of mastery; storage strength is real goal. Design lessons building long-term retention via desirable difficulty:

- Retrieval practice (recall from memory)
- Spacing (distributing practice over time)
- Interleaving (mixing different but related topics in practice — skills practice only)

## Lessons

Lesson is main output — unit where knowledge + skills reach user. Each lesson = one self-contained HTML file, saved to `./lessons/`, titled `0001-<dash-case-name>.html`, number increments each time.

Lesson should be **beautiful** — clean, readable typography + layout — user returns later to review. Think Tufte.

Lesson short, completable very quickly. Learners' working memory very small — stay within it. Each lesson gives one tangible win to build on. Directly tied to mission, in user's zone of proximal development.

If possible, open lesson file for user via CLI command.

Each lesson links via HTML anchors to other lessons + reference documents.

Each lesson recommends a primary source to read or watch — the most high-quality, high-trust resource found on topic.

Each lesson contains reminder to ask agent followup questions. Agent is teacher, assists with anything unclear.

## Assets

Lessons built from reusable **components**, stored in `./assets/`: stylesheets, quiz widgets, simulators, diagram helpers — anything a second lesson could reuse.

Reuse is default, not exception. Before authoring lesson, read `./assets/`, build from components already there. New reusable need → write as component in `./assets/`, link to it — never inline code a future lesson would duplicate.

Shared stylesheet = first component every workspace earns: every lesson links it, so lessons look like one consistent course, not pile of one-offs. Workspace grows → component library grows.

## The Mission

Every lesson tied to mission — the reason user interested in topic.

If mission unclear or `MISSION.md` not populated, first job: question user on why they want to learn this.

Without mission, knowledge acquisition not grounded in real-world goals. Lessons feel too abstract. No way to judge what user should do next.

Missions may change as user develops skills + knowledge. Normal — update `MISSION.md` + add learning record to capture change. Confirm with user before changing mission.

## Zone Of Proximal Development

Each lesson, user should feel challenged 'just enough'.

User may specify exact thing to learn. If not, figure out zone of proximal development by:

- Reading `learning-records`
- Finding right thing to teach based on mission
- Teaching most relevant thing that fits in zone of proximal development

## Knowledge

Design lessons around a skill user will learn. Include only knowledge required to acquire that skill. Teach knowledge first, then user practices skills via interactive feedback loop.

Gather knowledge from trusted resources first. Track them in `RESOURCES.md`. Litter lessons with citations — links to external resources backing every claim. Increases lesson trustworthiness.

For knowledge acquisition, difficulty is enemy. Eats working memory needed for understanding.

## Skills

Knowledge = acquisition; skills = durability + flexibility. Make knowledge stick.

For skill acquisition, difficulty is tool. Effortful retrieval builds storage strength. Teach skills via interactive lessons. Tools at your disposal:

- Interactive lessons, using quizzes + light in-browser tasks
- Lessons guiding user through list of real-world steps (for instance, yoga poses)

Each based on a **feedback loop**: user receives feedback on performance. Loop as tight as possible — feedback immediate, ideally automatic.

For quizzes, each answer exactly same number of words (and characters, if possible). No clues about answer via formatting.

## Acquiring Wisdom

Wisdom from true real-world interaction — testing skills outside learning environment.

User asks question requiring wisdom: default posture — attempt to answer, but ultimately delegate to a **community**.

Community = place (online or offline) where user tests skills in real world: forum, subreddit, real-world class (budget permitting), or local interest group.

Find high-reputation communities user can join. If user doesn't want to join, respect it.

## Reference Documents

While creating lessons, also create reference documents. Lessons can reference them — track raw units of knowledge useful across lessons.

Lessons rarely revisited later — reference documents will be. They should be compressed essence of lesson, format designed for quick reference.

Some topics lend themselves to reference:

- Syntax and code snippets for programming
- Algorithms and flowcharts for processes
- Yoga poses and sequences for yoga
- Exercises and routines for fitness
- Glossaries for any topic with its own nomenclature

Glossaries, in particular, essential reference. Once created, adhere to in every lesson.

## `NOTES.md`

User sometimes expresses preferences on how taught, or things to keep in mind. Record those preferences here; refer back when designing lessons or working with user.