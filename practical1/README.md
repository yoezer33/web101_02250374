 # WEB101 – Next.js Web Application

A basic web application built with **Next.js**, **React**, **Tailwind CSS**, and **React Hook Form** as part of the WEB101 practical assignment.

---

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework with App Router
- [React](https://react.dev/) – UI component library
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
- [React Hook Form](https://react-hook-form.com/) – Form handling and validation
- [React Icons](https://react-icons.github.io/react-icons/) – Icon library
- TypeScript & ESLint – Type safety and code quality

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/
│   ├── page.js               # Home page
│   ├── layout.js             # Root layout
│   ├── profile/page.jsx      # /profile
│   ├── upload/page.jsx       # /upload
│   ├── following/page.jsx    # /following
│   ├── explore/page.jsx      # /explore
│   ├── live/page.jsx         # /live
│   ├── login/page.jsx        # /login
│   └── signup/page.jsx       # /signup
│
└── components/
    ├── layout/
    │   └── MainLayout.jsx    # Shared header and navigation
    └── ui/
        ├── VideoCard.jsx     # Single video display component
        └── VideoFeed.jsx     # List of VideoCard components
```

---

## Features

- **App Router** – File-based routing using Next.js App Router
- **Main Layout** – Shared `MainLayout` component with navigation links (Home, Profile, Upload)
- **Video Components** – Reusable `VideoCard` and `VideoFeed` components for displaying video content
- **Authentication Forms** – Login and Signup forms built with React Hook Form, including field validation (required fields, minimum password length)

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Setup Reference

**Project created with:**
```bash
npx create-next-app@latest my-project --typescript --eslint --app
```

**Additional packages installed:**
```bash
npm install react-icons
npm install react-hook-form
```