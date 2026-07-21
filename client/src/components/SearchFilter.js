import React, { useState } from 'react';

function SearchFilter({
  searchPlaceholder = 'Search by name, ID, or email...',
  filters = [],
  onSearch,
  onFilterChange,
  onClear,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setActiveFilters({});
    onClear?.();
  };

  const handleFilterSelect = (key, value) => {
    const updated = { ...activeFilters, [key]: value };
    if (!value) delete updated[key];
    setActiveFilters(updated);
    onFilterChange?.(updated);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="search-filter">
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
        {filters.length > 0 && (
          <button
            type="button"
            className={`btn btn-filter ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        )}
        {(searchTerm || activeFilterCount > 0) && (
          <button type="button" className="btn btn-clear" onClick={handleClear}>
            Clear
          </button>
        )}
      </form>

      {showFilters && filters.length > 0 && (
        <div className="filter-panel">
          {filters.map((filter) => (
            <div className="filter-group" key={filter.key}>
              <label className="filter-label">{filter.label}</label>
              <select
                className="filter-select"
                value={activeFilters[filter.key] || ''}
                onChange={(e) => handleFilterSelect(filter.key, e.target.value)}
              >
                <option value="">All {filter.label}</option>
                {filter.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchFilter;
