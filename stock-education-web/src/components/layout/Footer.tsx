'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">주식입문</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              주식 초보자를 위한 종합 투자 교육 플랫폼.
              기초부터 실전까지, AI와 함께 똑똑한 투자를 시작하세요.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li><Link href="/education" className="hover:text-white transition-colors">교육 센터</Link></li>
              <li><Link href="/recommend" className="hover:text-white transition-colors">AI 추천</Link></li>
              <li><Link href="/paper-trading" className="hover:text-white transition-colors">모의투자</Link></li>
              <li><Link href="/glossary" className="hover:text-white transition-colors">용어사전</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">법적 고지</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-yellow-900/30 border border-yellow-800/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-200 text-sm">
              <strong>투자 유의사항:</strong> 본 서비스에서 제공하는 정보는 투자 참고용이며,
              투자 권유가 아닙니다. 투자 결정에 따른 책임은 전적으로 이용자 본인에게 있습니다.
              과거의 수익률이 미래의 수익을 보장하지 않습니다.
            </p>
          </div>
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 주식입문. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
