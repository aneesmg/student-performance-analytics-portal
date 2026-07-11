import React from 'react';
import './FormField.css';

const FormField = ({ label, name, type = 'text', value, onChange, error, placeholder, options, icon: Icon, required }) => {
  const fieldId = `field-${name}`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={fieldId}
            name={name}
            value={value}
            onChange={onChange}
            className={`ff-input ${error ? 'ff-input-error' : ''}`}
            required={required}
          >
            {options && options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            id={fieldId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`ff-input ff-textarea ${error ? 'ff-input-error' : ''}`}
            required={required}
            rows={4}
          />
        );
      default:
        return (
          <input
            id={fieldId}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`ff-input ${error ? 'ff-input-error' : ''}`}
            required={required}
          />
        );
    }
  };

  return (
    <div className="form-group">
      {label && (
        <label className="ff-label" htmlFor={fieldId}>
          {label}
          {required && <span className="ff-required">*</span>}
        </label>
      )}
      <div className={`input-wrapper ${Icon ? 'has-icon' : ''}`}>
        {Icon && (
          <span className="ff-icon">
            <Icon size={18} />
          </span>
        )}
        {renderInput()}
      </div>
      {error && <span className="ff-error">{error}</span>}
    </div>
  );
};

export default FormField;
