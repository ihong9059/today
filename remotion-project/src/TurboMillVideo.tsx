import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from "remotion";
import React from "react";

// Scene timing configuration (frames at 30fps)
// 각 씬 길이를 음성 파일 길이에 맞춰 설정 (음성 + 2초 버퍼)
// scene01: 23.4초 → 26초, scene02: 45.1초 → 48초, scene03: 54.4초 → 57초
// scene04: 62.0초 → 65초, scene05: 49.8초 → 52초, scene06: 34.0초 → 37초
// scene07: 77.5초 → 80초
// 총: 365초 = 약 6분 5초 = 10950 프레임
export const SCENE_TIMINGS = {
  scene01_intro: { duration: 780, start: 0 },            // 26초 (음성 23.4초)
  scene02_mechanism: { duration: 1440, start: 780 },     // 48초 (음성 45.1초)
  scene03_features: { duration: 1710, start: 2220 },     // 57초 (음성 54.4초)
  scene04_specs: { duration: 1950, start: 3930 },        // 65초 (음성 62.0초)
  scene05_applications: { duration: 1560, start: 5880 }, // 52초 (음성 49.8초)
  scene06_maintenance: { duration: 1110, start: 7440 },  // 37초 (음성 34.0초)
  scene07_closing: { duration: 2400, start: 8550 },      // 80초 (음성 77.5초)
};

export const TURBO_MILL_DURATION = 10950;

// AR/VR Style - Design System
const colors = {
  background: "#0F172A",
  text: "#FFFFFF",
  accent: "#8B5CF6",
  accentGlow: "rgba(139, 92, 246, 0.5)",
  secondary: "#06B6D4",
  secondaryGlow: "rgba(6, 182, 212, 0.5)",
  success: "#10B981",
  warning: "#F59E0B",
  grid: "rgba(139, 92, 246, 0.1)",
};

// Digital Grid Background Component
const DigitalGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const gridOffset = (frame * 0.5) % 50;

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        linear-gradient(${colors.grid} 1px, transparent 1px),
        linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
      backgroundPosition: `${gridOffset}px ${gridOffset}px`,
      opacity: 0.6,
    }} />
  );
};

// Floating Particles Component
const FloatingParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 97) % 100,
    y: ((i * 73 + frame * 0.3) % 100),
    size: 2 + (i % 3),
    opacity: 0.3 + (i % 5) * 0.1,
  }));

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: colors.accent,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${colors.accentGlow}`,
          }}
        />
      ))}
    </>
  );
};

// Common Styles - AR/VR Theme
const styles = {
  background: {
    background: `linear-gradient(135deg, ${colors.background} 0%, #1E1B4B 50%, #0F172A 100%)`,
  },
  title: {
    color: colors.text,
    fontSize: 56,
    fontWeight: "bold" as const,
    fontFamily: "'Orbitron', 'Noto Sans KR', sans-serif",
    textAlign: "center" as const,
    marginBottom: 30,
    textShadow: `0 0 30px ${colors.accentGlow}, 0 0 60px ${colors.accentGlow}`,
    letterSpacing: "3px",
  },
  subtitle: {
    color: colors.accent,
    fontSize: 32,
    fontFamily: "'Orbitron', 'Noto Sans KR', sans-serif",
    textAlign: "center" as const,
    marginBottom: 20,
    letterSpacing: "2px",
  },
  content: {
    color: colors.text,
    fontSize: 24,
    fontFamily: "'Noto Sans KR', sans-serif",
    lineHeight: 1.8,
    padding: "0 60px",
  },
  accentBox: {
    background: "rgba(139, 92, 246, 0.1)",
    border: `2px solid ${colors.accent}`,
    borderRadius: 15,
    padding: 25,
    margin: "20px 60px",
    backdropFilter: "blur(10px)",
    boxShadow: `0 0 30px ${colors.accentGlow}`,
  },
  techBox: {
    background: "rgba(6, 182, 212, 0.1)",
    border: `2px solid ${colors.secondary}`,
    borderRadius: 15,
    padding: 25,
    margin: "20px 60px",
    backdropFilter: "blur(10px)",
    boxShadow: `0 0 30px ${colors.secondaryGlow}`,
  },
  table: {
    width: "90%",
    margin: "20px auto",
    borderCollapse: "collapse" as const,
    fontSize: 22,
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  th: {
    background: "rgba(139, 92, 246, 0.3)",
    color: colors.text,
    padding: "15px 20px",
    border: `1px solid ${colors.accent}`,
    fontWeight: "bold" as const,
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "1px",
  },
  td: {
    background: "rgba(255, 255, 255, 0.05)",
    color: colors.text,
    padding: "12px 18px",
    border: `1px solid rgba(139, 92, 246, 0.3)`,
    textAlign: "center" as const,
  },
  badge: {
    display: "inline-block",
    padding: "8px 20px",
    borderRadius: 25,
    fontSize: 18,
    fontWeight: "bold" as const,
    marginRight: 10,
    fontFamily: "'Orbitron', sans-serif",
  },
  flowBox: {
    background: "rgba(139, 92, 246, 0.15)",
    border: `2px solid ${colors.accent}`,
    borderRadius: 12,
    padding: "18px 28px",
    margin: "10px",
    display: "inline-block",
    color: colors.text,
    fontSize: 20,
    boxShadow: `0 0 20px ${colors.accentGlow}`,
  },
  arrow: {
    color: colors.accent,
    fontSize: 36,
    margin: "0 15px",
    textShadow: `0 0 10px ${colors.accentGlow}`,
  },
};

// Scene 01: Opening
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, from: -80, to: 0, durationInFrames: 45 });
  const titleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });
  const contentOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });
  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <AbsoluteFill style={styles.background}>
      <DigitalGrid />
      <FloatingParticles />

      <div style={{ padding: 60, position: "relative", zIndex: 1 }}>
        {/* Logo Area */}
        <div style={{
          opacity: logoOpacity,
          textAlign: "center",
          marginBottom: 20,
          filter: `drop-shadow(0 0 ${20 * glowPulse}px ${colors.accentGlow})`,
        }}>
          <div style={{
            fontSize: 24,
            color: colors.accent,
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: "5px",
          }}>
            HANKOOK POWDER MACHINE
          </div>
        </div>

        {/* Main Title */}
        <div style={{
          ...styles.title,
          fontSize: 72,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}>
          TURBO MILL
        </div>

        {/* Subtitle */}
        <div style={{
          ...styles.subtitle,
          opacity: subtitleOpacity,
          fontSize: 36,
        }}>
          고속 충격식 미분쇄기
        </div>

        {/* Tech Badges */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 40,
          opacity: contentOpacity,
        }}>
          {["화학", "식품", "의약품", "광물"].map((industry, i) => (
            <div key={i} style={{
              ...styles.badge,
              background: `rgba(139, 92, 246, ${0.2 + i * 0.1})`,
              border: `1px solid ${colors.accent}`,
              boxShadow: `0 0 15px ${colors.accentGlow}`,
            }}>
              {industry}
            </div>
          ))}
        </div>

        {/* Key Features Box */}
        <div style={{ ...styles.accentBox, marginTop: 50, opacity: contentOpacity }}>
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            textAlign: "center",
          }}>
            <div>
              <div style={{ color: colors.accent, fontSize: 42, fontWeight: "bold", fontFamily: "'Orbitron', sans-serif" }}>
                100m/s+
              </div>
              <div style={{ color: colors.text, fontSize: 18, marginTop: 8 }}>블레이드 팁 속도</div>
            </div>
            <div style={{ width: 2, background: colors.accent, opacity: 0.3 }} />
            <div>
              <div style={{ color: colors.secondary, fontSize: 42, fontWeight: "bold", fontFamily: "'Orbitron', sans-serif" }}>
                10~500μm
              </div>
              <div style={{ color: colors.text, fontSize: 18, marginTop: 8 }}>정밀 입도 제어</div>
            </div>
            <div style={{ width: 2, background: colors.accent, opacity: 0.3 }} />
            <div>
              <div style={{ color: colors.success, fontSize: 42, fontWeight: "bold", fontFamily: "'Orbitron', sans-serif" }}>
                5 Models
              </div>
              <div style={{ color: colors.text, fontSize: 18, marginTop: 8 }}>라인업</div>
            </div>
          </div>
        </div>
      </div>

      <Audio src={staticFile("turbomill/scene01_intro.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 02: Mechanism
const Scene02Mechanism: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const rotation = interpolate(frame, [0, 300], [0, 360], { extrapolateRight: "extend" });

  const principles = [
    { icon: "⚡", title: "충격력 (Impact)", desc: "고속 회전 블레이드에 의한 1차 충격 파쇄" },
    { icon: "✂️", title: "전단력 (Shear)", desc: "내면 LINER와의 마찰에 의한 전단 파쇄" },
    { icon: "🔄", title: "마찰력 (Friction)", desc: "입자 상호 간의 자기 파쇄" },
    { icon: "💨", title: "기류 분급", desc: "수평 방향 공기 흐름으로 분쇄와 분급 동시 수행" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <DigitalGrid />
      <FloatingParticles />

      <div style={{ padding: 50, position: "relative", zIndex: 1 }}>
        <div style={{ ...styles.title, opacity: titleOpacity }}>
          분쇄 원리 및 메커니즘
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 30 }}>
          {/* Left: Animated Diagram */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: 350,
              height: 350,
              borderRadius: "50%",
              border: `3px solid ${colors.accent}`,
              position: "relative",
              boxShadow: `0 0 40px ${colors.accentGlow}, inset 0 0 40px ${colors.accentGlow}`,
            }}>
              {/* Rotating Blades */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}>
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <div key={angle} style={{
                    position: "absolute",
                    width: 120,
                    height: 15,
                    background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
                    transformOrigin: "left center",
                    transform: `rotate(${angle}deg)`,
                    borderRadius: 5,
                    boxShadow: `0 0 10px ${colors.accentGlow}`,
                  }} />
                ))}
                {/* Center Hub */}
                <div style={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: colors.secondary,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 20px ${colors.secondaryGlow}`,
                }} />
              </div>

              {/* Material Flow Indicators */}
              <div style={{
                position: "absolute",
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                color: colors.text,
                fontSize: 14,
                fontFamily: "'Orbitron', sans-serif",
              }}>
                ▼ 원료 투입
              </div>
            </div>

            <div style={{ ...styles.techBox, marginTop: 20, textAlign: "center", width: "100%" }}>
              <div style={{ color: colors.secondary, fontSize: 20, fontWeight: "bold" }}>
                블레이드 팁 속도: 100m/s 이상
              </div>
              <div style={{ color: colors.text, fontSize: 16, marginTop: 8 }}>
                D50 기준 10~500μm 정밀 입도 제어
              </div>
            </div>
          </div>

          {/* Right: Principles List */}
          <div style={{ flex: 1 }}>
            {principles.map((p, i) => {
              const delay = 60 + i * 30;
              const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
              const translateX = interpolate(frame, [delay, delay + 30], [50, 0], { extrapolateRight: "clamp" });

              return (
                <div key={i} style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  marginBottom: 25,
                  padding: "20px 25px",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: `1px solid ${colors.accent}`,
                  borderRadius: 12,
                  boxShadow: `0 0 15px ${colors.accentGlow}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                    <span style={{ fontSize: 36 }}>{p.icon}</span>
                    <div>
                      <div style={{
                        color: colors.accent,
                        fontSize: 22,
                        fontWeight: "bold",
                        fontFamily: "'Orbitron', 'Noto Sans KR', sans-serif",
                      }}>
                        {p.title}
                      </div>
                      <div style={{ color: colors.text, fontSize: 18, marginTop: 5 }}>
                        {p.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Audio src={staticFile("turbomill/scene02_mechanism.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 03: Features
const Scene03Features: React.FC = () => {
  const frame = useCurrentFrame();

  const features = [
    { num: "01", title: "수평형 분쇄 구조", desc: "설치 면적 최소화, 레이아웃 설계 유연성 확보", icon: "📐" },
    { num: "02", title: "내마모성 블레이드", desc: "특수강 또는 세라믹 코팅, 연마성 원료 장기 안정 운전", icon: "🛡️" },
    { num: "03", title: "스크린 메쉬 교체", desc: "0.5mm~6mm 다양한 스크린으로 목표 입도 유연 조절", icon: "🔧" },
    { num: "04", title: "분쇄실 냉각 시스템", desc: "열 민감 원료 품질 변성 방지", icon: "❄️" },
    { num: "05", title: "CIP 대응 설계", desc: "식품, 의약품 GMP 환경 적합", icon: "✅" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <DigitalGrid />
      <FloatingParticles />

      <div style={{ padding: 50, position: "relative", zIndex: 1 }}>
        <div style={styles.title}>
          설계 특징 및 기술적 장점
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25, marginTop: 30, padding: "0 40px" }}>
          {features.map((f, i) => {
            const delay = 20 + i * 25;
            const opacity = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateRight: "clamp" });
            const scale = interpolate(frame, [delay, delay + 25], [0.8, 1], { extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                opacity,
                transform: `scale(${scale})`,
                padding: 25,
                background: "rgba(139, 92, 246, 0.08)",
                border: `2px solid ${i % 2 === 0 ? colors.accent : colors.secondary}`,
                borderRadius: 15,
                boxShadow: `0 0 25px ${i % 2 === 0 ? colors.accentGlow : colors.secondaryGlow}`,
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{
                    fontSize: 40,
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `rgba(${i % 2 === 0 ? "139, 92, 246" : "6, 182, 212"}, 0.2)`,
                    borderRadius: 12,
                  }}>
                    {f.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 8,
                    }}>
                      <span style={{
                        color: i % 2 === 0 ? colors.accent : colors.secondary,
                        fontSize: 16,
                        fontFamily: "'Orbitron', sans-serif",
                        opacity: 0.7,
                      }}>
                        {f.num}
                      </span>
                      <span style={{
                        color: colors.text,
                        fontSize: 24,
                        fontWeight: "bold",
                        fontFamily: "'Noto Sans KR', sans-serif",
                      }}>
                        {f.title}
                      </span>
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.5 }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Audio src={staticFile("turbomill/scene03_features.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 04: Specifications
const Scene04Specs: React.FC = () => {
  const frame = useCurrentFrame();

  const models = [
    { model: "TOP 250TM", dimension: "920×1050×760", power: "7.5~19", capacity: "20~100" },
    { model: "TOP 400TM", dimension: "1100×1200×912", power: "15~30", capacity: "100~300" },
    { model: "TOP 600TM", dimension: "1400×1200×1050", power: "30~55", capacity: "200~650" },
    { model: "TOP 800TM", dimension: "1850×1600×1500", power: "55~110", capacity: "500~1000" },
    { model: "TOP 1000TM", dimension: "2000×2200×2500", power: "55~110", capacity: "500~1000" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <DigitalGrid />
      <FloatingParticles />

      <div style={{ padding: 50, position: "relative", zIndex: 1 }}>
        <div style={styles.title}>
          모델별 사양 및 처리 용량
        </div>

        <div style={{ ...styles.subtitle, marginBottom: 30 }}>
          5개 모델 라인업 - 생산 규모별 최적 선택
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>MODEL</th>
              <th style={styles.th}>DIMENSION (L×W×H mm)</th>
              <th style={styles.th}>POWER (kW)</th>
              <th style={styles.th}>CAPACITY (kg/hr)</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m, i) => {
              const delay = 30 + i * 20;
              const rowOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
              const isHighlight = i === 3; // TOP 800TM 강조

              return (
                <tr key={i} style={{
                  opacity: rowOpacity,
                  background: isHighlight ? "rgba(139, 92, 246, 0.2)" : undefined,
                }}>
                  <td style={{
                    ...styles.td,
                    color: isHighlight ? colors.accent : colors.text,
                    fontWeight: "bold",
                    fontFamily: "'Orbitron', sans-serif",
                  }}>
                    {m.model}
                  </td>
                  <td style={styles.td}>{m.dimension}</td>
                  <td style={{ ...styles.td, color: colors.secondary }}>{m.power}</td>
                  <td style={{ ...styles.td, color: colors.success, fontWeight: "bold" }}>{m.capacity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ ...styles.techBox, marginTop: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
            <div>
              <div style={{ color: colors.accent, fontSize: 18, marginBottom: 5 }}>파일럿/소규모</div>
              <div style={{ color: colors.text, fontSize: 16 }}>TOP 250TM</div>
            </div>
            <div style={{ color: colors.accent, fontSize: 30 }}>→</div>
            <div>
              <div style={{ color: colors.secondary, fontSize: 18, marginBottom: 5 }}>중규모 생산</div>
              <div style={{ color: colors.text, fontSize: 16 }}>TOP 400TM~600TM</div>
            </div>
            <div style={{ color: colors.accent, fontSize: 30 }}>→</div>
            <div>
              <div style={{ color: colors.success, fontSize: 18, marginBottom: 5 }}>대규모 양산</div>
              <div style={{ color: colors.text, fontSize: 16 }}>TOP 800TM~1000TM</div>
            </div>
          </div>
        </div>

        <div style={{
          textAlign: "center",
          marginTop: 25,
          color: "rgba(255,255,255,0.6)",
          fontSize: 16,
        }}>
          * 원료의 경도, 수분 함량, 목표 입도에 따라 실제 처리량은 변동될 수 있습니다
        </div>
      </div>

      <Audio src={staticFile("turbomill/scene04_specs.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 05: Applications
const Scene05Applications: React.FC = () => {
  const frame = useCurrentFrame();

  const applications = [
    { industry: "화학 산업", items: ["안료", "염료", "수지 분말", "농약 원제"], highlight: "D90 20μm 이하 정밀 분쇄", color: colors.accent },
    { industry: "식품 산업", items: ["향신료", "곡물", "설탕", "분유"], highlight: "식품위생법 기준 STS 재질", color: colors.success },
    { industry: "의약품 산업", items: ["원료 의약품", "생체이용률 향상"], highlight: "균일 입도 확보", color: colors.secondary },
    { industry: "광물 분야", items: ["Calcium Carbonate", "Talc", "Ite"], highlight: "비금속 광물 미분쇄", color: colors.warning },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <DigitalGrid />
      <FloatingParticles />

      <div style={{ padding: 50, position: "relative", zIndex: 1 }}>
        <div style={styles.title}>
          적용 분야 및 분쇄 사례
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginTop: 30, padding: "0 30px" }}>
          {applications.map((app, i) => {
            const delay = 30 + i * 30;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                opacity,
                padding: 30,
                background: `rgba(${app.color === colors.accent ? "139, 92, 246" : app.color === colors.success ? "16, 185, 129" : app.color === colors.secondary ? "6, 182, 212" : "245, 158, 11"}, 0.1)`,
                border: `2px solid ${app.color}`,
                borderRadius: 15,
                boxShadow: `0 0 25px ${app.color}40`,
              }}>
                <div style={{
                  color: app.color,
                  fontSize: 26,
                  fontWeight: "bold",
                  fontFamily: "'Orbitron', 'Noto Sans KR', sans-serif",
                  marginBottom: 15,
                }}>
                  {app.industry}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 15 }}>
                  {app.items.map((item, j) => (
                    <span key={j} style={{
                      padding: "6px 14px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 20,
                      color: colors.text,
                      fontSize: 16,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
                <div style={{
                  padding: "10px 15px",
                  background: `${app.color}20`,
                  borderRadius: 8,
                  color: app.color,
                  fontSize: 16,
                  fontWeight: "bold",
                }}>
                  ✓ {app.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Audio src={staticFile("turbomill/scene05_applications.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 06: Maintenance
const Scene06Maintenance: React.FC = () => {
  const frame = useCurrentFrame();

  const features = [
    { icon: "🖥️", title: "PLC 기반 제어", desc: "운전 파라미터 정밀 제어 및 데이터 로깅" },
    { icon: "⚡", title: "인버터 구동", desc: "블레이드 회전 속도 무단 조절, 원료별 최적화" },
    { icon: "🔓", title: "분쇄실 개방 구조", desc: "내부 점검 및 청소 간편" },
    { icon: "🔄", title: "소모품 교체", desc: "블레이드, 스크린 교체 시간 최소화" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <DigitalGrid />
      <FloatingParticles />

      <div style={{ padding: 50, position: "relative", zIndex: 1 }}>
        <div style={styles.title}>
          운전 및 유지보수
        </div>

        <div style={{ ...styles.subtitle, marginBottom: 40 }}>
          운전 편의성 & 유지보수성 극대화
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 25 }}>
          {features.map((f, i) => {
            const delay = 30 + i * 25;
            const opacity = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateRight: "clamp" });
            const scale = interpolate(frame, [delay, delay + 25], [0.9, 1], { extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                opacity,
                transform: `scale(${scale})`,
                width: "45%",
                padding: 30,
                background: "rgba(139, 92, 246, 0.1)",
                border: `2px solid ${colors.accent}`,
                borderRadius: 15,
                boxShadow: `0 0 25px ${colors.accentGlow}`,
                textAlign: "center",
              }}>
                <div style={{ fontSize: 50, marginBottom: 15 }}>{f.icon}</div>
                <div style={{
                  color: colors.accent,
                  fontSize: 24,
                  fontWeight: "bold",
                  fontFamily: "'Orbitron', 'Noto Sans KR', sans-serif",
                  marginBottom: 10,
                }}>
                  {f.title}
                </div>
                <div style={{ color: colors.text, fontSize: 18, lineHeight: 1.5 }}>
                  {f.desc}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ ...styles.techBox, marginTop: 30, textAlign: "center" }}>
          <div style={{ color: colors.secondary, fontSize: 20 }}>
            📋 예방 정비 주기 가이드 제공 | 🚚 신속한 부품 공급 체계 운영
          </div>
        </div>
      </div>

      <Audio src={staticFile("turbomill/scene06_maintenance.mp3")} />
    </AbsoluteFill>
  );
};

// Scene 07: Closing
const Scene07Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const glowPulse = Math.sin(frame * 0.08) * 0.3 + 0.7;

  const stats = [
    { value: "1985", label: "설립연도", suffix: "년" },
    { value: "40", label: "업력", suffix: "년" },
    { value: "500", label: "납품 기업", suffix: "+" },
  ];

  return (
    <AbsoluteFill style={styles.background}>
      <DigitalGrid />
      <FloatingParticles />

      <div style={{ padding: 50, position: "relative", zIndex: 1 }}>
        <div style={{ ...styles.title, opacity: titleOpacity }}>
          한국기계
        </div>
        <div style={{
          ...styles.subtitle,
          opacity: titleOpacity,
          marginBottom: 40,
        }}>
          분체 기술의 믿음직한 파트너
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          marginBottom: 40,
        }}>
          {stats.map((s, i) => {
            const delay = 40 + i * 20;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                opacity,
                textAlign: "center",
                padding: "20px 40px",
                background: "rgba(139, 92, 246, 0.1)",
                borderRadius: 15,
                border: `1px solid ${colors.accent}`,
                boxShadow: `0 0 ${20 * glowPulse}px ${colors.accentGlow}`,
              }}>
                <div style={{
                  color: colors.accent,
                  fontSize: 48,
                  fontWeight: "bold",
                  fontFamily: "'Orbitron', sans-serif",
                }}>
                  {s.value}<span style={{ fontSize: 24 }}>{s.suffix}</span>
                </div>
                <div style={{ color: colors.text, fontSize: 18, marginTop: 5 }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Services */}
        <div style={{ ...styles.accentBox }}>
          <div style={{
            textAlign: "center",
            color: colors.text,
            fontSize: 22,
            marginBottom: 15,
          }}>
            원스톱 토탈 솔루션
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}>
            {["분쇄 테스트", "공정 설계", "설치", "시운전", "유지보수"].map((service, i) => (
              <React.Fragment key={i}>
                <span style={{
                  ...styles.flowBox,
                  margin: 5,
                  background: i % 2 === 0 ? "rgba(139, 92, 246, 0.2)" : "rgba(6, 182, 212, 0.2)",
                  borderColor: i % 2 === 0 ? colors.accent : colors.secondary,
                }}>
                  {service}
                </span>
                {i < 4 && <span style={styles.arrow}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{
          marginTop: 40,
          textAlign: "center",
          padding: 30,
          background: "rgba(6, 182, 212, 0.1)",
          border: `2px solid ${colors.secondary}`,
          borderRadius: 15,
          boxShadow: `0 0 30px ${colors.secondaryGlow}`,
        }}>
          <div style={{
            color: colors.secondary,
            fontSize: 28,
            fontWeight: "bold",
            fontFamily: "'Orbitron', sans-serif",
            marginBottom: 15,
          }}>
            CONTACT
          </div>
          <div style={{ color: colors.text, fontSize: 22, marginBottom: 10 }}>
            📞 031-356-5550
          </div>
          <div style={{ color: colors.accent, fontSize: 20 }}>
            🌐 www.topcrusher.co.kr
          </div>
        </div>
      </div>

      <Audio src={staticFile("turbomill/scene07_closing.mp3")} />
    </AbsoluteFill>
  );
};

// Main Video Component
export const TurboMillVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_mechanism.start} durationInFrames={SCENE_TIMINGS.scene02_mechanism.duration}>
        <Scene02Mechanism />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_features.start} durationInFrames={SCENE_TIMINGS.scene03_features.duration}>
        <Scene03Features />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_specs.start} durationInFrames={SCENE_TIMINGS.scene04_specs.duration}>
        <Scene04Specs />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_applications.start} durationInFrames={SCENE_TIMINGS.scene05_applications.duration}>
        <Scene05Applications />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_maintenance.start} durationInFrames={SCENE_TIMINGS.scene06_maintenance.duration}>
        <Scene06Maintenance />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_closing.start} durationInFrames={SCENE_TIMINGS.scene07_closing.duration}>
        <Scene07Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
