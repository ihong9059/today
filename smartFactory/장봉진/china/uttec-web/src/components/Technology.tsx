"use client";

import { useEffect, useRef } from "react";

export default function Technology() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = (canvas.width = 500);
    const h = (canvas.height = 400);

    // Define mesh nodes
    const nodes = [
      { x: 250, y: 60, label: "Gateway", color: "#3B82F6", r: 22 },
      { x: 120, y: 150, label: "Node", color: "#06B6D4", r: 16 },
      { x: 380, y: 150, label: "Node", color: "#06B6D4", r: 16 },
      { x: 60, y: 260, label: "Node", color: "#14B8A6", r: 14 },
      { x: 200, y: 240, label: "Node", color: "#14B8A6", r: 14 },
      { x: 320, y: 260, label: "Node", color: "#14B8A6", r: 14 },
      { x: 440, y: 240, label: "Node", color: "#14B8A6", r: 14 },
      { x: 130, y: 340, label: "Server", color: "#8B5CF6", r: 18 },
      { x: 370, y: 340, label: "Server", color: "#8B5CF6", r: 18 },
    ];

    const connections = [
      [0, 1], [0, 2],
      [1, 3], [1, 4],
      [2, 5], [2, 6],
      [3, 4], [4, 5], [5, 6],
      [3, 7], [4, 7],
      [5, 8], [6, 8],
    ];

    let progress = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      progress += 0.005;

      // Draw connections with animated pulse
      connections.forEach(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Animated data packet
        const t = (progress * 2 + i * 0.3) % 1;
        const px = na.x + (nb.x - na.x) * t;
        const py = na.y + (nb.y - na.y) * t;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 8);
        glow.addColorStop(0, "rgba(6, 182, 212, 0.8)");
        glow.addColorStop(1, "rgba(6, 182, 212, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node) => {
        // Outer glow
        const glow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.r * 3
        );
        glow.addColorStop(0, node.color + "30");
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.color + "40";
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Label
        ctx.font = "11px Pretendard, sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + node.r + 16);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      ),
      title: "암호화 통신",
      desc: "강력한 암호화 프로토콜로 안전한 데이터 전송 보장",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: "초저전력",
      desc: "BLE 기반 저에너지 통신으로 배터리 수명 극대화",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      title: "200m+ 통신거리",
      desc: "장거리 통신으로 넓은 영역 커버리지 확보",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
          <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
          <line x1="12" y1="20" x2="12.01" y2="20"/>
        </svg>
      ),
      title: "Mesh 네트워크",
      desc: "그물망 구조로 음영지역 없는 완벽한 연결",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ),
      title: "태양광 + 배터리",
      desc: "독립적 전원 시스템으로 어디서나 설치 가능",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: "클라우드 서버",
      desc: "Gateway → Node → Server 실시간 모니터링",
    },
  ];

  return (
    <section id="technology" className="relative py-32 overflow-hidden">
      <div className="section-divider" />
      <div className="blob-2 top-40 -left-60 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Section header */}
        <div className="text-center mb-20 scroll-hidden">
          <span className="text-accent-cyan text-sm font-semibold tracking-widest uppercase">
            Core Technology
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            BLE <span className="gradient-text">Mesh Network</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Bluetooth Low Energy 기반 Mesh 네트워크 기술로
            안정적이고 효율적인 무선 통신 인프라를 구축합니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mesh diagram */}
          <div className="scroll-hidden-left flex justify-center">
            <div className="relative glass rounded-3xl p-6 glow">
              <canvas
                ref={canvasRef}
                width={500}
                height={400}
                className="w-full max-w-[500px] h-auto"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-slate-500">
                <span>Gateway</span>
                <span>Mesh Node</span>
                <span>Server</span>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <div
                key={i}
                className="scroll-hidden glass rounded-2xl p-6 card-hover glow-hover group"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 border border-accent-blue/20 flex items-center justify-center text-accent-blue mb-4 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h4 className="text-white font-semibold mb-2">{feat.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture diagram */}
        <div className="mt-24 scroll-hidden">
          <div className="glass rounded-3xl p-8 sm:p-12">
            <h3 className="text-xl font-bold text-white mb-8 text-center">
              시스템 아키텍처
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
              {[
                { name: "센서/디바이스", sub: "조명, 주차센서, 환경센서", color: "from-accent-teal to-emerald-500" },
                { name: "BLE Mesh Node", sub: "무선 중계, 데이터 수집", color: "from-accent-cyan to-accent-blue" },
                { name: "Gateway", sub: "프로토콜 변환, 통신", color: "from-accent-blue to-indigo-500" },
                { name: "Cloud Server", sub: "데이터 분석, AI 처리", color: "from-indigo-500 to-purple-500" },
                { name: "모니터링", sub: "대시보드, 알림, 제어", color: "from-purple-500 to-pink-500" },
              ].map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="text-center min-w-[140px]">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg`}
                    >
                      {i + 1}
                    </div>
                    <div className="text-white font-semibold text-sm">
                      {step.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {step.sub}
                    </div>
                  </div>
                  {i < 4 && (
                    <div className="hidden sm:block text-accent-blue mx-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
