'use client';

import Link from 'next/link';

const freeTabs = [
  { id: 'film-director', name: '영화 감독', icon: '🎬', href: '/course/free/film-director' },
  { id: 'renewable-energy', name: '신재생에너지', icon: '⚡', href: '/course/free/renewable-energy' },
  { id: 'elementary-teacher', name: '초등 선생님', icon: '👩‍🏫', href: '/course/free/elementary-teacher' },
  { id: 'welding-technician', name: '용접 기사', icon: '🔧', href: '/course/free/welding-technician' },
  { id: 'orchard-owner', name: '과수원 운영자', icon: '🍎', href: '/course/free/orchard-owner' },
];

interface FreeTabNavProps {
  currentCourse: string;
}

export default function FreeTabNav({ currentCourse }: FreeTabNavProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-2 text-sm text-gray-600 mb-2">
          <Link href="/" className="hover:text-rose-600">홈</Link>
          <span className="text-gray-400">›</span>
          <Link href="/course/free" className="hover:text-rose-600">Free 체험</Link>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-2">
          {freeTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                currentCourse === tab.id
                  ? 'bg-rose-600 text-white shadow-md'
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
