"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("문의가 접수되었습니다. 빠른 시일 내 답변 드리겠습니다.");
    setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: "주소",
      value: "경기도 용인시 기흥구 흥덕중앙로 120, 흥덕유타워 2404호",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: "전화",
      value: "031-627-2250",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "팩스",
      value: "0505-300-8065",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      label: "웹사이트",
      value: "www.uttec.co.kr",
    },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="section-divider" />
      <div className="blob-1 bottom-20 -left-40 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section header */}
        <div className="text-center mb-20 scroll-hidden">
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            Contact Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            문의 <span className="gradient-text">하기</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            UTTEC의 솔루션에 대해 궁금한 점이 있으시면
            언제든 연락주세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info + Map */}
          <div className="scroll-hidden-left">
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 glass rounded-xl p-5 card-hover"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 border border-accent-blue/20 flex items-center justify-center text-accent-blue flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">
                      {info.label}
                    </div>
                    <div className="text-white text-sm font-medium">
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden aspect-video relative glow">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 border border-accent-blue/20 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <p className="text-white font-semibold">흥덕유타워 2404호</p>
                  <p className="text-sm text-slate-400 mt-1">
                    경기도 용인시 기흥구 흥덕중앙로 120
                  </p>
                </div>
              </div>
              {/* Decorative grid */}
              <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 60">
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 6} x2="100" y2={i * 6} stroke="white" strokeWidth="0.2"/>
                ))}
                {Array.from({ length: 16 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 6.5} y1="0" x2={i * 6.5} y2="60" stroke="white" strokeWidth="0.2"/>
                ))}
              </svg>
            </div>
          </div>

          {/* Contact form */}
          <div className="scroll-hidden-right">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-all"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    회사명
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-all"
                    placeholder="회사명"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-all"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  문의 유형
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-all"
                >
                  <option value="" className="bg-navy-900">선택해주세요</option>
                  <option value="lighting" className="bg-navy-900">조명제어 솔루션</option>
                  <option value="parking" className="bg-navy-900">주차장 무선제어</option>
                  <option value="smart" className="bg-navy-900">스마트 제어</option>
                  <option value="partnership" className="bg-navy-900">파트너십 / 협업</option>
                  <option value="other" className="bg-navy-900">기타 문의</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-all resize-none"
                  placeholder="문의 내용을 입력해주세요..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-semibold text-lg hover:shadow-lg hover:shadow-accent-blue/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                문의 보내기
              </button>

              <p className="text-xs text-slate-500 text-center">
                * 필수 항목을 모두 입력해주세요. 영업일 기준 1~2일 내 답변드립니다.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
