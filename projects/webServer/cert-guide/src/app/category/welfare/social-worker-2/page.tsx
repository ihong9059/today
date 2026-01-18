'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SocialWorker2Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const subjects = [
    { name: '사회복지개론', description: '사회복지의 개념, 역사, 가치', icon: '📚' },
    { name: '인간행동과 사회환경', description: '인간발달, 성격이론, 사회체계', icon: '🧠' },
    { name: '사회복지실천론', description: '개입과정, 면접기술, 관계형성', icon: '🤝' },
    { name: '지역사회복지론', description: '지역사회 조직화, 자원개발', icon: '🏘️' },
    { name: '사회복지법제와 실천', description: '사회복지 관련 법률 체계', icon: '⚖️' },
    { name: '현장실습 가이드', description: '실습 준비, 기관 선정, 일지 작성', icon: '🏢' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-pink-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link>
            <span>/</span>
            <span className="text-white">사회복지사 2급</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">💝 사회복지사 2급</h1>
          <p className="text-xl text-pink-100">학점이수를 통해 취득하는 국가자격증</p>
          <p className="text-pink-200 mt-2">필수 14과목 이수 + 160시간 현장실습</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 취득 요건</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-bold text-gray-900">14과목 이수</h3>
              <p className="text-sm text-gray-600">필수 10과목 + 선택 4과목</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="text-3xl mb-2">🏢</div>
              <h3 className="font-bold text-gray-900">현장실습</h3>
              <p className="text-sm text-gray-600">160시간 이상</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-3xl mb-2">🎓</div>
              <h3 className="font-bold text-gray-900">학위 취득</h3>
              <p className="text-sm text-gray-600">전문대 이상 졸업</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <Link href="/category/welfare/social-worker-2/study" className="flex-1 bg-pink-500 text-white text-center py-4 rounded-xl font-bold hover:bg-pink-600 transition">
            📖 학습하기
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 학습 과목</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject, idx) => (
            <Link key={idx} href={`/category/welfare/social-worker-2/study/${subject.name === '사회복지개론' ? 'social-welfare-intro' : subject.name === '인간행동과 사회환경' ? 'human-behavior' : subject.name === '사회복지실천론' ? 'social-welfare-practice' : subject.name === '지역사회복지론' ? 'community-welfare' : subject.name === '사회복지법제와 실천' ? 'social-welfare-law' : 'field-practice'}`} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <div className="text-3xl mb-2">{subject.icon}</div>
              <h3 className="font-bold text-gray-900">{subject.name}</h3>
              <p className="text-sm text-gray-500">{subject.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4"><p className="text-gray-700 text-sm">{aiPrompt}</p></div>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg">Claude</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-green-500 text-white text-center py-3 rounded-lg">ChatGPT</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
