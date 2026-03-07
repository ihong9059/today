'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Play } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Pyodide
const PythonRunner = dynamic(() => import('./PythonRunner'), { ssr: false });
const ActivationFunctionChart = dynamic(() => import('./ActivationFunctionChart'), { ssr: false });
const NeuronFlowChart = dynamic(() => import('./charts/NeuronFlowChart'), { ssr: false });
const PerceptronChart = dynamic(() => import('./charts/PerceptronChart'), { ssr: false });
const XORChart = dynamic(() => import('./charts/XORChart'), { ssr: false });
const MLPChart = dynamic(() => import('./charts/MLPChart'), { ssr: false });

interface MarkdownRendererProps {
  content: string;
}

function preprocessContent(raw: string): string {
  // Convert ASCII box drawings (┌─┐│└─┘) into fenced code blocks
  // so they render in a monospace <pre> with proper alignment.
  // We detect consecutive lines that start with box-drawing chars (│┌└├╔║╚╠┃┏┗)
  // and wrap them in ```text ... ``` blocks.
  const lines = raw.split('\n');
  const result: string[] = [];
  let i = 0;

  const isBoxLine = (line: string): boolean => {
    const trimmed = line.trimStart();
    return /^[┌┐└┘│├┤┬┴┼─╔╗╚╝║╠╣╦╩╬═┏┓┗┛┃┣┫┳┻╋━]/.test(trimmed);
  };

  while (i < lines.length) {
    if (isBoxLine(lines[i])) {
      // Already inside a code block? Check previous lines
      const prevNonEmpty = result.length > 0 ? result[result.length - 1].trim() : '';
      const alreadyInCode = prevNonEmpty === '```' || prevNonEmpty === '```text';

      if (!alreadyInCode) {
        result.push('```text');
      }
      while (i < lines.length && isBoxLine(lines[i])) {
        result.push(lines[i]);
        i++;
      }
      if (!alreadyInCode) {
        result.push('```');
      }
    } else {
      result.push(lines[i]);
      i++;
    }
  }

  return result.join('\n');
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [pythonCode, setPythonCode] = useState<string | null>(null);

  const openPythonRunner = (code: string) => {
    setPythonCode(code);
  };

  const closePythonRunner = () => {
    setPythonCode(null);
  };

  return (
    <>
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
            p({ children, node, ...props }: any) {
              // Check for special chart markers
              const extractText = (c: any): string => {
                if (typeof c === 'string') return c;
                if (Array.isArray(c)) return c.map(extractText).join('');
                return '';
              };
              const text = extractText(children).trim();
              // Chart marker mappings
              const chartMarkers: { [key: string]: React.ReactNode } = {
                '[ACTIVATION_CHART]': <ActivationFunctionChart />,
                '[NEURON_FLOW_CHART]': <NeuronFlowChart />,
                '[PERCEPTRON_CHART]': <PerceptronChart />,
                '[PERCEPTRON_FULL_CHART]': <PerceptronChart variant="full" />,
                '[XOR_CHART]': <XORChart />,
                '[MLP_CHART]': <MLPChart />,
              };

              if (chartMarkers[text]) {
                return chartMarkers[text];
              }
              return <p {...props}>{children}</p>;
            },
            pre({ children, node, ...props }: any) {
              // Extract text content from <pre><code>...</code></pre>
              // to detect ASCII box art in language-less code blocks
              const extractText = (child: any): string => {
                if (typeof child === 'string') return child;
                if (child?.props?.children) {
                  const ch = child.props.children;
                  if (typeof ch === 'string') return ch;
                  if (Array.isArray(ch)) return ch.map(extractText).join('');
                  return extractText(ch);
                }
                return '';
              };
              const text = extractText(children);
              const hasBoxChars = /[┌└┏┗╔╚│║┃─━═]/.test(text);
              // Check if child <code> has a language class
              const childClass = children?.props?.className || '';
              const hasLanguage = /language-/.test(childClass);

              if (hasBoxChars && !hasLanguage) {
                const innerText = text.replace(/\n$/, '').trim();
                return (
                  <div className="my-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 font-mono text-sm text-gray-800 whitespace-pre overflow-x-auto shadow-sm">
                    {innerText}
                  </div>
                );
              }
              return <pre {...props}>{children}</pre>;
            },
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const codeString = String(children).replace(/\n$/, '');
              const isPython = language === 'python' || language === 'py';
              // Detect block code: has newlines or no inline flag
              const isBlock = !inline && (codeString.includes('\n') || !className);

              // ASCII box art rendered as a styled card
              const isBoxArt = isBlock && /[┌└┏┗╔╚│║┃─━═]/.test(codeString);
              if (isBoxArt) {
                return (
                  <div className="my-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 font-mono text-sm text-gray-800 whitespace-pre overflow-x-auto shadow-sm">
                    {codeString}
                  </div>
                );
              }

              if (!inline && language) {
                return (
                  <div className="my-4 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono flex items-center justify-between">
                      <span>{language}</span>
                      <div className="flex items-center space-x-3">
                        {isPython && (
                          <button
                            onClick={() => openPythonRunner(codeString)}
                            className="hover:text-green-400 transition-colors flex items-center text-green-500"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            실행
                          </button>
                        )}
                        <button
                          onClick={() => navigator.clipboard.writeText(codeString)}
                          className="hover:text-white transition-colors"
                        >
                          복사
                        </button>
                      </div>
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
                      {codeString}
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

      {/* Python Runner Modal */}
      {pythonCode !== null && (
        <PythonRunner initialCode={pythonCode} onClose={closePythonRunner} />
      )}
    </>
  );
}
