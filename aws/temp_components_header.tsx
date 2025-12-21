'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, User } from 'lucide-react';

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export default function Header({ isLoggedIn = false, userName = '학습자', onLogout }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 왼쪽: 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold">UTTEC Edu</span>
            </Link>
          </div>

          {/* 오른쪽: 메뉴 */}
          <div className="flex items-center space-x-6">
            <Link
              href="/about"
              className={`transition ${isActive('/about') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              소개
            </Link>
            <Link
              href="/mbti"
              className={`transition ${isActive('/mbti') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              MBTI
            </Link>
            <Link
              href="/courses"
              className={`transition ${isActive('/courses') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              강좌 목록
            </Link>
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className={`px-3 py-1 rounded-lg transition ${
                  isActive('/dashboard')
                    ? 'bg-yellow-400 text-slate-900 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                내강의
              </Link>
            )}
            <Link
              href="/faq"
              className={`transition ${isActive('/faq') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
            >
              FAQ
            </Link>

            {isLoggedIn ? (
              <>
                <button className="text-gray-300 hover:text-white transition relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    1
                  </span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                  <User className="w-5 h-5" />
                  <span>{userName}님</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-gray-300 hover:text-white transition"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`transition ${isActive('/login') ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
