'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JLPTExamPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const examParts = [
    {
      title: "N1 (최상급)",
      content: `인정 기준:
• 폭넓은 장면에서 사용되는 일본어 이해 가능
• 신문 사설, 평론 등 논리적 복잡한 문장 이해
• 다양한 화제의 내용을 파악하고 의도 이해

시험 구성:
언어지식(문자·어휘·문법) + 독해: 110분
• 문자·어휘: 한자 읽기, 문맥 규정, 유의어, 용법
• 문법: 문법 형식 판단, 문장 구성, 문맥 문법
• 독해: 내용 이해(단문/중문/장문), 주장 이해, 정보 검색

청해: 60분
• 과제 이해, 포인트 이해, 개요 이해
• 즉시 응답, 통합 이해

득점 범위: 0~180점 (각 영역 0~60점)
합격 기준: 총점 100점 이상 + 각 영역 19점 이상`
    },
    {
      title: "N2 (상급)",
      content: `인정 기준:
• 일상적인 장면에서 사용되는 일본어 이해 가능
• 신문/잡지의 기사나 해설을 읽고 이해 가능
• 자연스러운 속도의 회화/뉴스를 듣고 이해 가능

시험 구성:
언어지식(문자·어휘·문법) + 독해: 105분
• 문자·어휘: 한자 읽기, 표기, 어형 형성, 문맥 규정, 용법
• 문법: 문법 형식 판단, 문장 구성, 문맥 문법
• 독해: 내용 이해(단문/중문), 주장 이해, 정보 검색

청해: 50분
• 과제 이해, 포인트 이해, 개요 이해
• 즉시 응답, 통합 이해

득점 범위: 0~180점 (각 영역 0~60점)
합격 기준: 총점 90점 이상 + 각 영역 19점 이상`
    },
    {
      title: "N3 (중급)",
      content: `인정 기준:
• 일상적인 장면에서 사용되는 일본어를 어느 정도 이해
• 일상적 화제의 글을 읽고 요지 파악 가능
• 자연스러운 속도보다 조금 느린 회화 이해 가능

시험 구성:
언어지식(문자·어휘): 30분
언어지식(문법) + 독해: 70분
청해: 40분

득점 범위: 0~180점 (각 영역 0~60점)
합격 기준: 총점 95점 이상 + 각 영역 19점 이상`
    },
    {
      title: "N4 (초중급)",
      content: `인정 기준:
• 기본적인 일본어를 이해할 수 있다
• 기본적인 어휘와 한자로 쓰여진 문장 이해 가능
• 일상적인 장면에서 천천히 말하는 회화 이해 가능

시험 구성:
언어지식(문자·어휘): 25분
언어지식(문법) + 독해: 55분
청해: 35분

득점 범위: 0~180점 (각 영역 0~60점)
합격 기준: 총점 90점 이상 + 각 영역 19점 이상`
    },
    {
      title: "N5 (초급)",
      content: `인정 기준:
• 기본적인 일본어를 어느 정도 이해할 수 있다
• 히라가나, 카타카나, 기본 한자로 쓰여진 문장 이해
• 교실이나 일상에서 자주 접하는 간단한 회화 이해

시험 구성:
언어지식(문자·어휘): 20분
언어지식(문법) + 독해: 40분
청해: 30분

득점 범위: 0~180점 (각 영역 0~60점)
합격 기준: 총점 80점 이상 + 각 영역 19점 이상`
    },
    {
      title: "시험 일정 및 접수",
      content: `시험 일정:
• 제1회: 7월 첫째 주 일요일
• 제2회: 12월 첫째 주 일요일
• 접수: 시험 약 3개월 전부터 (선착순)

시험 시간표:
• 오전: N4, N5 (약 2시간)
• 오후: N1, N2, N3 (약 2~3시간)

응시료: 50,000원

접수 방법:
• 인터넷 접수: www.jlpt.or.kr
• 방문 접수: 전국 접수처

준비물:
• 신분증 (주민등록증, 운전면허증, 여권)
• 수험표 (시험 전 출력)
• 연필, 지우개 (OMR 카드 사용)

결과 발표: 시험 후 약 2개월 후
성적표 발송: 결과 발표 후 약 2주`
    }
  ];

  const levelComparison = [
    { level: 'N1', vocab: '10,000+', kanji: '2,000+', time: '170분', reading: '상', listening: '상' },
    { level: 'N2', vocab: '6,000+', kanji: '1,000+', time: '155분', reading: '중상', listening: '중상' },
    { level: 'N3', vocab: '3,500+', kanji: '650+', time: '140분', reading: '중', listening: '중' },
    { level: 'N4', vocab: '1,500+', kanji: '300+', time: '125분', reading: '중하', listening: '중하' },
    { level: 'N5', vocab: '800+', kanji: '100+', time: '105분', reading: '하', listening: '하' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/jlpt" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            <span>←</span>
            <span>JLPT으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">JLPT 시험 안내</h1>
          <p className="text-gray-600">레벨별 시험 구조 및 합격 기준</p>
        </div>

        <div className="grid md:grid-cols-5 gap-3 mb-8">
          {['N1', 'N2', 'N3', 'N4', 'N5'].map((level, idx) => (
            <div key={level} className="bg-white p-4 rounded-xl shadow-md text-center">
              <div className={`text-2xl font-bold mb-1 ${idx === 0 ? 'text-rose-700' : idx === 1 ? 'text-rose-600' : idx === 2 ? 'text-rose-500' : idx === 3 ? 'text-rose-400' : 'text-rose-300'}`}>
                {level}
              </div>
              <div className="text-xs text-gray-500">
                {idx === 0 ? '최상급' : idx === 1 ? '상급' : idx === 2 ? '중급' : idx === 3 ? '초중급' : '초급'}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-rose-500 to-red-600 p-4">
            <h2 className="text-xl font-bold text-white">📋 레벨별 상세 정보</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {examParts.map((part, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-rose-50 transition-colors"
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
          <div className="bg-gradient-to-r from-red-500 to-rose-600 p-4">
            <h2 className="text-xl font-bold text-white">📊 레벨 비교표</h2>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 text-gray-700">레벨</th>
                  <th className="text-left py-3 px-2 text-gray-700">어휘</th>
                  <th className="text-left py-3 px-2 text-gray-700">한자</th>
                  <th className="text-left py-3 px-2 text-gray-700">시간</th>
                  <th className="text-left py-3 px-2 text-gray-700">독해</th>
                  <th className="text-left py-3 px-2 text-gray-700">청해</th>
                </tr>
              </thead>
              <tbody>
                {levelComparison.map((item, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index < 2 ? 'bg-rose-50' : ''}`}>
                    <td className="py-3 px-2 font-semibold text-rose-700">{item.level}</td>
                    <td className="py-3 px-2 text-gray-700">{item.vocab}</td>
                    <td className="py-3 px-2 text-gray-700">{item.kanji}</td>
                    <td className="py-3 px-2 text-gray-700">{item.time}</td>
                    <td className="py-3 px-2 text-gray-600">{item.reading}</td>
                    <td className="py-3 px-2 text-gray-600">{item.listening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📈</span> 학습 기간 가이드
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>N5 (완전 초보자)</span>
                <span className="font-semibold">약 3~4개월</span>
              </li>
              <li className="flex justify-between">
                <span>N4 (N5 취득 후)</span>
                <span className="font-semibold">약 4~6개월</span>
              </li>
              <li className="flex justify-between">
                <span>N3 (N4 취득 후)</span>
                <span className="font-semibold">약 6~8개월</span>
              </li>
              <li className="flex justify-between">
                <span>N2 (N3 취득 후)</span>
                <span className="font-semibold">약 8~12개월</span>
              </li>
              <li className="flex justify-between">
                <span>N1 (N2 취득 후)</span>
                <span className="font-semibold">약 12개월+</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🎯</span> 활용 가이드
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>일본 취업 비자</strong>: N1 또는 N2 필요</li>
              <li>• <strong>일본 대학 입학</strong>: N2 이상 권장</li>
              <li>• <strong>일본 전문학교</strong>: N2~N3</li>
              <li>• <strong>워킹홀리데이</strong>: N3 이상 추천</li>
              <li>• <strong>일본 여행/생활</strong>: N4~N5</li>
            </ul>
          </div>
        </div>

        <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
          <h3 className="font-bold text-rose-800 mb-3">💡 시험 당일 체크리스트</h3>
          <ul className="space-y-2 text-rose-700 text-sm">
            <li>• 수험표 출력 및 신분증 필수 지참</li>
            <li>• 시험 시작 30분 전까지 입실 완료</li>
            <li>• 연필(샤프 불가)과 지우개 준비</li>
            <li>• 청해 시험 시 이어폰/헤드폰 사용 불가 (스피커 방송)</li>
            <li>• 시계는 아날로그 시계만 허용 (디지털/스마트워치 불가)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
