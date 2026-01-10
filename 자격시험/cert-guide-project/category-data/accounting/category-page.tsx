'use client';

import Link from 'next/link';

const certifications = [
    {
      id: 'cpa',
      name: '공인회계사(CPA)',
      description: '회계감사 및 재무제표 작성 전문가',
      icon: '📊',
      hasPage: true,
    },
    {
      id: 'tax-accountant',
      name: '세무사',
      description: '세금 신고 및 조세 상담 전문가',
      icon: '📋',
      hasPage: true,
    },
    {
      id: 'customs-broker',
      name: '관세사',
      description: '수출입 통관 및 관세 업무 전문가',
      icon: '📦',
      hasPage: true,
    },
    {
      id: 'computerized-accounting-1',
      name: '전산회계 1급',
      description: '전산회계 실무 능력 국가공인자격',
      icon: '💻',
      hasPage: true,
    },
    {
      id: 'computerized-accounting-2',
      name: '전산회계 2급',
      description: '회계 기초 실무 능력 국가공인자격',
      icon: '📝',
      hasPage: true,
    },
    {
      id: 'computerized-tax-1',
      name: '전산세무 1급',
      description: '전산세무 고급 실무 능력 국가공인자격',
      icon: '🧮',
      hasPage: true,
    },
    {
      id: 'computerized-tax-2',
      name: '전산세무 2급',
      description: '전산세무 중급 실무 능력 국가공인자격',
      icon: '📊',
      hasPage: true,
    },
    {
      id: 'fat-1',
      name: 'FAT 1급',
      description: '회계정보처리 국가공인자격 (한국공인회계사회)',
      icon: '💼',
      hasPage: true,
    },
    {
      id: 'fat-2',
      name: 'FAT 2급',
      description: '회계정보처리 기초 국가공인자격',
      icon: '📖',
      hasPage: true,
    },
    {
      id: 'tat-1',
      name: 'TAT 1급',
      description: '세무정보처리 국가공인자격 (한국공인회계사회)',
      icon: '📑',
      hasPage: true,
    },
    {
      id: 'tat-2',
      name: 'TAT 2급',
      description: '세무정보처리 기초 국가공인자격',
      icon: '📋',
      hasPage: true,
    },
];

export default function AccountingCategoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">회계·세무</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">회계·세무 분야</h1>
          <p className="text-gray-600">회계, 세무, 관세 관련 자격증</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Link
              key={cert.id}
              href={cert.hasPage ? `/category/accounting/${cert.id}` : '#'}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 ${cert.hasPage ? 'hover:-translate-y-1' : 'opacity-50 cursor-not-allowed'}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{cert.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{cert.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{cert.description}</p>
                  {cert.hasPage ? (
                    <span className="inline-flex items-center text-sm text-emerald-600 font-medium">
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
