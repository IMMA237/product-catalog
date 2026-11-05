# CodersHub Product Catalog

A React + Vite product catalog built for the CodersHub Labs internship (React notes, Module 11).

## Features

- Product list loaded with `fetch()` through a reusable `useFetch` custom hook
- Controlled search input that filters by name or category
- Product detail pages with React Router and `useParams`
- Global shopping cart with Zustand: add, remove, clear
- Error Boundary that shows a friendly fallback instead of a blank page
- Automated component tests with Vitest and React Testing Library
- Tailwind CSS styling with Bebas Neue headings, Outfit body text, and brand colors

## Tech stack

React, Vite, React Router, Zustand, react-error-boundary, Tailwind CSS, Vitest, React Testing Library

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm test` | Run the automated tests |
| `npm run lint` | Check the code with ESLint |
| `npm run build` | Create a production build in `dist/` |

## Project structure

```
public/products.json      Mock product API (loaded with fetch)
src/hooks/useFetch.js     Custom hook: data, loading, error
src/store/cartStore.js    Zustand cart store
src/pages/                List, detail, cart, and not-found pages
src/components/           ProductCard, CartButton, ErrorFallback
src/test/                 Vitest + React Testing Library tests
```

## Notes

- Product data is mock data stored in `public/products.json`, so the app works offline. No API keys or `.env` file are needed.
- Brand colors in `src/index.css` are placeholders and can be replaced with the official CodersHub colors.
- The cart is kept in memory, so it resets on a full page refresh.
- `/error-test` is a development-only route that crashes on purpose to demonstrate the Error Boundary.