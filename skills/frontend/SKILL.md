---
name: frontend-developer
description: Use when working on frontend development tasks including UI/UX implementation, component development, styling, animations, and responsive design
---

# Frontend Developer Skill

## Overview

**Frontend development skill for UI/UX implementation, component development, and styling.**

## When to Use

- Implementing UI components
- Working with CSS/styling frameworks
- Creating responsive layouts
- Adding animations and transitions
- Integrating frontend with backend APIs
- Optimizing frontend performance

## Core Responsibilities

### UI Development
- Component architecture and design
- State management
- Event handling
- Form validation
- User interaction patterns

### Styling & Design
- CSS/Tailwind/Styled-components
- Design system implementation
- Responsive design
- Accessibility (a11y)
- Cross-browser compatibility

### Integration
- API consumption and data fetching
- Authentication flows
- Real-time updates
- Error handling and loading states

## Model Configuration

**This role uses Kimi-K2.5 for:**
- Complex UI architecture decisions
- Performance optimization
- Cross-browser compatibility issues
- Advanced animation logic

**Fallback to M2.7 for:**
- Simple component modifications
- Routine styling tasks
- Documentation updates

## Quick Reference

| Task Type | Model | Notes |
|-----------|-------|-------|
| Complex UI architecture | k2.5 | Design decisions, state management |
| Performance optimization | k2.5 | Bundle analysis, lazy loading |
| Advanced animations | k2.5 | CSS animations, React spring |
| Simple components | m2.7 | Basic CRUD forms, lists |
| Styling tweaks | m2.7 | Color changes, spacing adjustments |

## Common Patterns

### Component Structure
```tsx
// Good: Clear separation of concerns
const MyComponent = ({ data, onAction }) => {
  const [state, setState] = useState(initialState);
  
  const handleAction = useCallback(() => {
    onAction(state);
  }, [state, onAction]);
  
  return (
    <div className="component">
      {/* UI elements */}
    </div>
  );
};
```

### State Management
- Use local state for component-specific data
- Use context for cross-component state
- Use external stores (Redux/Zustand) for global state

## Common Mistakes

1. **Over-engineering components** - Keep it simple
2. **Ignoring accessibility** - Always add aria labels
3. **Not handling loading states** - Show spinners/skeletons
4. **Memory leaks** - Clean up subscriptions/effects

## Anti-Patterns

- ❌ Inline styles everywhere
- ❌ Prop drilling (use context instead)
- ❌ Not memoizing expensive computations
- ❌ Ignoring error boundaries
