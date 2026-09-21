# DataTable Component

A strongly typed, reusable, accessible, and generic React data table component.

---

## Architecture Overview

The `DataTable` follows a modular headless-hook architecture where presentation, state management, and business logic are decoupled into clear layers:

1. **`useSort<T>`** (Sorting Layer): Manages sort state, multi-type comparisons, and direction toggling.
2. **`useFilter<T>`** (Filtering Layer): Manages column-level filter queries and reset handling.
3. **`DataTable<T>`** (Presentation & Integration Layer): Pure UI component that directly consumes `useSort` and `useFilter`, coordinating search, sorting, filtering, and table rendering.

---

## File Responsibilities

| File | Responsibility |
| --- | --- |
| `DataTable.tsx` | Main orchestrator component rendering table markup (`<table>`, `<thead>`, `<tbody>`), integrating `useSort` and `useFilter`. |
| `DataTableToolbar.tsx` | Sub-component rendering toolbar controls (Search box, filter pills/dropdowns, clear button, results counter, and sort selector). |
| `DataTableToolbar.types.ts` | Type definitions and props contract (`DataTableToolbarProps<T>`) specific to the toolbar sub-component. |
| `DataTableIcons.tsx` | Reusable vector SVG icons (`SearchIcon`, `ChevronDownIcon`, `ClearIcon`, `SortIcon`) with zero external icon dependencies. |
| `DataTable.css` | Scoped styling with explicit color values (zero CSS variables, subtle 4px - 6px border radius). |
| `DataTable.types.ts` | Core type definitions and contracts (`DataTableProps<T>`, `Column<T>`, `SortState<T>`, `FilterState<T>`). |
| `index.ts` | Public barrel file exporting the components, icons, and public TypeScript contracts. |

---

## Quick Start Example

```tsx
import DataTable, { Column } from './components/DataTable';

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  status: 'active' | 'inactive';
}

const COLUMNS: Column<Employee>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'department',
    header: 'Department',
    sortable: true,
    filterable: true,
  },
  {
    key: 'salary',
    header: 'Salary',
    sortable: true,
    align: 'right',
    render: (value) => `$${(value as number).toLocaleString()}`,
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    filterable: true,
    render: (value) => (
      <span className={`badge badge--${value}`}>
        {String(value)}
      </span>
    ),
  },
];

export default function EmployeeList({ employees }: { employees: Employee[] }) {
  return (
    <DataTable<Employee>
      data={employees}
      columns={COLUMNS}
      rowKey={(row) => row.id}
      onRowClick={(row) => console.log('Row clicked:', row.name)}
      emptyMessage="No employees found."
    />
  );
}
```

---

## Type Contracts Reference

### 1. `Column<T>`

```typescript
export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  cellStyle?: CSSProperties;
  align?: 'left' | 'center' | 'right';
}
```

- **`key: keyof T`**: Guarantees at compile time that only valid properties of the data model `T` can be configured as columns.
- **`render: (value: T[keyof T], row: T, index: number) => ReactNode`**: Indexed access type ensures the value received matches the type of `T[keyof T]`.

### 2. `DataTableProps<T extends object>`

```typescript
export interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  rowKey?: (row: T, index: number) => string | number;
  onRowClick?: (row: T, index: number) => void;
  onSort?: (key: keyof T, direction: SortDirection) => void;
  onFilter?: (filters: FilterState<T>) => void;
  caption?: string;
  emptyMessage?: string;
  className?: string;
}
```

### 3. `DataTableToolbarProps<T extends object>`

```typescript
export interface DataTableToolbarProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  globalSearch: string;
  onGlobalSearch: (value: string) => void;
  filterState: FilterState<T>;
  onFilter: (key: keyof T, value: string) => void;
  onClearAllFilters: () => void;
  hasActiveFilters: boolean;
  totalResults: number;
  sortState: SortState<T>;
  onSort: (key: keyof T, direction: SortDirection) => void;
  onClearSort: () => void;
}
```

### 4. `SortState<T>` and `SortDirection`

```typescript
export type SortDirection = 'asc' | 'desc';

export type SortState<T> = {
  key: keyof T;
  direction: SortDirection;
} | null;
```

Represents the active sort state as a discriminated union, or `null` when in an unsorted natural state.

### 5. `FilterState<T>`

```typescript
export type FilterState<T> = Partial<Record<keyof T, string>>;
```

Utility type mapping any subset of `keyof T` to active search query strings without requiring all properties to be present.

---

## Hooks Integration

The `DataTable` component directly consumes `useSort` and `useFilter` without any intermediate wrapper:

```typescript
const { sortState, handleSort, clearSort, sortData } = useSort<T>(onSort);
const { filterState, handleFilter, clearFilters, filterData } = useFilter<T>(onFilter);
```

### Pipeline Execution Order:
1. **Column Filtering**: Evaluates each record against active `filterState` entries via `filterData(data)`.
2. **Global Search**: Filters remaining records against the global search text query across all item properties.
3. **Sorting**: Sorts the filtered subset using `sortData(result)`.

---

## Accessibility and Semantics

- **HTML5 Table Semantics**: Uses native `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` elements.
- **ARIA Sorting**: Column headers expose `aria-sort="ascending"`, `aria-sort="descending"`, or `aria-sort="none"`.
- **Keyboard Navigation**: Sortable column headers can be focused via `Tab` and activated with `Enter` or `Space`.
- **Screen Reader Announcements**: Uses live regions and ARIA attributes (`aria-label`, `role="search"`, `aria-expanded`) for interactive filters and search bars.
