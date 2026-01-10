'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LinuxMasterPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    { id: '1', name: '1급', desc: '리눅스 전문가', color: 'from-yellow-500 to-orange-600', questions: '필기+실기', difficulty: '상' },
    { id: '2', name: '2급', desc: '리눅스 관리자', color: 'from-orange-500 to-red-600', questions: '필기+실기', difficulty: '중' },
  ];

  const subjects = [
    { name: "리눅스 기초", path: "linux-basics", icon: "🐧", desc: "설치, 기본 명령어, 파일 시스템" },
    { name: "시스템 관리", path: "system-admin", icon: "⚙️", desc: "사용자, 프로세스, 패키지 관리" },
    { name: "네트워크 관리", path: "network-admin", icon: "🌐", desc: "네트워크 설정, 서비스 운영" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "기출문제 및 시험 전략" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
            <span>←</span>
            <span>IT·정보통신 카테고리로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🐧</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">리눅스마스터</h1>
              <p className="text-gray-600">Linux Master (한국정보통신진흥협회)</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            리눅스 시스템의 설치, 운영, 관리 능력을 검증하는 국가공인 민간자격증입니다.
            IT 인프라 관리, 서버 운영에 필수적인 리눅스 역량을 인정받을 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">국가공인 민간자격</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">연 4회 시행</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">1급/2급 구분</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedLevel === level.id
                  ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-yellow-300'
              }`}
            >
              <div className={`text-lg font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                리눅스마스터 {level.name}
              </div>
              <div className="text-sm font-medium text-gray-700">{level.desc}</div>
              <div className="text-xs text-gray-500 mt-1">{level.questions} · 난이도: {level.difficulty}</div>
            </button>
          ))}
        </div>

        {selectedLevel && (
          <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-2">
              리눅스마스터 {levels.find(l => l.id === selectedLevel)?.name} 안내
            </h3>
            <p className="text-yellow-700 text-sm">
              {selectedLevel === '1' && '리눅스 시스템의 고급 설정, 서버 구축, 보안 설정 등 전문적인 능력을 평가합니다. 1차(필기) + 2차(실기) 구성입니다.'}
              {selectedLevel === '2' && '리눅스 시스템 운영 및 관리에 필요한 기본적인 능력을 평가합니다. 1차(필기) + 2차(실기) 구성이며, 입문용으로 적합합니다.'}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 학습 영역</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.path}
                href={`/category/it/linux-master/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-colors border border-yellow-100"
              >
                <span className="text-3xl">{subject.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="ml-auto text-yellow-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 정보</h2>
          <Link
            href="/category/it/linux-master/exam"
            className="block p-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">시험 구성 및 합격 기준</h3>
                <p className="text-yellow-100 text-sm">응시자격, 시험과목, 합격기준 안내</p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </Link>
        </div>

        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">💡 리눅스마스터 활용 TIP</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• <strong>취업</strong>: 서버 관리, DevOps, 클라우드 엔지니어 채용 시 우대</li>
            <li>• <strong>경력개발</strong>: LPIC, RHCSA 등 국제 자격 취득의 기초</li>
            <li>• <strong>실무</strong>: 서버 구축/운영, 컨테이너 환경에 직접 활용</li>
            <li>• <strong>공무원</strong>: IT직 공무원 채용 시 가산점 (2급 이상)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
