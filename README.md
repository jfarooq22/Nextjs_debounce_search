# ER CareView — Staff Directory

A staff directory search feature 

## Getting Started
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the Staff Directory automatically.

## Running Tests
```bash
npm run test:run
```

## Feature

**Option B: Staff Directory Search**

I chose this feature because I felt I could deliver a complete, robust search experience within the 4-hour timeframe — including proper loading states, error handling, accessibility, and a polished UI that aligns with the provided Figma design language.

## Technical Decisions

### 1. Zod schema as single source of truth

Rather than defining TypeScript types separately from validation logic, I used Zod schemas in `lib/schemas/staff.ts` and derived types from them using `z.infer`. This means the API route and the frontend share the same type definitions — they cannot drift apart silently.

### 2. Debouncing the query key, not the input

The search input updates on every keystroke for a responsive UI, but the TanStack Query `queryKey` only updates after a 300ms debounce. This means fetches only fire when the user has paused typing, while the input itself feels instant. A custom `useDebounce` hook handles this cleanly and is reusable across the codebase.

### 3. Custom hook for separation of concerns

All data fetching and search logic lives in `lib/hooks/useStaffSearch.ts`, completely separate from the UI components. This makes the logic independently testable without rendering any components, and keeps the components focused purely on presentation.

### 4. TanStack Query with placeholderData

Using `placeholderData: (previousData) => previousData` keeps previous search results visible while new results load. This prevents the UI from flickering to an empty state between searches — a small detail that meaningfully improves the feel of the search experience.

### 5. Dark theme aligned to Figma

Although the Figma only provided a dashboard design, I extracted the design language — dark navy backgrounds, blue accents, subtle borders — and applied it to the Staff Directory. This shows how the feature would sit consistently within the broader CareView product.

## Accessibility

- Semantic HTML throughout (`article`, `nav`, `main`, `header`, `section`)
- ARIA labels on all interactive elements
- `role="status"` live region announces result counts to screen readers
- `aria-busy` on the search input during loading
- `aria-hidden` on decorative icons
- Keyboard navigable — all interactive elements are reachable via tab

## Mock Data

The brief mentioned mock data would be supplied. I reached out to confirm expectations and proceeded with self-designed mock data to avoid blocking progress. The data is isolated in `lib/mock-data/staff.ts` and structured to be easily swappable if provided data differs.

## What I'd Add With More Time

- **Filter by availability or department** — the data shape already supports it, the UI just needs filter controls
- **URL-based search state** — storing the search term in the URL (`/staff?search=nurse`) would make results shareable and support browser back/forward navigation
- **Additional pages** — Patient Search and Dashboard are referenced in the nav, aligning with the broader CareView application structure from the Figma
- **Pagination or virtual scrolling** — important for production where staff lists could be thousands of records


## Stack

- Next.js 16 (App Router)
- TypeScript
- TanStack Query v5
- Zod v4
- Tailwind CSS
- Vitest + React Testing Library
