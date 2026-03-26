"use client";

const clientGroups = [
  {
    title: "건설 / 부동산",
    clients: [
      { name: "현대건설", short: "현대" },
      { name: "현대힐스테이트", short: "힐스테이트" },
      { name: "롯데건설", short: "롯데" },
      { name: "한화건설", short: "한화" },
      { name: "LH", short: "LH" },
    ],
  },
  {
    title: "유통 / 금융",
    clients: [
      { name: "롯데월드", short: "롯데월드" },
      { name: "홈플러스", short: "홈플러스" },
      { name: "하나금융글로벌캠퍼스", short: "하나금융" },
    ],
  },
  {
    title: "해외 파트너",
    clients: [
      { name: "도카이기켄 (일본)", short: "도카이기켄" },
      { name: "RESTAR (일본)", short: "RESTAR" },
      { name: "LUMITEC (스위스)", short: "LUMITEC" },
      { name: "OPTILED (일본)", short: "OPTILED" },
    ],
  },
  {
    title: "제조 / 기타",
    clients: [
      { name: "삼환전기", short: "삼환전기" },
      { name: "ALPS", short: "ALPS" },
    ],
  },
];

export default function Clients() {
  return (
    <section id="clients" className="relative py-32 overflow-hidden">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section header */}
        <div className="text-center mb-20 scroll-hidden">
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            Our Clients
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            신뢰하는 <span className="gradient-text">파트너사</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            국내외 주요 기업들과 함께 혁신적인 프로젝트를 수행하고 있습니다
          </p>
        </div>

        {/* Client groups */}
        <div className="grid md:grid-cols-2 gap-8">
          {clientGroups.map((group, gi) => (
            <div
              key={gi}
              className="scroll-hidden glass rounded-3xl p-8"
              style={{ transitionDelay: `${gi * 0.15}s` }}
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan" />
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.clients.map((client, ci) => (
                  <div
                    key={ci}
                    className="group px-6 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-accent-blue/30 transition-all duration-300 cursor-default"
                  >
                    <div className="text-white font-semibold group-hover:gradient-text transition-all text-sm">
                      {client.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust banner */}
        <div className="mt-16 scroll-hidden">
          <div className="glass rounded-3xl p-8 sm:p-12 text-center glow">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { value: "14+", label: "파트너사" },
                { value: "5+", label: "해외 파트너" },
                { value: "8+", label: "년 경력" },
                { value: "100+", label: "프로젝트" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-black gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 mt-2">
                    {stat.label}
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
