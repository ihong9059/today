import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

// ============ TIMINGS — 5분 정확 (9000 frames @ 30fps) ============
export const WISHKET_155381_DURATION = 9000;

const T = {
  scene1: { start: 0,    dur: 600  },  // 0:00~0:20 Opening
  scene2: { start: 600,  dur: 1200 },  // 0:20~1:00 Problem
  scene3: { start: 1800, dur: 900  },  // 1:00~1:30 Solution
  scene4: { start: 2700, dur: 1350 },  // 1:30~2:15 V-Cut 양산 ⭐
  scene5: { start: 4050, dur: 1350 },  // 2:15~3:00 LS XGT FEnet
  scene6: { start: 5400, dur: 1200 },  // 3:00~3:40 좌표 시각화
  scene7: { start: 6600, dur: 900  },  // 3:40~4:10 안전·인증
  scene8: { start: 7500, dur: 1050 },  // 4:10~4:45 일정·팀
  scene9: { start: 8550, dur: 450  },  // 4:45~5:00 Closing
};

const AUDIO_BASE = "audio/wishket155381";

// ============ COLOR PALETTE (산업 자동화 + 신뢰감) ============
const C = {
  navy: "#0B2545",
  navyDark: "#050B1A",
  navyMid: "#13315C",
  gold: "#C9A14A",
  goldLight: "#E8C875",
  cream: "#F5F2EC",
  white: "#FFFFFF",
  textMuted: "rgba(245, 242, 236, 0.65)",
  red: "#C8463F",
  green: "#5B8A52",
  blue: "#4A90E2",
};

// ============ HELPERS ============
const fadeIn = (frame: number, start = 0, dur = 30) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start = 0, dur = 30, dist = 40) =>
  interpolate(frame, [start, start + dur], [dist, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const springScale = (frame: number, fps: number, delay = 0) =>
  Math.min(
    spring({
      frame: Math.max(0, frame - delay),
      fps,
      config: { damping: 14, stiffness: 90 },
    }),
    1
  );

// ============ GLOBAL BACKGROUND ============
const IndustrialBackground: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, ${C.navyMid} 0%, ${C.navy} 50%, ${C.navyDark} 100%)`,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        width: 80,
        height: 2,
        background: C.gold,
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        width: 80,
        height: 2,
        background: C.gold,
      }}
    />
  </AbsoluteFill>
);

const Subtitle: React.FC<{ text: string; visible?: boolean }> = ({
  text,
  visible = true,
}) => (
  <div
    style={{
      position: "absolute",
      bottom: 100,
      left: 0,
      right: 0,
      textAlign: "center",
      opacity: visible ? 1 : 0,
      padding: "0 120px",
    }}
  >
    <span
      style={{
        display: "inline-block",
        padding: "16px 32px",
        fontSize: 30,
        color: C.white,
        background: "rgba(0, 0, 0, 0.55)",
        borderRadius: 8,
        fontWeight: 500,
        letterSpacing: 0.5,
        lineHeight: 1.5,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {text}
    </span>
  </div>
);

// ============================================================
// SCENE 1 — OPENING (0:00~0:20)
// ============================================================
const Scene1Opening: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = fadeIn(frame, 60, 50);
  const subOp = fadeIn(frame, 240, 40);
  const lineOp = fadeIn(frame, 300, 40);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${C.navyMid} 0%, ${C.navy} 60%, ${C.navyDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 120,
          height: 2,
          background: C.gold,
          marginBottom: 40,
          opacity: lineOp,
        }}
      />
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          color: C.white,
          textAlign: "center",
          opacity: titleOp,
          transform: `translateY(${slideUp(frame, 60, 50, 30)}px)`,
          letterSpacing: 2,
          lineHeight: 1.4,
        }}
      >
        부스바 한 장에 들어가는
        <br />
        <span style={{ color: C.gold }}>그 정밀한 결정을 ——</span>
        <br />
        누가 책임집니까?
      </div>
      <div
        style={{
          marginTop: 60,
          fontSize: 26,
          color: C.textMuted,
          opacity: subOp,
          letterSpacing: 6,
        }}
      >
        LS XGT PLC 연동 가공 PC 응용 제안
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 20,
          color: C.goldLight,
          opacity: subOp,
          letterSpacing: 4,
        }}
      >
        위시캣 #155381
      </div>
      <div
        style={{
          width: 120,
          height: 2,
          background: C.gold,
          marginTop: 40,
          opacity: lineOp,
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 2 — PROBLEM (0:20~1:00)
// ============================================================
const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = fadeIn(frame, 0, 30);

  const items = [
    { label: "수동 좌표 입력", icon: "✍", desc: "오기·실수" },
    { label: "시각 검증 부재", icon: "👁", desc: "재작업 손실" },
    { label: "PC↔PLC 통신 부재", icon: "🔌", desc: "작업자 부담" },
    { label: "산업 안전 인증 부재", icon: "⚠", desc: "사고 위험" },
  ];

  const conclusions = [
    { text: "천공 위치 0.3mm 오차 → 접촉 저항", at: 600 },
    { text: "→ 발열·아크 → 화재", at: 780 },
    { text: "한 번의 실수 = 전체 라인 손실", at: 960 },
  ];

  const sub1Visible = frame >= 0 && frame < 360;
  const sub2Visible = frame >= 360 && frame < 720;
  const sub3Visible = frame >= 720 && frame < 1200;

  return (
    <AbsoluteFill style={{ background: C.navyDark, padding: 80 }}>
      <IndustrialBackground />

      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOp,
          fontSize: 38,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
        }}
      >
        현재 부스바 가공기 — 4가지 한계
      </div>

      <div
        style={{
          position: "absolute",
          top: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 30,
          flexWrap: "wrap",
          padding: "0 80px",
        }}
      >
        {items.map((it, i) => {
          const op = fadeIn(frame, 60 + i * 60, 30);
          const broken =
            frame > 480
              ? interpolate(frame, [480, 540], [0, 1], { extrapolateRight: "clamp" })
              : 0;
          return (
            <div
              key={i}
              style={{
                width: 250,
                height: 220,
                background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
                border: `1px solid ${C.gold}40`,
                borderRadius: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: op * (1 - broken * 0.6),
                transform: `translateY(${slideUp(frame, 60 + i * 60, 30, 30)}px) rotate(${broken * (i % 2 === 0 ? -3 : 3)}deg)`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                padding: 20,
                position: "relative",
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 12 }}>{it.icon}</div>
              <div
                style={{
                  fontSize: 22,
                  color: C.cream,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {it.label}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: C.textMuted,
                  marginTop: 6,
                  textAlign: "center",
                }}
              >
                {it.desc}
              </div>
              {broken > 0.3 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontSize: 100,
                    color: C.red,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: broken,
                    fontWeight: 900,
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {conclusions.map((c, i) => (
          <div
            key={i}
            style={{
              fontSize: 28,
              color: i === 2 ? C.red : C.cream,
              opacity: fadeIn(frame, c.at, 30),
              transform: `translateY(${slideUp(frame, c.at, 30, 20)}px)`,
              marginBottom: 10,
              fontWeight: i === 2 ? 700 : 500,
            }}
          >
            <span style={{ color: C.red, marginRight: 12 }}>—</span>
            {c.text}
          </div>
        ))}
      </div>

      {sub1Visible && <Subtitle text="현재 부스바 가공기 — 4가지 한계" />}
      {sub2Visible && <Subtitle text="수동 좌표·시각 검증·통신 부재·인증 부재" />}
      {sub3Visible && <Subtitle text="0.3밀리미터 오차 → 접촉 저항 → 발열 → 화재" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 3 — SOLUTION (1:00~1:30)
// ============================================================
const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pcScale = springScale(frame, fps, 30);
  const plcScale = springScale(frame, fps, 90);
  const arrowOp = fadeIn(frame, 180, 30);
  const resultOp = fadeIn(frame, 480, 40);

  const sub1 = frame >= 0 && frame < 300;
  const sub2 = frame >= 300 && frame < 600;
  const sub3 = frame >= 600;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${C.navyMid} 0%, ${C.navyDark} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 36,
          color: C.gold,
          letterSpacing: 6,
          fontWeight: 500,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        해결 — 2-Layer 협업 구조
      </div>

      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          paddingTop: 100,
        }}
      >
        {/* PC 응용 카드 */}
        <div
          style={{
            width: 800,
            padding: 30,
            background: `linear-gradient(145deg, ${C.blue} 0%, ${C.navyMid} 100%)`,
            borderRadius: 20,
            transform: `scale(${pcScale})`,
            boxShadow: `0 20px 60px rgba(74, 144, 226, 0.4)`,
            border: `2px solid ${C.gold}60`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ fontSize: 60 }}>🖥</div>
            <div>
              <div
                style={{
                  fontSize: 32,
                  color: C.white,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                PC 응용 (Windows + C++)
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: C.goldLight,
                  marginTop: 6,
                  letterSpacing: 2,
                }}
              >
                Layer 3 · 작업자 친화 UI · 본 프로젝트
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: C.cream,
                  marginTop: 8,
                  opacity: 0.85,
                }}
              >
                좌표 입력 · 시각화 · Recipe · 로그
              </div>
            </div>
          </div>
        </div>

        {/* 화살표 */}
        <div
          style={{
            fontSize: 36,
            color: C.gold,
            opacity: arrowOp,
            letterSpacing: 1,
          }}
        >
          ↕ 이더넷 (LS XGT FEnet · TCP 2004)
        </div>

        {/* PLC 카드 */}
        <div
          style={{
            width: 800,
            padding: 30,
            background: `linear-gradient(145deg, #6B3A1F 0%, #C26B3F 100%)`,
            borderRadius: 20,
            transform: `scale(${plcScale})`,
            boxShadow: `0 20px 60px rgba(194, 107, 63, 0.4)`,
            border: `2px solid ${C.gold}60`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ fontSize: 60 }}>⚙</div>
            <div>
              <div
                style={{
                  fontSize: 32,
                  color: C.white,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                LS XGT PLC (이미 세팅 완료)
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: C.goldLight,
                  marginTop: 6,
                  letterSpacing: 2,
                }}
              >
                Layer 2 · 실시간 제어 (1~10ms)
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: C.cream,
                  marginTop: 8,
                  opacity: 0.85,
                }}
              >
                펀치 모터 · 센서 · E-Stop · 안전 인터록
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: resultOp,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: C.goldLight,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          각자 잘하는 영역 — 안전 · 정밀 · 작업자 친화 모두 충족
        </div>
      </div>

      {sub1 && <Subtitle text="해결은 2-Layer 협업 — PC 응용 + LS XGT PLC" />}
      {sub2 && <Subtitle text="이미 세팅 완료된 PLC와 이더넷 통신" />}
      {sub3 && <Subtitle text="각자 잘하는 영역 — 산업 자동화 표준 구조" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 4 — V-CUT 양산 자산 (1:30~2:15) ⭐
// ============================================================
const Scene4VCut: React.FC = () => {
  const frame = useCurrentFrame();

  const sub1 = frame >= 0 && frame < 360;
  const sub2 = frame >= 360 && frame < 720;
  const sub3 = frame >= 720 && frame < 1080;
  const sub4 = frame >= 1080;

  const compare = [
    ["대상 재료", "PCB (FR4 + 동박)", "구리/알루미늄 부스바"],
    ["입력 좌표", "X/Y 절단 라인", "X/Y 천공 위치"],
    ["모터 제어", "2축 X/Y", "2축 X/Y"],
    ["안전 검증", "시뮬레이션 + 작업자", "동일"],
    ["워크플로우", "양산 운영 중", "60% reuse"],
  ];

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <IndustrialBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        ★ 차별화 핵심 — V-Cut 컨트롤러 양산 자산
      </div>

      <AbsoluteFill
        style={{
          flexDirection: "row",
          paddingTop: 160,
          paddingLeft: 60,
          paddingRight: 60,
          gap: 30,
          alignItems: "center",
        }}
      >
        {/* 좌: V-Cut */}
        <div
          style={{
            flex: 1,
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 16,
            padding: 30,
            border: `2px solid ${C.gold}40`,
            opacity: fadeIn(frame, 40, 30),
            transform: `translateX(${(1 - fadeIn(frame, 40, 30)) * -50}px)`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: C.goldLight,
              letterSpacing: 2,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            ▸ 저희 양산 자산
          </div>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 70 }}>🔷</div>
            <div
              style={{
                fontSize: 26,
                color: C.white,
                fontWeight: 700,
                marginTop: 12,
              }}
            >
              Raspberry Pi 3
              <br />
              V-Cut 컨트롤러
            </div>
            <div
              style={{
                fontSize: 16,
                color: C.green,
                marginTop: 10,
                fontWeight: 600,
              }}
            >
              양산 운영 중
            </div>
          </div>
          <div
            style={{
              fontSize: 16,
              color: C.cream,
              lineHeight: 1.8,
              padding: "12px 16px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 8,
            }}
          >
            ✓ X/Y 2축 좌표 입력
            <br />
            ✓ 절단 위치 그래픽 미리보기
            <br />
            ✓ 모터 제어 양산
            <br />
            ✓ 작업자 안전 워크플로우
          </div>
        </div>

        {/* 중앙 화살표 + reuse */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: fadeIn(frame, 240, 30),
          }}
        >
          <div
            style={{
              fontSize: 80,
              color: C.gold,
              fontWeight: 300,
            }}
          >
            ⇒
          </div>
          <div
            style={{
              fontSize: 28,
              color: C.goldLight,
              fontWeight: 800,
              marginTop: 10,
              padding: "10px 24px",
              background: `${C.gold}30`,
              borderRadius: 999,
              border: `2px solid ${C.gold}`,
            }}
          >
            60% reuse
          </div>
          <div
            style={{
              fontSize: 16,
              color: C.cream,
              marginTop: 14,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            X/Y 패턴 100% 동일
          </div>
        </div>

        {/* 우: 부스바 */}
        <div
          style={{
            flex: 1,
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 16,
            padding: 30,
            border: `2px solid ${C.gold}40`,
            opacity: fadeIn(frame, 480, 30),
            transform: `translateX(${(1 - fadeIn(frame, 480, 30)) * 50}px)`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: C.goldLight,
              letterSpacing: 2,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            ▸ 본 프로젝트
          </div>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 70 }}>⚡</div>
            <div
              style={{
                fontSize: 26,
                color: C.white,
                fontWeight: 700,
                marginTop: 12,
              }}
            >
              부스바 천공
              <br />
              가공 PC 응용
            </div>
            <div
              style={{
                fontSize: 16,
                color: C.gold,
                marginTop: 10,
                fontWeight: 600,
              }}
            >
              Week 2 안에 1차 완성
            </div>
          </div>
          <div
            style={{
              fontSize: 16,
              color: C.cream,
              lineHeight: 1.8,
              padding: "12px 16px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 8,
            }}
          >
            ✓ X/Y 2축 좌표 입력
            <br />
            ✓ 천공 위치 그래픽 미리보기
            <br />
            ✓ PLC 명령 (LS XGT FEnet)
            <br />
            ✓ 작업자 안전 워크플로우
          </div>
        </div>
      </AbsoluteFill>

      {/* 비교 표 */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 60,
          right: 60,
          background: "rgba(13, 28, 50, 0.9)",
          border: `1px solid ${C.gold}30`,
          borderRadius: 12,
          padding: 14,
          opacity: fadeIn(frame, 720, 30),
        }}
      >
        {compare.map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.5fr 1.5fr",
              padding: "6px 14px",
              fontSize: 17,
              borderTop: i === 0 ? "none" : `1px solid ${C.gold}15`,
              opacity: fadeIn(frame, 780 + i * 40, 20),
            }}
          >
            <div style={{ color: C.goldLight, fontWeight: 600 }}>{row[0]}</div>
            <div style={{ color: C.textMuted }}>{row[1]}</div>
            <div style={{ color: C.cream }}>{row[2]}</div>
          </div>
        ))}
      </div>

      {sub1 && <Subtitle text="저희 양산 자산 — Raspberry Pi 3 V-Cut 컨트롤러" />}
      {sub2 && <Subtitle text="X/Y 좌표 입력·모터 제어·안전 워크플로우 — 100% 동일 패턴" />}
      {sub3 && <Subtitle text="양산 코드 60% 그대로 재사용" />}
      {sub4 && <Subtitle text="신규 개발 30% → 30일 일정 신뢰성 확보" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 5 — LS XGT FEnet (2:15~3:00)
// ============================================================
const Scene5LSXGT: React.FC = () => {
  const frame = useCurrentFrame();

  const sub1 = frame >= 0 && frame < 360;
  const sub2 = frame >= 360 && frame < 720;
  const sub3 = frame >= 720 && frame < 1080;
  const sub4 = frame >= 1080;

  const variables = [
    { v: "%MX100", desc: "M 비트 (내부 마커)", color: C.gold },
    { v: "%KX10",  desc: "K 비트 (Keep, 정전 유지)", color: C.gold },
    { v: "%LX5",   desc: "L 비트 (Link FEnet)", color: C.gold },
    { v: "%DW0",   desc: "D 워드 (데이터)", color: C.goldLight },
  ];

  const assets = [
    { name: "EtherCAT (CM4)", spec: "100μs", note: "양산 운영 중" },
    { name: "Modbus RTU (STM32F756)", spec: "KC 인증", note: "양산 5종" },
    { name: "LS XGT FEnet", spec: "1~10ms", note: "더 단순한 처리" },
  ];

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <IndustrialBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        LS산전 통신 프로토콜 — 직접 대응 가능
      </div>

      <AbsoluteFill
        style={{
          flexDirection: "row",
          paddingTop: 150,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 40,
        }}
      >
        {/* 좌: FEnet 프레임 */}
        <div
          style={{
            flex: 1,
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 16,
            padding: 26,
            border: `1px solid ${C.gold}40`,
            opacity: fadeIn(frame, 40, 30),
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: C.gold,
              letterSpacing: 2,
              marginBottom: 18,
            }}
          >
            ▸ LS XGT FEnet 프레임
          </div>
          <div
            style={{
              fontFamily: "Consolas, monospace",
              fontSize: 16,
              color: C.cream,
              lineHeight: 1.7,
              background: "rgba(0,0,0,0.4)",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <div style={{ color: C.goldLight, marginBottom: 6 }}>
              [Header 20 bytes]
            </div>
            <div>"LSIS-XGT\0\0" + CPU Info</div>
            <div>Invoke ID + Length + BCC</div>
            <div style={{ color: C.goldLight, marginTop: 12, marginBottom: 6 }}>
              [Application Data]
            </div>
            <div>Command: 0x54 Read / 0x58 Write</div>
            <div>Data Type: Bit / Word / Block</div>
            <div>Variable: Direct (%MX·%DW)</div>
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 16,
              color: C.goldLight,
              letterSpacing: 1,
            }}
          >
            TCP 포트 2004 (LS XGT 표준)
          </div>
        </div>

        {/* 우: 직접 변수 표기 */}
        <div
          style={{
            flex: 1,
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 16,
            padding: 26,
            border: `1px solid ${C.gold}40`,
            opacity: fadeIn(frame, 300, 30),
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: C.gold,
              letterSpacing: 2,
              marginBottom: 18,
            }}
          >
            ▸ 공고 명시 영역 — 100% 매핑
          </div>
          {variables.map((v, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 16px",
                background: `${v.color}15`,
                borderLeft: `4px solid ${v.color}`,
                borderRadius: 6,
                marginBottom: 8,
                opacity: fadeIn(frame, 360 + i * 50, 25),
              }}
            >
              <div
                style={{
                  fontFamily: "Consolas, monospace",
                  fontSize: 22,
                  color: v.color,
                  fontWeight: 700,
                  minWidth: 110,
                }}
              >
                {v.v}
              </div>
              <div style={{ fontSize: 16, color: C.cream }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* 하단: 양산 자산 */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 80,
          right: 80,
          background: "rgba(13, 28, 50, 0.85)",
          borderRadius: 12,
          padding: 18,
          border: `1px solid ${C.gold}30`,
          opacity: fadeIn(frame, 720, 30),
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: C.gold,
            marginBottom: 12,
            letterSpacing: 2,
          }}
        >
          ▸ 양산 자산 매핑
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {assets.map((a, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: i === 2 ? `${C.gold}20` : "rgba(255,255,255,0.05)",
                borderRadius: 8,
                border: i === 2 ? `1px solid ${C.gold}` : `1px solid ${C.gold}20`,
                opacity: fadeIn(frame, 780 + i * 60, 25),
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  color: i === 2 ? C.goldLight : C.cream,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {a.name}
              </div>
              <div style={{ fontSize: 22, color: C.goldLight, fontWeight: 800 }}>
                {a.spec}
              </div>
              <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>
                {a.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {sub1 && <Subtitle text="공고 우대 — LS산전 통신 프로토콜 직접 대응" />}
      {sub2 && <Subtitle text="M·K·L 비트 + D 워드 — 공고 명시 영역 100% 매핑" />}
      {sub3 && <Subtitle text="EtherCAT 100μs 양산 + Modbus RTU KC 인증" />}
      {sub4 && <Subtitle text="LS XGT FEnet은 양산 표준 대비 훨씬 단순한 처리" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 6 — 좌표 시각화 (3:00~3:40)
// ============================================================
const Scene6Visualization: React.FC = () => {
  const frame = useCurrentFrame();

  const sub1 = frame >= 0 && frame < 360;
  const sub2 = frame >= 360 && frame < 720;
  const sub3 = frame >= 720 && frame < 1080;
  const sub4 = frame >= 1080;

  const holes = [
    { x: 12, y: 35, n: 1, at: 60 },
    { x: 22, y: 40, n: 2, at: 120 },
    { x: 35, y: 35, n: 3, at: 180 },
    { x: 48, y: 50, n: 4, at: 240 },
    { x: 62, y: 35, n: 5, at: 300 },
    { x: 75, y: 45, n: 6, at: 360 },
    { x: 85, y: 35, n: 7, at: 420 },
  ];

  const features = [
    { label: "부스바 규격 비율 그리기", at: 480 },
    { label: "X/Y 좌표 → 천공점 그래픽", at: 540 },
    { label: "격자 + 눈금 (mm)", at: 600 },
    { label: "영역 외 / 충돌 자동 경고", at: 660 },
    { label: "가공 순서 시뮬레이션 미리보기", at: 720 },
  ];

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <IndustrialBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        우대 사항 — 좌표 시각화 도구 양산 자산 3종
      </div>

      {/* 부스바 시각화 영역 */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 100,
          right: 100,
          height: 280,
          background: "rgba(245, 242, 236, 0.05)",
          border: `2px solid ${C.gold}60`,
          borderRadius: 12,
          opacity: fadeIn(frame, 30, 30),
        }}
      >
        {/* 격자 */}
        <svg
          style={{ position: "absolute", inset: 0, opacity: 0.3 }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 10}
              y1={0}
              x2={i * 10}
              y2={100}
              stroke={C.gold}
              strokeWidth="0.2"
            />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 10}
              x2={100}
              y2={i * 10}
              stroke={C.gold}
              strokeWidth="0.2"
            />
          ))}
        </svg>

        {/* 부스바 라벨 */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 16,
            fontSize: 14,
            color: C.goldLight,
            letterSpacing: 2,
          }}
        >
          BUSBAR · 100mm × 30mm × 5mm
        </div>

        {/* 천공점 */}
        {holes.map((h) => {
          const op = fadeIn(frame, h.at, 20);
          const r = 16;
          return (
            <div
              key={h.n}
              style={{
                position: "absolute",
                left: `${h.x}%`,
                top: `${h.y}%`,
                width: r,
                height: r,
                borderRadius: "50%",
                background: C.red,
                border: `2px solid ${C.white}`,
                transform: `translate(-50%, -50%) scale(${op})`,
                boxShadow: "0 0 12px rgba(200, 70, 63, 0.6)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 18,
                  top: -4,
                  fontSize: 13,
                  color: C.goldLight,
                  fontWeight: 700,
                }}
              >
                {h.n}
              </div>
            </div>
          );
        })}
      </div>

      {/* 기능 리스트 */}
      <div
        style={{
          position: "absolute",
          top: 480,
          left: 100,
          right: 100,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              padding: "10px 18px",
              background: "rgba(255,255,255,0.05)",
              borderLeft: `3px solid ${C.gold}`,
              borderRadius: 6,
              fontSize: 18,
              color: C.cream,
              opacity: fadeIn(frame, f.at, 20),
            }}
          >
            ✓ {f.label}
          </div>
        ))}
      </div>

      {/* 양산 자산 박스 */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 100,
          right: 100,
          background: `${C.gold}15`,
          border: `1px solid ${C.gold}60`,
          borderRadius: 12,
          padding: 18,
          opacity: fadeIn(frame, 900, 30),
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: C.goldLight,
            letterSpacing: 2,
            marginBottom: 10,
          }}
        >
          ▸ 매칭 양산 자산 3종
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 16, color: C.cream }}>
          <span>🔷 V-Cut 컨트롤러 (좌표 시각화)</span>
          <span>•</span>
          <span>🌐 Three.js 3D (24/7 사이트)</span>
          <span>•</span>
          <span>📊 Canvas 2D 편집기 (양산)</span>
        </div>
      </div>

      {sub1 && <Subtitle text="우대 — 좌표 시각화 도구 개발 경험" />}
      {sub2 && <Subtitle text="부스바 규격 비율·천공점 그래픽·격자·영역 검증" />}
      {sub3 && <Subtitle text="양산 자산 3종 — V-Cut + Three.js + Canvas 2D" />}
      {sub4 && <Subtitle text="Week 2 안에 1차 시각화 모듈 완성" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 7 — 안전 + 인증 (3:40~4:10)
// ============================================================
const Scene7Safety: React.FC = () => {
  const frame = useCurrentFrame();

  const sub1 = frame >= 0 && frame < 300;
  const sub2 = frame >= 300 && frame < 600;
  const sub3 = frame >= 600;

  const risks = [
    "위치 오차 0.3mm",
    "지름 오차 0.2mm",
    "가장자리 거칠음",
  ];

  const consequences = [
    "접촉 저항 증가",
    "발열 누적",
    "→ 화재·인명·재산 손실",
  ];

  const certs = [
    { name: "KC", country: "한국", icon: "🇰🇷" },
    { name: "TELEC", country: "일본", icon: "🇯🇵" },
    { name: "CE", country: "유럽", icon: "🇪🇺" },
  ];

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <IndustrialBackground />

      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        <div style={{ fontSize: 60, marginBottom: 12 }}>⚡</div>
        <div
          style={{
            fontSize: 36,
            color: C.gold,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          부스바 = 전기 안전 직결
        </div>
      </div>

      {/* 좌우 비교 */}
      <AbsoluteFill
        style={{
          paddingTop: 270,
          paddingLeft: 100,
          paddingRight: 100,
          flexDirection: "row",
          gap: 30,
        }}
      >
        {/* 위험 */}
        <div
          style={{
            flex: 1,
            background: `${C.red}15`,
            border: `2px solid ${C.red}`,
            borderRadius: 16,
            padding: 30,
            opacity: fadeIn(frame, 60, 30),
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: C.red,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            ✕ 천공 정밀도 부족 → 위험
          </div>
          {risks.map((t, i) => (
            <div
              key={i}
              style={{
                fontSize: 18,
                color: C.cream,
                lineHeight: 1.8,
                opacity: fadeIn(frame, 90 + i * 40, 20),
                marginBottom: 4,
              }}
            >
              · {t}
            </div>
          ))}
          <div
            style={{
              marginTop: 16,
              paddingTop: 14,
              borderTop: `1px solid ${C.red}40`,
            }}
          >
            {consequences.map((t, i) => (
              <div
                key={i}
                style={{
                  fontSize: 18,
                  color: i === 2 ? C.red : C.cream,
                  fontWeight: i === 2 ? 700 : 500,
                  lineHeight: 1.8,
                  opacity: fadeIn(frame, 240 + i * 50, 20),
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* 안전 */}
        <div
          style={{
            flex: 1,
            background: `${C.green}15`,
            border: `2px solid ${C.green}`,
            borderRadius: 16,
            padding: 30,
            opacity: fadeIn(frame, 360, 30),
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: C.green,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            ✓ 저희 안전 양산 경험
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {certs.map((c, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "12px 8px",
                  background: `${C.green}20`,
                  borderRadius: 8,
                  textAlign: "center",
                  border: `1px solid ${C.green}60`,
                  opacity: fadeIn(frame, 420 + i * 40, 20),
                }}
              >
                <div style={{ fontSize: 28 }}>{c.icon}</div>
                <div
                  style={{
                    fontSize: 18,
                    color: C.green,
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                >
                  {c.name}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{c.country}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 17,
              color: C.cream,
              lineHeight: 1.8,
              opacity: fadeIn(frame, 600, 30),
            }}
          >
            ✓ 양산 5종
            <br />
            ✓ 일본 시장 3,800대 운영
            <br />
            ✓ 24/7 무중단 모니터링 1년+
            <br />
            ✓ 시뮬레이션·검증·작업자 확인 양산
          </div>
        </div>
      </AbsoluteFill>

      {sub1 && <Subtitle text="부스바 = 전기 안전 직결 — 단순 가공 아님" />}
      {sub2 && <Subtitle text="천공 정밀도 → 접촉 저항 → 발열 → 화재" />}
      {sub3 && <Subtitle text="KC + TELEC + CE 3개국 안전 인증 양산 — 정확히 매칭" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 8 — 30일 일정 + 2인 팀 (4:10~4:45)
// ============================================================
const Scene8Schedule: React.FC = () => {
  const frame = useCurrentFrame();

  const sub1 = frame >= 0 && frame < 360;
  const sub2 = frame >= 360 && frame < 720;
  const sub3 = frame >= 720;

  const weeks = [
    { w: "Week 1", task: "설계", ms: "M1 25%", at: 60 },
    { w: "Week 2", task: "통신·시각화", ms: "M2 25%", at: 180 },
    { w: "Week 3", task: "통합·시뮬레이션", ms: "M3 25%", at: 300 },
    { w: "Week 4", task: "인수·매뉴얼", ms: "M4 25%", at: 420 },
  ];

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <IndustrialBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        30일 일정 + 2인 팀 수직 통합
      </div>

      {/* Week 1~4 타임라인 */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {weeks.map((w, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
              border: `1px solid ${C.gold}40`,
              borderRadius: 14,
              padding: 18,
              textAlign: "center",
              opacity: fadeIn(frame, w.at, 30),
              transform: `translateY(${slideUp(frame, w.at, 30, 20)}px)`,
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: C.goldLight,
                fontWeight: 700,
                marginBottom: 6,
                letterSpacing: 1,
              }}
            >
              {w.w}
            </div>
            <div style={{ fontSize: 16, color: C.cream, marginBottom: 12 }}>
              {w.task}
            </div>
            <div
              style={{
                fontSize: 14,
                color: C.gold,
                padding: "4px 10px",
                background: `${C.gold}20`,
                borderRadius: 999,
                display: "inline-block",
                letterSpacing: 1,
              }}
            >
              {w.ms}
            </div>
          </div>
        ))}
      </div>

      {/* 2인 팀 분담 */}
      <div
        style={{
          position: "absolute",
          top: 390,
          left: 80,
          right: 80,
          display: "flex",
          gap: 24,
          opacity: fadeIn(frame, 540, 30),
        }}
      >
        <div
          style={{
            flex: 1,
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 14,
            padding: 20,
            border: `1px solid ${C.gold}30`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: C.gold,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            임호균 · HW (38년)
          </div>
          <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 10 }}>
            VC++/MFC + Win32 + 회로설계 25년
          </div>
          <div style={{ fontSize: 15, color: C.cream, lineHeight: 1.7 }}>
            ─ MFC GUI 프레임 + 화면 구성<br/>
            ─ Canvas 2D 좌표 편집기<br/>
            ─ 시뮬레이션 그래픽<br/>
            ─ 작업자 매뉴얼
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 14,
              color: C.goldLight,
              fontWeight: 700,
            }}
          >
            작업량 ~50%
          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 14,
            padding: 20,
            border: `1px solid ${C.gold}30`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: C.gold,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            홍광선 · FW/SW (40년)
          </div>
          <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 10 }}>
            임베디드 펌웨어 + 산업 통신 양산
          </div>
          <div style={{ fontSize: 15, color: C.cream, lineHeight: 1.7 }}>
            ─ LS XGT FEnet 통신 모듈<br/>
            ─ Recipe DB · 데이터 변환<br/>
            ─ 좌표 → PLC 변환<br/>
            ─ 안전 검증
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 14,
              color: C.goldLight,
              fontWeight: 700,
            }}
          >
            작업량 ~50%
          </div>
        </div>
      </div>

      {/* 압축 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: fadeIn(frame, 780, 30),
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: C.goldLight,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          양산 자산 70% reuse → 1인 60일 일정을 30일에 압축
        </div>
      </div>

      {sub1 && <Subtitle text="30일 = Week 1~4, 마일스톤 4회 분할 청구" />}
      {sub2 && <Subtitle text="임호균 MFC 38년 + 홍광선 펌웨어 40년 — 분담 병렬" />}
      {sub3 && <Subtitle text="양산 자산 70% reuse → 1인 60일을 30일에 압축" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 9 — CLOSING (4:45~5:00)
// ============================================================
const Scene9Closing: React.FC = () => {
  const frame = useCurrentFrame();

  const lines = [
    { text: "양산 자산이 부스바로.", at: 30, big: false },
    { text: "V-Cut 60% · LS XGT 직접 구현 · KC·CE 인증", at: 120, big: false },
    { text: "30일 후 인도드립니다.", at: 240, big: true },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${C.navy} 0%, ${C.navyDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 200,
          height: 2,
          background: C.gold,
          marginBottom: 50,
          opacity: fadeIn(frame, 0, 30),
        }}
      />

      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            fontSize: l.big ? 56 : 36,
            color: l.big ? C.goldLight : C.white,
            fontWeight: l.big ? 700 : 500,
            marginBottom: 20,
            opacity: fadeIn(frame, l.at, 40),
            transform: `translateY(${slideUp(frame, l.at, 40, 20)}px)`,
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          {l.text}
        </div>
      ))}

      <div
        style={{
          width: 200,
          height: 2,
          background: C.gold,
          marginTop: 50,
          opacity: fadeIn(frame, 350, 30),
        }}
      />

      <div
        style={{
          marginTop: 30,
          fontSize: 20,
          color: C.textMuted,
          opacity: fadeIn(frame, 380, 40),
          letterSpacing: 3,
        }}
      >
        위시캣 #155381 · 미팅에서 뵙겠습니다
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// MAIN COMPOSITION
// ============================================================
export const Wishket155381PitchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <Sequence from={T.scene1.start} durationInFrames={T.scene1.dur}>
        <Scene1Opening />
        <Audio src={staticFile(`${AUDIO_BASE}/scene1_opening.mp3`)} />
      </Sequence>

      <Sequence from={T.scene2.start} durationInFrames={T.scene2.dur}>
        <Scene2Problem />
        <Audio src={staticFile(`${AUDIO_BASE}/scene2_problem.mp3`)} />
      </Sequence>

      <Sequence from={T.scene3.start} durationInFrames={T.scene3.dur}>
        <Scene3Solution />
        <Audio src={staticFile(`${AUDIO_BASE}/scene3_solution.mp3`)} />
      </Sequence>

      <Sequence from={T.scene4.start} durationInFrames={T.scene4.dur}>
        <Scene4VCut />
        <Audio src={staticFile(`${AUDIO_BASE}/scene4_vcut.mp3`)} />
      </Sequence>

      <Sequence from={T.scene5.start} durationInFrames={T.scene5.dur}>
        <Scene5LSXGT />
        <Audio src={staticFile(`${AUDIO_BASE}/scene5_lsxgt.mp3`)} />
      </Sequence>

      <Sequence from={T.scene6.start} durationInFrames={T.scene6.dur}>
        <Scene6Visualization />
        <Audio src={staticFile(`${AUDIO_BASE}/scene6_visualization.mp3`)} />
      </Sequence>

      <Sequence from={T.scene7.start} durationInFrames={T.scene7.dur}>
        <Scene7Safety />
        <Audio src={staticFile(`${AUDIO_BASE}/scene7_safety.mp3`)} />
      </Sequence>

      <Sequence from={T.scene8.start} durationInFrames={T.scene8.dur}>
        <Scene8Schedule />
        <Audio src={staticFile(`${AUDIO_BASE}/scene8_schedule.mp3`)} />
      </Sequence>

      <Sequence from={T.scene9.start} durationInFrames={T.scene9.dur}>
        <Scene9Closing />
        <Audio src={staticFile(`${AUDIO_BASE}/scene9_closing.mp3`)} />
      </Sequence>
    </AbsoluteFill>
  );
};
