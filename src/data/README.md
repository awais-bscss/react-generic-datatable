# Data & Column Configurations

Defines the strong types, sample datasets, and declarative column configurations used by the generic `DataTable`.

---

## Directory Overview

| File | Responsibility |
| --- | --- |
| `users.ts` | `User` interface, `UserStatus` union type, and 10 Pakistani professional sample records. |
| `userColumns.tsx` | Declarative `Column<User>[]` definitions with custom avatar and badge cell renderers. |

---

## Data Model: `User`

Defined in `users.ts`:

```typescript
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: number;
  name: string;
  email: string;
  location: string;
  status: UserStatus;
  jobTitle: string;
  university: string;
  avatarUrl?: string;
}
```

### Sample Records
The dataset contains 10 realistic Pakistani software and tech professionals, featuring:
- **Cities**: Karachi, Lahore, Islamabad, Peshawar, Quetta, Rawalpindi, Faisalabad, Multan.
- **Institutions**: FAST-NUCES, NUST, LUMS, IBA Karachi, GIKI, UET Lahore, NED University, COMSATS.
- **Roles**: Principal Architect, Lead UX Designer, Engineering Director, Staff DevOps Engineer, Full Stack Lead, Data Platform Engineer, Mobile Lead, Senior Security Engineer, Senior Backend Engineer, Product Manager.

---

## Declarative Columns: `USER_COLUMNS`

Defined in `userColumns.tsx`:

```tsx
export const USER_COLUMNS: Column<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
    render: (_, row, index) => {
      const parts = row.name.split(' ');
      const initials = (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
      const styleTheme = AVATAR_COLORS[index % AVATAR_COLORS.length];

      return (
        <span className="dt-cell-user">
          <span
            className="dt-user-avatar-circle"
            style={{ background: styleTheme.bg, color: styleTheme.color }}
          >
            {initials}
          </span>
          <span className="dt-user-name">{row.name}</span>
        </span>
      );
    },
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
    filterable: true,
    render: (_, row) => (
      <span className="dt-email-text">{row.email}</span>
    ),
  },
  {
    key: 'location',
    header: 'Location',
    sortable: true,
    filterable: true,
    render: (_, row) => (
      <span className="dt-location-text">{row.location}</span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    filterable: true,
    render: (_, row) => {
      const isActive = row.status === 'active';
      return (
        <span className={isActive ? 'dt-status-pill dt-status-pill--active' : 'dt-status-pill dt-status-pill--inactive'}>
          <span className="dt-status-dot" />
          {isActive ? 'Active' : 'Inactive'}
        </span>
      );
    },
  },
  {
    key: 'jobTitle',
    header: 'Job Title',
    sortable: true,
    filterable: true,
    render: (_, row) => (
      <span className="dt-job-text">{row.jobTitle}</span>
    ),
  },
  {
    key: 'university',
    header: 'University',
    sortable: true,
    filterable: true,
    render: (_, row) => (
      <span className="dt-univ-text">{row.university}</span>
    ),
  },
];
```

---

## Adding a New Data Model

The `DataTable` is completely generic. To use a different dataset:

1. Define your interface:
   ```typescript
   export interface Order {
     orderId: string;
     customer: string;
     total: number;
     createdAt: string;
   }
   ```

2. Define your columns with `Column<Order>[]`:
   ```typescript
   export const ORDER_COLUMNS: Column<Order>[] = [
     { key: 'orderId', header: 'Order ID', sortable: true },
     { key: 'customer', header: 'Customer', sortable: true, filterable: true },
     {
       key: 'total',
       header: 'Total',
       sortable: true,
       align: 'right',
       render: (val) => `$${Number(val).toFixed(2)}`,
     },
     { key: 'createdAt', header: 'Date', sortable: true },
   ];
   ```

3. Render `<DataTable<Order> data={orders} columns={ORDER_COLUMNS} />`.
