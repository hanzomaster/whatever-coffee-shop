# Coffee Shop API

A modernized coffee shop management API built with NestJS 11, Prisma, and Bun.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [NestJS 11](https://nestjs.com/)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Auth**: JWT with Passport
- **API Docs**: Swagger/OpenAPI
- **Linting**: [Biome](https://biomejs.dev/)
- **Container**: Docker

## Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- PostgreSQL 16+ (or Docker)

## Quick Start

### Option 1: Docker (Recommended)

```bash
# Start all services
docker compose up -d

# Access the API
open http://localhost:3333/api/docs
```

### Option 2: Local Development

```bash
# Install dependencies
cd api && bun install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# Start development server
bun run start:dev
```

## Available Scripts

```bash
# Development
bun run start:dev    # Start with hot reload
bun run start:debug  # Start with debugger

# Production
bun run build        # Build for production
bun run start:prod   # Run production build

# Database
bun run db:generate  # Generate Prisma client
bun run db:push      # Push schema to DB
bun run db:migrate   # Run migrations
bun run db:studio    # Open Prisma Studio

# Code Quality
bun run lint         # Run Biome linter
bun run lint:fix     # Fix lint issues
bun run format       # Format code

# Testing
bun test             # Run tests
bun test --watch     # Watch mode
```

## API Documentation

Once running, access Swagger docs at: `http://localhost:3333/api/docs`

## Database Schema

![Database Diagram](docs/coffee%20shop%20diagram.png)

### Models

- **User**: Authentication and authorization
- **Customer**: Customer information and balance
- **Store**: Store locations and revenue
- **Product**: Product catalog with pricing
- **Supplier**: Supplier information
- **Order**: Customer orders
- **OrderDetail**: Line items for orders
- **SupplierDetail**: Supplier transactions

## Environment Variables

```env
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/coffee_shop
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=1d
PORT=3333
```

## Contributors

- Tran Tuan Thinh - 20020265
- Quach Ngoc Minh - 20020261
- Nguyen Viet Hoang - 20020196

## License

ISC
