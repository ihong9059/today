import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ReportPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            메인으로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">AI Education Web 분석 및 구현 환경 보고서</h1>
          <p className="mt-2 text-white/80">작성일: 2026-03-05 | 대상: ai-education-web (Next.js 기반 AI 교육 플랫폼)</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* 1. 프로젝트 개요 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            1. 프로젝트 개요
          </h2>
          <p className="text-gray-700 leading-relaxed">
            중학교 수학 수준에서 시작하여 GPT 원리까지 단계별로 학습할 수 있는 <strong>AI 교육 플랫폼</strong>.
            총 10개 레벨(Level 0~9), 58개 레슨, 약 50시간 이상의 교육 콘텐츠로 구성.
          </p>
        </section>

        {/* 2. 전체 커리큘럼 구조 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            2. 전체 커리큘럼 구조
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">단계</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">레벨</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">제목</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">레슨 수</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">소요시간</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">선수과목</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['기초', '0', '🐍 Python 기초', '6개', '42분', '없음'],
                  ['기초', '1', '🧠 AI 기초 이론', '7개', '44분', 'Level 0'],
                  ['기초', '2', '📐 수학 기초', '5개', '44분', 'Level 1'],
                  ['핵심', '3', '🔮 딥러닝 핵심', '6개', '36분', 'Level 2'],
                  ['핵심', '4', '🚀 PyTorch 실전', '7개', '31분', 'Level 3'],
                  ['심화', '5', '🖼️ CNN & 이미지', '8개', '6시간', 'Level 4'],
                  ['심화', '6', '📝 RNN/LSTM', '7개', '5시간', 'Level 4'],
                  ['심화', '7', '🤖 Transformer & LLM', '7개', '6시간', 'Level 6'],
                  ['고급', '8', '⚡ GPU/CUDA', '5개', '5시간', 'Level 4'],
                  ['고급', '9', '🏆 종합 프로젝트', '8개', '8시간', 'Level 5,7'],
                ].map(([stage, level, title, lessons, time, prereq], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        stage === '기초' ? 'bg-green-100 text-green-700' :
                        stage === '핵심' ? 'bg-blue-100 text-blue-700' :
                        stage === '심화' ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                      }`}>{stage}</span>
                    </td>
                    <td className="px-4 py-3 font-medium">Level {level}</td>
                    <td className="px-4 py-3">{title}</td>
                    <td className="px-4 py-3">{lessons}</td>
                    <td className="px-4 py-3">{time}</td>
                    <td className="px-4 py-3 text-gray-500">{prereq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Learning Path */}
          <div className="mt-6 bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
            <pre>{`Level 0 (Python) → Level 1 (AI 이론) → Level 2 (수학) → Level 3 (딥러닝)
    → Level 4 (PyTorch) ─┬─→ Level 5 (CNN) ─────────────┐
                          ├─→ Level 6 (RNN) → Level 7 (Transformer) ─┤
                          └─→ Level 8 (GPU/CUDA) ────────┤
                                                          └→ Level 9 (종합 프로젝트)`}</pre>
          </div>
        </section>

        {/* 4. 현재 기술 스택 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            3. 현재 기술 스택
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">프론트엔드</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Next.js 16.1.6', 'React 프레임워크'],
                  ['React 19.2.3', 'UI 라이브러리'],
                  ['TypeScript 5', '타입 안정성'],
                  ['Tailwind CSS 4', '유틸리티 CSS'],
                  ['react-markdown', 'Markdown 렌더링'],
                  ['Pyodide 0.24.1', '브라우저 Python 실행'],
                ].map(([tech, desc], i) => (
                  <div key={i} className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-900">{tech}</span>
                    <span className="text-gray-500">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">서버 환경</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['서버', 'AWS EC2 (Amazon Linux 2023)'],
                  ['Node.js', 'v22.22.0'],
                  ['포트', '8080 (Next.js)'],
                  ['데이터베이스', '없음 (정적 콘텐츠)'],
                  ['API 서버', '없음'],
                ].map(([label, val], i) => (
                  <div key={i} className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="font-medium text-gray-900">{label}</span>
                    <span className="text-gray-500">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. 각 레벨 실습 구현에 필요한 환경 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            4. 각 레벨 실습 구현에 필요한 환경
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left font-semibold">레벨</th>
                  <th className="px-4 py-3 text-left font-semibold">필요 환경</th>
                  <th className="px-4 py-3 text-left font-semibold">Pyodide</th>
                  <th className="px-4 py-3 text-left font-semibold">Colab</th>
                  <th className="px-4 py-3 text-left font-semibold">GPU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['Level 0', 'Python, NumPy, Matplotlib', '✅', '✅', '불필요'],
                  ['Level 1', 'Python, NumPy (이론 중심)', '✅', '✅', '불필요'],
                  ['Level 2', 'NumPy, Matplotlib, SymPy', '✅', '✅', '불필요'],
                  ['Level 3', 'PyTorch, NumPy', '❌', '✅', '선택'],
                  ['Level 4', 'PyTorch, torchvision', '❌', '✅', '선택'],
                  ['Level 5', 'PyTorch, torchvision, PIL', '❌', '✅', '권장'],
                  ['Level 6', 'PyTorch, torchtext', '❌', '✅', '권장'],
                  ['Level 7', 'PyTorch, Hugging Face', '❌', '✅', '필수'],
                  ['Level 8', 'CUDA Toolkit, nvcc', '❌', '⚠️ 부분', '필수'],
                  ['Level 9', 'YOLOv8, FastAPI, Docker', '❌', '⚠️ 부분', '필수'],
                ].map(([level, env, pyodide, colab, gpu], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{level}</td>
                    <td className="px-4 py-3 text-gray-700">{env}</td>
                    <td className="px-4 py-3">{pyodide}</td>
                    <td className="px-4 py-3">{colab}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        gpu === '불필요' ? 'bg-gray-100 text-gray-600' :
                        gpu === '선택' ? 'bg-blue-100 text-blue-700' :
                        gpu === '권장' ? 'bg-yellow-100 text-yellow-700' :
                        gpu === '필수' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{gpu}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. 핵심 이슈 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-700 flex items-center px-6">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            5. 핵심 이슈 및 권장 사항
          </h2>

          {/* Critical */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-bold text-red-800 text-lg mb-2">🔴 Critical: PyTorch 실행 환경 부재 (Level 3~9)</h3>
            <p className="text-red-700 mb-4">
              현재 Pyodide는 NumPy/Matplotlib만 지원하며, <strong>PyTorch는 지원하지 않음</strong>.
              Level 3부터 모든 레슨에서 PyTorch 코드가 등장하지만 실행 불가.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-red-200">
                    <th className="px-3 py-2 text-left font-semibold text-red-900">방안</th>
                    <th className="px-3 py-2 text-left font-semibold text-red-900">장점</th>
                    <th className="px-3 py-2 text-left font-semibold text-red-900">단점</th>
                    <th className="px-3 py-2 text-left font-semibold text-red-900">비용</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-100 text-red-800">
                  <tr><td className="px-3 py-2 font-medium">A. Google Colab 연동</td><td className="px-3 py-2">무료 GPU, 설정 불필요</td><td className="px-3 py-2">외부 의존</td><td className="px-3 py-2">무료</td></tr>
                  <tr><td className="px-3 py-2 font-medium">B. JupyterHub 구축</td><td className="px-3 py-2">완전 제어</td><td className="px-3 py-2">비용, 운영 부담</td><td className="px-3 py-2">$100~500+/월</td></tr>
                  <tr><td className="px-3 py-2 font-medium">C. 코드 실행 백엔드</td><td className="px-3 py-2">웹 통합, UX 우수</td><td className="px-3 py-2">보안 리스크</td><td className="px-3 py-2">$50~300/월</td></tr>
                  <tr className="bg-red-100"><td className="px-3 py-2 font-bold">D. Colab 노트북 다운로드 ✅</td><td className="px-3 py-2 font-semibold">구현 간단, 즉시 적용</td><td className="px-3 py-2">UX 분리</td><td className="px-3 py-2 font-bold">무료</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning GPU */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-bold text-yellow-800 text-lg mb-2">🟡 Warning: GPU 환경 부재 (Level 5~9)</h3>
            <p className="text-yellow-700 mb-3">현재 EC2에 GPU가 없어 CNN, RNN, Transformer 학습 불가.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-yellow-200">
                    <th className="px-3 py-2 text-left font-semibold text-yellow-900">방안</th>
                    <th className="px-3 py-2 text-left font-semibold text-yellow-900">GPU</th>
                    <th className="px-3 py-2 text-left font-semibold text-yellow-900">비용 (월)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-100 text-yellow-800">
                  <tr className="bg-yellow-100"><td className="px-3 py-2 font-bold">Google Colab Pro ✅</td><td className="px-3 py-2">T4/A100</td><td className="px-3 py-2 font-bold">$10</td></tr>
                  <tr><td className="px-3 py-2">AWS g4dn.xlarge</td><td className="px-3 py-2">T4 16GB</td><td className="px-3 py-2">~$160</td></tr>
                  <tr><td className="px-3 py-2">AWS g5.xlarge</td><td className="px-3 py-2">A10G 24GB</td><td className="px-3 py-2">~$300</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning Math */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-bold text-yellow-800 text-lg mb-2">🟡 Warning: 수식 렌더링 미지원</h3>
            <p className="text-yellow-700">
              Level 2~7에서 수학 수식이 등장하나 LaTeX 렌더링 없음. <code className="bg-yellow-200 px-1 rounded">remark-math</code> + <code className="bg-yellow-200 px-1 rounded">rehype-katex</code> 추가로 해결 가능.
            </p>
          </div>
        </section>

        {/* 8. 구현 로드맵 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            6. 구현 우선순위 로드맵
          </h2>
          <div className="space-y-4">
            {[
              {
                phase: 'Phase 1: 즉시 가능',
                color: 'bg-green-500',
                items: [
                  { done: true, text: '웹 플랫폼 배포 (포트 8080)' },
                  { done: true, text: 'Google Colab 노트북 다운로드 버튼 추가' },
                  { done: false, text: 'Level 0~1 실습 동작 확인 (Pyodide)' },
                  { done: false, text: '수식 렌더링 추가 (KaTeX)' },
                ],
              },
              {
                phase: 'Phase 2: 단기 (1~2주)',
                color: 'bg-blue-500',
                items: [
                  { done: false, text: 'YouTube 영상 제작 상태 확인 및 보완' },
                  { done: false, text: '레슨 콘텐츠 누락분 보완' },
                ],
              },
              {
                phase: 'Phase 3: 중기 (1~2개월)',
                color: 'bg-purple-500',
                items: [
                  { done: false, text: 'JupyterHub 또는 코드 실행 백엔드 구축 검토' },
                  { done: false, text: 'GPU 인스턴스 또는 Colab Pro 도입' },
                  { done: false, text: 'Level 9 프로젝트용 데이터셋 준비' },
                ],
              },
              {
                phase: 'Phase 4: 장기 (3~6개월)',
                color: 'bg-red-500',
                items: [
                  { done: false, text: '학습 진도 추적 시스템 (사용자 인증 + DB)' },
                  { done: false, text: '퀴즈/평가 시스템' },
                  { done: false, text: '수료증 발급 기능' },
                ],
              },
            ].map((phase, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className={`w-3 h-3 rounded-full ${phase.color} mr-2`}></span>
                  {phase.phase}
                </h3>
                <ul className="space-y-1 ml-5">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-700">
                      <span className={`mr-2 ${item.done ? 'text-green-600' : 'text-gray-400'}`}>
                        {item.done ? '✅' : '⬜'}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 9. 필요 패키지 */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            7. 환경별 필요 패키지
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono">
              <p className="text-green-400 mb-2"># 브라우저 (Level 0~2)</p>
              <p className="text-gray-300">Pyodide 0.24.1 (CDN)</p>
              <p className="text-gray-400">├── numpy (내장)</p>
              <p className="text-gray-400">├── matplotlib (내장)</p>
              <p className="text-gray-400">└── micropip</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono">
              <p className="text-green-400 mb-2"># Python 환경 (Level 3~9)</p>
              <p className="text-gray-300">pip install torch torchvision</p>
              <p className="text-gray-300">pip install numpy matplotlib</p>
              <p className="text-gray-400"># Level 7</p>
              <p className="text-gray-300">pip install transformers</p>
              <p className="text-gray-400"># Level 9</p>
              <p className="text-gray-300">pip install ultralytics fastapi</p>
            </div>
          </div>
        </section>

        {/* 10. 결론 */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded mr-3"></span>
            8. 결론
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-blue-200">
                  <th className="px-4 py-2 text-left font-semibold text-blue-900">구분</th>
                  <th className="px-4 py-2 text-left font-semibold text-blue-900">상태</th>
                  <th className="px-4 py-2 text-left font-semibold text-blue-900">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100 text-blue-800">
                <tr><td className="px-4 py-2">웹 플랫폼</td><td className="px-4 py-2">✅ 완성</td><td className="px-4 py-2">Next.js, 정상 서비스 중</td></tr>
                <tr><td className="px-4 py-2">Level 0~1 실습</td><td className="px-4 py-2">✅ 가능</td><td className="px-4 py-2">Pyodide 브라우저 실행</td></tr>
                <tr><td className="px-4 py-2">Level 2 실습</td><td className="px-4 py-2">⚠️ 부분 가능</td><td className="px-4 py-2">수식 렌더링 개선 필요</td></tr>
                <tr><td className="px-4 py-2">Level 3~4 실습</td><td className="px-4 py-2">✅ Colab 연동</td><td className="px-4 py-2">노트북 다운로드 가능</td></tr>
                <tr><td className="px-4 py-2">Level 5~7 실습</td><td className="px-4 py-2">✅ Colab 연동</td><td className="px-4 py-2">GPU 포함 노트북 다운로드</td></tr>
                <tr><td className="px-4 py-2">Level 8 실습</td><td className="px-4 py-2">⚠️ Colab 부분</td><td className="px-4 py-2">CUDA C 직접 컴파일 제한</td></tr>
                <tr><td className="px-4 py-2">Level 9 실습</td><td className="px-4 py-2">⚠️ Colab 부분</td><td className="px-4 py-2">배포(Docker) 부분 별도 필요</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-blue-100 rounded-lg p-4 text-blue-900 font-medium">
            <strong>핵심 결론:</strong> 웹 플랫폼은 완성도 높게 구축되었으며, Google Colab 노트북 다운로드 기능 추가로
            <strong> Level 0~7의 핵심 AI 학습을 무료로 진행</strong>할 수 있습니다.
            Level 8~9의 완전한 실습을 위해서는 GPU 환경 구축이 필요합니다.
          </div>
        </section>
      </div>
    </div>
  );
}
