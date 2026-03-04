'use client';

import Link from 'next/link';
import { BookOpen, Home, Map, GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI 첫걸음</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>홈</span>
            </Link>
            <Link
              href="/curriculum"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>커리큘럼</span>
            </Link>
            <Link
              href="/roadmap"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Map className="h-4 w-4" />
              <span>로드맵</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
