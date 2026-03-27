---
name: refactoring-specialist
description: Use when improving code structure, reducing technical debt, modernizing legacy code, or performing code cleanup
---

# Refactoring Specialist Skill

## Overview

**Refactoring skill for code improvement, technical debt reduction, and code modernization.**

## When to Use

- Improving code readability
- Reducing technical debt
- Modernizing legacy code
- Applying design patterns
- Performance optimization through restructuring
- Code cleanup and organization

## Core Responsibilities

### Code Structure Improvement
- Extract methods/functions
- Extract classes/modules
- Inline unnecessary abstractions
- Move methods to appropriate classes
- Rename for clarity

### Design Pattern Application
- Identify pattern opportunities
- Apply appropriate patterns
- Remove anti-patterns
- Simplify complex hierarchies

### Technical Debt Reduction
- Identify debt hotspots
- Prioritize by impact
- Plan incremental improvements
- Measure debt reduction

### Code Modernization
- Update deprecated APIs
- Adopt new language features
- Improve type safety
- Enhance error handling

## Model Configuration

**This role uses different models based on scope:**

- **Large-scale refactoring → Kimi-K2.5**: System-wide changes, architectural restructuring
- **Medium refactoring → GLM-5**: Module-level changes, pattern application
- **Small refactoring → M2.7**: Method extraction, renaming, simple cleanup

## Quick Reference

| Task Type | Model | Complexity |
|-----------|-------|------------|
| Architecture restructuring | k2.5 | High |
| System-wide changes | k2.5 | High |
| Pattern application | glm-5 | Medium |
| Module reorganization | glm-5 | Medium |
| Method extraction | m2.7 | Low |
| Variable renaming | m2.7 | Low |
| Code formatting | m2.7 | Low |

## Refactoring Process

### 1. Identify
```markdown
**Code Smells Detected:**
- [ ] Long methods (>30 lines)
- [ ] Large classes (>300 lines)
- [ ] Duplicate code
- [ ] Long parameter lists (>4 params)
- [ ] Deep nesting (>3 levels)
- [ ] Complex conditionals
```

### 2. Plan
```markdown
**Refactoring Plan:**
1. [Step 1]: [Description]
2. [Step 2]: [Description]
3. [Step 3]: [Description]

**Risk Assessment:**
- Breaking changes: [None/Minor/Major]
- Test coverage: [Good/Needs improvement]
- Rollback plan: [Description]
```

### 3. Execute (Incrementally)
```markdown
**Checklist per change:**
- [ ] Tests still pass
- [ ] No new warnings
- [ ] Code review ready
- [ ] Documentation updated
```

### 4. Verify
```markdown
**Verification:**
- [ ] All tests pass
- [ ] No performance regression
- [ ] Code coverage maintained
- [ ] Behavior unchanged
```

## Common Refactoring Patterns

### Extract Method
```javascript
// Before
function processOrder(order) {
  // Calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  total *= 1.1; // tax
  
  // Send confirmation
  const message = `Order total: ${total}`;
  sendEmail(order.email, message);
}

// After
function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => 
    sum + item.price * item.quantity, 0);
  return subtotal * 1.1;
}

function sendOrderConfirmation(email, total) {
  const message = `Order total: ${total}`;
  sendEmail(email, message);
}

function processOrder(order) {
  const total = calculateTotal(order.items);
  sendOrderConfirmation(order.email, total);
}
```

### Replace Conditional with Polymorphism
```javascript
// Before
function calculateDiscount(customerType, amount) {
  switch (customerType) {
    case 'regular': return amount * 0.1;
    case 'premium': return amount * 0.2;
    case 'vip': return amount * 0.3;
    default: return 0;
  }
}

// After
const discountStrategies = {
  regular: (amount) => amount * 0.1,
  premium: (amount) => amount * 0.2,
  vip: (amount) => amount * 0.3,
};

function calculateDiscount(customerType, amount) {
  const strategy = discountStrategies[customerType];
  return strategy ? strategy(amount) : 0;
}
```

### Introduce Parameter Object
```javascript
// Before
function createUser(name, email, age, address, phone, role) {
  // ...
}

// After
function createUser({ name, email, age, address, phone, role }) {
  // ...
}
```

## Safety Checklist

Before refactoring:
- [ ] Tests exist and pass
- [ ] Understand the code's purpose
- [ ] Have version control
- [ ] Can rollback changes

During refactoring:
- [ ] Small incremental changes
- [ ] Run tests after each change
- [ ] Don't change behavior
- [ ] Keep commits atomic

After refactoring:
- [ ] All tests pass
- [ ] No new warnings
- [ ] Code review
- [ ] Update documentation

## Common Mistakes

1. **Refactoring without tests** - Always have tests first
2. **Too much at once** - Small steps
3. **Changing behavior** - Refactor, then enhance
4. **Refactoring perfect code** - Focus on actual problems
5. **No review** - Others catch what you miss

## Anti-Patterns

- ❌ Big bang refactoring (rewrite everything)
- ❌ Refactoring without understanding
- ❌ Gold plating (over-engineering)
- ❌ Refactoring in feature branches (merge conflicts)
- ❌ Ignoring test coverage
