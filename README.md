# Silva's Bookkeeping Application

A comprehensive full-stack bookkeeping and accounting solution featuring a Node.js/Express backend and a React frontend. This application provides robust management for invoices, estimates, expenses, inventory, and more.

## Live Demo
- **API Base URL**: [https://silvas-bookkeeping-api-8b056dc73f14.herokuapp.com/](https://silvas-bookkeeping-api-8b056dc73f14.herokuapp.com/)

## Features

- **🔐 Authentication & Security**
  - Secure JWT-based authentication
  - Role-based access control
  - Comprehensive Audit Logging for all critical actions

- **💰 Financial Management**
  - **Invoicing**: Create and manage invoices with detailed line items.
  - **Recurring Invoices**: Set up automated billing cycles.
  - **Estimates**: Generate and track quotes for clients.
  - **Expenses**: Track business expenses and categories.
  - **Payments**: Record payments and manage payment status.
  - **Payment Reminders**: Automated follow-ups for overdue invoices.
  - **Taxes**: Configurable tax rates and calculations.
  - **Currencies**: Multi-currency support.

- **📊 Planning & Reporting**
  - **Budgets**: Set and track financial budgets.
  - **Reports**: Generate financial insights and summaries.

- **📦 Inventory & Logistics**
  - **Product/Service Management**: Catalog of items.
  - **Inventory Tracking**: Stock level management.

- **👥 CRM**
  - **Customer Management**: Detailed client profiles.
  - **Salesforce Integration**: Sync data with Salesforce CRM.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **Testing**: Jest & Supertest

### Frontend
- **Framework**: React.js
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v18.x recommended)
- npm (v9.x recommended)
- MySQL (v5.7 or higher)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/luis-sscs/silvas-Bookkeeping-api.git
   cd silvas-Bookkeeping-api
   ```

2. **Install dependencies:**
   
   Root (Backend) dependencies:
   ```bash
   npm install
   ```
   
   Frontend dependencies:
   ```bash
   cd _frontend
   npm install
   cd ..
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory (based on `.env.example` if available) with the following variables:
   ```env
   PORT=4018
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=silvas_accounting
   DB_USER=root
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=24h
   ```

4. **Database Setup:**
   Run migrations and seeders to set up the MySQL database:
   ```bash
   npm run db:reset
   ```
   *(This command runs `db:drop`, `db:create`, `db:migrate`, and `db:seed:all`)*

## Running the Application

### Development Mode

To run the backend server in development mode (with nodemon):
```bash
npm run dev
```

To run the frontend in development mode:
```bash
cd _frontend
npm start
```

### Production Build

To build the frontend and serve it via the Node.js backend:

1. Build the frontend:
   ```bash
   npm run build:frontend
   ```

2. Start the server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:4018` (API) or `http://localhost:3018` (Frontend Dev).

## API Documentation

See [API_EXAMPLES.md](API_EXAMPLES.md) for detailed API usage examples.
A Postman collection is also available in `postman/Silvas-bookkeepingAPI.postman_collection.json`.

## Deployment

The application includes configuration for Heroku deployment using a `Procfile`.
The `heroku-postbuild` script automatically installs frontend dependencies and builds the React app during deployment.

See [HEROKU_DEPLOYMENT.md](HEROKU_DEPLOYMENT.md) for detailed deployment instructions.

## Testing

Run backend tests using Jest:
```bash
npm test
```

## Project Structure

```
silvas-bookkeeping/
├── _frontend/          # React Frontend Application
│   ├── public/
│   └── src/
├── migrations/         # Database migrations
├── postman/            # Postman collections
├── src/
│   ├── config/         # Database and app configuration
│   ├── controllers/    # API Request handlers
│   ├── middleware/     # Custom middleware (auth, logging)
│   ├── models/         # Sequelize models
│   ├── routes/         # API routes definitions
│   ├── seeders/        # Database seeders
│   ├── services/       # Business logic services
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── tests/              # Backend tests
├── .env.example        # Environment variables template
├── .sequelizerc        # Sequelize configuration
├── jest.config.js      # Jest configuration
└── package.json        # Backend dependencies and scripts
```

## License

ISC

