# Backend Change Notes

This document summarizes backend-focused changes made during the recent stabilization pass and explains why each change was needed.

## Scope

The work focused on the Flask backend in `server/`, especially routes, controllers, configuration, and regression tests.

## Changes and rationale

### 1. Route payload validation

Files:
- `server/app/routes/transactions.py`
- `server/app/routes/savings.py`
- `server/app/routes/tags.py`
- `server/app/routes/users.py`
- `server/app/routes/login.py`

What changed:
- Routes now use safe JSON parsing and verify request bodies are JSON objects.
- Invalid payloads now return explicit 400 responses.

Why:
- Prevent server errors caused by malformed or non-object JSON payloads.
- Give API clients predictable validation behavior.

### 2. Pagination response consistency

Files:
- `server/app/routes/transactions.py`
- `server/app/routes/savings.py`
- `server/app/routes/users.py`
- `server/app/services/paginate.py`

What changed:
- Collection endpoints now return both data and pagination metadata.
- Responses align with the paginate helper output shape.

Why:
- Avoid schema/payload mismatches.
- Provide a stable response contract for frontend pagination UI.

### 3. Date normalization for persistence

Files:
- `server/app/controllers/transactions_controller.py`
- `server/app/controllers/savings_controller.py`

What changed:
- Date-like string inputs are converted to Python date objects before SQLAlchemy write operations.

Why:
- SQLite date columns reject plain strings for date fields in these code paths.
- Normalization prevents runtime StatementError exceptions.

### 4. User schema/controller create-update split

Files:
- `server/app/schemas/users_schema.py`
- `server/app/controllers/users_controller.py`

What changed:
- User creation uses `UserCreateSchema` with stricter create-time requirements.
- User updates continue to allow partial updates.

Why:
- Creation and update validation requirements are different.
- This avoids accidental weak validation for account creation.

### 5. Environment-driven app configuration

Files:
- `server/app/__init__.py`
- `server/.env.example`

What changed:
- App now reads `DATABASE_URL` and `JWT_SECRET_KEY` from environment variables with local defaults.
- `.env.example` now includes the variables used by the backend.

Why:
- Improve security and deployment readiness.
- Remove hard dependency on in-code configuration values.

### 6. Regression tests for critical route flows

Files:
- `server/tests/test_routes.py`

What changed:
- Added tests for creating transactions with date strings.
- Added tests for creating savings with date strings.
- Added tests for user creation behavior.

Why:
- Lock in the fixed behaviors.
- Catch regressions quickly in future route/controller refactors.

## Verification

Current regression command:

```bash
cd server
source .venv/bin/activate
pytest -q tests/test_routes.py
```

Expected result:
- All tests pass.

## Follow-up recommendations

1. Add dedicated create/update schemas for `Transaction`, `Saving`, and `Tag` if validation requirements diverge.
2. Add negative-case tests for malformed dates and missing required fields.
3. Replace development JWT secret values with long random secrets in real environments.
