# PDR.Cloud - Technical Assessment Solution

A full-stack application built with Angular, NestJS, and Nx monorepo architecture, demonstrating modern web development practices with shared validation schemas and reactive forms.

### Prerequisites
```
node version: v22.18.0
npm version: 10.9.3
Nx CLI (optional): npm install -g nx
```

How to run the project:

```bash
# Install dependencies
npm install
```

```bash
# Start both frontend and backend
nx serve frontend
```

The frontend will automatically proxy API requests to the backend.

### Architecture Overview

```
pdr-cloud/
├── apps/
│   ├── api/                 # NestJS backend application
│   └── frontend/           # Angular frontend application
├── libs/
│   ├── shared/             # Shared DTOs, schemas, and types
│   ├── shared-data-access/ # Backend data access layer
│   └── shared-ui/          # Reusable Angular components, pipes, validators and utilities
└── README.md
```

### Key Architectural Decisions

- Shared Validation Schemas: Zod schemas defined in libs/shared are used consistently across both frontend and backend

- Repository Pattern: Abstract base repository with file-based persistence

- Write Queue: Ensures consistent file writes with operation sequencing

- Modular Design: Feature-based organization with clear separation of concerns

### POTENTIAL IMPROVEMENTS IN REAL WORLD PROJECT

- Extract snackbar logic into a reusable shared service to avoid code duplication and enhance maintainability.
- Extract reactive form validation errors to a shared `ValidationErrors` component when validation logic expands.
- use feature, ui, util, data-access structure in nx (https://nx.dev/docs/features/enforce-module-boundaries, https://www.angulararchitects.io/blog/sustainable-angular-architectures-2/)
- typos `birthDtae` or `fistName` are ignored and represented in UI as `N/A` and should be fixed for example with migration scripts
- I usually stick with the good old Angular naming conventions using suffixes like .component, .service, .pipe, and so on. From my personal experience, they make the codebase more readable and easier to navigate, especially in larger projects.
  However, in this case, I decided not to modify the CLI generator settings and just went with the default (new) naming convention.
- Swagger UI, TailwindCSS, Jest & Playwright tests:
- Swagger UI is convenient for testing APIs interactively and can also be used to generate HTTP services automatically (e.g., `UsersService`) via tools like `@openapitools/openapi-generator-cli`.
- TailwindCSS has become a standard CSS library recently and integrates well with Nx, but in this project I opted for Angular Material styles or "pure" (S)CSS.
- Covering code with unit tests (Jest) and end-to-end tests (Playwright) is considered good practice in real-world projects to ensure maintainability and reduce regressions.
