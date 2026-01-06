'use client';

import { useState } from 'react';

export default function InformationSecurityExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-red-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-red-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/information-security" className="text-gray-600 hover:text-red-600">정보보안기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🔐</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">정보보안기사 시험 상세</h1>
              <p className="text-red-100">Engineer Information Security - 시험 과목 및 출제 경향</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'written'
                  ? 'border-red-500 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-red-500 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              ✍️ 실기시험
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? <WrittenExamContent /> : <PracticalExamContent />}
      </main>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">🎯 정보보안기사 합격을 향해!</h2>
          <p className="text-red-100 mb-6">
            체계적인 학습으로 정보보안 전문가의 꿈을 이루세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/category/it/information-security/study/system-security"
              className="px-6 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition"
            >
              📚 학습 시작하기
            </a>
            <a
              href="/category/it/information-security"
              className="px-6 py-3 bg-white/20 text-white rounded-lg font-bold hover:bg-white/30 transition"
            >
              ← 메인 페이지로
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 Q-Net에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}

function WrittenExamContent() {
  const subjects = [
    {
      id: 1,
      name: '시스템 보안',
      questions: 20,
      difficulty: 4,
      passRate: '40%',
      topics: [
        '운영체제 보안 (Windows, Linux, Unix)',
        '접근 제어 모델 (DAC, MAC, RBAC)',
        '계정 및 권한 관리',
        '시스템 취약점 분석 및 점검',
        '악성코드 분석 및 대응',
        '로그 분석 및 감사',
        '보안 패치 관리',
        '가상화 및 클라우드 보안'
      ],
      keyPoints: [
        'Linux 명령어: chmod, chown, ps, netstat',
        'Windows: 레지스트리, 이벤트 로그, 그룹 정책',
        '취약점 점검 도구: Nessus, OpenVAS'
      ],
      studyLink: '/category/it/information-security/study/system-security'
    },
    {
      id: 2,
      name: '네트워크 보안',
      questions: 20,
      difficulty: 4,
      passRate: '38%',
      topics: [
        'TCP/IP 프로토콜 보안',
        '네트워크 공격 기법 (DoS, DDoS, 스푸핑)',
        '방화벽 (Firewall) 구성 및 운영',
        'IDS/IPS 침입탐지 시스템',
        'VPN 가상사설망',
        '무선 네트워크 보안 (WPA2, WPA3)',
        'NAC 네트워크 접근 제어',
        '네트워크 포렌식 및 패킷 분석'
      ],
      keyPoints: [
        'OSI 7계층별 보안 위협 이해',
        '방화벽 정책: Stateful vs Stateless',
        'Wireshark 패킷 분석 실습 필수'
      ],
      studyLink: '/category/it/information-security/study/network-security'
    },
    {
      id: 3,
      name: '애플리케이션 보안',
      questions: 20,
      difficulty: 4,
      passRate: '42%',
      topics: [
        '웹 보안 (OWASP Top 10)',
        'SQL Injection, XSS, CSRF 공격/방어',
        '소프트웨어 개발 보안 (시큐어 코딩)',
        '입력값 검증 및 출력값 인코딩',
        '암호화 API 활용',
        '모바일 앱 보안',
        '소스코드 취약점 분석',
        '보안 테스팅 (모의해킹)'
      ],
      keyPoints: [
        'OWASP Top 10 2021 버전 암기',
        'Prepared Statement로 SQL Injection 방어',
        'XSS 유형: Stored, Reflected, DOM-based'
      ],
      studyLink: '/category/it/information-security/study/application-security'
    },
    {
      id: 4,
      name: '정보보안 일반',
      questions: 20,
      difficulty: 3,
      passRate: '48%',
      topics: [
        '암호학 기초 (대칭키, 비대칭키)',
        'RSA, AES, DES, 3DES 알고리즘',
        '해시 함수 (SHA-256, SHA-3, MD5)',
        '전자서명 및 인증서 (X.509)',
        'PKI 공개키 기반구조',
        '키 관리 및 분배 (Diffie-Hellman)',
        '접근 통제 모델 (BLP, Biba, Clark-Wilson)',
        '보안 아키텍처'
      ],
      keyPoints: [
        'AES: 128/192/256비트, 블록 128비트',
        'RSA: 소인수분해 기반, 전자서명용',
        'SHA-256: 256비트 해시값, 충돌 저항성'
      ],
      studyLink: '/category/it/information-security/study/security-general'
    },
    {
      id: 5,
      name: '정보보안 관리 및 법규',
      questions: 20,
      difficulty: 3,
      passRate: '52%',
      topics: [
        '정보보호 관리체계 (ISMS-P)',
        'ISO 27001 국제표준',
        '위험 분석 및 평가',
        '업무연속성 관리 (BCP/DRP)',
        '개인정보보호법',
        '정보통신망법',
        '전자서명법',
        '정보보안 감사 및 컴플라이언스'
      ],
      keyPoints: [
        'ISMS-P: 80개 통제항목, 3년 유효',
        '개인정보: 수집·이용 동의, 파기 의무',
        'GDPR 주요 원칙 이해'
      ],
      studyLink: '/category/it/information-security/study/security-management'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">5과목</div>
            <div className="text-sm text-gray-600">시험 과목</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">100문항</div>
            <div className="text-sm text-gray-600">객관식 4지선다</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">2시간 30분</div>
            <div className="text-sm text-gray-600">시험 시간</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">60점 이상</div>
            <div className="text-sm text-gray-600">과목당 40점 이상</div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세</h2>
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 flex justify-between items-center">
              <div>
                <span className="bg-white/20 px-2 py-1 rounded text-sm mr-3">{subject.id}과목</span>
                <span className="font-bold text-lg">{subject.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span>{subject.questions}문항</span>
                <span>난이도 {'★'.repeat(subject.difficulty)}{'☆'.repeat(5-subject.difficulty)}</span>
                <span>합격률 {subject.passRate}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">📌 핵심 토픽</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {subject.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="font-medium text-amber-800 mb-1">💡 핵심 암기 포인트</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  {subject.keyPoints.map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
              </div>
              <a
                href={subject.studyLink}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
              >
                📖 학습하기 →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Study Strategy */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 필기시험 합격 전략</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-700 mb-2">✅ 고득점 과목 (먼저 공략)</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• <strong>정보보안 관리 및 법규</strong> - 암기 위주, 법률 용어 정리</li>
              <li>• <strong>정보보안 일반</strong> - 암호학 공식 암기, 알고리즘 비교표 작성</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-2">⚠️ 난이도 높은 과목</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• <strong>네트워크 보안</strong> - 프로토콜 이해 필수, 패킷 분석 실습</li>
              <li>• <strong>시스템 보안</strong> - OS별 특성 비교, 명령어 숙지</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>💡 핵심 팁:</strong> 암호화 알고리즘(AES, RSA, SHA)과 접근제어 모델(BLP, Biba)은 매회 출제됩니다.
            각 알고리즘의 키 길이, 블록 크기, 특징을 표로 정리해서 암기하세요!
          </p>
        </div>
      </div>
    </div>
  );
}

function PracticalExamContent() {
  const practicalTopics = [
    {
      category: '시스템 보안 실무',
      icon: '🖥️',
      ratio: '30%',
      topics: [
        '서버 보안 설정 (Windows/Linux)',
        '취약점 점검 스크립트 작성',
        '로그 분석 및 이상징후 탐지',
        '악성코드 분석 보고서 작성',
        '계정 및 권한 관리 설정',
        '보안 패치 적용 절차'
      ]
    },
    {
      category: '네트워크 보안 실무',
      icon: '🌐',
      ratio: '25%',
      topics: [
        '방화벽 정책 설정 및 분석',
        '패킷 분석 (Wireshark)',
        'IDS/IPS 룰 작성',
        '네트워크 구성도 분석',
        'VPN 설정 및 관리',
        'NAC 정책 수립'
      ]
    },
    {
      category: '애플리케이션 보안 실무',
      icon: '📱',
      ratio: '25%',
      topics: [
        '웹 취약점 진단 (SQL Injection, XSS)',
        '시큐어 코딩 적용 및 검토',
        '소스코드 취약점 분석',
        '모의해킹 보고서 작성',
        'OWASP 기반 점검',
        '암호화 적용 검토'
      ]
    },
    {
      category: '보안관리 실무',
      icon: '📋',
      ratio: '20%',
      topics: [
        '위험 분석 및 평가 수행',
        '정보보호 정책 수립',
        '보안감사 체크리스트 작성',
        '개인정보 영향평가',
        'ISMS-P 통제항목 점검',
        '침해사고 대응 절차'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 실기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">필답형</div>
            <div className="text-sm text-gray-600">시험 유형</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">3시간</div>
            <div className="text-sm text-gray-600">시험 시간</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">단답/서술형</div>
            <div className="text-sm text-gray-600">문제 유형</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">60점 이상</div>
            <div className="text-sm text-gray-600">합격 기준</div>
          </div>
        </div>
      </div>

      {/* Practical Topics */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">🔧 실기 영역별 상세</h2>
        {practicalTopics.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <span className="font-bold text-lg">{section.category}</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                출제 비중: {section.ratio}
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-2">
                {section.topics.map((topic, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Topics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🔥 최신 출제 경향</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-bold text-red-700 mb-2">매회 출제</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 암호화 알고리즘 비교 (AES, RSA)</li>
              <li>• 접근제어 정책 설정</li>
              <li>• 로그 분석 문제</li>
              <li>• 개인정보보호법 관련</li>
              <li>• ISMS-P 통제항목</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-bold text-orange-700 mb-2">자주 출제</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 네트워크 프로토콜 분석</li>
              <li>• 웹 취약점 진단 (SQL Injection)</li>
              <li>• 방화벽 정책 분석</li>
              <li>• 위험 분석 및 평가</li>
              <li>• 침해사고 대응 절차</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-700 mb-2">최신 트렌드</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 클라우드 보안 (AWS, Azure)</li>
              <li>• 제로트러스트 모델</li>
              <li>• 랜섬웨어 대응</li>
              <li>• 컨테이너 보안 (Docker, K8s)</li>
              <li>• AI 기반 보안 위협</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Answer Writing Tips */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 답안 작성 요령</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-700 mb-3">단답형 (40점)</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">Q. 대칭키 암호화 알고리즘 3가지를 쓰시오.</p>
                <p className="text-red-600 mt-1">A. AES, DES, 3DES (또는 SEED, ARIA)</p>
              </div>
              <p className="text-gray-500">→ 정확한 용어 사용, 약어는 풀네임과 함께</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-3">서술형 (60점)</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-800">Q. SQL Injection 공격의 원리와 방어 방법을 설명하시오.</p>
                <p className="text-red-600 mt-1">A. [원리] → [공격 예시] → [방어 방법 3가지] 순서로 작성</p>
              </div>
              <p className="text-gray-500">→ 개념-원리-대응 구조로 논리적 작성</p>
            </div>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 대비 팁</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-700 mb-2">🖥️ 실습 환경 구축</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• VirtualBox로 Windows Server + Linux VM 구성</li>
              <li>• Wireshark 설치하여 패킷 분석 연습</li>
              <li>• DVWA, WebGoat으로 웹 취약점 실습</li>
              <li>• 보안 장비 시뮬레이터 활용</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-2">⏰ 시간 배분 (3시간)</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• 단답형 (50분): 빠르게 작성, 모르면 넘기기</li>
              <li>• 서술형 (100분): 충분한 설명, 예시 포함</li>
              <li>• 검토 (30분): 오타, 누락, 추가 작성</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>🎯 합격 핵심:</strong> 암호화 알고리즘 비교표와 OWASP Top 10은 반드시 암기하세요.
            서술형은 &quot;개념 → 원리 → 대응방안&quot; 구조로 작성하면 고득점 가능합니다!
          </p>
        </div>
      </div>

      {/* Practice Link */}
      <div className="text-center">
        <a
          href="/category/it/information-security/study/practical"
          className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-bold"
        >
          🎯 실기시험 문제풀이 →
        </a>
      </div>
    </div>
  );
}
