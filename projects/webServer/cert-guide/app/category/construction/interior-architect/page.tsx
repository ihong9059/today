'use client';

import Link from 'next/link';

export default function InteriorArchitectPage() {
  const subjects = [
    { id: 1, name: '실내디자인론', desc: '디자인원리, 공간계획, 색채' },
    { id: 2, name: '실내환경', desc: '조명, 음향, 열환경, 공기환경' },
    { id: 3, name: '실내건축구조', desc: '건축구조, 재료역학, 시공' },
    { id: 4, name: '실내건축재료', desc: '마감재료, 가구, 친환경재료' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/construction" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 건축·토목 분야
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">실내건축기사</h1>
          <p className="text-lg text-white/90">실내 공간 설계 전문가 자격증</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">시험 개요</h2>
            <ul className="space-y-2 text-gray-600">
              <li><span className="font-medium">시행기관:</span> 한국산업인력공단</li>
              <li><span className="font-medium">필기시험:</span> 4과목 100문항 (2시간 30분)</li>
              <li><span className="font-medium">실기시험:</span> 작업형 (5시간)</li>
              <li><span className="font-medium">합격기준:</span> 과목당 40점 이상, 평균 60점 이상</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">취득 혜택</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• 인테리어 설계사무소 취업</li>
              <li>• 실내건축 관련 업체 창업</li>
              <li>• 건설회사 인테리어 부서</li>
              <li>• 공간 디자이너로 활동</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 과목</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="p-4 border border-purple-100 rounded-lg bg-purple-50/50">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {subject.id}
                  </span>
                  <div>
                    <h3 className="font-medium text-gray-800">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/category/construction/interior-architect/exam"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium text-center hover:shadow-lg transition-shadow"
          >
            시험 정보 및 학습 시작
          </Link>
        </div>
      </div>
    </div>
  );
}
