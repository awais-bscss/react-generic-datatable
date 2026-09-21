import { useState } from 'react';
import DataTable from './components/DataTable';
import type { SortDirection, FilterState } from './components/DataTable';
import type { User } from './data/users';
import { USERS } from './data/users';
import USER_COLUMNS from './data/userColumns';
import './App.css';

export default function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSort = (key: keyof User, direction: SortDirection) => {
    console.log('[Users] Sort:', key, direction);
  };

  const handleUserFilter = (filters: FilterState<User>) => {
    console.log('[Users] Filter:', filters);
  };

  return (
    <div className="layout-shell">
      <main className="main-viewport">
        <section className="project-header">
          <div className="project-title-row">
            <h1 className="project-title">User Directory</h1>
            <span className="project-status-badge">
              <span className="project-status-dot" />
              Active
            </span>
          </div>
          <div className="project-meta-row">
            <span>Generic DataTable&lt;T&gt;</span>
            <span className="meta-sep">•</span>
            <span>TypeScript UI Component</span>
            <span className="meta-sep">•</span>
            <span>{USERS.length} Total Users</span>
          </div>
        </section>

        <section className="table-card-container">
          {selectedUser && (
            <div className="user-selection-callout" role="status">
              <span>
                Selected: <strong>{selectedUser.name}</strong> ({selectedUser.email}) • {selectedUser.jobTitle}
              </span>
              <button
                type="button"
                className="callout-close-btn"
                onClick={() => setSelectedUser(null)}
                aria-label="Dismiss selection notification"
              >
                ✕
              </button>
            </div>
          )}

          <DataTable<User>
            data={USERS}
            columns={USER_COLUMNS}
            rowKey={(row) => row.id}
            onRowClick={(row) => setSelectedUser(row)}
            onSort={handleUserSort}
            onFilter={handleUserFilter}
            emptyMessage="No users match your query."
          />
        </section>
      </main>
    </div>
  );
}
