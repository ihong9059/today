'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none
      prose-headings:text-gray-900 prose-headings:font-bold
      prose-h1:text-2xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-3 prose-h1:mb-6
      prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-blue-700
      prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-800
      prose-p:text-gray-700 prose-p:leading-relaxed
      prose-li:text-gray-700 prose-li:my-1
      prose-ul:my-4 prose-ol:my-4
      prose-strong:text-gray-900 prose-strong:font-semibold
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            if (!inline && language) {
              return (
                <div className="my-4 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono flex items-center justify-between">
                    <span>{language}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(String(children))}
                      className="hover:text-white transition-colors"
                    >
                      복사
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '0.875rem',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }

            // Inline code
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-6">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold text-blue-700 mt-8 mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="my-4 space-y-2 list-none pl-0">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="flex items-start text-gray-700">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 bg-blue-50 px-4 py-3 my-4 text-gray-700 italic rounded-r-lg">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="bg-gray-100 px-4 py-3 text-left text-sm font-semibold text-gray-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
