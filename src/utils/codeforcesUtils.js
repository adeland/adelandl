/**
 * Utility functions for Codeforces data processing
 */

export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatMemory = (bytes) => {
  if (bytes === 0) return '0 KB';
  const kb = bytes / 1024;
  return `${Math.round(kb)} KB`;
};

export const getVerdictColor = (verdict) => {
  switch (verdict) {
    case 'OK':
      return '#28a745';
    case 'WRONG_ANSWER':
      return '#dc3545';
    case 'TIME_LIMIT_EXCEEDED':
      return '#ffc107';
    case 'MEMORY_LIMIT_EXCEEDED':
      return '#17a2b8';
    default:
      return '#6c757d';
  }
};

export const getDifficultyColor = (rating) => {
  if (rating <= 800) return '#808080';
  if (rating <= 1000) return '#008000';
  if (rating <= 1200) return '#03a89e';
  if (rating <= 1400) return '#0000ff';
  if (rating <= 1600) return '#aa00aa';
  if (rating <= 1800) return '#ff8c00';
  if (rating <= 2000) return '#ff0000';
  return '#ff0000';
};

export const getRatingColor = (rating) => {
  if (rating < 1200) return '#808080'; // Gray
  if (rating < 1400) return '#008000'; // Green
  if (rating < 1600) return '#03a89e'; // Cyan
  if (rating < 1900) return '#0000ff'; // Blue
  if (rating < 2200) return '#aa00aa'; // Purple
  if (rating < 2400) return '#ff8c00'; // Orange
  return '#ff0000'; // Red
};
