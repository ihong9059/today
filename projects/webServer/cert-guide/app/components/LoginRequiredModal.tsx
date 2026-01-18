'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">로그인이 필요합니다</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="text-center py-4">
            <div className="text-5xl mb-4">🔐</div>
            <p className="text-gray-600 mb-2">
              AI 학습 기능은 로그인 후 이용할 수 있습니다.
            </p>
            <p className="text-sm text-gray-500">
              로그인하시면 모든 AI 학습 기능을 무제한으로 사용하실 수 있습니다.
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <Link
              href={`/login?returnUrl=${encodeURIComponent(pathname)}`}
              className="block w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg text-center font-medium text-white transition-colors"
            >
              로그인하기
            </Link>
            <Link
              href={`/signup?returnUrl=${encodeURIComponent(pathname)}`}
              className="block w-full p-3 border border-gray-300 hover:bg-gray-50 rounded-lg text-center font-medium text-gray-700 transition-colors"
            >
              회원가입하기
            </Link>
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full p-2 text-gray-500 hover:text-gray-700 text-sm"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  );
}
