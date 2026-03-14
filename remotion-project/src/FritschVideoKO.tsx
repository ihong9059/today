import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

// ============ SCENE TIMINGS (30fps 기준) ============
// 오디오 길이 기반: KO Scene 1(22.6s), 2(59.0s), 3(68.4s), 4(39.5s), 5(61.9s), 6(47.3s), 7(50.2s), 8(56.4s), 9(43.9s), 10(43.1s)
export const SCENE_TIMINGS_KO = {
  scene01_opening: { duration: Math.ceil(22.6 * 30) + 30, start: 0 },
  scene02_principles: { duration: Math.ceil(59.0 * 30) + 30, start: 0 },
  scene03_ball_mill: { duration: Math.ceil(68.4 * 30) + 30, start: 0 },
  scene04_vibratory: { duration: Math.ceil(39.5 * 30) + 30, start: 0 },
  scene05_rotor_cutting: { duration: Math.ceil(61.9 * 30) + 30, start: 0 },
  scene06_jaw_disk: { duration: Math.ceil(47.3 * 30) + 30, start: 0 },
  scene07_cup_beater: { duration: Math.ceil(50.2 * 30) + 30, start: 0 },
  scene08_analysis: { duration: Math.ceil(56.4 * 30) + 30, start: 0 },
  scene09_image_divider: { duration: Math.ceil(43.9 * 30) + 30, start: 0 },
  scene10_closing: { duration: Math.ceil(43.1 * 30) + 30, start: 0 },
};

// 시작 프레임 계산
let currentStart = 0;
for (const key of Object.keys(SCENE_TIMINGS_KO) as (keyof typeof SCENE_TIMINGS_KO)[]) {
  SCENE_TIMINGS_KO[key].start = currentStart;
  currentStart += SCENE_TIMINGS_KO[key].duration;
}

export const FRITSCH_VIDEO_KO_DURATION = currentStart;

// ============ COLORS (FRITSCH 스타일) ============
const colors = {
  bg: {
    dark: "#0F172A", // Dark Blue
  },
  primary: "#8B5CF6", // Purple accent
  secondary: "#3B82F6", // Blue
  accent: "#F59E0B", // Orange
  success: "#10B981",
  danger: "#EF4444",
  white: "#FFFFFF",
  gray: {
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  } as { [key: number]: string },
  fritsch: {
    blue: "#0066B3",
    darkBlue: "#003366",
    orange: "#F5A623",
    green: "#00A86B",
  },
};

// ============ HELPER FUNCTIONS ============
const fadeIn = (frame: number, start: number = 0, duration: number = 30) =>
  interpolate(frame, [start, start + duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const fadeOut = (frame: number, start: number, duration: number = 30) =>
  interpolate(frame, [start, start + duration], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const slideUp = (frame: number, start: number = 0, duration: number = 30, distance: number = 50) =>
  interpolate(frame, [start, start + duration], [distance, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const slideIn = (frame: number, start: number = 0, duration: number = 30, distance: number = 100) =>
  interpolate(frame, [start, start + duration], [-distance, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  Math.min(spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } }), 1);

// ============ BACKGROUND COMPONENTS ============
const DigitalGridBackground: React.FC<{ color1?: string; color2?: string }> = ({
  color1 = "#0F172A",
  color2 = "#1E3A8A"
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {/* 기본 그라데이션 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 50%, ${color1} 100%)`,
        }}
      />
      {/* 디지털 그리드 */}
      <svg
        style={{ position: "absolute", inset: 0, opacity: 0.15 }}
        width="1920"
        height="1080"
      >
        {/* 수평선 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 54}
            x2="1920"
            y2={i * 54}
            stroke={colors.primary}
            strokeWidth="1"
            opacity={0.3 + Math.sin((frame + i * 10) / 30) * 0.2}
          />
        ))}
        {/* 수직선 */}
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 54}
            y1="0"
            x2={i * 54}
            y2="1080"
            stroke={colors.primary}
            strokeWidth="1"
            opacity={0.3 + Math.sin((frame + i * 15) / 40) * 0.2}
          />
        ))}
      </svg>
      {/* 빛나는 오브 */}
      {[0, 1, 2].map((i) => {
        const x = 400 + Math.sin((frame + i * 100) / 80) * 400;
        const y = 300 + Math.cos((frame + i * 100) / 60) * 250;
        const size = 300 + i * 100;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${colors.primary}25 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const NanoParticles: React.FC<{ count?: number; color?: string }> = ({ count = 30, color = colors.white }) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.2 + (i % 5) * 0.15;
        const size = 2 + (i % 5) * 1.5;

        const x = baseX + Math.sin((frame * speed + i * 50) / 40) * 40;
        const y = (baseY + frame * speed * 0.5) % 1200 - 60;
        const opacity = 0.1 + Math.sin((frame + i * 20) / 30) * 0.1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
          />
        );
      })}
    </>
  );
};

// ============ GLOBAL OVERLAY ============
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const logoOpacity = fadeIn(frame, 0, 30);

  return (
    <>
      {/* FRITSCH 로고 (왼쪽 상단) */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          zIndex: 1000,
          opacity: logoOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            padding: "10px 20px",
            background: `linear-gradient(135deg, ${colors.fritsch.blue} 0%, ${colors.fritsch.darkBlue} 100%)`,
            borderRadius: 8,
            boxShadow: `0 4px 15px ${colors.fritsch.blue}60`,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.white,
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 2,
            }}
          >
            FRITSCH
          </span>
        </div>
      </div>
      {/* Made in Germany (오른쪽 상단) */}
      <div
        style={{
          position: "absolute",
          top: 35,
          right: 40,
          zIndex: 1000,
          opacity: logoOpacity,
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: colors.gray[400],
            fontFamily: "Orbitron, sans-serif",
            letterSpacing: 1,
          }}
        >
          Made in Germany
        </span>
      </div>
    </>
  );
};

// ============ UI COMPONENTS ============
const GlowText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
  glowColor?: string;
}> = ({ children, fontSize = 72, color = colors.white, glowColor = colors.primary }) => (
  <span
    style={{
      fontSize,
      fontWeight: "bold",
      color,
      fontFamily: "Orbitron, sans-serif",
      textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}60`,
    }}
  >
    {children}
  </span>
);

const Card: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  borderColor?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ children, width = 400, borderColor = colors.primary, glow = true, style = {} }) => (
  <div
    style={{
      width,
      padding: 30,
      backgroundColor: `${colors.gray[900]}ee`,
      borderRadius: 20,
      border: `2px solid ${borderColor}`,
      boxShadow: glow ? `0 0 30px ${borderColor}40, 0 15px 40px rgba(0,0,0,0.5)` : "0 15px 40px rgba(0,0,0,0.5)",
      backdropFilter: "blur(10px)",
      ...style,
    }}
  >
    {children}
  </div>
);

const ProductCard: React.FC<{
  name: string;
  model: string;
  description: string;
  specs: string[];
  delay: number;
  color?: string;
}> = ({ name, model, description, specs, delay, color = colors.primary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        opacity: fadeIn(frame, delay, 30),
        transform: `scale(${scaleIn(frame, fps, delay)})`,
      }}
    >
      <Card width={450} borderColor={color}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, color: color, fontWeight: "bold", marginBottom: 5 }}>
            {model}
          </div>
          <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
            {name}
          </div>
          <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 20, lineHeight: 1.5 }}>
            {description}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {specs.map((spec, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 15px",
                  backgroundColor: `${color}20`,
                  borderRadius: 8,
                  fontSize: 16,
                  color: colors.gray[200],
                }}
              >
                {spec}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

// ============ SCENE 1: OPENING ============
const Scene01Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = scaleIn(frame, fps, 20);
  const pulseScale = 1 + Math.sin(frame / 15) * 0.03;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene01_opening.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#1E3A8A" />
      <NanoParticles count={40} color={colors.primary} />

      {/* FRITSCH 로고 중앙 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 20, 40),
          transform: `scale(${logoScale * pulseScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${colors.fritsch.blue} 0%, ${colors.fritsch.darkBlue} 100%)`,
            borderRadius: 20,
            boxShadow: `0 0 60px ${colors.primary}60, 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          <span
            style={{
              fontSize: 96,
              fontWeight: "bold",
              color: colors.white,
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 8,
            }}
          >
            FRITSCH
          </span>
        </div>
      </div>

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 80, 40),
          transform: `translateY(${slideUp(frame, 80, 40)}px)`,
        }}
      >
        <GlowText fontSize={64} glowColor={colors.primary}>
          나노 분쇄 기술의 최고봉
        </GlowText>
      </div>

      {/* Made in Germany */}
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 150, 40),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "15px 50px",
            border: `2px solid ${colors.fritsch.orange}`,
            borderRadius: 40,
          }}
        >
          <span
            style={{
              fontSize: 36,
              color: colors.fritsch.orange,
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: 3,
            }}
          >
            Made in Germany
          </span>
        </div>
      </div>

      {/* 태명과학 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        <span style={{ fontSize: 28, color: colors.gray[400] }}>
          국내 공급: <span style={{ color: colors.white, fontWeight: "bold" }}>태명과학</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: MILLING PRINCIPLES ============
const Scene02Principles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const principles = [
    { name: "Pressure", korean: "압력", icon: "⬇️", equipment: "Jaw Crusher", color: colors.danger },
    { name: "Impact", korean: "충격", icon: "💥", equipment: "Ball Mill, Cup Mill", color: colors.fritsch.orange },
    { name: "Friction", korean: "마찰", icon: "🔄", equipment: "Mortar Grinder, Disk Mill", color: colors.success },
    { name: "Shearing", korean: "전단", icon: "✂️", equipment: "고정면/이동면", color: colors.secondary },
    { name: "Cutting", korean: "절단", icon: "🔪", equipment: "Cutting Mill, Knife Mill", color: colors.primary },
  ];

  const activeIndex = Math.min(Math.floor(frame / 300), 4);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene02_principles.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#312E81" />
      <NanoParticles count={25} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={56} glowColor={colors.primary}>분쇄의 5가지 원리</GlowText>
      </div>

      {/* 원리 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 25,
          padding: "0 60px",
        }}
      >
        {principles.map((principle, i) => {
          const delay = 60 + i * 150;
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;

          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 30),
                transform: `scale(${scaleIn(frame, fps, delay)})`,
              }}
            >
              <Card
                width={320}
                borderColor={isActive ? principle.color : colors.gray[700]}
                style={{
                  backgroundColor: isCurrent ? `${principle.color}15` : `${colors.gray[900]}ee`,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 48, marginBottom: 10 }}>{principle.icon}</div>
                  <div
                    style={{
                      fontSize: 28,
                      color: isActive ? principle.color : colors.gray[500],
                      fontWeight: "bold",
                      fontFamily: "Orbitron, sans-serif",
                    }}
                  >
                    {principle.name}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      color: isActive ? colors.white : colors.gray[600],
                      marginBottom: 10,
                    }}
                  >
                    {principle.korean}
                  </div>
                  <div
                    style={{
                      padding: "10px 15px",
                      backgroundColor: colors.gray[800],
                      borderRadius: 10,
                      fontSize: 14,
                      color: isActive ? colors.gray[300] : colors.gray[600],
                    }}
                  >
                    {principle.equipment}
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 하단 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 1200, 40),
        }}
      >
        <Card width={900} borderColor={colors.primary} style={{ display: "inline-block" }}>
          <span style={{ fontSize: 26, color: colors.gray[100] }}>
            분쇄 원리를 이해하면 <span style={{ color: colors.primary, fontWeight: "bold" }}>최적의 장비</span>를 선택할 수 있습니다
          </span>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: HIGH-ENERGY BALL MILL ============
const Scene03BallMill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotationAngle = frame * 2;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene03_ball_mill.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#1E40AF" />
      <NanoParticles count={30} color={colors.secondary} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={52} glowColor={colors.secondary}>High-Energy Ball Mill</GlowText>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 24, color: colors.gray[400] }}>유성형 볼 밀 - FRITSCH 대표 제품</span>
        </div>
      </div>

      {/* 작동 원리 시각화 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 80,
          opacity: fadeIn(frame, 60, 40),
        }}
      >
        <Card width={500} borderColor={colors.secondary}>
          <div style={{ fontSize: 26, color: colors.white, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
            작동 원리
          </div>
          {/* 회전 애니메이션 */}
          <svg width="440" height="200" viewBox="0 0 440 200">
            {/* Main Disk */}
            <circle
              cx="220"
              cy="100"
              r="80"
              fill="none"
              stroke={colors.gray[600]}
              strokeWidth="3"
              strokeDasharray="10,5"
            />
            {/* Main Disk 회전 화살표 */}
            <g transform={`rotate(${rotationAngle}, 220, 100)`}>
              <circle cx="220" cy="100" r="70" fill="none" stroke={colors.secondary} strokeWidth="2" />
              <polygon points="290,100 280,95 280,105" fill={colors.secondary} />
            </g>
            {/* Grinding Bowl 1 */}
            <g transform={`rotate(${-rotationAngle * 1.5}, 160, 100)`}>
              <circle cx="160" cy="100" r="25" fill={colors.primary} opacity="0.5" />
              <circle cx="160" cy="100" r="20" fill="none" stroke={colors.primary} strokeWidth="2" />
            </g>
            {/* Grinding Bowl 2 */}
            <g transform={`rotate(${-rotationAngle * 1.5}, 280, 100)`}>
              <circle cx="280" cy="100" r="25" fill={colors.primary} opacity="0.5" />
              <circle cx="280" cy="100" r="20" fill="none" stroke={colors.primary} strokeWidth="2" />
            </g>
            {/* 라벨 */}
            <text x="220" y="195" fill={colors.gray[300]} fontSize="14" textAnchor="middle">Main-disk 공전 / Bowl 자전</text>
          </svg>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 15 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, color: colors.fritsch.orange, fontWeight: "bold" }}>95G</div>
              <div style={{ fontSize: 14, color: colors.gray[400] }}>중력가속도</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold" }}>1,100 RPM</div>
              <div style={{ fontSize: 14, color: colors.gray[400] }}>최대 회전속도</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 제품 라인업 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: 80,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          opacity: fadeIn(frame, 200, 40),
        }}
      >
        <Card width={550} borderColor={colors.primary}>
          <div style={{ fontSize: 22, color: colors.primary, fontWeight: "bold", marginBottom: 15 }}>
            PULVERISETTE 5, 6, 7 Premium
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 8 }}>건식 분쇄</div>
              <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>5 μm 이내</div>
            </div>
            <div>
              <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 8 }}>습식 분쇄</div>
              <div style={{ fontSize: 24, color: colors.success, fontWeight: "bold" }}>0.1 μm (나노)</div>
            </div>
          </div>
        </Card>

        <Card width={550} borderColor={colors.gray[600]}>
          <div style={{ fontSize: 20, color: colors.white, marginBottom: 15 }}>
            다양한 Bowl/Ball 재질
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Agate", "Zirconium Oxide", "Tungsten Carbide", "Stainless Steel"].map((material, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 16px",
                  backgroundColor: colors.gray[800],
                  borderRadius: 8,
                  fontSize: 14,
                  color: colors.gray[300],
                  border: `1px solid ${colors.gray[700]}`,
                }}
              >
                {material}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 15, fontSize: 16, color: colors.success }}>
            → 시료 오염 최소화
          </div>
        </Card>
      </div>

      {/* 실적 강조 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 600, 40),
        }}
      >
        <Card width={1000} borderColor={colors.fritsch.orange} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 28, color: colors.white }}>
              국내 국가기관연구소, 기업연구소, 학교실험실에{" "}
              <span style={{ color: colors.fritsch.orange, fontWeight: "bold", fontSize: 36 }}>1,000대 이상</span> 납품
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: VIBRATORY BALL MILL ============
const Scene04Vibratory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const vibrationY = Math.sin(frame / 3) * 5;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene04_vibratory.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#065F46" />
      <NanoParticles count={25} color={colors.success} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={56} glowColor={colors.success}>Vibratory Ball Mill</GlowText>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 24, color: colors.gray[400] }}>상하 진동 분쇄 장비</span>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* 진동 시각화 */}
        <div style={{ opacity: fadeIn(frame, 60, 40) }}>
          <Card width={450} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>작동 메커니즘</span>
            </div>
            <svg width="390" height="180" viewBox="0 0 390 180">
              {/* 진동 Bowl */}
              <g transform={`translate(0, ${vibrationY})`}>
                <rect x="95" y="50" width="200" height="80" rx="15" fill={colors.gray[700]} stroke={colors.success} strokeWidth="2" />
                {/* 볼들 */}
                <circle cx="145" cy="90" r="12" fill={colors.success} opacity="0.8" />
                <circle cx="195" cy="85" r="15" fill={colors.success} opacity="0.6" />
                <circle cx="245" cy="95" r="10" fill={colors.success} opacity="0.9" />
              </g>
              {/* 화살표 */}
              <line x1="195" y1="145" x2="195" y2="170" stroke={colors.success} strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="195" y1="40" x2="195" y2="15" stroke={colors.success} strokeWidth="2" markerEnd="url(#arrow)" />
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill={colors.success} />
                </marker>
              </defs>
              <text x="195" y="178" fill={colors.gray[400]} fontSize="12" textAnchor="middle">상하 진동</text>
            </svg>
          </Card>
        </div>

        {/* 제품 정보 */}
        <div style={{ opacity: fadeIn(frame, 150, 40) }}>
          <Card width={550} borderColor={colors.primary}>
            <div style={{ fontSize: 24, color: colors.primary, fontWeight: "bold", marginBottom: 20 }}>
              PULVERISETTE 23
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <span style={{ fontSize: 32 }}>🧪</span>
                <div>
                  <div style={{ fontSize: 18, color: colors.gray[400] }}>Grinding Bowl</div>
                  <div style={{ fontSize: 22, color: colors.white }}>5, 10, 15 ml</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <span style={{ fontSize: 32 }}>❄️</span>
                <div>
                  <div style={{ fontSize: 18, color: colors.gray[400] }}>동결분쇄</div>
                  <div style={{ fontSize: 22, color: colors.white }}>Liquid Nitrogen 사용</div>
                </div>
              </div>
              <div
                style={{
                  padding: "15px 20px",
                  backgroundColor: `${colors.success}20`,
                  borderRadius: 12,
                  marginTop: 10,
                }}
              >
                <div style={{ fontSize: 18, color: colors.success, marginBottom: 10, fontWeight: "bold" }}>적용 분야</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Hair", "Bone", "Teeth", "LCD Glass", "Camera", "Keypad"].map((item, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "5px 12px",
                        backgroundColor: colors.gray[800],
                        borderRadius: 6,
                        fontSize: 14,
                        color: colors.gray[200],
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 하단 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <span style={{ fontSize: 24, color: colors.gray[300] }}>
          3ml 이하 <span style={{ color: colors.success }}>소량 샘플</span> 분쇄에 최적화 |{" "}
          <span style={{ color: colors.fritsch.orange }}>RoHS 분석</span>용 전자폐기물 분쇄에 필수
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: ROTOR & CUTTING MILL ============
const Scene05RotorCutting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotorAngle = frame * 4;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene05_rotor_cutting.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#7C2D12" />
      <NanoParticles count={25} color={colors.fritsch.orange} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={52} glowColor={colors.fritsch.orange}>Rotor Mill & Cutting Mill</GlowText>
      </div>

      {/* 제품 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {/* PULVERISETTE 14 */}
        <div style={{ opacity: fadeIn(frame, 60, 40), transform: `scale(${scaleIn(frame, fps, 60)})` }}>
          <Card width={520} borderColor={colors.fritsch.orange}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 22, color: colors.fritsch.orange, fontWeight: "bold" }}>PULVERISETTE 14</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Rotor Mill</div>
            </div>
            {/* 회전 시각화 */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke={colors.gray[700]} strokeWidth="2" />
                <g transform={`rotate(${rotorAngle}, 60, 60)`}>
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <rect
                      key={i}
                      x="55"
                      y="15"
                      width="10"
                      height="25"
                      fill={colors.fritsch.orange}
                      transform={`rotate(${angle}, 60, 60)`}
                      rx="2"
                    />
                  ))}
                </g>
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>6,000-20,000</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>RPM</div>
              </div>
            </div>
            <div style={{ padding: "12px", backgroundColor: colors.gray[800], borderRadius: 10 }}>
              <div style={{ fontSize: 16, color: colors.gray[300], marginBottom: 8 }}>적용 샘플</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["PVC", "PP", "PE", "Rubber", "Polymer"].map((item, i) => (
                  <span key={i} style={{ padding: "4px 10px", backgroundColor: colors.gray[700], borderRadius: 4, fontSize: 13, color: colors.gray[200] }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* PULVERISETTE 19 */}
        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={520} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 22, color: colors.success, fontWeight: "bold" }}>PULVERISETTE 19</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Cutting Mill</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>300-3,000</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>RPM</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>70×80</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>mm 최대 샘플</div>
              </div>
            </div>
            <div style={{ marginBottom: 15 }}>
              <div style={{ fontSize: 16, color: colors.success, marginBottom: 10, fontWeight: "bold" }}>3가지 Rotor 타입</div>
              {[
                { name: "V-cutting Rotor", use: "Pellet, Granual" },
                { name: "Straight Cutting Edge", use: "목재, 식물" },
                { name: "Disk Milling Cutter", use: "Board, Chip" },
              ].map((rotor, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    backgroundColor: colors.gray[800],
                    borderRadius: 6,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 14, color: colors.white }}>{rotor.name}</span>
                  <span style={{ fontSize: 14, color: colors.gray[400] }}>{rotor.use}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 동결분쇄 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 600, 40),
        }}
      >
        <Card width={700} borderColor={colors.secondary} style={{ display: "inline-block" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <span style={{ fontSize: 40 }}>❄️</span>
            <span style={{ fontSize: 22, color: colors.white }}>
              <span style={{ color: colors.secondary, fontWeight: "bold" }}>Liquid Nitrogen</span> 동결분쇄로 열 변형 방지
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: JAW CRUSHER & DISK MILL ============
const Scene06JawDisk: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const crushProgress = Math.min(frame / 400, 1);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene06_jaw_disk.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#4C1D95" />
      <NanoParticles count={20} color={colors.primary} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={52} glowColor={colors.primary}>Jaw Crusher & Disk Mill</GlowText>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 24, color: colors.gray[400] }}>조분쇄 및 중간분쇄 장비</span>
        </div>
      </div>

      {/* 공정 흐름 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* 입력 샘플 */}
        <div style={{ opacity: fadeIn(frame, 60, 30), textAlign: "center" }}>
          <div
            style={{
              width: 100,
              height: 100,
              backgroundColor: colors.gray[700],
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 48 }}>🪨</span>
          </div>
          <div style={{ fontSize: 20, color: colors.white }}>95mm</div>
          <div style={{ fontSize: 14, color: colors.gray[400] }}>주먹 크기</div>
        </div>

        <div style={{ fontSize: 40, color: colors.primary, opacity: fadeIn(frame, 150, 30) }}>→</div>

        {/* Jaw Crusher */}
        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={350} borderColor={colors.danger}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: colors.danger, fontWeight: "bold" }}>PULVERISETTE 1</div>
              <div style={{ fontSize: 26, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>Jaw Crusher</div>
              <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 10 }}>시간당 최대 200kg</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                {["Clinker", "Quartz", "Granite", "Slag", "Coal"].map((item, i) => (
                  <span key={i} style={{ padding: "4px 10px", backgroundColor: colors.gray[800], borderRadius: 4, fontSize: 12, color: colors.gray[300] }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div style={{ fontSize: 40, color: colors.primary, opacity: fadeIn(frame, 350, 30) }}>→</div>

        {/* 중간 결과 */}
        <div style={{ opacity: fadeIn(frame, 400, 30), textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: colors.gray[700],
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 32 }}>⚫</span>
          </div>
          <div style={{ fontSize: 20, color: colors.white }}>1-15mm</div>
          <div style={{ fontSize: 14, color: colors.gray[400] }}>콩알 크기</div>
        </div>

        <div style={{ fontSize: 40, color: colors.primary, opacity: fadeIn(frame, 500, 30) }}>→</div>

        {/* Disk Mill */}
        <div style={{ opacity: fadeIn(frame, 550, 40), transform: `scale(${scaleIn(frame, fps, 550)})` }}>
          <Card width={350} borderColor={colors.secondary}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, color: colors.secondary, fontWeight: "bold" }}>PULVERISETTE 13</div>
              <div style={{ fontSize: 26, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>Disk Mill</div>
              <div style={{ fontSize: 18, color: colors.gray[300] }}>0.1 - 12mm</div>
              <div style={{ fontSize: 14, color: colors.gray[400] }}>설탕 크기로 분쇄</div>
            </div>
          </Card>
        </div>

        <div style={{ fontSize: 40, color: colors.primary, opacity: fadeIn(frame, 700, 30) }}>→</div>

        {/* 최종 결과 */}
        <div style={{ opacity: fadeIn(frame, 750, 30), textAlign: "center" }}>
          <div
            style={{
              width: 60,
              height: 60,
              backgroundColor: colors.success,
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              opacity: 0.7,
            }}
          >
            <span style={{ fontSize: 24 }}>✓</span>
          </div>
          <div style={{ fontSize: 20, color: colors.success }}>0.1-12mm</div>
          <div style={{ fontSize: 14, color: colors.gray[400] }}>설탕 크기</div>
        </div>
      </div>

      {/* 연속 공정 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 900, 40),
        }}
      >
        <Card width={800} borderColor={colors.success} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 24, color: colors.white }}>
              두 장비를 연결하면 <span style={{ color: colors.success, fontWeight: "bold" }}>대용량 샘플의 연속 처리</span>가 가능합니다
            </span>
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: CUP MILL & CROSS BEATER MILL ============
const Scene07CupBeater: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene07_cup_beater.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#1E3A8A" />
      <NanoParticles count={25} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={52} glowColor={colors.secondary}>Cup Mill & Cross Beater Mill</GlowText>
      </div>

      {/* 제품 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* Cup Mill */}
        <div style={{ opacity: fadeIn(frame, 60, 40), transform: `scale(${scaleIn(frame, fps, 60)})` }}>
          <Card width={550} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: colors.primary, fontWeight: "bold" }}>PULVERISETTE 9</div>
              <div style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>Cup Mill</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 18, color: colors.gray[300], marginBottom: 10, textAlign: "center" }}>
                링과 퍽의 원형 수평진동
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>12mm</div>
                  <div style={{ fontSize: 14, color: colors.gray[400] }}>입력 크기</div>
                </div>
                <div style={{ fontSize: 32, color: colors.primary }}>→</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>20 μm</div>
                  <div style={{ fontSize: 14, color: colors.gray[400] }}>출력 크기</div>
                </div>
              </div>
            </div>
            <div style={{ padding: "15px", backgroundColor: `${colors.primary}15`, borderRadius: 12 }}>
              <div style={{ fontSize: 16, color: colors.primary, marginBottom: 10, fontWeight: "bold" }}>적용 분야</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 15, color: colors.gray[200] }}>Mining: Coal, Ores, Minerals</div>
                <div style={{ fontSize: 15, color: colors.gray[200] }}>Metallurgy: Slag, Cast Iron</div>
                <div style={{ fontSize: 15, color: colors.fritsch.orange }}>XRF 분석용 시료 전처리에 이상적</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Cross Beater Mill */}
        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={550} borderColor={colors.fritsch.orange}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: colors.fritsch.orange, fontWeight: "bold" }}>PULVERISETTE 16</div>
              <div style={{ fontSize: 30, color: colors.white, fontWeight: "bold" }}>Cross Beater Mill</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold" }}>2,850</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>RPM</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold" }}>80 L/h</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>처리량</div>
              </div>
            </div>
            <div style={{ padding: "15px", backgroundColor: `${colors.fritsch.orange}15`, borderRadius: 12 }}>
              <div style={{ fontSize: 16, color: colors.fritsch.orange, marginBottom: 10, fontWeight: "bold" }}>적용 분야</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 15, color: colors.gray[200] }}>농업: Grain, Seed</div>
                <div style={{ fontSize: 15, color: colors.gray[200] }}>지질학: Limestone, Potite</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 8: ANALYSIS EQUIPMENT ============
const Scene08Analysis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene08_analysis.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#065F46" />
      <NanoParticles count={25} color={colors.success} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={48} glowColor={colors.success}>분석 장비 - Sieve Shaker & PSA</GlowText>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 22, color: colors.gray[400] }}>분쇄 후 정확한 입도 분석</span>
        </div>
      </div>

      {/* 제품 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "16%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {/* Sieve Shaker */}
        <div style={{ opacity: fadeIn(frame, 60, 40), transform: `scale(${scaleIn(frame, fps, 60)})` }}>
          <Card width={520} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: colors.primary, fontWeight: "bold" }}>ANALYSETTE 3 PRO</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Sieve Shaker</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>체 진동기</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, color: colors.white, fontWeight: "bold" }}>20 μm - 63 mm</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>측정 범위</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: colors.success }}>✓</span>
                <span style={{ fontSize: 16, color: colors.gray[200] }}>최대 10개 Sieve 동시 장착</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: colors.success }}>✓</span>
                <span style={{ fontSize: 16, color: colors.gray[200] }}>건식 체질</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: colors.success }}>✓</span>
                <span style={{ fontSize: 16, color: colors.gray[200] }}>ISO 9001 품질 관리 기준 충족</span>
              </div>
            </div>
          </Card>
        </div>

        {/* PSA */}
        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={580} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: colors.success, fontWeight: "bold" }}>ANALYSETTE 22 NeXT</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Particle Size Analyzer</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>입도분석기 (레이저 회절법)</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, color: colors.secondary, fontWeight: "bold" }}>Micro</div>
                <div style={{ fontSize: 20, color: colors.white }}>0.5 - 1,500 μm</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, color: colors.primary, fontWeight: "bold" }}>Nano</div>
                <div style={{ fontSize: 20, color: colors.white }}>0.01 - 3,800 μm</div>
              </div>
            </div>
            <div
              style={{
                padding: "12px 15px",
                backgroundColor: `${colors.success}15`,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24 }}>🟢</span>
                <span style={{ fontSize: 16, color: colors.success }}>Green Laser 사용 - 정밀 분석</span>
              </div>
            </div>
            <div style={{ fontSize: 15, color: colors.gray[300] }}>
              자동 분산, 측정, 분석, 린싱, 리포팅 기능
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 9: IMAGE SIZER & SAMPLE DIVIDER ============
const Scene09ImageDivider: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene09_image_divider.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#312E81" />
      <NanoParticles count={25} color={colors.secondary} />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <GlowText fontSize={48} glowColor={colors.secondary}>Image Sizer & Sample Divider</GlowText>
      </div>

      {/* 제품 카드들 */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* Image Sizer */}
        <div style={{ opacity: fadeIn(frame, 60, 40), transform: `scale(${scaleIn(frame, fps, 60)})` }}>
          <Card width={550} borderColor={colors.primary}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: colors.primary, fontWeight: "bold" }}>ANALYSETTE 28</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Image Sizer</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>입자 모양 및 입도 분석기</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, color: colors.secondary, fontWeight: "bold" }}>5 MP</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>CMOS 카메라</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, color: colors.success, fontWeight: "bold" }}>75/초</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>이미지 촬영</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, color: colors.fritsch.orange, fontWeight: "bold" }}>5분</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>측정 시간</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {["Powder", "Solid", "Suspension", "Emulsion"].map((item, i) => (
                <span
                  key={i}
                  style={{
                    padding: "6px 14px",
                    backgroundColor: colors.gray[800],
                    borderRadius: 6,
                    fontSize: 14,
                    color: colors.gray[200],
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Sample Divider */}
        <div style={{ opacity: fadeIn(frame, 200, 40), transform: `scale(${scaleIn(frame, fps, 200)})` }}>
          <Card width={500} borderColor={colors.success}>
            <div style={{ textAlign: "center", marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: colors.success, fontWeight: "bold" }}>LABORETTE 27</div>
              <div style={{ fontSize: 28, color: colors.white, fontWeight: "bold" }}>Sample Divider</div>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>Rotary Cone 샘플 분주기</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, color: colors.success, fontWeight: "bold" }}>99.9%</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>정확도</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 15 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: colors.white }}>8 / 10 / 30</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>채널 선택</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: colors.white }}>~ 4,000 ml</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>처리량</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 10: CLOSING ============
const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseScale = 1 + Math.sin(frame / 20) * 0.02;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio/fritsch-ko/fritsch_ko_scene10_closing.mp3")} />
      <DigitalGridBackground color1="#0F172A" color2="#1E3A8A" />
      <NanoParticles count={40} color={colors.primary} />

      {/* 태명과학 소개 */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 40),
        }}
      >
        <Card width={900} borderColor={colors.fritsch.blue} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, color: colors.white, fontWeight: "bold", marginBottom: 15 }}>
              태명과학 테스트 서비스
            </div>
            <div style={{ fontSize: 22, color: colors.gray[300], lineHeight: 1.6 }}>
              고객의 샘플에 맞는 최적의 분쇄장비 선정을 위한 테스트 서비스 운영
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              {["High-energy Ball Mill", "Cutting Mill", "Disk Mill"].map((item, i) => (
                <span
                  key={i}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: colors.gray[800],
                    borderRadius: 8,
                    fontSize: 18,
                    color: colors.gray[200],
                    border: `1px solid ${colors.fritsch.blue}`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 20, fontSize: 20, color: colors.success }}>
              분쇄완료된 샘플에 대한 입도분석까지 <span style={{ fontWeight: "bold" }}>One-Step 서비스</span> 제공
            </div>
          </div>
        </Card>
      </div>

      {/* 슬로건 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 200, 40),
          transform: `scale(${scaleIn(frame, fps, 200) * pulseScale})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "30px 80px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 60px ${colors.primary}60`,
          }}
        >
          <div style={{ fontSize: 36, color: colors.white, fontWeight: "bold", fontFamily: "Orbitron, sans-serif" }}>
            FRITSCH
          </div>
          <div style={{ fontSize: 28, color: colors.gray[200], marginTop: 10 }}>
            The Expert of Milling to Nano-scale
          </div>
        </div>
      </div>

      {/* Made in Germany */}
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 400, 40),
        }}
      >
        <span
          style={{
            fontSize: 32,
            color: colors.fritsch.orange,
            fontFamily: "Orbitron, sans-serif",
            letterSpacing: 4,
          }}
        >
          Made in Germany
        </span>
      </div>

      {/* 연락처 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 600, 40),
        }}
      >
        <div style={{ fontSize: 28, color: colors.white, marginBottom: 10 }}>
          태명과학: <span style={{ color: colors.primary, fontWeight: "bold" }}>031-458-0025</span>
        </div>
        <div style={{ fontSize: 24, color: colors.gray[400] }}>www.fritsch.co.kr</div>
      </div>

      {/* 감사 인사 */}
      <div
        style={{
          position: "absolute",
          bottom: "2%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 800, 40),
        }}
      >
        <span style={{ fontSize: 22, color: colors.gray[500] }}>감사합니다</span>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const FritschVideoKO: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg.dark }}>
      <Sequence from={SCENE_TIMINGS_KO.scene01_opening.start} durationInFrames={SCENE_TIMINGS_KO.scene01_opening.duration}>
        <Scene01Opening />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene02_principles.start} durationInFrames={SCENE_TIMINGS_KO.scene02_principles.duration}>
        <Scene02Principles />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene03_ball_mill.start} durationInFrames={SCENE_TIMINGS_KO.scene03_ball_mill.duration}>
        <Scene03BallMill />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene04_vibratory.start} durationInFrames={SCENE_TIMINGS_KO.scene04_vibratory.duration}>
        <Scene04Vibratory />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene05_rotor_cutting.start} durationInFrames={SCENE_TIMINGS_KO.scene05_rotor_cutting.duration}>
        <Scene05RotorCutting />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene06_jaw_disk.start} durationInFrames={SCENE_TIMINGS_KO.scene06_jaw_disk.duration}>
        <Scene06JawDisk />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene07_cup_beater.start} durationInFrames={SCENE_TIMINGS_KO.scene07_cup_beater.duration}>
        <Scene07CupBeater />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene08_analysis.start} durationInFrames={SCENE_TIMINGS_KO.scene08_analysis.duration}>
        <Scene08Analysis />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene09_image_divider.start} durationInFrames={SCENE_TIMINGS_KO.scene09_image_divider.duration}>
        <Scene09ImageDivider />
      </Sequence>

      <Sequence from={SCENE_TIMINGS_KO.scene10_closing.start} durationInFrames={SCENE_TIMINGS_KO.scene10_closing.duration}>
        <Scene10Closing />
      </Sequence>

      {/* 전체 영상에 FRITSCH 로고 오버레이 */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
