"use client";

export default function Global() {
  const certifications = [
    { name: "KC", region: "한국", desc: "한국 인증" },
    { name: "TELEC", region: "일본", desc: "일본 무선 인증" },
    { name: "CE", region: "유럽", desc: "유럽 적합성 인증" },
    { name: "벤처기업", region: "한국", desc: "벤처기업 인증" },
    { name: "기업연구소", region: "한국", desc: "기업부설연구소" },
  ];

  const patents = [
    { country: "한국", title: "복합센서 디밍제어", number: "10-1623345" },
    { country: "일본", title: "LED 구동 제어", number: "5982528" },
  ];

  const exports = [
    {
      country: "일본",
      flag: "🇯🇵",
      items: [
        { year: "2022", desc: "하네다공항 아나모리나역 주륜장 500대" },
        { year: "2023", desc: "나고야 사카에역 주륜장 3,300대" },
      ],
    },
    {
      country: "스위스",
      flag: "🇨🇭",
      items: [{ year: "2017~", desc: "LUMITEC 조명 모듈 수출" }],
    },
    {
      country: "일본",
      flag: "🇯🇵",
      items: [{ year: "2017~", desc: "OPTILED 홈IoT 모듈 수출" }],
    },
  ];

  // Simple SVG world map dots (simplified representation)
  const mapDots = [
    // Korea
    { cx: 76, cy: 38, label: "본사", active: true },
    // Japan
    { cx: 82, cy: 36, label: "일본", active: true },
    // Switzerland
    { cx: 48, cy: 32, label: "스위스", active: true },
    // Europe general
    { cx: 50, cy: 30, label: "", active: false },
  ];

  return (
    <section id="global" className="relative py-32 overflow-hidden">
      <div className="section-divider" />
      <div className="blob-1 top-20 -left-40 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section header */}
        <div className="text-center mb-20 scroll-hidden">
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            Global Presence
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            글로벌 <span className="gradient-text">인증 &amp; 수출</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            국제 인증과 해외 수출을 통해 글로벌 시장에서
            기술력을 인정받고 있습니다
          </p>
        </div>

        {/* World map */}
        <div className="scroll-hidden-scale mb-16">
          <div className="glass rounded-3xl p-8 max-w-4xl mx-auto glow">
            <svg
              viewBox="0 0 100 60"
              className="w-full h-auto"
              style={{ maxHeight: "400px" }}
            >
              {/* Simple world outline - dots grid */}
              {Array.from({ length: 40 }).map((_, row) =>
                Array.from({ length: 80 }).map((_, col) => {
                  const x = 5 + col * 1.2;
                  const y = 5 + row * 1.4;
                  // Very simplified continental shapes
                  const isLand =
                    // North America
                    (x > 10 && x < 30 && y > 10 && y < 35 && Math.random() > 0.4) ||
                    // South America
                    (x > 18 && x < 30 && y > 35 && y < 55 && Math.random() > 0.5) ||
                    // Europe
                    (x > 42 && x < 55 && y > 12 && y < 30 && Math.random() > 0.4) ||
                    // Africa
                    (x > 42 && x < 58 && y > 28 && y < 50 && Math.random() > 0.5) ||
                    // Asia
                    (x > 55 && x < 90 && y > 12 && y < 42 && Math.random() > 0.35) ||
                    // Australia
                    (x > 78 && x < 92 && y > 42 && y < 54 && Math.random() > 0.5);
                  return isLand ? (
                    <circle
                      key={`${row}-${col}`}
                      cx={x}
                      cy={y}
                      r={0.3}
                      fill="rgba(59, 130, 246, 0.15)"
                    />
                  ) : null;
                })
              )}

              {/* Active locations */}
              {mapDots
                .filter((d) => d.active)
                .map((dot, i) => (
                  <g key={i}>
                    {/* Pulse ring */}
                    <circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r={2}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth={0.3}
                      opacity={0.5}
                    >
                      <animate
                        attributeName="r"
                        from="1"
                        to="4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    {/* Core dot */}
                    <circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r={1}
                      fill="#3B82F6"
                    />
                    <circle
                      cx={dot.cx}
                      cy={dot.cy}
                      r={0.5}
                      fill="white"
                    />
                    {/* Label */}
                    {dot.label && (
                      <text
                        x={dot.cx}
                        y={dot.cy - 2.5}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="2"
                        fontWeight="bold"
                      >
                        {dot.label}
                      </text>
                    )}
                  </g>
                ))}

              {/* Connection lines */}
              <line
                x1="76"
                y1="38"
                x2="82"
                y2="36"
                stroke="url(#lineGrad)"
                strokeWidth="0.3"
                strokeDasharray="1,1"
              />
              <line
                x1="76"
                y1="38"
                x2="48"
                y2="32"
                stroke="url(#lineGrad)"
                strokeWidth="0.3"
                strokeDasharray="1,1"
              />
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16 scroll-hidden">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            국제 인증
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="cert-badge"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="mr-2 text-white font-bold">{cert.name}</span>
                <span className="text-slate-400">| {cert.region}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Patents */}
        <div className="mb-16 scroll-hidden">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            특허 보유
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {patents.map((patent, i) => (
              <div key={i} className="glass rounded-2xl p-6 card-hover">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-semibold">
                    {patent.country}
                  </span>
                  <span className="text-xs text-slate-500">{patent.number}</span>
                </div>
                <div className="text-white font-semibold">{patent.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Export achievements */}
        <div className="scroll-hidden">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            해외 수출 실적
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {exports.map((exp, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 card-hover glow-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{exp.flag}</span>
                  <span className="text-white font-bold text-lg">
                    {exp.country}
                  </span>
                </div>
                <div className="space-y-3">
                  {exp.items.map((item, j) => (
                    <div key={j}>
                      <span className="text-accent-cyan text-sm font-semibold">
                        {item.year}
                      </span>
                      <div className="text-sm text-slate-300 mt-1">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
