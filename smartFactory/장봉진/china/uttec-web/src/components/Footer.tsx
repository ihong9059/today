"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center font-bold text-white text-lg">
                U
              </div>
              <div>
                <span className="text-xl font-bold text-white">UTTEC</span>
                <div className="text-[10px] text-slate-500 tracking-widest">
                  NETWORK SOLUTION
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              BLE Mesh Network 기반 무선 제어 솔루션 전문기업.
              조명, 주차장, 스마트 제어 분야에서 혁신을 이끕니다.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">바로가기</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "#about", label: "회사소개" },
                { href: "#technology", label: "기술" },
                { href: "#solutions", label: "솔루션" },
                { href: "#global", label: "글로벌" },
                { href: "#clients", label: "고객사" },
                { href: "#history", label: "연혁" },
                { href: "#contact", label: "문의" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-accent-cyan transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p>경기도 용인시 기흥구 흥덕중앙로 120</p>
              <p>흥덕유타워 2404호</p>
              <p>Tel: 031-627-2250</p>
              <p>Fax: 0505-300-8065</p>
              <p>www.uttec.co.kr</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; 2016-{new Date().getFullYear()} ㈜유티텍(UTTEC Co., Ltd.). All
            rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>대표: 홍광선</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>사업자등록번호</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
