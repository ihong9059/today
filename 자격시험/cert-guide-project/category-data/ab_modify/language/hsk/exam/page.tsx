'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HSKExamPage() {
  const [selectedLevel, setSelectedLevel] = useState('4');

  const examInfo = {
    '1': {
      listening: { questions: 20, time: 15 },
      reading: { questions: 20, time: 17 },
      writing: null,
      totalTime: 40,
      totalScore: 200,
      passScore: 120,
      vocabulary: 150,
      cefr: 'A1',
      description: '기초 일상 회화 수준'
    },
    '2': {
      listening: { questions: 35, time: 25 },
      reading: { questions: 25, time: 22 },
      writing: null,
      totalTime: 55,
      totalScore: 200,
      passScore: 120,
      vocabulary: 300,
      cefr: 'A2',
      description: '간단한 일상 의사소통 수준'
    },
    '3': {
      listening: { questions: 40, time: 35 },
      reading: { questions: 30, time: 30 },
      writing: { questions: 10, time: 15 },
      totalTime: 90,
      totalScore: 300,
      passScore: 180,
      vocabulary: 600,
      cefr: 'B1',
      description: '일상/학습/업무 기본 소통'
    },
    '4': {
      listening: { questions: 45, time: 30 },
      reading: { questions: 40, time: 40 },
      writing: { questions: 15, time: 25 },
      totalTime: 105,
      totalScore: 300,
      passScore: 180,
      vocabulary: 1200,
      cefr: 'B2',
      description: '다양한 분야 토론 가능'
    },
    '5': {
      listening: { questions: 45, time: 30 },
      reading: { questions: 45, time: 45 },
      writing: { questions: 10, time: 40 },
      totalTime: 125,
      totalScore: 300,
      passScore: 180,
      vocabulary: 2500,
      cefr: 'C1',
      description: '신문/영화 이해, 연설 가능'
    },
    '6': {
      listening: { questions: 50, time: 35 },
      reading: { questions: 50, time: 50 },
      writing: { questions: 1, time: 45 },
      totalTime: 140,
      totalScore: 300,
      passScore: 180,
      vocabulary: 5000,
      cefr: 'C2',
      description: '원어민 수준 이해 및 표현'
    }
  };

  const currentExam = examInfo[selectedLevel as keyof typeof examInfo];

  const feeInfo = [
    { level: '1급', fee: '60,000원' },
    { level: '2급', fee: '70,000원' },
    { level: '3급', fee: '80,000원' },
    { level: '4급', fee: '90,000원' },
    { level: '5급', fee: '100,000원' },
    { level: '6급', fee: '110,000원' },
  ];

  const scheduleInfo = [
    { month: '1월', date: '둘째 주 일요일' },
    { month: '3월', date: '둘째 주 일요일' },
    { month: '4월', date: '둘째 주 일요일' },
    { month: '5월', date: '둘째 주 일요일' },
    { month: '6월', date: '둘째 주 일요일' },
    { month: '7월', date: '둘째 주 일요일' },
    { month: '9월', date: '둘째 주 일요일' },
    { month: '10월', date: '둘째 주 일요일' },
    { month: '11월', date: '둘째 주 일요일' },
    { month: '12월', date: '둘째 주 일요일' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/hsk" className="text-red-600 hover:text-red-800 flex items-center gap-2">
            <span>←</span>
            <span>HSK로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">HSK 시험 상세 정보</h1>
          <p className="text-gray-600">汉语水平考试 등급별 구성</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">등급 선택</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {['1', '2', '3', '4', '5', '6'].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`py-3 rounded-lg font-bold transition-all ${
                  selectedLevel === level
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                }`}
              >
                {level}급
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">HSK {selectedLevel}급 시험 구성</h2>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
              CEFR {currentExam.cefr}
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
                <span className="font-bold text-gray-800">독해</span>
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
                  <p className="text-gray-400">해당 없음</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{currentExam.totalTime}분</p>
              <p className="text-sm text-gray-600">총 시험시간</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{currentExam.totalScore}점</p>
              <p className="text-sm text-gray-600">총점</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{currentExam.passScore}점</p>
              <p className="text-sm text-gray-600">합격 기준</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{currentExam.vocabulary}+</p>
              <p className="text-sm text-gray-600">필수 어휘</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">💰 응시료</h2>
            <div className="space-y-2">
              {feeInfo.map((item) => (
                <div key={item.level} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">{item.level}</span>
                  <span className="font-medium text-red-600">{item.fee}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">📅 시험 일정 (연 10회)</h2>
            <div className="grid grid-cols-2 gap-2">
              {scheduleInfo.map((item) => (
                <div key={item.month} className="flex items-center gap-2 py-1">
                  <span className="w-12 text-center px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-medium">
                    {item.month}
                  </span>
                  <span className="text-sm text-gray-600">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📊 등급별 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-red-50">
                  <th className="py-2 px-3 text-left text-red-800">등급</th>
                  <th className="py-2 px-3 text-center text-red-800">어휘</th>
                  <th className="py-2 px-3 text-center text-red-800">CEFR</th>
                  <th className="py-2 px-3 text-center text-red-800">시간</th>
                  <th className="py-2 px-3 text-center text-red-800">합격</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(examInfo).map(([level, info]) => (
                  <tr key={level} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium">HSK {level}급</td>
                    <td className="py-2 px-3 text-center">{info.vocabulary}</td>
                    <td className="py-2 px-3 text-center">{info.cefr}</td>
                    <td className="py-2 px-3 text-center">{info.totalTime}분</td>
                    <td className="py-2 px-3 text-center">{info.passScore}/{info.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">📌 HSK 시험 안내</h3>
          <ul className="space-y-2 text-red-700 text-sm">
            <li>• <strong>시험 주관</strong>: 중국 교육부 한판(汉办)</li>
            <li>• <strong>유효 기간</strong>: 성적표 발급일로부터 2년</li>
            <li>• <strong>IBT 시험</strong>: 인터넷 기반 시험도 선택 가능</li>
            <li>• <strong>HSKK</strong>: 말하기 시험 별도 응시 (초급/중급/고급)</li>
            <li>• <strong>성적 발표</strong>: 시험일로부터 약 1개월 후</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
