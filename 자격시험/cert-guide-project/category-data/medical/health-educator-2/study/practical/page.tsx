'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PracticalPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const topics = [
    {
      title: '보건교육 프로그램 기획',
      content: [
        '요구도 사정: 대상자의 건강문제 및 교육 필요성 파악',
        '목표 설정: 일반목표, 구체적 목표, 학습목표 설정',
        '내용 선정: 우선순위에 따른 교육내용 구성',
        '방법 선정: 대상자 특성에 맞는 교육방법 선택',
        '교육매체 개발: 시청각 자료, 인쇄물, 온라인 콘텐츠',
      ],
    },
    {
      title: '보건교육 프로그램 실행',
      content: [
        '사전준비: 장소, 교육자료, 기자재 점검',
        '도입: 학습동기 유발, 학습목표 제시',
        '전개: 주요 내용 전달, 학습활동 진행',
        '정리: 요약, 질의응답, 과제 제시',
        '실습 지도: 시범, 실습, 피드백',
      ],
    },
    {
      title: '보건교육 프로그램 평가',
      content: [
        '평가 계획: 평가목적, 시기, 방법, 도구 선정',
        '과정평가: 계획대비 실행과정 적절성',
        '영향평가: 지식, 태도, 기술 변화 측정',
        '결과평가: 행동변화, 건강상태 개선',
        '평가 보고서: 결과 분석 및 개선방안 제시',
      ],
    },
    {
      title: '교육매체 개발 및 활용',
      content: [
        '인쇄매체: 리플릿, 포스터, 책자 제작',
        '시청각매체: PPT, 동영상, 오디오 제작',
        '전시매체: 모형, 실물, 게시판 활용',
        '온라인매체: 웹사이트, 앱, SNS 활용',
        '매체 선정 원칙: 적합성, 경제성, 효과성',
      ],
    },
    {
      title: '교육방법의 실제',
      content: [
        '강의법: 많은 인원에게 정보 전달',
        '토론법: 참여자 간 의견 교환',
        '시범법: 기술과 절차 시연',
        '역할극: 상황 이해 및 태도 변화',
        '브레인스토밍: 창의적 아이디어 도출',
      ],
    },
    {
      title: '실기시험 대비',
      content: [
        '프로그램 기획서 작성: 배경, 목적, 목표, 내용, 방법',
        '교육안 작성: 시간별 학습활동, 교육방법, 매체',
        '평가계획서 작성: 평가목적, 지표, 도구, 시기',
        '사례 분석: 문제 파악, 원인 분석, 해결방안',
        '시간 관리: 60분 내 완성도 높은 답안 작성',
      ],
    },
  ];

  const questions = [
    {
      question: '보건교육 프로그램 기획 시 첫 단계는?',
      options: ['목표 설정', '요구도 사정', '방법 선정', '평가 계획'],
      correctAnswer: 1,
      explanation: '프로그램 기획은 대상자의 요구도 사정부터 시작합니다.',
    },
    {
      question: '많은 인원에게 정보를 전달하기에 적합한 교육방법은?',
      options: ['토론법', '강의법', '역할극', '시범법'],
      correctAnswer: 1,
      explanation: '강의법은 많은 인원에게 효율적으로 정보를 전달할 수 있는 방법입니다.',
    },
    {
      question: '보건교육 프로그램의 지식, 태도, 기술 변화를 측정하는 평가는?',
      options: ['과정평가', '영향평가', '결과평가', '형성평가'],
      correctAnswer: 1,
      explanation: '영향평가는 교육을 통한 지식, 태도, 기술의 변화를 측정합니다.',
    },
    {
      question: '기술과 절차를 시연하여 보여주는 교육방법은?',
      options: ['강의법', '토론법', '시범법', '브레인스토밍'],
      correctAnswer: 2,
      explanation: '시범법은 특정 기술이나 절차를 직접 시연하여 보여주는 방법입니다.',
    },
    {
      question: '교육매체 선정 원칙이 아닌 것은?',
      options: ['적합성', '경제성', '효과성', '독창성'],
      correctAnswer: 3,
      explanation: '교육매체 선정 시 적합성, 경제성, 효과성을 고려합니다.',
    },
  ];

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswer({
      ...selectedAnswer,
      [questionIndex]: answerIndex,
    });
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswer[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/자격시험/medical/health-educator-2"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← 보건교육사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold text-red-600">실기 (프로그램 기획 및 평가)</h1>
        </div>

        {/* 과목 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/자격시험/medical/health-educator-2/study/health-education-intro"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              보건교육학개론
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/health-communication"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              보건의사소통
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/health-behavior"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              건강행동이론
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/community-health"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              지역사회보건
            </Link>
            <Link
              href="/자격시험/medical/health-educator-2/study/practical"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              실기
            </Link>
          </div>
        </div>

        {/* 실기시험 안내 */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3 text-yellow-800">실기시험 안내</h2>
          <ul className="space-y-2 text-yellow-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>시험시간: 60분</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>문제유형: 보건교육 프로그램 기획서 작성, 사례분석 등</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>평가요소: 타당성, 적절성, 실현가능성, 창의성</span>
            </li>
          </ul>
        </div>

        {/* 학습 내용 */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">핵심 내용</h2>
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-red-600">{topic.title}</h3>
              <ul className="space-y-2">
                {topic.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 프로그램 기획서 예시 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">프로그램 기획서 예시</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">1. 프로그램명</h3>
            <p className="text-gray-600 mb-4">중년 여성을 위한 골다공증 예방 교육</p>

            <h3 className="font-semibold mb-2 text-gray-800">2. 배경 및 필요성</h3>
            <p className="text-gray-600 mb-4">
              중년 여성의 골다공증 유병률 증가, 조기 예방의 중요성
            </p>

            <h3 className="font-semibold mb-2 text-gray-800">3. 목적</h3>
            <p className="text-gray-600 mb-4">
              중년 여성의 골다공증 예방 행동 실천율 향상
            </p>

            <h3 className="font-semibold mb-2 text-gray-800">4. 목표</h3>
            <p className="text-gray-600 mb-4">
              - 골다공증 관련 지식 80% 이상 정답률<br />
              - 칼슘 섭취 실천율 50% 이상 증가<br />
              - 운동 실천율 40% 이상 증가
            </p>

            <h3 className="font-semibold mb-2 text-gray-800">5. 교육내용</h3>
            <p className="text-gray-600 mb-4">
              골다공증의 이해, 위험요인, 칼슘 섭취, 운동법
            </p>

            <h3 className="font-semibold mb-2 text-gray-800">6. 교육방법</h3>
            <p className="text-gray-600 mb-4">
              강의, 시범, 실습, 소그룹 토론
            </p>

            <h3 className="font-semibold mb-2 text-gray-800">7. 평가</h3>
            <p className="text-gray-600">
              사전-사후 지식평가, 행동변화 설문조사
            </p>
          </div>
        </div>

        {/* 연습 문제 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">연습 문제</h2>
          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="border-b border-gray-200 pb-6 last:border-b-0">
                <p className="font-semibold mb-3 text-gray-800">
                  {qIndex + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedAnswer[qIndex] === oIndex
                          ? 'bg-red-50 border-2 border-red-500'
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      } ${
                        showResults
                          ? oIndex === q.correctAnswer
                            ? 'bg-green-100 border-green-500'
                            : selectedAnswer[qIndex] === oIndex
                            ? 'bg-red-100 border-red-500'
                            : ''
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={selectedAnswer[qIndex] === oIndex}
                        onChange={() => handleAnswerSelect(qIndex, oIndex)}
                        disabled={showResults}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {showResults && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-900">
                      <strong>해설:</strong> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showResults ? (
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              제출하기
            </button>
          ) : (
            <div className="mt-6 p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-2">결과</h3>
              <p className="text-2xl font-bold">
                {calculateScore()} / {questions.length} 정답
              </p>
              <p className="mt-2">
                정답률: {((calculateScore() / questions.length) * 100).toFixed(0)}%
              </p>
            </div>
          )}
        </div>

        {/* 학습 팁 */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 text-blue-800">학습 팁</h2>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>다양한 사례를 바탕으로 프로그램 기획 연습하기</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>시간 내 완성할 수 있도록 반복 연습하기</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>논리적이고 체계적인 서술 능력 기르기</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>실제 보건교육 프로그램 사례 분석하기</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
