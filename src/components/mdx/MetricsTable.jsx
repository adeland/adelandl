import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const MetricsTable = ({
  title,
  description,
  columns,
  data,
  highlightColumn,
  variant = 'default'
}) => {
  const getTrendIcon = (value) => {
    const strValue = String(value).toLowerCase();
    if (strValue.includes('↑') || strValue.includes('faster') || strValue.includes('improvement')) {
      return <TrendingUp size={14} className="trend-icon trend-up" />;
    }
    if (strValue.includes('↓') || strValue.includes('slower') || strValue.includes('reduction')) {
      return <TrendingDown size={14} className="trend-icon trend-down" />;
    }
    if (strValue.includes('~') || strValue.includes('stable')) {
      return <Minus size={14} className="trend-icon trend-stable" />;
    }
    return null;
  };

  return (
    <div className={`metrics-table-container metrics-table-${variant}`}>
      {(title || description) && (
        <div className="metrics-table-header">
          {title && <h3 className="metrics-table-title">{title}</h3>}
          {description && <p className="metrics-table-description">{description}</p>}
        </div>
      )}

      <div className="metrics-table-wrapper">
        <table className="metrics-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`metrics-table-th ${column.align || 'left'} ${
                    column.key === highlightColumn ? 'highlighted' : ''
                  }`}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => {
                  const value = row[column.key];
                  const isHighlighted = column.key === highlightColumn;
                  
                  return (
                    <td
                      key={column.key}
                      className={`metrics-table-td ${column.align || 'left'} ${
                        isHighlighted ? 'highlighted' : ''
                      }`}
                    >
                      <div className="metrics-cell-content">
                        {getTrendIcon(value)}
                        {value}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};