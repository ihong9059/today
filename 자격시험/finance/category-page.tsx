'use client';

import Link from 'next/link';

const certifications = [
            {
              id: 'real-estate-agent',
              name: '공인중개사',
              description: '부동산 중개 전문가',
              icon: '🏠',
              hasPage: true,
            },
            {
              id: 'fund-advisor',
              name: '펀드투자권유자문인력',
              description: '금융투자협회',
              icon: '📊',
              hasPage: true,
            },
            {
              id: 'securities-advisor',
              name: '증권투자권유자문인력',
              description: '금융투자협회',
              icon: '📈',
              hasPage: true,
            },
            {
              id: 'derivatives-advisor',
              name: '파생상품투자권유자문인력',
              description: '금융투자협회',
              icon: '📉',
              hasPage: true,
            },
            {
              id: 'credit-analyst',
              name: '신용분석사',
              description: '한국금융연수원',
              icon: '🏦',
              hasPage: true,
            },
            {
              id: 'financial-risk-manager',
              name: '재무위험관리사',
              description: '한국금융투자협회',
              icon: '⚠️',
              hasPage: true,
            },
            {
              id: 'financial-planner',
              name: '자산관리사(FP)',
              description: '한국금융연수원',
              icon: '💰',
              hasPage: true,
            },
];

export default function FinanceCategoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">금융</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg mb-4">
            <span className="text-4xl">💳</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">금융 분야</h1>
          <p className="text-gray-600">금융투자, 자산관리, 신용분석 관련 자격증</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={cert.hasPage ? `/category/finance/${cert.id}` : '#'}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 ${cert.hasPage ? 'hover:-translate-y-1' : 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{cert.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{cert.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{cert.description}</p>
                  {cert.hasPage ? (
                    <span className="inline-flex items-center text-sm text-teal-600 font-medium">
                      학습하기 →
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-sm text-gray-400">
                      준비중
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
