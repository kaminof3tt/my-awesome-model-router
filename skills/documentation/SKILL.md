---
name: documenter
description: Use when writing technical documentation, API docs, README files, architecture docs, or code comments
---

# Documenter Skill

## Overview

**Technical documentation skill for API docs, architecture docs, READMEs, and code documentation.**

## When to Use

- Writing API documentation
- Creating README files
- Documenting architecture decisions
- Writing code comments
- Creating user guides
- Maintaining changelogs

## Core Responsibilities

### API Documentation
- Endpoint descriptions
- Request/response schemas
- Authentication guides
- Error code references
- Usage examples

### Architecture Documentation
- System overview diagrams
- Component descriptions
- Data flow documentation
- Decision records (ADRs)
- Deployment guides

### Code Documentation
- Function/method comments
- Module descriptions
- Inline comments for complex logic
- Type definitions

### User Documentation
- Getting started guides
- Tutorials
- FAQ sections
- Troubleshooting guides

## Model Configuration

**This role uses MiniMax-M2.7 for:**
- Most documentation tasks
- Standard format docs
- README updates
- Code comments

**Fallback to GLM-5 for:**
- Complex architecture docs
- Multi-system integration docs
- Security documentation

## Quick Reference

| Task Type | Model | Complexity |
|-----------|-------|------------|
| README updates | m2.7 | Low |
| Code comments | m2.7 | Low |
| API endpoint docs | m2.7 | Low |
| Changelog updates | m2.7 | Low |
| Architecture docs | glm-5 | Medium |
| ADRs | glm-5 | Medium |
| Security docs | glm-5 | Medium |

## Documentation Standards

### README Template
```markdown
# Project Name

Brief description of what this project does.

## Features
- Feature 1
- Feature 2

## Installation
```bash
npm install package-name
```

## Usage
```javascript
const lib = require('package-name');
lib.doSomething();
```

## Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |

## Contributing
See CONTRIBUTING.md

## License
MIT
```

### API Documentation
```markdown
## POST /api/users

Create a new user.

### Request
**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "role": "string (optional, default: 'user')"
}
```

### Response
**Success (201):**
```json
{
  "id": "uuid",
  "name": "John",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Error (400):**
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Email is required"
}
```
```

### Architecture Decision Record (ADR)
```markdown
# ADR-001: Use PostgreSQL for primary database

## Status
Accepted

## Context
We need a relational database that supports complex queries and transactions.

## Decision
Use PostgreSQL 15.

## Consequences
**Positive:**
- Strong ACID compliance
- Excellent JSON support
- Mature ecosystem

**Negative:**
- Requires more resources than SQLite
- Need to manage connections

## Alternatives Considered
- MySQL: Less feature-rich for complex queries
- MongoDB: Not ideal for relational data
```

### JSDoc Comments
```javascript
/**
 * Calculates the total price including tax
 * @param {number} price - Base price
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns {number} Total price with tax
 * @example
 * const total = calculateTotal(100, 0.1); // Returns 110
 */
const calculateTotal = (price, taxRate) => {
  return price * (1 + taxRate);
};
```

## Documentation Checklist

### Before Writing
- [ ] Understand the audience
- [ ] Identify the purpose
- [ ] Choose the right format
- [ ] Gather all necessary information

### While Writing
- [ ] Use clear, simple language
- [ ] Include examples
- [ ] Keep it concise
- [ ] Use consistent formatting

### After Writing
- [ ] Review for accuracy
- [ ] Check for completeness
- [ ] Verify examples work
- [ ] Get feedback from peers

## Common Mistakes

1. **Outdated docs** - Update docs with code changes
2. **Too much jargon** - Write for beginners
3. **No examples** - Examples clarify everything
4. **Wall of text** - Use headers, lists, tables
5. **Missing context** - Explain why, not just what

## Anti-Patterns

- ❌ Documentation debt (always "later")
- ❌ Auto-generated only (needs human context)
- ❌ Separate doc system nobody updates
- ❌ No versioning for docs
- ❌ Assuming knowledge
