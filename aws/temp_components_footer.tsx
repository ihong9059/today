import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-white font-semibold">UTTEC Edu</span>
            </div>
            <p className="text-sm">
              임베디드 개발자 사관으로 시작하는 HW 마스터 여정
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition">홈</Link></li>
              <li><Link href="/about" className="hover:text-white transition">소개</Link></li>
              <li><Link href="/courses" className="hover:text-white transition">강좌 목록</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">고객 지원</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-white transition">이용약관</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">개인정보처리방침</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">고객센터</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
