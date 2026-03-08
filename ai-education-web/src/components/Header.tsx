'use client';

import Link from 'next/link';
import { BookOpen, Home, Map, GraduationCap, FileText, HelpCircle, Bot } from 'lucide-react';

const VERSION = "v1.5.1";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AI 첫걸음</span>
            <span className="text-xs text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">{VERSION}</span>
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
            <Link
              href="/report"
              className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>보고서</span>
            </Link>
            <Link
              href="/guide"
              className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span>실습 가이드</span>
            </Link>
            <Link
              href="/transformer"
              className="flex items-center space-x-1 text-gray-600 hover:text-violet-600 transition-colors"
            >
              <Bot className="h-4 w-4" />
              <span>Transformer</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
