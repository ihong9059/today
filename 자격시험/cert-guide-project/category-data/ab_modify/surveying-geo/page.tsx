'use client';

import Link from 'next/link';

export default function SurveyingGeoPage() {
  const subjects = [
    { id: 1, name: '측량학 개론', desc: '거리측량, 각측량, 수준측량, 다각측량' },
    { id: 2, name: 'GIS', desc: '공간데이터, 공간분석, 데이터베이스' },
    { id: 3, name: '사진측량 및 원격탐사', desc: '사진측량, 표정, 수치사진측량, 원격탐사' },
    { id: 4, name: '측지학 및 위성측위', desc: '좌표계, 투영법, GNSS' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/construction" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 건축·토목 분야
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">측량및지형공간정보기사</h1>
          <p className="text-lg text-white/90">공간정보 분야 전문가 자격증</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">시험 개요</h2>
            <ul className="space-y-2 text-gray-600">
              <li><span className="font-medium">시행기관:</span> 한국산업인력공단</li>
              <li><span className="font-medium">필기시험:</span> 4과목 100문항 (2시간 30분)</li>
              <li><span className="font-medium">실기시험:</span> 필답형 (3시간)</li>
              <li><span className="font-medium">합격기준:</span> 과목당 40점 이상, 평균 60점 이상</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">취득 혜택</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• 측량업체, 지적업체 취업 시 우대</li>
              <li>• 공무원 채용 가산점</li>
              <li>• 측량기술자 자격 취득</li>
              <li>• 국토지리정보원, LX공사 등 진출</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 과목</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="p-4 border border-emerald-100 rounded-lg bg-emerald-50/50">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
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
            href="/category/construction/surveying-geo/exam"
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-medium text-center hover:shadow-lg transition-shadow"
          >
            시험 정보 및 학습 시작
          </Link>
        </div>
      </div>
    </div>
  );
}
