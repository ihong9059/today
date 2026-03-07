'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, X, Loader2, Copy, Check, Trash2 } from 'lucide-react';

interface PythonRunnerProps {
  initialCode: string;
  onClose: () => void;
}

declare global {
  interface Window {
    loadPyodide: (config?: any) => Promise<any>;
  }
}

export default function PythonRunner({ initialCode, onClose }: PythonRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load Pyodide
  useEffect(() => {
    const loadPyodideScript = async () => {
      try {
        // Check if script already loaded
        if (window.loadPyodide) {
          const pyodideInstance = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
          });
          setPyodide(pyodideInstance);
          setIsLoading(false);
          return;
        }

        // Load script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.async = true;

        script.onload = async () => {
          try {
            const pyodideInstance = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
            });
            setPyodide(pyodideInstance);
            setIsLoading(false);
          } catch (err) {
            setError('Pyodide 로딩 실패');
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setError('Pyodide 스크립트 로딩 실패');
          setIsLoading(false);
        };

        document.body.appendChild(script);
      } catch (err) {
        setError('Pyodide 초기화 실패');
        setIsLoading(false);
      }
    };

    loadPyodideScript();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [code]);

  const runCode = async () => {
    if (!pyodide || isRunning) return;

    setIsRunning(true);
    setOutput('');
    setImages([]);
    setError(null);

    try {
      // Detect and load required packages before running
      const packagesToLoad: string[] = [];
      if (/\bimport\s+numpy\b|\bfrom\s+numpy\b/.test(code)) packagesToLoad.push('numpy');
      if (/\bimport\s+matplotlib\b|\bfrom\s+matplotlib\b/.test(code)) packagesToLoad.push('matplotlib');
      if (/\bimport\s+scipy\b|\bfrom\s+scipy\b/.test(code)) packagesToLoad.push('scipy');
      if (/\bimport\s+pandas\b|\bfrom\s+pandas\b/.test(code)) packagesToLoad.push('pandas');

      if (packagesToLoad.length > 0) {
        await pyodide.loadPackage(packagesToLoad);
      }

      const usesMpl = packagesToLoad.includes('matplotlib');

      // Redirect stdout and set up matplotlib capture
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
_plot_images_ = []
`);

      if (usesMpl) {
        // Override plt.show() to capture figures as base64 PNG
        pyodide.runPython(`
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import base64
from io import BytesIO

_original_show_ = plt.show
def _capture_show_(*args, **kwargs):
    for fig_num in plt.get_fignums():
        fig = plt.figure(fig_num)
        buf = BytesIO()
        fig.savefig(buf, format='png', dpi=100, bbox_inches='tight', facecolor='white')
        buf.seek(0)
        _plot_images_.append(base64.b64encode(buf.read()).decode('utf-8'))
        buf.close()
    plt.close('all')

plt.show = _capture_show_
`);
      }

      // Run user code
      await pyodide.runPythonAsync(code);

      // If matplotlib was used but plt.show() was never called, capture remaining figures
      if (usesMpl) {
        pyodide.runPython(`
import matplotlib.pyplot as plt
if plt.get_fignums():
    _capture_show_()
`);
      }

      // Get output
      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      const stderr = pyodide.runPython('sys.stderr.getvalue()');

      // Get captured plot images
      const plotImages: string[] = pyodide.runPython('_plot_images_').toJs();

      if (plotImages.length > 0) {
        setImages(plotImages);
      }

      if (stderr) {
        setOutput(stdout + '\n' + stderr);
      } else {
        setOutput(stdout || (plotImages.length > 0 ? '' : '(출력 없음)'));
      }
    } catch (err: any) {
      setError(err.message || '실행 오류');
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearOutput = () => {
    setOutput('');
    setImages([]);
    setError(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐍</span>
            <h3 className="font-semibold text-gray-900">Python 실습</h3>
            {isLoading && (
              <span className="text-sm text-gray-500 flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                Pyodide 로딩 중...
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div className="rounded-lg overflow-hidden border border-gray-300">
            <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono flex items-center justify-between">
              <span>python</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyCode}
                  className="hover:text-white transition-colors flex items-center"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-1">{copied ? '복사됨' : '복사'}</span>
                </button>
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 font-mono text-sm bg-gray-900 text-gray-100 focus:outline-none resize-none min-h-[200px]"
              spellCheck={false}
            />
          </div>

          {/* Run Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={runCode}
              disabled={isLoading || isRunning}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isRunning ? '실행 중...' : '실행'}
            </button>
            <button
              onClick={clearOutput}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              출력 지우기
            </button>
          </div>

          {/* Output */}
          <div className="rounded-lg overflow-hidden border border-gray-300">
            <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 font-semibold">
              출력 결과
            </div>
            <div className="p-4 bg-gray-50 min-h-[100px] max-h-[500px] overflow-auto">
              {error ? (
                <pre className="text-red-600 font-mono text-sm whitespace-pre-wrap">{error}</pre>
              ) : (
                <>
                  {output && (
                    <pre className="text-gray-800 font-mono text-sm whitespace-pre-wrap">{output}</pre>
                  )}
                  {images.length > 0 && (
                    <div className="space-y-3 mt-2">
                      {images.map((img, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                          <img
                            src={`data:image/png;base64,${img}`}
                            alt={`Plot ${i + 1}`}
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {!output && images.length === 0 && (
                    <p className="text-gray-400 italic">실행 버튼을 눌러 코드를 실행하세요</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <p className="text-xs text-gray-500">
            💡 Pyodide를 사용하여 브라우저에서 Python을 실행합니다. NumPy, Matplotlib 등 기본 라이브러리를 지원합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
