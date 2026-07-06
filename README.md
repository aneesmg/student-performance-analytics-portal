# Student Performance Analytics Portal (SPAP)

A full-stack MERN application for tracking, analyzing, and reporting student academic performance.

## Tech Stack

- **Frontend:** React 18, React Router v6, Recharts, Axios
- **Backend:** Node.js, Express.js, Mongoose, JWT
- **Database:** MongoDB
- **Tools:** VS Code, Git, Nodemon

## Project Structure

```
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page components
│       ├── services/        # API client
│       └── styles/          # Global styles
├── server/                  # Express backend
│   ├── config/              # DB and app config
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Auth, validation
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── utils/              # Helpers
└── docs/                   # Documentation
    ├── architecture/
    ├── api/
    ├── database/
    ├── roles/
    └── wireframes/
```

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB v7+
- npm v9+

### Installation

```bash
npm run install-all
```

### Development

```bash
npm run dev     # Start backend with nodemon
npm start       # Start both frontend and backend
```

## API Documentation

See [docs/api/api-documentation.md](docs/api/api-documentation.md)

## User Roles

| Role    | Access Level |
|---------|-------------|
| Admin   | Full system access |
| Teacher | Manage students & grades |
| Student | View personal data |

## License

MIT © CODIORA
