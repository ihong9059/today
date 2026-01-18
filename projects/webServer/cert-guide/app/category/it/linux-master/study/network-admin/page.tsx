'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function NetworkAdminPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('linux-network-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('linux-network-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "네트워크 기초",
      icon: "🌐",
      items: [
        "OSI 7계층: 물리-데이터링크-네트워크-전송-세션-표현-응용",
        "TCP/IP 4계층: 네트워크접근-인터넷-전송-응용",
        "IP 주소: IPv4(32비트), IPv6(128비트)",
        "서브넷 마스크: 네트워크/호스트 부분 구분",
        "CIDR 표기: /24 = 255.255.255.0",
        "게이트웨이: 다른 네트워크로 가는 관문",
        "DNS: 도메인 이름 → IP 주소 변환",
        "DHCP: IP 주소 자동 할당",
        "포트: 서비스 구분 (0-65535)",
        "잘 알려진 포트: SSH(22), HTTP(80), HTTPS(443)"
      ]
    },
    {
      title: "네트워크 설정 명령어",
      icon: "⚙️",
      items: [
        "ip addr: IP 주소 확인",
        "ip link: 네트워크 인터페이스 확인",
        "ip route: 라우팅 테이블 확인",
        "ifconfig (레거시): 네트워크 설정 (net-tools)",
        "route (레거시): 라우팅 테이블",
        "/etc/sysconfig/network-scripts/: CentOS 설정 파일",
        "/etc/netplan/: Ubuntu 18+ 설정 파일",
        "nmcli: NetworkManager CLI",
        "nmtui: NetworkManager TUI (텍스트 UI)",
        "hostnamectl: 호스트네임 설정"
      ]
    },
    {
      title: "네트워크 진단 명령어",
      icon: "🔍",
      items: [
        "ping: ICMP 연결 테스트",
        "traceroute/tracepath: 경로 추적",
        "netstat: 네트워크 연결 상태 (레거시)",
        "ss: 소켓 통계 (netstat 대체)",
        "ss -tuln: TCP/UDP 리스닝 포트",
        "nslookup: DNS 조회",
        "dig: DNS 상세 조회",
        "host: DNS 조회 (간단)",
        "curl: URL 요청 테스트",
        "wget: 파일 다운로드"
      ]
    },
    {
      title: "방화벽 (firewalld)",
      icon: "🔥",
      items: [
        "firewall-cmd --state: 상태 확인",
        "firewall-cmd --get-zones: 영역 목록",
        "firewall-cmd --get-default-zone: 기본 영역",
        "firewall-cmd --add-service=http: HTTP 허용",
        "firewall-cmd --add-port=8080/tcp: 포트 허용",
        "firewall-cmd --permanent: 영구 적용",
        "firewall-cmd --reload: 설정 재로드",
        "firewall-cmd --list-all: 현재 설정",
        "영역(Zone): public, trusted, internal 등",
        "리치 룰: 세부 조건 설정"
      ]
    },
    {
      title: "iptables",
      icon: "🛡️",
      items: [
        "체인: INPUT, OUTPUT, FORWARD",
        "iptables -L: 규칙 목록",
        "iptables -A: 규칙 추가",
        "iptables -D: 규칙 삭제",
        "iptables -F: 규칙 전체 삭제",
        "타겟: ACCEPT, DROP, REJECT",
        "-p: 프로토콜 (tcp, udp, icmp)",
        "--dport: 목적지 포트",
        "-s: 출발지 IP",
        "iptables-save/restore: 설정 저장/복구"
      ]
    },
    {
      title: "SSH 서비스",
      icon: "🔐",
      items: [
        "sshd: SSH 데몬 서비스",
        "/etc/ssh/sshd_config: SSH 서버 설정",
        "Port: SSH 포트 변경 (기본 22)",
        "PermitRootLogin: root 로그인 허용 여부",
        "PasswordAuthentication: 패스워드 인증 허용",
        "ssh-keygen: 키 페어 생성",
        "ssh-copy-id: 공개키 전송",
        "~/.ssh/authorized_keys: 인증된 공개키",
        "~/.ssh/known_hosts: 서버 지문 저장",
        "scp: SSH 기반 파일 전송"
      ]
    },
    {
      title: "웹 서버 (Apache)",
      icon: "🌍",
      items: [
        "httpd: Apache 패키지 (CentOS)",
        "apache2: Apache 패키지 (Ubuntu)",
        "/etc/httpd/: Apache 설정 디렉토리 (CentOS)",
        "/etc/apache2/: Apache 설정 디렉토리 (Ubuntu)",
        "/var/www/html/: 기본 웹 루트",
        "httpd.conf: 메인 설정 파일",
        "VirtualHost: 가상 호스트 설정",
        "DocumentRoot: 웹 문서 경로",
        "ServerName: 서버 이름",
        "apachectl configtest: 설정 검증"
      ]
    },
    {
      title: "웹 서버 (Nginx)",
      icon: "🚀",
      items: [
        "nginx: Nginx 패키지",
        "/etc/nginx/: 설정 디렉토리",
        "/etc/nginx/nginx.conf: 메인 설정",
        "/etc/nginx/sites-available/: 사이트 설정",
        "/etc/nginx/sites-enabled/: 활성 사이트",
        "server 블록: 가상 서버 설정",
        "location 블록: URL 경로별 설정",
        "nginx -t: 설정 검증",
        "nginx -s reload: 설정 재로드",
        "리버스 프록시: proxy_pass"
      ]
    },
    {
      title: "DNS 서버 (BIND)",
      icon: "📖",
      items: [
        "bind/named: DNS 서버 패키지",
        "/etc/named.conf: 메인 설정 파일",
        "/var/named/: 존 파일 디렉토리",
        "존(Zone): 도메인 영역",
        "정방향 조회: 도메인 → IP",
        "역방향 조회: IP → 도메인",
        "A 레코드: 도메인 → IPv4",
        "AAAA 레코드: 도메인 → IPv6",
        "CNAME: 별칭",
        "MX 레코드: 메일 서버"
      ]
    },
    {
      title: "FTP/NFS/Samba",
      icon: "📁",
      items: [
        "vsftpd: FTP 서버",
        "/etc/vsftpd/vsftpd.conf: FTP 설정",
        "anonymous_enable: 익명 접속 허용",
        "NFS: 네트워크 파일 시스템 (리눅스 간)",
        "/etc/exports: NFS 공유 설정",
        "exportfs -a: 설정 적용",
        "mount -t nfs: NFS 마운트",
        "Samba: Windows 파일 공유",
        "/etc/samba/smb.conf: Samba 설정",
        "smbclient: Samba 클라이언트"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it/linux-master" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
            <span>←</span>
            <span>리눅스마스터로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🌐</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">네트워크 관리</h1>
              <p className="text-gray-600">네트워크 설정, 서비스 운영</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalItems}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicItems = topic.items.map((_, i) => `${topicIndex}-${i}`);
            const completedInTopic = topicItems.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-yellow-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.items.map((item, itemIndex) => {
                      const itemId = `${topicIndex}-${itemIndex}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={itemIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-yellow-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-yellow-500 hover:text-yellow-700 text-xs px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200"
                          >
                            AI
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">💡 네트워크 관리 학습 전략</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• <strong>빈출</strong>: ip 명령어, 방화벽 설정, SSH 설정</li>
            <li>• <strong>실기</strong>: Apache/Nginx 설정, 포트 열기</li>
            <li>• <strong>이론</strong>: OSI 7계층, TCP/IP, 포트 번호</li>
            <li>• <strong>고급</strong>: iptables 체인 구조, DNS 레코드</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`리눅스마스터 네트워크 관리 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`리눅스마스터 네트워크 관리 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`리눅스마스터 네트워크 관리 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                Gemini에게 질문
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
