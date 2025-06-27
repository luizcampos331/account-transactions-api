# account-transactions-api
💵 Bank Transaction Control API

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
git clone https://github.com/luizcampos331/account-transactions-api.git
cd account-transactions-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory (optional, defaults are provided):

```
NODE_ENV=development
HTTP_PORT=3333
REPOSITORY_IMPLEMENTATION=json
```

### Running the Application

#### Development

```bash
npm run dev
```

#### Production

```bash
npm run build
npm start
```

## API Endpoints

### 1. Get Account Balance

**GET** `/balance?account_id={id}`

- **Query Parameters:**
  - `account_id` (string, required): The account identifier.

- **Response:**
  - `200 OK`: Returns the account balance as a string.
  - `404 Not Found`: If the account does not exist.

---

### 2. Manage Events (Deposit, Withdraw, Transfer)

**POST** `/event`

- **Request Body:**
  ```json
  {
    "type": "deposit" | "withdraw" | "transfer",
    "destination": "string (optional, required for deposit/transfer)",
    "origin": "string (optional, required for withdraw/transfer)",
    "amount": number
  }
  ```

- **Response:**
  - `201 Created`: Returns the updated account(s) information.
  - `400 Bad Request`: If input is invalid.
  - `404 Not Found`: If the origin account does not exist (for withdraw/transfer).

---

### 3. Reset State

**POST** `/reset`

- Resets all accounts and events to an empty state.
- **Response:** `200 OK`

---

### 4. Health Check

**GET** `/`

- Returns: `"API Account Transactions 1.0.0"`

---

## Data Persistence

- Accounts and events are stored as JSON files in the `database/` directory.
- No external database is required.

## Project Structure

```
src/
  application/   # Business logic (use cases)
  entities/      # DTOs and core types
  infra/         # Infrastructure (repositories, env, factories)
  presentation/  # HTTP layer (controllers, routes, middlewares)
  main.ts        # Application entry point
```

## Author:
Luiz Eduardo Campos da Silva</br>
LinkedIn: <a href="https://www.linkedin.com/in/luiz-campos">@luiz-campos</a></br>
Github: <a href="https://www.github.com/luizcampos331">@luizcampos331</a>


## Licence
Copyright © 2025 <a href="https://www.github.com/luizcampos331">Luiz Campos</a></br>
This project is licensed under <a href="LICENSE">MIT</a>
