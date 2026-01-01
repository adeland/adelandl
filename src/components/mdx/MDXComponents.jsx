// src/components/mdx/MDXComponents.jsx
import { CodeBlock } from './CodeBlock';
import { MetricsTable } from './MetricsTable';

const MDXComponents = {
  // Your existing components...
  
  // Add these:
  CodeBlock,
  MetricsTable,
  
  // You might also want to override default code blocks
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    
    // If it's a code block (has language), use CodeBlock
    if (language) {
      return (
        <CodeBlock language={language} {...props}>
          {children}
        </CodeBlock>
      );
    }
    
    // Otherwise, use inline code styling
    return <code className={className} {...props}>{children}</code>;
  },
  
  // Override pre to work with CodeBlock
  pre: ({ children }) => {
    return <>{children}</>;
  }
};

export { MDXComponents };