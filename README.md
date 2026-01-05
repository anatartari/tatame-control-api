# Tatame Control API

Tatame Control API is a **NestJS** backend built with **Ports and Adapters (Hexagonal Architecture)** to manage martial arts school operations such as sports, students, registrations, and payments.

The focus is on clean boundaries, testable business logic, and independence from frameworks and infrastructure.

---

## Architecture Overview

This project follows **Hexagonal Architecture**, separating responsibilities into well-defined layers:

* **Domain**: Core business entities
* **Application**: Use cases (business rules)
* **Ports**: Interfaces that define contracts
* **Adapters**: Web and persistence implementations
* **Infrastructure**: Database and external configuration

---

## Project Structure

```
src/
├── infrastructure/
│   └── database/
│       ├── config/
│       └── migrations/
│
├── global/
│   ├── entities/
│   ├── enums/
│   ├── filters/
│   ├── interceptors/
│   ├── ports/
│   └── utils/
│
├── [feature]/
│   ├── domain/
│   │   └── entities/
│   ├── ports/
│   │   ├── repositories/
│   │   └── use-cases/
│   ├── adapters/
│   │   ├── persistence/
│   │   └── web/
│   ├── application/
│   │   └── use-cases/
│   ├── dto/
│   └── [feature].module.ts
│
├── app.module.ts
└── main.ts
```

Each feature (e.g. `student`, `sport`) is isolated and follows the same internal structure.

---

## Ports and Adapters

### Ports

* **Repository Ports** define data access contracts
* **Use Case Ports** define application operations

### Adapters

* **Web Adapters** expose HTTP endpoints (NestJS controllers)
* **Persistence Adapters** implement repository ports using TypeORM

### Dependency Flow

```
Adapters → Application → Ports → Domain
                ↑
         Infrastructure
```

The domain layer has no dependency on frameworks or databases.

**Applications** (`application/use-cases/`)
- Contains **business logic** and use cases that orchestrate domain operations
- Framework-agnostic: doesn't know about HTTP, databases, or external services
- Implements use case interfaces defined in `ports/use-cases/`
- Handles business rules, validations, transactions, and domain coordination
- Example: `CreateRegistrationUseCase` - orchestrates student creation, address and medical info persistence, and registration creation with proper transaction handling

**Adapters** (`adapters/`)
- **Concrete implementations** that connect the application to the external world
- Adapts specific technologies (HTTP, TypeORM, etc.) to the interfaces defined in `ports/`
- Two main types:
  - **Web Adapters** (`adapters/web/`): NestJS controllers that receive HTTP requests and call use cases
  - **Persistence Adapters** (`adapters/persistence/`): Repository implementations using TypeORM that implement repository ports

**Key Principle**: The `application` layer never depends on `adapters`. Adapters depend on ports (interfaces) and call application use cases.

**Domain** (`domain/entities/`)
- Contains **core business entities** that represent the fundamental concepts of the domain
- Pure domain models with business properties and relationships
- Framework-independent: entities may use TypeORM decorators for persistence, but the domain logic is separate
- Defines the vocabulary and structure of the business domain
- Example: `Registration` entity - represents a student's enrollment in a sport with status, relationships to Student, Sport, and Payment entities

**Ports** (`ports/`)
- **Interfaces (contracts)** that define how different layers communicate
- Two main types:
  - **Repository Ports** (`ports/repositories/`): Define data access contracts (e.g., `IRegistrationRepository`) that specify what operations can be performed on domain entities
  - **Use Case Ports** (`ports/use-cases/`): Define application operation contracts (e.g., `ICreateRegistrationUseCase`) that specify what business operations are available
- Enable dependency inversion: high-level modules depend on abstractions, not concrete implementations
- Example: `IRegistrationRepository` interface defines methods like `find()`, `save()`, `findWithPayments()` without specifying how they're implemented

**Infrastructure** (`infrastructure/`)
- Contains **technical configuration** and external system integrations
- Database configuration, connection settings, and migration files
- Framework-specific setup (TypeORM configuration, NestJS module configuration)
- Provides the technical foundation that the application layer uses indirectly through adapters
- Example: `typeorm.config.ts` - configures database connection, entity paths, and migration settings

---

## TypeORM Integration

* Database configuration and migrations live in `infrastructure/database`
* Persistence adapters implement repository ports while extending TypeORM repositories

Example:

```ts
@Injectable()
export class FeatureRepositoryAdapter
  implements IFeatureRepository {

  constructor(
    @InjectRepository(Feature)
    private readonly repository: Repository<Feature>,
  ) {}
}
```

---

## Dependency Injection

Ports are injected using **Symbol tokens** to enforce decoupling:

```ts
export const FEATURE_REPOSITORY = Symbol('FEATURE_REPOSITORY');

providers: [
  { 
    provide: FEATURE_REPOSITORY, 
    useClass: FeatureRepositoryAdapter 
  }
];
```

Use cases depend only on interfaces, never on concrete implementations.

---

## Environment Configuration

Environment files:

* `.env.development`
* `.env.production`

Main variables:

* `DB_HOST`
* `DB_PORT`
* `DB_USERNAME`
* `DB_PASSWORD`
* `DB_NAME`
* `NODE_ENV`

---

## API Documentation

Swagger documentation is available at:

```
/api
```

(Development mode only)

