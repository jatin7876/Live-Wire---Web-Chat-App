# SyncTalk

A secure, real-time messaging application built with React, Node.js, Express, MongoDB, and Socket.IO.

## Features

- **Real-time messaging** - Instant message delivery using WebSockets (Socket.IO)
- **Authentication** - JWT-based auth with secure HTTP-only cookies
- **User profiles** - Customizable profiles with avatar support
- **Responsive UI** - Modern chat interface built with React + Tailwind CSS
- **State management** - Zustand for lightweight client-side state
- **Toast notifications** - User feedback with react-hot-toast

## Tech Stack

### Frontend
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Socket.IO Client
- Zustand (state management)
- Axios (HTTP client)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO (WebSockets)
- JWT Authentication
- bcryptjs (password hashing)

## Project Structure

```
synctalk_new/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── lib/             # Database & Socket setup
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   └── index.js         # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── lib/             # Axios instance
    │   ├── pages/           # Page components
    │   ├── store/           # Zustand stores
    │   ├── App.jsx          # Root component
    │   └── main.jsx         # Entry point
    ├── .env                 # Environment variables (optional)
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

Start development server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in `frontend/` (optional):
```env
VITE_API_URL=http://localhost:5000
```

Start development server:
```bash
npm run dev
```

Frontend runs at `http://localhost:5173`, Backend at `http://localhost:5000`.

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/:userId` | Get conversation with user |
| POST | `/api/messages` | Send message |

## WebSocket Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `connection` | Client → Server | Auth token in handshake auth |
| `newMessage` | Server → Client | `{ senderId, receiverId, content }` |
| `getOnlineUsers` | Server → Client | `userId[]` |

## Environment Variables

### Backend
| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret for JWT signing |
| `NODE_ENV` | No | Environment (development/production) |

### Frontend
| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | Backend API URL (default: http://localhost:5000) |

## Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use a process manager (PM2, Railway, Render, etc.)
3. Ensure MongoDB URI allows production IPs

### Frontend
```bash
npm run build
```
Deploy `dist/` folder to Vercel, Netlify, or any static host.

## License

MIT