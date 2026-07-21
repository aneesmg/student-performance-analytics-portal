import React, { useState } from 'react';
import { reportAPI } from '../services/api';

function ExportOptions({ type = 'students', filters = {} }) {
  const [exporting, setExporting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [message, setMessage] = useState(null);

  const handleExport = async (format) => {
    setExporting(true);
    setMessage(null);
    try {
      if (format === 'csv') {
        const res = await reportAPI.exportCSV({ type, ...filters });
        const blob = new Blob([res.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}_export_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        setMessage({ type: 'success', text: 'CSV exported successfully!' });
      } else if (format === 'pdf') {
        const res = await reportAPI.exportPDF();
        const blob = new Blob([JSON.stringify(res.data.data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
        setMessage({ type: 'success', text: 'Report JSON exported successfully!' });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Export failed. Please try again.',
      });
    } finally {
      setExporting(false);
      setShowMenu(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="export-options">
      <button
        className="btn btn-export"
        onClick={() => setShowMenu(!showMenu)}
        disabled={exporting}
      >
        {exporting ? 'Exporting...' : 'Export'}
      </button>

      {showMenu && (
        <div className="export-menu">
          <button className="export-option" onClick={() => handleExport('csv')}>
            <span className="export-icon">📄</span>
            <span>Export as CSV</span>
          </button>
          <button className="export-option" onClick={() => handleExport('pdf')}>
            <span className="export-icon">📑</span>
            <span>Export Report (JSON)</span>
          </button>
        </div>
      )}

      {message && (
        <div className={`export-message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default ExportOptions;
