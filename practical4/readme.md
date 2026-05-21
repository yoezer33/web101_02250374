# WEB101 – TikTok Clone (Frontend + Backend Integration)

A full-stack TikTok-style web application connecting a **Next.js** frontend to an **Express.js** backend with user authentication, video feeds, social interactions, and file uploads.

---

## Tech Stack

### Frontend (WEB101)
| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | Frontend framework with App Router |
| [React Context API](https://react.dev/reference/react/createContext) | Global authentication state |
| [Axios](https://axios-http.com/) | HTTP client for API calls |
| [jwt-decode](https://github.com/auth0/jwt-decode) | Decoding JWT tokens on the frontend |
| [react-hot-toast](https://react-hot-toast.com/) | User notification toasts |
| [React Icons](https://react-icons.github.io/react-icons/) | UI icons |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |

### Backend (WEB102)
| Technology | Purpose |
|---|---|
| [Express.js](https://expressjs.com/) | Backend API framework |
| [Prisma ORM](https://www.prisma.io/docs) | Database access layer |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [Multer](https://github.com/expressjs/multer) | File upload middleware |
| [JWT](https://jwt.io/) | Authentication tokens |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- PostgreSQL running locally
- Backend (WEB102) set up and running

### 1. Backend Setup
```bash
cd WEB102_Sonia/practical4/server
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd WEB101_Sonia/practical1
npm install axios jwt-decode react-hot-toast
npm run dev
# App runs on http://localhost:3000
```

### 3. Environment Variables

Create a `.env.local` file in the frontend root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> **Important:** Restart the dev server after adding environment variables.

---

## Project Structure

```
src/
├── app/
│   ├── page.js                        # Home feed
│   ├── layout.js                      # Root layout (wraps AuthProvider)
│   ├── following/page.jsx             # Feed from followed users
│   ├── explore-users/page.jsx         # Discover & follow users
│   ├── upload/page.jsx                # Video upload form
│   ├── profile/[userId]/page.jsx      # Dynamic user profile page
│   ├── login/page.jsx
│   └── signup/page.jsx
│
├── components/
│   ├── layout/MainLayout.jsx          # Navigation (auth-aware)
│   └── ui/
│       ├── VideoCard.jsx              # Single video with like/unlike
│       ├── VideoFeed.jsx              # Video list with loading/error states
│       ├── Modal.jsx
│       ├── AuthForms.jsx              # Login & register forms
│       └── AuthModal.jsx
│
├── contexts/
│   └── authContext.jsx                # Auth state (login/logout/register)
│
├── lib/
│   └── api-config.js                  # Axios instance with JWT interceptors
│
└── services/
    ├── videoService.js                # Video API calls
    ├── userService.js                 # User/follow API calls
    └── uploadService.js               # Multipart file upload
```

---

## Features

- **JWT Authentication** – Login, register, and logout with token-based auth persisted across sessions
- **Protected Routes** – Following and Upload pages only visible when logged in
- **Video Feed** – Home feed displays all videos; Following feed shows only videos from followed users
- **Like / Unlike** – Toggle likes on videos with real-time UI update
- **User Discovery** – Explore page to find and follow/unfollow other users
- **Dynamic Profiles** – View any user's profile and their uploaded videos at `/profile/[userId]`
- **Video Upload** – Upload video and thumbnail files with preview, sent as `multipart/form-data`
- **Toast Notifications** – Feedback for login, logout, errors, and upload success

---

## Known Issues & Fixes

| Issue | Fix |
|---|---|
| Files created in wrong project folder | Moved all files to `practical1`; reinstalled packages there |
| API calls failing silently | Added `NEXT_PUBLIC_API_URL` to `.env.local` and restarted server |
| Auth routes returning 404 | Updated calls from `/auth/login` to `/users/login` to match backend routes |
| Case-sensitivity errors on Windows | Deleted and recreated files with correct capitalisation (`AuthForms.jsx`) |
| File upload causing 500 error | Added `multer` middleware to backend; updated controller to read `req.files` |
| `router.push()` during render error | Moved redirect into a `useEffect` hook |
| Prisma field name mismatch | Aligned all field names to match schema: `title`, `description`, `url`, `thumbnail` |

---

## API Endpoints Used

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users/login` | Log in a user |
| POST | `/users/register` | Register a new user |
| GET | `/videos` | Fetch all videos |
| GET | `/videos/following` | Fetch feed from followed users |
| POST | `/videos` | Upload a new video (multipart) |
| POST | `/videos/:id/like` | Like or unlike a video |
| GET | `/users/:id` | Get user profile |
| POST | `/users/:id/follow` | Follow or unfollow a user |

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Axios Documentation](https://axios-http.com/)
- [JWT Authentication](https://jwt.io/)
- [Prisma ORM Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Multer Documentation](https://github.com/expressjs/multer)