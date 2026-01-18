import Link from 'next/link';

export default function ITCategoryPage() {
  const certifications = [
    {
      id: 'adsp',
      name: 'ADsP',
      englishName: '데이터분석 준전문가',
      icon: '📈',
      color: 'from-cyan-500 to-blue-600',
      difficulty: 3,
      description: '데이터 분석 기초 역량 검증',
      subjects: ['데이터 이해', '분석 기획', '데이터 분석'],
      hasStudyPage: true,
      href: '/category/it/adsp',
    },
    {
      id: 'information-processor',
      name: '정보처리기사',
      englishName: 'Engineer Information Processing',
      icon: '💻',
      color: 'from-blue-500 to-indigo-600',
      difficulty: 4,
      description: '소프트웨어 개발 전문 자격',
      subjects: ['소프트웨어 설계', '데이터베이스', '프로그래밍'],
      hasStudyPage: false,
      href: '/category/it/information-processor',
    },
    {
      id: 'information-security',
      name: '정보보안기사',
      englishName: 'Engineer Information Security',
      icon: '🔐',
      color: 'from-red-500 to-rose-600',
      difficulty: 4,
      description: '정보보안 전문 자격',
      subjects: ['시스템보안', '네트워크보안', '어플리케이션보안'],
      hasStudyPage: false,
      href: '/category/it/information-security',
    },
    {
      id: 'network-admin',
      name: '네트워크관리사',
      englishName: 'Network Administrator',
      icon: '🌐',
      color: 'from-green-500 to-emerald-600',
      difficulty: 3,
      description: '네트워크 관리 전문 자격',
      subjects: ['네트워크 기초', 'TCP/IP', '네트워크 장비'],
      hasStudyPage: false,
      href: '/category/it/network-admin',
    },
    {
      id: 'sqld',
      name: 'SQLD',
      englishName: 'SQL Developer',
      icon: '🗄️',
      color: 'from-orange-500 to-amber-600',
      difficulty: 3,
      description: 'SQL 전문가 자격 (개발자)',
      subjects: ['데이터 모델링', 'SQL 기본', 'SQL 활용'],
      hasStudyPage: false,
      href: '/category/it/sqld',
    },
    {
      id: 'linux-master',
      name: '리눅스마스터',
      englishName: 'Linux Master',
      icon: '🐧',
      color: 'from-yellow-500 to-orange-600',
      difficulty: 3,
      description: '리눅스 시스템 관리 자격',
      subjects: ['리눅스 실무', '시스템 관리', '네트워크 관리'],
      hasStudyPage: false,
      href: '/category/it/linux-master',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <span>←</span>
            <span>홈으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">💻</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">IT·정보통신</h1>
              <p className="text-gray-600">정보기술 및 데이터 분야 자격시험</p>
            </div>
          </div>
          <p className="text-gray-600">
            정보처리, 정보보안, 데이터 분석 등 IT 분야의 다양한 자격시험 정보를 제공합니다.
            4차 산업혁명 시대에 필수적인 IT 역량을 키워보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`bg-gradient-to-r ${cert.color} p-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{cert.icon}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < cert.difficulty ? 'text-yellow-300' : 'text-white/30'}`}>★</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">{cert.name}</h3>
                <p className="text-white/80 text-sm">{cert.englishName}</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">{cert.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {cert.subjects.slice(0, 3).map((subject, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                  {cert.subjects.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{cert.subjects.length - 3}
                    </span>
                  )}
                </div>
                {cert.hasStudyPage ? (
                  <Link
                    href={cert.href}
                    className="block w-full text-center bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition font-medium"
                  >
                    학습하기 →
                  </Link>
                ) : (
                  <div className="text-center text-gray-400 text-sm py-2">
                    준비 중
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">💡 IT 자격증 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• <strong>입문</strong>: ADsP, SQLD로 데이터 분야 시작</li>
            <li>• <strong>개발자</strong>: 정보처리기사 → 정보처리기술사 경로</li>
            <li>• <strong>보안</strong>: 정보보안기사 → CISSP 국제 자격</li>
            <li>• <strong>취업</strong>: IT 대기업/공공기관 지원 시 가산점 혜택</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
