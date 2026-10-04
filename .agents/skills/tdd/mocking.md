# When to Mock

Mock only at system boundary:

- External APIs (payment, email, etc.)
- Databases (sometimes - prefer test DB)
- Time/randomness
- File system (sometimes)

No mock:

- Own classes/modules
- Internal helpers
- Anything you control

## Designing for Mockability

At system boundary, make interface easy to mock:

**1. Use dependency injection**

Pass outside things in, not make inside:

```typescript
// Easy to mock
function processPayment(order, paymentClient) {
  return paymentClient.charge(order.total);
}

// Hard to mock
function processPayment(order) {
  const client = new StripeClient(process.env.STRIPE_KEY);
  return client.charge(order.total);
}
```

**2. Prefer SDK-style over generic fetcher**

Make one function per outside thing, not one big function with if logic:

```typescript
// GOOD: Each function is independently mockable
const api = {
  getUser: (id) => fetch(`/users/${id}`),
  getOrders: (userId) => fetch(`/users/${userId}/orders`),
  createOrder: (data) => fetch('/orders', { method: 'POST', body: data }),
};

// BAD: Mocking requires conditional logic inside the mock
const api = {
  fetch: (endpoint, options) => fetch(endpoint, options),
};
```

SDK way good:

- Each mock give one shape
- No if logic in test setup
- Easy see which endpoint test use
- Type safe per endpoint