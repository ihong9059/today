'use client';

import Link from 'next/link';

const teacherTabs = [
  { id: 'elementary', name: '초등교사', icon: '🌱', href: '/course/teacher/elementary' },
  { id: 'middle', name: '중등교사', icon: '📚', href: '/course/teacher/middle' },
  { id: 'high', name: '고등교사', icon: '🎓', href: '/course/teacher/high' },
];

interface TeacherTabNavProps {
  currentLevel: string;
}

export default function TeacherTabNav({ currentLevel }: TeacherTabNavProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-2 text-sm text-gray-600 mb-2">
          <Link href="/" className="hover:text-indigo-600">홈</Link>
          <span className="text-gray-400">›</span>
          <Link href="/course/teacher" className="hover:text-indigo-600">교사/교육자</Link>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-2">
          {teacherTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                currentLevel === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
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
