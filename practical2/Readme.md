# WEB101 – RESTful Web Application

A frontend web application that integrates real-time weather data and simulated database operations through RESTful APIs, built with plain HTML, CSS, and JavaScript.

---

## APIs Used

| API | Purpose | Methods |
|---|---|---|
| [OpenWeatherMap](https://openweathermap.org/api) | Real-time weather data | GET |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) | Simulated database operations | POST, PUT, DELETE |

---

## Getting Started

No build tools or dependencies required. Just open the project in a browser.

1. **Clone or download the repository**
   ```bash
   git clone <your-repo-url>
   cd project-folder
   ```

2. **Add your OpenWeatherMap API key**

   In `script.js`, replace the placeholder with your key:
   ```js
   const API_KEY = "your_api_key_here";
   ```

   > Get a free key at [openweathermap.org](https://openweathermap.org/api)

3. **Open the app**

   Open `index.html` directly in your browser — no server needed.

---

## Project Structure

```
project-folder/
├── index.html      # User interface and layout
└── script.js       # All API logic and DOM interactions
```

---

## Features

### Tab-Based Navigation
The UI is split into three tabs for each type of operation:

- **GET Weather** – Fetch live weather by city name
- **POST Location** – Save a new location entry
- **Manage Locations** – Edit or delete existing entries

### HTTP Methods

- **GET** – Fetches weather data from OpenWeatherMap based on user input and renders it dynamically
- **POST** – Sends new location data to JSONPlaceholder and adds it to the UI as a card
- **PUT** – Opens a modal to edit an existing location and submits the update
- **DELETE** – Removes a location entry from the UI after sending a DELETE request

### UI Highlights
- Dynamic card rendering via JavaScript DOM manipulation
- Modal window for editing entries
- Tab switching without page reloads

---

## How It Works

```
User Input
    ↓
Event Listener (onclick)
    ↓
fetch() → API Request
    ↓
.json() → Parse Response
    ↓
DOM Update → Display Result
```

---

## Notes

- JSONPlaceholder is a mock API — data is not actually persisted between sessions.
- OpenWeatherMap requires a valid API key for requests to succeed.