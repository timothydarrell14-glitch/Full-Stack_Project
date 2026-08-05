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

## Live Deployment

- **Client:** https://full-stack-project-amber.vercel.app/authentication/login (Vercel)
- **Server:** https://full-stack-project-14xc.onrender.com (Render)

## Runtime Topology

```mermaid
flowchart LR
  A[React Client — Vercel] --> B[Flask API — Render]
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

## Architecture & File Connections

### `client/src/api/` — API Layer

All network and auth logic lives here. Files feed upward into pages and components.

```mermaid
graph TD
  session.js["session.js\n(read/save/clear JWT\nin localStorage/sessionStorage)"]
  client.js["client.js\n(single fetch wrapper,\nbuilds URL, attaches Bearer token)"]
  user.js["user.js\n(loginUser, createUser)"]
  data.js["data.js\n(CRUD for transactions,\ntags, savings)"]
  alerts.js["alerts.js\n(SweetAlert2 wrappers:\nsuccess / error / confirm)"]

  session.js --> client.js
  client.js --> user.js
  client.js --> data.js
```

| File | Role | Imports from |
|------|------|--------------|
| `session.js` | Lowest-level token store — reads and writes JWT to `localStorage` / `sessionStorage` | nothing |
| `client.js` | Central `apiRequest()` wrapper — attaches `Authorization` header and handles errors | `session.js` |
| `user.js` | Auth calls: `loginUser`, `createUser` | `client.js` |
| `data.js` | All resource CRUD: transactions, tags, savings | `client.js` |
| `alerts.js` | Styled SweetAlert2 helpers (`showSuccessAlert`, `showErrorAlert`, `showConfirmAlert`) | nothing (standalone) |

---

### `client/src/components/` — Shared UI

```mermaid
graph TD
  session.js
  ProtectedRoute.jsx["ProtectedRoute.jsx\n(redirects to /login\nif no token)"]
  SideBar.jsx["SideBar.jsx\n(nav links + logout button)"]
  AppearanceButton.jsx["AppearanceButton.jsx\n(theme toggle)"]
  DashboardActions.jsx["DashboardActions.jsx\n(add transaction / tag modals)"]
  TransactionChart.jsx["TransactionChart.jsx\n(Recharts bar chart)"]
  TransactionRows.jsx["TransactionRows.jsx\n(transaction list)"]
  TagFilterBar.jsx["TagFilterBar.jsx\n(filter chips)"]

  session.js --> ProtectedRoute.jsx
  session.js --> SideBar.jsx
```

| Component | Role | Key dependency |
|-----------|------|----------------|
| `ProtectedRoute.jsx` | Wraps every dashboard route — calls `hasAuthToken()` and redirects to `/authentication/login` if false | `session.js` |
| `SideBar.jsx` | Nav links + logout — calls `clearAuthToken()` then redirects on logout | `session.js` |
| `AppearanceButton.jsx` | Dark/light theme toggle | Theme context |
| `DashboardActions.jsx` | Inline form modals for creating transactions and tags | Receives callbacks from `useDashboardData` |
| `TransactionChart.jsx` | Bar chart of recent-month spend | Receives `points` array as prop |
| `TransactionRows.jsx` | Tabular transaction list with delete action | Receives `transactions` + `onDelete` as props |
| `TagFilterBar.jsx` | Tag filter pill row | Receives `tags` + `onSelect` as props |

---

### `client/src/pages/` — Page Layer

```mermaid
graph TD
  App.jsx["App.jsx\n(router — maps URLs\nto pages, wraps\ndashboard in ProtectedRoute)"]
  LogInPage.jsx["LogInPage.jsx"]
  SignUpPage.jsx["SignUpPage.jsx"]
  Dashboard.jsx["Dashboard.jsx\n(shell: SideBar + Outlet)"]
  OverviewPage.jsx["OverviewPage.jsx"]
  ExpensesPage.jsx["ExpensesPage.jsx"]
  SavingsPage.jsx["SavingsPage.jsx"]
  SettingsPage.jsx["SettingsPage.jsx"]
  useDashboardData.js["useDashboardData.js\n(shared data hook)"]

  App.jsx --> LogInPage.jsx
  App.jsx --> SignUpPage.jsx
  App.jsx --> Dashboard.jsx
  Dashboard.jsx --> OverviewPage.jsx
  Dashboard.jsx --> ExpensesPage.jsx
  Dashboard.jsx --> SavingsPage.jsx
  Dashboard.jsx --> SettingsPage.jsx
  useDashboardData.js --> OverviewPage.jsx
  useDashboardData.js --> ExpensesPage.jsx
  useDashboardData.js --> SavingsPage.jsx
```

| File | Role | Key imports |
|------|------|-------------|
| `App.jsx` | Root router — redirects `/` based on token, wraps `/dashboard/*` in `ProtectedRoute` | `session.js`, `ProtectedRoute` |
| `LogInPage.jsx` | Login form — calls `loginUser`, saves token, navigates to dashboard | `user.js`, `session.js`, `alerts.js` |
| `SignUpPage.jsx` | Signup form — calls `createUser`, saves token on success | `user.js`, `session.js`, `alerts.js` |
| `Dashboard.jsx` | Layout shell — renders `SideBar` + nested `<Outlet />` | `SideBar.jsx` |
| `useDashboardData.js` | Shared hook — fetches all transactions and tags, exposes add/delete/update handlers | `data.js` |
| `OverviewPage.jsx` | Chart + transaction rows + metric cards | `useDashboardData`, `alerts.js`, chart/row components |
| `ExpensesPage.jsx` | Full transaction ledger with tag filter | `useDashboardData`, `alerts.js`, filter/row components |
| `SavingsPage.jsx` | Savings goals view | `useDashboardData` |
| `SettingsPage.jsx` | User profile settings | `user.js`, `alerts.js` |

---

### `server/` — Flask API

#### Startup and wiring — `app/__init__.py` + `extensions.py`

`extensions.py` instantiates `SQLAlchemy`, `Marshmallow`, `JWTManager`, and `CORS` as module-level singletons. `__init__.py` (the `create_app` factory) calls `.init_app(app)` on each one, then imports and registers every Blueprint with its URL prefix.

```mermaid
graph TD
  extensions.py["extensions.py\n(db, ma, jwt, cors)"]
  init["app/__init__.py\n(create_app factory —\ninit extensions,\nregister blueprints)"]
  models["models/\n(SQLAlchemy ORM classes)"]
  schemas["schemas/\n(Marshmallow serialisers)"]
  controllers["controllers/\n(business logic)"]
  routes["routes/\n(Flask Blueprints)"]
  services["services/\n(auth, paginate, currency)"]

  extensions.py --> models
  extensions.py --> schemas
  extensions.py --> controllers
  models --> schemas
  models --> controllers
  schemas --> controllers
  schemas --> routes
  controllers --> routes
  services --> routes
  services --> controllers
  routes --> init
```

#### Layer breakdown

| Layer | Files | Role |
|-------|-------|------|
| **extensions** | `extensions.py` | Shared singletons (`db`, `ma`, `jwt`, `cors`) imported everywhere |
| **models** | `models/users.py`, `transactions.py`, `tags.py`, `savings.py`, `associations.py` | SQLAlchemy table definitions and relationships; `associations.py` holds the `transactions_tags` many-to-many join table |
| **schemas** | `schemas/*_schema.py` | Marshmallow schemas that serialize models to JSON and validate/deserialize incoming request data |
| **services** | `services/auth.py` | Queries `User` by email, verifies password hash, returns a signed JWT via `flask_jwt_extended` |
| | `services/paginate.py` | Generic helper that wraps any SQLAlchemy query in Flask-SQLAlchemy pagination and returns `items` + `pagination` metadata |
| | `services/currency_converter.py` | Currency conversion utility |
| **controllers** | `controllers/*_controller.py` | Business logic — use `db.session`, models, schemas, and `paginate()`. Isolated from HTTP so they are easy to test |
| **routes** | `routes/*.py` | Flask Blueprints — validate HTTP inputs, call the matching controller method, serialize the result through a schema, and return JSON + status code |

#### Request path (example: `GET /transactions`)

```
React (data.js apiRequest)
  → Bearer JWT header
  → Flask route (routes/transactions.py) — @jwt_required() extracts user id
  → TransactionController.get_all_transactions(user_id, page, per_page)
  → paginate(Transaction.query.filter_by(user_id=…))
  → transactions_schema.dump(items)
  → JSON response back to client
```

---

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
