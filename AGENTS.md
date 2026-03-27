# AGENTS.md

Guide for AI agents working in this repository.

## Project Overview

**my-skills-plugin** is an OpenCode plugin providing role-based model routing for AI agents. It maps development tasks to specialized models optimized for domains including frontend, backend, architecture, testing, QA, debugging, documentation, refactoring, and database work.

## Repository Structure

```
my-awesome-model-router/
├── index.js                    # Plugin entry point (CommonJS)
├── my-skills-config.json       # Model routing configuration
├── skills/                     # Skill definitions
│   ├── frontend/SKILL.md       # UI/UX, components, styling
│   ├── architect/SKILL.md      # System design, architecture
│   ├── backend/SKILL.md        # API, business logic, integrations
│   ├── tester/SKILL.md         # Testing strategy, automation
│   ├── qa/SKILL.md             # Code review, quality metrics
│   ├── debugging/SKILL.md      # Debugging, root cause analysis
│   ├── documentation/SKILL.md  # Technical documentation
│   ├── refactoring/SKILL.md    # Code refactoring, tech debt
│   └── database/SKILL.md       # DB design, query optimization
├── package.json
├── README.md
└── LICENSE                     # MIT
```

## Build / Lint / Test Commands

```bash
# No build step required - pure JavaScript
npm test        # Placeholder (exits with error)
```

**Status:** No linter, formatter, or test framework configured. When adding tests, use the user-specified framework or propose one.

## Code Style Guidelines

### Module System
- **CommonJS** only (`require` / `module.exports`)
- No ES modules (`import` / `export`) - this is a Node.js plugin

### Formatting
- 2-space indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line objects/arrays

### Naming Conventions
- **Files**: `kebab-case.js`
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Classes**: `PascalCase`

### Comments & Documentation
- Use JSDoc for module and function documentation
- Inline comments only for non-obvious logic
- Keep comments concise - code should be self-explanatory

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
- Log errors with `console.error`
- Return `null` or sensible defaults on failure
- **Never throw from plugin entry points**

```javascript
try {
  const config = require('./my-skills-config.json');
  return config;
} catch (error) {
  console.error('Failed to load config:', error);
  return null;
}
```

### Import Conventions
- Group imports: Node.js builtins first, local modules second
- Use relative paths (`./`, `../`)
- No dynamic imports - use `require()`

```javascript
const fs = require('fs');
const path = require('path');
const config = require('./my-skills-config.json');
```

## Skill Development

When creating or modifying skills:

1. **Location**: `skills/<skill-name>/SKILL.md`
2. **Required frontmatter**:
   ```yaml
   ---
   name: skill-name
   description: Use when [trigger condition]
   ---
   ```
3. **description MUST start with "Use when"** - this is how OpenCode matches skills
4. **Required sections**: Overview, When to Use, Core Responsibilities, Model Configuration, Common Patterns

## Model Routing Logic

| Task Category | Model | Use Case |
|--------------|-------|----------|
| `frontend-architecture` | Kimi-K2.5 | UI components, system design, refactoring |
| `requirement-implementation` | GLM-5 | Feature development, business logic, database |
| `bug-fix` | DeepSeek-V3.2 | Debugging, error analysis |
| `debugging` | DeepSeek-V3.2 | Root cause analysis, problem diagnosis |
| `documentation` | MiniMax-M2.7 | Technical docs, API documentation |
| `refactoring` | Kimi-K2.5 | Code refactoring, technical debt |
| `database` | GLM-5 | Database design, query optimization |
| `low-difficulty` | MiniMax-M2.7 | Simple tasks |
| `fallback` | MiniMax-M2.7 | Default for unspecified tasks |

## Key Constraints

- **No TypeScript** - pure JavaScript project
- **No bundler** - files loaded directly by OpenCode
- **Plugin API** - `index.js` exports `init`, `getSkills`, `getModelConfig`
- **Configuration-driven** - model routing defined in `my-skills-config.json`, not hardcoded

## Prohibited Actions

- Adding TypeScript or transpilation tools - keep it pure JS
- Adding build tools without request
- Hardcoding model names in `index.js` - use config file
- Committing `node_modules/` or lock files
- Removing `$schema` fields from JSON config without reason
