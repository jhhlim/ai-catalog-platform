# AI Catalog Platform

A GitHub-ready monorepo project designed to match senior full-stack + AI product catalog roles.

## Why this project fits the job

This repo demonstrates:

- **React / Next.js** front-end dashboard
- **Node.js** service for LLM-driven product enrichment
- **Java / Spring Boot** service for validation and rule-based quality checks
- **REST APIs** across services
- **PostgreSQL** persistence via Docker Compose
- **Dockerized local development**
- **Testing** with Vitest and JUnit

## Architecture

```text
Next.js Dashboard
      |
      v
Node.js Enrichment API  ---> PostgreSQL
      |
      v
Java Validation API
```

## Features

- Product catalog input form
- AI attribute generation and contextual tagging
- SEO metadata generation
- Validation of required fields by category
- Searchable dashboard table
- Health endpoints for each service

## Monorepo structure

```text
apps/
  web/                    # Next.js front end
services/
  node-enrichment/        # Node.js / Express AI enrichment API
  java-validator/         # Spring Boot validation service
```

## Quick start

### Prereqs

- Node.js 20+
- Java 17+
- Docker + Docker Compose

### 1) Copy env files

```bash
cp apps/web/.env.example apps/web/.env.local
cp services/node-enrichment/.env.example services/node-enrichment/.env
```

### 2) Start PostgreSQL

```bash
docker compose up -d postgres
```

### 3) Run services locally

Terminal 1:
```bash
cd services/node-enrichment
npm install
npm run dev
```

Terminal 2:
```bash
cd services/java-validator
mvn spring-boot:run
```

Terminal 3:
```bash
cd apps/web
npm install
npm run dev
```

Open `http://localhost:3000`.

## Docker Compose (optional)

You can also use Docker Compose after adding your env values:

```bash
docker compose up --build
```

## Environment variables

### apps/web/.env.local

```env
NEXT_PUBLIC_NODE_API_URL=http://localhost:4000
```

### services/node-enrichment/.env

```env
PORT=4000
OPENAI_API_KEY=your-key-here
VALIDATOR_API_URL=http://localhost:8080
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/catalogdb
```

## How to demo this in interviews

Tell the story like this:

1. **Front end** in Next.js lets users submit catalog items and review enriched output.
2. **Node.js service** orchestrates AI enrichment and metadata generation.
3. **Java service** performs rule validation by category to simulate enterprise guardrails.
4. **PostgreSQL** persists input + enriched payloads.
5. **Docker Compose** shows container readiness.

## Suggested resume bullets

- Built a **full-stack AI catalog platform** using **Next.js, Node.js, Spring Boot, PostgreSQL, and Docker**.
- Developed **LLM-powered product enrichment APIs** for attribute generation, contextual tagging, and SEO metadata.
- Implemented **Java-based validation microservice** to enforce category-specific catalog quality rules.
- Designed scalable REST APIs and integrated cross-service workflows for enrichment, validation, and persistence.

## Future upgrades

- Add GraphQL gateway
- Add Redis caching
- Add pgvector for semantic search
- Add auth with NextAuth
- Add Kubernetes manifests
