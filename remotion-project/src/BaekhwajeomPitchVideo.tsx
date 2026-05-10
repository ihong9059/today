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

// ============ TIMINGS (음성 길이 기반 — 4분 38초 = 8343 frames @ 30fps) ============
export const BAEKHWAJEOM_DURATION = 8343;

const T = {
  scene1: { start: 0, dur: 451 },      // 오프닝
  scene2: { start: 451, dur: 1029 },   // 문제 제기
  scene3: { start: 1480, dur: 1071 },  // 해결책 소개
  scene4: { start: 2551, dur: 1395 },  // 시나리오 1
  scene5: { start: 3946, dur: 1295 },  // 시나리오 2,3
  scene6: { start: 5241, dur: 825 },   // 시나리오 4-7
  scene7: { start: 6066, dur: 888 },   // 보안
  scene8: { start: 6954, dur: 899 },   // 로드맵
  scene9: { start: 7853, dur: 490 },   // 클로징
};

const AUDIO_BASE = "audio/baekhwajeom";

// ============ LUXURY COLOR PALETTE ============
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
};

// ============ HELPERS ============
const fadeIn = (frame: number, start = 0, dur = 30) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeOut = (frame: number, start: number, dur = 30) =>
  interpolate(frame, [start, start + dur], [1, 0], {
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
const LuxuryBackground: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at center, ${C.navyMid} 0%, ${C.navy} 50%, ${C.navyDark} 100%)`,
    }}
  >
    {/* 골드 라인 장식 */}
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
  const subOp = fadeIn(frame, 180, 40);
  const lineOp = fadeIn(frame, 240, 40);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${C.navyMid} 0%, ${C.navy} 60%, ${C.navyDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 골드 라인 */}
      <div
        style={{
          width: 120,
          height: 2,
          background: C.gold,
          marginBottom: 40,
          opacity: lineOp,
        }}
      />
      {/* 메인 타이틀 */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: C.white,
          textAlign: "center",
          opacity: titleOp,
          transform: `translateY(${slideUp(frame, 60, 50, 30)}px)`,
          letterSpacing: 2,
          lineHeight: 1.4,
        }}
      >
        공간을 새로 정의하는 일,
        <br />
        <span style={{ color: C.gold }}>그 모든 결정을</span>
        <br />
        어디에 남기십니까?
      </div>
      {/* 부제 */}
      <div
        style={{
          marginTop: 60,
          fontSize: 26,
          color: C.textMuted,
          opacity: subOp,
          letterSpacing: 8,
        }}
      >
        의왕 · 인천 · 소공동 본점
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
// SCENE 2 — PROBLEM STATEMENT (0:20~1:00)
// ============================================================
const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOp = fadeIn(frame, 0, 30);

  const items = [
    { label: "이메일", icon: "✉" },
    { label: "파일서버", icon: "📁" },
    { label: "메신저", icon: "💬" },
    { label: "다이어리", icon: "📔" },
  ];

  const conclusions = [
    { text: "정보는 흩어지고", at: 600 },
    { text: "맥락은 휘발되고", at: 720 },
    { text: "노하우는 사람과 함께 떠납니다", at: 840 },
  ];

  // 자막
  const sub1Visible = frame >= 0 && frame < 360;
  const sub2Visible = frame >= 360 && frame < 720;
  const sub3Visible = frame >= 720 && frame < 1100;
  const sub4Visible = frame >= 1100;

  return (
    <AbsoluteFill style={{ background: C.navyDark, padding: 80 }}>
      <LuxuryBackground />

      {/* 상단 제목 */}
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
        익숙한 도구의 한계
      </div>

      {/* 4분할 그리드 */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          flexWrap: "wrap",
          padding: "0 100px",
        }}
      >
        {items.map((it, i) => {
          const op = fadeIn(frame, 60 + i * 60, 30);
          const broken = frame > 480 ? interpolate(frame, [480, 540], [0, 1], { extrapolateRight: "clamp" }) : 0;
          return (
            <div
              key={i}
              style={{
                width: 280,
                height: 200,
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
              }}
            >
              <div style={{ fontSize: 70, marginBottom: 16 }}>{it.icon}</div>
              <div style={{ fontSize: 28, color: C.cream, fontWeight: 600 }}>
                {it.label}
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

      {/* 결론 텍스트 */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        {conclusions.map((c, i) => (
          <div
            key={i}
            style={{
              fontSize: 32,
              color: C.cream,
              opacity: fadeIn(frame, c.at, 30),
              transform: `translateY(${slideUp(frame, c.at, 30, 20)}px)`,
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            <span style={{ color: C.red, marginRight: 12 }}>—</span>
            {c.text}
          </div>
        ))}
      </div>

      {sub1Visible && <Subtitle text="동시에 들어오는 자료는 6개 채널이 넘습니다" />}
      {sub2Visible && <Subtitle text="이메일, 파일서버, 메신저, 다이어리" />}
      {sub3Visible && <Subtitle text="익숙한 이 조합은 — 세 가지를 잘 못합니다" />}
      {sub4Visible && <Subtitle text='"6개월 전에 왜 그렇게 결정했더라"' />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 3 — SOLUTION (1:00~1:30)
// ============================================================
const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftScale = springScale(frame, fps, 30);
  const rightScale = springScale(frame, fps, 90);
  const plusOp = fadeIn(frame, 180, 30);
  const equalOp = fadeIn(frame, 360, 30);
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
        해결의 방향
      </div>

      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          paddingTop: 100,
        }}
      >
        {/* Obsidian 카드 */}
        <div
          style={{
            width: 360,
            height: 360,
            background: `linear-gradient(145deg, #4F2D8B 0%, #2A1654 100%)`,
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${leftScale})`,
            boxShadow: `0 20px 60px rgba(79, 45, 139, 0.5)`,
            border: `2px solid ${C.gold}60`,
          }}
        >
          <div style={{ fontSize: 100, marginBottom: 20 }}>💎</div>
          <div style={{ fontSize: 42, color: C.white, fontWeight: 700, letterSpacing: 1 }}>
            Obsidian
          </div>
          <div style={{ fontSize: 22, color: C.goldLight, marginTop: 16, letterSpacing: 2 }}>
            영구 기억 저장소
          </div>
        </div>

        {/* + 기호 */}
        <div
          style={{
            fontSize: 80,
            color: C.gold,
            fontWeight: 300,
            opacity: plusOp,
          }}
        >
          +
        </div>

        {/* Claude 카드 */}
        <div
          style={{
            width: 360,
            height: 360,
            background: `linear-gradient(145deg, #C26B3F 0%, #6B3A1F 100%)`,
            borderRadius: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${rightScale})`,
            boxShadow: `0 20px 60px rgba(194, 107, 63, 0.5)`,
            border: `2px solid ${C.gold}60`,
          }}
        >
          <div style={{ fontSize: 100, marginBottom: 20 }}>🧠</div>
          <div style={{ fontSize: 42, color: C.white, fontWeight: 700, letterSpacing: 1 }}>
            Claude
          </div>
          <div style={{ fontSize: 22, color: C.goldLight, marginTop: 16, letterSpacing: 2 }}>
            실시간 처리 두뇌
          </div>
        </div>
      </AbsoluteFill>

      {/* 결과 수식 */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: equalOp,
        }}
      >
        <div
          style={{
            fontSize: 56,
            color: C.gold,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          1 + 1 = <span style={{ fontSize: 80, color: C.goldLight }}>10</span>
        </div>
        <div
          style={{
            fontSize: 24,
            color: C.cream,
            marginTop: 12,
            opacity: resultOp,
            letterSpacing: 2,
          }}
        >
          판단과 실행 — 점장님의 영역
        </div>
      </div>

      {sub1 && <Subtitle text="두 개의 도구가 이 문제를 해결합니다" />}
      {sub2 && <Subtitle text="Obsidian — 회사 보안망과 충돌 없이, PC에 영구 보관" />}
      {sub3 && <Subtitle text="Claude — 회의록 5초 요약, 보고서 30분 작성" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 4 — SCENARIO 1: PROJECT COMMAND CENTER (1:30~2:15)
// ============================================================
const Scene4Scenario1: React.FC = () => {
  const frame = useCurrentFrame();

  const folders = [
    "📁 본점리모델링/",
    "├── 00_프로젝트_헌장.md",
    "├── 01_의사결정대장.md",
    "├── 02_주간회의록/",
    "├── 03_벤치마킹/",
    "├── 04_층별_컨셉/",
    "├── 05_리스크대장.md",
    "└── 06_VIP브리핑_이력.md",
  ];

  const claudeQA = {
    qStart: 540,
    aStart: 720,
  };

  const sub1 = frame >= 0 && frame < 360;
  const sub2 = frame >= 360 && frame < 720;
  const sub3 = frame >= 720 && frame < 1080;
  const sub4 = frame >= 1080;

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <LuxuryBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 32,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        시나리오 ① 본점 리모델링 통합 운영실
      </div>

      <AbsoluteFill
        style={{
          flexDirection: "row",
          paddingTop: 160,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 60,
        }}
      >
        {/* 좌측: 폴더 트리 */}
        <div
          style={{
            flex: 1,
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 16,
            padding: 40,
            border: `1px solid ${C.gold}40`,
            fontFamily: "Consolas, monospace",
            opacity: fadeIn(frame, 40, 30),
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: C.gold,
              marginBottom: 24,
              letterSpacing: 2,
            }}
          >
            ▸ Obsidian Vault
          </div>
          {folders.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: 24,
                color: i === 0 ? C.goldLight : C.cream,
                fontWeight: i === 0 ? 700 : 400,
                lineHeight: 1.7,
                opacity: fadeIn(frame, 60 + i * 30, 20),
                transform: `translateX(${(1 - fadeIn(frame, 60 + i * 30, 20)) * 30}px)`,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        {/* 우측: Claude 채팅 */}
        <div
          style={{
            flex: 1,
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 16,
            padding: 40,
            border: `1px solid ${C.gold}40`,
            opacity: fadeIn(frame, 480, 30),
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: C.gold,
              marginBottom: 24,
              letterSpacing: 2,
            }}
          >
            ▸ Claude
          </div>

          {/* 사용자 질문 */}
          <div
            style={{
              opacity: fadeIn(frame, claudeQA.qStart, 30),
              marginBottom: 30,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: C.textMuted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              점장님
            </div>
            <div
              style={{
                background: `${C.gold}20`,
                padding: 20,
                borderRadius: 12,
                fontSize: 22,
                color: C.cream,
                lineHeight: 1.5,
                borderLeft: `3px solid ${C.gold}`,
              }}
            >
              "1F 명품관 동선에 대해
              <br />
              지금까지 결정된 것만 정리해 줘"
            </div>
          </div>

          {/* Claude 응답 */}
          <div
            style={{
              opacity: fadeIn(frame, claudeQA.aStart, 30),
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: C.textMuted,
                marginBottom: 8,
                letterSpacing: 1,
              }}
            >
              Claude
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: 20,
                borderRadius: 12,
                fontSize: 18,
                color: C.cream,
                lineHeight: 1.7,
                borderLeft: `3px solid #C26B3F`,
              }}
            >
              {[
                "1. 발렛 → 1F 직진 동선 (W3 회의)",
                "2. VIP 라운지 별도 입구 (W5)",
                "3. 명품관 회유성 우선 (W7)",
                "4. POP-UP 존 동측 배치 (W9)",
                "5. 카페테리아 → 보석관 연결 (W11)",
              ].map((line, i) => (
                <div
                  key={i}
                  style={{
                    opacity: fadeIn(frame, claudeQA.aStart + 30 + i * 40, 20),
                    marginBottom: 6,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {sub1 && <Subtitle text="첫 번째 시나리오 — 본점 리모델링 통합 운영실" />}
      {sub2 && <Subtitle text="모든 결정·회의·벤치마킹이 한 폴더에" />}
      {sub3 && <Subtitle text="흩어진 노트에서 결정사항만 — 30초면 답이 나옵니다" />}
      {sub4 && <Subtitle text="검색 가능한 자산으로 — 잠실·부산에서도 재사용" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 5 — SCENARIO 2,3: ROUNDING + VIP (2:15~3:00)
// ============================================================
const Scene5Scenario23: React.FC = () => {
  const frame = useCurrentFrame();

  const sub1 = frame >= 0 && frame < 360;
  const sub2 = frame >= 360 && frame < 720;
  const sub3 = frame >= 720 && frame < 1080;
  const sub4 = frame >= 1080;

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <LuxuryBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 32,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        시나리오 ② 매장 라운딩 · ③ VIP 관계 관리
      </div>

      <AbsoluteFill
        style={{
          flexDirection: "row",
          paddingTop: 160,
          paddingLeft: 60,
          paddingRight: 60,
          gap: 50,
        }}
      >
        {/* 좌측: 라운딩 흐름 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 30,
            opacity: fadeIn(frame, 30, 30),
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: C.goldLight,
              textAlign: "center",
              letterSpacing: 2,
            }}
          >
            매일 아침 5분
          </div>
          {[
            { icon: "🎙", title: "음성 메모", desc: "라운딩 중 5분 녹음", at: 60 },
            { icon: "✨", title: "Claude 변환", desc: "텍스트 + 자동 정리", at: 240 },
            { icon: "📔", title: "Daily Note", desc: "Obsidian에 자동 저장", at: 420 },
            { icon: "📊", title: "월간 패턴", desc: "TOP 5 이슈 추출", at: 600 },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(13, 28, 50, 0.85)",
                borderRadius: 14,
                padding: "20px 28px",
                border: `1px solid ${C.gold}30`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: fadeIn(frame, s.at, 30),
                transform: `translateX(${(1 - fadeIn(frame, s.at, 30)) * -30}px)`,
              }}
            >
              <div style={{ fontSize: 44 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 24, color: C.cream, fontWeight: 600 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 18, color: C.textMuted, marginTop: 4 }}>
                  {s.desc}
                </div>
              </div>
              {i < 3 && (
                <div style={{ marginLeft: "auto", fontSize: 28, color: C.gold }}>→</div>
              )}
            </div>
          ))}
        </div>

        {/* 우측: VIP 노트 카드 그래프 */}
        <div
          style={{
            flex: 1,
            position: "relative",
            background: "rgba(13, 28, 50, 0.85)",
            borderRadius: 16,
            border: `1px solid ${C.gold}40`,
            padding: 40,
            opacity: fadeIn(frame, 540, 30),
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: C.goldLight,
              textAlign: "center",
              letterSpacing: 2,
              marginBottom: 30,
            }}
          >
            VIP · 브랜드 노트 (이니셜 처리)
          </div>

          {/* 노트 카드들 */}
          {[
            { label: "VIP-A", sub: "가족경조사", x: 10, y: 60, color: C.gold, at: 600 },
            { label: "BRAND-L", sub: "협상 이력", x: 60, y: 30, color: "#C26B3F", at: 720 },
            { label: "VIP-B", sub: "관심 카테고리", x: 30, y: 200, color: C.gold, at: 840 },
            { label: "BRAND-G", sub: "입점 조건", x: 70, y: 240, color: "#C26B3F", at: 960 },
            { label: "VIP-C", sub: "기념일", x: 5, y: 380, color: C.gold, at: 1080 },
          ].map((n, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${n.x}%`,
                top: `${n.y + 80}px`,
                background: `${n.color}30`,
                border: `2px solid ${n.color}`,
                borderRadius: 12,
                padding: "12px 18px",
                opacity: fadeIn(frame, n.at, 30),
                transform: `scale(${fadeIn(frame, n.at, 30)})`,
              }}
            >
              <div style={{ fontSize: 20, color: C.white, fontWeight: 700 }}>
                {n.label}
              </div>
              <div style={{ fontSize: 14, color: C.textMuted, marginTop: 2 }}>
                {n.sub}
              </div>
            </div>
          ))}

          {/* 연결선들 */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              opacity: fadeIn(frame, 1080, 60) * 0.5,
            }}
            viewBox="0 0 600 600"
          >
            <line x1="120" y1="180" x2="380" y2="120" stroke={C.gold} strokeWidth="1" />
            <line x1="380" y1="120" x2="200" y2="320" stroke={C.gold} strokeWidth="1" />
            <line x1="200" y1="320" x2="420" y2="340" stroke={C.gold} strokeWidth="1" />
            <line x1="120" y1="180" x2="100" y2="480" stroke={C.gold} strokeWidth="1" />
          </svg>
        </div>
      </AbsoluteFill>

      {sub1 && <Subtitle text="휴대폰에 5분만 녹음하시면 됩니다" />}
      {sub2 && <Subtitle text="한 달이 쌓이면 — 반복 이슈 TOP 5가 보입니다" />}
      {sub3 && <Subtitle text="VIP·브랜드별 노트 한 장씩 — 양방향으로 연결" />}
      {sub4 && <Subtitle text='미팅 5분 전, "지난 1년 핵심만" 한 줄이면 끝' />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 6 — SCENARIO 4-7 (3:00~3:40)
// ============================================================
const Scene6Scenarios: React.FC = () => {
  const frame = useCurrentFrame();

  const cards = [
    {
      n: "④",
      title: "임원 보고서",
      before: "2~3시간",
      after: "30분",
      icon: "📄",
      at: 60,
    },
    {
      n: "⑤",
      title: "글로벌 벤치마킹",
      before: "1회성",
      after: "영구 자산",
      icon: "🌍",
      at: 240,
    },
    {
      n: "⑥",
      title: "매출·MD 인사이트",
      before: "감각 의존",
      after: "패턴 추출",
      icon: "📈",
      at: 420,
    },
    {
      n: "⑦",
      title: "커리어 자산화",
      before: "머릿속",
      after: "강연·책의 원자재",
      icon: "👑",
      at: 600,
    },
  ];

  const sub1 = frame >= 0 && frame < 400;
  const sub2 = frame >= 400 && frame < 800;
  const sub3 = frame >= 800;

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <LuxuryBackground />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 32,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        시나리오 ④⑤⑥⑦ — 한눈에
      </div>

      <AbsoluteFill
        style={{
          paddingTop: 180,
          paddingLeft: 100,
          paddingRight: 100,
          paddingBottom: 100,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navy} 100%)`,
              border: `1px solid ${C.gold}40`,
              borderRadius: 16,
              padding: 36,
              opacity: fadeIn(frame, c.at, 30),
              transform: `translateY(${slideUp(frame, c.at, 30, 30)}px)`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: 44, color: C.gold, fontWeight: 700 }}>{c.n}</span>
              <span style={{ fontSize: 36 }}>{c.icon}</span>
              <span style={{ fontSize: 28, color: C.cream, fontWeight: 600 }}>
                {c.title}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                fontSize: 22,
                marginTop: 20,
              }}
            >
              <span
                style={{
                  color: C.textMuted,
                  textDecoration: "line-through",
                  textDecorationColor: C.red,
                }}
              >
                {c.before}
              </span>
              <span style={{ color: C.gold, fontSize: 28 }}>→</span>
              <span style={{ color: C.goldLight, fontWeight: 700, fontSize: 26 }}>
                {c.after}
              </span>
            </div>
          </div>
        ))}
      </AbsoluteFill>

      {sub1 && <Subtitle text="보고서 작성 시간은 두세 시간에서 30분으로" />}
      {sub2 && <Subtitle text="해외 출장 자료는 — 평생 가는 자산으로" />}
      {sub3 && <Subtitle text="모든 노하우가 강연·책·후학 양성의 원자재로" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 7 — SECURITY (3:40~4:10)
// ============================================================
const Scene7Security: React.FC = () => {
  const frame = useCurrentFrame();

  const sub1 = frame >= 0 && frame < 360;
  const sub2 = frame >= 360 && frame < 720;
  const sub3 = frame >= 720;

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <LuxuryBackground />

      {/* 경고 헤더 */}
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
        <div style={{ fontSize: 60, marginBottom: 12 }}>🔒</div>
        <div
          style={{
            fontSize: 38,
            color: C.gold,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          보안이 가장 중요한 장입니다
        </div>
      </div>

      {/* 좌우 비교 */}
      <AbsoluteFill
        style={{
          paddingTop: 280,
          paddingLeft: 100,
          paddingRight: 100,
          flexDirection: "row",
          gap: 40,
        }}
      >
        {/* 위험한 입력 */}
        <div
          style={{
            flex: 1,
            background: `${C.red}15`,
            border: `2px solid ${C.red}`,
            borderRadius: 16,
            padding: 36,
            opacity: fadeIn(frame, 60, 30),
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: C.red,
              fontWeight: 700,
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            ✕ 위험한 입력
          </div>
          {[
            "○○○ 회장님 따님 결혼…",
            "매출 Excel 원본 붙여넣기",
            "미공개 입점사·계약조건",
          ].map((t, i) => (
            <div
              key={i}
              style={{
                fontSize: 22,
                color: C.cream,
                lineHeight: 1.8,
                opacity: fadeIn(frame, 90 + i * 60, 20),
                marginBottom: 8,
              }}
            >
              · {t}
            </div>
          ))}
        </div>

        {/* 안전한 입력 */}
        <div
          style={{
            flex: 1,
            background: `${C.green}15`,
            border: `2px solid ${C.green}`,
            borderRadius: 16,
            padding: 36,
            opacity: fadeIn(frame, 240, 30),
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: C.green,
              fontWeight: 700,
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            ✓ 안전한 입력
          </div>
          {[
            "VIP-A 가족경조사 응대 매뉴얼…",
            '"1F 매출 -8% 가능한 원인"',
            "프리미엄 시계 카테고리 협상 포인트",
          ].map((t, i) => (
            <div
              key={i}
              style={{
                fontSize: 22,
                color: C.cream,
                lineHeight: 1.8,
                opacity: fadeIn(frame, 270 + i * 60, 20),
                marginBottom: 8,
              }}
            >
              · {t}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* 하단 메시지 */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 22,
          color: C.goldLight,
          opacity: fadeIn(frame, 600, 30),
          letterSpacing: 3,
        }}
      >
        원본 노트는 — 점장님 PC의 Obsidian Vault에만 저장됩니다
      </div>

      {sub1 && <Subtitle text="점장님 위치에서 보안은 양보할 수 없습니다" />}
      {sub2 && <Subtitle text="이니셜·코드명·익명화된 요약만 입력합니다" />}
      {sub3 && <Subtitle text="외부 SaaS와의 접점 최소화 — 가장 확실한 방어선" />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 8 — ROADMAP + EFFECTS (4:10~4:45)
// ============================================================
const Scene8Roadmap: React.FC = () => {
  const frame = useCurrentFrame();

  const phases = [
    { label: "1주", desc: "Daily Note 5분", at: 60 },
    { label: "1개월", desc: "리모델링 폴더 가동", at: 180 },
    { label: "3개월", desc: "VIP·벤치마킹 합류", at: 300 },
    { label: "6개월", desc: "검색 가능한 자산", at: 420 },
    { label: "1년", desc: "두 번째 뇌 완성", at: 540 },
  ];

  const effects = [
    ["회의록 정리", "30~60분", "5분"],
    ["임원 보고서", "2~3시간", "30분"],
    ["지난 결정 찾기", "수십 분", "30초"],
  ];

  const sub1 = frame >= 0 && frame < 350;
  const sub2 = frame >= 350 && frame < 700;
  const sub3 = frame >= 700;

  return (
    <AbsoluteFill style={{ background: C.navyDark }}>
      <LuxuryBackground />

      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 32,
          color: C.gold,
          fontWeight: 600,
          letterSpacing: 4,
          opacity: fadeIn(frame, 0, 30),
        }}
      >
        도입 로드맵 · 기대 효과
      </div>

      {/* 5단계 타임라인 */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {phases.map((p, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              textAlign: "center",
              opacity: fadeIn(frame, p.at, 30),
              transform: `translateY(${slideUp(frame, p.at, 30, 20)}px)`,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLight} 100%)`,
                color: C.navyDark,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 800,
                margin: "0 auto 14px",
                boxShadow: `0 6px 20px ${C.gold}60`,
              }}
            >
              {p.label}
            </div>
            <div style={{ fontSize: 18, color: C.cream, lineHeight: 1.4, padding: "0 8px" }}>
              {p.desc}
            </div>
            {i < phases.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: 35,
                  right: "-30%",
                  width: "60%",
                  height: 2,
                  background: `${C.gold}60`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* 기대 효과 표 */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 120,
          right: 120,
          background: "rgba(13, 28, 50, 0.85)",
          borderRadius: 16,
          border: `1px solid ${C.gold}40`,
          overflow: "hidden",
          opacity: fadeIn(frame, 600, 30),
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            background: `${C.gold}20`,
            padding: "16px 24px",
            fontSize: 22,
            color: C.goldLight,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          <div>영역</div>
          <div style={{ textAlign: "center" }}>Before</div>
          <div style={{ textAlign: "right" }}>After</div>
        </div>
        {effects.map((row, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "16px 24px",
              fontSize: 22,
              color: C.cream,
              borderTop: `1px solid ${C.gold}20`,
              opacity: fadeIn(frame, 660 + i * 60, 30),
            }}
          >
            <div>{row[0]}</div>
            <div
              style={{
                textAlign: "center",
                color: C.textMuted,
                textDecoration: "line-through",
              }}
            >
              {row[1]}
            </div>
            <div style={{ textAlign: "right", color: C.goldLight, fontWeight: 700 }}>
              {row[2]}
            </div>
          </div>
        ))}
      </div>

      {sub1 && <Subtitle text="첫 주는 데일리 노트 하나만. 6개월이면 자산이 됩니다" />}
      {sub2 && <Subtitle text="1년 후 — 점장님의 두 번째 뇌가 완성됩니다" />}
      {sub3 && <Subtitle text='"지난번 그 결정 어떻게 했더라" — 30초 검색으로' />}
    </AbsoluteFill>
  );
};

// ============================================================
// SCENE 9 — CLOSING (4:45~5:00)
// ============================================================
const Scene9Closing: React.FC = () => {
  const frame = useCurrentFrame();

  const lines = [
    { text: "도구는 거들 뿐.", at: 30 },
    { text: "결정은 점장님이 하십니다.", at: 120 },
    { text: "그 결정을 — 영원히 남기십시오.", at: 210 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${C.navy} 0%, ${C.navyDark} 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 골드 라인 */}
      <div
        style={{
          width: 200,
          height: 2,
          background: C.gold,
          marginBottom: 60,
          opacity: fadeIn(frame, 0, 30),
        }}
      />

      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            fontSize: i === 2 ? 56 : 48,
            color: i === 2 ? C.goldLight : C.white,
            fontWeight: i === 2 ? 700 : 500,
            marginBottom: 24,
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
          marginTop: 60,
          opacity: fadeIn(frame, 300, 30),
        }}
      />

      <div
        style={{
          marginTop: 40,
          fontSize: 22,
          color: C.textMuted,
          opacity: fadeIn(frame, 360, 40),
          letterSpacing: 4,
        }}
      >
        Claude + Obsidian — 점장님의 두 번째 뇌
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// MAIN COMPOSITION
// ============================================================
export const BaekhwajeomPitchVideo: React.FC = () => {
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
        <Scene4Scenario1 />
        <Audio src={staticFile(`${AUDIO_BASE}/scene4_scenario1.mp3`)} />
      </Sequence>

      <Sequence from={T.scene5.start} durationInFrames={T.scene5.dur}>
        <Scene5Scenario23 />
        <Audio src={staticFile(`${AUDIO_BASE}/scene5_scenario23.mp3`)} />
      </Sequence>

      <Sequence from={T.scene6.start} durationInFrames={T.scene6.dur}>
        <Scene6Scenarios />
        <Audio src={staticFile(`${AUDIO_BASE}/scene6_scenarios4to7.mp3`)} />
      </Sequence>

      <Sequence from={T.scene7.start} durationInFrames={T.scene7.dur}>
        <Scene7Security />
        <Audio src={staticFile(`${AUDIO_BASE}/scene7_security.mp3`)} />
      </Sequence>

      <Sequence from={T.scene8.start} durationInFrames={T.scene8.dur}>
        <Scene8Roadmap />
        <Audio src={staticFile(`${AUDIO_BASE}/scene8_roadmap.mp3`)} />
      </Sequence>

      <Sequence from={T.scene9.start} durationInFrames={T.scene9.dur}>
        <Scene9Closing />
        <Audio src={staticFile(`${AUDIO_BASE}/scene9_closing.mp3`)} />
      </Sequence>
    </AbsoluteFill>
  );
};
