---
name: tester
description: Use when writing tests, designing test strategies, or creating test automation
---

# Tester Skill

## Overview

**Testing skill for test strategy design, test implementation, and test automation.**

## When to Use

- Writing unit tests
- Designing integration tests
- Creating test strategies
- Building test automation
- Performance testing
- Load testing

## Core Responsibilities

### Test Design
- Unit test design
- Integration test design
- End-to-end test design
- Test data management
- Test environment setup

### Test Implementation
- Writing test cases
- Mocking and stubbing
- Test automation
- CI/CD integration
- Test reporting

### Test Strategy
- Test pyramid implementation
- Coverage analysis
- Test environment management
- Performance test design

## Model Configuration

**This role uses different models based on task type:**

- **Test strategy → GLM-5**: Test design, architecture decisions
- **Integration tests → GLM-5**: Complex test scenarios
- **Routine tests → M2.7**: Simple unit tests, basic assertions

## Quick Reference

| Task Type | Model | Complexity |
|-----------|-------|------------|
| Test architecture | glm-5 | High |
| Integration test design | glm-5 | High |
| E2E test design | glm-5 | High |
| Simple unit tests | m2.7 | Low |
| Basic assertions | m2.7 | Low |
| Test configuration | m2.7 | Low |

## Test Pyramid

```
        E2E Tests (Few)
       /              \
    Integration Tests
   /                  \
  Unit Tests (Many)
```

## Test Types

### Unit Tests
```java
// Good: Clear, focused test
@Test
void shouldCalculateTotalPrice() {
    // Given
    Order order = new Order();
    order.addItem(new OrderItem("Product1", 2, 10.0));
    order.addItem(new OrderItem("Product2", 1, 20.0));
    
    // When
    BigDecimal total = order.calculateTotal();
    
    // Then
    assertEquals(new BigDecimal("40.0"), total);
}
```

### Integration Tests
```java
// Good: Test component interaction
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class UserServiceIntegrationTest {
    
    @Autowired
    private UserService userService;
    
    @Test
    @Order(1)
    void shouldCreateUser() {
        CreateUserRequest request = new CreateUserRequest("test@example.com", "Test User");
        User user = userService.createUser(request);
        
        assertNotNull(user.getId());
        assertEquals("test@example.com", user.getEmail());
    }
    
    @Test
    @Order(2)
    void shouldFindUserByEmail() {
        Optional<User> user = userService.findByEmail("test@example.com");
        
        assertTrue(user.isPresent());
        assertEquals("Test User", user.get().getName());
    }
}
```

### E2E Tests
```java
// Good: Test complete user flow
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class OrderFlowE2ETest {
    
    @Test
    void shouldCompleteOrderFlow() {
        // 1. User registration
        // 2. Product browsing
        // 3. Add to cart
        // 4. Checkout
        // 5. Payment
        // 6. Order confirmation
    }
}
```

## Test Coverage

### What to Cover
- [ ] Happy path
- [ ] Edge cases
- [ ] Error conditions
- [ ] Boundary values
- [ ] Performance scenarios

### What NOT to Cover
- Third-party libraries
- Framework code
- Simple getters/setters (unless complex logic)

## Common Patterns

### Test Data Builders
```java
// Good: Flexible test data creation
public class UserBuilder {
    private String email = "test@example.com";
    private String name = "Test User";
    private UserStatus status = UserStatus.ACTIVE;
    
    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public User build() {
        return new User(email, name, status);
    }
}

// Usage
User user = new UserBuilder()
    .withEmail("custom@example.com")
    .build();
```

### Mocking
```java
// Good: Mock external dependencies
@Test
void shouldProcessPayment() {
    // Given
    PaymentService paymentService = mock(PaymentService.class);
    when(paymentService.process(any())).thenReturn(PaymentResult.success());
    
    OrderService orderService = new OrderService(paymentService);
    
    // When
    Order order = orderService.createOrder(request);
    
    // Then
    verify(paymentService).process(any());
    assertEquals(OrderStatus.PAID, order.getStatus());
}
```

## Common Mistakes

1. **Testing implementation details** - Test behavior, not implementation
2. **Brittle tests** - Tests break when code changes, not when behavior changes
3. **Slow tests** - Keep tests fast, use mocks for external dependencies
4. **No test isolation** - Tests should not depend on each other
5. **Poor test names** - Names should describe the scenario and expected outcome

## Anti-Patterns

- ❌ Test-After (write code then tests)
- ❌ Assertion-Free Tests (no assertions)
- ❌ The Liar (tests that don't actually test)
- ❌ Excessive Setup (too much test data)
- ❌ The Giant (one test tests everything)
