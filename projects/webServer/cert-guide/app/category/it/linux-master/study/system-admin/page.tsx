'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SystemAdminPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('linux-sysadmin-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('linux-sysadmin-completed', JSON.stringify(items));
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
      title: "사용자 관리",
      icon: "👤",
      items: [
        "useradd: 사용자 생성 (-m: 홈 생성, -s: 쉘 지정)",
        "userdel: 사용자 삭제 (-r: 홈 함께 삭제)",
        "usermod: 사용자 정보 수정 (-G: 그룹 변경)",
        "passwd: 비밀번호 변경/관리",
        "/etc/passwd: 사용자 계정 정보 (7개 필드)",
        "/etc/shadow: 암호화된 비밀번호 저장",
        "/etc/group: 그룹 정보",
        "groupadd: 그룹 생성",
        "groupdel: 그룹 삭제",
        "id: 사용자 UID, GID 확인"
      ]
    },
    {
      title: "프로세스 관리",
      icon: "⚡",
      items: [
        "ps: 프로세스 목록 (ps aux, ps -ef)",
        "top: 실시간 프로세스 모니터링",
        "htop: 향상된 top (별도 설치)",
        "kill: 프로세스 종료 (kill PID)",
        "kill -9: 강제 종료 (SIGKILL)",
        "kill -15: 정상 종료 요청 (SIGTERM)",
        "pkill: 이름으로 프로세스 종료",
        "pgrep: 이름으로 PID 검색",
        "nice/renice: 프로세스 우선순위 조정",
        "nohup: 로그아웃 후에도 실행 유지"
      ]
    },
    {
      title: "백그라운드 작업",
      icon: "🔄",
      items: [
        "&: 백그라운드 실행 (command &)",
        "jobs: 백그라운드 작업 목록",
        "fg: 백그라운드 → 포그라운드",
        "bg: 정지된 작업 → 백그라운드",
        "Ctrl+Z: 포그라운드 작업 정지",
        "Ctrl+C: 포그라운드 작업 종료",
        "disown: 쉘에서 작업 분리",
        "screen: 가상 터미널 관리자",
        "tmux: 터미널 멀티플렉서",
        "at: 예약 실행 (1회성)"
      ]
    },
    {
      title: "크론(Cron) 스케줄링",
      icon: "⏰",
      items: [
        "crontab -e: 크론 작업 편집",
        "crontab -l: 크론 작업 목록",
        "crontab -r: 크론 작업 삭제",
        "크론 형식: 분 시 일 월 요일 명령",
        "* * * * *: 매 분 실행",
        "0 9 * * 1-5: 평일 오전 9시",
        "0 0 1 * *: 매월 1일 자정",
        "/etc/cron.daily: 매일 실행 스크립트",
        "/etc/cron.weekly: 매주 실행 스크립트",
        "anacron: 전원 꺼진 시간 보정"
      ]
    },
    {
      title: "패키지 관리 - RPM/YUM",
      icon: "📦",
      items: [
        "rpm -i: 패키지 설치 (install)",
        "rpm -U: 패키지 업그레이드 (upgrade)",
        "rpm -e: 패키지 삭제 (erase)",
        "rpm -q: 패키지 조회 (query)",
        "rpm -qa: 설치된 모든 패키지",
        "yum install: 패키지 설치 (의존성 자동)",
        "yum remove: 패키지 삭제",
        "yum update: 패키지 업데이트",
        "yum search: 패키지 검색",
        "yum info: 패키지 정보 확인"
      ]
    },
    {
      title: "패키지 관리 - APT (Debian)",
      icon: "📦",
      items: [
        "apt update: 패키지 목록 갱신",
        "apt upgrade: 설치된 패키지 업그레이드",
        "apt install: 패키지 설치",
        "apt remove: 패키지 삭제 (설정 유지)",
        "apt purge: 패키지 완전 삭제 (설정 포함)",
        "apt search: 패키지 검색",
        "apt show: 패키지 정보",
        "apt autoremove: 불필요한 패키지 삭제",
        "dpkg -i: .deb 패키지 설치",
        "dpkg -l: 설치된 패키지 목록"
      ]
    },
    {
      title: "디스크 관리",
      icon: "💿",
      items: [
        "df: 파일 시스템 사용량 (-h: 읽기 쉽게)",
        "du: 디렉토리 사용량 (-sh: 요약)",
        "fdisk: 파티션 관리",
        "parted: 파티션 관리 (2TB 이상 지원)",
        "mkfs: 파일 시스템 생성 (mkfs.ext4)",
        "mount: 파일 시스템 마운트",
        "umount: 파일 시스템 언마운트",
        "/etc/fstab: 부팅 시 자동 마운트 설정",
        "lsblk: 블록 장치 목록",
        "blkid: 장치 UUID 확인"
      ]
    },
    {
      title: "LVM (Logical Volume Manager)",
      icon: "🗄️",
      items: [
        "PV (Physical Volume): 물리 볼륨",
        "VG (Volume Group): 볼륨 그룹",
        "LV (Logical Volume): 논리 볼륨",
        "pvcreate: PV 생성",
        "vgcreate: VG 생성",
        "lvcreate: LV 생성 (-L: 크기, -n: 이름)",
        "lvextend: LV 크기 확장",
        "lvreduce: LV 크기 축소",
        "pvdisplay/vgdisplay/lvdisplay: 정보 확인",
        "LVM 장점: 유연한 용량 조절, 스냅샷"
      ]
    },
    {
      title: "시스템 로그",
      icon: "📋",
      items: [
        "/var/log/messages: 시스템 일반 로그 (CentOS)",
        "/var/log/syslog: 시스템 일반 로그 (Ubuntu)",
        "/var/log/secure: 인증 관련 로그 (CentOS)",
        "/var/log/auth.log: 인증 관련 로그 (Ubuntu)",
        "/var/log/dmesg: 커널 부팅 메시지",
        "dmesg: 커널 링 버퍼 출력",
        "journalctl: systemd 로그 조회",
        "journalctl -u service: 특정 서비스 로그",
        "journalctl -f: 실시간 로그 추적",
        "logrotate: 로그 파일 관리/순환"
      ]
    },
    {
      title: "시스템 서비스 관리",
      icon: "🔧",
      items: [
        "systemctl start: 서비스 시작",
        "systemctl stop: 서비스 중지",
        "systemctl restart: 서비스 재시작",
        "systemctl status: 서비스 상태 확인",
        "systemctl enable: 부팅 시 자동 시작",
        "systemctl disable: 자동 시작 해제",
        "systemctl is-enabled: 자동 시작 여부",
        "systemctl list-units: 서비스 목록",
        "service (레거시): CentOS 6 이하",
        "chkconfig (레거시): 부팅 서비스 관리"
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
            <span className="text-4xl">⚙️</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">시스템 관리</h1>
              <p className="text-gray-600">사용자, 프로세스, 패키지 관리</p>
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
          <h3 className="font-bold text-yellow-800 mb-3">💡 시스템 관리 학습 전략</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• <strong>빈출</strong>: useradd/usermod 옵션, crontab 형식</li>
            <li>• <strong>실기</strong>: 패키지 설치, 서비스 관리 명령어 숙지</li>
            <li>• <strong>주의</strong>: RPM(CentOS) vs APT(Ubuntu) 구분</li>
            <li>• <strong>고급</strong>: LVM 구조 및 명령어 이해</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`리눅스마스터 시스템 관리 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`리눅스마스터 시스템 관리 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`리눅스마스터 시스템 관리 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
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
