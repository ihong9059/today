'use client';

import Link from 'next/link';

const trackTabs = [
  { id: 'parent', name: '학부형', icon: '👨‍👩‍👧', href: '/course/parent' },
  { id: 'beginner', name: '사회초년생', icon: '💼', href: '/course/beginner' },
  { id: 'teacher', name: '교사/교육자', icon: '👩‍🏫', href: '/course/teacher' },
  { id: 'career-change', name: '진로전환자', icon: '🔄', href: '/course/career-change' },
  { id: 'free', name: 'Free 체험', icon: '🎁', href: '/course/free' },
];

interface TrackTabNavProps {
  currentTrack: string;
}

export default function TrackTabNav({ currentTrack }: TrackTabNavProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 py-2 text-sm text-gray-600 mb-2">
          <Link href="/" className="hover:text-purple-600">홈</Link>
          <span className="text-gray-400">›</span>
          <span className="text-purple-600 font-medium">특화 트랙</span>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide gap-1 pb-2">
          {trackTabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                currentTrack === tab.id
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
