#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Python PC 90일 과정 페이지 생성 스크립트
- [level]/page.tsx: 코스 상세 페이지 (초급/중급/고급)
- [level]/lesson/[day]/page.tsx: 레슨 페이지 (프롬프트 포함)
"""

# ===== 코스 상세 페이지 ([level]/page.tsx) =====
level_page = r'''
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Play, Clock, Target, Code, Database, Globe } from 'lucide-react';

// 레벨별 강의 데이터
const levelData: { [key: string]: {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgColor: string;
  days: number;
  description: string;
  features: string[];
  lessons: { day: number; title: string; duration: string; description: string; app: string }[];
}} = {
  '초급': {
    id: 'beginner',
    title: 'Python 초급',
    subtitle: '문법 마스터 (15일)',
    icon: '🐍',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-500',
    days: 15,
    description: 'Python 기초 문법부터 함수, 클래스까지. 프로그래밍의 기본기를 탄탄하게!',
    features: ['변수와 자료형', '조건문/반복문', '함수와 모듈', '클래스 기초', '파일 입출력'],
    lessons: [
      { day: 1, title: 'Hello World & 자기소개', duration: '30분', description: 'Python 첫 실행, print/input 기초', app: '자기소개 프로그램' },
      { day: 2, title: '변수와 자료형', duration: '40분', description: 'int, float, str, 형변환', app: '단위 변환 계산기' },
      { day: 3, title: '연산자와 표현식', duration: '35분', description: '산술/비교/논리 연산자', app: '쇼핑 할인 계산기' },
      { day: 4, title: '조건문 (if-elif-else)', duration: '40분', description: '조건 분기, 중첩 조건문', app: '성적 등급 판정기' },
      { day: 5, title: '반복문 (for)', duration: '40분', description: 'for 루프, range(), 리스트 순회', app: '구구단 출력기' },
      { day: 6, title: '반복문 (while)', duration: '35분', description: 'while 루프, break/continue', app: '숫자 맞추기 게임' },
      { day: 7, title: '리스트와 튜플', duration: '45분', description: '리스트 생성, 인덱싱, 슬라이싱', app: '학생 성적 관리' },
      { day: 8, title: '딕셔너리', duration: '40분', description: '키-값 쌍, 딕셔너리 메서드', app: '영한 사전' },
      { day: 9, title: '집합 (Set)', duration: '35분', description: '집합 연산, 중복 제거', app: '로또 번호 생성기' },
      { day: 10, title: '문자열 처리', duration: '45분', description: '문자열 메서드, 포맷팅', app: '텍스트 분석기' },
      { day: 11, title: '함수 기초', duration: '40분', description: '함수 정의, 매개변수, 반환값', app: '계산기 (함수형)' },
      { day: 12, title: '함수 심화', duration: '45분', description: '*args, **kwargs, 람다', app: '통계 계산기' },
      { day: 13, title: '모듈과 패키지', duration: '40분', description: 'import, datetime, random', app: '날짜/시간 유틸리티' },
      { day: 14, title: '파일 입출력', duration: '45분', description: '파일 읽기/쓰기, with문', app: '메모장 프로그램' },
      { day: 15, title: '초급 종합 프로젝트', duration: '60분', description: '모든 개념 통합 프로젝트', app: '가계부 프로그램' },
    ]
  },
  '중급': {
    id: 'intermediate',
    title: 'Python 중급',
    subtitle: '웹 개발 & API (30일)',
    icon: '🌐',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500',
    days: 30,
    description: 'Flask 웹 개발, HTML/CSS/JS 연동, REST API 구축까지. 풀스택 개발자로 성장!',
    features: ['Flask 웹서버', 'HTML/CSS/JS', 'REST API', '크롤링', 'Docker 기초'],
    lessons: [
      { day: 16, title: 'Flask 설치와 Hello World', duration: '35분', description: 'Flask 기본 구조, 라우팅', app: '첫 웹서버' },
      { day: 17, title: 'HTML 템플릿 렌더링', duration: '40분', description: 'render_template, Jinja2', app: '프로필 페이지' },
      { day: 18, title: 'Jinja2 템플릿 문법', duration: '45분', description: '반복문, 조건문, 필터', app: '상품 목록 페이지' },
      { day: 19, title: 'CSS 스타일링', duration: '40분', description: 'static 폴더, CSS 연동', app: '포트폴리오 페이지' },
      { day: 20, title: 'JavaScript 연동', duration: '45분', description: 'JS 기초, DOM 조작', app: '동적 카운터' },
      { day: 21, title: 'Form 데이터 처리', duration: '50분', description: 'GET/POST, 폼 검증', app: '회원가입 폼' },
      { day: 22, title: '세션과 쿠키', duration: '45분', description: '세션 관리, 로그인 상태', app: '로그인 시스템' },
      { day: 23, title: 'JSON 데이터 처리', duration: '40분', description: 'json 모듈, 파일 저장', app: 'JSON 설정 관리자' },
      { day: 24, title: 'requests 라이브러리', duration: '45분', description: 'HTTP 요청, API 호출', app: '날씨 정보 조회' },
      { day: 25, title: 'REST API 호출', duration: '50분', description: 'GET/POST 요청, 헤더', app: '뉴스 헤드라인 수집기' },
      { day: 26, title: 'Flask REST API 만들기', duration: '55분', description: 'API 엔드포인트 설계', app: '할일 목록 API' },
      { day: 27, title: 'AJAX와 Fetch API', duration: '50분', description: '비동기 요청, JSON 응답', app: '실시간 검색 자동완성' },
      { day: 28, title: '외부 API 통합', duration: '45분', description: 'API 키 관리, 에러 처리', app: '환율 계산기' },
      { day: 29, title: '에러 핸들링과 로깅', duration: '40분', description: 'try-except, logging', app: 'API 모니터링 대시보드' },
      { day: 30, title: '파일 업로드', duration: '50분', description: '멀티파트 폼, 파일 저장', app: '이미지 갤러리' },
      { day: 31, title: 'Flask-WTF 폼 검증', duration: '45분', description: 'WTForms, CSRF 보호', app: '설문조사 폼' },
      { day: 32, title: '블루프린트 (모듈화)', duration: '50분', description: '앱 구조화, 블루프린트', app: '미니 블로그 (구조화)' },
      { day: 33, title: '정적 파일 관리', duration: '40분', description: '이미지, 폰트, CDN', app: '랜딩 페이지' },
      { day: 34, title: 'JavaScript DOM 심화', duration: '50분', description: '이벤트, 드래그앤드롭', app: '칸반보드' },
      { day: 35, title: 'JavaScript 이벤트', duration: '45분', description: '이벤트 리스너, 타이머', app: '인터랙티브 퀴즈' },
      { day: 36, title: 'Chart.js 연동', duration: '50분', description: '데이터 시각화, 차트', app: '데이터 시각화 대시보드' },
      { day: 37, title: 'Bootstrap 통합', duration: '45분', description: '반응형 UI, 컴포넌트', app: '반응형 관리자 페이지' },
      { day: 38, title: '이메일 발송', duration: '40분', description: 'smtplib, Flask-Mail', app: '문의하기 폼' },
      { day: 39, title: '스케줄링 (APScheduler)', duration: '45분', description: '주기적 작업, 배치', app: '자동 리포트 생성기' },
      { day: 40, title: '크롤링 (BeautifulSoup)', duration: '50분', description: 'HTML 파싱, 데이터 추출', app: '웹 스크래퍼' },
      { day: 41, title: '크롤링 (Selenium)', duration: '55분', description: '동적 페이지, 자동화', app: '동적 페이지 크롤러' },
      { day: 42, title: '배포 준비 (Gunicorn)', duration: '40분', description: 'WSGI, 프로덕션 설정', app: '프로덕션 설정' },
      { day: 43, title: 'Docker 기초', duration: '50분', description: 'Dockerfile, 컨테이너', app: 'Flask 앱 컨테이너화' },
      { day: 44, title: '테스트 (pytest)', duration: '45분', description: '단위 테스트, 픽스처', app: 'API 테스트 작성' },
      { day: 45, title: '중급 종합 프로젝트', duration: '90분', description: '풀스택 웹 애플리케이션', app: '북마크 관리 서비스' },
    ]
  },
  '고급': {
    id: 'advanced',
    title: 'Python 고급',
    subtitle: 'Database & 시스템 (45일)',
    icon: '🚀',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-500',
    days: 45,
    description: 'Database 연동, 인증/보안, WebSocket, 마이크로서비스까지. 프로 개발자로 도약!',
    features: ['SQLite/MySQL', 'ORM (SQLAlchemy)', 'JWT/OAuth', 'WebSocket', '마이크로서비스'],
    lessons: [
      { day: 46, title: 'SQLite 소개', duration: '40분', description: 'SQLite 기본, 연결', app: '주소록 데이터베이스' },
      { day: 47, title: 'SQL 기초 (SELECT, INSERT)', duration: '45분', description: 'CRUD 기본 쿼리', app: '도서 관리 시스템' },
      { day: 48, title: 'SQL 심화 (JOIN)', duration: '50분', description: 'UPDATE, DELETE, JOIN', app: '주문 관리 시스템' },
      { day: 49, title: 'Flask-SQLAlchemy ORM', duration: '55분', description: 'ORM 기초, 모델 정의', app: '블로그 시스템 (ORM)' },
      { day: 50, title: '관계형 모델링 (1:N)', duration: '50분', description: '외래키, 관계 설정', app: '게시판 (글+댓글)' },
      { day: 51, title: '관계형 모델링 (N:M)', duration: '50분', description: '다대다 관계, 중간 테이블', app: '태그 시스템' },
      { day: 52, title: '마이그레이션', duration: '45분', description: 'Flask-Migrate, Alembic', app: '스키마 버전 관리' },
      { day: 53, title: 'MySQL 연동', duration: '50분', description: 'MySQL 설치, 연결', app: 'MySQL 전환' },
      { day: 54, title: '트랜잭션', duration: '45분', description: 'ACID, 롤백', app: '포인트 시스템' },
      { day: 55, title: '인덱스와 최적화', duration: '50분', description: '쿼리 최적화, 실행계획', app: '대용량 데이터 처리' },
      { day: 56, title: 'Redis 캐싱', duration: '50분', description: 'Redis 연동, 캐시', app: '캐시 레이어 추가' },
      { day: 57, title: '비밀번호 해싱', duration: '40분', description: 'bcrypt, 솔트', app: '안전한 회원가입' },
      { day: 58, title: 'JWT 인증', duration: '50분', description: '토큰 발급, 검증', app: '토큰 기반 API' },
      { day: 59, title: 'OAuth 2.0', duration: '55분', description: 'Google 소셜 로그인', app: '소셜 로그인' },
      { day: 60, title: '역할 기반 접근제어', duration: '50분', description: 'RBAC, 권한 관리', app: '관리자/사용자 권한' },
      { day: 61, title: 'CORS 설정', duration: '40분', description: 'Flask-CORS, 도메인', app: '프론트엔드 분리' },
      { day: 62, title: 'HTTPS와 보안 헤더', duration: '45분', description: 'SSL, 보안 설정', app: '보안 설정 강화' },
      { day: 63, title: '입력 검증', duration: '45분', description: 'SQL Injection, XSS 방지', app: '보안 코드 리뷰' },
      { day: 64, title: 'Rate Limiting', duration: '40분', description: 'Flask-Limiter', app: 'API 요청 제한' },
      { day: 65, title: '로깅과 모니터링', duration: '45분', description: '구조화된 로깅', app: '중앙 로그 시스템' },
      { day: 66, title: '백업과 복구', duration: '45분', description: '자동 백업, 복구', app: '데이터 백업 시스템' },
      { day: 67, title: 'WebSocket 기초', duration: '50분', description: 'Flask-SocketIO', app: '실시간 채팅' },
      { day: 68, title: '실시간 알림', duration: '45분', description: '서버 푸시', app: '알림 시스템' },
      { day: 69, title: '파일 스트리밍', duration: '45분', description: '청크 전송', app: '대용량 파일 다운로드' },
      { day: 70, title: 'Server-Sent Events', duration: '45분', description: 'SSE 구현', app: '실시간 대시보드' },
      { day: 71, title: 'GraphQL 기초', duration: '50분', description: 'Graphene', app: 'GraphQL API' },
      { day: 72, title: 'gRPC 기초', duration: '50분', description: 'Protocol Buffers', app: 'gRPC 서비스' },
      { day: 73, title: '메시지 큐 (RabbitMQ)', duration: '50분', description: '발행/구독', app: '비동기 작업 처리' },
      { day: 74, title: 'Celery 비동기 작업', duration: '50분', description: '백그라운드 작업', app: '백그라운드 작업' },
      { day: 75, title: '마이크로서비스 기초', duration: '55분', description: '서비스 분리', app: '서비스 분리' },
      { day: 76, title: 'API Gateway', duration: '50분', description: '게이트웨이 패턴', app: '통합 게이트웨이' },
      { day: 77, title: '멀티스레딩', duration: '50분', description: 'Thread, Lock', app: '병렬 다운로더' },
      { day: 78, title: '멀티프로세싱', duration: '50분', description: 'Process, Pool', app: 'CPU 집약 작업' },
      { day: 79, title: 'Asyncio 비동기', duration: '55분', description: 'async/await, aiohttp', app: '비동기 크롤러' },
      { day: 80, title: 'FastAPI 소개', duration: '50분', description: 'FastAPI 기초', app: 'FastAPI 마이그레이션' },
      { day: 81, title: 'Pydantic', duration: '45분', description: '타입 힌팅, 검증', app: '데이터 검증' },
      { day: 82, title: '의존성 주입', duration: '45분', description: 'DI 패턴', app: 'DI 패턴 적용' },
      { day: 83, title: 'CI/CD 파이프라인', duration: '50분', description: 'GitHub Actions', app: 'GitHub Actions' },
      { day: 84, title: '모니터링 (Prometheus)', duration: '50분', description: '메트릭 수집', app: '메트릭 수집' },
      { day: 85, title: '로그 집계 (ELK)', duration: '50분', description: 'Elasticsearch, Kibana', app: '중앙 로그 시스템' },
      { day: 86, title: '부하 테스트', duration: '45분', description: 'Locust', app: '성능 테스트' },
      { day: 87, title: '최종 프로젝트 설계', duration: '60분', description: '요구사항, 설계', app: '커뮤니티 플랫폼 - 설계' },
      { day: 88, title: '최종 프로젝트 백엔드', duration: '90분', description: 'API 개발', app: '커뮤니티 플랫폼 - 백엔드' },
      { day: 89, title: '최종 프로젝트 프론트', duration: '90분', description: 'UI 개발', app: '커뮤니티 플랫폼 - 프론트' },
      { day: 90, title: '최종 프로젝트 배포', duration: '60분', description: '배포, 테스트', app: '커뮤니티 플랫폼 - 배포' },
    ]
  }
};

export default function PythonPCLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const levelInfo = levelData[level];

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    // 완료된 레슨 로드
    const saved = localStorage.getItem(`python-pc-${level}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [level]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!levelInfo) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">레벨을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-4">초급, 중급, 고급 중 선택해주세요.</p>
          <Link href="/courses" className="text-blue-600 hover:underline">
            강좌 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const progress = levelInfo.lessons.length > 0
    ? Math.round((completedDays.filter(d => levelInfo.lessons.some(l => l.day === d)).length / levelInfo.lessons.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
            </div>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4" />
          <span>코딩</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Python (PC) - {level}</span>
        </div>

        {/* 코스 헤더 */}
        <div className={`bg-gradient-to-r ${levelInfo.color} rounded-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{levelInfo.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{levelInfo.title}</h1>
              <p className="text-white/80">{levelInfo.subtitle}</p>
            </div>
          </div>
          <p className="text-lg text-white/90 mb-6">{levelInfo.description}</p>

          {/* 특징 태그 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {levelInfo.features.map((feature, idx) => (
              <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>

          {/* 진행률 */}
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>학습 진행률</span>
              <span>{progress}% ({completedDays.filter(d => levelInfo.lessons.some(l => l.day === d)).length}/{levelInfo.lessons.length}일)</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 레벨 선택 탭 */}
        <div className="flex gap-2 mb-6">
          {Object.keys(levelData).map((lvl) => (
            <Link
              key={lvl}
              href={`/course/coding/python-pc/${lvl}`}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                lvl === level
                  ? `${levelData[lvl].bgColor} text-white`
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {levelData[lvl].icon} {lvl} ({levelData[lvl].days}일)
            </Link>
          ))}
        </div>

        {/* 학습 방법 안내 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">📚 학습 방법</h3>
          <ol className="text-yellow-800 text-sm space-y-1">
            <li>1. 각 Day의 프롬프트를 Claude/Gemini/ChatGPT에 입력</li>
            <li>2. AI가 생성한 코드를 파일별로 저장</li>
            <li>3. VSCode에서 실행하고 결과 확인</li>
            <li>4. 코드를 이해하고 수정해보기</li>
          </ol>
        </div>

        {/* 강의 목록 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className={`p-4 bg-gradient-to-r ${levelInfo.color}`}>
            <h2 className="font-bold text-white flex items-center gap-2">
              <Play className="w-5 h-5" />
              {level} 강의 목록 ({levelInfo.lessons.length}일)
            </h2>
          </div>
          <div className="divide-y">
            {levelInfo.lessons.map((lesson) => {
              const isCompleted = completedDays.includes(lesson.day);
              return (
                <Link
                  key={lesson.day}
                  href={`/course/coding/python-pc/${level}/lesson/${lesson.day}`}
                  className="block p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : `bg-gradient-to-br ${levelInfo.color} text-white`
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold text-sm">{lesson.day}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          Day {lesson.day}: {lesson.title}
                        </h3>
                        {isCompleted && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            완료
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{lesson.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          {lesson.app}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
'''

print("Level page content generated!")
print(f"Length: {len(level_page)} characters")

# 파일로 저장
with open('python_pc_level_page.tsx', 'w', encoding='utf-8') as f:
    f.write(level_page)
print("Saved to python_pc_level_page.tsx")
