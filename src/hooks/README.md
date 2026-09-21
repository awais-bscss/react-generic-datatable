# Custom Hooks

A collection of generic, headless hooks providing reusable state and operations for data manipulation.

---

## Directory Overview

| Hook File | Purpose | Generic Signature |
| --- | --- | --- |
| `useSort.ts` | Multi-type sorting and direction toggling | `useSort<T extends object>(onSort?)` |
| `useFilter.ts` | Multi-column filtering with partial state mapping | `useFilter<T extends object>(onFilter?)` |

---

## `useSort<T>`

### Purpose
Provides stateful sorting logic for any array of objects `T extends object`. It supports sorting across numeric, string, and complex fields with direction toggling or explicit direction control.

### TypeScript Signature

```typescript
export function useSort<T extends object>(
  onSort?: (key: keyof T, direction: SortDirection) => void
): {
  sortState: SortState<T>;
  handleSort: (key: keyof T, explicitDirection?: SortDirection) => void;
  clearSort: () => void;
  sortData: (data: T[]) => T[];
};
```

### Key Behaviors:
- **Toggling & Explicit Control**: When called as `handleSort(key)`, clicking the same column toggles between `'asc'` and `'desc'`. When called as `handleSort(key, 'asc')`, it explicitly sets the sort to ascending.
- **Reset Support**: Calling `clearSort()` resets the sort state to `null`.
- **Type Narrowing & Guards**:
  - If both compared values are `number`, it uses numerical difference `aVal - bVal`.
  - If both compared values are `string`, it uses `String.prototype.localeCompare` for accurate alphabetical ordering.
  - For mixed or other types, values are safely coerced to strings and compared.
- **Pure Function**: `sortData(data)` creates a shallow copy `[...data].sort(...)`, preserving original array immutability.
- **Optional Callback**: Invokes `onSort(key, direction)` whenever the active sort changes.

---

## `useFilter<T>`

### Purpose
Provides multi-column filtering for any array of objects `T extends object`. It tracks active filters per column key and filters datasets accordingly.

### TypeScript Signature

```typescript
export function useFilter<T extends object>(
  onFilter?: (filters: FilterState<T>) => void
): {
  filterState: FilterState<T>;
  handleFilter: (key: keyof T, value: string) => void;
  clearFilters: () => void;
  filterData: (data: T[]) => T[];
};
```

### Key Behaviors:
- **State Pruning**: Setting an empty string `''` automatically deletes that key from `filterState`, keeping the state object compact.
- **Case-Insensitive Substring Match**: Checks whether `String(item[key]).toLowerCase().includes(query.toLowerCase())`.
- **Reset Support**: Calling `clearFilters()` resets all column filters in a single operation.
- **Optional Callback**: Invokes `onFilter(nextFilters)` on every filter state update.

---

## Usage in Custom Components

Both hooks can be consumed independently without the full `DataTable` component:

```tsx
import { useSort } from './hooks/useSort';
import { useFilter } from './hooks/useFilter';

interface Product {
  id: string;
  name: string;
  price: number;
}

export function ProductList({ products }: { products: Product[] }) {
  const { sortState, handleSort, clearSort, sortData } = useSort<Product>();
  const { filterState, handleFilter, filterData } = useFilter<Product>();

  const filtered = filterData(products);
  const sorted = sortData(filtered);

  return (
    <div>
      <input
        placeholder="Filter by name..."
        value={filterState.name ?? ''}
        onChange={(e) => handleFilter('name', e.target.value)}
      />
      <button onClick={() => handleSort('price', 'asc')}>
        Sort by Price (Asc)
      </button>
      <button onClick={clearSort}>
        Reset Sort
      </button>
      <ul>
        {sorted.map((item) => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}
```
