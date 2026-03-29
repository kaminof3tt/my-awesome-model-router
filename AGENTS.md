# AGENTS.md

Guide for AI agents working in this repository.

## Project Overview

**my-awesome-model-router** is an OpenCode plugin providing role-based model routing. It maps development tasks to specialized models (Kimi-K2.5, GLM-5, DeepSeek-V3.2, MiniMax-M2.7) optimized for domains: frontend, backend, architecture, testing, QA, debugging, documentation, refactoring, and database.

## Repository Structure

```
my-awesome-model-router/
├── index.js                    # Entry point (re-exports src/)
├── src/                        # Modular implementation
│   ├── index.js               # Main module with plugin API
│   ├── config/                # Config loading, validation, hot-reload
│   ├── skills/                # Skill discovery and YAML parsing
│   ├── routing/               # Model routing logic
│   ├── plugin/                # Plugin system and hooks
│   └── cache/                 # TTL-based cache manager
├── config.json                # Model routing configuration
├── skills/<name>/SKILL.md     # Skill definitions (auto-discovered)
├── tests/                     # Jest test files
├── .eslintrc                  # ESLint config
├── .prettierrc                # Prettier config
└── jest.config.js             # Jest configuration
```

## Build / Lint / Test Commands

```bash
npm test                      # Run all tests with coverage
npm test -- modular.test.js   # Run specific test file
npm test -- --coverage        # Run with coverage report (60% branches, 70% lines/functions)
npm test -- --watch           # Watch mode
npm run test:ci               # CI mode (coverage, max 2 workers)
```

**Lint:** ESLint config present but no `lint` script. Run manually: `npx eslint src/ tests/`

## Code Style Guidelines

### Formatting (from `.prettierrc` / `.eslintrc`)
- 2-space indentation, no tabs
- Single quotes, semicolons required
- Trailing commas in multiline (all)
- 100 char print width
- LF line endings
- No trailing spaces
- Object curly spacing: `{ key: value }`
- No spaces before function parens: `function(args)`

### Module System
- **CommonJS** only (`require` / `module.exports`)
- No ES modules (`import` / `export`)

### Naming Conventions
- **Files**: `kebab-case.js`
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Classes**: `PascalCase`

### Comments & Documentation
- Use JSDoc for module and function documentation
- Inline comments only for non-obvious logic

```javascript
/**
 * Get model configuration for agent type
 * @param {string} agentType - Agent type (frontend, backend, etc)
 * @returns {object|null} Model config or null if not found
 */
const getModelForAgent = (agentType) => {
  // Implementation
};
```

### Error Handling
- Wrap external calls (file I/O, config loading) with try/catch
- Log errors with `console.error` (allowed by eslint: `no-console: off`)
- Return `null` or sensible defaults on failure
- **Never throw from plugin entry points**

### Import Conventions
- Node.js builtins first, then third-party, then local modules
- Use relative paths (`./`, `../`)
- No dynamic imports — use `require()`

## Commit Message Format

Follow conventional commits:
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation
- `refactor:` — code refactoring
- `test:` — add/modify tests
- `chore:` — build/tooling changes

## Skill Development

When creating/modifying skills:

1. **Location**: `skills/<skill-name>/SKILL.md`
2. **Required frontmatter**:
   ```yaml
   ---
   name: skill-name
   description: Use when [trigger condition]
   ---
   ```
3. **description MUST start with "Use when"** — this is how OpenCode matches skills
4. **Required sections**: Overview, When to Use, Core Responsibilities, Model Configuration, Common Patterns

## Model Routing

| Category | Model | Use Case |
|----------|-------|----------|
| `frontend-architecture` | Kimi-K2.5 | UI components, system design |
| `requirement-implementation` | GLM-5 | Feature development, business logic |
| `bug-fix` / `debugging` | DeepSeek-V3.2 | Debugging, root cause analysis |
| `documentation` | MiniMax-M2.7 | Technical docs |
| `refactoring` | Kimi-K2.5 | Code refactoring, tech debt |
| `database` | GLM-5 | DB design, query optimization |
| `fallback` | MiniMax-M2.7 | Default for unspecified tasks |

## Key Constraints

- **No TypeScript** — pure JavaScript
- **No bundler** — files loaded directly by OpenCode
- **Plugin API** — exports `init`, `getSkills`, `getModelConfig`, async variants, and `registerPlugin`
- **Configuration-driven** — routing defined in `config.json`, not hardcoded
- **Skills auto-discovered** — scans `skills/` directory
- **Plugin system** — extensible hooks: `beforeConfigLoad`, `afterModelRouting`, etc.

## Prohibited Actions

- Adding TypeScript or transpilation tools
- Hardcoding model names in source — use `config.json`
- Committing `node_modules/` or lock files
- Removing `$schema` fields from JSON config
- Using ES modules (`import`/`export`)
