'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TOPIKExamPage() {
  const [selectedExam, setSelectedExam] = useState('II');

  const examInfo = {
    'I': {
      name: 'TOPIK I',
      levels: '1~2급',
      description: '초급 수준 평가',
      listening: { questions: 30, time: 40 },
      reading: { questions: 40, time: 60 },
      writing: null,
      totalTime: 100,
      totalScore: 200,
      grades: [
        { level: '1급', minScore: 80, maxScore: 139 },
        { level: '2급', minScore: 140, maxScore: 200 },
      ]
    },
    'II': {
      name: 'TOPIK II',
      levels: '3~6급',
      description: '중·고급 수준 평가',
      listening: { questions: 50, time: 60 },
      reading: { questions: 50, time: 70 },
      writing: { questions: 4, time: 50 },
      totalTime: 180,
      totalScore: 300,
      grades: [
        { level: '3급', minScore: 120, maxScore: 149 },
        { level: '4급', minScore: 150, maxScore: 189 },
        { level: '5급', minScore: 190, maxScore: 229 },
        { level: '6급', minScore: 230, maxScore: 300 },
      ]
    }
  };

  const currentExam = examInfo[selectedExam as keyof typeof examInfo];

  const feeInfo = [
    { type: '국내 응시', fee: '40,000원' },
    { type: '해외 응시', fee: '40~50 USD (지역별 상이)' },
  ];

  const scheduleInfo = [
    { round: '제89회', month: '1월', registration: '11월' },
    { round: '제90회', month: '4월', registration: '2월' },
    { round: '제91회', month: '5월', registration: '3월' },
    { round: '제92회', month: '7월', registration: '5월' },
    { round: '제93회', month: '10월', registration: '8월' },
    { round: '제94회', month: '11월', registration: '9월' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/topik" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <span>←</span>
            <span>TOPIK으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">TOPIK 시험 상세 정보</h1>
          <p className="text-gray-600">한국어능력시험 구성 및 등급</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">시험 유형 선택</h2>
          <div className="grid grid-cols-2 gap-4">
            {['I', 'II'].map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`py-4 rounded-lg font-bold transition-all ${
                  selectedExam === exam
                    ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                }`}
              >
                <div>TOPIK {exam}</div>
                <div className="text-sm font-normal opacity-80">
                  {exam === 'I' ? '초급 (1~2급)' : '중·고급 (3~6급)'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{currentExam.name} 시험 구성</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {currentExam.levels}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{currentExam.description}</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎧</span>
                <span className="font-bold text-gray-800">듣기</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>{currentExam.listening.questions}문항</p>
                <p>{currentExam.listening.time}분</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📖</span>
                <span className="font-bold text-gray-800">읽기</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>{currentExam.reading.questions}문항</p>
                <p>{currentExam.reading.time}분</p>
              </div>
            </div>
            <div className={`rounded-xl p-4 ${currentExam.writing ? 'bg-orange-50' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✍️</span>
                <span className="font-bold text-gray-800">쓰기</span>
              </div>
              <div className="text-sm text-gray-600">
                {currentExam.writing ? (
                  <>
                    <p>{currentExam.writing.questions}문항</p>
                    <p>{currentExam.writing.time}분</p>
                  </>
                ) : (
                  <p className="text-gray-400">TOPIK I 해당없음</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{currentExam.totalTime}분</p>
              <p className="text-sm text-gray-600">총 시험시간</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{currentExam.totalScore}점</p>
              <p className="text-sm text-gray-600">총점</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg col-span-2 md:col-span-1">
              <p className="text-2xl font-bold text-red-600">2년</p>
              <p className="text-sm text-gray-600">유효 기간</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📊 등급별 점수 기준</h2>
          <div className="space-y-3">
            {currentExam.grades.map((grade) => (
              <div key={grade.level} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <span className="w-16 text-center font-bold text-lg bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                  {grade.level}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-red-400 h-4 rounded-full"
                    style={{ width: `${(grade.maxScore / currentExam.totalScore) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-24 text-right">
                  {grade.minScore}~{grade.maxScore}점
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">💰 응시료</h2>
            <div className="space-y-3">
              {feeInfo.map((item) => (
                <div key={item.type} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">{item.type}</span>
                  <span className="font-medium text-blue-600">{item.fee}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📅 시험 일정 (연 6회)</h2>
            <div className="space-y-2">
              {scheduleInfo.slice(0, 4).map((item) => (
                <div key={item.round} className="flex items-center gap-2 py-1">
                  <span className="w-16 text-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {item.round}
                  </span>
                  <span className="text-sm text-gray-600">{item.month} 시험</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📊 TOPIK I vs TOPIK II 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-red-50">
                  <th className="py-2 px-3 text-left text-gray-800">구분</th>
                  <th className="py-2 px-3 text-center text-blue-700">TOPIK I</th>
                  <th className="py-2 px-3 text-center text-red-700">TOPIK II</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium">대상 등급</td>
                  <td className="py-2 px-3 text-center">1~2급</td>
                  <td className="py-2 px-3 text-center">3~6급</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium">시험 영역</td>
                  <td className="py-2 px-3 text-center">듣기, 읽기</td>
                  <td className="py-2 px-3 text-center">듣기, 쓰기, 읽기</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium">시험 시간</td>
                  <td className="py-2 px-3 text-center">100분</td>
                  <td className="py-2 px-3 text-center">180분</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium">총점</td>
                  <td className="py-2 px-3 text-center">200점</td>
                  <td className="py-2 px-3 text-center">300점</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">문항 수</td>
                  <td className="py-2 px-3 text-center">70문항</td>
                  <td className="py-2 px-3 text-center">104문항</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">📌 TOPIK 시험 안내</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• <strong>시험 주관</strong>: 국립국제교육원 (NIIED)</li>
            <li>• <strong>성적 유효 기간</strong>: 성적 발표일로부터 2년</li>
            <li>• <strong>성적 발표</strong>: 시험일로부터 약 5~6주 후</li>
            <li>• <strong>IBT 시험</strong>: 일부 국가에서 컴퓨터 기반 시험 시행</li>
            <li>• <strong>시험 장소</strong>: 전 세계 90개국 이상에서 시행</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
