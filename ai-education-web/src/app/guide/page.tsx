'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<'pyodide' | 'colab'>('pyodide');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            메인으로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">실습 환경 가이드</h1>
          <p className="mt-2 text-white/80">Pyodide (브라우저 Python)와 Google Colab의 사용법 및 기능 비교</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-300 mb-8">
          <button
            onClick={() => setActiveTab('pyodide')}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 -mb-px ${
              activeTab === 'pyodide'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🐍 Pyodide (브라우저 Python)
          </button>
          <button
            onClick={() => setActiveTab('colab')}
            className={`px-6 py-3 font-semibold text-sm transition-colors border-b-2 -mb-px ${
              activeTab === 'colab'
                ? 'border-orange-500 text-orange-600 bg-white rounded-t-lg'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📓 Google Colab
          </button>
        </div>

        {/* ===================== PYODIDE TAB ===================== */}
        {activeTab === 'pyodide' && (
          <div className="space-y-8">

            {/* 개요 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                <span className="w-1 h-6 bg-emerald-500 rounded mr-3"></span>
                Pyodide란?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Pyodide</strong>는 Python 인터프리터를 <strong>WebAssembly(Wasm)</strong>로 컴파일하여
                    웹 브라우저에서 직접 Python 코드를 실행할 수 있게 해주는 오픈소스 프로젝트입니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    별도의 서버나 설치 없이, 웹 페이지를 열기만 하면 Python을 사용할 수 있습니다.
                    Mozilla에서 시작되었으며 현재는 독립 프로젝트로 운영됩니다.
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">핵심 특징</h4>
                  <ul className="space-y-2 text-sm text-emerald-700">
                    <li className="flex items-start"><span className="mr-2">✅</span> 설치 불필요 - 브라우저만 있으면 됨</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> 인터넷만 되면 어디서든 실행</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> NumPy, Matplotlib 등 과학 라이브러리 내장</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> JavaScript와 양방향 연동 가능</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> 완전 무료</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 동작 원리 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                <span className="w-1 h-6 bg-emerald-500 rounded mr-3"></span>
                동작 원리
              </h2>
              <div className="bg-gray-900 rounded-lg p-6 text-sm font-mono text-center space-y-3">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="bg-blue-900 border border-blue-500 rounded-lg px-4 py-3 text-blue-300">
                    <div className="font-bold">Python 코드</div>
                    <div className="text-xs text-blue-400">사용자 입력</div>
                  </div>
                  <span className="text-yellow-400 text-xl">→</span>
                  <div className="bg-purple-900 border border-purple-500 rounded-lg px-4 py-3 text-purple-300">
                    <div className="font-bold">Pyodide (Wasm)</div>
                    <div className="text-xs text-purple-400">브라우저 내 Python 엔진</div>
                  </div>
                  <span className="text-yellow-400 text-xl">→</span>
                  <div className="bg-green-900 border border-green-500 rounded-lg px-4 py-3 text-green-300">
                    <div className="font-bold">실행 결과</div>
                    <div className="text-xs text-green-400">화면에 출력</div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">모든 처리가 사용자의 브라우저에서 수행됨 (서버 전송 없음)</p>
              </div>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-1">1. 로딩</h4>
                  <p className="text-sm text-gray-600">CDN에서 Pyodide 엔진(~10MB)을 다운로드하여 브라우저 메모리에 로드</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-1">2. 실행</h4>
                  <p className="text-sm text-gray-600">WebAssembly로 컴파일된 CPython이 코드를 해석·실행</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-1">3. 출력</h4>
                  <p className="text-sm text-gray-600">stdout/stderr를 캡처하여 웹 페이지에 표시</p>
                </div>
              </div>
            </section>

            {/* 지원 라이브러리 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                <span className="w-1 h-6 bg-emerald-500 rounded mr-3"></span>
                지원 라이브러리
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-green-700">✅ 기본 내장 (즉시 사용 가능)</h3>
                  <div className="space-y-2">
                    {[
                      ['numpy', '다차원 배열, 행렬 연산, 선형대수'],
                      ['matplotlib', '그래프, 차트, 데이터 시각화'],
                      ['scipy', '과학 계산, 최적화, 통계'],
                      ['pandas', '데이터 분석, DataFrame'],
                      ['scikit-learn', '머신러닝 알고리즘'],
                      ['sympy', '기호 수학, 미적분'],
                      ['networkx', '그래프 이론, 네트워크 분석'],
                      ['Pillow', '이미지 처리 (기본)'],
                    ].map(([name, desc], i) => (
                      <div key={i} className="flex items-start text-sm border-b border-gray-100 pb-1">
                        <code className="text-emerald-600 font-semibold mr-2 min-w-[110px]">{name}</code>
                        <span className="text-gray-600">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-red-600">❌ 지원하지 않는 라이브러리</h3>
                  <div className="space-y-2">
                    {[
                      ['PyTorch', 'C++ 확장, CUDA 의존 → Wasm 비호환'],
                      ['TensorFlow', '대규모 C++ 바이너리 → Wasm 비호환'],
                      ['OpenCV (full)', 'C++ 기반, 카메라 접근 제한'],
                      ['transformers', 'PyTorch/TF 의존'],
                      ['ultralytics', 'PyTorch 의존 (YOLOv8)'],
                      ['CUDA 관련', 'GPU 직접 접근 불가'],
                    ].map(([name, reason], i) => (
                      <div key={i} className="flex items-start text-sm border-b border-gray-100 pb-1">
                        <code className="text-red-600 font-semibold mr-2 min-w-[110px]">{name}</code>
                        <span className="text-gray-500">{reason}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    <strong>핵심:</strong> GPU 가속이나 대규모 C++ 확장이 필요한 딥러닝 프레임워크는 Pyodide에서 실행 불가 → Google Colab 사용 필요
                  </div>
                </div>
              </div>
            </section>

            {/* 이 플랫폼에서의 사용법 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                <span className="w-1 h-6 bg-emerald-500 rounded mr-3"></span>
                이 플랫폼에서 Pyodide 사용하기
              </h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">1️⃣</div>
                    <h4 className="font-semibold text-gray-900 mb-1">레슨 페이지 열기</h4>
                    <p className="text-sm text-gray-600">Level 0~2의 레슨 페이지로 이동합니다</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">2️⃣</div>
                    <h4 className="font-semibold text-gray-900 mb-1">코드 블록의 &quot;실행&quot; 클릭</h4>
                    <p className="text-sm text-gray-600">Python 코드 블록 우측 상단의 <span className="text-green-600 font-semibold">▶ 실행</span> 버튼 클릭</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">3️⃣</div>
                    <h4 className="font-semibold text-gray-900 mb-1">코드 수정 및 실행</h4>
                    <p className="text-sm text-gray-600">Python 실습 창에서 코드를 수정하고 결과를 확인합니다</p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-5">
                  <p className="text-gray-400 text-xs mb-3 font-mono">실습 예시 - 바로 실행 가능한 코드</p>
                  <pre className="text-sm text-green-400 font-mono overflow-x-auto">{`import numpy as np
import matplotlib.pyplot as plt

# 퍼셉트론으로 AND 게이트 학습
X = np.array([[0,0], [0,1], [1,0], [1,1]])
y = np.array([0, 0, 0, 1])  # AND 진리표

weights = np.random.randn(2) * 0.1
bias = 0.0
lr = 0.1

for epoch in range(100):
    for i in range(len(X)):
        z = np.dot(X[i], weights) + bias
        pred = 1 if z > 0.5 else 0
        error = y[i] - pred
        weights += lr * error * X[i]
        bias += lr * error

print("학습 결과:")
for i in range(len(X)):
    z = np.dot(X[i], weights) + bias
    pred = 1 if z > 0.5 else 0
    print(f"  {X[i]} → {pred} (정답: {y[i]})")`}</pre>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 주의사항</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• 처음 실행 시 Pyodide 로딩에 약 5~10초 소요 (이후 캐시됨)</li>
                    <li>• 대용량 데이터 처리 시 브라우저 메모리 제한에 주의</li>
                    <li>• Matplotlib 그래프는 텍스트로 출력됨 (이미지 렌더링 제한적)</li>
                    <li>• 무한 루프 실행 시 브라우저 탭이 멈출 수 있음</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 적용 레벨 */}
            <section className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-emerald-700 mb-4 flex items-center">
                <span className="w-1 h-6 bg-emerald-500 rounded mr-3"></span>
                Pyodide 적용 가능 레벨
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { level: 'Level 0', title: 'Python 기초', status: '✅ 완전 지원', desc: 'Python 문법, NumPy, Matplotlib 모두 실행 가능' },
                  { level: 'Level 1', title: 'AI 기초 이론', status: '✅ 완전 지원', desc: '퍼셉트론 구현, 논리 게이트 등 NumPy로 실행 가능' },
                  { level: 'Level 2', title: '수학 기초', status: '✅ 대부분 지원', desc: '함수 그래프, 미분, 행렬 연산 등 NumPy/SymPy로 가능' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-emerald-200">
                    <div className="font-bold text-gray-900">{item.level}: {item.title}</div>
                    <div className="text-emerald-600 font-semibold text-sm mt-1">{item.status}</div>
                    <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===================== COLAB TAB ===================== */}
        {activeTab === 'colab' && (
          <div className="space-y-8">

            {/* 개요 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <span className="w-1 h-6 bg-orange-500 rounded mr-3"></span>
                Google Colab이란?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Google Colaboratory (Colab)</strong>는 Google이 제공하는 <strong>무료 클라우드 기반 Jupyter Notebook</strong> 환경입니다.
                    브라우저에서 Python 코드를 작성·실행할 수 있으며, <strong>무료 GPU(NVIDIA T4)</strong>를 제공합니다.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    딥러닝 학습, 데이터 분석, 머신러닝 실험에 가장 널리 사용되는 무료 플랫폼입니다.
                    Google 계정만 있으면 바로 사용 가능합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">핵심 특징</h4>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li className="flex items-start"><span className="mr-2">✅</span> 무료 GPU (NVIDIA T4 15GB) 제공</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> PyTorch, TensorFlow 사전 설치됨</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> Google Drive 연동으로 파일 저장</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> 셀 단위 코드 실행 (Jupyter Notebook)</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> 공유 및 협업 기능</li>
                    <li className="flex items-start"><span className="mr-2">✅</span> pip install로 추가 패키지 설치 가능</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 동작 원리 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <span className="w-1 h-6 bg-orange-500 rounded mr-3"></span>
                동작 원리
              </h2>
              <div className="bg-gray-900 rounded-lg p-6 text-sm font-mono text-center space-y-3">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="bg-blue-900 border border-blue-500 rounded-lg px-4 py-3 text-blue-300">
                    <div className="font-bold">내 브라우저</div>
                    <div className="text-xs text-blue-400">코드 편집 (프론트엔드)</div>
                  </div>
                  <span className="text-yellow-400 text-xl">→ 인터넷 →</span>
                  <div className="bg-orange-900 border border-orange-500 rounded-lg px-4 py-3 text-orange-300">
                    <div className="font-bold">Google 서버</div>
                    <div className="text-xs text-orange-400">Python + GPU 실행</div>
                  </div>
                  <span className="text-yellow-400 text-xl">→ 결과 →</span>
                  <div className="bg-green-900 border border-green-500 rounded-lg px-4 py-3 text-green-300">
                    <div className="font-bold">내 브라우저</div>
                    <div className="text-xs text-green-400">결과 표시</div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">코드는 Google 클라우드 서버의 가상 머신(VM)에서 실행됨</p>
              </div>
              <div className="mt-4 grid md:grid-cols-4 gap-3">
                {[
                  ['1. 접속', 'colab.research.google.com 접속, Google 계정 로그인'],
                  ['2. 노트북 열기', '.ipynb 파일 업로드 또는 새 노트북 생성'],
                  ['3. 런타임 연결', 'Google 서버에 가상 머신 할당 (GPU 선택 가능)'],
                  ['4. 코드 실행', '셀 단위로 코드 실행, 결과 즉시 확인'],
                ].map(([title, desc], i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3 border text-center">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{title}</h4>
                    <p className="text-xs text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 무료 vs 유료 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <span className="w-1 h-6 bg-orange-500 rounded mr-3"></span>
                무료 vs 유료 플랜
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left font-semibold">항목</th>
                      <th className="px-4 py-3 text-left font-semibold">무료</th>
                      <th className="px-4 py-3 text-left font-semibold bg-orange-50">Colab Pro ($10/월)</th>
                      <th className="px-4 py-3 text-left font-semibold">Colab Pro+ ($50/월)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      ['GPU', 'T4 (제한적)', 'T4, V100, A100', 'A100 우선 배정'],
                      ['GPU 사용 시간', '~4시간/세션', '~24시간/세션', '~24시간/세션'],
                      ['RAM', '~12GB', '~32GB', '~52GB'],
                      ['디스크', '~100GB', '~150GB', '~225GB'],
                      ['유휴 종료', '90분', '더 긴 유휴 시간', '더 긴 유휴 시간'],
                      ['백그라운드 실행', '❌', '❌', '✅'],
                      ['터미널 접근', '제한적', '✅', '✅'],
                      ['우선 할당', '❌', '⚠️ 보통', '✅ 우선'],
                    ].map(([item, free, pro, proPlus], i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium text-gray-900">{item}</td>
                        <td className="px-4 py-2 text-gray-700">{free}</td>
                        <td className="px-4 py-2 text-orange-700 bg-orange-50/50 font-medium">{pro}</td>
                        <td className="px-4 py-2 text-gray-700">{proPlus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800">
                <strong>AI 교육 권장:</strong> <strong>무료 플랜</strong>으로 Level 0~7의 모든 실습이 가능합니다.
                대규모 모델 학습(Level 7~9)에서 더 빠른 GPU가 필요하면 Colab Pro($10/월)를 추천합니다.
              </div>
            </section>

            {/* GPU 설정 방법 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <span className="w-1 h-6 bg-orange-500 rounded mr-3"></span>
                GPU 설정 방법
              </h2>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                {[
                  { step: '1', title: '런타임 메뉴', desc: '상단 메뉴에서 "런타임" 클릭' },
                  { step: '2', title: '런타임 유형 변경', desc: '"런타임 유형 변경" 선택' },
                  { step: '3', title: 'GPU 선택', desc: '하드웨어 가속기를 "T4 GPU"로 변경' },
                  { step: '4', title: '저장', desc: '"저장" 클릭 → 런타임 재연결' },
                ].map((item, i) => (
                  <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{item.step}</div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <p className="text-gray-400 text-xs mb-2 font-mono"># GPU 확인 코드 (Colab에서 실행)</p>
                <pre className="text-sm text-green-400 font-mono">{`import torch
print(f"PyTorch version: {torch.__version__}")
print(f"CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")
    print(f"GPU Memory: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")`}</pre>
              </div>
            </section>

            {/* 이 플랫폼에서의 사용법 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <span className="w-1 h-6 bg-orange-500 rounded mr-3"></span>
                이 플랫폼에서 Colab 사용하기
              </h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { step: '1️⃣', title: '레슨 페이지 열기', desc: '학습하려는 레슨 페이지로 이동' },
                    { step: '2️⃣', title: '노트북 다운로드', desc: '"Colab 노트북 다운로드" 버튼 클릭' },
                    { step: '3️⃣', title: 'Colab에서 열기', desc: 'colab.research.google.com 접속 → 파일 업로드' },
                    { step: '4️⃣', title: '순서대로 실행', desc: '셀을 위에서 아래로 순서대로 실행' },
                  ].map((item, i) => (
                    <div key={i} className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">{item.step}</div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Colab에서 노트북 열기 (상세)</h4>
                  <ol className="space-y-2 text-sm text-blue-700 list-decimal list-inside">
                    <li><a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-medium">colab.research.google.com</a> 접속</li>
                    <li>&quot;파일&quot; → &quot;노트북 업로드&quot; 클릭</li>
                    <li>다운로드한 <code className="bg-blue-200 px-1 rounded">.ipynb</code> 파일을 선택하여 업로드</li>
                    <li>(GPU 필요 시) &quot;런타임&quot; → &quot;런타임 유형 변경&quot; → &quot;T4 GPU&quot; 선택</li>
                    <li>첫 번째 셀부터 <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">Shift + Enter</kbd>로 순서대로 실행</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ 주의사항</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• 무료 GPU는 <strong>연속 사용 시간 제한</strong>이 있음 (~4시간)</li>
                    <li>• 90분 유휴 시 자동 종료 → 변수/데이터 초기화됨</li>
                    <li>• 중요한 결과는 Google Drive에 저장 권장</li>
                    <li>• GPU가 부족할 때 &quot;GPU를 사용할 수 없습니다&quot; 메시지가 뜰 수 있음 (시간대 변경 후 재시도)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 사전 설치 패키지 */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <span className="w-1 h-6 bg-orange-500 rounded mr-3"></span>
                Colab 사전 설치 패키지
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-700 mb-3">✅ 사전 설치됨 (즉시 import 가능)</h3>
                  <div className="space-y-1.5">
                    {[
                      ['torch, torchvision', 'PyTorch 딥러닝 프레임워크'],
                      ['tensorflow, keras', 'TensorFlow 프레임워크'],
                      ['numpy, scipy', '수치 계산'],
                      ['pandas', '데이터 분석'],
                      ['matplotlib, seaborn', '데이터 시각화'],
                      ['scikit-learn', '머신러닝'],
                      ['PIL/Pillow', '이미지 처리'],
                      ['cv2 (OpenCV)', '컴퓨터 비전'],
                      ['nltk', '자연어 처리'],
                    ].map(([name, desc], i) => (
                      <div key={i} className="flex items-start text-sm border-b border-gray-100 pb-1">
                        <code className="text-green-600 font-semibold mr-2 min-w-[150px]">{name}</code>
                        <span className="text-gray-600">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-700 mb-3">📦 pip install로 추가 설치</h3>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono space-y-2">
                    <p className="text-gray-400"># Level 7: Transformer</p>
                    <p className="text-green-400">!pip install transformers datasets</p>
                    <p className="text-gray-400 mt-3"># Level 9: 번호판 인식</p>
                    <p className="text-green-400">!pip install ultralytics</p>
                    <p className="text-gray-400 mt-3"># Level 9: API 배포</p>
                    <p className="text-green-400">!pip install fastapi uvicorn</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Colab에서는 코드 셀에서 <code className="bg-gray-200 px-1 rounded">!</code>를 앞에 붙여 터미널 명령을 실행할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 적용 레벨 */}
            <section className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
                <span className="w-1 h-6 bg-orange-500 rounded mr-3"></span>
                Colab 적용 가능 레벨
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { level: 'Level 0~2', title: '기초', status: '✅ 완전 지원', desc: 'Pyodide로도 가능하지만 Colab도 사용 가능' },
                  { level: 'Level 3~4', title: '딥러닝/PyTorch', status: '✅ 완전 지원', desc: 'PyTorch 사전 설치, GPU 선택 가능' },
                  { level: 'Level 5', title: 'CNN & 이미지', status: '✅ 완전 지원', desc: 'GPU로 CNN 학습, torchvision 내장' },
                  { level: 'Level 6', title: 'RNN/LSTM', status: '✅ 완전 지원', desc: 'PyTorch RNN, 시계열/텍스트 처리' },
                  { level: 'Level 7', title: 'Transformer', status: '✅ 완전 지원', desc: 'Hugging Face 설치, GPU로 LLM 추론' },
                  { level: 'Level 8', title: 'GPU/CUDA', status: '⚠️ 부분 지원', desc: 'PyTorch GPU 사용 가능, 순수 CUDA C 프로그래밍은 제한적' },
                  { level: 'Level 9', title: '종합 프로젝트', status: '⚠️ 부분 지원', desc: 'YOLO 학습/추론 가능, Docker 배포는 불가' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-orange-200">
                    <div className="font-bold text-gray-900">{item.level}: {item.title}</div>
                    <div className={`font-semibold text-sm mt-1 ${item.status.startsWith('✅') ? 'text-green-600' : 'text-yellow-600'}`}>{item.status}</div>
                    <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===================== COMPARISON ===================== */}
        <section className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="w-1 h-6 bg-gray-500 rounded mr-3"></span>
            Pyodide vs Google Colab 비교
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left font-semibold">구분</th>
                  <th className="px-4 py-3 text-left font-semibold text-emerald-700">🐍 Pyodide</th>
                  <th className="px-4 py-3 text-left font-semibold text-orange-600">📓 Google Colab</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['실행 위치', '내 브라우저 (로컬)', 'Google 클라우드 서버'],
                  ['설치 필요', '❌ 없음', '❌ 없음 (Google 계정 필요)'],
                  ['인터넷 필요', '처음 로딩 시만', '항상 필요'],
                  ['GPU 지원', '❌ 불가', '✅ 무료 T4 GPU'],
                  ['PyTorch', '❌ 미지원', '✅ 사전 설치'],
                  ['TensorFlow', '❌ 미지원', '✅ 사전 설치'],
                  ['NumPy/Matplotlib', '✅ 내장', '✅ 사전 설치'],
                  ['응답 속도', '⚡ 즉시 (로컬 실행)', '🔄 약간의 지연 (네트워크)'],
                  ['데이터 보안', '✅ 데이터가 외부 전송 안됨', '⚠️ Google 서버로 전송'],
                  ['사용 시간 제한', '❌ 없음', '⚠️ ~4시간/세션, 90분 유휴 종료'],
                  ['파일 저장', '❌ 브라우저 메모리만', '✅ Google Drive 연동'],
                  ['협업', '❌ 불가', '✅ 공유 링크로 협업'],
                  ['비용', '완전 무료', '무료 (유료 옵션 있음)'],
                  ['적합 레벨', 'Level 0~2', 'Level 0~9 (전체)'],
                ].map(([item, pyodide, colab], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{item}</td>
                    <td className="px-4 py-2 text-gray-700">{pyodide}</td>
                    <td className="px-4 py-2 text-gray-700">{colab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <strong>💡 권장 사용법:</strong>
            <ul className="mt-2 space-y-1">
              <li>• <strong>Level 0~2 (기초):</strong> Pyodide로 즉시 실행 → 빠르고 편리</li>
              <li>• <strong>Level 3~7 (딥러닝/심화):</strong> Colab 노트북 다운로드 → GPU 환경에서 실습</li>
              <li>• <strong>Level 8~9 (고급):</strong> Colab + 필요 시 로컬 환경 병행</li>
            </ul>
          </div>
        </section>

        {/* 외부 링크 */}
        <section className="bg-gray-100 rounded-xl p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">참고 링크</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              ['Pyodide 공식 사이트', 'https://pyodide.org/'],
              ['Pyodide GitHub', 'https://github.com/pyodide/pyodide'],
              ['Google Colab', 'https://colab.research.google.com/'],
              ['Colab FAQ', 'https://research.google.com/colaboratory/faq.html'],
            ].map(([label, url], i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border hover:border-blue-300 hover:shadow-sm transition-all text-sm"
              >
                <span className="text-gray-900 font-medium">{label}</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
