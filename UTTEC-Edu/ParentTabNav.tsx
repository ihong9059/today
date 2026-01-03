'use client';

import Link from 'next/link';

const parentTabs = [
  { id: 'ai-basics', name: '1단계: AI 기초', icon: '🤖', href: '/course/parent/ai-basics' },
  { id: 'mindset', name: '2단계: 마인드셋', icon: '💡', href: '/course/parent/mindset' },
  { id: 'education', name: '3단계: 교육 실전', icon: '📚', href: '/course/parent/education' },
  { id: 'career', name: '4단계: 진로', icon: '🧭', href: '/course/parent/career' },
];

interface ParentTabNavProps {
  currentCourse: string;
}

export default function ParentTabNav({ currentCourse }: ParentTabNavProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-2 text-sm text-gray-600 mb-2">
          <Link href="/" className="hover:text-purple-600">홈</Link>
          <span className="text-gray-400">›</span>
          <Link href="/course/parent" className="hover:text-purple-600">학부형 트랙</Link>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-2">
          {parentTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                currentCourse === tab.id
                  ? 'bg-purple-600 text-white shadow-md'
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
