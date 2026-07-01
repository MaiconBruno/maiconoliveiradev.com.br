import ReactMarkdown from 'react-markdown';

export function MarkdownContent({ content, className }: { content: string; className?: string }) {
  return (
    <div className={`prose prose-invert max-w-none ${className ?? ''}`}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
