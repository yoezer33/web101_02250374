# WEB101 – Infinite Scroll (TikTok Clone)

An enhancement to the TikTok-style video feed implementing **infinite scrolling** with cursor-based pagination, powered by TanStack React Query and the Intersection Observer API.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | Frontend framework (App Router) |
| [TanStack React Query](https://tanstack.com/query/latest) | Infinite query management and caching |
| [Axios](https://axios-http.com/) | HTTP client |
| [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | Detecting scroll position to trigger next page load |
| [Express.js](https://expressjs.com/) | Backend API |
| [Prisma ORM](https://www.prisma.io/docs) | Database access layer |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |

---

## Getting Started

### Install new dependencies
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

### Run the app
```bash
# Backend
cd WEB102_Sonia/practical4/server
npm run dev
# Runs on http://localhost:5000

# Frontend
cd WEB101_Sonia/practical1
npm run dev
# Runs on http://localhost:3000
```

---

## How It Works

### Cursor-Based Pagination (Backend)

Instead of offset-based pagination, the backend uses a **cursor** (the ID of the last fetched item) so new items are never duplicated or skipped when the feed updates.

The **n+1 pattern** is used to detect if a next page exists — the backend fetches `limit + 1` items and checks if the extra item exists:

```
GET /api/videos?limit=10&cursor=20
```

Response format:
```json
{
  "videos": [...],
  "nextCursor": 30,
  "hasNextPage": true
}
```

### Infinite Scroll (Frontend)

A hidden **sentinel `<div>`** sits at the bottom of the feed. The `useIntersectionObserver` hook watches it — when it enters the viewport, `fetchNextPage()` is triggered via `useInfiniteQuery`.

```
User scrolls down
      ↓
Sentinel div enters viewport
      ↓
Intersection Observer fires
      ↓
fetchNextPage() called
      ↓
Next batch of videos appended to feed
```

---

## Changes Made

### Backend
- Updated `getAllVideos` controller to accept `limit` and `cursor` query params
- Implemented the n+1 pattern to determine `hasNextPage`
- Created `getFollowingVideos` for the following feed with the same pagination logic
- Added `/following` route

### Frontend
- Created `QueryProvider` to wrap the app with `QueryClientProvider`
- Updated `videoService.js` to pass `pageParam` as the cursor in API calls
- Created `useIntersectionObserver` custom hook
- Updated `VideoFeed.jsx` to use `useInfiniteQuery` instead of `useQuery`
- Added a sentinel `<div>` with height at the bottom of the feed

---

## Known Issues & Fixes

| Issue | Fix |
|---|---|
| Duplicate `RootLayout` error | Removed duplicate definition; merged all providers into one layout file |
| Cursor treated as string, breaking DB query | Wrapped cursor with `parseInt()` since DB IDs are integers |
| `profilePicture` vs `avatar` field mismatch | Checked `schema.prisma` and updated all references to use `avatar` |
| Mixed module systems (`export` and `exports` in same file) | Standardised entire backend to CommonJS (`exports.functionName`) |
| Infinite scroll not triggering next page | Fixed Intersection Observer setup; added sentinel `div` with height; ensured `getNextPageParam` returns `undefined` when no next page |
| Confusion with `useInfiniteQuery` setup | Used React Query DevTools to trace `pageParam` flow between requests |

---

## Key Concepts

**Cursor-based pagination** fetches data relative to a specific item rather than a page number, preventing duplicate or skipped items when new content is added to the feed.

**`useInfiniteQuery`** from React Query manages paginated data by automatically accumulating pages and exposing `fetchNextPage()` and `hasNextPage` — no manual state needed.

**Intersection Observer** is a browser-native API that efficiently detects when an element enters the viewport without firing on every scroll event.

---

## References

- [TanStack React Query Documentation](https://tanstack.com/query/latest)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDN – Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)