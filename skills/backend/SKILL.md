---
name: backend-developer
description: Use when working on backend development tasks including API development, business logic implementation, and server-side operations
---

# Backend Developer Skill

## Overview

**Backend development skill for API development, business logic implementation, and server-side operations.**

## When to Use

- Implementing REST/GraphQL APIs
- Writing business logic
- Handling authentication/authorization
- Implementing caching strategies
- Working with message queues
- Server-side integration

## Core Responsibilities

### API Development
- RESTful API design
- GraphQL schema design
- Input validation
- Error handling
- Rate limiting
- API versioning

### Business Logic
- Domain modeling
- Validation rules
- Workflow orchestration
- Error handling
- Logging and monitoring

### Integration
- External service integration
- Message queue handling
- Caching strategies
- Authentication/authorization

## Model Configuration

**This role uses different models based on task complexity:**

- **Complex logic → GLM-5**: Business rules, algorithms, performance optimization
- **Integration → GLM-5**: External service integration, message queues
- **Simple tasks → M2.7**: CRUD operations, basic endpoints, configuration

## Quick Reference

| Task Type | Model | Complexity |
|-----------|-------|------------|
| Business logic | glm-5 | High |
| Algorithm design | glm-5 | High |
| Performance optimization | glm-5 | High |
| External integration | glm-5 | Medium |
| CRUD operations | m2.7 | Low |
| Basic endpoints | m2.7 | Low |
| Configuration | m2.7 | Low |

## API Design Principles

### RESTful API Example
```java
// Good: Clear resource naming
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        // Implementation
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {
        // Implementation
    }
}
```

### Error Handling
```java
// Good: Consistent error response
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .code("NOT_FOUND")
            .message(ex.getMessage())
            .timestamp(LocalDateTime.now())
            .build();
        return ResponseEntity.status(404).body(error);
    }
}
```

## Database Patterns

### Repository Pattern
```java
// Good: Clean separation
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.status = :status")
    List<User> findByStatus(@Param("status") UserStatus status);
}
```

### Transaction Management
```java
// Good: Clear transaction boundaries
@Service
@Transactional
public class UserService {
    
    public User createUser(CreateUserRequest request) {
        // Multiple operations in single transaction
        User user = new User(request);
        user = userRepository.save(user);
        createUserProfile(user, request);
        sendWelcomeEmail(user);
        return user;
    }
}
```

## Common Patterns

### Service Layer
```java
// Good: Business logic in service
@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final InventoryService inventoryService;
    
    public Order createOrder(CreateOrderRequest request) {
        // Validate
        validateOrder(request);
        
        // Reserve inventory
        inventoryService.reserve(request.getItems());
        
        // Process payment
        Payment payment = paymentService.process(request.getPayment());
        
        // Create order
        Order order = Order.create(request, payment);
        return orderRepository.save(order);
    }
}
```

### Input Validation
```java
// Good: Use Bean Validation
public class CreateUserRequest {
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be 2-50 characters")
    private String name;
    
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;
    
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
}
```

## Common Mistakes

1. **N+1 queries** - Use JOIN FETCH or batch loading
2. **No input validation** - Always validate user input
3. **SQL injection** - Use parameterized queries
4. **No error handling** - Catch and handle exceptions properly
5. **Hardcoded values** - Use configuration files

## Anti-Patterns

- ❌ God Class (one class does everything)
- ❌ Anemic Domain Model (no business logic in entities)
- ❌ Leaky Abstractions (database details in business logic)
- ❌ Premature Optimization (optimize without metrics)
