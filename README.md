# My Awesome Model Router for OpenCode

A custom skills plugin that provides role-based model selection for different development tasks.

## Features

- **Role-based skills**: Frontend, Backend, Architecture, Testing, QA, Debugging, Documentation, Refactoring, Database
- **Intelligent model routing**: Automatically selects the best model for each task
- **Modular architecture**: Clean separation of concerns (config, skills, routing, plugin, cache)
- **Plugin system**: Extensible hook system for third-party extensions
- **Skills auto-discovery**: Scans skills/ directory and loads skills from SKILL.md frontmatter
- **Config hot-reload**: Automatic reload when config.json changes via file watcher
- **Config validation**: Validates modelProviders, agents, categories, and skills references
- **Fallback chains**: Primary -> secondary -> fallback model selection
- **Async API**: All core functions have async versions for better performance
- **Testing**: Comprehensive test coverage with Jest (70% threshold)
- **Code quality**: ESLint + Prettier + EditorConfig

## Model Routing Strategy

| Task Type | Model | Use Case |
|-----------|-------|----------|
| Frontend | Kimi-K2.5 | UI components, responsive design |
| Architecture | Kimi-K2.5 | System design, architecture decisions |
| Refactoring | Kimi-K2.5 | Code restructuring, technical debt reduction |
| Requirement Implementation | GLM-5 | Feature development, business logic |
| Database | GLM-5 | Schema design, query optimization |
| Bug Investigation | DeepSeek-V3.2 | Bug fixing, error analysis |
| Debugging | DeepSeek-V3.2 | Root cause analysis, diagnostics |
| Documentation | MiniMax-M2.7 | Technical docs, API documentation |
| Low Difficulty Tasks | MiniMax-M2.7 | Simple tasks, routine work |
| Fallback | MiniMax-M2.7 | Default for unspecified tasks |

## Installation

### From GitHub

Add to your `opencode.json`:

```json
{
  "plugin": [
    "my-awesome-model-router@git+https://github.com/kaminof3tt/my-awesome-model-router.git"
  ]
}
```

### From npm (if published)

```bash
npm install my-awesome-model-router
```

Then add to your `opencode.json`:

```json
{
  "plugin": [
    "my-awesome-model-router"
  ]
}
```

## Usage

### Using Skills

Skills are automatically loaded when you use the `task()` tool with the appropriate `category` or `subagent_type`:

```typescript
// Frontend task - uses Kimi-K2.5
task(category="frontend-architecture", prompt="Create a responsive navbar component")

// Architecture task - uses Kimi-K2.5
task(subagent_type="architect", prompt="Design a microservices architecture")

// Refactoring task - uses Kimi-K2.5
task(category="refactoring", prompt="Extract duplicate code into shared utility functions")

// Backend task - uses GLM-5
task(subagent_type="backend", prompt="Implement user authentication API")

// Database task - uses GLM-5
task(category="database", prompt="Design database schema for e-commerce system")

// Bug investigation - uses DeepSeek-V3.2
task(category="bug-fix", prompt="Investigate login authentication failure")

// Debugging task - uses DeepSeek-V3.2
task(subagent_type="debugger", prompt="Diagnose memory leak in production server")

// Documentation task - uses MiniMax-M2.7
task(category="documentation", prompt="Write API documentation for user endpoints")

// Simple task - uses MiniMax-M2.7
task(category="low-difficulty", prompt="Update README documentation")
```

### Plugin API

```javascript
const plugin = require('my-awesome-model-router');

// Initialize plugin
await plugin.init();

// Get available skills
const skills = plugin.getSkills();
const skillsAsync = await plugin.getSkillsAsync();

// Get model configuration
const config = plugin.getModelConfig();

// Get model with fallback
const model = plugin.getModelWithFallback('frontend', 'implement UI');

// Register custom plugin
plugin.registerPlugin('my-plugin', {
  init(api, options) { /* ... */ },
  hooks: {
    beforeModelRouting: (data) => data,
    afterModelRouting: (data) => data
  },
  cleanup() { /* ... */ }
});

// Get routing debug info
const debug = plugin.getRoutingDebugInfo('frontend', 'implement UI');

// Get statistics
const stats = plugin.getStats();
```

### Available Hooks

- `beforeConfigLoad` / `afterConfigLoad`
- `beforeSkillDiscovery` / `afterSkillDiscovery`
- `beforeModelRouting` / `afterModelRouting`
- `onConfigChange` / `onSkillsChange`

## Configuration

The plugin uses `config.json` for model routing configuration:

```json
{
  "modelProviders": {
    "k2.5": "volcengine-plan/kimi-k2.5",
    "glm5": "volcengine-plan/glm-5",
    "deepseekv3.2": "baiduqianfancodingplan/deepseek-v3.2",
    "m2.7": "minimax-cn-coding-plan/MiniMax-M2.7"
  },
  "agents": {
    "frontend": { "model": "k2.5", "skills": ["frontend-developer"] },
    "backend": { "model": "glm5", "skills": ["backend-developer"] }
  },
  "categoryKeywords": {
    "frontend-architecture": ["frontend", "ui", "component"],
    "bug-fix": ["bug", "fix", "error"]
  },
  "fallbackChains": {
    "frontend": ["k2.5", "glm5", "m2.7"],
    "default": ["m2.7"]
  }
}
```

## Development

### Prerequisites

- Node.js >= 14
- npm

### Setup

```bash
git clone https://github.com/kaminof3tt/my-awesome-model-router.git
cd my-awesome-model-router
npm install
```

### Testing

```bash
npm test                    # Run all tests with coverage
npm test -- modular.test.js # Run specific test file
npm test -- --watch         # Watch mode
npm run test:ci             # CI mode
```

### Linting

```bash
npx eslint src/ tests/
```

## Project Structure

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
├── jest.config.js             # Jest configuration
├── .eslintrc                  # ESLint config
├── .prettierrc                # Prettier config
└── .editorconfig              # Editor config
```

## Skills Included

| Skill | Description |
|-------|-------------|
| frontend-developer | UI components, styling, responsive design |
| architect | System design, architecture decisions |
| backend-developer | API development, business logic |
| tester | Test strategy, test automation |
| qa-engineer | Code review, quality metrics |
| debugger | Root cause analysis, diagnostics |
| documenter | Technical documentation |
| refactoring-specialist | Code restructuring, tech debt |
| database-specialist | DB design, query optimization |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.
