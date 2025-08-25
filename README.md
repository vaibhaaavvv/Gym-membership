# Gym Membership CRUD App fitforge

A simple full‑stack CRUD application for managing gym members, built with Node.js, Express, MongoDB (via Mongoose), and EJS templates. It supports listing, creating, updating, and deleting members via both server-rendered pages and JSON API endpoints.

## Features
- Server-rendered UI using EJS: home, add member, and update member pages
- RESTful JSON API for members: create, read (list/find by id), update, delete
- MongoDB persistence using Mongoose
- Static assets served for CSS and client JS

## Tech Stack
- Node.js, Express
- EJS templating
- MongoDB, Mongoose
- Axios (front-end requests), Body-parser, Morgan (optional logging)

## Prerequisites
- Node.js 14+ (or newer)
- A running MongoDB instance (local or Atlas)

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure your MongoDB connection:
   - The current code connects using a hardcoded URI in `server/database/connection.js`.
   - For security, you should use an environment variable instead. Example approach:
     - Create a `.env` file with:
       ```bash
       MONGODB_URI="your-mongodb-connection-string"
       PORT=3000
       ```
     - Update `server/database/connection.js` to read from `process.env.MONGODB_URI` and fall back if needed. (Not applied in code yet.)

3. Start the server:
   - Development (auto-restart if you add a `start:dev` script):
     ```bash
     npx nodemon app.js
     ```
   - Or run directly:
     ```bash
     node app.js
     ```

4. Open in your browser:
   - App runs on `http://localhost:3000` by default.

## Available Scripts
The project currently defines only a placeholder test script. Commonly used commands:
- Start: `node app.js`
- Dev (if you prefer nodemon): `npx nodemon app.js`

You may add scripts to `package.json`, for example:
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

## Project Structure
```
Gym-membership-master/
├─ app.js                     # Express app entrypoint
├─ Assets/
│  ├─ css/style.css           # Styles
│  └─ js/index.js             # Client-side JS
├─ server/
│  ├─ controller/controller.js# API controller logic (CRUD)
│  ├─ database/connection.js  # Mongoose connection
│  ├─ model/model.js          # Mongoose schema/model
│  ├─ routes/router.js        # Express routes (pages + API)
│  └─ services/render.js      # View rendering services
├─ views/                     # EJS templates
│  ├─ include/_header.ejs
│  ├─ include/_footer.ejs
│  ├─ include/_form.ejs
│  ├─ include/_show.ejs
│  ├─ index.ejs               # Home page (list)
│  ├─ add_user.ejs            # Add member page
│  └─ update_user.ejs         # Update member page
├─ package.json
└─ README.md
```

## Data Model
Mongoose schema (`server/model/model.js`):
- `name` (String, required)
- `email` (String, required, unique)
- `phone` (Number)
- `gender` (String)
- `membership` (Number) — e.g., plan code or months
- `membershipvalidupto` (Date)

Collection/model: `memberdb`.

## Routes
### Pages (EJS)
- GET `/` → Home page (list of members)
- GET `/add-user` → Add new member form
- GET `/update-user` → Update member form

### REST API
Base path: `/api/users`

- POST `/api/users` → Create a member
- GET `/api/users` → Get all members or one by id (e.g., `/api/users?id=<id>`)
- PUT `/api/users/:id` → Update a member by id
- DELETE `/api/users/:id` → Delete a member by id

## API Usage Examples
Replace `<BASE>` with `http://localhost:3000` during local development.

- Create
  ```bash
  curl -X POST "<BASE>/api/users" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "name=John Doe&email=john@example.com&phone=1234567890&gender=Male&membership=12&membershipvalidupto=2026-12-31"
  ```

- List all
  ```bash
  curl "<BASE>/api/users"
  ```

- Get by id
  ```bash
  curl "<BASE>/api/users?id=<MONGO_ID>"
  ```

- Update by id
  ```bash
  curl -X PUT "<BASE>/api/users/<MONGO_ID>" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Jane Doe",
      "membership": 6
    }'
  ```

- Delete by id
  ```bash
  curl -X DELETE "<BASE>/api/users/<MONGO_ID>"
  ```

Notes:
- The server uses `body-parser` and accepts `application/x-www-form-urlencoded` for form posts and `application/json` for API updates.
- The views use Axios to interact with the API from the browser.

## Configuration
- Port: default `3000` (set in `app.js`). You may parameterize it via `process.env.PORT` if desired.
- MongoDB connection: currently hardcoded in `server/database/connection.js`. For production, move this to an environment variable and do not commit secrets.

## Security Considerations
- Do not commit real MongoDB credentials. Use environment variables and a `.env` file ignored by Git.
- Validate and sanitize input on create/update in the controller before saving to the database (the controller already enforces schema via Mongoose; consider adding explicit validation as needed).

## Troubleshooting
- Cannot connect to MongoDB:
  - Verify your connection string and network/IP allowlist (if using Atlas).
  - Ensure SRV resolution works or use a standard connection URI.
- EADDRINUSE: Port 3000 already in use → stop the conflicting process or change the port.
- 404s on CSS/JS → check static paths under `/css`, `/js` and files in `Assets`.
- Unique email errors → ensure `email` is unique or change data during testing.

## License
ISC (as per `package.json`). Update if your preferred license differs.

## Acknowledgements
Built by Vaibhav as a CRUD example for gym membership management. 
