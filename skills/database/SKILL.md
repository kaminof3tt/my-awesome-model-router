---
name: database-specialist
description: Use when designing database schemas, optimizing queries, planning migrations, or troubleshooting database issues
---

# Database Specialist Skill

## Overview

**Database skill for schema design, query optimization, migration planning, and database troubleshooting.**

## When to Use

- Designing database schemas
- Writing complex queries
- Optimizing query performance
- Planning data migrations
- Troubleshooting database issues
- Implementing caching strategies

## Core Responsibilities

### Schema Design
- Table structure design
- Relationship modeling
- Index strategy
- Normalization/denormalization
- Partition strategy

### Query Optimization
- Query analysis
- Index optimization
- Execution plan review
- N+1 query prevention
- Batch operation design

### Migration Planning
- Schema migrations
- Data migrations
- Zero-downtime migrations
- Rollback strategies

### Database Operations
- Backup strategies
- Replication setup
- Performance monitoring
- Capacity planning

## Model Configuration

**This role uses different models based on complexity:**

- **Complex queries → GLM-5**: Window functions, CTEs, complex joins
- **Performance issues → DeepSeek-V3.2**: Slow query analysis, lock contention
- **Simple operations → M2.7**: Basic CRUD, simple migrations

## Quick Reference

| Task Type | Model | Complexity |
|-----------|-------|------------|
| Complex queries | glm-5 | High |
| Schema design | glm-5 | High |
| Slow query analysis | deepseekv3.2 | High |
| Lock troubleshooting | deepseekv3.2 | High |
| Basic CRUD | m2.7 | Low |
| Simple migrations | m2.7 | Low |
| Index creation | m2.7 | Low |

## Schema Design Patterns

### Users Table (PostgreSQL)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
```

### Polymorphic Association
```sql
-- Comments on multiple entity types
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  commentable_type VARCHAR(50) NOT NULL, -- 'post' or 'product'
  commentable_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_comments_polymorphic 
  ON comments(commentable_type, commentable_id);
```

### Audit Trail
```sql
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  table_name VARCHAR(50) NOT NULL,
  record_id INTEGER NOT NULL,
  action VARCHAR(10) NOT NULL, -- INSERT, UPDATE, DELETE
  old_values JSONB,
  new_values JSONB,
  user_id INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_table_record 
  ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_created 
  ON audit_log(created_at);
```

## Query Patterns

### Window Functions
```sql
-- Rank users by order count
SELECT 
  u.id,
  u.name,
  COUNT(o.id) as order_count,
  RANK() OVER (ORDER BY COUNT(o.id) DESC) as rank
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

### CTE for Complex Queries
```sql
WITH active_users AS (
  SELECT id, name, email
  FROM users
  WHERE status = 'active'
),
user_orders AS (
  SELECT user_id, SUM(total) as total_spent
  FROM orders
  WHERE created_at > NOW() - INTERVAL '1 year'
  GROUP BY user_id
)
SELECT 
  au.name,
  uo.total_spent
FROM active_users au
JOIN user_orders uo ON au.id = uo.user_id
WHERE uo.total_spent > 1000
ORDER BY uo.total_spent DESC;
```

### Batch Update
```sql
-- Update in batches to avoid locks
DO $$
DECLARE
  batch_size INTEGER := 1000;
  affected_rows INTEGER := 1;
BEGIN
  WHILE affected_rows > 0 LOOP
    UPDATE users
    SET status = 'inactive'
    WHERE id IN (
      SELECT id FROM users
      WHERE last_login < NOW() - INTERVAL '1 year'
        AND status = 'active'
      LIMIT batch_size
    );
    
    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    COMMIT;
  END LOOP;
END $$;
```

## Migration Patterns

### Safe Migration (Zero Downtime)
```sql
-- Step 1: Add column (nullable)
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Step 2: Backfill data
UPDATE users SET phone = legacy_phone WHERE phone IS NULL;

-- Step 3: Add NOT NULL constraint
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;

-- Step 4: Drop old column
ALTER TABLE users DROP COLUMN legacy_phone;
```

### Index Creation (Concurrent)
```sql
-- Non-blocking index creation
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

## Performance Checklist

### Query Analysis
```markdown
- [ ] EXPLAIN ANALYZE run?
- [ ] Sequential scans avoided?
- [ ] Proper indexes used?
- [ ] Joins optimized?
- [ ] Pagination implemented?
```

### Index Strategy
```markdown
- [ ] Primary keys defined?
- [ ] Foreign keys indexed?
- [ ] WHERE clause columns indexed?
- [ ] Composite indexes for multi-column queries?
- [ ] Unused indexes removed?
```

### Connection Management
```markdown
- [ ] Connection pooling configured?
- [ ] Connection limits appropriate?
- [ ] Idle connections cleaned up?
- [ ] Connection timeout set?
```

## Common Mistakes

1. **Missing indexes** - Index columns in WHERE/JOIN
2. **N+1 queries** - Use JOINs or batch loading
3. **No pagination** - Always paginate large results
4. **SELECT *** - Select only needed columns
5. **No connection pooling** - Pool connections properly

## Anti-Patterns

- ❌ Database as queue (use proper message queue)
- ❌ Soft deletes everywhere (sometimes hard delete is right)
- ❌ Over-normalization (denormalize for reads)
- ❌ Triggers for business logic (keep in application)
- ❌ No backups (always have backups)
