# MiniBlog

A full-stack blogging platform where users can create an account, sign in, and publish, edit, or delete their own blog posts — complete with rich text formatting, featured image uploads, and a light/dark/system theme toggle.

**Live demo:** _add your Vercel/Netlify link here once deployed_

<!-- ![MiniBlog screenshot](./screenshots/home.png) -->
<!-- Add 2-3 screenshots or a short GIF here once you have them: Home page, a post detail page, and the Add Post editor look great in a README. -->

## Features

- 🔐 **Authentication** — email/password signup and login via Appwrite, with protected routes for authenticated-only pages
- ✍️ **Full post CRUD** — create, edit, and delete your own posts; other users' posts are read-only to you
- 🖋️ **Rich text editor** — TinyMCE-powered content editor supporting formatting, images, lists, tables, and more
- 🖼️ **Featured images** — upload a cover image per post, stored via Appwrite Storage
- 🌗 **Light / Dark / System theme** — a theme toggle that respects and live-syncs with the OS preference, persisted across visits
- 📱 **Responsive design** — mobile nav menu, responsive post grid, and a compact footer with an expandable "site links" section
- ⚡ **Optimistic-feeling UX** — skeleton loading states and empty-state screens instead of blank pages while data loads

## Tech Stack

| Layer | Technology |

|---|---|

| Frontend |--> React 19, Vite
| Routing |--> React Router
| State management |--> Redux Toolkit
| Styling |--> Tailwind CSS
| Forms |--> React-Hook-Form
| Rich text editing |--> TinyMCE (`@tinymce/tinymce-react`)
| Backend-as-a-Service |--> Appwrite (Auth, Database, Storage)

## Getting Started

### Prerequisites

- Node.js 18+
- An [Appwrite](https://appwrite.io) project (cloud or self-hosted) with:
  - A **Database** with a **Collection** for posts
  - A **Storage Bucket** for featured images
  - Appropriate read/write permissions configured for authenticated users

### Installation

```bash
git clone https://github.com/<your-username>/miniblog-appwrite.git
cd miniblog-appwrite
npm install
```

### Environment variables

Copy `.env.sample` to `.env` and fill in your Appwrite project details:

```bash
cp .env.sample .env
```

| Variable | Description |

|---|---|

| `VITE_APPWRITE_URL` |--> Your Appwrite API endpoint
| `VITE_APPWRITE_PROJECT_ID` |--> Your Appwrite project ID
| `VITE_APPWRITE_DATABASE_ID` |--> Database ID containing the posts collection
| `VITE_APPWRITE_COLLECTION_ID` |--> Collection ID for blog posts
| `VITE_APPWRITE_BUCKET_ID` |--> Storage bucket ID for featured images

You'll also need a TinyMCE API key (free tier available at [tiny.cloud](https://www.tiny.cloud/)) — add it as `VITE_TINYMCE_API_KEY` in your `.env`.

### Appwrite collection schema

Your posts collection should include the following attributes:

| Attribute | Type | Required |
|---|---|---|
| `title` | string | Yes |
| `content` | string | Yes |
| `featuredImage` | string (file ID) | Yes |
| `status` | string (`active` / `inactive`) | Yes |
| `userId` | string | Yes |

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── appwrite/         # Auth and database/storage service classes
├── components/       # Reusable UI components (Header, Footer, PostCard, forms, etc.)
├── config/           # Environment variable config
├── context/           # Theme (light/dark/system) context
├── pages/             # Route-level page components
├── store/             # Redux Toolkit store and auth slice
└── main.jsx           # Router setup and app entry point
```

## Known limitations / possible next steps

- No pagination — all posts load at once, which won't scale with a large number of posts
- No search or category/tag filtering
- No automated tests yet
- Error feedback currently logs to the console rather than showing user-facing toasts

## License

This project is open source and available under the [MIT License](LICENSE)..