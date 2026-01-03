'use client';

import Link from 'next/link';

const careerChangeTabs = [
  { id: 'self-discovery', name: '나 발견하기', icon: '🔍', href: '/course/career-change/self-discovery' },
  { id: 'ai-era-trends', name: '유망 분야', icon: '🌟', href: '/course/career-change/ai-era-trends' },
  { id: 'ai-skills', name: 'AI 역량', icon: '🤖', href: '/course/career-change/ai-skills' },
  { id: 'new-field-entry', name: '진입 전략', icon: '🎯', href: '/course/career-change/new-field-entry' },
  { id: 'digital-career', name: '디지털 커리어', icon: '💻', href: '/course/career-change/digital-career' },
  { id: 'creator-economy', name: '크리에이터', icon: '🎨', href: '/course/career-change/creator-economy' },
  { id: 'freelance-startup', name: '프리랜서/창업', icon: '🚀', href: '/course/career-change/freelance-startup' },
  { id: 'transition-roadmap', name: '전환 로드맵', icon: '🗺️', href: '/course/career-change/transition-roadmap' },
];

interface CareerChangeTabNavProps {
  currentCourse: string;
}

export default function CareerChangeTabNav({ currentCourse }: CareerChangeTabNavProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-2 text-sm text-gray-600 mb-2">
          <Link href="/" className="hover:text-orange-600">홈</Link>
          <span className="text-gray-400">›</span>
          <Link href="/course/career-change" className="hover:text-orange-600">진로전환자</Link>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-2">
          {careerChangeTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                currentCourse === tab.id
                  ? 'bg-orange-600 text-white shadow-md'
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
