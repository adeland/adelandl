import React from 'react';

const ONGOING = /present|current|ongoing/i;

/* Small pulsing gold marker for a role that is still running. Renders
   nothing unless the period reads as ongoing (e.g. "2025 -- Present"). */
const LiveTag = ({ period }) => {
  if (!ONGOING.test(String(period ?? ''))) return null;
  return (
    <span className="live-tag" aria-label="Current role">
      <span className="live-dot" aria-hidden="true" />
      LIVE
    </span>
  );
};

export default LiveTag;
