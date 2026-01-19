# API Usage Examples

This document provides examples of how to use the Silva's Accounting API endpoints.

## Base URL
```
http://localhost:3000/api
```

## Authentication

### Register a New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

Response:
```json
{
  "user": {
    "id": "uuid-here",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Validate Token
```bash
curl -X GET http://localhost:3000/api/auth/validate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Invoices

### Create Invoice
```bash
curl -X POST http://localhost:3000/api/invoices \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceNumber": "INV-2024-0001",
    "clientName": "Acme Corporation",
    "clientEmail": "billing@acme.com",
    "amount": 2500.00,
    "status": "draft",
    "issueDate": "2024-01-15",
    "dueDate": "2024-02-15",
    "description": "Web development services"
  }'
```

### Get All Invoices
```bash
curl -X GET http://localhost:3000/api/invoices \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Invoice by ID
```bash
curl -X GET http://localhost:3000/api/invoices/UUID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Invoice
```bash
curl -X PUT http://localhost:3000/api/invoices/UUID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "sent"
  }'
```

### Delete Invoice
```bash
curl -X DELETE http://localhost:3000/api/invoices/UUID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Filter Invoices by Status
```bash
curl -X GET "http://localhost:3000/api/invoices?status=paid" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Estimates

### Create Estimate
```bash
curl -X POST http://localhost:3000/api/estimates \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "estimateNumber": "EST-2024-0001",
    "clientName": "Tech Solutions Inc",
    "clientEmail": "accounts@techsolutions.com",
    "amount": 5000.00,
    "status": "draft",
    "issueDate": "2024-01-15",
    "validUntil": "2024-02-15",
    "description": "Mobile app development estimate"
  }'
```

### Get All Estimates
```bash
curl -X GET http://localhost:3000/api/estimates \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Expenses

### Create Expense
```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Software",
    "vendor": "Adobe",
    "amount": 54.99,
    "date": "2024-01-15",
    "description": "Adobe Creative Cloud subscription",
    "status": "pending"
  }'
```

### Get All Expenses
```bash
curl -X GET http://localhost:3000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Filter Expenses by Category
```bash
curl -X GET "http://localhost:3000/api/expenses?category=Software" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Products/Services

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Web Development",
    "type": "service",
    "description": "Full-stack web development services",
    "price": 150.00,
    "sku": "WEB-001",
    "unit": "hour",
    "isActive": true
  }'
```

### Get All Products
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Filter Products by Type
```bash
curl -X GET "http://localhost:3000/api/products?type=service" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Product
```bash
curl -X PUT http://localhost:3000/api/products/UUID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 175.00
  }'
```

## Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `204 No Content` - Resource deleted successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Notes

- All timestamps are in ISO 8601 format
- All monetary amounts are in decimal format with 2 decimal places
- UUIDs are used for all resource identifiers
- Bearer tokens expire after 24 hours by default
