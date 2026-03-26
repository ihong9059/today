"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="counter-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  const stats = [
    { value: 40, suffix: "+", label: "년 개발 경력", desc: "CEO 홍광선" },
    { value: 2016, suffix: "", label: "년 설립", desc: "㈜유티텍" },
    { value: 3, suffix: "명", label: "개발 인력", desc: "전문 R&D" },
    { value: 3800, suffix: "+", label: "수출 대수", desc: "일본 주륜장" },
  ];

  const ceoCareer = [
    { year: "1985", title: "삼성전기 입사", desc: "Audio Deck, ECR Printer" },
    { year: "1990s", title: "CATV System", desc: "시장 점유율 70% 달성" },
    { year: "2000s", title: "디지털 방송", desc: "이스라엘 MATAV, Skylife STB" },
    { year: "2016", title: "UTTEC 설립", desc: "BLE Mesh Network 사업" },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="blob-1 top-20 -right-60 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 scroll-hidden">
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            About Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            회사 <span className="gradient-text">소개</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            40년 이상의 기술 축적을 바탕으로 BLE Mesh Network 기반
            무선 제어 솔루션을 선도하는 기업
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="scroll-hidden glass rounded-2xl p-8 text-center card-hover glow-hover"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Company + CEO */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Company info */}
          <div className="scroll-hidden-left">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-white text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </span>
              ㈜유티텍
            </h3>
            <div className="space-y-4 text-slate-300">
              <p className="leading-relaxed">
                ㈜유티텍(UTTEC Co., Ltd.)은 2016년 설립된 BLE Mesh Network
                전문 기업으로, <strong className="text-white">&ldquo;Network Solution&rdquo;</strong>이라는
                슬로건 아래 무선 통신 기반의 혁신적인 제어 솔루션을 제공합니다.
              </p>
              <p className="leading-relaxed">
                국내 최초 지하주차장 무선 디밍 시스템을 상용화하였으며,
                일본 하네다공항, 나고야 등 해외 시장에도 성공적으로 진출하였습니다.
                KC, TELEC, CE 등 국제 인증을 보유하고 있으며, 벤처기업 및
                기업연구소로 인증받은 기술력을 갖추고 있습니다.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: "📍", label: "본사", value: "경기도 용인시 기흥구" },
                { icon: "📞", label: "연락처", value: "031-627-2250" },
                { icon: "🌐", label: "웹사이트", value: "www.uttec.co.kr" },
                { icon: "🏢", label: "설립", value: "2016년 06월" },
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <div className="text-xs text-slate-500 mb-1">{item.label}</div>
                  <div className="text-sm text-white font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CEO career */}
          <div className="scroll-hidden-right">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-teal flex items-center justify-center text-white text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              CEO 홍광선
            </h3>
            <p className="text-slate-400 mb-6">
              1985년 삼성전기를 시작으로 40년 이상의 개발 경력을 보유한
              기술 전문 경영인
            </p>

            <div className="space-y-4">
              {ceoCareer.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start glass rounded-xl p-4 card-hover"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 border border-accent-blue/20 flex items-center justify-center">
                    <span className="text-accent-cyan font-bold text-sm">
                      {item.year}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item.title}</div>
                    <div className="text-sm text-slate-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
