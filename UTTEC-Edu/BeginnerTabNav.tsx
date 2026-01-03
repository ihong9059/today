'use client';

import Link from 'next/link';

const beginnerTabs = [
  { id: 'ai-workplace', name: 'AI 직장생활', icon: '💼', href: '/course/beginner/ai-workplace' },
  { id: 'ai-tools-work', name: 'AI 도구 활용', icon: '🛠️', href: '/course/beginner/ai-tools-work' },
  { id: 'prompt-master', name: '프롬프트 마스터', icon: '✍️', href: '/course/beginner/prompt-master' },
  { id: 'career-development', name: '커리어 개발', icon: '📈', href: '/course/beginner/career-development' },
  { id: 'portfolio-building', name: '포트폴리오', icon: '🎨', href: '/course/beginner/portfolio-building' },
];

interface BeginnerTabNavProps {
  currentCourse: string;
}

export default function BeginnerTabNav({ currentCourse }: BeginnerTabNavProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-2 text-sm text-gray-600 mb-2">
          <Link href="/" className="hover:text-cyan-600">홈</Link>
          <span className="text-gray-400">›</span>
          <Link href="/course/beginner" className="hover:text-cyan-600">사회초년생</Link>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-2">
          {beginnerTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                currentCourse === tab.id
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
