import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ============================================================
// XERIX XPR 고도화 제안 동영상 - 한국어 버전
// ============================================================

// Scene timings (30fps)
export const SCENE_TIMINGS = {
  s01: { duration: 600,  start: 0 },     // 19.10s + buffer
  s02: { duration: 1170, start: 600 },   // 38.33s
  s03: { duration: 1050, start: 1770 },  // 34.13s
  s04: { duration: 1260, start: 2820 },  // 41.06s
  s05: { duration: 1245, start: 4080 },  // 40.61s
  s06: { duration: 1005, start: 5325 },  // 32.66s
  s07: { duration: 975,  start: 6330 },  // 31.56s
  s08: { duration: 1095, start: 7305 },  // 35.62s
  s09: { duration: 690,  start: 8400 },  // 21.72s
};

export const XERIX_VIDEO_DURATION = 9090; // ~5:03

// XERIX-friendly brand palette
const colors = {
  bg: "#0A0E1A",
  bgGradient1: "#0F1729",
  bgGradient2: "#070B14",
  primary: "#00D4FF",
  accent: "#0066FF",
  highlight: "#4FE3FF",
  text: "#FFFFFF",
  textSub: "#B8D4E8",
  gold: "#FFD93D",
  success: "#00E676",
  warn: "#FF9800",
  red: "#FF5252",
};

// Animation helpers
const fadeIn = (frame: number, start: number, dur: number) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const slideUp = (frame: number, start: number, dur: number, dist = 40) =>
  interpolate(frame, [start, start + dur], [dist, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

// ============================================================
// Shared components
// ============================================================
const TechBackground: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${colors.bgGradient1} 0%, ${colors.bg} 50%, ${colors.bgGradient2} 100%)`,
        }}
      />
      <svg style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.08 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={`${i * 4.2 + (frame * 0.08) % 4.2}%`}
            x2="100%"
            y2={`${i * 4.2 + (frame * 0.08) % 4.2}%`}
            stroke={colors.primary}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={`${i * 4.2 + (frame * 0.05) % 4.2}%`}
            y1="0"
            x2={`${i * 4.2 + (frame * 0.05) % 4.2}%`}
            y2="100%"
            stroke={colors.primary}
            strokeWidth="1"
          />
        ))}
      </svg>
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (i * 137.5 + frame * 0.3) % 100;
        const y = (i * 73.7 + frame * 0.2) % 100;
        const size = 2 + (i % 4) * 2;
        return (
          <div
            key={`p-${i}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              background: colors.highlight,
              opacity: 0.3 + Math.sin(frame * 0.05 + i) * 0.2,
              boxShadow: `0 0 ${size * 3}px ${colors.primary}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const NeonText: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 48, color = colors.primary, style }) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 800,
      color,
      textShadow: `0 0 10px ${color}, 0 0 25px ${color}, 0 0 45px ${color}`,
      letterSpacing: -1,
      ...style,
    }}
  >
    {children}
  </div>
);

const HoloCard: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  borderColor?: string;
}> = ({ children, width = 400, height = "auto", style, borderColor = colors.primary }) => {
  const frame = useCurrentFrame();
  const shimmer = Math.sin(frame * 0.1) * 8;
  return (
    <div
      style={{
        width,
        height,
        background: `linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(0,102,255,0.18) 50%, rgba(79,227,255,0.08) 100%)`,
        border: `2px solid ${borderColor}`,
        borderRadius: 16,
        padding: 24,
        backdropFilter: "blur(10px)",
        boxShadow: `0 0 30px rgba(0,212,255,0.25), inset 0 0 ${20 + shimmer}px rgba(0,212,255,0.08)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const SectionTitle: React.FC<{ label: string; title: React.ReactNode; frameStart?: number }> = ({
  label,
  title,
  frameStart = 0,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        width: "100%",
        textAlign: "center",
        opacity: fadeIn(frame, frameStart, 20),
        transform: `translateY(${slideUp(frame, frameStart, 20)}px)`,
      }}
    >
      <div
        style={{
          fontSize: 18,
          color: colors.highlight,
          letterSpacing: 8,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <NeonText size={64}>{title}</NeonText>
    </div>
  );
};

// ============================================================
// Scene 01 - Opening
// ============================================================
const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoScale = scaleIn(frame, fps, 10);
  const t1 = fadeIn(frame, 25, 20);
  const t2 = fadeIn(frame, 60, 25);
  const t3 = fadeIn(frame, 120, 25);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene01_opening_ko.mp3")} />
      <TechBackground />

      {/* Decorative connecting nodes */}
      <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
        {[
          { x1: 250, y1: 250, x2: 960, y2: 540 },
          { x1: 1670, y1: 250, x2: 960, y2: 540 },
          { x1: 250, y1: 850, x2: 960, y2: 540 },
          { x1: 1670, y1: 850, x2: 960, y2: 540 },
        ].map((l, i) => {
          const p = interpolate(frame, [10 + i * 6, 50 + i * 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x1 + (l.x2 - l.x1) * p}
              y2={l.y1 + (l.y2 - l.y1) * p}
              stroke={colors.primary}
              strokeWidth={2}
              opacity={0.5}
            />
          );
        })}
      </svg>

      {[
        { x: 250, y: 250, label: "STM32" },
        { x: 1670, y: 250, label: "PID" },
        { x: 250, y: 850, label: "MFC" },
        { x: 1670, y: 850, label: "RS485" },
      ].map((n, i) => {
        const s = scaleIn(frame, fps, 20 + i * 5);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: n.x - 60,
              top: n.y - 30,
              width: 120,
              height: 60,
              borderRadius: 30,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${s})`,
              boxShadow: `0 0 25px ${colors.primary}`,
              fontWeight: 700,
              color: "#fff",
              fontSize: 18,
            }}
          >
            {n.label}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoScale})`,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 24, color: colors.highlight, letterSpacing: 6, marginBottom: 12, fontWeight: 600 }}>
          PROPOSAL FOR XERIX
        </div>
        <NeonText size={130} color={colors.highlight}>
          XPR
        </NeonText>
        <div style={{ marginTop: 4, opacity: t1 }}>
          <div style={{ fontSize: 38, color: colors.text, fontWeight: 600 }}>고도화 개발 제안</div>
        </div>
        <div style={{ marginTop: 30, opacity: t2 }}>
          <div style={{ fontSize: 26, color: colors.textSub, lineHeight: 1.6 }}>
            MFC / LFC Control Solution
          </div>
        </div>
        <div style={{ marginTop: 40, opacity: t3 }}>
          <div
            style={{
              display: "inline-block",
              padding: "12px 36px",
              borderRadius: 999,
              border: `2px solid ${colors.primary}`,
              background: "rgba(0,212,255,0.1)",
              fontSize: 24,
              color: colors.text,
              fontWeight: 600,
            }}
          >
            Presented by ㈜유티텍 (UTTEC)
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 02 - Company Overview
// ============================================================
const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { num: "40+", label: "년 RF 개발 노하우", color: colors.gold, delay: 60 },
    { num: "3,800+", label: "일본 수출 실적 (대)", color: colors.success, delay: 80 },
    { num: "2016", label: "법인 설립", color: colors.highlight, delay: 100 },
    { num: "4 +", label: "국제 인증 (KC·TELEC·CE)", color: colors.primary, delay: 120 },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene02_company_ko.mp3")} />
      <TechBackground />
      <SectionTitle label="COMPANY OVERVIEW" title="회사 소개" />

      <div
        style={{
          position: "absolute",
          top: 230,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: fadeIn(frame, 30, 25),
        }}
      >
        <NeonText size={44} color={colors.text}>
          ㈜유티텍 (UTTEC Co., Ltd.)
        </NeonText>
        <div style={{ fontSize: 22, color: colors.textSub, marginTop: 14, lineHeight: 1.7 }}>
          무선 네트워크 · 정밀 제어 솔루션 전문 기업
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 420,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, s.delay, 20),
              transform: `scale(${scaleIn(frame, fps, s.delay)})`,
            }}
          >
            <HoloCard width={340} height={220} borderColor={s.color}>
              <div style={{ textAlign: "center" }}>
                <NeonText size={64} color={s.color}>
                  {s.num}
                </NeonText>
                <div style={{ fontSize: 22, color: colors.text, marginTop: 18, fontWeight: 500 }}>{s.label}</div>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 200, 25),
        }}
      >
        <HoloCard width={1100} style={{ margin: "0 auto" }}>
          <div style={{ fontSize: 26, color: colors.text, lineHeight: 1.8, textAlign: "center" }}>
            조명 제어 · 스마트팜 · 스마트팩토리 · IoT 솔루션
            <br />
            <span style={{ color: colors.highlight, fontSize: 22 }}>
              기술력과 품질을 동시에 검증받은, 신뢰할 수 있는 파트너
            </span>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 03 - Qualification Match
// ============================================================
const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reqs = [
    {
      title: "STM32 임베디드",
      detail: "보드 설계 · 펌웨어 개발",
      icon: "🔧",
      delay: 50,
    },
    {
      title: "PID 제어",
      detail: "모터 · 밸브 제어 알고리즘",
      icon: "⚙️",
      delay: 100,
    },
    {
      title: "정밀 계측 (MFC)",
      detail: "유사 산업 장비 개발",
      icon: "📊",
      delay: 150,
    },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene03_qualification_ko.mp3")} />
      <TechBackground />
      <SectionTitle label="QUALIFICATION MATCH" title="지원 자격 충족" />

      <div
        style={{
          position: "absolute",
          top: 270,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 25, 20),
        }}
      >
        <div style={{ fontSize: 28, color: colors.textSub }}>
          XERIX가 요구한 핵심 자격 <span style={{ color: colors.gold, fontWeight: 700 }}>3가지</span>를 모두 충족합니다
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 380,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {reqs.map((r, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, r.delay, 25),
              transform: `scale(${scaleIn(frame, fps, r.delay)})`,
            }}
          >
            <HoloCard width={420} height={360} borderColor={colors.success}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 80, marginBottom: 14 }}>{r.icon}</div>
                <NeonText size={32} color={colors.text}>
                  {r.title}
                </NeonText>
                <div style={{ fontSize: 20, color: colors.textSub, marginTop: 16, lineHeight: 1.5 }}>{r.detail}</div>
                <div
                  style={{
                    marginTop: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 22px",
                    borderRadius: 999,
                    background: `${colors.success}22`,
                    border: `2px solid ${colors.success}`,
                  }}
                >
                  <span style={{ fontSize: 22, color: colors.success, fontWeight: 700 }}>✓ 충족</span>
                </div>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 220, 25),
        }}
      >
        <div style={{ fontSize: 26, color: colors.highlight }}>
          ▼ 이제 그 근거가 되는 <span style={{ color: colors.gold }}>3가지 실제 개발 사례</span>를 보여드리겠습니다
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 04 - REVITA Case
// ============================================================
const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { title: "RS485 센서 통신", detail: "MODBUS · 다중 디바이스" },
    { title: "3선식 모터 밸브", detail: "CR02 · CR03 정밀 제어" },
    { title: "유량계 PPI 카운팅", detail: "background counting · 저전력" },
    { title: "Dual-bank OTA", detail: "실패 시 자동 롤백" },
    { title: "원격 진단 · 로그", detail: "현장 방문 없이 유지보수" },
    { title: "저전력 설계", detail: "태양광 · 배터리 운용" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene04_revita_ko.mp3")} />
      <TechBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <div style={{ fontSize: 18, color: colors.gold, letterSpacing: 6, fontWeight: 700, marginBottom: 6 }}>
          CASE 1 / 3
        </div>
        <NeonText size={62}>REVITA 스마트팜 단말기</NeonText>
        <div style={{ fontSize: 22, color: colors.textSub, marginTop: 12 }}>
          XPR 컨트롤러와 <span style={{ color: colors.gold, fontWeight: 700 }}>거의 동일한 제어 구조</span> · 양산 직전
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 270,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 24,
          padding: "0 80px",
        }}
      >
        {features.map((f, i) => {
          const delay = 25 + i * 12;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 20),
                transform: `translateY(${slideUp(frame, delay, 20)}px)`,
              }}
            >
              <HoloCard width={550} height={150}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      fontWeight: 800,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 26, color: colors.text, fontWeight: 700 }}>{f.title}</div>
                    <div style={{ fontSize: 18, color: colors.textSub, marginTop: 6 }}>{f.detail}</div>
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 200, 25),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 12,
            background: `${colors.success}22`,
            border: `2px solid ${colors.success}`,
          }}
        >
          <span style={{ fontSize: 26, color: colors.success, fontWeight: 700 }}>
            ★ XPR 고도화에 즉시 적용 가능한 기 검증 자산
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 05 - PID Control Case
// ============================================================
const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene05_pid_ko.mp3")} />
      <TechBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <div style={{ fontSize: 18, color: colors.gold, letterSpacing: 6, fontWeight: 700, marginBottom: 6 }}>
          CASE 2 / 3
        </div>
        <NeonText size={62}>스마트팩토리 PID 제어</NeonText>
        <div style={{ fontSize: 22, color: colors.textSub, marginTop: 12 }}>
          룰 기반 + PID 피드백 <span style={{ color: colors.gold, fontWeight: 700 }}>이중 제어 구조</span>
        </div>
      </div>

      {/* PID flow diagram */}
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 100,
          right: 100,
          opacity: fadeIn(frame, 25, 25),
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          {[
            { label: "재료 + 목표", sub: "Input", color: colors.highlight },
            { label: "Look-up Table", sub: "1단계: 기본값", color: colors.primary },
            { label: "PID 피드백", sub: "2단계: 미세 조정", color: colors.accent },
            { label: "안전 인터록", sub: "범위 / 변화 한계", color: colors.warn },
            { label: "최종 출력", sub: "Plant 제어", color: colors.success },
          ].map((b, i) => {
            const d = 30 + i * 15;
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    flex: 1,
                    opacity: fadeIn(frame, d, 18),
                    transform: `translateY(${slideUp(frame, d, 18)}px)`,
                  }}
                >
                  <HoloCard borderColor={b.color} style={{ minHeight: 130, padding: 18 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 13, color: b.color, fontWeight: 700, letterSpacing: 2 }}>{b.sub}</div>
                      <div style={{ fontSize: 22, color: colors.text, marginTop: 8, fontWeight: 700 }}>{b.label}</div>
                    </div>
                  </HoloCard>
                </div>
                {i < 4 && (
                  <div
                    style={{
                      fontSize: 36,
                      color: colors.primary,
                      opacity: fadeIn(frame, 35 + i * 15, 18),
                    }}
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Key technical points */}
      <div
        style={{
          position: "absolute",
          top: 530,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
          padding: "0 100px",
          opacity: fadeIn(frame, 130, 25),
        }}
      >
        {[
          { k: "Kp / Ki / Kd", v: "Ziegler-Nichols 자동 튜닝" },
          { k: "Anti-Windup", v: "적분항 누적 제한" },
          { k: "Safety Interlock", v: "RPM 변화 ±5 / 과부하 감지" },
        ].map((it, i) => (
          <HoloCard key={i} width={400} borderColor={colors.success}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, color: colors.gold, fontWeight: 700 }}>{it.k}</div>
              <div style={{ fontSize: 18, color: colors.textSub, marginTop: 10 }}>{it.v}</div>
            </div>
          </HoloCard>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 220, 25),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 12,
            background: `${colors.success}22`,
            border: `2px solid ${colors.success}`,
          }}
        >
          <span style={{ fontSize: 26, color: colors.success, fontWeight: 700 }}>
            ★ 현장 데이터로 안정성이 입증된 PID 노하우
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 06 - rfTech Power Case
// ============================================================
const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene06_rftech_ko.mp3")} />
      <TechBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 0, 20),
        }}
      >
        <div style={{ fontSize: 18, color: colors.gold, letterSpacing: 6, fontWeight: 700, marginBottom: 6 }}>
          CASE 3 / 3
        </div>
        <NeonText size={62}>군용 등급 정밀 전원</NeonText>
        <div style={{ fontSize: 22, color: colors.textSub, marginTop: 12 }}>
          rfTech PowerDock Pro · <span style={{ color: colors.gold, fontWeight: 700 }}>고신뢰성 전원 설계</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 280,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {[
          { num: "DC 24V", lbl: "입력 전원", sub: "XPR 정격 그대로", c: colors.highlight, d: 30 },
          { num: "Multi-Rail", lbl: "다중 전압 라인", sub: "5V · 3.3V · 12V step", c: colors.primary, d: 60 },
          { num: "Peak 관리", lbl: "순간 전류 제어", sub: "Soft-start · MOSFET 스위칭", c: colors.warn, d: 90 },
        ].map((it, i) => (
          <div
            key={i}
            style={{
              opacity: fadeIn(frame, it.d, 22),
              transform: `scale(${scaleIn(frame, fps, it.d)})`,
            }}
          >
            <HoloCard width={420} height={300} borderColor={it.c}>
              <div style={{ textAlign: "center" }}>
                <NeonText size={42} color={it.c}>
                  {it.num}
                </NeonText>
                <div style={{ fontSize: 24, color: colors.text, marginTop: 18, fontWeight: 700 }}>{it.lbl}</div>
                <div style={{ fontSize: 18, color: colors.textSub, marginTop: 10 }}>{it.sub}</div>
              </div>
            </HoloCard>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 130,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 150, 25),
        }}
      >
        <HoloCard width={1100} style={{ margin: "0 auto" }}>
          <div style={{ fontSize: 24, color: colors.text, lineHeight: 1.7, textAlign: "center" }}>
            DC 24V 입력에서 다중 전압 레일을 안정적으로 공급해야 하는
            <br />
            <span style={{ color: colors.highlight, fontWeight: 700 }}>XPR 컨트롤러 전원부 설계의 결정적 강점</span>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 07 - Deliverables
// ============================================================
const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = [
    { t: "Schematic", d: "회로도 원본 파일", icon: "📐" },
    { t: "PCB Artwork", d: "Gerber 파일 포함", icon: "🔲" },
    { t: "BOM List", d: "부품 명세서", icon: "📋" },
    { t: "Firmware", d: "소스 코드 + 컴파일 가이드", icon: "💾" },
    { t: "Prototype", d: "조립 시제품 보드 (협의 수량)", icon: "🛠️" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene07_deliverables_ko.mp3")} />
      <TechBackground />
      <SectionTitle label="DELIVERABLES" title="납품 산출물" />

      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 25, 20),
        }}
      >
        <div style={{ fontSize: 26, color: colors.textSub }}>
          요청하신 모든 산출물을 <span style={{ color: colors.gold, fontWeight: 700 }}>빠짐없이 납품</span>합니다
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 350,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 24,
          padding: "0 100px",
        }}
      >
        {items.map((it, i) => {
          const d = 50 + i * 18;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, d, 22),
                transform: `scale(${scaleIn(frame, fps, d)})`,
              }}
            >
              <HoloCard width={340} height={240}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 56, marginBottom: 8 }}>{it.icon}</div>
                  <NeonText size={28} color={colors.highlight}>
                    {it.t}
                  </NeonText>
                  <div style={{ fontSize: 18, color: colors.textSub, marginTop: 12 }}>{it.d}</div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 200, 25),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 40px",
            borderRadius: 12,
            background: `${colors.gold}22`,
            border: `2px solid ${colors.gold}`,
          }}
        >
          <span style={{ fontSize: 24, color: colors.gold, fontWeight: 700 }}>
            소유권 100% XERIX 귀속 · 추가 비용 없음
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 08 - Differentiation
// ============================================================
const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const diffs = [
    {
      no: "01",
      title: "Dual-bank OTA",
      sub: "안전한 원격 펌웨어 업그레이드",
      detail: "실패 시 자동 롤백 · 출하 후에도 무중단 업데이트",
      color: colors.primary,
    },
    {
      no: "02",
      title: "원격 진단",
      sub: "상세 로그 기반 트러블슈팅",
      detail: "현장 방문 없이 유지보수 비용 획기적 절감",
      color: colors.success,
    },
    {
      no: "03",
      title: "저전력 설계",
      sub: "산업용 24/7 운용 검증",
      detail: "Light/Deep sleep · 외부 기기 전원 스위칭",
      color: colors.gold,
    },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene08_advantage_ko.mp3")} />
      <TechBackground />
      <SectionTitle label="DIFFERENTIATION" title="유티텍의 차별점" />

      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          textAlign: "center",
          opacity: fadeIn(frame, 25, 20),
        }}
      >
        <div style={{ fontSize: 26, color: colors.textSub }}>
          단순 납품을 넘어, <span style={{ color: colors.gold, fontWeight: 700 }}>실전 검증된 자산</span>을 함께 제공합니다
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 360,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          padding: "0 80px",
        }}
      >
        {diffs.map((d, i) => {
          const delay = 50 + i * 25;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 22),
                transform: `translateY(${slideUp(frame, delay, 22, 60)}px)`,
              }}
            >
              <HoloCard width={460} height={400} borderColor={d.color}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 60,
                      fontWeight: 900,
                      color: d.color,
                      textShadow: `0 0 25px ${d.color}`,
                      letterSpacing: -2,
                    }}
                  >
                    {d.no}
                  </div>
                  <NeonText size={32} color={colors.text} style={{ marginTop: 4 }}>
                    {d.title}
                  </NeonText>
                  <div style={{ fontSize: 20, color: d.color, marginTop: 12, fontWeight: 600 }}>{d.sub}</div>
                  <div
                    style={{
                      fontSize: 18,
                      color: colors.textSub,
                      marginTop: 18,
                      lineHeight: 1.6,
                      borderTop: `1px solid ${d.color}55`,
                      paddingTop: 16,
                    }}
                  >
                    {d.detail}
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Scene 09 - Closing
// ============================================================
const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t1 = fadeIn(frame, 10, 25);
  const t2 = fadeIn(frame, 60, 25);
  const t3 = fadeIn(frame, 130, 25);
  const t4 = fadeIn(frame, 250, 25);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("xerix/scene09_closing_ko.mp3")} />
      <TechBackground />

      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          opacity: t1,
        }}
      >
        <div style={{ fontSize: 24, color: colors.highlight, letterSpacing: 8, fontWeight: 600, marginBottom: 14 }}>
          UTTEC × XERIX
        </div>
        <NeonText size={72}>함께 만들어가는 미래</NeonText>
      </div>

      <div
        style={{
          position: "absolute",
          top: 380,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
          opacity: t2,
        }}
      >
        {[
          { v: "40+", l: "년 RF 노하우" },
          { v: "PID", l: "검증된 제어 기술" },
          { v: "REVITA", l: "양산 직전 자산" },
        ].map((s, i) => (
          <HoloCard key={i} width={340} height={180} borderColor={colors.gold}>
            <div style={{ textAlign: "center" }}>
              <NeonText size={48} color={colors.gold}>
                {s.v}
              </NeonText>
              <div style={{ fontSize: 20, color: colors.text, marginTop: 14 }}>{s.l}</div>
            </div>
          </HoloCard>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 620,
          width: "100%",
          textAlign: "center",
          opacity: t3,
        }}
      >
        <div style={{ fontSize: 32, color: colors.text, lineHeight: 1.6 }}>
          <span style={{ color: colors.highlight, fontWeight: 700 }}>유티텍</span>은 XERIX XPR 고도화의
          <br />
          가장 신뢰할 수 있는 파트너입니다
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: t4,
        }}
      >
        <HoloCard width={900} style={{ margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 50 }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 26, color: colors.highlight, fontWeight: 700 }}>㈜유티텍 (UTTEC Co., Ltd.)</div>
              <div style={{ fontSize: 18, color: colors.textSub, marginTop: 10, lineHeight: 1.7 }}>
                📍 경기도 용인시 기흥구 흥덕중앙로 120
                <br />
                📞 031-627-2250 · 🌐 www.uttec.co.kr
              </div>
            </div>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Main Composition
// ============================================================
export const XerixProposalVideoKO: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg, fontFamily: "Pretendard, sans-serif" }}>
      <Sequence from={SCENE_TIMINGS.s01.start} durationInFrames={SCENE_TIMINGS.s01.duration}>
        <Scene01 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s02.start} durationInFrames={SCENE_TIMINGS.s02.duration}>
        <Scene02 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s03.start} durationInFrames={SCENE_TIMINGS.s03.duration}>
        <Scene03 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s04.start} durationInFrames={SCENE_TIMINGS.s04.duration}>
        <Scene04 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s05.start} durationInFrames={SCENE_TIMINGS.s05.duration}>
        <Scene05 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s06.start} durationInFrames={SCENE_TIMINGS.s06.duration}>
        <Scene06 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s07.start} durationInFrames={SCENE_TIMINGS.s07.duration}>
        <Scene07 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s08.start} durationInFrames={SCENE_TIMINGS.s08.duration}>
        <Scene08 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.s09.start} durationInFrames={SCENE_TIMINGS.s09.duration}>
        <Scene09 />
      </Sequence>
    </AbsoluteFill>
  );
};
