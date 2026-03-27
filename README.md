# My Skills Plugin for OpenCode

A custom skills plugin that provides role-based model selection for different development tasks.

## Features

- **Role-based skills**: Frontend, Backend, Architecture, Testing, QA, Debugging, Documentation, Refactoring, Database
- **Intelligent model routing**: Automatically selects the best model for each task
- **Easy installation**: Install from GitHub or npm
- **Configurable**: Customize model mappings and task types

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

### 前置依赖

本插件依赖 **superpowers** 插件。请确保在 `opencode.json` 中先配置 superpowers 插件：

```json
{
  "plugin": [
    "superpowers",
    "my-skills@git+https://github.com/kaminof3tt/my-awesome-model-router.git"
  ]
}
```

**注意**：插件加载顺序很重要。`plugin` 数组中靠前的插件会先加载。

### From GitHub

Add to your `opencode.json`:

```json
{
  "plugin": [
    "superpowers",
    "my-skills@git+https://github.com/kaminof3tt/my-awesome-model-router.git"
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

## Configuration

### Basic Configuration

The plugin automatically configures model routing based on task type. No additional configuration is needed for basic usage.

### Custom Configuration

To customize the model routing, create a `my-awesome-model-router-config.json` file in your OpenCode config directory:

```json
{
  "modelProviders": {
    "k2.5": "volcengine-plan/kimi-k2.5",
    "glm5": "volcengine-plan/glm-5",
    "deepseekv3.2": "baiduqianfancodingplan/deepseek-v3.2",
    "m2.7": "minimax-cn-coding-plan/MiniMax-M2.7"
  },
  "agents": {
    "frontend": {
      "model": "k2.5",
      "skills": ["frontend-developer"]
    },
    "architect": {
      "model": "k2.5",
      "skills": ["architect"]
    },
    "backend": {
      "model": "glm5",
      "skills": ["backend-developer"]
    },
    "tester": {
      "model": "deepseekv3.2",
      "skills": ["tester"]
    },
    "qa": {
      "model": "deepseekv3.2",
      "skills": ["qa-engineer"]
    },
    "debugger": {
      "model": "deepseekv3.2",
      "skills": ["debugger"]
    },
    "documenter": {
      "model": "m2.7",
      "skills": ["documenter"]
    },
    "refactoring-specialist": {
      "model": "k2.5",
      "skills": ["refactoring-specialist"]
    },
    "database-specialist": {
      "model": "glm5",
      "skills": ["database-specialist"]
    }
  }
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

### Model Selection Logic

The plugin uses the following logic to select models:

1. **Explicit category**: If you specify a `category`, the plugin uses the model configured for that category
2. **Agent type**: If you specify a `subagent_type`, the plugin uses the model configured for that agent
3. **Task keywords**: The plugin analyzes task keywords to determine the best model
4. **Fallback**: If no match is found, the plugin uses the fallback model (MiniMax-M2.7)

## Skills Included

### Frontend Developer
- UI component development
- Styling and responsive design
- Frontend performance optimization

### Architect
- System design and architecture
- Technology evaluation
- Technical strategy planning

### Backend Developer
- API development
- Business logic implementation
- Server-side integration

### Tester
- Test strategy design
- Test implementation
- Test automation

### QA Engineer
- Code review
- Quality metrics
- Process improvement

### Debugger
- Root cause analysis
- Error diagnosis
- Production incident troubleshooting

### Documenter
- Technical documentation
- API documentation
- Code comments

### Refactoring Specialist
- Code structure improvement
- Technical debt reduction
- Code modernization

### Database Specialist
- Database schema design
- Query optimization
- Migration planning

## Customization

### Adding New Skills

1. Create a new directory in `skills/`:
   ```bash
   mkdir skills/my-new-skill
   ```

2. Create a `SKILL.md` file:
   ```markdown
   ---
   name: my-new-skill
   description: Use when [triggering conditions]
   ---
   
   # My New Skill
   
   ## Overview
   [Description]
   
   ## When to Use
   [Usage guidelines]
   ```

3. Update the configuration in `my-awesome-model-router-config.json`

### Modifying Model Mappings

Edit the `my-awesome-model-router-config.json` file to change which models are used for different task types:

```json
{
  "categories": {
    "my-custom-category": {
      "model": "my-preferred-model",
      "description": "Custom task category"
    }
  }
}
```

## Troubleshooting

### Plugin Not Loading

1. Check that the plugin is listed in your `opencode.json`
2. Verify the GitHub URL is correct
3. Check the OpenCode logs for errors
4. **确保 superpowers 插件已加载** - 本插件依赖 superpowers 插件，请检查：
   - `opencode.json` 中是否包含 `superpowers` 插件
   - superpowers 插件是否在 my-awesome-model-router 之前配置
   - 控制台是否输出警告信息 `[my-awesome-model-router] 警告: superpowers 插件未加载`

### Skills Not Working

1. Ensure the `SKILL.md` file has correct frontmatter
2. Check that the skill description includes "Use when..."
3. Verify the skill directory structure

### Model Not Selecting Correctly

1. Check the model provider configuration in `opencode.json`
2. Verify the model names match exactly
3. Check the task keywords in your prompt

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check the OpenCode documentation
- Review the troubleshooting section