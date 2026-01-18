"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClinicalPsychologist2ExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  const writtenSubjects = [
    {
      name: "심리학개론",
      questions: 20,
      time: 30,
      topics: ["심리학의 역사와 주요 관점", "학습과 기억", "동기와 정서", "성격심리", "발달심리"],
      difficulty: "중",
      passRate: "55%",
    },
    {
      name: "이상심리학",
      questions: 20,
      time: 30,
      topics: ["DSM-5 진단체계", "불안장애", "우울장애", "조현병 스펙트럼", "성격장애"],
      difficulty: "상",
      passRate: "45%",
    },
    {
      name: "심리검사",
      questions: 20,
      time: 30,
      topics: ["심리측정 기초", "지능검사", "MMPI-2 기초", "투사검사 기초", "검사해석"],
      difficulty: "상",
      passRate: "48%",
    },
    {
      name: "임상심리학",
      questions: 20,
      time: 30,
      topics: ["임상심리학 개요", "심리치료 이론", "면담과 평가", "개입과 치료", "윤리"],
      difficulty: "중상",
      passRate: "50%",
    },
    {
      name: "심리상담",
      questions: 20,
      time: 30,
      topics: ["상담의 기초", "상담 이론", "상담 기법", "집단상담", "상담 윤리"],
      difficulty: "중",
      passRate: "58%",
    },
  ];

  const practicalInfo = {
    type: "필답형",
    time: 120,
    passingScore: 60,
    subjects: ["임상심리실무"],
    topics: [
      "심리검사 실시 및 해석",
      "사례개념화",
      "DSM-5 진단",
      "심리평가 보고서",
      "치료 계획 수립",
    ],
  };

  const frequencyTopics = [
    { topic: "MMPI-2 타당도/임상척도", frequency: 95, category: "심리검사" },
    { topic: "DSM-5 진단기준", frequency: 92, category: "이상심리학" },
    { topic: "웩슬러 지능검사", frequency: 88, category: "심리검사" },
    { topic: "불안장애 감별진단", frequency: 85, category: "이상심리학" },
    { topic: "인지행동치료", frequency: 82, category: "임상심리학" },
    { topic: "방어기제", frequency: 80, category: "심리학개론" },
    { topic: "발달단계", frequency: 78, category: "심리학개론" },
    { topic: "상담 기본 기술", frequency: 75, category: "심리상담" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-2" className="inline-flex items-center text-teal-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 2급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">시험 정보</h1>
          <p className="text-xl text-teal-100">임상심리사 2급 필기 및 실기 시험 상세</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("written")}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
              activeTab === "written"
                ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-teal-50"
            }`}
          >
            필기시험
          </button>
          <button
            onClick={() => setActiveTab("practical")}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
              activeTab === "practical"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-cyan-50"
            }`}
          >
            실기시험
          </button>
        </div>

        {activeTab === "written" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-600 text-sm">총 문항수</p>
                <p className="text-3xl font-bold text-teal-600">100문항</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-600 text-sm">시험시간</p>
                <p className="text-3xl font-bold text-cyan-600">150분</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-600 text-sm">합격기준</p>
                <p className="text-3xl font-bold text-blue-600">60점</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-600 text-sm">과락기준</p>
                <p className="text-3xl font-bold text-red-600">40점</p>
              </div>
            </div>

            <div className="space-y-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{subject.name}</h3>
                      <p className="text-gray-600">{subject.questions}문항 / {subject.time}분</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        subject.difficulty === "상" ? "bg-red-100 text-red-700" :
                        subject.difficulty === "중상" ? "bg-orange-100 text-orange-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        난이도: {subject.difficulty}
                      </span>
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                        합격률: {subject.passRate}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, tIndex) => (
                      <span key={tIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
              <h3 className="text-xl font-bold text-teal-800 mb-4">자주 출제되는 주제</h3>
              <div className="space-y-3">
                {frequencyTopics.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-32 text-sm text-gray-600">{item.category}</span>
                    <div className="flex-1 bg-white rounded-full h-6 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-end pr-2"
                        style={{ width: `${item.frequency}%` }}
                      >
                        <span className="text-white text-xs font-medium">{item.frequency}%</span>
                      </div>
                    </div>
                    <span className="w-48 text-sm font-medium text-gray-800">{item.topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "practical" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-600 text-sm">시험유형</p>
                <p className="text-3xl font-bold text-cyan-600">{practicalInfo.type}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-600 text-sm">시험시간</p>
                <p className="text-3xl font-bold text-blue-600">{practicalInfo.time}분</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-600 text-sm">합격기준</p>
                <p className="text-3xl font-bold text-teal-600">{practicalInfo.passingScore}점</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">실기시험 출제범위</h3>
              <div className="space-y-4">
                {practicalInfo.topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
                    <span className="bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 font-medium">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
              <h3 className="text-xl font-bold text-cyan-800 mb-4">2급 실기시험 특징</h3>
              <ul className="space-y-2 text-cyan-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>필답형으로만 구성 (1급과 달리 작업형 없음)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>기본적인 심리검사 해석 능력 평가</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>사례개념화 및 진단 기초 문제</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-cyan-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>심리평가 보고서 요약 능력</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">1급과 2급 실기시험 비교</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left">구분</th>
                      <th className="px-4 py-3 text-center">2급</th>
                      <th className="px-4 py-3 text-center">1급</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">시험시간</td>
                      <td className="px-4 py-3 text-center">120분</td>
                      <td className="px-4 py-3 text-center">180분</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">시험유형</td>
                      <td className="px-4 py-3 text-center">필답형</td>
                      <td className="px-4 py-3 text-center">필답형 + 작업형</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">난이도</td>
                      <td className="px-4 py-3 text-center text-yellow-600 font-medium">중</td>
                      <td className="px-4 py-3 text-center text-red-600 font-medium">상</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">합격률</td>
                      <td className="px-4 py-3 text-center">40~50%</td>
                      <td className="px-4 py-3 text-center">15~25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">과목별 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/category/welfare/clinical-psychologist-2/study/psychology-intro" className="bg-cyan-50 hover:bg-cyan-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-cyan-700 font-medium">심리학개론</span>
            </Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/abnormal-psychology" className="bg-teal-50 hover:bg-teal-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-teal-700 font-medium">이상심리학</span>
            </Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/psychological-assessment" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-blue-700 font-medium">심리검사</span>
            </Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/clinical-psychology" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-indigo-700 font-medium">임상심리학</span>
            </Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/counseling" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-violet-700 font-medium">심리상담</span>
            </Link>
            <Link href="/category/welfare/clinical-psychologist-2/study/practical" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 text-center transition-colors">
              <span className="text-purple-700 font-medium">실기</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
