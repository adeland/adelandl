import React from 'react';

// Custom MDX components that map to styled HTML elements
// These will be used by MDXProvider to style markdown content

export const MDXComponents = {
  // Headings
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  h4: (props) => <h4 {...props} />,
  
  // Links
  a: (props) => (
    <a {...props} target={props.href?.startsWith('http') ? '_blank' : undefined} rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined} />
  ),
  
  // Code blocks
  code: (props) => {
    // Check if it's an inline code or code block
    const isInline = !props.className;
    if (isInline) {
      return <code {...props} />;
    }
    return <code {...props} />;
  },
  
  pre: (props) => <pre {...props} />,
  
  // Lists
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  
  // Paragraphs
  p: (props) => <p {...props} />,
  
  // Strong/emphasis
  strong: (props) => <strong {...props} />,
  em: (props) => <em {...props} />,
  
  // Tables (from remark-gfm)
  table: (props) => <table {...props} />,
  thead: (props) => <thead {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr {...props} />,
  th: (props) => <th {...props} />,
  td: (props) => <td {...props} />,
  
  // Details/summary (from remark-gfm)
  details: (props) => <details {...props} />,
  summary: (props) => <summary {...props} />,
  
  // Blockquote
  blockquote: (props) => <blockquote {...props} />,
  
  // Horizontal rule
  hr: (props) => <hr {...props} />,
  
  // Div (for custom components like tldr-box, warning-box, etc.)
  div: (props) => <div {...props} />,
};
