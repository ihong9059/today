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

export const BLE_OTA_DURATION = 13398;

const SCENE_TIMINGS = {
  hook: { start: 0, duration: 985 },
  problem: { start: 985, duration: 1658 },
  solution: { start: 2643, duration: 1682 },
  demo: { start: 4325, duration: 2287 },
  architecture: { start: 6612, duration: 2029 },
  market: { start: 8641, duration: 1830 },
  business: { start: 10471, duration: 1694 },
  ask: { start: 12165, duration: 1233 },
};

const COLORS = {
  bg: "#0A1F44",
  bgDark: "#050d1f",
  cyan: "#00D4FF",
  orange: "#FF6B35",
  white: "#FFFFFF",
  grayText: "rgba(255,255,255,0.75)",
  cardBg: "rgba(0, 212, 255, 0.08)",
  cardBorder: "rgba(0, 212, 255, 0.3)",
  gradient:
    "linear-gradient(135deg, #0A1F44 0%, #122d5e 50%, #050d1f 100%)",
};

const FONT = "Pretendard, 'Noto Sans KR', sans-serif";

// ----------------- Helpers -----------------
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; from?: number }> = ({
  children,
  delay = 0,
  from = 30,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  const opacity = Math.min(1, f / 25);
  const translateY = (1 - opacity) * from;
  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)` }}>{children}</div>
  );
};

const Brand: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: 36,
        left: 50,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.orange} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
        }}
      >
        ⚡
      </div>
      <span
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 0.5,
        }}
      >
        VibeFirmware
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 50,
        zIndex: 9999,
        color: "rgba(255,255,255,0.5)",
        fontSize: 18,
        fontFamily: FONT,
      }}
    >
      Investor Pitch · 2026
    </div>
  </>
);

// ----------------- Scene 1: Hook -----------------
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [120, 180], [0, 1], { extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [200, 260], [0, 1], { extrapolateRight: "clamp" });
  const captionOpacity = interpolate(frame, [40, 100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, fontFamily: FONT }}>
      <Brand />
      <Audio src={staticFile("audio/lesson-ble-ota/scene1_hook.mp3")} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        <div
          style={{
            opacity: captionOpacity,
            fontSize: 28,
            color: COLORS.grayText,
            marginBottom: 60,
            letterSpacing: 2,
          }}
        >
          THE NEXT 30 YEARS OF EMBEDDED DEVELOPMENT
        </div>
        <div
          style={{
            fontSize: 130,
            fontWeight: 900,
            color: COLORS.white,
            opacity: titleOpacity,
            transform: `scale(${0.9 + titleOpacity * 0.1})`,
            textAlign: "center",
            lineHeight: 1.1,
            textShadow: "0 8px 32px rgba(0,212,255,0.4)",
          }}
        >
          말하면,<br />
          <span style={{ color: COLORS.cyan }}>펌웨어가</span> 된다.
        </div>
        <div
          style={{
            opacity: subOpacity,
            marginTop: 50,
            fontSize: 38,
            color: COLORS.grayText,
            textAlign: "center",
          }}
        >
          Vibe Coding for Embedded Hardware
        </div>
        <div
          style={{
            opacity: subOpacity,
            marginTop: 80,
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "16px 36px",
              borderRadius: 50,
              background: COLORS.cardBg,
              border: `2px solid ${COLORS.cardBorder}`,
              fontSize: 26,
              color: COLORS.cyan,
              fontWeight: 700,
            }}
          >
            ESP32-C3
          </div>
          <div style={{ fontSize: 32, color: COLORS.grayText }}>+</div>
          <div
            style={{
              padding: "16px 36px",
              borderRadius: 50,
              background: "rgba(255,107,53,0.1)",
              border: `2px solid rgba(255,107,53,0.4)`,
              fontSize: 26,
              color: COLORS.orange,
              fontWeight: 700,
            }}
          >
            Claude AI
          </div>
          <div style={{ fontSize: 32, color: COLORS.grayText }}>+</div>
          <div
            style={{
              padding: "16px 36px",
              borderRadius: 50,
              background: "rgba(255,255,255,0.1)",
              border: `2px solid rgba(255,255,255,0.3)`,
              fontSize: 26,
              color: COLORS.white,
              fontWeight: 700,
            }}
          >
            BLE OTA
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ----------------- Scene 2: Problem -----------------
const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    {
      icon: "🛠",
      title: "진입 장벽",
      desc: "툴체인 설치, 데이터시트 분석, 레지스터 매핑\n신규 개발자 학습에 평균 6개월",
    },
    {
      icon: "🔌",
      title: "케이블 의존성",
      desc: "매번 USB 케이블을 꽂고 빼야 함\n현장 디바이스는 사다리가 필요",
    },
    {
      icon: "🔁",
      title: "반복 사이클",
      desc: "코드 한 줄 수정에 평균 3분\n하루 200번 반복되는 빌드/플래싱",
    },
  ];
  const stats = [
    { value: "75억 대", label: "2030년 IoT 출하량" },
    { value: "9개월", label: "평균 펌웨어 개발 기간" },
    { value: "68%", label: "임베디드 인력 부족 호소 기업" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgDark, fontFamily: FONT }}>
      <Brand />
      <Audio src={staticFile("audio/lesson-ble-ota/scene2_problem.mp3")} />
      <div style={{ padding: "120px 100px 60px 100px" }}>
        <FadeIn>
          <h1
            style={{
              fontSize: 70,
              color: COLORS.white,
              margin: 0,
              fontWeight: 800,
            }}
          >
            임베디드 개발의 <span style={{ color: COLORS.orange }}>3대 병목</span>
          </h1>
          <div
            style={{
              fontSize: 28,
              color: COLORS.grayText,
              marginTop: 15,
            }}
          >
            왜 IoT 시장은 이토록 느리게 성장하는가
          </div>
        </FadeIn>

        <div style={{ display: "flex", gap: 40, marginTop: 70 }}>
          {items.map((item, i) => {
            const delay = 60 + i * 30;
            const f = Math.max(0, frame - delay);
            const op = Math.min(1, f / 25);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: COLORS.cardBg,
                  border: `2px solid ${COLORS.cardBorder}`,
                  borderRadius: 24,
                  padding: 40,
                  opacity: op,
                  transform: `translateY(${(1 - op) * 30}px)`,
                }}
              >
                <div style={{ fontSize: 70, marginBottom: 20 }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: COLORS.cyan,
                    marginBottom: 18,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: COLORS.grayText,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 70, justifyContent: "center" }}>
          {stats.map((s, i) => {
            const delay = 200 + i * 25;
            const f = Math.max(0, frame - delay);
            const op = Math.min(1, f / 25);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: "center",
                  opacity: op,
                  transform: `scale(${0.85 + op * 0.15})`,
                }}
              >
                <div
                  style={{
                    fontSize: 80,
                    fontWeight: 900,
                    color: COLORS.orange,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: COLORS.grayText,
                    marginTop: 12,
                  }}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------- Scene 3: Solution -----------------
const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const steps = [
    { icon: "🗣", label: "사용자\n자연어 입력", color: COLORS.white },
    { icon: "📱", label: "스마트폰 앱\nHTTPS 전송", color: COLORS.cyan },
    { icon: "☁️", label: "클라우드 서버\nClaude CLI 호출", color: COLORS.orange },
    { icon: "🤖", label: "Claude AI\n코드 생성 + 빌드", color: COLORS.cyan },
    { icon: "📡", label: "BLE OTA\n무선 플래싱", color: COLORS.orange },
    { icon: "⚡", label: "ESP32-C3\n즉시 동작", color: COLORS.white },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, fontFamily: FONT }}>
      <Brand />
      <Audio src={staticFile("audio/lesson-ble-ota/scene3_solution.mp3")} />
      <div style={{ padding: "120px 100px 60px 100px" }}>
        <FadeIn>
          <h1
            style={{
              fontSize: 70,
              color: COLORS.white,
              margin: 0,
              fontWeight: 800,
            }}
          >
            우리의 해법: <span style={{ color: COLORS.cyan }}>End-to-End 파이프라인</span>
          </h1>
          <div
            style={{
              fontSize: 28,
              color: COLORS.grayText,
              marginTop: 15,
            }}
          >
            자연어 → AI → BLE OTA → 동작. 단 30초.
          </div>
        </FadeIn>

        <div
          style={{
            marginTop: 90,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          {steps.map((s, i) => {
            const delay = 80 + i * 35;
            const f = Math.max(0, frame - delay);
            const op = Math.min(1, f / 20);
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    flex: 1,
                    background: COLORS.cardBg,
                    border: `2px solid ${COLORS.cardBorder}`,
                    borderRadius: 20,
                    padding: 24,
                    textAlign: "center",
                    opacity: op,
                    transform: `translateY(${(1 - op) * 20}px) scale(${0.9 + op * 0.1})`,
                  }}
                >
                  <div style={{ fontSize: 60 }}>{s.icon}</div>
                  <div
                    style={{
                      fontSize: 18,
                      color: s.color,
                      fontWeight: 700,
                      marginTop: 12,
                      whiteSpace: "pre-line",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      fontSize: 36,
                      color: COLORS.cyan,
                      opacity: op,
                    }}
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 90,
            display: "flex",
            gap: 30,
            justifyContent: "center",
          }}
        >
          {[
            { icon: "⚡", text: "30초 안에 동작" },
            { icon: "📱", text: "스마트폰만 있으면 OK" },
            { icon: "🤖", text: "AI가 코드 작성" },
            { icon: "🔁", text: "원격 업데이트 무한 반복" },
          ].map((v, i) => {
            const delay = 320 + i * 25;
            const f = Math.max(0, frame - delay);
            const op = Math.min(1, f / 25);
            return (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: "20px 30px",
                  fontSize: 24,
                  color: COLORS.white,
                  opacity: op,
                  transform: `translateY(${(1 - op) * 20}px)`,
                }}
              >
                {v.icon} {v.text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------- Scene 4: Demo -----------------
const SceneDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // 28 second simulated demo timeline (over ~75s narration)
  // Phases: connect (0-100), prompt (100-250), generate (250-1000), build (1000-1500),
  // download (1500-1700), ota (1700-1950), success (1950-end)
  const progress = (() => {
    if (frame < 250) return 0;
    if (frame > 1950) return 100;
    return Math.min(100, ((frame - 250) / (1950 - 250)) * 100);
  })();

  const phase = (() => {
    if (frame < 100) return "기기 연결 중...";
    if (frame < 250) return "프롬프트 입력 중...";
    if (frame < 700) return "Claude가 코드 작성 중...";
    if (frame < 1300) return "ESP-IDF 빌드 중...";
    if (frame < 1600) return "펌웨어 다운로드 중... 824 KB";
    if (frame < 1950) return "BLE OTA 전송 중...";
    if (frame < 2050) return "디바이스 재부팅 중...";
    return "✅ 완료! LED 동작 확인";
  })();

  const ledOn =
    frame > 2050 && Math.floor((frame - 2050) / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ background: COLORS.bgDark, fontFamily: FONT }}>
      <Brand />
      <Audio src={staticFile("audio/lesson-ble-ota/scene4_demo.mp3")} />
      <div style={{ padding: "120px 100px 60px 100px" }}>
        <FadeIn>
          <h1
            style={{
              fontSize: 64,
              color: COLORS.white,
              margin: 0,
              fontWeight: 800,
            }}
          >
            🎬 Live Demo: <span style={{ color: COLORS.orange }}>"LED 깜빡여줘"</span>
          </h1>
        </FadeIn>

        <div style={{ display: "flex", gap: 50, marginTop: 60 }}>
          {/* Left: Smartphone mockup */}
          <div
            style={{
              flex: 1,
              background: COLORS.cardBg,
              border: `2px solid ${COLORS.cardBorder}`,
              borderRadius: 24,
              padding: 40,
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: COLORS.cyan,
                marginBottom: 20,
                fontWeight: 700,
              }}
            >
              📱 Smartphone App
            </div>
            <div
              style={{
                background: "#1a1a1a",
                borderRadius: 18,
                padding: 30,
                minHeight: 380,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 12,
                }}
              >
                Prompt:
              </div>
              <div
                style={{
                  fontSize: 26,
                  color: COLORS.white,
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.3)",
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 30,
                  minHeight: 80,
                }}
              >
                {frame > 100 ? "내장 LED를 0.5초 간격으로 깜빡여줘" : ""}
                {frame > 100 && frame < 250 && Math.floor(frame / 8) % 2 === 0 ? "|" : ""}
              </div>

              <div
                style={{
                  fontSize: 18,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 12,
                }}
              >
                Status:
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.orange,
                  marginBottom: 18,
                  fontWeight: 600,
                }}
              >
                {phase}
              </div>

              {/* Progress bar */}
              <div
                style={{
                  width: "100%",
                  height: 14,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 7,
                  overflow: "hidden",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.orange})`,
                    transition: "width 0.1s",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: COLORS.grayText,
                  textAlign: "right",
                }}
              >
                {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Right: ESP32 board */}
          <div
            style={{
              flex: 1,
              background: COLORS.cardBg,
              border: `2px solid ${COLORS.cardBorder}`,
              borderRadius: 24,
              padding: 40,
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: COLORS.cyan,
                marginBottom: 20,
                fontWeight: 700,
              }}
            >
              🔬 ESP32-C3 Device
            </div>
            <div
              style={{
                background: "#0d2818",
                borderRadius: 18,
                padding: 50,
                minHeight: 380,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Board */}
              <div
                style={{
                  width: 280,
                  height: 200,
                  background: "linear-gradient(135deg, #1e3a2f, #0f1f18)",
                  border: "3px solid #2d5a44",
                  borderRadius: 12,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 18,
                    color: "#88ccaa",
                    fontFamily: "monospace",
                    fontWeight: 700,
                  }}
                >
                  ESP32-C3
                </div>
                {/* LED */}
                <div
                  style={{
                    position: "absolute",
                    top: 30,
                    right: 30,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: ledOn ? "#FFD700" : "#332200",
                    boxShadow: ledOn ? "0 0 40px 10px rgba(255,215,0,0.8)" : "none",
                  }}
                />
                {/* Pins */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      bottom: -10,
                      left: 30 + i * 50,
                      width: 14,
                      height: 14,
                      background: "#888",
                      borderRadius: 3,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  marginTop: 30,
                  fontSize: 22,
                  color: ledOn ? "#FFD700" : COLORS.grayText,
                  fontWeight: 700,
                }}
              >
                {frame > 2050 ? "💡 LED 깜빡임 동작 중!" : "⏳ 대기 중..."}
              </div>
            </div>
          </div>
        </div>

        {frame > 2100 && (
          <div
            style={{
              marginTop: 30,
              textAlign: "center",
              fontSize: 38,
              color: COLORS.cyan,
              fontWeight: 800,
            }}
          >
            ⏱ 총 소요 시간: 28초
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ----------------- Scene 5: Architecture -----------------
const SceneArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  const tiers = [
    {
      title: "Device",
      icon: "🔬",
      name: "ESP32-C3",
      stack: ["BLE OTA Bootloader", "Dual Partition", "NimBLE Stack"],
    },
    {
      title: "Client",
      icon: "📱",
      name: "Smartphone App",
      stack: ["Flutter", "BLE GATT", "HTTPS Client"],
    },
    {
      title: "Intelligence",
      icon: "☁️",
      name: "Cloud Server",
      stack: ["FastAPI", "Claude Code CLI", "ESP-IDF Toolchain"],
    },
  ];

  const techs = [
    "ESP32 BLE OTA",
    "Android BLE GATT",
    "Claude Code CLI ✓",
    "Linux ESP-IDF Build",
    "HTTPS REST API",
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgDark, fontFamily: FONT }}>
      <Brand />
      <Audio src={staticFile("audio/lesson-ble-ota/scene5_architecture.mp3")} />
      <div style={{ padding: "120px 100px 60px 100px" }}>
        <FadeIn>
          <h1
            style={{
              fontSize: 64,
              color: COLORS.white,
              margin: 0,
              fontWeight: 800,
            }}
          >
            3-Tier Architecture
          </h1>
          <div style={{ fontSize: 26, color: COLORS.grayText, marginTop: 12 }}>
            검증된 5개 기술의 결합 — 발명할 기술 없음
          </div>
        </FadeIn>

        <div style={{ display: "flex", gap: 30, marginTop: 60, alignItems: "stretch" }}>
          {tiers.map((t, i) => {
            const delay = 60 + i * 35;
            const f = Math.max(0, frame - delay);
            const op = Math.min(1, f / 25);
            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    flex: 1,
                    background: COLORS.cardBg,
                    border: `2px solid ${COLORS.cardBorder}`,
                    borderRadius: 24,
                    padding: 36,
                    opacity: op,
                    transform: `translateY(${(1 - op) * 20}px)`,
                  }}
                >
                  <div style={{ fontSize: 60 }}>{t.icon}</div>
                  <div
                    style={{
                      fontSize: 18,
                      color: COLORS.orange,
                      fontWeight: 700,
                      letterSpacing: 2,
                      marginTop: 10,
                    }}
                  >
                    {t.title.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      color: COLORS.white,
                      fontWeight: 800,
                      marginTop: 5,
                      marginBottom: 20,
                    }}
                  >
                    {t.name}
                  </div>
                  {t.stack.map((s, j) => (
                    <div
                      key={j}
                      style={{
                        fontSize: 20,
                        color: COLORS.cyan,
                        marginBottom: 8,
                      }}
                    >
                      • {s}
                    </div>
                  ))}
                </div>
                {i < tiers.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 40,
                      color: COLORS.cyan,
                      opacity: op,
                    }}
                  >
                    ⇄
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 60,
            background: "rgba(255,107,53,0.1)",
            border: `2px solid rgba(255,107,53,0.4)`,
            borderRadius: 20,
            padding: 35,
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: COLORS.orange,
              fontWeight: 800,
              marginBottom: 20,
            }}
          >
            ✓ 어제 검증된 기술 (2026.04.06)
          </div>
          <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
            {techs.map((tech, i) => {
              const delay = 250 + i * 15;
              const f = Math.max(0, frame - delay);
              const op = Math.min(1, f / 20);
              return (
                <div
                  key={i}
                  style={{
                    padding: "12px 24px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 12,
                    fontSize: 22,
                    color: COLORS.white,
                    opacity: op,
                  }}
                >
                  {tech}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------- Scene 6: Market -----------------
const SceneMarket: React.FC = () => {
  const frame = useCurrentFrame();
  const stats = [
    { value: "$1.1조", label: "글로벌 IoT 시장 (2030)" },
    { value: "75억 대", label: "연간 IoT 디바이스 출하" },
    { value: "$650억", label: "임베디드 SW 시장" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, fontFamily: FONT }}>
      <Brand />
      <Audio src={staticFile("audio/lesson-ble-ota/scene6_market.mp3")} />
      <div style={{ padding: "120px 100px 60px 100px" }}>
        <FadeIn>
          <h1
            style={{
              fontSize: 64,
              color: COLORS.white,
              margin: 0,
              fontWeight: 800,
            }}
          >
            시장 기회 & <span style={{ color: COLORS.orange }}>경쟁 우위</span>
          </h1>
        </FadeIn>

        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 50,
            justifyContent: "center",
          }}
        >
          {stats.map((s, i) => {
            const delay = 60 + i * 30;
            const f = Math.max(0, frame - delay);
            const op = Math.min(1, f / 25);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: "center",
                  opacity: op,
                  transform: `scale(${0.85 + op * 0.15})`,
                  background: COLORS.cardBg,
                  border: `2px solid ${COLORS.cardBorder}`,
                  borderRadius: 20,
                  padding: 36,
                }}
              >
                <div
                  style={{
                    fontSize: 70,
                    fontWeight: 900,
                    color: COLORS.cyan,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: COLORS.grayText,
                    marginTop: 12,
                  }}
                >
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2x2 Competitive Matrix */}
        <div style={{ marginTop: 60 }}>
          <div
            style={{
              fontSize: 28,
              color: COLORS.white,
              fontWeight: 700,
              marginBottom: 25,
              textAlign: "center",
            }}
          >
            경쟁 매트릭스
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 20,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {[
              { label: "ESP-OTA", desc: "코딩 필요 + 무선", q: "TL", highlight: false },
              {
                label: "VibeFirmware ⭐",
                desc: "자연어 + 무선",
                q: "TR",
                highlight: true,
              },
              { label: "Arduino IDE / ESP-IDF", desc: "코딩 필요 + 케이블", q: "BL", highlight: false },
              { label: "GitHub Copilot", desc: "자연어 + 케이블", q: "BR", highlight: false },
            ].map((cell, i) => {
              const delay = 200 + i * 25;
              const f = Math.max(0, frame - delay);
              const op = Math.min(1, f / 25);
              return (
                <div
                  key={i}
                  style={{
                    padding: 30,
                    borderRadius: 16,
                    background: cell.highlight
                      ? "rgba(255,107,53,0.2)"
                      : "rgba(255,255,255,0.05)",
                    border: cell.highlight
                      ? `3px solid ${COLORS.orange}`
                      : "1px solid rgba(255,255,255,0.15)",
                    opacity: op,
                    transform: cell.highlight
                      ? `scale(${0.95 + op * 0.05})`
                      : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: cell.highlight ? COLORS.orange : COLORS.white,
                    }}
                  >
                    {cell.label}
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      color: COLORS.grayText,
                      marginTop: 8,
                    }}
                  >
                    {cell.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------- Scene 7: Business -----------------
const SceneBusiness: React.FC = () => {
  const frame = useCurrentFrame();
  const plans = [
    { name: "Free", price: "$0", desc: "월 10회 빌드\n메이커/학생용", color: COLORS.white },
    { name: "Pro", price: "$29/월", desc: "무제한 빌드\n우선순위 큐", color: COLORS.cyan },
    { name: "Team", price: "$199/월", desc: "다수 디바이스\n전용 클라우드", color: COLORS.orange },
  ];

  const roadmap = [
    { month: "M1-M2", task: "클라우드 + PoC 구축" },
    { month: "M3-M4", task: "Android 앱 베타" },
    { month: "M5-M6", task: "클로즈드 베타 100명" },
    { month: "M7-M9", task: "오픈 베타 + 보안 강화" },
    { month: "M10-M12", task: "정식 출시 + 첫 100 유료 고객" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgDark, fontFamily: FONT }}>
      <Brand />
      <Audio src={staticFile("audio/lesson-ble-ota/scene7_business.mp3")} />
      <div style={{ padding: "120px 100px 60px 100px" }}>
        <FadeIn>
          <h1
            style={{
              fontSize: 64,
              color: COLORS.white,
              margin: 0,
              fontWeight: 800,
            }}
          >
            비즈니스 모델 & <span style={{ color: COLORS.cyan }}>로드맵</span>
          </h1>
        </FadeIn>

        <div style={{ display: "flex", gap: 30, marginTop: 50 }}>
          {plans.map((p, i) => {
            const delay = 60 + i * 30;
            const f = Math.max(0, frame - delay);
            const op = Math.min(1, f / 25);
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: COLORS.cardBg,
                  border: `2px solid ${p.color}`,
                  borderRadius: 20,
                  padding: 36,
                  opacity: op,
                  transform: `translateY(${(1 - op) * 20}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    color: p.color,
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  {p.name.toUpperCase()}
                </div>
                <div
                  style={{
                    fontSize: 50,
                    color: COLORS.white,
                    fontWeight: 900,
                    marginTop: 12,
                  }}
                >
                  {p.price}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: COLORS.grayText,
                    marginTop: 16,
                    whiteSpace: "pre-line",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 30,
            textAlign: "center",
            fontSize: 28,
            color: COLORS.orange,
            fontWeight: 700,
          }}
        >
          🎯 Year 2 ARR Target: $2.4M
        </div>

        <div style={{ marginTop: 40 }}>
          <div
            style={{
              fontSize: 26,
              color: COLORS.white,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            12개월 로드맵
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "stretch",
            }}
          >
            {roadmap.map((r, i) => {
              const delay = 200 + i * 22;
              const f = Math.max(0, frame - delay);
              const op = Math.min(1, f / 22);
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.3)",
                    borderRadius: 14,
                    padding: 20,
                    opacity: op,
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      color: COLORS.cyan,
                      fontWeight: 800,
                    }}
                  >
                    {r.month}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      color: COLORS.white,
                      marginTop: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {r.task}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ----------------- Scene 8: Ask -----------------
const SceneAsk: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [30, 90], [0, 1], { extrapolateRight: "clamp" });
  const askOp = interpolate(frame, [200, 280], [0, 1], { extrapolateRight: "clamp" });
  const ctaOp = interpolate(frame, [600, 680], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, fontFamily: FONT }}>
      <Brand />
      <Audio src={staticFile("audio/lesson-ble-ota/scene8_ask.mp3")} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        <div
          style={{
            fontSize: 50,
            color: COLORS.white,
            textAlign: "center",
            opacity: titleOp,
            transform: `translateY(${(1 - titleOp) * 30}px)`,
            fontWeight: 700,
            lineHeight: 1.4,
            maxWidth: 1400,
          }}
        >
          우리는 코드를 쓰는 시대를 끝내려 합니다.<br />
          그리고 <span style={{ color: COLORS.cyan }}>의도를 말하는 시대</span>를 시작합니다.
        </div>

        <div
          style={{
            marginTop: 80,
            opacity: askOp,
            transform: `scale(${0.9 + askOp * 0.1})`,
            background: COLORS.cardBg,
            border: `3px solid ${COLORS.orange}`,
            borderRadius: 24,
            padding: "50px 80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: COLORS.orange,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            SEED ROUND
          </div>
          <div
            style={{
              fontSize: 110,
              color: COLORS.white,
              fontWeight: 900,
              marginTop: 12,
            }}
          >
            $1.5M
          </div>
          <div
            style={{
              fontSize: 26,
              color: COLORS.grayText,
              marginTop: 16,
            }}
          >
            12개월 런웨이 · 엔지니어 4명 · 클라우드 인프라
          </div>
        </div>

        <div
          style={{
            marginTop: 70,
            opacity: ctaOp,
            fontSize: 60,
            color: COLORS.cyan,
            fontWeight: 900,
            textAlign: "center",
            textShadow: "0 4px 24px rgba(0,212,255,0.5)",
          }}
        >
          말하면, 펌웨어가 됩니다.
        </div>
        <div
          style={{
            marginTop: 30,
            opacity: ctaOp,
            fontSize: 22,
            color: COLORS.grayText,
          }}
        >
          contact@vibefirmware.io · vibefirmware.io
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ----------------- Main Composition -----------------
export const BleOtaPitchVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bgDark }}>
      <Sequence from={SCENE_TIMINGS.hook.start} durationInFrames={SCENE_TIMINGS.hook.duration}>
        <SceneHook />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.problem.start} durationInFrames={SCENE_TIMINGS.problem.duration}>
        <SceneProblem />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.solution.start} durationInFrames={SCENE_TIMINGS.solution.duration}>
        <SceneSolution />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.demo.start} durationInFrames={SCENE_TIMINGS.demo.duration}>
        <SceneDemo />
      </Sequence>
      <Sequence
        from={SCENE_TIMINGS.architecture.start}
        durationInFrames={SCENE_TIMINGS.architecture.duration}
      >
        <SceneArchitecture />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.market.start} durationInFrames={SCENE_TIMINGS.market.duration}>
        <SceneMarket />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.business.start} durationInFrames={SCENE_TIMINGS.business.duration}>
        <SceneBusiness />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.ask.start} durationInFrames={SCENE_TIMINGS.ask.duration}>
        <SceneAsk />
      </Sequence>
    </AbsoluteFill>
  );
};
