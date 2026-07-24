# Movie Reservation System API

REST API for managing movies, showtimes, seat availability, reservations, and administrative reports.

This project is based on the roadmap.sh backend project:

https://roadmap.sh/projects/movie-reservation-system

Built with:

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod validation
- Swagger OpenAPI documentation


## Features

- Movie management
- Showtime management
- Seat availability tracking
- Reservation system
- Reservation conflict prevention
- Administrative reports
- Request validation
- Centralized error handling
- Swagger API documentation


## Project Structure

```
src
├── controllers
├── database
├── docs
├── generated
├── middlewares
├── routes
├── schemas
├── services
├── utils
├── app.ts
└── index.ts
```

Architecture:

```
Request
  |
Routes
  |
Controllers
  |
Services
  |
Prisma ORM
  |
PostgreSQL
```


## Requirements

- Node.js 20+
- PostgreSQL 15+
- npm


## Installation

Clone repository:

```bash
git clone https://github.com/mykytapilec/movie-reservation-system.git
```

Install dependencies:

```bash
npm install
```


## Environment Setup

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5435/movie_reservation?schema=public"
PORT=3000
```

You can use `.env.example` as a template.


## Database Setup

Generate Prisma client:

```bash
npm run db:generate
```

Run migrations:

```bash
npm run db:migrate
```


## Running the Application

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Start production server:

```bash
npm start
```


The API will be available at:

```
http://localhost:3000
```


## API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api/docs
```


## Health Check

Endpoint:

```
GET /health
```

Example response:

```json
{
  "status": "ok",
  "service": "movie-reservation-system"
}
```


## API Endpoints


### Movies

Base path:

```
/api/movies
```

Available operations:

```
GET     /api/movies
GET     /api/movies/:id
POST    /api/movies
PATCH   /api/movies/:id
DELETE  /api/movies/:id
```


### Showtimes

Base path:

```
/api/showtimes
```

Available operations:

```
GET     /api/showtimes
GET     /api/showtimes/:id
POST    /api/showtimes
PATCH   /api/showtimes/:id
DELETE  /api/showtimes/:id
```

Seat availability:

```
GET /api/showtimes/:id/seats
```


### Reservations

Base path:

```
/api/reservations
```

Available operations:

```
GET     /api/reservations
POST    /api/reservations
DELETE  /api/reservations/:id
```

Reservation rules:

- Seat must belong to the showtime auditorium
- Same seat cannot be reserved twice for the same showtime


### Reports

Base path:

```
/api/reports
```

Available operations:

```
GET /api/reports/summary
GET /api/reports/showtimes/:id
```


## Validation

Request validation is implemented using Zod.

Invalid requests return validation errors through the centralized error middleware.


## Error Handling

All application errors use a unified response format:

```json
{
  "success": false,
  "message": "Error message"
}
```


## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build TypeScript project |
| `npm run start` | Start production server |
| `npm run check` | Run TypeScript checks and ESLint |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |


## Database Models

Main entities:

- Movie
- Auditorium
- Seat
- Showtime
- Reservation


Relationships:

```
Movie
 |
 └── Showtime
       |
       ├── Auditorium
       |      |
       |      └── Seat
       |
       └── Reservation
              |
              └── Seat
```


## Development Workflow

Git strategy:

```
main
 |
dev
 |
feature/*
```

Feature branches are created from `dev` and merged back after validation.


## Technologies

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| TypeScript | Programming language |
| Express | Web framework |
| Prisma | Database ORM |
| PostgreSQL | Database |
| Zod | Validation |
| Swagger | API documentation |


## License

MIT