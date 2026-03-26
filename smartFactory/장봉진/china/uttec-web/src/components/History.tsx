"use client";

const timelineData = [
  {
    year: "2016",
    title: "회사 설립",
    items: ["㈜유티텍(UTTEC) 설립", "기업부설연구소 설립", "벤처기업 인증"],
    color: "from-accent-blue to-indigo-500",
  },
  {
    year: "2017",
    title: "국제 인증 & 수출",
    items: [
      "KC / TELEC / CE 인증 획득",
      "스위스 LUMITEC 조명 모듈 수출",
      "일본 OPTILED 홈IoT 모듈 수출",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    year: "2018",
    title: "LoRa 상용화 & 특허",
    items: [
      "LoRa 클라우드 서버 국내 최초 상용화",
      "복합센서 디밍제어 특허 등록 (한국)",
      "LED 구동 제어 특허 등록 (일본)",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    year: "2019",
    title: "사업 확장",
    items: [
      "골프장 스포츠조명 제어 (필로스GC, 광릉CC)",
      "일본 도카이기켄 주륜장 시스템 개발",
    ],
    color: "from-pink-500 to-rose-500",
  },
  {
    year: "2020",
    title: "BLE Mesh 개발",
    items: [
      "BLE Mesh Network 기술 개발 완료",
      "흥덕유타워 본사 이전",
    ],
    color: "from-rose-500 to-orange-500",
  },
  {
    year: "2022",
    title: "일본 시장 진출",
    items: [
      "하네다공항 아나모리나역 주륜장 500대 수출",
      "일본 시장 본격 확대",
    ],
    color: "from-orange-500 to-amber-500",
  },
  {
    year: "2023",
    title: "대규모 수출",
    items: [
      "나고야 사카에역 주륜장 3,300대 수출",
      "하나금융글로벌캠퍼스 구축",
    ],
    color: "from-amber-500 to-yellow-500",
  },
  {
    year: "2024~",
    title: "AI & 미래",
    items: [
      "Smart Factory AI 모니터링 사업",
      "AI Education 플랫폼 확장",
      "글로벌 시장 확대 추진",
    ],
    color: "from-accent-cyan to-accent-teal",
  },
];

export default function History() {
  return (
    <section id="history" className="relative py-32 overflow-hidden">
      <div className="section-divider" />
      <div className="blob-2 top-60 -right-40 opacity-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section header */}
        <div className="text-center mb-20 scroll-hidden">
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            History
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            UTTEC <span className="gradient-text">연혁</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            2016년 설립 이후 끊임없는 혁신과 도전으로
            글로벌 시장을 선도하고 있습니다
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="timeline-line" />

          {timelineData.map((item, i) => (
            <div
              key={i}
              className={`scroll-hidden relative flex flex-col md:flex-row items-center gap-8 mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Content */}
              <div
                className={`flex-1 ${
                  i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                } pl-14 md:pl-0`}
              >
                <div
                  className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold mb-3`}
                >
                  {item.year}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((text, j) => (
                    <li key={j} className="text-slate-400 text-sm leading-relaxed">
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Center dot */}
              <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 z-10">
                <div
                  className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.color} border-4 border-navy-900 shadow-lg`}
                />
              </div>

              {/* Empty space for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
