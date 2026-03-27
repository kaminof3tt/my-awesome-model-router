---
name: debugger
description: Use when investigating bugs, diagnosing issues, analyzing errors, or performing root cause analysis
---

# Debugger Skill

## Overview

**Systematic debugging skill for bug investigation, error diagnosis, and root cause analysis.**

## When to Use

- Investigating reported bugs
- Diagnosing runtime errors
- Analyzing performance issues
- Troubleshooting integration failures
- Performing root cause analysis
- Debugging production incidents

## Core Responsibilities

### Bug Investigation
- Reproduce reported issues
- Isolate problem scope
- Identify root causes
- Verify fixes
- Prevent regressions

### Error Diagnosis
- Stack trace analysis
- Log correlation
- Exception handling review
- Error pattern recognition

### Performance Debugging
- Profiling and metrics analysis
- Memory leak detection
- CPU bottleneck identification
- I/O wait analysis

### Production Issues
- Incident response
- Log analysis
- Metric correlation
- Hotfix development

## Model Configuration

**This role uses different models based on complexity:**

- **Complex debugging → DeepSeek-V3.2**: Multi-system issues, race conditions, memory leaks
- **Architecture issues → GLM-5**: Design flaws, systemic problems
- **Simple bugs → M2.7**: Typos, null checks, obvious logic errors

## Quick Reference

| Task Type | Model | Complexity |
|-----------|-------|------------|
| Race conditions | deepseekv3.2 | High |
| Memory leaks | deepseekv3.2 | High |
| Integration failures | deepseekv3.2 | High |
| Design flaws | glm-5 | High |
| Systemic issues | glm-5 | High |
| Simple logic errors | m2.7 | Low |
| Null pointer fixes | m2.7 | Low |
| Typos | m2.7 | Low |

## Debugging Process

### 1. Reproduce
```markdown
**Steps to Reproduce:**
1. [Exact steps]
2. [Include environment details]
3. [Include input data]

**Expected:** [What should happen]
**Actual:** [What happens]
**Frequency:** [Always / Intermittent / Rare]
```

### 2. Isolate
```markdown
**Isolation Checklist:**
- [ ] Minimal reproduction case?
- [ ] Specific to environment?
- [ ] Recent code change?
- [ ] Data-dependent?
- [ ] Timing-dependent?
```

### 3. Analyze
```markdown
**Root Cause:** [Description]
**Evidence:**
- [Log entries]
- [Stack traces]
- [Metric anomalies]

**Scope:** [How many components affected]
```

### 4. Fix & Verify
```markdown
**Fix:** [Description]
**Verification:**
- [ ] Original issue resolved
- [ ] No regressions introduced
- [ ] Edge cases handled
```

## Common Patterns

### Stack Trace Analysis
```javascript
// Good: Systematic approach
1. Read from bottom (root cause) to top (symptom)
2. Identify your code vs library code
3. Check recent changes in your code
4. Verify inputs at each frame
```

### Log Correlation
```javascript
// Good: Correlate logs across services
1. Find timestamp of error
2. Search all services for that timeframe
3. Look for related errors
4. Trace request ID across services
```

### Binary Search Debugging
```javascript
// Good: Narrow down the problem
1. Comment out half the code
2. Does problem persist?
3. If yes → problem in remaining half
4. If no → problem in commented half
5. Repeat until isolated
```

## Debugging Tools

### Browser
- Chrome DevTools / Firefox DevTools
- Network tab for API issues
- Console for JS errors
- Performance tab for rendering issues

### Node.js
- `node --inspect`
- `--inspect-brk` for startup issues
- `--prof` for profiling

### System
- `top` / `htop` for CPU/memory
- `strace` / `ltrace` for syscalls
- `tcpdump` / `wireshark` for network

## Common Mistakes

1. **Changing code before understanding** - Always understand first
2. **Ignoring the stack trace** - It's your best friend
3. **Not reproducing consistently** - Fix the wrong thing
4. **Assuming instead of verifying** - Check your assumptions
5. **Debugging in production** - Reproduce locally first

## Anti-Patterns

- ❌ Shotgun debugging (random changes)
- ❌ Print debugging only (use proper tools)
- ❌ Ignoring intermittent issues
- ❌ Fixing symptoms not causes
- ❌ No regression tests after fix
