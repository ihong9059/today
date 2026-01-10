'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JPTExamPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const examParts = [
    {
      title: "Part 1: 사진 묘사 (20문항)",
      content: `출제 유형:
• 사진을 보고 가장 적절한 설명 선택
• 사람의 동작, 상태, 위치 묘사
• 사물/장소의 특징 묘사

청해 전략:
• 사진을 미리 보고 핵심 요소 파악
• 동사, 위치 표현에 집중
• 비슷한 발음 주의 (예: いる/いく)

주요 표현:
• ~ています (진행/상태)
• ~の上/下/横/前/後ろに
• ~が見えます/~があります`
    },
    {
      title: "Part 2: 질의응답 (30문항)",
      content: `출제 유형:
• 짧은 질문에 적절한 응답 선택
• 일상 대화, 비즈니스 상황
• 의문사(언제, 어디서, 누가 등) 질문

청해 전략:
• 질문의 첫 단어(의문사) 집중
• 시제 확인 (과거/현재/미래)
• 높임말 사용 여부 파악

자주 나오는 패턴:
• いつ/どこで/だれが + ~ますか
• ~てもいいですか (허락 요청)
• ~ませんか (권유)`
    },
    {
      title: "Part 3: 회화문 (30문항)",
      content: `출제 유형:
• 2~3인의 대화를 듣고 질문에 답
• 대화 내용, 화자의 의도 파악
• 다음에 할 일, 장소, 시간 등

청해 전략:
• 화자 구분하기 (남/여, 직위)
• 마지막 발언에 주목
• 부정 표현 놓치지 않기

주의 포인트:
• ~することになりました (결정)
• ~かもしれません (추측)
• でも/しかし (역접)`
    },
    {
      title: "Part 4: 설명문 (20문항)",
      content: `출제 유형:
• 긴 담화를 듣고 내용 파악
• 안내 방송, 일기예보, 뉴스 등
• 세부 정보 및 요지 파악

청해 전략:
• 메모하며 듣기 (숫자, 시간)
• 전체 흐름 파악 후 세부 확인
• 강조 표현에 주목

자주 나오는 유형:
• 교통 안내 (전철, 버스)
• 일정/이벤트 안내
• 날씨/뉴스 보도`
    },
    {
      title: "Part 5: 문자/어휘 (20문항)",
      content: `출제 유형:
• 한자 읽기 (음독/훈독)
• 적절한 어휘 선택
• 유의어/반의어 구분

독해 전략:
• 한자는 문맥과 함께 학습
• 자주 나오는 한자 500자 암기
• 동음이의어 구분

빈출 한자:
• 会社(かいしゃ), 仕事(しごと)
• 電話(でんわ), 時間(じかん)
• 来週(らいしゅう), 今日(きょう)`
    },
    {
      title: "Part 6: 문법 (30문항)",
      content: `출제 유형:
• 빈칸에 적절한 문법 형태 선택
• 조사, 접속사, 활용형 문제
• 경어 표현

독해 전략:
• 문장 전체 의미 파악 후 선택
• 앞뒤 문맥 확인
• 시제 일치 주의

핵심 문법:
• 조사: は/が/を/に/で/と
• 활용: て形, た形, ない形
• 접속: ~たら/~ば/~と/~なら`
    },
    {
      title: "Part 7: 독해 (30문항)",
      content: `출제 유형:
• 단문/중문 읽고 내용 이해
• 주제, 요지, 세부 정보 파악
• 지시어가 가리키는 대상 찾기

독해 전략:
• 질문 먼저 읽고 본문 읽기
• 키워드 중심 빠르게 훑기
• 접속사로 논리 흐름 파악

시간 배분:
• 단문: 1~2분
• 중문: 3~4분
• 복잡한 문제는 나중에`
    },
    {
      title: "Part 8: 오문정정 (20문항)",
      content: `출제 유형:
• 밑줄 친 부분 중 틀린 곳 찾기
• 문법, 어휘, 표기 오류 판별
• 4개 중 1개 오류 선택

독해 전략:
• 각 밑줄 부분 하나씩 검토
• 조사, 활용, 어순 확인
• 틀린 것이 없으면 '없음' 선택

자주 나오는 오류:
• 조사 오용 (に/で/を)
• 활용형 오류
• 한자 읽기 오류`
    }
  ];

  const scoreTable = [
    { score: '900~990', level: '최상급', jlpt: 'N1 상위', desc: '완벽한 일본어 구사' },
    { score: '800~895', level: '상급', jlpt: 'N1', desc: '비즈니스 일본어 능숙' },
    { score: '700~795', level: '중상급', jlpt: 'N2', desc: '업무 의사소통 가능' },
    { score: '600~695', level: '중급', jlpt: 'N2~N3', desc: '일상 의사소통 가능' },
    { score: '500~595', level: '중하급', jlpt: 'N3', desc: '기본 의사소통 가능' },
    { score: '400~495', level: '하급', jlpt: 'N4', desc: '간단한 표현 이해' },
    { score: '~395', level: '초급', jlpt: 'N5', desc: '기초 학습 필요' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/jpt" className="text-pink-600 hover:text-pink-800 flex items-center gap-2">
            <span>←</span>
            <span>JPT으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">JPT 시험 안내</h1>
          <p className="text-gray-600">파트별 분석 및 점수 체계</p>
        </div>

        <div className="grid md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-sm text-gray-500">총 문항</div>
            <div className="font-bold text-pink-600">200문항</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-500">시험 시간</div>
            <div className="font-bold text-pink-600">약 100분</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-sm text-gray-500">만점</div>
            <div className="font-bold text-pink-600">990점</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-sm text-gray-500">시행 횟수</div>
            <div className="font-bold text-pink-600">연 12회</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-4">
            <h2 className="text-xl font-bold text-white">📋 파트별 상세 분석</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {examParts.map((part, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-pink-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{part.title}</span>
                  <span className={`transform transition-transform ${openSection === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openSection === index && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-line text-sm">
                      {part.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-4">
            <h2 className="text-xl font-bold text-white">📊 점수 환산표 (JPT ↔ JLPT)</h2>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 text-gray-700">JPT 점수</th>
                  <th className="text-left py-3 px-2 text-gray-700">수준</th>
                  <th className="text-left py-3 px-2 text-gray-700">JLPT 환산</th>
                  <th className="text-left py-3 px-2 text-gray-700">능력</th>
                </tr>
              </thead>
              <tbody>
                {scoreTable.map((item, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index < 3 ? 'bg-pink-50' : ''}`}>
                    <td className="py-3 px-2 font-semibold text-pink-700">{item.score}</td>
                    <td className="py-3 px-2 text-gray-700">{item.level}</td>
                    <td className="py-3 px-2 text-gray-700">{item.jlpt}</td>
                    <td className="py-3 px-2 text-gray-600 text-sm">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>✅</span> JPT 장점
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 매월 시험으로 빠른 취득 가능</li>
              <li>• TOEIC과 유사한 형식으로 익숙함</li>
              <li>• 세밀한 점수로 실력 파악 용이</li>
              <li>• 결과 발표가 빠름 (2주 이내)</li>
              <li>• 기업에서 JLPT와 동등 인정</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📅</span> 시험 일정
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>시행</span>
                <span className="font-semibold">매월 1회</span>
              </li>
              <li className="flex justify-between">
                <span>접수</span>
                <span className="font-semibold">시험 3~4주 전</span>
              </li>
              <li className="flex justify-between">
                <span>결과</span>
                <span className="font-semibold">시험 후 2주</span>
              </li>
              <li className="flex justify-between">
                <span>응시료</span>
                <span className="font-semibold">44,000원</span>
              </li>
              <li className="flex justify-between">
                <span>유효기간</span>
                <span className="font-semibold">2년</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
          <h3 className="font-bold text-pink-800 mb-3">💡 시험 당일 체크리스트</h3>
          <ul className="space-y-2 text-pink-700 text-sm">
            <li>• 신분증, 수험표 필수 지참</li>
            <li>• 연필, 지우개 준비 (컴퓨터용 사인펜 불가)</li>
            <li>• 시험 30분 전까지 입실</li>
            <li>• 청해 먼저 진행 → 독해 순서</li>
            <li>• OMR 마킹 시간 여유있게 확보</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
