'use client';

import { Download } from 'lucide-react';

interface ColabButtonProps {
  lessonTitle: string;
  levelTitle: string;
  lessonContent: string;
}

function generateNotebook(lessonTitle: string, levelTitle: string, content: string): object {
  const cells: object[] = [];

  // Title cell
  cells.push({
    cell_type: 'markdown',
    metadata: {},
    source: [
      `# ${levelTitle} - ${lessonTitle}\n`,
      '\n',
      '> 이 노트북은 **AI 첫걸음** 교육 플랫폼에서 자동 생성되었습니다.\n',
      '> 각 코드 셀을 순서대로 실행하며 학습하세요.\n',
    ],
  });

  // Setup cell for PyTorch lessons
  const hasTorch = content.includes('import torch') || content.includes('from torch');
  const hasCV2 = content.includes('import cv2') || content.includes('opencv');
  const hasTransformers = content.includes('from transformers') || content.includes('import transformers');
  const hasUltralytics = content.includes('ultralytics') || content.includes('YOLO');

  const installPkgs: string[] = [];
  if (hasCV2) installPkgs.push('opencv-python-headless');
  if (hasTransformers) installPkgs.push('transformers datasets accelerate');
  if (hasUltralytics) installPkgs.push('ultralytics');

  if (hasTorch || installPkgs.length > 0) {
    const setupLines = ['# 환경 설정 (필요한 패키지 설치)\n'];
    if (installPkgs.length > 0) {
      setupLines.push(`!pip install -q ${installPkgs.join(' ')}\n`);
    }
    if (hasTorch) {
      setupLines.push('import torch\n');
      setupLines.push('print(f"PyTorch version: {torch.__version__}")\n');
      setupLines.push('print(f"CUDA available: {torch.cuda.is_available()}")\n');
      setupLines.push('if torch.cuda.is_available():\n');
      setupLines.push('    print(f"GPU: {torch.cuda.get_device_name(0)}")\n');
    }
    cells.push({
      cell_type: 'code',
      metadata: {},
      source: setupLines,
      execution_count: null,
      outputs: [],
    });
  }

  // Parse markdown content into cells
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Detect code block
    if (line.startsWith('```python') || line.startsWith('```py')) {
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i] + '\n');
        i++;
      }
      i++; // skip closing ```

      if (codeLines.length > 0) {
        cells.push({
          cell_type: 'code',
          metadata: {},
          source: codeLines,
          execution_count: null,
          outputs: [],
        });
      }
    }
    // Detect other code blocks (non-python) - include as markdown
    else if (line.startsWith('```')) {
      const mdLines: string[] = [line + '\n'];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        mdLines.push(lines[i] + '\n');
        i++;
      }
      if (i < lines.length) {
        mdLines.push(lines[i] + '\n');
        i++;
      }
      cells.push({
        cell_type: 'markdown',
        metadata: {},
        source: mdLines,
      });
    }
    // Markdown content - collect until next code block or heading
    else {
      const mdLines: string[] = [];
      while (
        i < lines.length &&
        !lines[i].startsWith('```python') &&
        !lines[i].startsWith('```py') &&
        !lines[i].startsWith('```')
      ) {
        // Break on headings to create separate cells for better readability
        if (lines[i].startsWith('## ') && mdLines.length > 0) {
          break;
        }
        mdLines.push(lines[i] + '\n');
        i++;
      }

      // Only add non-empty markdown cells
      const trimmed = mdLines.join('').trim();
      if (trimmed.length > 0) {
        cells.push({
          cell_type: 'markdown',
          metadata: {},
          source: mdLines,
        });
      }
    }
  }

  return {
    nbformat: 4,
    nbformat_minor: 5,
    metadata: {
      kernelspec: {
        display_name: 'Python 3',
        language: 'python',
        name: 'python3',
      },
      language_info: {
        name: 'python',
        version: '3.10.0',
      },
      colab: {
        provenance: [],
        gpuType: hasTorch ? 'T4' : undefined,
      },
      accelerator: hasTorch ? 'GPU' : undefined,
    },
    cells,
  };
}

export default function ColabButton({ lessonTitle, levelTitle, lessonContent }: ColabButtonProps) {
  // Check if lesson has Python code
  const hasPythonCode = lessonContent && (
    lessonContent.includes('```python') || lessonContent.includes('```py')
  );

  if (!hasPythonCode) return null;

  const handleDownload = () => {
    const notebook = generateNotebook(lessonTitle, levelTitle, lessonContent);
    const json = JSON.stringify(notebook, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const safeName = lessonTitle.replace(/[^a-zA-Z0-9가-힣\s]/g, '').replace(/\s+/g, '_');
    a.download = `${safeName}.ipynb`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
      title="Google Colab에서 사용할 수 있는 노트북 파일을 다운로드합니다"
    >
      <Download className="h-4 w-4 mr-2" />
      Colab 노트북 다운로드
    </button>
  );
}
