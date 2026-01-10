'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LinuxBasicsPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('linux-basics-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('linux-basics-completed', JSON.stringify(items));
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
      title: "리눅스 역사와 특징",
      icon: "📜",
      items: [
        "리눅스: 리누스 토발즈가 1991년 개발한 오픈소스 운영체제",
        "유닉스 기반: POSIX 표준 준수, 유닉스 철학 계승",
        "자유 소프트웨어 재단(FSF): 리처드 스톨만, GNU 프로젝트",
        "GPL 라이선스: 소스코드 공개 의무, 수정/배포 자유",
        "배포판: Ubuntu, CentOS, Debian, Fedora, Red Hat",
        "리눅스 특징: 다중 사용자, 다중 작업, 이식성",
        "커널(Kernel): 운영체제의 핵심, 하드웨어 제어",
        "쉘(Shell): 사용자와 커널 사이의 인터페이스",
        "GNU/Linux: GNU 도구 + Linux 커널 조합",
        "오픈소스 장점: 무료, 안정성, 보안, 커뮤니티 지원"
      ]
    },
    {
      title: "파일 시스템 구조",
      icon: "📁",
      items: [
        "/: 루트 디렉토리 (최상위)",
        "/bin: 필수 명령어 (ls, cp, mv 등)",
        "/sbin: 시스템 관리 명령어 (root 전용)",
        "/etc: 시스템 설정 파일",
        "/home: 일반 사용자 홈 디렉토리",
        "/root: root 사용자 홈 디렉토리",
        "/var: 가변 데이터 (로그, 메일, 스풀)",
        "/tmp: 임시 파일 저장소",
        "/usr: 사용자 프로그램, 라이브러리",
        "/proc: 가상 파일 시스템 (프로세스 정보)"
      ]
    },
    {
      title: "기본 명령어 - 파일/디렉토리",
      icon: "📂",
      items: [
        "ls: 디렉토리 내용 출력 (-l: 상세, -a: 숨김파일)",
        "cd: 디렉토리 이동 (cd ~: 홈, cd ..: 상위)",
        "pwd: 현재 작업 디렉토리 출력",
        "mkdir: 디렉토리 생성 (-p: 상위 함께 생성)",
        "rmdir: 빈 디렉토리 삭제",
        "cp: 파일/디렉토리 복사 (-r: 재귀적)",
        "mv: 파일/디렉토리 이동 또는 이름 변경",
        "rm: 파일/디렉토리 삭제 (-r: 재귀, -f: 강제)",
        "touch: 빈 파일 생성 또는 시간 갱신",
        "file: 파일 종류 확인"
      ]
    },
    {
      title: "기본 명령어 - 파일 내용",
      icon: "📄",
      items: [
        "cat: 파일 내용 출력 (전체)",
        "head: 파일 앞부분 출력 (-n: 줄 수 지정)",
        "tail: 파일 뒷부분 출력 (-f: 실시간 추적)",
        "more: 페이지 단위 출력 (스페이스: 다음 페이지)",
        "less: 양방향 스크롤 (q: 종료)",
        "grep: 패턴 검색 (-i: 대소문자 무시, -r: 재귀)",
        "wc: 단어, 줄, 문자 수 세기 (-l: 줄 수)",
        "sort: 정렬 (-r: 역순, -n: 숫자)",
        "uniq: 중복 제거 (-c: 개수 표시)",
        "diff: 파일 비교"
      ]
    },
    {
      title: "파일 권한과 소유권",
      icon: "🔐",
      items: [
        "권한 구조: rwxrwxrwx (소유자/그룹/기타)",
        "r(4): 읽기, w(2): 쓰기, x(1): 실행",
        "chmod: 권한 변경 (chmod 755 file)",
        "chmod 기호: u(소유자), g(그룹), o(기타), a(전체)",
        "chmod u+x: 소유자에게 실행 권한 추가",
        "chown: 소유자 변경 (chown user file)",
        "chgrp: 그룹 변경 (chgrp group file)",
        "umask: 기본 권한 마스크 (보통 022)",
        "SUID(4000): 실행 시 소유자 권한으로",
        "SGID(2000): 실행 시 그룹 권한으로"
      ]
    },
    {
      title: "링크와 아이노드",
      icon: "🔗",
      items: [
        "아이노드(inode): 파일 메타데이터 저장 구조",
        "아이노드 정보: 파일 타입, 권한, 소유자, 크기, 시간",
        "하드 링크: 동일 아이노드 참조 (ln 원본 링크)",
        "심볼릭 링크: 경로를 가리킴 (ln -s 원본 링크)",
        "하드 링크 제한: 같은 파일시스템, 디렉토리 불가",
        "심볼릭 링크: 다른 파일시스템 가능, 디렉토리 가능",
        "ls -i: 아이노드 번호 확인",
        "stat: 파일 상세 정보 (아이노드 포함)",
        "링크 카운트: 하드 링크 삭제 시 감소, 0이면 삭제",
        "댕글링 링크: 원본이 삭제된 심볼릭 링크"
      ]
    },
    {
      title: "리다이렉션과 파이프",
      icon: "➡️",
      items: [
        ">: 표준 출력 리다이렉션 (덮어쓰기)",
        ">>: 표준 출력 리다이렉션 (추가)",
        "<: 표준 입력 리다이렉션",
        "2>: 표준 에러 리다이렉션",
        "&>: 표준 출력 + 에러 모두 리다이렉션",
        "2>&1: 표준 에러를 표준 출력으로",
        "| (파이프): 명령어 연결 (앞 출력 → 뒤 입력)",
        "tee: 화면 출력과 파일 저장 동시에",
        "xargs: 표준 입력을 명령어 인수로 변환",
        "/dev/null: 출력 버리기 (휴지통)"
      ]
    },
    {
      title: "정규 표현식",
      icon: "🔍",
      items: [
        ".: 임의의 한 문자",
        "*: 앞 문자 0회 이상 반복",
        "^: 줄의 시작",
        "$: 줄의 끝",
        "[abc]: a, b, c 중 하나",
        "[^abc]: a, b, c 제외",
        "[a-z]: 범위 지정",
        "\\: 특수문자 이스케이프",
        "grep 'pattern' file: 패턴 검색",
        "grep -E: 확장 정규 표현식 (egrep)"
      ]
    },
    {
      title: "쉘 환경 설정",
      icon: "⚙️",
      items: [
        "~/.bashrc: bash 쉘 설정 (비로그인 쉘)",
        "~/.bash_profile: bash 쉘 설정 (로그인 쉘)",
        "/etc/profile: 전역 환경 설정",
        "환경 변수: PATH, HOME, USER, SHELL",
        "export: 환경 변수 설정 및 내보내기",
        "echo $PATH: 환경 변수 값 출력",
        "alias: 명령어 별칭 설정 (alias ll='ls -l')",
        "source: 설정 파일 즉시 적용 (source ~/.bashrc)",
        "env: 모든 환경 변수 출력",
        "set: 쉘 변수 출력"
      ]
    },
    {
      title: "쉘 스크립트 기초",
      icon: "📝",
      items: [
        "#!/bin/bash: 셔뱅(shebang), 인터프리터 지정",
        "변수 선언: 변수명=값 (공백 없이)",
        "변수 참조: $변수명 또는 ${변수명}",
        "명령어 치환: $(명령어) 또는 `명령어`",
        "조건문: if [ 조건 ]; then ... fi",
        "반복문: for 변수 in 목록; do ... done",
        "while: while [ 조건 ]; do ... done",
        "조건 테스트: -f(파일), -d(디렉토리), -e(존재)",
        "수치 비교: -eq(같음), -ne(다름), -lt(작음)",
        "문자열 비교: =, !=, -z(빈 문자열)"
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
            <span className="text-4xl">🐧</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">리눅스 기초</h1>
              <p className="text-gray-600">설치, 기본 명령어, 파일 시스템</p>
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
          <h3 className="font-bold text-yellow-800 mb-3">💡 리눅스 기초 학습 전략</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• <strong>실습</strong>: VirtualBox로 리눅스 설치 후 직접 실습</li>
            <li>• <strong>핵심</strong>: 파일 시스템 구조, 기본 명령어 암기</li>
            <li>• <strong>권한</strong>: chmod 숫자/기호 방식 모두 숙지</li>
            <li>• <strong>빈출</strong>: 리다이렉션, 파이프, 정규 표현식</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`리눅스마스터 리눅스 기초 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`리눅스마스터 리눅스 기초 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`리눅스마스터 리눅스 기초 관련 질문입니다: "${currentQuestion}" - 예시 명령어와 함께 자세히 설명해주세요.`)}`}
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
