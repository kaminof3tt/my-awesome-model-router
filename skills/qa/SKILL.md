---
name: qa-engineer
description: Use when performing quality assurance tasks including code review, quality metrics analysis, and process improvement
---

# QA Engineer Skill

## Overview

**Quality assurance skill for code review, quality metrics, and process improvement.**

## When to Use

- Performing code reviews
- Analyzing quality metrics
- Improving development processes
- Ensuring compliance with standards
- Conducting quality audits
- Implementing quality gates

## Core Responsibilities

### Code Review
- Code quality assessment
- Security vulnerability detection
- Performance bottleneck identification
- Best practices enforcement
- Documentation completeness

### Quality Metrics
- Code coverage analysis
- Technical debt assessment
- Bug density tracking
- Performance metrics
- Security vulnerability tracking

### Process Improvement
- Development workflow optimization
- Quality gate implementation
- Automation strategy
- Team training and mentoring

## Model Configuration

**This role uses different models based on task type:**

- **Complex review → GLM-5**: Architecture review, security analysis
- **Bug analysis → DeepSeek-V3.2**: Defect investigation, root cause analysis
- **Routine checks → M2.7**: Simple code reviews, documentation checks

## Quick Reference

| Task Type | Model | Complexity |
|-----------|-------|------------|
| Architecture review | glm-5 | High |
| Security analysis | glm-5 | High |
| Performance analysis | glm-5 | High |
| Defect investigation | deepseekv3.2 | High |
| Root cause analysis | deepseekv3.2 | High |
| Simple code review | m2.7 | Low |
| Documentation check | m2.7 | Low |
| Configuration review | m2.7 | Low |

## Code Review Checklist

### Functionality
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] Input validation is present

### Code Quality
- [ ] Code is readable and maintainable
- [ ] Functions are small and focused
- [ ] No code duplication
- [ ] Proper naming conventions

### Security
- [ ] No hardcoded credentials
- [ ] Input is sanitized
- [ ] SQL injection prevention
- [ ] XSS protection

### Performance
- [ ] No unnecessary database queries
- [ ] Proper indexing
- [ ] Caching where appropriate
- [ ] No memory leaks

### Documentation
- [ ] Code is well-commented
- [ ] API documentation is complete
- [ ] README is updated
- [ ] Change log is updated

## Quality Metrics

### Code Coverage
```markdown
**Target:** 80% line coverage
**Current:** [X]%
**Trend:** [↑/↓/→]

**Uncovered Areas:**
- [Module 1]: [Reason]
- [Module 2]: [Reason]
```

### Technical Debt
```markdown
**Debt Ratio:** [X]%
**High Priority Items:**
1. [Item 1] - [Impact]
2. [Item 2] - [Impact]

**Estimated Effort:** [X] days
```

### Bug Density
```markdown
**Bugs per KLOC:** [X]
**Severity Distribution:**
- Critical: [X]
- High: [X]
- Medium: [X]
- Low: [X]
```

## Quality Gates

### Pre-Commit
- [ ] Code compiles
- [ ] Unit tests pass
- [ ] No lint errors
- [ ] Code formatted

### Pre-Merge
- [ ] All tests pass
- [ ] Code review approved
- [ ] No merge conflicts
- [ ] Documentation updated

### Pre-Release
- [ ] Integration tests pass
- [ ] Performance tests pass
- [ ] Security scan clean
- [ ] Release notes ready

## Code Review Process

### 1. Preparation
```markdown
**Before Review:**
- Understand the context
- Read related tickets
- Check for similar changes
- Review test coverage
```

### 2. Review
```markdown
**Review Focus:**
- Correctness
- Readability
- Performance
- Security
- Maintainability
```

### 3. Feedback
```markdown
**Feedback Style:**
- Be constructive
- Explain why, not just what
- Offer solutions
- Acknowledge good code
```

## Common Issues

### Code Smells
- **Long Methods** → Break into smaller functions
- **Large Classes** → Single Responsibility Principle
- **Duplicate Code** → Extract common functionality
- **Complex Conditionals** → Use strategy pattern

### Security Issues
- **SQL Injection** → Use parameterized queries
- **XSS** → Sanitize output
- **Hardcoded Secrets** → Use environment variables
- **Weak Validation** → Validate all input

### Performance Issues
- **N+1 Queries** → Use JOIN FETCH
- **Missing Indexes** → Add appropriate indexes
- **No Caching** → Implement caching strategy
- **Memory Leaks** → Proper resource cleanup

## Improvement Strategies

### Automation
```markdown
**Automate:**
- Code formatting
- Lint checks
- Test execution
- Security scans
- Performance tests
```

### Training
```markdown
**Training Topics:**
- Clean code principles
- Security best practices
- Performance optimization
- Testing strategies
```

### Metrics Tracking
```markdown
**Track:**
- Code coverage trends
- Bug density trends
- Technical debt trends
- Review turnaround time
```

## Common Mistakes

1. **Reviewing too much at once** - Keep reviews small and focused
2. **Being too harsh** - Be constructive, not critical
3. **Focusing only on style** - Check logic and security too
4. **Not following up** - Ensure feedback is addressed
5. **No metrics** - Track quality trends over time

## Anti-Patterns

- ❌ Rubber Stamp (approving without review)
- ❌ Nitpicking (focusing on trivial issues)
- ❌ Gatekeeping (blocking without guidance)
- ❌ Perfectionism (demanding perfect code)
