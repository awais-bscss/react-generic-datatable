import { useState } from 'react';
import type { SortDirection } from './DataTable.types';
import type { DataTableToolbarProps } from './DataTableToolbar.types';
import { SearchIcon, ChevronDownIcon, ClearIcon } from './DataTableIcons';

function DataTableToolbar<T extends object>({
  data,
  columns,
  globalSearch,
  onGlobalSearch,
  filterState,
  onFilter,
  onClearAllFilters,
  hasActiveFilters,
  totalResults,
  sortState,
  onSort,
  onClearSort,
}: DataTableToolbarProps<T>) {
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<string | null>(null);

  const filterableColumns = columns.filter((c) => c.filterable);
  const sortableColumns = columns.filter((c) => c.sortable);

  const getUniqueColumnValues = (colKey: keyof T) => {
    const values = new Set<string>();
    data.forEach((item) => {
      const val = item[colKey];
      if (val !== undefined && val !== null) {
        values.add(String(val));
      }
    });
    return Array.from(values).slice(0, 10);
  };

  return (
    <div className="dt-toolbar" role="search" aria-label="Table toolbar">
      <div className="dt-toolbar-left">
        <div className="dt-search-box">
          <SearchIcon />
          <input
            type="text"
            className="dt-search-input"
            placeholder="Search..."
            value={globalSearch}
            onChange={(e) => onGlobalSearch(e.target.value)}
            aria-label="Search records"
          />
          {globalSearch && (
            <button
              type="button"
              className="dt-search-clear"
              onClick={() => onGlobalSearch('')}
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {filterableColumns.map((col) => {
          const keyStr = String(col.key);
          const activeVal = filterState[col.key];
          const isOpen = activeFilterDropdown === keyStr;
          const uniqueVals = getUniqueColumnValues(col.key);

          return (
            <div key={keyStr} className="dt-filter-pill-wrapper">
              <button
                type="button"
                className={`dt-filter-pill ${activeVal ? 'dt-filter-pill-active' : ''}`}
                onClick={() => setActiveFilterDropdown(isOpen ? null : keyStr)}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <span className="dt-filter-pill-label">{col.header}:</span>
                <span className="dt-filter-pill-val">{activeVal || 'All'}</span>
                <ChevronDownIcon />
              </button>

              {isOpen && (
                <div className="dt-filter-dropdown" role="menu">
                  <button
                    type="button"
                    className={`dt-filter-option ${!activeVal ? 'dt-filter-option-selected' : ''}`}
                    onClick={() => {
                      onFilter(col.key, '');
                      setActiveFilterDropdown(null);
                    }}
                    role="menuitem"
                  >
                    All
                  </button>
                  {uniqueVals.map((uVal) => (
                    <button
                      key={uVal}
                      type="button"
                      className={`dt-filter-option ${activeVal === uVal ? 'dt-filter-option-selected' : ''}`}
                      onClick={() => {
                        onFilter(col.key, uVal);
                        setActiveFilterDropdown(null);
                      }}
                      role="menuitem"
                    >
                      {uVal}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {hasActiveFilters && (
          <button
            type="button"
            className="dt-clear-filters-btn"
            onClick={onClearAllFilters}
            aria-label="Clear all filters"
          >
            Clear filters
          </button>
        )}

        <div className="dt-results-counter">
          Displaying {totalResults} results
        </div>
      </div>

      <div className="dt-toolbar-right">
        <div className="dt-sort-group">
          <span className="dt-sort-label">Sort:</span>
          <select
            className="dt-sort-select"
            value={sortState ? `${String(sortState.key)}_${sortState.direction}` : ''}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) {
                onClearSort();
              } else {
                const [key, dir] = val.split('_');
                onSort(key as keyof T, dir as SortDirection);
              }
            }}
            aria-label="Sort by column"
          >
            <option value="">Default</option>
            <optgroup label="Ascending (A-Z)">
              {sortableColumns.map((c) => (
                <option key={`${String(c.key)}_asc`} value={`${String(c.key)}_asc`}>
                  {c.header} (Asc)
                </option>
              ))}
            </optgroup>
            <optgroup label="Descending (Z-A)">
              {sortableColumns.map((c) => (
                <option key={`${String(c.key)}_desc`} value={`${String(c.key)}_desc`}>
                  {c.header} (Desc)
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DataTableToolbar;
