'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TeachingEssayPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teacher-teaching-essay-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => {
      const newCompleted = prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id];
      localStorage.setItem('teacher-teaching-essay-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "교육정책 및 현안",
      questions: [
        { id: 1, question: "2022 개정 교육과정의 핵심 내용과 학교 현장 적용 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 2022 개정 교육과정의 핵심 내용과 학교 현장 적용 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 2, question: "고교학점제 도입의 의의와 성공적 정착을 위한 과제를 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 고교학점제 도입의 의의와 성공적 정착을 위한 과제를 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 3, question: "학교자치의 의미와 활성화 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학교자치의 의미와 활성화 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 4, question: "디지털 교육의 방향과 교사의 역할 변화를 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 디지털 교육의 방향과 교사의 역할 변화를 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 5, question: "AI 시대 학교교육의 방향과 교육과정 개편 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: AI 시대 학교교육의 방향과 교육과정 개편 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 6, question: "미래교육에서 핵심역량 교육의 의의와 실천 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 미래교육에서 핵심역량 교육의 의의와 실천 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 7, question: "학생 참여 중심 수업의 의의와 확대 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생 참여 중심 수업의 의의와 확대 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 8, question: "기초학력 보장을 위한 학교의 역할과 지원 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 기초학력 보장을 위한 학교의 역할과 지원 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 9, question: "교육격차 해소를 위한 학교의 역할을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교육격차 해소를 위한 학교의 역할을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 10, question: "지속가능발전교육(ESD)의 의의와 학교 적용 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 지속가능발전교육(ESD)의 의의와 학교 적용 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
      ]
    },
    {
      title: "학생지도",
      questions: [
        { id: 11, question: "학교폭력 예방을 위한 학교와 교사의 역할을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학교폭력 예방을 위한 학교와 교사의 역할을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 12, question: "학생 정신건강 지원을 위한 학교의 역할을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생 정신건강 지원을 위한 학교의 역할을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 13, question: "다문화 학생 지원을 위한 학교의 역할을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 다문화 학생 지원을 위한 학교의 역할을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 14, question: "학생 인권 존중과 교권 보호의 조화 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생 인권 존중과 교권 보호의 조화 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 15, question: "위기 학생 조기 발견과 지원 체계 구축 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 위기 학생 조기 발견과 지원 체계 구축 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 16, question: "학생 생활지도에서 회복적 생활교육의 의의와 적용 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생 생활지도에서 회복적 생활교육의 의의와 적용 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 17, question: "학생의 자기결정권 존중과 교육적 지도의 조화 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생의 자기결정권 존중과 교육적 지도의 조화 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 18, question: "학교 부적응 학생 지도 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학교 부적응 학생 지도 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 19, question: "청소년 디지털 미디어 과의존 예방과 지도 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 청소년 디지털 미디어 과의존 예방과 지도 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 20, question: "학생 자살 예방을 위한 학교의 역할을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생 자살 예방을 위한 학교의 역할을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
      ]
    },
    {
      title: "교직관 및 교사론",
      questions: [
        { id: 21, question: "교사의 전문성 신장을 위한 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교사의 전문성 신장을 위한 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 22, question: "교사 학습공동체의 의의와 활성화 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교사 학습공동체의 의의와 활성화 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 23, question: "초임교사의 성장을 위한 지원 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 초임교사의 성장을 위한 지원 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 24, question: "교사의 수업 전문성 신장 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교사의 수업 전문성 신장 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 25, question: "교사의 윤리와 책무성에 대해 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교사의 윤리와 책무성에 대해 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 26, question: "교사 리더십의 의의와 발휘 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교사 리더십의 의의와 발휘 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 27, question: "반성적 실천가로서의 교사상을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 반성적 실천가로서의 교사상을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 28, question: "교사의 정서적 소진(번아웃) 예방 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교사의 정서적 소진(번아웃) 예방 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 29, question: "교원평가 제도의 개선 방향을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교원평가 제도의 개선 방향을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 30, question: "가르치는 일의 가치와 교사의 소명의식에 대해 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 가르치는 일의 가치와 교사의 소명의식에 대해 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
      ]
    },
    {
      title: "수업 및 평가",
      questions: [
        { id: 31, question: "과정중심평가의 의의와 실천 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 과정중심평가의 의의와 실천 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 32, question: "교육과정-수업-평가 일체화의 의의와 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교육과정-수업-평가 일체화의 의의와 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 33, question: "학생 맞춤형 교육의 의의와 실현 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생 맞춤형 교육의 의의와 실현 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 34, question: "협력학습의 교육적 가치와 효과적 운영 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 협력학습의 교육적 가치와 효과적 운영 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 35, question: "피드백의 교육적 가치와 효과적 제공 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 피드백의 교육적 가치와 효과적 제공 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 36, question: "학습동기 유발 전략과 교사의 역할을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학습동기 유발 전략과 교사의 역할을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 37, question: "에듀테크 활용 수업의 효과와 유의점을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 에듀테크 활용 수업의 효과와 유의점을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 38, question: "융합교육의 의의와 교과 수업 적용 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 융합교육의 의의와 교과 수업 적용 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 39, question: "학생 참여형 수업의 의의와 설계 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생 참여형 수업의 의의와 설계 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 40, question: "배움중심수업의 의의와 실천 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 배움중심수업의 의의와 실천 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
      ]
    },
    {
      title: "학교공동체",
      questions: [
        { id: 41, question: "학교-가정-지역사회 연계 교육의 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학교-가정-지역사회 연계 교육의 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 42, question: "학부모 참여 확대 방안과 유의점을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학부모 참여 확대 방안과 유의점을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 43, question: "민주적 학교 문화 조성 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 민주적 학교 문화 조성 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 44, question: "교사 간 협력 문화 조성 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 교사 간 협력 문화 조성 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 45, question: "학생자치활동 활성화 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학생자치활동 활성화 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 46, question: "마을교육공동체의 의의와 구축 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 마을교육공동체의 의의와 구축 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 47, question: "학교 내 갈등 관리와 소통 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학교 내 갈등 관리와 소통 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 48, question: "학교 안전 문화 정착 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학교 안전 문화 정착 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 49, question: "민주시민교육의 의의와 학교 실천 방안을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 민주시민교육의 의의와 학교 실천 방안을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
        { id: 50, question: "학교 혁신의 방향과 교사의 역할을 논하시오.", prompt: "교원임용시험 2차 교직논술 문제입니다.\n\n문제: 학교 혁신의 방향과 교사의 역할을 논하시오.\n\n서론-본론-결론 구조로 답안을 작성해주세요." },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/category/education/teacher-certificate" className="text-purple-600 hover:text-purple-800 mb-4 inline-block">← 교원자격증으로 돌아가기</Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">교직논술</h1>
          <p className="text-gray-600">교원임용시험 2차 - 교직논술 대비</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-purple-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-purple-500 h-3 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.length} / {totalQuestions} 문제 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.includes(q.id)).length;
            const isOpen = openTopics.includes(index);
            return (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(index)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✍️</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.questions.map((q) => (
                      <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${completedQuestions.includes(q.id) ? 'border-purple-200 bg-purple-50' : 'border-gray-100 hover:border-purple-200'}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleQuestion(q.id)} className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${completedQuestions.includes(q.id) ? 'border-purple-500 bg-purple-500' : 'border-gray-300 hover:border-purple-400'}`}>
                            {completedQuestions.includes(q.id) && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                          </button>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">{q.id}. {q.question}</p>
                            <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition">🤖 AI에게 질문하기</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 교직논술 작성 포인트</h3>
          <ul className="space-y-1 text-purple-100">
            <li>• 서론-본론-결론 구조를 명확히 하세요</li>
            <li>• 교육정책, 학생지도 관련 시사 이슈를 숙지하세요</li>
            <li>• 구체적인 사례와 근거를 제시하세요</li>
            <li>• 분량 조절과 시간 배분 연습을 하세요</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
