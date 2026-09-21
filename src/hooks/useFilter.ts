import { useState, useCallback } from 'react';
import type { FilterState } from '../components/DataTable/DataTable.types';

function useFilter<T extends object>(
  onFilter?: (filters: FilterState<T>) => void
) {
  const [filterState, setFilterState] = useState<FilterState<T>>({});

  const handleFilter = useCallback(
    (key: keyof T, value: string) => {
      setFilterState((prev) => {
        const next: FilterState<T> = { ...prev, [key]: value };
        if (value === '') {
          delete next[key];
        }
        onFilter?.(next);
        return next;
      });
    },
    [onFilter]
  );

  const clearFilters = useCallback(() => {
    setFilterState({});
    onFilter?.({});
  }, [onFilter]);

  const filterData = useCallback(
    (data: T[]): T[] => {
      const activeKeys = Object.keys(filterState) as (keyof T)[];
      if (activeKeys.length === 0) return data;

      return data.filter((row) =>
        activeKeys.every((key) => {
          const filterValue = filterState[key];
          if (!filterValue) return true;

          const cellValue = row[key];
          if (cellValue == null) return false;

          return String(cellValue)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        })
      );
    },
    [filterState]
  );

  return { filterState, handleFilter, clearFilters, filterData };
}

export default useFilter;
