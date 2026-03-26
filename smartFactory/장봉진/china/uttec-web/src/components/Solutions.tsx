"use client";

import { useState } from "react";

const solutions = [
  {
    id: "lighting",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="9" y1="18" x2="15" y2="18"/>
        <line x1="10" y1="22" x2="14" y2="22"/>
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
      </svg>
    ),
    title: "조명제어",
    subtitle: "Lighting Control",
    color: "from-amber-400 to-orange-500",
    bgColor: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20",
    features: [
      "지하주차장 무선 디밍 (국내 최초)",
      "골프장 스포츠조명 제어",
      "건물 보안등 원격 관리",
      "에너지 절감 최적화",
    ],
    cases: ["필로스GC", "광릉CC", "현대힐스테이트", "홈플러스"],
    desc: "BLE Mesh Network 기반 무선 디밍 시스템으로 조명을 지능적으로 제어합니다. 차량 감지 시 자동 밝기 조절로 최대 70% 에너지를 절감합니다.",
  },
  {
    id: "parking",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
        <path d="M16 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
        <line x1="1" y1="16" x2="16" y2="16"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="13.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: "주차장 무선제어",
    subtitle: "Parking Control",
    color: "from-accent-blue to-indigo-500",
    bgColor: "from-accent-blue/10 to-indigo-500/10",
    borderColor: "border-accent-blue/20",
    features: [
      "빈 주차공간 실시간 확인",
      "침수 감지 시스템",
      "일본 주륜장(자전거 주차장)",
      "주차 유도 시스템",
    ],
    cases: ["하네다공항 아나모리나역 500대", "나고야 사카에역 3,300대", "롯데월드"],
    desc: "무선 센서 기반 스마트 주차 관리 시스템입니다. 빈 주차공간 확인부터 침수 감지까지, 주차장 운영의 모든 것을 혁신합니다.",
  },
  {
    id: "smart",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "스마트 제어",
    subtitle: "Smart Control",
    color: "from-accent-cyan to-accent-teal",
    bgColor: "from-accent-cyan/10 to-accent-teal/10",
    borderColor: "border-accent-cyan/20",
    features: [
      "스마트팜 (온도/습도/CO2/조도)",
      "Smart Factory AI 모니터링",
      "AI Education 플랫폼",
      "실시간 환경 데이터 분석",
    ],
    cases: ["스마트팜 실증", "Smart Factory AI", "AI Education"],
    desc: "IoT 센서와 AI 기술을 결합한 차세대 스마트 제어 솔루션입니다. 농업, 제조, 교육 분야에서 데이터 기반 의사결정을 지원합니다.",
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="relative py-32 overflow-hidden">
      <div className="section-divider" />
      <div className="blob-1 -bottom-40 -right-40 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section header */}
        <div className="text-center mb-20 scroll-hidden">
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            Solutions
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            비즈니스 <span className="gradient-text">솔루션</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            BLE Mesh Network 기술을 기반으로 3가지 핵심 사업 영역에서
            혁신적인 솔루션을 제공합니다
          </p>
        </div>

        {/* Solution tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          {solutions.map((sol, i) => (
            <button
              key={sol.id}
              onClick={() => setActive(i)}
              className={`scroll-hidden flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-500 ${
                active === i
                  ? `glass-strong glow bg-gradient-to-r ${sol.bgColor} border ${sol.borderColor}`
                  : "glass hover:bg-white/5"
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span
                className={`${
                  active === i ? "text-white" : "text-slate-400"
                } transition-colors`}
              >
                {sol.icon}
              </span>
              <div className="text-left">
                <div
                  className={`font-semibold ${
                    active === i ? "text-white" : "text-slate-300"
                  } transition-colors`}
                >
                  {sol.title}
                </div>
                <div className="text-xs text-slate-500">{sol.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active solution detail */}
        {solutions.map((sol, i) => (
          <div
            key={sol.id}
            className={`transition-all duration-500 ${
              active === i
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 absolute pointer-events-none"
            }`}
          >
            {active === i && (
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Info */}
                <div>
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${sol.bgColor} border ${sol.borderColor} mb-6`}
                  >
                    {sol.icon}
                    <span className="text-white font-semibold">{sol.title}</span>
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {sol.desc}
                  </p>

                  <h4 className="text-white font-semibold mb-4">주요 기능</h4>
                  <div className="space-y-3 mb-8">
                    {sol.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${sol.color} flex items-center justify-center flex-shrink-0`}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                        <span className="text-slate-300">{f}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-white font-semibold mb-4">주요 사례</h4>
                  <div className="flex flex-wrap gap-2">
                    {sol.cases.map((c, j) => (
                      <span
                        key={j}
                        className={`px-4 py-2 rounded-full text-sm glass border ${sol.borderColor} text-slate-300`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Visual */}
                <div className="flex items-center justify-center">
                  <div className={`glass rounded-3xl p-8 w-full max-w-md aspect-square flex flex-col items-center justify-center glow relative overflow-hidden`}>
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${sol.bgColor} opacity-50`} />

                    <div className="relative z-10 text-center">
                      <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${sol.color} flex items-center justify-center mb-6 shadow-2xl`}>
                        <span className="scale-150 text-white">{sol.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {sol.title}
                      </h3>
                      <p className="text-slate-400">{sol.subtitle}</p>

                      {/* Decorative circles */}
                      <div className="mt-8 flex justify-center gap-3">
                        {[1, 2, 3].map((n) => (
                          <div
                            key={n}
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${sol.color}`}
                            style={{ opacity: 0.3 + n * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Floating decorations */}
                    <div className="absolute top-6 right-6 w-20 h-20 rounded-full border border-white/5 animate-float" />
                    <div
                      className="absolute bottom-10 left-6 w-14 h-14 rounded-full border border-white/5 animate-float"
                      style={{ animationDelay: "2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
