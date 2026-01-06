'use client';

import { useState } from 'react';

export default function NetworkAdminExamPage() {
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
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/network-admin" className="text-gray-600 hover:text-blue-600">네트워크관리사</a>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🌐</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">네트워크관리사 시험 상세</h1>
              <p className="text-blue-100">Network Administrator - 시험 과목 및 출제 경향</p>
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
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-4 font-medium text-sm border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 ICQA에서 확인하세요.
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
      name: 'TCP/IP',
      questions: 20,
      difficulty: 4,
      passRate: '35%',
      color: 'blue',
      topics: [
        'IP 주소 체계 (IPv4, IPv6)',
        '서브넷 마스크와 서브네팅',
        'CIDR 표기법',
        '라우팅 프로토콜 (RIP, OSPF, BGP)',
        'TCP/UDP 포트와 소켓',
        '3-way Handshake',
        'ARP/RARP 프로토콜',
        'ICMP와 네트워크 진단'
      ],
      studyLink: '/category/it/network-admin/study/protocol'
    },
    {
      id: 2,
      name: '네트워크 일반',
      questions: 20,
      difficulty: 3,
      passRate: '42%',
      color: 'indigo',
      topics: [
        'OSI 7계층 모델',
        'TCP/IP 4계층 모델',
        '이더넷과 LAN 기술',
        '네트워크 토폴로지 (버스, 스타, 링)',
        '전송 매체 (UTP, 광케이블)',
        '무선 네트워크 (Wi-Fi, 블루투스)',
        '네트워크 프로토콜 개요',
        'VLAN과 네트워크 세그먼트'
      ],
      studyLink: '/category/it/network-admin/study/network-theory'
    },
    {
      id: 3,
      name: 'NOS (네트워크 운영체제)',
      questions: 20,
      difficulty: 3,
      passRate: '45%',
      color: 'purple',
      topics: [
        'Windows Server 설치 및 구성',
        'Active Directory 도메인 서비스',
        'DNS 서버 구성',
        'DHCP 서버 구성',
        'Linux 기본 명령어',
        'Linux 네트워크 설정',
        '파일 서버 및 공유 설정',
        '사용자 및 그룹 관리'
      ],
      studyLink: '/category/it/network-admin/study/practical'
    },
    {
      id: 4,
      name: '네트워크 운용기기',
      questions: 20,
      difficulty: 3,
      passRate: '40%',
      color: 'cyan',
      topics: [
        '라우터 기본 설정',
        '스위치 구성 및 VLAN',
        '방화벽 정책 설정',
        'NAT/PAT 구성',
        '네트워크 모니터링 도구',
        '케이블 제작 (다이렉트, 크로스)',
        '무선 AP 설정',
        '네트워크 장비 문제 해결'
      ],
      studyLink: '/category/it/network-admin/study/network-equipment'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">4과목</div>
            <div className="text-sm text-gray-600">시험 과목</div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-indigo-600">80문항</div>
            <div className="text-sm text-gray-600">객관식 4지선다</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">1시간 40분</div>
            <div className="text-sm text-gray-600">시험 시간</div>
          </div>
          <div className="bg-cyan-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-cyan-600">60점 이상</div>
            <div className="text-sm text-gray-600">과목당 40점 이상</div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세</h2>
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className={`bg-${subject.color}-500 text-white px-6 py-4 flex justify-between items-center`}>
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
                      <span className={`w-1.5 h-1.5 rounded-full bg-${subject.color}-500`}></span>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={subject.studyLink}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-${subject.color}-100 text-${subject.color}-700 rounded-lg hover:bg-${subject.color}-200 transition`}
              >
                📖 학습하기 →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Study Strategy */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 필기시험 합격 전략</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-700 mb-2">✅ 고득점 과목 (먼저 공략)</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• 네트워크 일반 - OSI 7계층 암기, 프로토콜 특성 이해</li>
              <li>• NOS - Windows Server, Linux 명령어 실습 병행</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-2">⚠️ 주의 필요 과목</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• TCP/IP - 서브넷 계산 연습 필수, IP 주소 체계 완벽 이해</li>
              <li>• 네트워크 운용기기 - 장비 설정 명령어 암기</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>💡 핵심 팁:</strong> 서브넷 마스크 계산은 매회 출제됩니다. 2진수 변환과 네트워크/호스트 ID 분리를 빠르게 할 수 있도록 연습하세요!
          </p>
        </div>
      </div>
    </div>
  );
}

function PracticalExamContent() {
  const practicalTopics = [
    {
      category: 'Windows Server',
      icon: '🖥️',
      ratio: '40%',
      topics: [
        'Active Directory 설치 및 구성',
        'DNS 서버 설정 (정방향/역방향 조회)',
        'DHCP 서버 구성 및 범위 설정',
        '파일 서버 공유 및 권한 설정',
        '그룹 정책(GPO) 적용',
        'IIS 웹 서버 구성'
      ]
    },
    {
      category: 'Linux Server',
      icon: '🐧',
      ratio: '30%',
      topics: [
        '기본 명령어 (ls, cd, cp, mv, rm)',
        '사용자 및 권한 관리 (chmod, chown)',
        '네트워크 설정 (ifconfig, ip)',
        '서비스 관리 (systemctl)',
        '방화벽 설정 (iptables, firewalld)',
        'SSH 서버 구성'
      ]
    },
    {
      category: '네트워크 장비 설정',
      icon: '🔌',
      ratio: '20%',
      topics: [
        '라우터 기본 설정 (IP, 게이트웨이)',
        '스위치 VLAN 구성',
        '라우팅 테이블 설정',
        'NAT 구성',
        '장비 패스워드 설정',
        'running-config 저장'
      ]
    },
    {
      category: 'UTP 케이블 제작',
      icon: '🔧',
      ratio: '10%',
      topics: [
        '다이렉트 케이블 (T568B-T568B)',
        '크로스오버 케이블 (T568A-T568B)',
        '케이블 테스터 사용법',
        '커넥터 크림핑 기술'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 실기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">작업형</div>
            <div className="text-sm text-gray-600">시험 유형</div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-indigo-600">1시간 30분</div>
            <div className="text-sm text-gray-600">시험 시간</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">PC 실습</div>
            <div className="text-sm text-gray-600">문제 유형</div>
          </div>
          <div className="bg-cyan-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-cyan-600">60점 이상</div>
            <div className="text-sm text-gray-600">합격 기준</div>
          </div>
        </div>
      </div>

      {/* Practical Topics */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">🔧 실기 영역별 상세</h2>
        {practicalTopics.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4 flex justify-between items-center">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
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
              <li>• Windows Server DNS/DHCP</li>
              <li>• Linux 기본 명령어</li>
              <li>• UTP 케이블 제작</li>
              <li>• 네트워크 장비 IP 설정</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-bold text-orange-700 mb-2">자주 출제</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Active Directory 구성</li>
              <li>• VLAN 설정</li>
              <li>• 방화벽 정책</li>
              <li>• 파일 공유 권한</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-700 mb-2">간헐적 출제</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• IIS 웹 서버</li>
              <li>• NAT 구성</li>
              <li>• 라우팅 프로토콜</li>
              <li>• VPN 설정</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 대비 팁</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-700 mb-2">🖥️ 실습 환경 구축</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• VirtualBox로 Windows Server VM 설치</li>
              <li>• Linux (CentOS/Ubuntu) VM 구성</li>
              <li>• Packet Tracer로 네트워크 장비 시뮬레이션</li>
              <li>• UTP 케이블 제작 도구 준비 (크림핑툴, 테스터)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-2">⏰ 시간 배분</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Windows Server (35분): DNS, DHCP 설정</li>
              <li>• Linux (25분): 명령어, 서비스 설정</li>
              <li>• 네트워크 장비 (20분): 라우터, 스위치</li>
              <li>• 케이블 제작 (10분): 빠르게 완료</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>🎯 합격 핵심:</strong> 케이블 제작은 감점 요소가 많습니다. 시험 전 최소 10회 이상 연습하여 3분 내에 완성할 수 있도록 숙달하세요!
          </p>
        </div>
      </div>

      {/* Practice Link */}
      <div className="text-center">
        <a
          href="/category/it/network-admin/study/practical"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold"
        >
          🎯 실기시험 문제풀이 →
        </a>
      </div>
    </div>
  );
}
