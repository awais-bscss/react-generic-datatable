import type { ReactNode, CSSProperties } from 'react';

export type SortDirection = 'asc' | 'desc';

export type SortState<T> = { key: keyof T; direction: SortDirection } | null;

export type FilterState<T> = Partial<Record<keyof T, string>>;

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  cellStyle?: CSSProperties;
  align?: 'left' | 'center' | 'right';
}

export type { DataTableToolbarProps } from './DataTableToolbar.types';


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
