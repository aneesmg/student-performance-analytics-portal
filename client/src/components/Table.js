import React from 'react';
import { ChevronDownIcon, ChevronLeftIcon } from './Icons';
import './Table.css';

const Table = ({ columns, data, onSort, sortBy, sortDir, loading, emptyMessage }) => {
  const renderSortIndicator = (key) => {
    if (sortBy !== key) return null;
    return sortDir === 'asc' ? (
      <ChevronLeftIcon size={14} style={{ transform: 'rotate(90deg)' }} />
    ) : (
      <ChevronDownIcon size={14} />
    );
  };

  const handleSort = (key) => {
    if (!onSort) return;
    if (sortBy === key) {
      onSort(key, sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(key, 'asc');
    }
  };

  if (loading) {
    return (
      <div className="table-wrapper">
        <div className="table-loading">
          <div className="table-spinner" />
          <span>Loading data...</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="table-wrapper">
        <div className="table-empty">
          <span>{emptyMessage || 'No data available'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${col.sortable ? 'th-sortable' : ''} ${sortBy === col.key ? 'th-sorted' : ''}`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span className="th-content">
                  {col.label}
                  {col.sortable && <span className="sort-indicator">{renderSortIndicator(col.key)}</span>}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || row._id || i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
