'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function LinuxPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('linux-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('linux-practical-completed', JSON.stringify(items));
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
      title: "시험 당일 준비",
      icon: "📅",
      items: [
        "시험 시작 30분 전까지 입실 완료하기",
        "신분증 필수 지참 (주민등록증, 운전면허증, 여권)",
        "수험표 출력 또는 캡처 준비",
        "시험장 위치 사전 확인하기",
        "2급 필기: 100분, 80문항 / 실기: 60분"
      ]
    },
    {
      title: "시험 시간 관리",
      icon: "⏱️",
      items: [
        "2급 필기: 80문항 100분 → 문항당 약 75초",
        "어려운 문제는 표시 후 다음으로 넘어가기",
        "실기: 60분 동안 실제 리눅스 환경에서 작업",
        "실기 명령어 철자 실수 주의 (감점)",
        "마지막 10분은 검토 시간으로 확보"
      ]
    },
    {
      title: "필기 빈출 - 리눅스 기초",
      icon: "🐧",
      items: [
        "리눅스 역사: 리누스 토발즈, 1991년, GPL",
        "파일시스템 구조: /etc, /var, /home, /bin 역할",
        "권한: rwx=421, chmod 755 = rwxr-xr-x",
        "링크: 하드링크 vs 심볼릭링크 차이",
        "정규표현식: ^(시작), $(끝), .(임의문자)"
      ]
    },
    {
      title: "필기 빈출 - 명령어",
      icon: "💻",
      items: [
        "ls -la: 숨김파일 포함 상세 목록",
        "grep -r pattern dir: 재귀적 패턴 검색",
        "find / -name file: 파일 검색",
        "tar -cvzf: 압축 생성, -xvzf: 압축 해제",
        "ps aux / ps -ef: 프로세스 목록"
      ]
    },
    {
      title: "필기 빈출 - 사용자/권한",
      icon: "👤",
      items: [
        "useradd -m -s /bin/bash user: 사용자 생성",
        "/etc/passwd: 계정정보 (7개 필드)",
        "/etc/shadow: 암호화된 패스워드",
        "SUID(4000), SGID(2000), Sticky(1000)",
        "umask 022: 기본 권한 마스크"
      ]
    },
    {
      title: "필기 빈출 - 프로세스/서비스",
      icon: "⚡",
      items: [
        "kill -9 PID: 강제 종료 (SIGKILL)",
        "nohup command &: 백그라운드 실행",
        "crontab 형식: 분 시 일 월 요일 명령",
        "systemctl enable/start/status service",
        "journalctl -u service: 서비스 로그"
      ]
    },
    {
      title: "필기 빈출 - 네트워크",
      icon: "🌐",
      items: [
        "ip addr / ifconfig: IP 주소 확인",
        "ss -tuln / netstat -tuln: 리스닝 포트",
        "firewall-cmd --add-port=80/tcp: 포트 열기",
        "SSH 기본 포트: 22, 설정: /etc/ssh/sshd_config",
        "Apache 설정: /etc/httpd/ (CentOS)"
      ]
    },
    {
      title: "실기 빈출 유형",
      icon: "🔧",
      items: [
        "사용자 생성 및 그룹 설정",
        "파일/디렉토리 권한 변경",
        "crontab 작업 스케줄 등록",
        "서비스 시작/중지/자동시작 설정",
        "방화벽 포트 열기"
      ]
    },
    {
      title: "실기 주의사항",
      icon: "⚠️",
      items: [
        "명령어 철자 정확히 입력 (오타 = 감점)",
        "옵션 순서: 대부분 순서 무관하나 확인 필요",
        "경로: 절대경로 사용 권장",
        "결과 확인: 명령 실행 후 반드시 확인",
        "시간 배분: 쉬운 문제부터 해결"
      ]
    },
    {
      title: "자주 틀리는 문제",
      icon: "❓",
      items: [
        "chmod 755 vs chmod u=rwx,go=rx (동일)",
        "rm -rf: 강제+재귀 삭제 (매우 위험)",
        "ln vs ln -s: 하드링크 vs 심볼릭링크",
        "2>&1: 표준에러를 표준출력으로 리다이렉션",
        "/etc/fstab: 부팅 시 자동 마운트 설정"
      ]
    },
    {
      title: "마무리 체크리스트",
      icon: "✅",
      items: [
        "기출문제 최소 3회분 풀어보기",
        "실기 환경 사전 연습 (VirtualBox + CentOS/Ubuntu)",
        "자주 쓰는 명령어 옵션 암기",
        "CentOS vs Ubuntu 명령어 차이 정리",
        "시험 전날은 가볍게 복습만"
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
            <span className="text-4xl">🎯</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실전 대비</h1>
              <p className="text-gray-600">시험 전략 및 핵심 정리</p>
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
          <h3 className="font-bold text-yellow-800 mb-3">💡 합격 전략 요약</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• <strong>2급 권장</strong>: 입문자는 2급부터 시작</li>
            <li>• <strong>실습 필수</strong>: VirtualBox로 리눅스 설치하여 실습</li>
            <li>• <strong>기출 반복</strong>: 기출 유형이 반복되므로 기출 분석 필수</li>
            <li>• <strong>60점 목표</strong>: 필기/실기 각각 60점 이상이면 합격</li>
          </ul>
        </div>

        <div className="mt-4 bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">📚 추천 학습 자료</h3>
          <ul className="space-y-2 text-orange-700 text-sm">
            <li>• 리눅스마스터 공식 가이드북 (KAIT)</li>
            <li>• 기출문제 PDF (한국정보통신진흥협회)</li>
            <li>• VirtualBox + CentOS/Ubuntu 무료 실습</li>
            <li>• 유튜브 리눅스마스터 강의 (무료)</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`리눅스마스터 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`리눅스마스터 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`리눅스마스터 시험 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 예시와 함께 설명해주세요.`)}`}
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
