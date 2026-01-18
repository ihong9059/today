'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, isLoggedIn, logout, isLoading } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📜</span>
          <span className="font-bold text-gray-800">자격시험 가이드</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isLoading && (
            <>
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    <span className="hidden sm:inline">{user?.email}</span>
                    <span className="sm:hidden">{user?.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/login?returnUrl=${encodeURIComponent(pathname)}`}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
                  >
                    로그인
                  </Link>
                  <Link
                    href={`/signup?returnUrl=${encodeURIComponent(pathname)}`}
                    className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
