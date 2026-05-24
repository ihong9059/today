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

// ============ SCENE TIMINGS (TTS 기준 frames @ 30fps) ============
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 756, start: 0 },
  scene2_structure: { duration: 1841, start: 756 },
  scene3_install: { duration: 1921, start: 2597 },
  scene4_first_query: { duration: 1526, start: 4518 },
  scene5_advanced: { duration: 1922, start: 6044 },
  scene6_outro: { duration: 1260, start: 7966 },
};

export const SEARCH_INTRO_DURATION = 9226;

// ============ COLORS ============
const colors = {
  bg: "#0b1220",
  bgSoft: "#111a2b",
  card: "#172339",
  cardBorder: "#1f2d4d",
  primary: "#3b82f6",
  accent: "#22d3ee",
  purple: "#8b5cf6",
  amber: "#f59e0b",
  green: "#10b981",
  red: "#ef4444",
  white: "#f8fafc",
  textMuted: "#94a3b8",
  textDim: "#64748b",
  python: "#3776ab",
  fastapi: "#009688",
  react: "#61dafb",
};

// ============ HELPERS ============
const fadeIn = (frame: number, start = 0, duration = 30) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeOut = (frame: number, start: number, duration = 30) =>
  interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const slideUp = (frame: number, start = 0, duration = 30, dist = 40) =>
  interpolate(frame, [start, start + duration], [dist, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  Math.min(
    spring({
      frame: Math.max(0, frame - delay),
      fps,
      config: { damping: 14, stiffness: 110 },
    }),
    1
  );

// ============ GLOBAL OVERLAY (logo + scene label) ============
const GlobalOverlay: React.FC<{ sceneLabel: string }> = ({ sceneLabel }) => {
  const frame = useCurrentFrame();
  const op = fadeIn(frame, 0, 30);
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 40,
          opacity: op,
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 800,
            color: colors.white,
          }}
        >
          S
        </div>
        <div style={{ color: colors.white, fontSize: 16, fontWeight: 700, letterSpacing: 0.5 }}>
          search — myWiki 검색
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 36,
          right: 40,
          opacity: op,
          color: colors.textMuted,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: "uppercase",
          zIndex: 1000,
        }}
      >
        {sceneLabel}
      </div>
    </>
  );
};

// ============ SCENE 1 — INTRO ============
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleScale = scaleIn(frame, fps, 10);
  const subOp = fadeIn(frame, 60, 30);
  const sub2Op = fadeIn(frame, 180, 30);

  const keywords = ["myWiki second-brain", "38일치 누적 자료", "자연어 검색", "AI 정리"];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 30% 20%, ${colors.bgSoft}, ${colors.bg} 65%)`,
        color: colors.white,
        fontFamily: "Pretendard, 'Apple SD Gothic Neo', sans-serif",
      }}
    >
      <GlobalOverlay sceneLabel="01 · 인트로" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: 80,
        }}
      >
        <div
          style={{
            transform: `scale(${titleScale})`,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 28,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 60,
              fontWeight: 900,
              boxShadow: `0 30px 80px ${colors.primary}55`,
            }}
          >
            🔎
          </div>
          <div>
            <div style={{ fontSize: 90, fontWeight: 900, lineHeight: 1, letterSpacing: -2 }}>
              search
            </div>
            <div style={{ fontSize: 26, color: colors.accent, fontWeight: 600, marginTop: 8 }}>
              myWiki를 자연어로 검색하는 web 서비스
            </div>
          </div>
        </div>

        <div
          style={{
            opacity: subOp,
            transform: `translateY(${slideUp(frame, 60, 30)}px)`,
            fontSize: 24,
            color: colors.textMuted,
            fontWeight: 500,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          초보자도 따라 할 수 있는 설치부터 첫 질문까지 가이드
        </div>

        <div
          style={{
            opacity: sub2Op,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 1100,
            marginTop: 16,
          }}
        >
          {keywords.map((k, i) => {
            const op = fadeIn(frame, 200 + i * 25, 25);
            return (
              <div
                key={k}
                style={{
                  opacity: op,
                  padding: "14px 26px",
                  background: colors.card,
                  border: `1px solid ${colors.cardBorder}`,
                  borderRadius: 999,
                  fontSize: 22,
                  fontWeight: 600,
                  color: colors.accent,
                }}
              >
                #{k}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 2 — STRUCTURE DIAGRAM ============
const Scene2Structure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOp = fadeIn(frame, 0, 30);

  const boxes = [
    {
      title: "Frontend",
      sub: "React + Vite",
      port: "port 8888",
      color: colors.react,
      delay: 40,
      icon: "🖥️",
    },
    {
      title: "Backend",
      sub: "FastAPI + Anthropic SDK",
      port: "port 8889",
      color: colors.fastapi,
      delay: 100,
      icon: "⚙️",
    },
    {
      title: "raw/ junction",
      sub: "myWiki · uttecHome (read-only)",
      port: "second-brain",
      color: colors.amber,
      delay: 160,
      icon: "🧠",
    },
  ];

  const flow = [
    "사용자가 자연어로 질문 입력",
    "Frontend → WebSocket → Backend",
    "sentence-transformers로 관련 자료 검색",
    "Claude API에 문맥 전달 → 답변 생성",
  ];

  return (
    <AbsoluteFill style={{ background: colors.bg, color: colors.white, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay sceneLabel="02 · 구조" />
      <div
        style={{
          padding: "120px 90px 60px",
          display: "flex",
          flexDirection: "column",
          gap: 36,
          height: "100%",
        }}
      >
        <div
          style={{
            opacity: titleOp,
            transform: `translateY(${slideUp(frame, 0, 30)}px)`,
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          search의 <span style={{ color: colors.accent }}>3가지 구성요소</span>
        </div>

        <div style={{ display: "flex", gap: 28, justifyContent: "center" }}>
          {boxes.map((b) => {
            const op = fadeIn(frame, b.delay, 30);
            const sc = scaleIn(frame, fps, b.delay);
            return (
              <div
                key={b.title}
                style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  flex: 1,
                  maxWidth: 480,
                  background: colors.card,
                  border: `2px solid ${b.color}`,
                  borderRadius: 24,
                  padding: 30,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  boxShadow: `0 20px 50px ${b.color}22`,
                }}
              >
                <div style={{ fontSize: 50 }}>{b.icon}</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: b.color }}>{b.title}</div>
                <div style={{ fontSize: 20, color: colors.textMuted }}>{b.sub}</div>
                <div
                  style={{
                    fontSize: 16,
                    color: colors.white,
                    background: colors.bg,
                    padding: "8px 14px",
                    borderRadius: 8,
                    alignSelf: "flex-start",
                    fontFamily: "Consolas, monospace",
                  }}
                >
                  {b.port}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 240, 30),
            marginTop: 12,
            padding: 30,
            background: colors.card,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 18,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: colors.accent, marginBottom: 18 }}>
            ▶ 동작 흐름
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {flow.map((step, i) => {
              const op = fadeIn(frame, 280 + i * 60, 25);
              return (
                <div
                  key={i}
                  style={{
                    opacity: op,
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    fontSize: 22,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      background: colors.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ color: colors.white, fontWeight: 500 }}>{step}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 3 — INSTALL / RUN ============
const Scene3Install: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = fadeIn(frame, 0, 30);

  const terminals = [
    {
      title: "터미널 1 — Backend",
      port: ":8889",
      color: colors.fastapi,
      delay: 60,
      lines: [
        "cd backend",
        "python -m venv .venv",
        ".venv\\Scripts\\Activate.ps1",
        "pip install -r requirements.txt",
        "uvicorn app.main:app --reload --port 8889",
      ],
    },
    {
      title: "터미널 2 — Frontend",
      port: ":8888",
      color: colors.react,
      delay: 600,
      lines: ["cd frontend", "npm install", "npm run dev"],
    },
  ];

  return (
    <AbsoluteFill style={{ background: colors.bg, color: colors.white, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay sceneLabel="03 · 설치·실행" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 32 }}>
        <div
          style={{
            opacity: titleOp,
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          <span style={{ color: colors.accent }}>터미널 2개</span>로 backend와 frontend 실행
        </div>

        <div style={{ display: "flex", gap: 30 }}>
          {terminals.map((t) => (
            <div
              key={t.title}
              style={{
                opacity: fadeIn(frame, t.delay, 30),
                flex: 1,
                background: "#0a0e1a",
                border: `2px solid ${t.color}`,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: `0 20px 50px ${t.color}33`,
              }}
            >
              <div
                style={{
                  background: t.color,
                  color: "#000",
                  padding: "12px 20px",
                  fontSize: 18,
                  fontWeight: 800,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{t.title}</span>
                <span style={{ fontFamily: "Consolas, monospace" }}>{t.port}</span>
              </div>
              <div
                style={{
                  padding: 24,
                  fontFamily: "Consolas, monospace",
                  fontSize: 22,
                  minHeight: 380,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {t.lines.map((ln, i) => {
                  const op = fadeIn(frame, t.delay + 30 + i * 80, 25);
                  return (
                    <div key={i} style={{ opacity: op, display: "flex", gap: 10 }}>
                      <span style={{ color: colors.green }}>$</span>
                      <span style={{ color: colors.white }}>{ln}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 1300, 30),
            background: colors.card,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 14,
            padding: "22px 30px",
            fontSize: 26,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 32 }}>🌐</span>
          <span>
            브라우저에서{" "}
            <span style={{ color: colors.accent, fontFamily: "Consolas, monospace", fontWeight: 700 }}>
              http://localhost:8888
            </span>{" "}
            접속 → search 화면이 열립니다
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 4 — FIRST QUERY (browser mockup) ============
const Scene4FirstQuery: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = fadeIn(frame, 0, 30);

  const sources = [
    { name: "entities/uttec-onDevice.md", score: 0.87 },
    { name: "ai-direction.md § product strategy", score: 0.74 },
    { name: "thoughts/2026-Q2/ondevice-pivot.md", score: 0.68 },
  ];

  return (
    <AbsoluteFill style={{ background: colors.bg, color: colors.white, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay sceneLabel="04 · 첫 질문" />
      <div style={{ padding: "120px 80px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ opacity: titleOp, fontSize: 50, fontWeight: 800, letterSpacing: -1 }}>
          <span style={{ color: colors.accent }}>"무엇이 궁금하신가요?"</span> 입력창
        </div>

        {/* Browser mockup */}
        <div
          style={{
            opacity: fadeIn(frame, 30, 30),
            background: "#0f172a",
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: `0 30px 60px #00000080`,
          }}
        >
          {/* Browser top bar */}
          <div
            style={{
              background: "#1e293b",
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#ef4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#f59e0b" }} />
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
            <div
              style={{
                flex: 1,
                marginLeft: 16,
                background: "#0b1220",
                padding: "6px 16px",
                borderRadius: 8,
                fontSize: 16,
                color: colors.textMuted,
                fontFamily: "Consolas, monospace",
              }}
            >
              http://localhost:8888
            </div>
          </div>

          {/* App content */}
          <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 22, minHeight: 620 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                paddingBottom: 18,
                borderBottom: `1px solid ${colors.cardBorder}`,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: colors.purple,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                🧠
              </div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>myWiki search</div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                <div
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    background: "#0b3a2a",
                    color: colors.green,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  ✓ claude-sonnet-4-6
                </div>
              </div>
            </div>

            <div style={{ opacity: fadeIn(frame, 90, 30), fontSize: 28, fontWeight: 700 }}>
              무엇이 궁금하신가요?
            </div>

            {/* Input box with typing */}
            <div
              style={{
                opacity: fadeIn(frame, 150, 30),
                background: "#0b1220",
                border: `2px solid ${colors.primary}`,
                borderRadius: 14,
                padding: "20px 22px",
                fontSize: 24,
                minHeight: 70,
                display: "flex",
                alignItems: "center",
              }}
            >
              <TypingText text="UTTEC의 핵심 비즈니스가 뭐야?" startFrame={250} cps={18} />
              <span
                style={{
                  marginLeft: 6,
                  display: "inline-block",
                  width: 2,
                  height: 28,
                  background: colors.accent,
                  opacity: (Math.floor(frame / 15) % 2) === 0 ? 1 : 0,
                }}
              />
            </div>

            {/* Answer */}
            <div
              style={{
                opacity: fadeIn(frame, 720, 40),
                background: colors.card,
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 14,
                padding: 22,
                fontSize: 19,
                lineHeight: 1.7,
                color: colors.white,
              }}
            >
              <div style={{ color: colors.accent, fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
                ▍ 답변
              </div>
              UTTEC의 핵심은 <strong>onDevice AI 제품군</strong>입니다. 응원봉(AI FanStick),
              스마트팩토리 보드, LoRa 기반 장거리 통신 모듈이 주요 라인업이며,
              ESP32와 nRF 계열 MCU 위에 자체 가속 라이브러리(esp-nn, CMSIS-NN)를 적용해
              <strong> 외부 인터넷 0 퍼센트</strong>의 on-device 추론을 차별점으로 합니다.
            </div>

            {/* Sources */}
            <div
              style={{
                opacity: fadeIn(frame, 950, 40),
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 15, color: colors.textMuted, fontWeight: 700 }}>
                ▍ 출처 ({sources.length}건)
              </div>
              {sources.map((s, i) => {
                const op = fadeIn(frame, 980 + i * 50, 30);
                return (
                  <div
                    key={s.name}
                    style={{
                      opacity: op,
                      background: "#0b1220",
                      border: `1px solid ${colors.cardBorder}`,
                      borderRadius: 10,
                      padding: "12px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "Consolas, monospace",
                      fontSize: 16,
                    }}
                  >
                    <span style={{ color: colors.white }}>{s.name}</span>
                    <span
                      style={{
                        background: colors.green + "22",
                        color: colors.green,
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {s.score.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TypingText: React.FC<{ text: string; startFrame: number; cps?: number }> = ({
  text,
  startFrame,
  cps = 20,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsPerFrame = cps / 30;
  const n = Math.min(text.length, Math.floor(elapsed * charsPerFrame));
  return <span>{text.slice(0, n)}</span>;
};

// ============ SCENE 5 — ADVANCED FEATURES ============
const Scene5Advanced: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOp = fadeIn(frame, 0, 30);

  const features = [
    {
      title: "세션 기반 대화",
      desc: "직전 맥락을 기억한 follow-up 질문 가능",
      icon: "💬",
      color: colors.primary,
      delay: 60,
      detail: '"그 중에서 onDevice가 뭐였는지 더 자세히"',
    },
    {
      title: "토큰 게이지",
      desc: "상단 헤더 + 입력창 아래 inline 표시",
      icon: "📊",
      color: colors.amber,
      delay: 400,
      detail: "70% 도달 시 경고 토스트 등장",
    },
    {
      title: "자동 핸드오프",
      desc: "80% 도달 시 요약 → 새 세션 자동 연결",
      icon: "🔄",
      color: colors.purple,
      delay: 900,
      detail: "대화 흐름이 끊기지 않음",
    },
    {
      title: "다크 / 라이트 모드",
      desc: "우측 상단 🌙/☀️ 아이콘으로 토글",
      icon: "🌗",
      color: colors.accent,
      delay: 1400,
      detail: "작업 환경에 맞춰 자유 전환",
    },
  ];

  return (
    <AbsoluteFill style={{ background: colors.bg, color: colors.white, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay sceneLabel="05 · 고급 사용법" />
      <div style={{ padding: "120px 80px 50px", display: "flex", flexDirection: "column", gap: 36 }}>
        <div style={{ opacity: titleOp, fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>
          search의 <span style={{ color: colors.accent }}>4가지 고급 기능</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 28,
          }}
        >
          {features.map((f, i) => {
            const op = fadeIn(frame, f.delay, 30);
            const sc = scaleIn(frame, fps, f.delay);
            return (
              <div
                key={f.title}
                style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  background: colors.card,
                  border: `2px solid ${f.color}`,
                  borderRadius: 22,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  boxShadow: `0 20px 50px ${f.color}22`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: f.color + "22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 36,
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, color: colors.textMuted, fontWeight: 600 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: f.color }}>{f.title}</div>
                  </div>
                </div>
                <div style={{ fontSize: 20, color: colors.white, lineHeight: 1.5 }}>{f.desc}</div>
                <div
                  style={{
                    background: "#0b1220",
                    padding: "12px 16px",
                    borderRadius: 10,
                    fontSize: 16,
                    color: colors.textMuted,
                    fontFamily: "Pretendard, sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  {f.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ SCENE 6 — OUTRO ============
const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSc = scaleIn(frame, fps, 10);

  const summary = ["자연어 질의", "세션 대화", "자동 핸드오프", "다크모드"];
  const future = [
    { label: "uttec-search", desc: "Mac · Ubuntu 포팅 (10th vault)", color: colors.accent },
    { label: "DigitalOcean", desc: "클라우드 droplet 정식 배포", color: colors.amber },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, ${colors.bgSoft}, ${colors.bg} 70%)`,
        color: colors.white,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay sceneLabel="06 · 마무리" />
      <div
        style={{
          padding: "120px 80px 50px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          alignItems: "center",
        }}
      >
        <div
          style={{
            transform: `scale(${titleSc})`,
            fontSize: 60,
            fontWeight: 900,
            textAlign: "center",
            letterSpacing: -2,
          }}
        >
          search 핵심 <span style={{ color: colors.accent }}>4가지</span> 정리
        </div>

        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", justifyContent: "center" }}>
          {summary.map((s, i) => {
            const op = fadeIn(frame, 60 + i * 40, 30);
            const sc = scaleIn(frame, fps, 60 + i * 40);
            return (
              <div
                key={s}
                style={{
                  opacity: op,
                  transform: `scale(${sc})`,
                  padding: "20px 36px",
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
                  borderRadius: 18,
                  fontSize: 28,
                  fontWeight: 800,
                  boxShadow: `0 16px 40px ${colors.primary}55`,
                }}
              >
                {i + 1}. {s}
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 350, 30),
            marginTop: 16,
            background: colors.card,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 20,
            padding: 32,
            maxWidth: 1100,
            fontSize: 22,
            color: colors.white,
            lineHeight: 1.7,
            textAlign: "center",
          }}
        >
          search는 단순 검색 도구가 아닌,{" "}
          <span style={{ color: colors.accent, fontWeight: 700 }}>본인의 second-brain을 직접 사용하는 dogfooding 모델</span>
          입니다. 외부 회사 적용 전에 검색 정확도와 UX를 실제로 살아보며 검증합니다.
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 700, 30),
            display: "flex",
            gap: 24,
            marginTop: 8,
          }}
        >
          <div style={{ fontSize: 22, color: colors.textMuted, alignSelf: "center" }}>다음 단계 →</div>
          {future.map((f, i) => {
            const op = fadeIn(frame, 750 + i * 60, 30);
            return (
              <div
                key={f.label}
                style={{
                  opacity: op,
                  padding: "16px 24px",
                  background: colors.card,
                  border: `2px solid ${f.color}`,
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minWidth: 280,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, color: f.color }}>{f.label}</div>
                <div style={{ fontSize: 16, color: colors.textMuted }}>{f.desc}</div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: fadeIn(frame, 950, 40),
            marginTop: 30,
            fontSize: 34,
            fontWeight: 800,
            color: colors.accent,
            letterSpacing: -1,
          }}
        >
          감사합니다 🙏
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============ ROOT COMPOSITION ============
export const SearchIntroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      {/* Audio per scene */}
      <Sequence
        from={SCENE_TIMINGS.scene1_intro.start}
        durationInFrames={SCENE_TIMINGS.scene1_intro.duration}
      >
        <Audio src={staticFile("audio/search-intro/scene1_intro.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene2_structure.start}
        durationInFrames={SCENE_TIMINGS.scene2_structure.duration}
      >
        <Audio src={staticFile("audio/search-intro/scene2_structure.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene3_install.start}
        durationInFrames={SCENE_TIMINGS.scene3_install.duration}
      >
        <Audio src={staticFile("audio/search-intro/scene3_install.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene4_first_query.start}
        durationInFrames={SCENE_TIMINGS.scene4_first_query.duration}
      >
        <Audio src={staticFile("audio/search-intro/scene4_first_query.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene5_advanced.start}
        durationInFrames={SCENE_TIMINGS.scene5_advanced.duration}
      >
        <Audio src={staticFile("audio/search-intro/scene5_advanced.mp3")} />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene6_outro.start}
        durationInFrames={SCENE_TIMINGS.scene6_outro.duration}
      >
        <Audio src={staticFile("audio/search-intro/scene6_outro.mp3")} />
      </Sequence>

      {/* Visuals per scene */}
      <Sequence
        from={SCENE_TIMINGS.scene1_intro.start}
        durationInFrames={SCENE_TIMINGS.scene1_intro.duration}
      >
        <Scene1Intro />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene2_structure.start}
        durationInFrames={SCENE_TIMINGS.scene2_structure.duration}
      >
        <Scene2Structure />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene3_install.start}
        durationInFrames={SCENE_TIMINGS.scene3_install.duration}
      >
        <Scene3Install />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene4_first_query.start}
        durationInFrames={SCENE_TIMINGS.scene4_first_query.duration}
      >
        <Scene4FirstQuery />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene5_advanced.start}
        durationInFrames={SCENE_TIMINGS.scene5_advanced.duration}
      >
        <Scene5Advanced />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.scene6_outro.start}
        durationInFrames={SCENE_TIMINGS.scene6_outro.duration}
      >
        <Scene6Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
