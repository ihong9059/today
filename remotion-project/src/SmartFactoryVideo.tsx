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

// ============ SCENE TIMINGS (30fps 기준, 실제 TTS 길이 기반) ============
// 각 씬의 음성 길이 + 3초 여유 (전환 효과용)
export const SCENE_TIMINGS = {
  scene01_intro: { duration: 810, start: 0 },              // 23.83s + 3s = ~27s
  scene02_overview: { duration: 1240, start: 810 },        // 38.21s + 3s = ~41s
  scene03_equipment: { duration: 1410, start: 2050 },      // 43.92s + 3s = ~47s
  scene04_sensors: { duration: 1440, start: 3460 },        // 44.95s + 3s = ~48s
  scene05_ai_detection: { duration: 1420, start: 4900 },   // 44.04s + 3s = ~47s
  scene06_fault_modes: { duration: 1340, start: 6320 },    // 41.42s + 3s = ~44s
  scene07_architecture: { duration: 1560, start: 7660 },   // 48.98s + 3s = ~52s
  scene08_roi: { duration: 1430, start: 9220 },            // 44.47s + 3s = ~47s
  scene09_closing: { duration: 1380, start: 10650 },       // 42.65s + 3s = ~46s
};

export const SMARTFACTORY_VIDEO_DURATION = 12030; // 약 6분 41초

// ============ AR/VR STYLE COLORS ============
const colors = {
  bg: "#0F172A",
  text: "#FFFFFF",
  accent: "#8B5CF6",
  primary: "#06B6D4",
  secondary: "#3B82F6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  grid: "#8B5CF620",
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
};

// ============ HELPER FUNCTIONS ============
const fadeIn = (frame: number, start: number = 0, duration: number = 30) =>
  interpolate(frame, [start, start + duration], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const slideUp = (frame: number, start: number = 0, duration: number = 30, distance: number = 50) =>
  interpolate(frame, [start, start + duration], [distance, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

const scaleIn = (frame: number, fps: number, delay: number = 0) =>
  Math.min(spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } }), 1);

// ============ AR/VR BACKGROUND ============
const ARVRBackground: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${colors.accent}15 0%, ${colors.bg} 60%)`,
        }}
      />

      <svg width="1920" height="1080" style={{ position: "absolute", opacity: 0.3 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={colors.accent} strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="gridMask">
            <rect width="1920" height="1080" fill="url(#gridFade)" />
          </mask>
        </defs>
        <rect width="1920" height="1080" fill="url(#grid)" mask="url(#gridMask)" />
        <line
          x1="0"
          y1={(frame * 2) % 1080}
          x2="1920"
          y2={(frame * 2) % 1080}
          stroke={colors.accent}
          strokeWidth="2"
          opacity="0.4"
        />
      </svg>

      {Array.from({ length: 30 }).map((_, i) => {
        const baseX = (i * 137.5) % 1920;
        const baseY = (i * 73.7) % 1080;
        const speed = 0.2 + (i % 5) * 0.15;
        const size = 3 + (i % 4) * 2;
        const x = baseX + Math.sin((frame * speed + i * 50) / 40) * 40;
        const y = (baseY - frame * speed * 0.5 + 1200) % 1200 - 60;
        const opacity = 0.2 + Math.sin((frame + i * 20) / 30) * 0.15;

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
              backgroundColor: i % 3 === 0 ? colors.accent : i % 3 === 1 ? colors.primary : colors.secondary,
              opacity,
              boxShadow: `0 0 ${size * 2}px ${i % 3 === 0 ? colors.accent : colors.primary}`,
            }}
          />
        );
      })}

      {/* VR Frame */}
      <div style={{ position: "absolute", inset: 0, border: `4px solid ${colors.accent}30`, borderRadius: 40, margin: 20 }} />
      <div style={{ position: "absolute", top: 25, left: 25, width: 100, height: 100, borderTop: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}`, borderTopLeftRadius: 35 }} />
      <div style={{ position: "absolute", top: 25, right: 25, width: 100, height: 100, borderTop: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}`, borderTopRightRadius: 35 }} />
      <div style={{ position: "absolute", bottom: 25, left: 25, width: 100, height: 100, borderBottom: `3px solid ${colors.accent}`, borderLeft: `3px solid ${colors.accent}`, borderBottomLeftRadius: 35 }} />
      <div style={{ position: "absolute", bottom: 25, right: 25, width: 100, height: 100, borderBottom: `3px solid ${colors.accent}`, borderRight: `3px solid ${colors.accent}`, borderBottomRightRadius: 35 }} />
    </AbsoluteFill>
  );
};

// ============ HOLOGRAPHIC CARD ============
const HoloCard: React.FC<{
  children: React.ReactNode;
  width?: number;
  borderColor?: string;
  style?: React.CSSProperties;
}> = ({ children, width = 400, borderColor = colors.accent, style = {} }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width,
        padding: 30,
        backgroundColor: `${colors.gray[900]}dd`,
        borderRadius: 20,
        border: `2px solid ${borderColor}`,
        boxShadow: `0 0 30px ${borderColor}40, inset 0 0 60px ${borderColor}10`,
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `-100%`,
          width: "50%",
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${borderColor}20, transparent)`,
          transform: `translateX(${(frame * 3) % 400}%)`,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

// ============ NEON TEXT ============
const NeonText: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
}> = ({ children, fontSize = 72, color = colors.accent }) => (
  <span
    style={{
      fontFamily: "'Orbitron', sans-serif",
      fontSize,
      fontWeight: "bold",
      color: colors.text,
      textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}80`,
      letterSpacing: 2,
    }}
  >
    {children}
  </span>
);

// ============ GLOBAL OVERLAY ============
const GlobalOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = fadeIn(frame, 0, 30);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 50,
          zIndex: 1000,
          opacity,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 20px ${colors.accent}60`,
          }}
        >
          <span style={{ fontSize: 28, fontWeight: "bold", color: colors.text }}>AI</span>
        </div>
        <div>
          <div style={{ fontSize: 24, fontWeight: "bold", color: colors.text, fontFamily: "'Orbitron', sans-serif" }}>
            SmartFactory
          </div>
          <div style={{ fontSize: 12, color: colors.gray[400] }}>
            AI-Powered Predictive Maintenance
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 40,
          right: 50,
          zIndex: 1000,
          opacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: colors.success,
              boxShadow: `0 0 10px ${colors.success}`,
            }}
          />
          <span style={{ fontSize: 14, color: colors.gray[300] }}>SYSTEM ONLINE</span>
        </div>
        <div
          style={{
            padding: "8px 16px",
            backgroundColor: `${colors.accent}20`,
            borderRadius: 8,
            border: `1px solid ${colors.accent}50`,
          }}
        >
          <span style={{ fontSize: 14, color: colors.accent, fontFamily: "'Orbitron', sans-serif" }}>
            2026.03
          </span>
        </div>
      </div>
    </>
  );
};

// ============ SCENE 1: INTRO ============
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = Math.sin(frame / 20) * 0.05 + 1;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene01_intro.mp3")} />
      <ARVRBackground />

      <div
        style={{
          position: "absolute",
          top: "20%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 30, 40),
          transform: `scale(${scaleIn(frame, fps, 30) * pulse})`,
        }}
      >
        <div style={{ marginBottom: 30 }}>
          <NeonText fontSize={72}>AI 고장예지</NeonText>
        </div>
        <div>
          <NeonText fontSize={56} color={colors.primary}>SmartFactory</NeonText>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 120, 40),
        }}
      >
        <HoloCard width={1100} style={{ display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, color: colors.text, marginBottom: 20 }}>
              배터리 재생 공장의 <span style={{ color: colors.accent }}>예지보전 시스템</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 60, marginTop: 25 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, color: colors.gray[400] }}>분쇄설비</div>
                <div style={{ fontSize: 22, color: colors.primary, fontWeight: "bold" }}>한국기계엔지니어링</div>
              </div>
              <div style={{ width: 2, height: 50, backgroundColor: colors.accent }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18, color: colors.gray[400] }}>분석설비</div>
                <div style={{ fontSize: 22, color: colors.primary, fontWeight: "bold" }}>태명과학 / FRITSCH</div>
              </div>
            </div>
          </div>
        </HoloCard>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: fadeIn(frame, 250, 40),
        }}
      >
        {[
          { icon: "⏱️", text: "비계획 정지 최소화" },
          { icon: "🔧", text: "설비 수명 연장" },
          { icon: "🔥", text: "발화/폭발 위험 감지" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "15px 30px",
              backgroundColor: `${colors.gray[800]}dd`,
              borderRadius: 15,
              border: `1px solid ${colors.accent}50`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 28 }}>{item.icon}</span>
            <span style={{ fontSize: 20, color: colors.gray[200] }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2: OVERVIEW (공정 흐름) ============
const Scene02Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const processes = [
    { name: "1차 파쇄", model: "이축 전단 파쇄기", spec: "50~100mm", rpm: "15~25 RPM" },
    { name: "2차 분쇄", model: "해머 크러셔", spec: "5~20mm", rpm: "600~1200 RPM" },
    { name: "3차 박리", model: "핀밀", spec: "미분쇄", rpm: "3000~6000 RPM" },
    { name: "분급/선별", model: "에어 클래시파이어", spec: "입도별 분급", rpm: "ACM" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene02_overview.mp3")} />
      <ARVRBackground />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <NeonText fontSize={52}>배터리 재활용 공정 흐름</NeonText>
      </div>

      {/* 입력 */}
      <div style={{ position: "absolute", top: "18%", left: 60, opacity: fadeIn(frame, 60, 30) }}>
        <div style={{ padding: "15px 30px", backgroundColor: `${colors.danger}30`, borderRadius: 12, border: `2px solid ${colors.danger}` }}>
          <div style={{ fontSize: 22, color: colors.danger, fontWeight: "bold" }}>폐배터리 투입</div>
        </div>
      </div>

      {/* 공정 카드 */}
      <div style={{ position: "absolute", top: "28%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 25 }}>
        {processes.map((proc, i) => {
          const delay = 120 + i * 150;
          return (
            <React.Fragment key={i}>
              <div style={{ opacity: fadeIn(frame, delay, 40), transform: `scale(${scaleIn(frame, fps, delay)})` }}>
                <HoloCard width={300} borderColor={i === 0 ? colors.danger : i === 1 ? colors.warning : i === 2 ? colors.primary : colors.success}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 26, color: colors.text, fontWeight: "bold", marginBottom: 8 }}>{proc.name}</div>
                    <div style={{ fontSize: 16, color: colors.accent, marginBottom: 15 }}>{proc.model}</div>
                    <div style={{ padding: "12px", backgroundColor: colors.gray[800], borderRadius: 10 }}>
                      <div style={{ fontSize: 18, color: colors.primary, fontWeight: "bold" }}>{proc.spec}</div>
                      <div style={{ fontSize: 14, color: colors.gray[400], marginTop: 5 }}>{proc.rpm}</div>
                    </div>
                  </div>
                </HoloCard>
              </div>
              {i < processes.length - 1 && (
                <div style={{ alignSelf: "center", fontSize: 32, color: colors.accent, opacity: fadeIn(frame, delay + 80, 30) }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 센서 데이터 수집 */}
      <div style={{ position: "absolute", bottom: "18%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 700, 40) }}>
        <HoloCard width={1300} borderColor={colors.primary} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 24, color: colors.primary, fontWeight: "bold", marginBottom: 20 }}>
            실시간 센서 데이터 수집 → Edge AI Gateway → 클라우드 AI 플랫폼
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 30 }}>
            {[
              { sensor: "3축 진동 가속도계", spec: "0~200g, 10Hz~40kHz" },
              { sensor: "PT100/적외선 온도센서", spec: "-40~600°C" },
              { sensor: "CT 전류센서", spec: "0~300A, 5ms" },
              { sensor: "복합가스센서", spec: "VOC, H2, CO" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "12px 20px", backgroundColor: colors.gray[800], borderRadius: 10, border: `1px solid ${colors.primary}40` }}>
                <div style={{ fontSize: 16, color: colors.text, fontWeight: "bold" }}>{s.sensor}</div>
                <div style={{ fontSize: 13, color: colors.gray[400], marginTop: 4 }}>{s.spec}</div>
              </div>
            ))}
          </div>
        </HoloCard>
      </div>

      {/* 출력 */}
      <div style={{ position: "absolute", top: "18%", right: 60, opacity: fadeIn(frame, 650, 30) }}>
        <div style={{ padding: "15px 30px", backgroundColor: `${colors.success}30`, borderRadius: 12, border: `2px solid ${colors.success}` }}>
          <div style={{ fontSize: 22, color: colors.success, fontWeight: "bold" }}>블랙매스 출력</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3: EQUIPMENT (장비 라인업) ============
const Scene03Equipment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const equipment = [
    { name: "이축 전단 파쇄기", model: "SHREDDER", power: "2 x 55kW", rpm: "15~25 RPM", role: "대형 조각화 (50~100mm)", color: colors.danger },
    { name: "해머 크러셔", model: "HAMMER CRUSHER", power: "75kW", rpm: "600~1200 RPM", role: "소형 조각화 (5~20mm)", color: colors.warning },
    { name: "핀밀", model: "PIN MILL T-18P/T-24P", power: "5.5~37kW", rpm: "3000~6000 RPM", role: "유가금속 박리/미분쇄", color: colors.primary },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene03_equipment.mp3")} />
      <ARVRBackground />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <NeonText fontSize={52}>장비 라인업 상세 사양</NeonText>
        <div style={{ fontSize: 22, color: colors.gray[400], marginTop: 12 }}>한국기계엔지니어링 분쇄/파쇄 설비</div>
      </div>

      <div style={{ position: "absolute", top: "22%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40 }}>
        {equipment.map((eq, i) => {
          const delay = 80 + i * 180;
          return (
            <div key={i} style={{ opacity: fadeIn(frame, delay, 40), transform: `translateY(${slideUp(frame, delay, 40)}px)` }}>
              <HoloCard width={480} borderColor={eq.color}>
                <div>
                  <div style={{ fontSize: 28, color: colors.text, fontWeight: "bold", marginBottom: 8 }}>{eq.name}</div>
                  <div style={{ fontSize: 18, color: eq.color, marginBottom: 20 }}>{eq.model}</div>
                  <div style={{ padding: "20px", backgroundColor: colors.gray[800], borderRadius: 12, marginBottom: 15 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 14, color: colors.gray[400] }}>출력</div>
                        <div style={{ fontSize: 22, color: colors.primary, fontWeight: "bold" }}>{eq.power}</div>
                      </div>
                      <div style={{ width: 1, backgroundColor: colors.gray[600] }} />
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 14, color: colors.gray[400] }}>회전속도</div>
                        <div style={{ fontSize: 22, color: colors.success, fontWeight: "bold" }}>{eq.rpm}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 18, color: colors.gray[300], textAlign: "center", padding: "10px 0", borderTop: `1px solid ${colors.gray[700]}` }}>
                    {eq.role}
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      {/* 안전 시스템 */}
      <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 700, 40) }}>
        <HoloCard width={1200} borderColor={colors.danger} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 24, color: colors.danger, fontWeight: "bold", marginBottom: 20 }}>
            WASTE Li-ion BATTERY SYSTEM 안전 설계
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {[
              { icon: "💨", name: "N2 퍼지", desc: "불활성 가스 분위기 파쇄" },
              { icon: "💥", name: "ATEX 인증", desc: "방폭 전기장치 설계" },
              { icon: "🔥", name: "열감지 소화", desc: "자동 소화 시스템" },
              { icon: "🔒", name: "밀폐형 이송", desc: "분진 비산 방지" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40 }}>{item.icon}</div>
                <div style={{ fontSize: 18, color: colors.text, fontWeight: "bold", marginTop: 10 }}>{item.name}</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4: SENSORS (센서 구성) ============
const Scene04Sensors: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sensorSpecs = [
    { id: "VIB", name: "3축 진동 가속도계", range: "0~200g", freq: "10Hz~40kHz", sampling: "200μs", target: "베어링 마모, 축 불균형", count: 6, color: colors.primary },
    { id: "TMP", name: "PT100 + 적외선", range: "-40~600°C", freq: "-", sampling: "50ms~1s", target: "과열, 발화 감지 (10°C/s)", count: 8, color: colors.danger },
    { id: "CUR", name: "CT 전류센서", range: "0~300A", freq: "-", sampling: "2~10ms", target: "부하 변동, 마모 추정", count: 4, color: colors.warning },
    { id: "ACS", name: "MEMS/고주파 마이크", range: "20Hz~50kHz", freq: "-", sampling: "50~100μs", target: "음향 패턴 분석", count: 2, color: colors.success },
    { id: "GAS", name: "복합가스센서", range: "VOC, H2, CO", freq: "-", sampling: "1s", target: "전해액 누출 탐지", count: 1, color: colors.accent },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene04_sensors.mp3")} />
      <ARVRBackground />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <NeonText fontSize={52}>센서 구성 및 측정 사양</NeonText>
        <div style={{ fontSize: 28, color: colors.accent, marginTop: 15, opacity: fadeIn(frame, 60, 30) }}>
          총 <span style={{ fontSize: 48, fontWeight: "bold" }}>31</span>개 센서 배치
        </div>
      </div>

      <div style={{ position: "absolute", top: "22%", left: 60, right: 60 }}>
        {sensorSpecs.map((sensor, i) => {
          const delay = 120 + i * 120;
          return (
            <div
              key={i}
              style={{
                opacity: fadeIn(frame, delay, 40),
                transform: `translateX(${interpolate(frame, [delay, delay + 40], [-50, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })}px)`,
                marginBottom: 15,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "18px 30px",
                  backgroundColor: `${colors.gray[800]}dd`,
                  borderRadius: 15,
                  border: `2px solid ${sensor.color}50`,
                }}
              >
                <div style={{ width: 60, textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: "bold", color: sensor.color }}>{sensor.count}</div>
                </div>
                <div style={{ width: 200, marginLeft: 20 }}>
                  <div style={{ fontSize: 20, color: colors.text, fontWeight: "bold" }}>{sensor.name}</div>
                  <div style={{ fontSize: 14, color: colors.gray[400] }}>{sensor.id}</div>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "space-around" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: colors.gray[500] }}>측정 범위</div>
                    <div style={{ fontSize: 16, color: colors.text }}>{sensor.range}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: colors.gray[500] }}>주파수</div>
                    <div style={{ fontSize: 16, color: colors.text }}>{sensor.freq}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: colors.gray[500] }}>샘플링</div>
                    <div style={{ fontSize: 16, color: colors.primary }}>{sensor.sampling}</div>
                  </div>
                  <div style={{ textAlign: "center", width: 250 }}>
                    <div style={{ fontSize: 12, color: colors.gray[500] }}>모니터링 대상</div>
                    <div style={{ fontSize: 15, color: colors.success }}>{sensor.target}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: "8%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 800, 40) }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
          {[
            { equip: "1차 파쇄기", count: 12 },
            { equip: "2차 분쇄기", count: 10 },
            { equip: "박리기", count: 9 },
          ].map((eq, i) => (
            <div key={i} style={{ padding: "15px 35px", backgroundColor: `${colors.accent}15`, borderRadius: 12, border: `1px solid ${colors.accent}40` }}>
              <div style={{ fontSize: 18, color: colors.gray[300] }}>{eq.equip}</div>
              <div style={{ fontSize: 32, color: colors.accent, fontWeight: "bold" }}>{eq.count}개</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 5: AI DETECTION ============
const Scene05AIDetection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const algorithms = [
    { name: "베어링 이상 탐지", input: "진동 FFT 스펙트럼", algo: "Envelope Analysis + LSTM", accuracy: "95%+", time: "<10ms", color: colors.primary },
    { name: "RUL 잔여수명 예측", input: "시계열 특징 (sequence)", algo: "Transformer 기반 모델", accuracy: "±15%", time: "<50ms", color: colors.accent },
    { name: "칼날/핀 마모 예측", input: "48개 복합 특징", algo: "Gradient Boosting", accuracy: "92%+", time: "<5ms", color: colors.warning },
    { name: "음향 이상 분류", input: "멜스펙트로그램", algo: "1D-CNN", accuracy: "90%+", time: "<20ms", color: colors.success },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene05_ai_detection.mp3")} />
      <ARVRBackground />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <NeonText fontSize={52}>AI 고장예지 핵심 알고리즘</NeonText>
      </div>

      <div style={{ position: "absolute", top: "20%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", padding: "0 60px" }}>
        {algorithms.map((algo, i) => {
          const delay = 80 + i * 140;
          return (
            <div key={i} style={{ opacity: fadeIn(frame, delay, 40), transform: `scale(${scaleIn(frame, fps, delay)})` }}>
              <HoloCard width={420} borderColor={algo.color}>
                <div>
                  <div style={{ fontSize: 24, color: colors.text, fontWeight: "bold", marginBottom: 15 }}>{algo.name}</div>
                  <div style={{ padding: "15px", backgroundColor: colors.gray[800], borderRadius: 10, marginBottom: 15 }}>
                    <div style={{ fontSize: 13, color: colors.gray[500], marginBottom: 5 }}>입력 데이터</div>
                    <div style={{ fontSize: 16, color: colors.gray[200] }}>{algo.input}</div>
                    <div style={{ fontSize: 13, color: colors.gray[500], marginTop: 12, marginBottom: 5 }}>알고리즘</div>
                    <div style={{ fontSize: 16, color: algo.color, fontWeight: "bold" }}>{algo.algo}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: colors.gray[500] }}>정확도</div>
                      <div style={{ fontSize: 24, color: colors.success, fontWeight: "bold" }}>{algo.accuracy}</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: colors.gray[500] }}>추론시간</div>
                      <div style={{ fontSize: 24, color: colors.primary, fontWeight: "bold" }}>{algo.time}</div>
                    </div>
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 700, 40) }}>
        <HoloCard width={1100} borderColor={colors.primary} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 22, color: colors.primary, fontWeight: "bold", marginBottom: 15 }}>
            BPFO/BPFI 주파수 분석으로 외륜/내륜 손상 조기 파악
          </div>
          <div style={{ fontSize: 18, color: colors.gray[300] }}>
            잔여수명 100시간 미만 시 부품 교체 권고 → 비계획 정지 사전 방지
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6: FAULT MODES ============
const Scene06FaultModes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const faultModes = [
    { equip: "1차 파쇄기", fault: "베어링 손상", symptom: "고주파 진동↑, 온도↑", sensor: "VIB + TMP", method: "BPFO/BPFI 분석", color: colors.danger },
    { equip: "2차 분쇄기", fault: "해머 탈락", symptom: "급격한 진동↑, 불균형", sensor: "VIB + ACC", method: "충격 패턴 인식", color: colors.warning },
    { equip: "박리기", fault: "전해액 누출", symptom: "VOC/H2 농도 상승", sensor: "GAS-3A", method: "농도 임계값 감시", color: colors.accent },
  ];

  const alertLevels = [
    { level: "정상", color: colors.success, condition: "모든 지표 정상", action: "정상 운전" },
    { level: "주의", color: "#FBBF24", condition: "이상 확률 50~70%", action: "모니터링 강화" },
    { level: "경고", color: colors.warning, condition: "이상 확률 70~90%", action: "정비 계획 수립" },
    { level: "위험", color: colors.danger, condition: "이상 확률 90%+", action: "즉시 정지/정비" },
    { level: "긴급", color: "#DC2626", condition: "발화/폭발 위험", action: "자동 정지 + 대피" },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene06_fault_modes.mp3")} />
      <ARVRBackground />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <NeonText fontSize={52}>고장 모드 및 대응 체계</NeonText>
      </div>

      <div style={{ position: "absolute", top: "18%", left: 60, right: 60, opacity: fadeIn(frame, 80, 40) }}>
        <div style={{ display: "flex", gap: 30 }}>
          {faultModes.map((mode, i) => {
            const delay = 100 + i * 120;
            return (
              <div key={i} style={{ flex: 1, opacity: fadeIn(frame, delay, 40) }}>
                <HoloCard width="100%" borderColor={mode.color}>
                  <div>
                    <div style={{ fontSize: 18, color: mode.color, marginBottom: 5 }}>{mode.equip}</div>
                    <div style={{ fontSize: 24, color: colors.text, fontWeight: "bold", marginBottom: 15 }}>{mode.fault}</div>
                    <div style={{ padding: "15px", backgroundColor: colors.gray[800], borderRadius: 10 }}>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: colors.gray[500] }}>증상: </span>
                        <span style={{ fontSize: 15, color: colors.gray[200] }}>{mode.symptom}</span>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: colors.gray[500] }}>센서: </span>
                        <span style={{ fontSize: 15, color: colors.primary }}>{mode.sensor}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: 13, color: colors.gray[500] }}>감지: </span>
                        <span style={{ fontSize: 15, color: colors.success }}>{mode.method}</span>
                      </div>
                    </div>
                  </div>
                </HoloCard>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "12%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 550, 40) }}>
        <HoloCard width={1300} borderColor={colors.accent} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 22, color: colors.accent, fontWeight: "bold", marginBottom: 20 }}>5단계 알림 체계</div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {alertLevels.map((alert, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", backgroundColor: alert.color, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 15px ${alert.color}` }}>
                  <span style={{ fontSize: 20, fontWeight: "bold", color: i < 2 ? colors.gray[900] : colors.text }}>{i + 1}</span>
                </div>
                <div style={{ fontSize: 18, color: alert.color, fontWeight: "bold" }}>{alert.level}</div>
                <div style={{ fontSize: 12, color: colors.gray[400], marginTop: 5 }}>{alert.condition}</div>
                <div style={{ fontSize: 13, color: colors.gray[300], marginTop: 3 }}>{alert.action}</div>
              </div>
            ))}
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 7: ARCHITECTURE ============
const Scene07Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene07_architecture.mp3")} />
      <ARVRBackground />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <NeonText fontSize={52}>시스템 아키텍처</NeonText>
      </div>

      <div style={{ position: "absolute", top: "17%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 50 }}>
        {/* Edge Gateway */}
        <div style={{ opacity: fadeIn(frame, 80, 40), transform: `scale(${scaleIn(frame, fps, 80)})` }}>
          <HoloCard width={500} borderColor={colors.primary}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, color: colors.primary, fontWeight: "bold", marginBottom: 15 }}>Edge AI Gateway</div>
              <div style={{ padding: "20px", backgroundColor: colors.gray[800], borderRadius: 12, marginBottom: 15 }}>
                <div style={{ fontSize: 22, color: colors.text, fontWeight: "bold" }}>NVIDIA Jetson Orin NX</div>
                <div style={{ fontSize: 16, color: colors.gray[400], marginTop: 8 }}>16GB LPDDR5 • 512GB NVMe</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 15 }}>
                {[
                  { label: "ADC", spec: "32ch 24bit 100kHz" },
                  { label: "환경등급", spec: "IP65, -40~70°C" },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, color: colors.gray[500] }}>{item.label}</div>
                    <div style={{ fontSize: 15, color: colors.gray[200] }}>{item.spec}</div>
                  </div>
                ))}
              </div>
            </div>
          </HoloCard>
        </div>

        <div style={{ alignSelf: "center", fontSize: 48, color: colors.accent, opacity: fadeIn(frame, 200, 30) }}>⟷</div>

        {/* Cloud Platform */}
        <div style={{ opacity: fadeIn(frame, 250, 40), transform: `scale(${scaleIn(frame, fps, 250)})` }}>
          <HoloCard width={500} borderColor={colors.accent}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, color: colors.accent, fontWeight: "bold", marginBottom: 15 }}>AI 예지보전 플랫폼</div>
              <div style={{ padding: "20px", backgroundColor: colors.gray[800], borderRadius: 12, marginBottom: 15 }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  {["PyTorch", "TensorRT", "ONNX Runtime"].map((tech, i) => (
                    <div key={i} style={{ padding: "8px 15px", backgroundColor: colors.gray[700], borderRadius: 8 }}>
                      <span style={{ fontSize: 14, color: colors.text }}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 16, color: colors.gray[300] }}>
                LSTM Autoencoder • Transformer RUL • 1D-CNN 음향
              </div>
              <div style={{ fontSize: 14, color: colors.primary, marginTop: 10 }}>
                실시간 추론: 10~50ms
              </div>
            </div>
          </HoloCard>
        </div>
      </div>

      {/* Data Layer */}
      <div style={{ position: "absolute", top: "55%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 400, 40) }}>
        <HoloCard width={900} borderColor={colors.success} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 22, color: colors.success, fontWeight: "bold", marginBottom: 15 }}>데이터 레이어</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 50 }}>
            {[
              { db: "TimescaleDB", type: "시계열 DB" },
              { db: "InfluxDB", type: "메트릭 저장" },
              { db: "Redis", type: "실시간 캐시" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: colors.text, fontWeight: "bold" }}>{item.db}</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>{item.type}</div>
              </div>
            ))}
          </div>
        </HoloCard>
      </div>

      {/* UI Layer */}
      <div style={{ position: "absolute", bottom: "10%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 550, 40) }}>
        <HoloCard width={1000} borderColor={colors.secondary} style={{ display: "inline-block" }}>
          <div style={{ fontSize: 22, color: colors.secondary, fontWeight: "bold", marginBottom: 15 }}>사용자 인터페이스</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 60 }}>
            {[
              { icon: "🌐", name: "웹 대시보드", tech: "React.js" },
              { icon: "📱", name: "모바일 앱", tech: "Flutter" },
              { icon: "🖥️", name: "HMI 터치", tech: "Qt/QML" },
            ].map((ui, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40 }}>{ui.icon}</div>
                <div style={{ fontSize: 18, color: colors.text, fontWeight: "bold", marginTop: 8 }}>{ui.name}</div>
                <div style={{ fontSize: 14, color: colors.gray[400] }}>{ui.tech}</div>
              </div>
            ))}
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 8: ROI ============
const Scene08ROI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { label: "비계획 정지", before: "연 120시간", after: "연 36시간", reduction: "70%", color: colors.primary },
    { label: "정비 비용", before: "연 2억원", after: "연 1.2억원", reduction: "40%", color: colors.success },
    { label: "생산 손실", before: "연 3억원", after: "연 9천만원", reduction: "70%", color: colors.warning },
    { label: "안전사고", before: "연 5천만원", after: "연 1천만원", reduction: "80%", color: colors.danger },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene08_roi.mp3")} />
      <ARVRBackground />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 30) }}>
        <NeonText fontSize={52}>투자 대비 효과 분석</NeonText>
      </div>

      <div style={{ position: "absolute", top: "18%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30 }}>
        {stats.map((stat, i) => {
          const delay = 80 + i * 100;
          return (
            <div key={i} style={{ opacity: fadeIn(frame, delay, 40), transform: `scale(${scaleIn(frame, fps, delay)})` }}>
              <HoloCard width={340} borderColor={stat.color}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, color: colors.gray[400], marginBottom: 12 }}>{stat.label}</div>
                  <div style={{ fontSize: 16, color: colors.gray[500], marginBottom: 5 }}>{stat.before}</div>
                  <div style={{ fontSize: 24, color: colors.text }}>↓</div>
                  <div style={{ fontSize: 18, color: colors.text, fontWeight: "bold", marginBottom: 15 }}>{stat.after}</div>
                  <div style={{ fontSize: 48, fontWeight: "bold", color: stat.color, textShadow: `0 0 20px ${stat.color}60` }}>
                    -{stat.reduction}
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: "18%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 550, 40) }}>
        <HoloCard width={1100} borderColor={colors.accent} style={{ display: "inline-block" }}>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>초기 투자</div>
              <div style={{ fontSize: 14, color: colors.gray[500] }}>센서 31개 + Gateway + SW</div>
              <div style={{ fontSize: 36, color: colors.text, fontWeight: "bold", marginTop: 8 }}>7,500만원</div>
            </div>
            <div style={{ width: 2, height: 100, backgroundColor: colors.accent }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>연간 절감 효과</div>
              <div style={{ fontSize: 14, color: colors.gray[500] }}>총 비용 절감</div>
              <div style={{ fontSize: 36, color: colors.success, fontWeight: "bold", marginTop: 8 }}>3.65억원</div>
            </div>
            <div style={{ width: 2, height: 100, backgroundColor: colors.accent }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>투자 회수 기간</div>
              <div style={{ fontSize: 14, color: colors.gray[500] }}>Break-even</div>
              <div style={{ fontSize: 36, color: colors.warning, fontWeight: "bold", marginTop: 8 }}>약 2.5개월</div>
            </div>
            <div style={{ width: 2, height: 100, backgroundColor: colors.accent }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, color: colors.gray[400] }}>5년 ROI</div>
              <div style={{ fontSize: 14, color: colors.gray[500] }}>Return on Investment</div>
              <div style={{ fontSize: 36, color: colors.accent, fontWeight: "bold", marginTop: 8 }}>2,333%</div>
            </div>
          </div>
        </HoloCard>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 9: CLOSING ============
const Scene09Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phases = [
    { phase: "Phase 1", duration: "1~2개월", title: "파일럿 구축", items: ["1차 파쇄기 센서 설치", "Edge Gateway 연동", "기본 대시보드 구축"] },
    { phase: "Phase 2", duration: "2~3개월", title: "확장 구축", items: ["2차 분쇄기/박리기 센서", "AI 모델 학습/배포", "알림 시스템 연동"] },
    { phase: "Phase 3", duration: "3~6개월", title: "고도화", items: ["RUL 모델 정교화", "정비 스케줄 자동화", "ERP/MES 연동"] },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile("smartfactory/scene09_closing.mp3")} />
      <ARVRBackground />

      <div style={{ position: "absolute", top: "12%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 0, 40) }}>
        <NeonText fontSize={56}>구축 단계 및 일정</NeonText>
      </div>

      <div style={{ position: "absolute", top: "25%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40, opacity: fadeIn(frame, 80, 40) }}>
        {phases.map((phase, i) => {
          const delay = 120 + i * 150;
          return (
            <div key={i} style={{ opacity: fadeIn(frame, delay, 40), transform: `scale(${scaleIn(frame, fps, delay)})` }}>
              <HoloCard width={420} borderColor={i === 0 ? colors.primary : i === 1 ? colors.warning : colors.success}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20, color: colors.accent }}>{phase.phase}</div>
                  <div style={{ fontSize: 32, color: colors.text, fontWeight: "bold", margin: "10px 0" }}>{phase.duration}</div>
                  <div style={{ fontSize: 22, color: colors.gray[300], marginBottom: 15 }}>{phase.title}</div>
                  <div style={{ padding: "15px", backgroundColor: colors.gray[800], borderRadius: 10, textAlign: "left" }}>
                    {phase.items.map((item, j) => (
                      <div key={j} style={{ fontSize: 15, color: colors.gray[300], marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: colors.success }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </HoloCard>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, textAlign: "center", opacity: fadeIn(frame, 700, 40) }}>
        <div style={{ marginBottom: 30 }}>
          <span style={{ fontSize: 32, color: colors.gray[300] }}>
            배터리 재생 공장의 <span style={{ color: colors.accent, fontWeight: "bold" }}>스마트팩토리 혁신</span>
          </span>
        </div>
        <div
          style={{
            display: "inline-block",
            padding: "25px 80px",
            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`,
            borderRadius: 25,
            boxShadow: `0 0 40px ${colors.accent}60`,
          }}
        >
          <span style={{ fontSize: 28, color: colors.text, fontWeight: "bold" }}>
            저희와 함께 시작하시기 바랍니다
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ MAIN COMPONENT ============
export const SmartFactoryVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, fontFamily: "'Pretendard', sans-serif" }}>
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene02_overview.start} durationInFrames={SCENE_TIMINGS.scene02_overview.duration}>
        <Scene02Overview />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene03_equipment.start} durationInFrames={SCENE_TIMINGS.scene03_equipment.duration}>
        <Scene03Equipment />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene04_sensors.start} durationInFrames={SCENE_TIMINGS.scene04_sensors.duration}>
        <Scene04Sensors />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene05_ai_detection.start} durationInFrames={SCENE_TIMINGS.scene05_ai_detection.duration}>
        <Scene05AIDetection />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene06_fault_modes.start} durationInFrames={SCENE_TIMINGS.scene06_fault_modes.duration}>
        <Scene06FaultModes />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene07_architecture.start} durationInFrames={SCENE_TIMINGS.scene07_architecture.duration}>
        <Scene07Architecture />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene08_roi.start} durationInFrames={SCENE_TIMINGS.scene08_roi.duration}>
        <Scene08ROI />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene09_closing.start} durationInFrames={SCENE_TIMINGS.scene09_closing.duration}>
        <Scene09Closing />
      </Sequence>

      <GlobalOverlay />
    </AbsoluteFill>
  );
};
