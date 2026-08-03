# Client Application Guide

## Capability Map

```mermaid
mindmap
  root((Executive Client))
    Authentication
      Signup via /signup
      Login via /login
      JWT storage
      Protected routing
    Dashboard
      Recent-month graph
      Transaction rows
      Metrics cards
      Sidebar collapse
    Data Actions
      Add tag
      Add transaction
      Delete transaction
    UX
      Theme toggle with icons
      SweetAlert success and error dialogs
```

## Data Flow

```mermaid
flowchart LR
  A[Login Form] --> B[api/user.loginUser]
  B --> C[api/client.apiRequest]
  C --> D[Flask /login]
  D --> E[JWT token]
  E --> F[api/session.saveAuthToken]
  F --> G[ProtectedRoute]
  G --> H[Dashboard mount]
  H --> I[useDashboardData]
  I --> J[GET /transactions]
  I --> K[GET /tags]
  J --> L[TransactionChart]
  J --> M[TransactionRows]
  K --> N[DashboardActions]
  N --> O[POST /tags]
  N --> P[POST /transactions]
  M --> Q[DELETE /transactions/id]
```

## Component Structure

```mermaid
graph TD
  R[src]
  R --> A[api]
  R --> B[components]
  R --> C[pages]
  R --> D[styles]

  A --> A1[client.js]
  A --> A2[user.js]
  A --> A3[data.js]
  A --> A4[session.js]
  A --> A5[alerts.js]

  B --> B1[ProtectedRoute.jsx]
  B --> B2[SideBar.jsx]
  B --> B3[AppearanceButton.jsx]
  B --> B4[TransactionChart.jsx]
  B --> B5[TransactionRows.jsx]
  B --> B6[DashboardActions.jsx]

  C --> C1[Authentication]
  C --> C2[Dashboard]
```

- [src/api](src/api)
- [src/components](src/components)
- [src/pages](src/pages)
- [src/styles](src/styles)

## Route Graph

```mermaid
flowchart TD
  A[/] --> B{token exists}
  B -- yes --> C[/dashboard]
  B -- no --> D[/authentication/login]
  D --> E[/authentication/signup]
  C --> C1[/dashboard/expenses]
  C --> C2[/dashboard/savings]
  C --> C3[/dashboard/settings]
```

## Runtime Contract

```mermaid
flowchart LR
  A[Vite Client :5173] --> B[Flask API :5000]
  B --> C[(SQLite)]
```

Env used by client:
- `VITE_API_URL` (default fallback: `http://127.0.0.1:5000`)

## Start

```bash
cd client
npm install
npm run dev
```
