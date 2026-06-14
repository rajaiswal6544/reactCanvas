# App Graph Builder

App Graph Builder is a small ReactFlow-based topology editor built for a take-home assignment. It presents an application graph on a dotted canvas, lets users switch between mocked applications, inspect service nodes, and edit node metadata directly from the UI.

The interface is intentionally styled like a modern infrastructure dashboard: dark by default, compact, canvas-first, and responsive. A light mode toggle is also included in the top-right controls.

## Getting Started

Install dependencies and start the Vite dev server:

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite, usually:

```bash
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
```

## What Is Included

- React + Vite + strict TypeScript
- ReactFlow canvas with draggable nodes, edges, zoom, pan, fit view, controls, and dotted background
- TanStack Query for app and graph fetching
- MSW-powered mock API with latency and controllable failures
- Zustand for minimal UI state: selected app, selected node, mobile drawer, inspector tab, and theme
- shadcn-style UI components for buttons, inputs, textarea, tabs, badge, sheet, skeleton, slider, and cards
- Desktop right panel with app selector and node inspector
- Mobile slide-over drawer for the same right-panel content
- Editable node name and description
- Synced runtime slider and numeric input that persist into ReactFlow node data
- Bonus additions: Add Node button, service/database styling, fit-view keyboard shortcut, and dark/light mode

## Mock API

The app uses MSW in development and serves the worker from `public/mockServiceWorker.js`.

Available mock endpoints:

- `GET /apps`
- `GET /apps/:appId/graph`
- `POST /mock-api/fail-next`
- `POST /mock-api/random-failures`

The graph data is intentionally kept in the mock API and TanStack Query. Zustand only stores UI state, not server data.

## Key Decisions

ReactFlow owns the editable graph state locally inside the canvas. When the selected app changes, the queried graph is copied into local `nodes` and `edges`, which keeps dragging, deleting, and inspector edits predictable.

The selected node itself is not stored globally. Zustand stores only `selectedNodeId`, and the selected node is derived from the current ReactFlow nodes. This avoids stale duplicated node data.

Inspector edits are routed through a small `updateNodeData` callback that updates ReactFlow nodes with `setNodes`. This keeps the assignment behavior explicit and easy to follow.

The layout follows the assignment structure: top bar, left icon rail, center dotted canvas, and right panel split into app list plus inspector. On smaller screens, that right panel moves into a Zustand-controlled sheet.

## Known Limitations

- Node edits are client-side only and are not written back to the mock API.
- The mock failure toggles are in-memory and reset when the browser/dev session restarts.
- The production build may show Vite's chunk-size warning because ReactFlow and UI dependencies add weight, but the build completes successfully.

## Verification

The project has been checked with:

```bash
npm run lint
npm run typecheck
npm run build
```
