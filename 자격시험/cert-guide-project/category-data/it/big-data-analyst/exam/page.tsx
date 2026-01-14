'use client';

import { useState } from 'react';

export default function BigDataAnalystExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '빅데이터 분석 기획',
      questions: 20,
      difficulty: 2,
      passRate: 55,
      topics: [
        '빅데이터의 이해',
        '데이터 분석 계획',
        '데이터 확보 계획',
        '분석 마스터 플랜',
        '분석 거버넌스 체계',
        '분석 과제 정의',
        '분석 프로젝트 관리',
        '분석 인프라 이해'
      ],
      tips: '암기 위주 과목. 용어 정리가 핵심!'
    },
    {
      name: '빅데이터 탐색',
      questions: 20,
      difficulty: 3,
      passRate: 48,
      topics: [
        '데이터 전처리',
        '결측치/이상치 처리',
        '데이터 변환',
        '탐색적 데이터 분석(EDA)',
        '기초 통계량',
        '상관분석',
        '시각화 기법',
        '차원 축소'
      ],
      tips: 'pandas 함수와 통계 개념 이해 필수!'
    },
    {
      name: '빅데이터 모델링',
      questions: 20,
      difficulty: 4,
      passRate: 40,
      topics: [
        '회귀분석',
        '분류 모델 (로지스틱, 의사결정나무)',
        '앙상블 (랜덤포레스트, XGBoost)',
        '군집분석 (K-means, 계층적)',
        '시계열 분석',
        '딥러닝 기초',
        '모델 학습/검증',
        '하이퍼파라미터 튜닝'
      ],
      tips: '가장 어려운 과목! sklearn 알고리즘 원리 이해 필요'
    },
    {
      name: '빅데이터 결과 해석',
      questions: 20,
      difficulty: 3,
      passRate: 50,
      topics: [
        '분석 모델 평가',
        '정확도/정밀도/재현율',
        'ROC-AUC 곡선',
        '교차검증',
        '과적합 방지',
        '분석 결과 시각화',
        '분석 보고서 작성',
        '분석 결과 활용'
      ],
      tips: '평가지표 공식 암기 + 실기와 연계!'
    }
  ];

  const practicalTypes = [
    {
      name: '작업형 1유형',
      ratio: 30,
      time: '40분',
      questions: 3,
      format: '단답형 (숫자/문자열)',
      topics: [
        '데이터 로드 및 탐색',
        '결측치/이상치 처리',
        '데이터 필터링',
        '그룹별 집계',
        '데이터 정렬/순위'
      ],
      example: 'df에서 Age 컬럼의 결측치를 중앙값으로 대체한 후, Salary가 가장 높은 상위 5명의 평균 Age는?'
    },
    {
      name: '작업형 2유형',
      ratio: 40,
      time: '80분',
      questions: 1,
      format: 'CSV 파일 제출 (예측값)',
      topics: [
        '데이터 전처리',
        '피처 엔지니어링',
        '모델 학습 (분류/회귀)',
        '예측 및 결과 제출',
        '모델 성능 최적화'
      ],
      example: '주어진 train.csv로 모델을 학습하고, test.csv의 target 값을 예측하여 submission.csv로 제출'
    },
    {
      name: '작업형 3유형',
      ratio: 30,
      time: '40분',
      questions: 2,
      format: '단답형 (통계량/p-value)',
      topics: [
        '가설검정 (t-test, 카이제곱)',
        '분산분석 (ANOVA)',
        '상관분석',
        '회귀분석 결과 해석',
        '신뢰구간 계산'
      ],
      example: '두 그룹 간 평균 차이가 통계적으로 유의한지 검정하고, p-value를 소수점 4자리까지 구하시오.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/big-data-analyst" className="text-gray-600 hover:text-blue-600">빅데이터분석기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📊</span>
            <div>
              <h1 className="text-2xl font-bold">빅데이터분석기사 시험 상세</h1>
              <p className="text-cyan-100">필기 4과목 80문항 / 실기 작업형 3유형</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('written')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'written'
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              💻 실기시험
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">과목 수</p>
                  <p className="text-2xl font-bold text-cyan-600">4과목</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">총 문항</p>
                  <p className="text-2xl font-bold text-blue-600">80문항</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험 시간</p>
                  <p className="text-2xl font-bold text-indigo-600">2시간</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">합격 기준</p>
                  <p className="text-2xl font-bold text-purple-600">60점</p>
                  <p className="text-xs text-gray-400">과목당 40점↑</p>
                </div>
              </div>
            </section>

            {/* 과목별 상세 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세</h2>
              {writtenSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <h3 className="text-lg font-bold">{subject.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span>{subject.questions}문항</span>
                        <span>합격률 {subject.passRate}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">주요 출제 토픽</p>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">난이도:</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <span key={s} className={s <= subject.difficulty ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-amber-50 px-3 py-1 rounded-lg">
                        <p className="text-sm text-amber-800">💡 {subject.tips}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 필기 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">📌 과목별 공략</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-800">1과목 (기획): 70점 목표</p>
                      <p className="text-sm text-green-600">암기 위주, 2-3일이면 정리 가능</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800">2과목 (탐색): 65점 목표</p>
                      <p className="text-sm text-blue-600">pandas 문법 + 통계 개념 병행</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="font-medium text-orange-800">3과목 (모델링): 55점 목표</p>
                      <p className="text-sm text-orange-600">과락만 면하자! 원리 이해 중심</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium text-purple-800">4과목 (해석): 65점 목표</p>
                      <p className="text-sm text-purple-600">평가지표 공식 암기 필수</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">⚡ 단기 합격 팁</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">✓</span>
                      <span>기출문제 최소 3회독 (CBT 형식 연습)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">✓</span>
                      <span>3과목 과락 주의! 모르면 찍고 시간 배분</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">✓</span>
                      <span>1,4과목으로 점수 확보 후 2,3과목 보완</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">✓</span>
                      <span>sklearn 주요 함수/파라미터 암기</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">✓</span>
                      <span>통계 용어 영어-한글 매칭 정리</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💻 실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험 유형</p>
                  <p className="text-2xl font-bold text-cyan-600">작업형</p>
                  <p className="text-xs text-gray-400">Python/R</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">유형 수</p>
                  <p className="text-2xl font-bold text-blue-600">3유형</p>
                  <p className="text-xs text-gray-400">총 6문제</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">시험 시간</p>
                  <p className="text-2xl font-bold text-indigo-600">3시간</p>
                  <p className="text-xs text-gray-400">180분</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">합격 기준</p>
                  <p className="text-2xl font-bold text-purple-600">60점</p>
                  <p className="text-xs text-gray-400">100점 만점</p>
                </div>
              </div>
            </section>

            {/* 유형별 상세 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📋 유형별 상세</h2>
              {practicalTypes.map((type, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{type.name}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="bg-white/20 px-3 py-1 rounded-full">{type.ratio}점</span>
                        <span>{type.time}</span>
                        <span>{type.questions}문제</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">출제 영역</p>
                        <div className="flex flex-wrap gap-2">
                          {type.topics.map((topic, i) => (
                            <span key={i} className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">제출 형식</p>
                        <p className="text-gray-800 font-medium">{type.format}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">예시 문제</p>
                      <p className="text-gray-700">{type.example}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* 실기 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 실기 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">📌 유형별 공략</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-800">1유형: 25점 확보 목표</p>
                      <p className="text-sm text-green-600">pandas 기본기 연습! 가장 쉬움</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800">2유형: 30점 확보 목표</p>
                      <p className="text-sm text-blue-600">템플릿 코드 암기 + 자주 나오는 모델 연습</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium text-purple-800">3유형: 15점 확보 목표</p>
                      <p className="text-sm text-purple-600">scipy.stats 함수 익히기</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">⚡ 필수 라이브러리</h3>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono">
                    <p className="text-green-400"># 데이터 처리</p>
                    <p className="text-gray-300">import pandas as pd</p>
                    <p className="text-gray-300">import numpy as np</p>
                    <p className="text-green-400 mt-2"># 머신러닝</p>
                    <p className="text-gray-300">from sklearn.model_selection import train_test_split</p>
                    <p className="text-gray-300">from sklearn.ensemble import RandomForestClassifier</p>
                    <p className="text-green-400 mt-2"># 통계</p>
                    <p className="text-gray-300">from scipy import stats</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800">
                  <strong>💡 핵심 팁:</strong> 2유형 템플릿을 완벽히 외우면 40점 확보 가능!
                  나머지 1,3유형에서 20점만 더 얻으면 합격!
                </p>
              </div>
            </section>

            {/* 자주 나오는 코드 패턴 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 2유형 템플릿 코드</h2>
              <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre className="text-gray-300">{`# 1. 데이터 로드
train = pd.read_csv('train.csv')
test = pd.read_csv('test.csv')

# 2. 전처리
train = train.fillna(train.median())
test = test.fillna(test.median())

# 3. 피처/타겟 분리
X = train.drop(['id', 'target'], axis=1)
y = train['target']
X_test = test.drop(['id'], axis=1)

# 4. 모델 학습
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# 5. 예측 및 제출
pred = model.predict(X_test)
submit = pd.DataFrame({'id': test['id'], 'target': pred})
submit.to_csv('submission.csv', index=False)`}</pre>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 Q-Net에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
