import type { Column, FilterState, SortDirection, SortState } from './DataTable.types';

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
