# My Skills Plugin for OpenCode

A custom skills plugin that provides role-based model selection for different development tasks.

## Features

- **Role-based skills**: Frontend, Backend, Architecture, Testing, QA
- **Intelligent model routing**: Automatically selects the best model for each task
- **Easy installation**: Install from GitHub or npm
- **Configurable**: Customize model mappings and task types

## Model Routing Strategy

| Task Type | Model | Use Case |
|-----------|-------|----------|
| Frontend & Architecture | Kimi-K2.5 | UI components, system design |
| Requirement Implementation | GLM-5 | Feature development, business logic |
| Bug Investigation | DeepSeek-V3.2 | Debugging, error analysis |
| Low Difficulty Tasks | MiniMax-M2.7 | Simple tasks, documentation |
| Fallback | MiniMax-M2.7 | Default for unspecified tasks |

## Installation

### From GitHub

Add to your `opencode.json`:

```json
{
  "plugin": [
    "my-skills@git+https://github.com/your-username/my-skills-plugin.git"
  ]
}
```

### From npm (if published)

```bash
npm install my-skills-plugin
```

Then add to your `opencode.json`:

```json
{
  "plugin": [
    "my-skills-plugin"
  ]
}
```

## Configuration

### Basic Configuration

The plugin automatically configures model routing based on task type. No additional configuration is needed for basic usage.

### Custom Configuration

To customize the model routing, create a `my-skills-config.json` file in your OpenCode config directory:

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

// Bug investigation - uses DeepSeek-V3.2
task(category="bug-fix", prompt="Investigate login authentication failure")

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
- Database design
- Business logic implementation

### Tester
- Test strategy design
- Test implementation
- Bug investigation

### QA Engineer
- Code review
- Quality metrics
- Process improvement

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

3. Update the configuration in `my-skills-config.json`

### Modifying Model Mappings

Edit the `my-skills-config.json` file to change which models are used for different task types:

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