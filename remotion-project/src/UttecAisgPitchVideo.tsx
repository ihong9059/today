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

// ============ SCENE TIMINGS (based on TTS @ 30fps) — 7 scene 구성 ============
export const SCENE_TIMINGS = {
  scene1_intro: { start: 0, duration: 1384 },
  scene2_understanding: { start: 1384, duration: 1881 },
  scene3_phy_zero: { start: 3265, duration: 1971 },
  scene4_strengths: { start: 5236, duration: 3162 },
  scene5_phy_depth: { start: 8398, duration: 3434 },
  scene6_timeline: { start: 11832, duration: 2724 },
  scene7_closing: { start: 14556, duration: 1526 },
};

export const UTTEC_AISG_PITCH_DURATION = 16082; // 8분 56초 (Scene 7 결제+정직 제거)

// ============ COLORS ============
const c = {
  bg0: "#020617",
  bg1: "#0f172a",
  bg2: "#1e293b",
  primary: "#22d3ee", // cyan
  accent: "#fbbf24",  // gold
  success: "#10b981",
  danger: "#ef4444",
  purple: "#a78bfa",
  white: "#ffffff",
  gray100: "#f1f5f9",
  gray300: "#cbd5e1",
  gray500: "#64748b",
  gray700: "#334155",
};

// ============ HELPERS ============
const fadeIn = (frame: number, start = 0, dur = 30) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const slideUp = (frame: number, start = 0, dur = 30, dist = 40) =>
  interpolate(frame, [start, start + dur], [dist, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// ============ SHARED ============
// 정적 background — frame당 재계산 없음 (렌더 속도 ↑↑)
const Background: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(135deg, ${c.bg0} 0%, ${c.bg1} 45%, ${c.bg2} 100%)`,
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 200,
        top: 100,
        width: 800,
        height: 800,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${c.primary}18 0%, transparent 65%)`,
      }}
    />
    <div
      style={{
        position: "absolute",
        right: 100,
        bottom: 80,
        width: 900,
        height: 900,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${c.purple}15 0%, transparent 65%)`,
      }}
    />
  </AbsoluteFill>
);

const TopBar: React.FC<{ title: string }> = ({ title }) => (
  <div
    style={{
      position: "absolute",
      top: 30,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 60px",
      zIndex: 100,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${c.primary} 0%, ${c.purple} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          fontWeight: "bold",
          color: c.white,
          boxShadow: `0 6px 20px ${c.primary}80`,
        }}
      >
        U
      </div>
      <span style={{ fontSize: 30, fontWeight: 800, color: c.white, letterSpacing: 1 }}>UTTEC</span>
      <span style={{ fontSize: 22, color: c.gray300, marginLeft: 4 }}>× AISG 3.0</span>
    </div>
    <div
      style={{
        padding: "8px 22px",
        background: `${c.bg0}cc`,
        border: `2px solid ${c.primary}80`,
        borderRadius: 24,
        fontSize: 20,
        color: c.primary,
        fontWeight: 600,
      }}
    >
      {title}
    </div>
  </div>
);

// ============ SCENE 1: INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14 } });
  const subOpacity = fadeIn(frame, 60, 30);
  const promiseOpacity = fadeIn(frame, 220, 40);
  const infoOpacity = fadeIn(frame, 600, 40);

  return (
    <>
      <Background />
      <TopBar title="Scene 1 / 7 · 약속" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
        <div style={{ transform: `scale(${titleScale})`, textAlign: "center" }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: c.white,
              letterSpacing: 2,
              textShadow: `0 0 30px ${c.primary}, 0 0 60px ${c.primary}80`,
              lineHeight: 1,
            }}
          >
            UTTEC × AISG 3.0
          </div>
          <div
            style={{
              fontSize: 44,
              color: c.accent,
              marginTop: 30,
              fontWeight: 700,
              opacity: subOpacity,
            }}
          >
            의뢰자께 드리는 약속
          </div>
        </div>

        <div
          style={{
            marginTop: 100,
            padding: "40px 60px",
            background: `${c.bg0}d0`,
            border: `3px solid ${c.primary}80`,
            borderRadius: 28,
            opacity: promiseOpacity,
            boxShadow: `0 0 60px ${c.primary}40`,
            maxWidth: 1400,
          }}
        >
          <div style={{ fontSize: 42, color: c.white, fontWeight: 700, textAlign: "center", lineHeight: 1.4 }}>
            저희는 의뢰자님의 <span style={{ color: c.primary }}>90일</span>을 책임지겠습니다
          </div>
          <div style={{ fontSize: 28, color: c.gray300, marginTop: 24, textAlign: "center", lineHeight: 1.6 }}>
            기술적 막힘 없음 · 일정 흔들림 없음 · 의사소통 불안 없음
          </div>
        </div>

        <div style={{ marginTop: 60, fontSize: 26, color: c.gray300, opacity: infoOpacity, textAlign: "center" }}>
          ㈜유티텍 · 2016년 설립 · 경기도 용인시 기흥구 · 통신 프로토콜 전문 임베디드 양산
        </div>
      </AbsoluteFill>
    </>
  );
};

// ============ SCENE 2: PROJECT UNDERSTANDING ============
const Scene2Understanding: React.FC = () => {
  const frame = useCurrentFrame();
  const titleY = slideUp(frame, 0, 30);
  const titleOpa = fadeIn(frame, 0, 30);
  const aldsOpa = fadeIn(frame, 240, 30);
  const layerOpa = fadeIn(frame, 600, 30);
  const insightOpa = fadeIn(frame, 1300, 40);

  const alds = [
    { name: "RET", desc: "안테나 빔 틸트 제어", color: c.primary },
    { name: "TMA", desc: "타워 증폭기 ON/OFF", color: c.purple },
    { name: "GLS", desc: "GPS 위치·방위각", color: c.success },
    { name: "ASD", desc: "안테나 자세 측정", color: c.accent },
  ];

  return (
    <>
      <Background />
      <TopBar title="Scene 2 / 7 · 프로젝트 이해" />
      <AbsoluteFill style={{ alignItems: "center", padding: "140px 80px 80px" }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: c.white,
            opacity: titleOpa,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            textShadow: `0 0 24px ${c.primary}60`,
          }}
        >
          AISG = 안테나 라인 디바이스 표준 제어 프로토콜
        </div>

        {/* ALD 4종 */}
        <div style={{ display: "flex", gap: 30, marginTop: 60, opacity: aldsOpa }}>
          {alds.map((a) => (
            <div
              key={a.name}
              style={{
                width: 320,
                padding: 30,
                background: `${c.bg0}e0`,
                border: `3px solid ${a.color}`,
                borderRadius: 20,
                textAlign: "center",
                boxShadow: `0 0 30px ${a.color}40`,
              }}
            >
              <div style={{ fontSize: 60, fontWeight: 900, color: a.color, marginBottom: 12 }}>{a.name}</div>
              <div style={{ fontSize: 22, color: c.gray100 }}>{a.desc}</div>
            </div>
          ))}
        </div>

        {/* 3계층 */}
        <div style={{ marginTop: 60, opacity: layerOpa, display: "flex", gap: 24, alignItems: "stretch" }}>
          {[
            { layer: "L3 응용", content: "Elementary Procedures · SetTilt · v3.0 신기능 4종" },
            { layer: "L2 데이터링크", content: "HDLC (ISO 13239) · 비트스터핑 · FCS-16" },
            { layer: "L1 물리", content: "RS-485 또는 2.176 MHz OOK on RF feeder" },
          ].map((l, i) => (
            <div
              key={i}
              style={{
                width: 440,
                padding: 24,
                background: `linear-gradient(135deg, ${c.bg2}, ${c.bg1})`,
                border: `2px solid ${c.primary}80`,
                borderRadius: 18,
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 800, color: c.primary, marginBottom: 12 }}>{l.layer}</div>
              <div style={{ fontSize: 22, color: c.gray100, lineHeight: 1.5 }}>{l.content}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 60,
            opacity: insightOpa,
            padding: "30px 50px",
            background: `${c.accent}20`,
            border: `3px solid ${c.accent}`,
            borderRadius: 20,
            maxWidth: 1500,
          }}
        >
          <div style={{ fontSize: 36, color: c.white, fontWeight: 700, textAlign: "center", lineHeight: 1.5 }}>
            v2.0 → v3.0 변경 강도: <span style={{ color: c.success }}>PHY 0%</span> /{" "}
            <span style={{ color: c.accent }}>L2 5%</span> /{" "}
            <span style={{ color: c.danger }}>L3 90%</span>
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};

// ============ SCENE 3: PHY 0% ============
const Scene3PhyZero: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpa = fadeIn(frame, 0, 30);
  const phyOpa = fadeIn(frame, 180, 40);
  const l2Opa = fadeIn(frame, 700, 40);
  const l3Opa = fadeIn(frame, 1300, 40);

  const Bar: React.FC<{ pct: number; label: string; color: string; sub: string; opa: number }> = ({
    pct, label, color, sub, opa,
  }) => (
    <div style={{ opacity: opa, width: 1500 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 36, fontWeight: 800, color: c.white }}>{label}</span>
        <span style={{ fontSize: 36, fontWeight: 800, color }}>{pct}%</span>
      </div>
      <div style={{ height: 36, background: c.bg2, borderRadius: 18, overflow: "hidden", border: `2px solid ${c.gray700}` }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            boxShadow: `0 0 20px ${color}80`,
            transition: "width 1s ease",
          }}
        />
      </div>
      <div style={{ fontSize: 22, color: c.gray300, marginTop: 10 }}>{sub}</div>
    </div>
  );

  return (
    <>
      <Background />
      <TopBar title="Scene 3 / 7 · 위험 부담 0에 가까움" />
      <AbsoluteFill style={{ alignItems: "center", padding: "140px 80px 80px" }}>
        <div style={{ fontSize: 60, fontWeight: 800, color: c.white, opacity: titleOpa, textAlign: "center" }}>
          가장 위험한 영역 = <span style={{ color: c.success }}>0% 변경</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 50, marginTop: 80 }}>
          <Bar
            pct={0}
            label="Physical (L1)"
            color={c.success}
            sub="RS-485 회로 · OOK 변조기 · Bias-T · 클럭 — 2.0 자산 그대로 재사용"
            opa={phyOpa}
          />
          <Bar
            pct={5}
            label="Data Link (L2)"
            color={c.accent}
            sub="HDLC 프레임 그대로 · 확장 필드 몇 가지만 — 기존 Modbus·BLE Mesh 코드가 흡수"
            opa={l2Opa}
          />
          <Bar
            pct={90}
            label="Application (L3)"
            color={c.primary}
            sub="신기능 4종 = Auto Discovery · Multi-Primary · Site Mapping · Ping → UTTEC 최강 영역"
            opa={l3Opa}
          />
        </div>
      </AbsoluteFill>
    </>
  );
};

// ============ SCENE 4: 5 STRENGTHS ============
const Scene4Strengths: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpa = fadeIn(frame, 0, 30);

  const strengths = [
    {
      n: 1,
      title: "OOK PHY 직접 구현",
      detail: "CC1101 트랜시버 447.925 MHz 자체 구현 (2026-05) · 변조 원리·HDLC 노하우 그대로",
      color: c.primary,
      delay: 180,
    },
    {
      n: 2,
      title: "BLE Mesh 3,800대 양산",
      detail: "일본 하네다 500 + 나고야 3300 · KC/TELEC/CE · AISG Auto Discovery·Multi-Primary 패턴 동일",
      color: c.purple,
      delay: 600,
    },
    {
      n: 3,
      title: "RS-485 Modbus 양산 KC",
      detail: "STM32F756 컴프레서 밸브 컨트롤러 · 반이중 9.6 kbps · CRC-16 — AISG RS-485 PHY 즉시 대응",
      color: c.success,
      delay: 1200,
    },
    {
      n: 4,
      title: "현장과 동일 지역",
      detail: "용인시 기흥구 흥덕유타워 ↔ AISG 현장 같은 구 · 당일 왕복 디버깅 · 출장비 추가 0",
      color: c.accent,
      delay: 1800,
    },
    {
      n: 5,
      title: "HW + SW 2인 팀",
      detail: "홍광선 펌웨어 38년 + 임호균 회로 25년 · RF 노이즈·케이블 손실 동시 진단 가능",
      color: c.danger,
      delay: 2400,
    },
  ];

  return (
    <>
      <Background />
      <TopBar title="Scene 4 / 7 · 5대 강점" />
      <AbsoluteFill style={{ padding: "130px 100px 80px", alignItems: "center" }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: c.white,
            opacity: titleOpa,
            textAlign: "center",
            textShadow: `0 0 24px ${c.primary}60`,
          }}
        >
          90일 안에 가능한 5가지 자산
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 50, width: 1720 }}>
          {strengths.map((s) => {
            const cardScale = spring({ frame: Math.max(0, frame - s.delay), fps, config: { damping: 12 } });
            const cardOpa = fadeIn(frame, s.delay, 30);
            return (
              <div
                key={s.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 30,
                  padding: 24,
                  background: `${c.bg0}e0`,
                  border: `3px solid ${s.color}`,
                  borderRadius: 20,
                  opacity: cardOpa,
                  transform: `scale(${cardScale})`,
                  boxShadow: `0 0 30px ${s.color}40`,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 24,
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 56,
                    fontWeight: 900,
                    color: c.white,
                    flexShrink: 0,
                    boxShadow: `0 8px 24px ${s.color}80`,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 38, fontWeight: 800, color: c.white, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 24, color: c.gray300, lineHeight: 1.5 }}>{s.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </>
  );
};

// ============ SCENE 5: PHY DEPTH (MAX11947 + BIAS-T) ============
const Scene5PhyDepth: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpa = fadeIn(frame, 0, 30);
  const chipOpa = fadeIn(frame, 300, 40);
  const biasOpa = fadeIn(frame, 1400, 40);
  const vendorsOpa = fadeIn(frame, 2600, 40);

  const chipSpecs = [
    { k: "표준", v: "AISG v2.0 + v3.0 compliant" },
    { k: "채널", v: "4ch MUX (ALD 4대 / modem 1개)" },
    { k: "TX 출력", v: "+3 dBm = 0.89 Vpp @ 50Ω" },
    { k: "TX 범위", v: "−0.5 ~ +7.0 dBm, 0.5 dB step" },
    { k: "RX BPF", v: "200 kHz BW @ 2.176 MHz" },
    { k: "Reference", v: "8.704 MHz 외부 수정 ±100 ppm" },
    { k: "Package", v: "3 × 3 mm TQFN" },
    { k: "Host I/F", v: "SPI + TXIN / RXOUT" },
  ];

  const vendors = ["Kaelus", "HUBER+SUHNER", "Amphenol", "CCI", "RFS"];

  return (
    <>
      <Background />
      <TopBar title="Scene 5 / 7 · PHY 구현 (MAX11947 + Bias-T)" />
      <AbsoluteFill style={{ padding: "130px 80px 80px", alignItems: "center" }}>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: c.white,
            opacity: titleOpa,
            textAlign: "center",
            textShadow: `0 0 24px ${c.primary}60`,
          }}
        >
          OOK 2.176 MHz PHY — 단일 칩으로 위험 0
        </div>

        {/* MAX11947 spec card */}
        <div
          style={{
            marginTop: 30,
            display: "flex",
            gap: 40,
            opacity: chipOpa,
            alignItems: "flex-start",
          }}
        >
          {/* Chip block */}
          <div
            style={{
              width: 380,
              padding: 30,
              background: `linear-gradient(135deg, ${c.bg0}, ${c.bg2})`,
              border: `4px solid ${c.primary}`,
              borderRadius: 24,
              boxShadow: `0 0 40px ${c.primary}60`,
            }}
          >
            <div style={{ fontSize: 24, color: c.accent, fontWeight: 700, marginBottom: 8 }}>ADI / Maxim</div>
            <div style={{ fontSize: 56, fontWeight: 900, color: c.primary, marginBottom: 12 }}>MAX11947</div>
            <div style={{ fontSize: 22, color: c.gray100, lineHeight: 1.5 }}>
              AISG v2/v3 통합 4채널 single-chip modem · spectral mask +15 dB margin · 디스크리트 대비 100× 축소
            </div>
            <div
              style={{
                marginTop: 20,
                padding: "12px 16px",
                background: c.bg0,
                borderRadius: 12,
                border: `2px dashed ${c.success}`,
              }}
            >
              <div style={{ fontSize: 18, color: c.gray300 }}>EVKit</div>
              <div style={{ fontSize: 22, color: c.success, fontWeight: 700 }}>MAX11947EVKIT (Mouser/Digikey)</div>
            </div>
          </div>

          {/* Spec table */}
          <div
            style={{
              flex: 1,
              padding: 24,
              background: `${c.bg0}e0`,
              border: `2px solid ${c.primary}60`,
              borderRadius: 20,
            }}
          >
            <div style={{ fontSize: 26, color: c.accent, fontWeight: 700, marginBottom: 16 }}>핵심 사양</div>
            <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "10px 24px" }}>
              {chipSpecs.map((s, i) => (
                <React.Fragment key={i}>
                  <div style={{ fontSize: 22, color: c.gray300, fontWeight: 600 }}>{s.k}</div>
                  <div style={{ fontSize: 22, color: c.white }}>{s.v}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Bias-T circuit */}
        <div
          style={{
            marginTop: 30,
            width: 1700,
            padding: 24,
            background: `${c.bg0}d0`,
            border: `3px solid ${c.purple}80`,
            borderRadius: 20,
            opacity: biasOpa,
          }}
        >
          <div style={{ fontSize: 28, color: c.purple, fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
            Bias-T — DC 10-30V + RF 800~2200 MHz + OOK 2.176 MHz 3-way 결합
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: 10 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, color: c.accent, fontWeight: 900 }}>L</div>
              <div style={{ fontSize: 18, color: c.gray300 }}>Choke 인덕터</div>
              <div style={{ fontSize: 18, color: c.success }}>DC + OOK 통과</div>
              <div style={{ fontSize: 18, color: c.danger }}>RF 차단</div>
            </div>
            <div style={{ fontSize: 64, color: c.gray500 }}>+</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, color: c.accent, fontWeight: 900 }}>C</div>
              <div style={{ fontSize: 18, color: c.gray300 }}>DC 차단 캐패시터</div>
              <div style={{ fontSize: 18, color: c.success }}>RF 통과</div>
              <div style={{ fontSize: 18, color: c.danger }}>DC 차단</div>
            </div>
            <div style={{ fontSize: 64, color: c.gray500 }}>+</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, color: c.primary, fontWeight: 900 }}>MAX11947</div>
              <div style={{ fontSize: 18, color: c.gray300 }}>OOK 변복조 인젝션</div>
              <div style={{ fontSize: 18, color: c.success }}>SPI + TXIN/RXOUT</div>
            </div>
          </div>
        </div>

        {/* Vendor list */}
        <div
          style={{
            marginTop: 30,
            opacity: vendorsOpa,
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 24, color: c.gray300 }}>외부 Smart Bias-T 조달 가능 :</span>
          {vendors.map((v) => (
            <span
              key={v}
              style={{
                padding: "10px 20px",
                background: `${c.bg2}`,
                border: `2px solid ${c.accent}80`,
                borderRadius: 18,
                fontSize: 22,
                color: c.accent,
                fontWeight: 600,
              }}
            >
              {v}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </>
  );
};

// ============ SCENE 6: 13-WEEK TIMELINE ============
const Scene6Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpa = fadeIn(frame, 0, 30);

  const phases = [
    { p: 1, week: "W 1-2", title: "소스 분석 / 환경 셋업", milestone: "1차 미팅", color: c.primary, delay: 150 },
    { p: 2, week: "W 3-4", title: "AISG 2.0 회귀 베이스", milestone: "2차 미팅", color: c.purple, delay: 450 },
    { p: 3, week: "W 5-8", title: "3.0 신기능 4종 구현", milestone: "3차 미팅 ★", color: c.accent, delay: 750 },
    { p: 4, week: "W 9-10", title: "24h 통합 안정성", milestone: "4차 미팅", color: c.success, delay: 1100 },
    { p: 5, week: "W 11-12", title: "현장 1차/2차 연동", milestone: "5차 미팅", color: c.primary, delay: 1450 },
    { p: 6, week: "W 13", title: "안정화 · 인계 · 검수", milestone: "6차 미팅 (최종)", color: c.danger, delay: 1800 },
  ];

  return (
    <>
      <Background />
      <TopBar title="Scene 6 / 7 · 13주 6마일스톤" />
      <AbsoluteFill style={{ padding: "130px 80px 80px", alignItems: "center" }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: c.white,
            opacity: titleOpa,
            textAlign: "center",
            textShadow: `0 0 24px ${c.primary}60`,
          }}
        >
          90일 · 13주 · 6 마일스톤 미팅
        </div>
        <div style={{ fontSize: 26, color: c.accent, marginTop: 16, opacity: titleOpa }}>
          2주에 한 번씩 진척 가시화 — 위험 분산
        </div>

        <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 20, width: 1700 }}>
          {phases.map((p) => {
            const opa = fadeIn(frame, p.delay, 30);
            const x = interpolate(frame, [p.delay, p.delay + 30], [-50, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={p.p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 30,
                  padding: 22,
                  background: `${c.bg0}e0`,
                  border: `3px solid ${p.color}`,
                  borderRadius: 18,
                  opacity: opa,
                  transform: `translateX(${x}px)`,
                  boxShadow: `0 0 24px ${p.color}40`,
                }}
              >
                <div
                  style={{
                    width: 110,
                    height: 80,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: c.white,
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 600 }}>Phase</div>
                  <div style={{ fontSize: 36, fontWeight: 900 }}>{p.p}</div>
                </div>
                <div style={{ width: 160, fontSize: 28, color: p.color, fontWeight: 800 }}>{p.week}</div>
                <div style={{ flex: 1, fontSize: 30, color: c.white, fontWeight: 700 }}>{p.title}</div>
                <div
                  style={{
                    padding: "10px 22px",
                    background: `${p.color}30`,
                    border: `2px solid ${p.color}`,
                    borderRadius: 14,
                    fontSize: 22,
                    color: c.white,
                    fontWeight: 700,
                  }}
                >
                  {p.milestone}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </>
  );
};

// ============ SCENE 7: PAYMENT + HONESTY ============
const Scene7Payment: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpa = fadeIn(frame, 0, 30);
  const payOpa = fadeIn(frame, 200, 40);
  const honestOpa = fadeIn(frame, 1200, 40);
  const closingOpa = fadeIn(frame, 1900, 40);

  const payments = [
    { pct: 30, when: "계약 시", what: "선금", color: c.primary },
    { pct: 20, when: "Phase 3 종료", what: "1차 중간", color: c.purple },
    { pct: 20, when: "Phase 4 종료", what: "2차 중간", color: c.accent },
    { pct: 30, when: "최종 검수", what: "잔금", color: c.success },
  ];

  return (
    <>
      <Background />
      <TopBar title="Scene 7 / 8 · 결제 + 정직 시그널" />
      <AbsoluteFill style={{ padding: "130px 80px 80px", alignItems: "center" }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: c.white,
            opacity: titleOpa,
            textAlign: "center",
          }}
        >
          위험 분산 결제 · 30 / 20 / 20 / 30
        </div>

        {/* Payment cards */}
        <div style={{ display: "flex", gap: 28, marginTop: 50, opacity: payOpa }}>
          {payments.map((p, i) => (
            <div
              key={i}
              style={{
                width: 380,
                padding: 30,
                background: `${c.bg0}e0`,
                border: `3px solid ${p.color}`,
                borderRadius: 20,
                textAlign: "center",
                boxShadow: `0 0 24px ${p.color}40`,
              }}
            >
              <div style={{ fontSize: 88, fontWeight: 900, color: p.color }}>{p.pct}%</div>
              <div style={{ fontSize: 28, color: c.white, fontWeight: 700, marginTop: 4 }}>{p.what}</div>
              <div style={{ fontSize: 22, color: c.gray300, marginTop: 6 }}>{p.when}</div>
            </div>
          ))}
        </div>

        {/* Honesty signal */}
        <div
          style={{
            marginTop: 50,
            width: 1620,
            padding: 30,
            background: `${c.bg0}e0`,
            border: `3px solid ${c.accent}`,
            borderRadius: 20,
            opacity: honestOpa,
            boxShadow: `0 0 30px ${c.accent}40`,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 800, color: c.accent, marginBottom: 16 }}>
            ⚖️ 정직 시그널 — 부풀리지 않음
          </div>
          <div style={{ fontSize: 26, color: c.white, lineHeight: 1.6 }}>
            AISG 양산 직접 경험은 <span style={{ color: c.danger, fontWeight: 700 }}>없습니다</span>. (5/7 표준 분석 완료 · 5/12 PHY 깊이 자료 작성)
            <br />
            그러나 AISG 3.0의 핵심 4 신기능은 <span style={{ color: c.success, fontWeight: 700 }}>BLE Mesh 3,800대 양산 패턴 그대로</span>입니다.
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 30,
            color: c.primary,
            fontWeight: 700,
            opacity: closingOpa,
            textAlign: "center",
          }}
        >
          " AISG라는 이름은 처음이지만, 그 안의 알고리즘은 처음이 아닙니다 "
        </div>
      </AbsoluteFill>
    </>
  );
};

// ============ SCENE 8: CLOSING ============
const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14 } });
  const promiseOpa = fadeIn(frame, 100, 40);
  const ctaOpa = fadeIn(frame, 1100, 40);

  const promises = [
    { icon: "🔧", title: "기술적", text: "MAX11947 + Smart Bias-T로 PHY 위험 0" },
    { icon: "📅", title: "일정상", text: "90일 13주 · 6 마일스톤 · 2주마다 가시화" },
    { icon: "💬", title: "의사소통", text: "용인 기흥구 당일 응대 · 모든 결정 문서화" },
  ];

  return (
    <>
      <Background />
      <TopBar title="Scene 7 / 7 · 약속" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
        <div
          style={{
            transform: `scale(${titleScale})`,
            fontSize: 100,
            fontWeight: 900,
            color: c.white,
            textShadow: `0 0 40px ${c.primary}, 0 0 80px ${c.primary}80`,
            textAlign: "center",
            letterSpacing: 2,
          }}
        >
          90일을 책임지겠습니다
        </div>

        <div style={{ display: "flex", gap: 36, marginTop: 80, opacity: promiseOpa }}>
          {promises.map((p, i) => (
            <div
              key={i}
              style={{
                width: 460,
                padding: 36,
                background: `${c.bg0}e0`,
                border: `3px solid ${c.primary}`,
                borderRadius: 24,
                textAlign: "center",
                boxShadow: `0 0 30px ${c.primary}50`,
              }}
            >
              <div style={{ fontSize: 80 }}>{p.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: c.accent, marginTop: 10 }}>{p.title}</div>
              <div style={{ fontSize: 22, color: c.gray100, marginTop: 16, lineHeight: 1.6 }}>{p.text}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            opacity: ctaOpa,
            padding: "30px 60px",
            background: `linear-gradient(135deg, ${c.primary}40, ${c.purple}40)`,
            border: `3px solid ${c.primary}`,
            borderRadius: 30,
            boxShadow: `0 0 50px ${c.primary}60`,
          }}
        >
          <div style={{ fontSize: 44, color: c.white, fontWeight: 800, textAlign: "center" }}>
            ㈜유티텍 · UTTEC — 의뢰자님의 협업 결정을 기다립니다
          </div>
          <div style={{ fontSize: 24, color: c.gray300, marginTop: 12, textAlign: "center" }}>
            경기도 용인시 기흥구 흥덕유타워 2404호 · 통신 프로토콜 전문 임베디드 양산
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};

// ============ MAIN ============
export const UttecAisgPitchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: c.bg0 }}>
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1Intro />
        <Audio src={staticFile("audio/uttec-aisg-pitch/scene1_intro.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2_understanding.start} durationInFrames={SCENE_TIMINGS.scene2_understanding.duration}>
        <Scene2Understanding />
        <Audio src={staticFile("audio/uttec-aisg-pitch/scene2_understanding.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3_phy_zero.start} durationInFrames={SCENE_TIMINGS.scene3_phy_zero.duration}>
        <Scene3PhyZero />
        <Audio src={staticFile("audio/uttec-aisg-pitch/scene3_phy_zero.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4_strengths.start} durationInFrames={SCENE_TIMINGS.scene4_strengths.duration}>
        <Scene4Strengths />
        <Audio src={staticFile("audio/uttec-aisg-pitch/scene4_strengths.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5_phy_depth.start} durationInFrames={SCENE_TIMINGS.scene5_phy_depth.duration}>
        <Scene5PhyDepth />
        <Audio src={staticFile("audio/uttec-aisg-pitch/scene5_phy_depth.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6_timeline.start} durationInFrames={SCENE_TIMINGS.scene6_timeline.duration}>
        <Scene6Timeline />
        <Audio src={staticFile("audio/uttec-aisg-pitch/scene6_timeline.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7_closing.start} durationInFrames={SCENE_TIMINGS.scene7_closing.duration}>
        <Scene8Closing />
        <Audio src={staticFile("audio/uttec-aisg-pitch/scene8_closing.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
