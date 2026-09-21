import { useState, useCallback } from 'react';
import type { SortState, SortDirection } from '../components/DataTable/DataTable.types';

function useSort<T extends object>(
  onSort?: (key: keyof T, direction: SortDirection) => void
) {
  const [sortState, setSortState] = useState<SortState<T>>(null);

  const handleSort = useCallback(
    (key: keyof T, explicitDirection?: SortDirection) => {
      setSortState((prev) => {
        const direction: SortDirection =
          explicitDirection ??
          (prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc');
        onSort?.(key, direction);
        return { key, direction };
      });
    },
    [onSort]
  );

  const clearSort = useCallback(() => {
    setSortState(null);
  }, []);

  const sortData = useCallback(
    (data: T[]): T[] => {
      if (!sortState) return data;

      const { key, direction } = sortState;

      return [...data].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal === bVal) return 0;
        if (aVal == null) return direction === 'asc' ? 1 : -1;
        if (bVal == null) return direction === 'asc' ? -1 : 1;

        let comparison = 0;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else if (typeof aVal === 'string' && typeof bVal === 'string') {
          comparison = aVal.localeCompare(bVal);
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }

        return direction === 'asc' ? comparison : -comparison;
      });
    },
    [sortState]
  );

  return { sortState, handleSort, clearSort, sortData };
}

export default useSort;
