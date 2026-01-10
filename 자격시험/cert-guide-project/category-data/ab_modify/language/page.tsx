import Link from 'next/link';

export default function LanguageCategoryPage() {
  const certifications = [
    {
      id: 'toeic',
      name: 'TOEIC',
      englishName: 'Test of English for International Communication',
      icon: '🇺🇸',
      color: 'from-blue-500 to-indigo-600',
      difficulty: 3,
      description: '국제 비즈니스 영어능력 평가',
      subjects: ['Listening', 'Reading'],
      hasStudyPage: true,
      href: '/category/language/toeic',
    },
    {
      id: 'toeic-speaking',
      name: 'TOEIC Speaking',
      englishName: 'TOEIC Speaking Test',
      icon: '🎤',
      color: 'from-indigo-500 to-purple-600',
      difficulty: 3,
      description: '영어 말하기 능력 평가',
      subjects: ['Read Aloud', 'Describe Picture', 'Respond Questions', 'Express Opinion'],
      hasStudyPage: true,
      href: '/category/language/toeic-speaking',
    },
    {
      id: 'teps',
      name: 'TEPS',
      englishName: 'Test of English Proficiency (Seoul National University)',
      icon: '📘',
      color: 'from-sky-500 to-blue-600',
      difficulty: 4,
      description: '서울대 개발 영어능력 검정시험',
      subjects: ['청해', '어휘', '문법', '독해'],
      hasStudyPage: true,
      href: '/category/language/teps',
    },
    {
      id: 'opic',
      name: 'OPIc',
      englishName: 'Oral Proficiency Interview - Computer',
      icon: '💬',
      color: 'from-emerald-500 to-teal-600',
      difficulty: 3,
      description: '컴퓨터 기반 영어 인터뷰 테스트',
      subjects: ['자기소개', '일상생활', '취미', '경험담', '롤플레이'],
      hasStudyPage: true,
      href: '/category/language/opic',
    },
    {
      id: 'jlpt',
      name: 'JLPT',
      englishName: 'Japanese Language Proficiency Test',
      icon: '🇯🇵',
      color: 'from-rose-500 to-red-600',
      difficulty: 4,
      description: '일본어능력시험 (N1~N5)',
      subjects: ['문자·어휘', '문법', '독해', '청해'],
      hasStudyPage: true,
      href: '/category/language/jlpt',
    },
    {
      id: 'jpt',
      name: 'JPT',
      englishName: 'Japanese Proficiency Test',
      icon: '🗾',
      color: 'from-pink-500 to-rose-600',
      difficulty: 3,
      description: '일본어 실력 평가시험',
      subjects: ['청해', '독해'],
      hasStudyPage: true,
      href: '/category/language/jpt',
    },
    {
      id: 'hsk',
      name: 'HSK',
      englishName: 'Hanyu Shuiping Kaoshi',
      icon: '🇨🇳',
      color: 'from-red-500 to-orange-600',
      difficulty: 4,
      description: '중국어 수준시험 (1~6급)',
      subjects: ['듣기', '독해', '쓰기'],
      hasStudyPage: true,
      href: '/category/language/hsk',
    },
    {
      id: 'topik',
      name: 'TOPIK',
      englishName: 'Test of Proficiency in Korean',
      icon: '🇰🇷',
      color: 'from-blue-600 to-red-500',
      difficulty: 3,
      description: '한국어능력시험 (외국인 대상)',
      subjects: ['듣기', '읽기', '쓰기'],
      hasStudyPage: true,
      href: '/category/language/topik',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-sky-600 hover:text-sky-800 flex items-center gap-2">
            <span>←</span>
            <span>홈으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🗣️</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">언어</h1>
              <p className="text-gray-600">어학 능력 검정시험</p>
            </div>
          </div>
          <p className="text-gray-600">
            영어, 일본어, 중국어 등 다양한 어학 시험 정보를 제공합니다.
            취업, 유학, 자기계발을 위한 어학 자격증을 준비해보세요.
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
                  {cert.subjects.slice(0, 4).map((subject, idx) => (
                    <span key={idx} className="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                  {cert.subjects.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{cert.subjects.length - 4}
                    </span>
                  )}
                </div>
{cert.hasStudyPage ? (
                  <Link
                    href={cert.href}
                    className="block w-full text-center bg-gradient-to-r from-sky-500 to-blue-600 text-white py-2 rounded-lg hover:from-sky-600 hover:to-blue-700 transition font-medium"
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

        <div className="mt-8 bg-sky-50 rounded-xl p-6 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">💡 어학 자격증 TIP</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• <strong>취업</strong>: TOEIC 700점+, OPIc IM2+ 보유 시 대기업 지원 가능</li>
            <li>• <strong>공무원</strong>: TOEIC 700점 이상 또는 TEPS 340점 이상 필요</li>
            <li>• <strong>유학</strong>: 일본 JLPT N1~N2, 중국 HSK 5~6급 권장</li>
            <li>• <strong>취득 순서</strong>: TOEIC → TOEIC Speaking/OPIc → 제2외국어 순으로 준비</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
