import { useState, useMemo, useCallback } from 'react';
import type { DataTableProps } from './DataTable.types';
import DataTableToolbar from './DataTableToolbar';
import { SortIcon } from './DataTableIcons';
import useSort from '../../hooks/useSort';
import useFilter from '../../hooks/useFilter';
import './DataTable.css';

function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  onRowClick,
  onSort,
  onFilter,
  caption,
  emptyMessage = 'No data available.',
  className = '',
}: DataTableProps<T>) {
  const { sortState, handleSort, clearSort, sortData } = useSort<T>(onSort);
  const { filterState, handleFilter, clearFilters, filterData } = useFilter<T>(onFilter);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleGlobalSearch = useCallback((value: string) => {
    setGlobalSearch(value);
  }, []);

  const processedData = useMemo(() => {
    let result = filterData(data);

    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase().trim();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val ?? '').toLowerCase().includes(q)
        )
      );
    }

    return sortData(result);
  }, [data, filterData, globalSearch, sortData]);

  const hasActiveFilters = Object.keys(filterState).length > 0 || globalSearch.trim().length > 0;

  const handleClearAllFilters = useCallback(() => {
    clearFilters();
    setGlobalSearch('');
  }, [clearFilters]);


  const getRowKey = (row: T, index: number): string | number => {
    if (rowKey) return rowKey(row, index);
    if ('id' in row) return String((row as { id: unknown }).id);
    return index;
  };

  return (
    <div className={`dt-wrapper ${className}`}>
      <DataTableToolbar<T>
        data={data}
        columns={columns}
        globalSearch={globalSearch}
        onGlobalSearch={handleGlobalSearch}
        filterState={filterState}
        onFilter={handleFilter}
        onClearAllFilters={handleClearAllFilters}
        hasActiveFilters={hasActiveFilters}
        totalResults={processedData.length}
        sortState={sortState}
        onSort={handleSort}
        onClearSort={clearSort}
      />

      <div className="dt-scroll-container" tabIndex={0} aria-label={caption ?? 'Data table'}>
        <table className="dt-table" aria-label={caption ?? 'Data table'}>
          {caption && <caption className="dt-caption">{caption}</caption>}

          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`dt-th ${col.sortable ? 'dt-th--sortable' : ''} ${
                    sortState?.key === col.key ? 'dt-th--active' : ''
                  }`}
                  style={{ textAlign: col.align ?? 'left' }}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  aria-sort={
                    col.sortable
                      ? sortState?.key === col.key
                        ? sortState.direction === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                      : undefined
                  }
                  tabIndex={col.sortable ? 0 : undefined}
                  onKeyDown={
                    col.sortable
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort(col.key);
                          }
                        }
                      : undefined
                  }
                  role={col.sortable ? 'button' : undefined}
                >
                  <span className="dt-th-inner">
                    {col.header}
                    {col.sortable && (
                      <SortIcon
                        active={sortState?.key === col.key}
                        direction={sortState?.direction}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {processedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="dt-empty">
                  <div className="dt-empty-box">
                    <p>{emptyMessage}</p>
                    {hasActiveFilters && (
                      <button type="button" className="dt-empty-reset-btn" onClick={handleClearAllFilters}>
                        Reset all filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              processedData.map((row, rowIndex) => {
                const key = getRowKey(row, rowIndex);

                return (
                  <tr
                    key={key}
                    className={`dt-row ${onRowClick ? 'dt-row--clickable' : ''}`}
                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    aria-label={onRowClick ? `Row ${rowIndex + 1}` : undefined}
                  >
                    {columns.map((col) => {
                      const value = row[col.key];
                      return (
                        <td
                          key={String(col.key)}
                          className="dt-td"
                          style={{ textAlign: col.align ?? 'left', ...col.cellStyle }}
                        >
                          {col.render
                            ? col.render(value, row, rowIndex)
                            : String(value ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
