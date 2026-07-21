import React from 'react';

function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, total, hasNextPage, hasPrevPage } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing page {page} of {totalPages} ({total} total records)
      </div>
      <div className="pagination-controls">
        <button
          className="btn-page"
          disabled={!hasPrevPage}
          onClick={() => onPageChange(1)}
          title="First page"
        >
          ««
        </button>
        <button
          className="btn-page"
          disabled={!hasPrevPage}
          onClick={() => onPageChange(page - 1)}
          title="Previous page"
        >
          «
        </button>

        {getPageNumbers().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="page-ellipsis">...</span>
          ) : (
            <button
              key={p}
              className={`btn-page ${p === page ? 'active' : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}

        <button
          className="btn-page"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          title="Next page"
        >
          »
        </button>
        <button
          className="btn-page"
          disabled={!hasNextPage}
          onClick={() => onPageChange(totalPages)}
          title="Last page"
        >
          »»
        </button>
      </div>
    </div>
  );
}

export default Pagination;
