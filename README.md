# Executive Finance Platform

## Functionality

- Account registration via public signup endpoint
- Secure login with JWT
- Protected dashboard access
- Transaction CRUD
- Tag CRUD
- Savings CRUD
- Recent-month transaction charting
- Full transaction rows under chart
- Sidebar collapse to expand analysis area
- Theme toggle with icon states
- SweetAlert feedback for auth and CRUD actions

## How It Works

```mermaid
sequenceDiagram
  participant U as User
  participant C as Client
  participant A as API
  participant D as DB

  U->>C: Register
  C->>A: POST /signup
  A->>D: Insert user
  D-->>A: Created
  A-->>C: 201

  U->>C: Login
  C->>A: POST /login
  A->>D: Validate credentials
  D-->>A: User
  A-->>C: JWT token

  C->>C: Store token
  C->>A: GET /transactions + GET /tags
  A->>D: Query scoped by JWT identity
  D-->>A: User-owned data
  A-->>C: Dashboard payload

  U->>C: Add tag / Add transaction / Delete transaction
  C->>A: POST/DELETE routes
  A->>D: Mutate user-owned records
  D-->>A: Success
  A-->>C: Updated responses
```

## Updated ERD

```mermaid
erDiagram
  USERS ||--o{ TRANSACTIONS : owns
  USERS ||--o{ SAVING_GOALS : owns
  TRANSACTIONS ||--o{ TRANSACTIONS_TAGS : maps
  TAGS ||--o{ TRANSACTIONS_TAGS : maps

  USERS {
    int id PK
    string name
    string email UNIQUE
    int age
    string password
    string role
  }

  TRANSACTIONS {
    int id PK
    string name
    int user_id FK
    float amount
    date date
  }

  TAGS {
    int id PK
    string name
  }

  SAVING_GOALS {
    int id PK
    string title
    int goal
    int amount
    date goal_date
    date start_date
    int user_id FK
  }

  TRANSACTIONS_TAGS {
    int transaction_id FK
    int tag_id FK
  }
```

## Runtime Topology

```mermaid
flowchart LR
  A[React Client :5173] --> B[Flask API :5000]
  B --> C[(SQLite)]
```

## API Surface

```mermaid
flowchart TD
  A[Public] --> A1[POST /signup]
  A --> A2[POST /login]
  B[Protected JWT] --> B1[GET POST PUT DELETE /transactions]
  B --> B2[GET POST PUT DELETE /tags]
  B --> B3[GET POST PUT DELETE /savings]
  B --> B4[GET PUT DELETE /users/id]
```

## Project Map

```mermaid
graph TD
  R[Full-Stack_Project] --> C[client]
  R --> S[server]
  C --> C1[src/api]
  C --> C2[src/components]
  C --> C3[src/pages]
  C --> C4[src/styles]
  S --> S1[app/models]
  S --> S2[app/routes]
  S --> S3[app/controllers]
  S --> S4[app/schemas]
  S --> S5[tests]
```

- [client/src/api](client/src/api)
- [client/src/components](client/src/components)
- [client/src/pages](client/src/pages)
- [client/src/styles](client/src/styles)
- [server/app/models](server/app/models)
- [server/app/routes](server/app/routes)
- [server/app/controllers](server/app/controllers)
- [server/app/schemas](server/app/schemas)
- [server/tests](server/tests)

## Run

1. Backend

```bash
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
.venv/bin/flask --app app run
```

2. Frontend

```bash
cd client
npm install
npm run dev
```
