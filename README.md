# React Generic DataTable Component

A strongly typed, production-ready, fully generic, and accessible React data table component built with TypeScript and modern React patterns.

---

## Overview

A strongly typed, production-ready, fully generic, and accessible React data table component built with TypeScript and modern React patterns. The component accepts any arbitrary data model `T extends object` and provides compile-time type safety across row data, column keys, cell rendering, sorting, and filtering callbacks with zero usage of `any`.

The architecture enforces strict separation of concerns:
- **Presentation Layer**: Pure UI rendering in `DataTable.tsx` and scoped styling in `DataTable.css`.
- **Business Logic Layer**: Headless generic hooks in `src/hooks/` (`useSort.ts` and `useFilter.ts`).
- **Data & Configuration Layer**: Strongly typed models and column definitions in `src/data/`.

---

## Documentation Index

Each major module within the project has its own dedicated documentation:

| Scope | Documentation File | Description |
| --- | --- | --- |
| **Root** | [README.md](./README.md) | Project overview, TypeScript deep dive, setup, and global architecture |
| **DataTable Component** | [DataTable README](./src/components/DataTable/README.md) | Component API, props contracts, design decisions, and accessibility |
| **Custom Hooks** | [Hooks README](./src/hooks/README.md) | Headless sorting (`useSort`), filtering (`useFilter`), and coordination |
| **Data & Models** | [Data README](./src/data/README.md) | `User` data model, `USER_COLUMNS` setup, and custom cell renderers |

---

## Core Engineering Principles

This implementation demonstrates production-grade frontend engineering principles:

1. **Strongly Typed Components**: All props, states, and callbacks are strictly bound to the generic type parameter `T`.
2. **Generic Architecture**: Flexible data table engine accepting arbitrary object shapes (`DataTable<T extends object>`).
3. **Strict State Modeling**: Discriminated unions and strict utility types for sort and filter states.
4. **Zero Any Policy**: 100% type-safe codebase with zero instances of `any` or `as any`.
5. **Decoupled Architecture**: UI presentation is cleanly separated from business logic and custom hooks.

---

## Key Features

- **Generic Typing (`DataTable<T>`)**: Works with any data record without type casting or runtime compromises.
- **Column-Level Type Safety**: Column definitions restrict `key` to `keyof T` and bind cell values to `T[keyof T]`.
- **Multi-Type Sorting**: Generic sorting engine supporting numbers, strings (`localeCompare`), and custom values. The toolbar provides a grouped selector with all Ascending options followed by all Descending options, while column headers allow click-to-toggle directly on the table.
- **Filtering and Search**: Real-time global search across all record attributes plus column-specific filter popovers with instant reset capability.
- **Custom Cell Renderers**: Flexible `render` function allowing custom badges, avatars, and formatted values.
- **Typed Callbacks**: Strongly typed events for `onSort`, `onFilter`, and `onRowClick`.
- **Clean Light UI**: Distraction-free design with clear separation between toolbar controls and table data, subtle border-radius (4px - 6px), and direct CSS values (no CSS variables).
- **Accessible Design**: Semantic HTML table structure, ARIA sort attributes, keyboard navigation support, and live region announcements.

---

## TypeScript Concepts Applied

| Concept | Implementation in Code | Location |
| --- | --- | --- |
| **Generics with Constraints** | `DataTable<T extends object>`, `useSort<T extends object>` | `DataTable.tsx`, `useSort.ts` |
| **keyof Operator** | `key: keyof T` ensures only valid properties of `T` can be configured as columns | `DataTable.types.ts` |
| **Indexed Access Types** | `render: (value: T[keyof T], row: T, index: number) => ReactNode` | `DataTable.types.ts` |
| **Utility Types** | `FilterState<T> = Partial<Record<keyof T, string>>` | `DataTable.types.ts` |
| **Discriminated Unions** | `type SortDirection = 'asc' \| 'desc'` | `DataTable.types.ts` |
| **Strict Null Checks** | Safe DOM root element narrowing with explicit guard | `src/main.tsx` |
| **Type Narrowing & Guards** | Sorting comparator distinguishes `number` from `string` at runtime | `useSort.ts` |
| **Generics in Component Props** | `DataTableProps<T extends object>` binding component API to dataset type | `DataTable.types.ts` |

---

## Architecture and Project Structure

```text
react-generic-datatable/
├── src/
│   ├── components/
│   │   └── DataTable/
│   │       ├── DataTable.tsx          # Main table component integrating useSort & useFilter
│   │       ├── DataTableToolbar.tsx   # Toolbar sub-component (search, filter pills, sort)
│   │       ├── DataTableToolbar.types.ts # Dedicated toolbar prop contracts and types
│   │       ├── DataTableIcons.tsx     # Reusable vector SVG icons (Search, Chevron, Clear, Sort)
│   │       ├── DataTable.css          # Vanilla CSS styles (direct values, zero CSS variables)
│   │       ├── DataTable.types.ts     # Generic type definitions and contracts
│   │       ├── index.ts               # Public component, icon, and type exports
│   │       └── README.md              # Dedicated component documentation
│   ├── hooks/
│   │   ├── useSort.ts                 # Headless generic sorting hook
│   │   ├── useFilter.ts               # Headless generic column-level filtering hook
│   │   └── README.md                  # Dedicated hooks documentation
│   ├── data/
│   │   ├── users.ts                   # Strongly typed dataset (User interface and 10 records)
│   │   ├── userColumns.tsx            # Column definitions with custom cell renderers
│   │   └── README.md                  # Dedicated data and models documentation
│   ├── assets/
│   │   ├── hero.png                   # Hero banner image
│   │   ├── typescript.svg             # TypeScript logo
│   │   └── vite.svg                   # Vite logo
│   ├── App.tsx                        # Host application rendering the DataTable
│   ├── App.css                        # Host application styling
│   └── main.tsx                       # React entry point with strict root checking
├── index.html                         # Application HTML shell
├── package.json                       # Project scripts and dependencies
├── tsconfig.json                      # Strict TypeScript compiler configuration
└── README.md                          # Project root documentation
```

---

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (version 9 or higher)

### Installation

1. Clone or open the repository:
   ```bash
   cd react-generic-datatable
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Type Checking

Verify that there are zero TypeScript compilation errors:

```bash
npx tsc --noEmit
```

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

---

## Component API Reference

### `DataTableProps<T>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `T[]` | Required | Array of data records to display. |
| `columns` | `Column<T>[]` | Required | Array of column definitions. |
| `rowKey` | `(row: T, index: number) => string \| number` | Optional | Custom unique key generator for rows. Falls back to `row.id` or row index. |
| `onRowClick` | `(row: T, index: number) => void` | Optional | Callback triggered when a row is clicked. |
| `onSort` | `(key: keyof T, direction: SortDirection) => void` | Optional | Callback triggered when sorting changes. |
| `onFilter` | `(filters: FilterState<T>) => void` | Optional | Callback triggered when column filters change. |
| `emptyMessage` | `string` | `'No data available.'` | Message displayed when no rows match. |
| `caption` | `string` | Optional | Accessible table caption for screen readers. |
| `className` | `string` | `''` | Custom CSS class name for outer container. |

### `Column<T>`

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `key` | `keyof T` | Required | Property key of the record `T`. |
| `header` | `string` | Required | Display header title. |
| `sortable` | `boolean` | `false` | Enables click-to-sort for this column. |
| `filterable` | `boolean` | `false` | Adds this column to toolbar filter dropdowns. |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment for header and cells. |
| `cellStyle` | `CSSProperties` | Optional | Custom inline styling applied to cells. |
| `render` | `(value: T[keyof T], row: T, index: number) => ReactNode` | Optional | Custom cell renderer function. |

---

## Technical Decisions and Standards

1. **Separation of Concerns**: Business logic (`useSort`, `useFilter`) is completely decoupled from presentation (`DataTable.tsx`).
2. **Zero `any` Policy**: Generics with constraints (`T extends object`) and `keyof T` replace all unsafe type escapes.
3. **Pure Vanilla CSS**: No CSS variables (`var(--...)`) or utility frameworks; explicit, reliable styling with clean tokens.
4. **Accessibility First**: Semantic HTML table elements (`th`, `td`, `caption`), ARIA sort attributes (`aria-sort`), keyboard navigation, and live search regions.
5. **Clean Design**: No unicode emojis; all icons are lightweight vector SVGs.
