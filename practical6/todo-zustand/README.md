# WEB101 – Todo List (State Management with Zustand)

A fully functional **Todo List** application built with React and Zustand, demonstrating lightweight global state management without Provider wrappers or prop drilling.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) + [Vite](https://vitejs.dev/) | Frontend framework and build tool |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management |
| CSS | Styling |

---

## Getting Started

```bash
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## Features

- Add new todos via a text input
- Mark todos as complete / incomplete with a checkbox
- Delete individual todos
- Clear all completed todos at once (button only appears when there's at least one completed item)
- Live counts of total and completed todos
- **Persistence** — todos survive page refreshes via `localStorage` (Zustand `persist` middleware)

---

## Project Structure

```
src/
├── components/
│   ├── TodoInput.jsx     # Input form for adding todos
│   ├── TodoItem.jsx      # Single todo row with checkbox & delete
│   └── TodoList.jsx      # Renders all todos + clear completed button
├── store/
│   └── todoStore.js      # Zustand store — state and all actions
├── App.jsx               # Root component with live stats display
└── App.css               # Styling
```

---

## How It Works

### The Zustand Store

All state and actions live in one place (`todoStore.js`) with four actions:

| Action | Description |
|---|---|
| `addTodo` | Adds a new todo item |
| `toggleTodo` | Flips a todo's completed status |
| `removeTodo` | Deletes a single todo by ID |
| `clearCompleted` | Removes all completed todos at once |

Wrapped in `persist` middleware to automatically sync state to `localStorage` — no manual `useEffect` or `JSON.stringify` needed.

### Selectors

Each component subscribes to only the state it needs, preventing unnecessary re-renders:
```js
const addTodo = useTodoStore(state => state.addTodo)
```

---

## Key Concepts

**Zustand vs Context API** — Zustand requires no Provider wrapper. Any component can call `useTodoStore()` directly and subscribe to just the slice of state it needs, resulting in less boilerplate and more targeted re-renders.

**The `set` function** — receives a callback with the current state and returns only the updated slice, similar to `setState` but more flexible.

**`persist` middleware** — wrapping the store in `persist(...)` with a name key handles reading from and writing to `localStorage` automatically.

---

## Known Issues & Fixes

| Issue | Fix |
|---|---|
| `App.jsx` already existed from Vite template | Used `cat >` to overwrite the file instead of creating a new one |
| "Clear Completed" showing when nothing was completed | Changed condition from `todos.length > 0` to `todos.some(todo => todo.completed)` |
| Vite template imports conflicting with new structure | Replaced entire `App.jsx` and removed unused `index.css` references |

---

## Build Output

```
✓ 25 modules transformed
dist/index.html         0.46 kB
dist/assets/index.css   3.48 kB
dist/assets/index.js  195.41 kB

✓ built in 543ms — 0 errors, 0 warnings
```

---

## References

- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zustand Persist Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)