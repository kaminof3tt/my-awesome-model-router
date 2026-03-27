---
name: architect
description: Use when making architectural decisions, designing system components, evaluating trade-offs, or planning technical strategies
---

# Architect Skill

## Overview

**Architectural decision-making and system design skill for technical leadership.**

## When to Use

- Designing new system components
- Evaluating technical trade-offs
- Planning migration strategies
- Reviewing architectural patterns
- Making technology stack decisions
- Designing API contracts and interfaces

## Core Responsibilities

### System Design
- High-level architecture design
- Component decomposition
- Service boundaries
- Data flow design
- Scalability planning

### Technical Strategy
- Technology evaluation and selection
- Migration planning
- Performance architecture
- Security architecture
- Disaster recovery planning

### Quality Attributes
- Maintainability
- Scalability
- Reliability
- Performance
- Security

## Model Configuration

**This role uses Kimi-K2.5 for:**
- Complex architectural decisions
- System design trade-offs
- Technology evaluation
- Performance optimization strategies
- Security architecture review

**Fallback to M2.7 for:**
- Simple configuration changes
- Documentation updates
- Routine architectural reviews

## Quick Reference

| Task Type | Model | Complexity |
|-----------|-------|------------|
| System design | k2.5 | High |
| Technology evaluation | k2.5 | High |
| API design | k2.5 | High |
| Performance architecture | k2.5 | High |
| Security review | k2.5 | High |
| Simple config changes | m2.7 | Low |
| Documentation | m2.7 | Low |

## Decision Framework

### 1. Requirements Analysis
```markdown
**Functional Requirements:**
- What must the system do?
- What are the success criteria?

**Non-Functional Requirements:**
- Performance targets
- Scalability needs
- Security requirements
- Compliance needs
```

### 2. Trade-off Analysis
```markdown
**Option A: [Description]**
- Pros: [Benefits]
- Cons: [Drawbacks]
- Risk: [Assessment]

**Option B: [Description]**
- Pros: [Benefits]
- Cons: [Drawbacks]
- Risk: [Assessment]

**Recommendation:** [Choice with justification]
```

### 3. Implementation Planning
```markdown
**Phase 1: [Foundation]**
- Tasks: [List]
- Duration: [Estimate]
- Dependencies: [List]

**Phase 2: [Core]**
- Tasks: [List]
- Duration: [Estimate]
- Dependencies: [Phase 1]
```

## Common Patterns

### Layered Architecture
```
Presentation → Business Logic → Data Access → Database
```

### Microservices
```
Service A ← API Gateway → Service B
     ↓                      ↓
  Database              Database
```

### Event-Driven
```
Producer → Message Queue → Consumer
```

## Quality Attributes Checklist

- [ ] **Scalability**: Can it handle 10x load?
- [ ] **Maintainability**: Can new developers understand it?
- [ ] **Reliability**: What's the failure mode?
- [ ] **Performance**: Meets latency/throughput targets?
- [ ] **Security**: Data protected at rest/transit?

## Common Mistakes

1. **Over-engineering** - Solve today's problem, not tomorrow's
2. **Ignoring trade-offs** - Every decision has a cost
3. **Not documenting decisions** - Future you won't remember
4. **Ignoring non-functional requirements** - Performance matters

## Anti-Patterns

- ❌ Big Ball of Mud (no structure)
- ❌ Golden Hammer (one solution for everything)
- ❌ Analysis Paralysis (endless evaluation)
- ❌ Resume-Driven Development (new tech for its own sake)
