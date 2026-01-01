import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CodeBlock = ({ 
  children, 
  language = 'text',
  filename,
  showLineNumbers = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = children.split('\n');

  return (
    <div className="code-block-wrapper">
      {/* Header */}
      <div className="code-block-header">
        <div className="code-block-info">
          {filename && (
            <span className="code-block-filename">{filename}</span>
          )}
          <span className="code-block-language">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="code-block-copy-btn"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="code-block-content">
        <pre>
          <code>
            {showLineNumbers ? (
              <table className="code-block-table">
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index}>
                      <td className="line-number">
                        {index + 1}
                      </td>
                      <td className="line-content">
                        {line || '\n'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              children
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};