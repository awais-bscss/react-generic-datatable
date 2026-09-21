import type { Column } from '../components/DataTable';
import type { User } from './users';

const AVATAR_COLORS = [
  { bg: '#e0e7ff', color: '#3730a3' },
  { bg: '#dbeafe', color: '#1e40af' },
  { bg: '#fce7f3', color: '#9d174d' },
  { bg: '#fef3c7', color: '#92400e' },
  { bg: '#dcfce7', color: '#166534' },
  { bg: '#fae8ff', color: '#86198f' },
  { bg: '#e0f2fe', color: '#075985' },
  { bg: '#fee2e2', color: '#991b1b' },
  { bg: '#ede9fe', color: '#5b21b6' },
  { bg: '#f1f5f9', color: '#334155' },
];

const USER_COLUMNS: Column<User>[] = [
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

export default USER_COLUMNS;
