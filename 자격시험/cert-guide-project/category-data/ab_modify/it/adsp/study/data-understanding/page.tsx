'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ADsPDataUnderstandingPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('adsp-data-understanding-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('adsp-data-understanding-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "데이터의 이해",
      icon: "📊",
      items: [
        "데이터의 정의: 데이터 vs 정보 vs 지식 vs 지혜 (DIKW 피라미드)",
        "데이터의 유형: 정형/반정형/비정형 데이터 구분",
        "데이터의 특징: 정확성, 완전성, 일관성, 적시성, 유일성",
        "암묵지와 형식지: SECI 모델 (사회화-표출화-결합화-내면화)",
        "데이터베이스 정의: DBMS의 개념과 특징",
        "데이터베이스 활용: OLTP와 OLAP의 차이점",
        "데이터 웨어하우스: ETL 프로세스, 스타 스키마",
        "데이터 마트: 데이터 웨어하우스와의 차이",
        "메타데이터: 기술 메타데이터, 비즈니스 메타데이터",
        "마스터 데이터 관리(MDM): 단일화된 핵심 데이터 관리"
      ]
    },
    {
      title: "데이터의 가치와 미래",
      icon: "💎",
      items: [
        "빅데이터의 정의: 3V (Volume, Velocity, Variety)",
        "빅데이터 확장: 5V (+ Veracity, Value)",
        "빅데이터 특징: 대용량, 다양성, 빠른 생성 속도",
        "데이터 사이언스: 통계학, CS, 도메인 지식 융합",
        "데이터 사이언티스트: 역할과 필요 역량",
        "분석적 경쟁력: 분석 3.0 시대의 특징",
        "분석 성숙도 모델: 도입-활용-확산-최적화 단계",
        "데이터 기반 의사결정: 직관 vs 데이터 기반",
        "가치 창출 사례: 아마존, 넷플릭스 추천 시스템",
        "데이터 활용 비즈니스: 맞춤형 서비스, 예측 분석"
      ]
    },
    {
      title: "빅데이터와 데이터 산업",
      icon: "🏭",
      items: [
        "빅데이터 플랫폼: 하둡(Hadoop) 에코시스템",
        "분산 저장: HDFS (Hadoop Distributed File System)",
        "분산 처리: MapReduce 프레임워크",
        "NoSQL 데이터베이스: MongoDB, Cassandra 특징",
        "스파크(Spark): 인메모리 처리 장점",
        "클라우드 컴퓨팅: IaaS, PaaS, SaaS 차이",
        "데이터 산업 현황: 국내외 데이터 시장 규모",
        "데이터 직업군: 데이터 엔지니어, 데이터 분석가",
        "데이터 관련 법률: 데이터 3법 개요",
        "데이터 거래: 데이터 거래소, 데이터 바우처"
      ]
    },
    {
      title: "개인정보 보호",
      icon: "🔒",
      items: [
        "개인정보 정의: 개인정보보호법상 정의",
        "개인정보 수집: 수집·이용 동의 원칙",
        "개인정보 처리: 처리 원칙 8가지",
        "개인정보 제공: 제3자 제공 동의 요건",
        "가명정보: 가명처리 개념과 활용",
        "익명정보: 개인정보에서 제외되는 정보",
        "비식별 조치: k-익명성, l-다양성, t-근접성",
        "정보주체 권리: 열람권, 정정권, 삭제권",
        "개인정보영향평가: PIA 개념과 절차",
        "GDPR: EU 개인정보보호규정 핵심 내용"
      ]
    },
    {
      title: "데이터 품질 관리",
      icon: "✅",
      items: [
        "데이터 품질: 정확성, 완전성, 일관성, 적시성",
        "데이터 품질 지표: DQI (Data Quality Index)",
        "데이터 프로파일링: 데이터 품질 진단 기법",
        "데이터 클렌징: 오류 데이터 정제 방법",
        "데이터 표준화: 데이터 표준 관리 체계",
        "데이터 거버넌스: 데이터 관리 조직과 역할",
        "데이터 스튜어드: 데이터 품질 담당자 역할",
        "데이터 카탈로그: 데이터 자산 관리",
        "데이터 리니지: 데이터 계보 추적",
        "데이터 생명주기: 생성-저장-활용-폐기"
      ]
    },
    {
      title: "기출 빈출 개념",
      icon: "⭐",
      items: [
        "DIKW 피라미드: 데이터 → 정보 → 지식 → 지혜",
        "3V/5V: 빅데이터 특징 정확히 암기",
        "SECI 모델: 암묵지-형식지 변환 과정",
        "정형/반정형/비정형: 각 데이터 예시",
        "OLTP vs OLAP: 트랜잭션 vs 분석 처리",
        "ETL: Extract-Transform-Load 순서",
        "k-익명성: 동일한 값 k개 이상 존재",
        "가명정보 vs 익명정보: 법적 구분",
        "데이터 3법: 개인정보보호법, 신용정보법, 정보통신망법",
        "분석 3.0: 빅데이터 기반 예측 분석 시대"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it/adsp" className="text-cyan-600 hover:text-cyan-800 flex items-center gap-2">
            <span>←</span>
            <span>ADsP로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📊</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">1과목: 데이터 이해</h1>
              <p className="text-gray-600">데이터 개념과 활용 60문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalItems}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicItems = topic.items.map((_, i) => `${topicIndex}-${i}`);
            const completedInTopic = topicItems.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-cyan-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.items.map((item, itemIndex) => {
                      const itemId = `${topicIndex}-${itemIndex}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={itemIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-cyan-50 border-cyan-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-cyan-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-cyan-500 hover:text-cyan-700 text-xs px-2 py-1 rounded bg-cyan-100 hover:bg-cyan-200"
                          >
                            AI
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-cyan-50 rounded-xl p-6 border border-cyan-200">
          <h3 className="font-bold text-cyan-800 mb-3">💡 1과목 학습 TIP</h3>
          <ul className="space-y-2 text-cyan-700 text-sm">
            <li>• 개념 정의와 용어 구분 문제가 자주 출제됩니다</li>
            <li>• DIKW, 3V/5V, SECI 모델은 반드시 암기하세요</li>
            <li>• 개인정보 관련 법률 내용은 빈출 영역입니다</li>
            <li>• 10문항 20% 비중이므로 효율적으로 학습하세요</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`ADsP 데이터 이해 관련 질문입니다: "${currentQuestion}" - 시험에 나올 수 있는 포인트와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`ADsP 데이터 이해 관련 질문입니다: "${currentQuestion}" - 시험에 나올 수 있는 포인트와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`ADsP 데이터 이해 관련 질문입니다: "${currentQuestion}" - 시험에 나올 수 있는 포인트와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                Gemini에게 질문
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
