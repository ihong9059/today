'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConventionPracticalPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const topics = [
    { id: 0, name: '기획서 개요', count: 10 },
    { id: 1, name: '프로그램 구성', count: 10 },
    { id: 2, name: '예산 계획', count: 10 },
    { id: 3, name: '운영 계획', count: 10 },
    { id: 4, name: '홍보·마케팅', count: 10 },
  ];

  const questions = [
    // 기획서 개요 (10문항)
    { id: 1, topic: 0, question: "행사 기획서의 핵심 구성요소가 아닌 것은?", options: ["행사 개요", "목적 및 기대효과", "참가자 개인정보", "예산 계획"], answer: 2 },
    { id: 2, topic: 0, question: "행사 개요에 반드시 포함되어야 할 항목은?", options: ["행사명, 일시, 장소", "참가자 취미", "주최자 연봉", "과거 행사 수익"], answer: 0 },
    { id: 3, topic: 0, question: "행사 목적 작성 시 SMART 원칙의 'S'가 의미하는 것은?", options: ["Specific(구체적)", "Simple(단순한)", "Strong(강력한)", "Soft(유연한)"], answer: 0 },
    { id: 4, topic: 0, question: "기대효과 작성 시 포함되어야 할 내용이 아닌 것은?", options: ["정량적 목표", "정성적 효과", "개인적 바람", "파급효과"], answer: 2 },
    { id: 5, topic: 0, question: "행사 장소 선정 기준이 아닌 것은?", options: ["수용 인원", "접근성", "주최자 자택 근접성", "시설 및 장비"], answer: 2 },
    { id: 6, topic: 0, question: "기획서 작성 시 5W1H에 해당하지 않는 것은?", options: ["Who", "When", "Worth", "How"], answer: 2 },
    { id: 7, topic: 0, question: "행사 주제(Theme) 설정의 중요성으로 옳지 않은 것은?", options: ["통일성 부여", "참가자 관심 유도", "비용 절감 보장", "메시지 전달"], answer: 2 },
    { id: 8, topic: 0, question: "컨벤션 기획서의 표지에 포함되어야 할 내용이 아닌 것은?", options: ["행사명", "주최기관", "작성일자", "세부 예산"], answer: 3 },
    { id: 9, topic: 0, question: "행사 개요의 '규모' 항목에 포함되는 내용은?", options: ["예상 참가자 수", "케이터링 메뉴", "강연자 경력", "스폰서 계약서"], answer: 0 },
    { id: 10, topic: 0, question: "기획서 작성 순서로 가장 적절한 것은?", options: ["목적→개요→프로그램→예산→운영", "예산→개요→목적→운영→프로그램", "운영→예산→개요→프로그램→목적", "프로그램→운영→예산→목적→개요"], answer: 0 },

    // 프로그램 구성 (10문항)
    { id: 11, topic: 1, question: "컨벤션 프로그램 구성의 3요소가 아닌 것은?", options: ["내용(Content)", "형식(Format)", "비용(Cost)", "시간(Time)"], answer: 2 },
    { id: 12, topic: 1, question: "세션(Session) 유형 중 발표자가 일방향으로 강연하는 형태는?", options: ["플레너리(Plenary)", "패널 토론", "워크숍", "네트워킹"], answer: 0 },
    { id: 13, topic: 1, question: "프로그램 일정표 작성 시 고려사항이 아닌 것은?", options: ["참가자 피로도", "적정 휴식 시간", "발표자 개인 일정", "이동 시간"], answer: 2 },
    { id: 14, topic: 1, question: "기조연설(Keynote)의 특징으로 옳은 것은?", options: ["행사의 핵심 주제 제시", "소규모 그룹 토론", "참가자 자유 이동", "병렬 세션 진행"], answer: 0 },
    { id: 15, topic: 1, question: "세션 시간 배분의 일반적인 원칙은?", options: ["발표 60-70%, 질의응답 30-40%", "발표 100%, 질의응답 없음", "발표 30%, 질의응답 70%", "발표 50%, 휴식 50%"], answer: 0 },
    { id: 16, topic: 1, question: "참가자 참여형 프로그램이 아닌 것은?", options: ["워크숍", "브레인스토밍", "일방향 강연", "그룹 토론"], answer: 2 },
    { id: 17, topic: 1, question: "전시 프로그램 기획 시 고려사항이 아닌 것은?", options: ["부스 배치", "동선 계획", "참가자 식사 메뉴", "전시 품목"], answer: 2 },
    { id: 18, topic: 1, question: "네트워킹 세션의 목적은?", options: ["참가자 간 교류 촉진", "비용 절감", "발표 시간 연장", "등록 절차 간소화"], answer: 0 },
    { id: 19, topic: 1, question: "병렬 세션(Parallel Session) 운영의 장점은?", options: ["다양한 주제 동시 제공", "참가자 집중 유도", "비용 절감", "발표자 부담 감소"], answer: 0 },
    { id: 20, topic: 1, question: "오프닝 세레모니에 포함되는 내용이 아닌 것은?", options: ["개회사", "축사", "시상식", "결산 보고"], answer: 3 },

    // 예산 계획 (10문항)
    { id: 21, topic: 2, question: "컨벤션 예산의 수입 항목이 아닌 것은?", options: ["등록비", "스폰서십", "정부 보조금", "장소 임대료"], answer: 3 },
    { id: 22, topic: 2, question: "예산 편성 시 우선 고려해야 할 사항은?", options: ["행사 규모와 목적", "주최자 선호도", "과거 관행", "경쟁 행사 예산"], answer: 0 },
    { id: 23, topic: 2, question: "예비비(Contingency) 책정의 일반적인 비율은?", options: ["5-10%", "30-40%", "50% 이상", "1% 미만"], answer: 0 },
    { id: 24, topic: 2, question: "지출 항목 중 고정비에 해당하는 것은?", options: ["장소 임대료", "케이터링", "기념품", "인쇄물"], answer: 0 },
    { id: 25, topic: 2, question: "스폰서십 유형 중 가장 높은 등급에 해당하는 것은?", options: ["타이틀 스폰서", "골드 스폰서", "실버 스폰서", "일반 후원"], answer: 0 },
    { id: 26, topic: 2, question: "예산 관리의 원칙이 아닌 것은?", options: ["투명성", "효율성", "유연성", "비밀성"], answer: 3 },
    { id: 27, topic: 2, question: "등록비 책정 시 고려사항이 아닌 것은?", options: ["프로그램 가치", "참가자 지불 능력", "주최자 이익 극대화", "경쟁 행사 가격"], answer: 2 },
    { id: 28, topic: 2, question: "케이터링 예산 산정 기준은?", options: ["참가자 수 × 단가", "장소 면적", "발표자 수", "세션 수"], answer: 0 },
    { id: 29, topic: 2, question: "예산 집행 시 반드시 확보해야 할 서류는?", options: ["지출 증빙 자료", "참가자 프로필", "발표 자료", "행사 사진"], answer: 0 },
    { id: 30, topic: 2, question: "수익성 분석 지표가 아닌 것은?", options: ["손익분기점", "투자수익률", "참가자 만족도", "순이익률"], answer: 2 },

    // 운영 계획 (10문항)
    { id: 31, topic: 3, question: "행사 운영 조직의 핵심 부서가 아닌 것은?", options: ["등록팀", "프로그램팀", "인사팀", "시설팀"], answer: 2 },
    { id: 32, topic: 3, question: "등록 업무에 포함되지 않는 것은?", options: ["사전등록 관리", "현장등록", "발표 내용 검토", "명찰 발급"], answer: 2 },
    { id: 33, topic: 3, question: "행사장 동선 계획의 목적이 아닌 것은?", options: ["참가자 편의", "혼잡 방지", "비용 절감", "안전 확보"], answer: 2 },
    { id: 34, topic: 3, question: "현장 운영 시 필수 장비가 아닌 것은?", options: ["무전기", "명찰 프린터", "개인 휴대폰", "등록 시스템"], answer: 2 },
    { id: 35, topic: 3, question: "위기 대응 매뉴얼에 포함되어야 할 내용이 아닌 것은?", options: ["비상연락망", "대피 경로", "언론 대응", "케이터링 메뉴"], answer: 3 },
    { id: 36, topic: 3, question: "VIP 관리의 핵심 요소가 아닌 것은?", options: ["별도 동선", "의전 서비스", "일반 참가자 수준 대우", "전담 인력 배치"], answer: 2 },
    { id: 37, topic: 3, question: "행사 리허설의 목적이 아닌 것은?", options: ["문제점 사전 발견", "진행 순서 확인", "실제 관객 테스트", "장비 점검"], answer: 2 },
    { id: 38, topic: 3, question: "인력 배치 계획 수립 시 고려사항이 아닌 것은?", options: ["업무별 필요 인원", "교대 시간", "개인 휴가 계획", "비상 대기 인원"], answer: 2 },
    { id: 39, topic: 3, question: "행사 후 철수(Dismantling) 업무가 아닌 것은?", options: ["장비 반납", "쓰레기 처리", "다음 행사 기획", "원상복구"], answer: 2 },
    { id: 40, topic: 3, question: "참가자 만족도 조사 방법이 아닌 것은?", options: ["설문조사", "인터뷰", "재정 감사", "SNS 모니터링"], answer: 2 },

    // 홍보·마케팅 (10문항)
    { id: 41, topic: 4, question: "컨벤션 홍보 채널이 아닌 것은?", options: ["SNS", "이메일", "개인 전화", "언론 보도"], answer: 2 },
    { id: 42, topic: 4, question: "타겟 마케팅의 첫 번째 단계는?", options: ["목표 청중 정의", "홍보물 제작", "매체 구매", "효과 측정"], answer: 0 },
    { id: 43, topic: 4, question: "사전 홍보 일정으로 가장 적절한 것은?", options: ["행사 3-6개월 전", "행사 1주일 전", "행사 당일", "행사 후"], answer: 0 },
    { id: 44, topic: 4, question: "온라인 마케팅 수단이 아닌 것은?", options: ["웹사이트", "SNS 광고", "전단지 배포", "이메일 뉴스레터"], answer: 2 },
    { id: 45, topic: 4, question: "행사 브랜딩의 요소가 아닌 것은?", options: ["로고", "슬로건", "예산 내역", "컬러 시스템"], answer: 2 },
    { id: 46, topic: 4, question: "보도자료 작성 원칙이 아닌 것은?", options: ["육하원칙 준수", "핵심 내용 앞부분 배치", "주관적 의견 강조", "간결한 문장"], answer: 2 },
    { id: 47, topic: 4, question: "참가자 유치 전략이 아닌 것은?", options: ["얼리버드 할인", "그룹 등록 혜택", "높은 등록비 책정", "네트워킹 기회 강조"], answer: 2 },
    { id: 48, topic: 4, question: "SNS 마케팅의 장점이 아닌 것은?", options: ["실시간 소통", "비용 효율성", "완벽한 통제", "바이럴 효과"], answer: 2 },
    { id: 49, topic: 4, question: "마케팅 효과 측정 지표가 아닌 것은?", options: ["등록 전환율", "웹사이트 방문 수", "주최자 만족도", "SNS 도달률"], answer: 2 },
    { id: 50, topic: 4, question: "통합 마케팅 커뮤니케이션(IMC)의 핵심은?", options: ["일관된 메시지 전달", "다양한 메시지 사용", "단일 채널 활용", "비용 최소화"], answer: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention2-practical-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCorrectCount(data.correct || 0);
      setWrongCount(data.wrong || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('convention2-practical-progress', JSON.stringify({
      correct: correctCount,
      wrong: wrongCount
    }));
  }, [correctCount, wrongCount]);

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const handleAnswer = (questionId: number, selectedOption: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      if (selectedOption === question.answer) {
        setCorrectCount(prev => prev + 1);
      } else {
        setWrongCount(prev => prev + 1);
      }
      setShowAnswer(questionId);
    }
  };

  const openAIModal = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    setCorrectCount(0);
    setWrongCount(0);
    setShowAnswer(null);
    localStorage.removeItem('convention2-practical-progress');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/convention-planner-2" className="text-teal-600 hover:text-teal-800 font-medium">
            ← 컨벤션기획사2급
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 실기시험 대비</h1>
          <p className="text-gray-500">기획서 작성 실무 연습</p>
        </div>

        {/* Practical Info */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-4">📝 실기시험 안내</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">기획서 작성</p>
              <p className="text-sm text-cyan-100">시험 유형</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">2시간</p>
              <p className="text-sm text-cyan-100">시험 시간</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">60점</p>
              <p className="text-sm text-cyan-100">합격 기준</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진도</h2>
            <button onClick={resetProgress} className="text-sm text-gray-400 hover:text-red-500">초기화</button>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-gray-500">정답</p>
            </div>
            <div className="flex-1 bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{wrongCount}</p>
              <p className="text-sm text-gray-500">오답</p>
            </div>
            <div className="flex-1 bg-teal-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-teal-600">{correctCount + wrongCount}/{questions.length}</p>
              <p className="text-sm text-gray-500">진행률</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all"
              style={{ width: `${((correctCount + wrongCount) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                selectedTopic === null ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  selectedTopic === topic.id ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
                    {topics.find(t => t.id === q.topic)?.name}
                  </span>
                  <span className="text-gray-400 text-sm">#{q.id}</span>
                </div>
                <button
                  onClick={() => openAIModal(q.question)}
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                >
                  🤖 AI에게 질문
                </button>
              </div>

              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleAnswer(q.id, optIndex)}
                    disabled={showAnswer === q.id}
                    className={`p-3 rounded-xl text-left transition ${
                      showAnswer === q.id
                        ? optIndex === q.answer
                          ? 'bg-green-100 text-green-800 border-2 border-green-500'
                          : 'bg-gray-100 text-gray-500'
                        : 'bg-gray-50 hover:bg-teal-50 text-gray-700'
                    }`}
                  >
                    <span className="font-medium mr-2">{optIndex + 1}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-teal-50 rounded-xl">
                  <p className="text-teal-800 font-medium">
                    ✅ 정답: {q.answer + 1}. {q.options[q.answer]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Writing Tips */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 기획서 작성 팁</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-teal-50 rounded-xl p-4">
              <h3 className="font-bold text-teal-700 mb-2">✅ 필수 포함 항목</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 행사 개요 (명칭, 일시, 장소)</li>
                <li>• 목적 및 기대효과</li>
                <li>• 프로그램 일정표</li>
                <li>• 예산 계획</li>
                <li>• 운영 조직</li>
                <li>• 홍보 계획</li>
              </ul>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4">
              <h3 className="font-bold text-cyan-700 mb-2">💡 작성 요령</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 구체적인 수치 사용</li>
                <li>• 시간 배분 계획 (2시간 내 완성)</li>
                <li>• 빠짐없이 모든 항목 작성</li>
                <li>• 깔끔한 표 형식 활용</li>
                <li>• 실현 가능한 계획 수립</li>
                <li>• 논리적 일관성 유지</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-6 p-4 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-purple-600 text-white rounded-xl text-center font-medium hover:bg-purple-700 transition"
              >
                Claude에게 질문하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-green-600 text-white rounded-xl text-center font-medium hover:bg-green-700 transition"
              >
                ChatGPT에게 질문하기
              </a>
              <a
                href={`https://gemini.google.com/app?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-blue-600 text-white rounded-xl text-center font-medium hover:bg-blue-700 transition"
              >
                Gemini에게 질문하기
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="mt-4 w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
