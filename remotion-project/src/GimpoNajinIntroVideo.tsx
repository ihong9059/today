import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
  staticFile,
  Sequence,
} from "remotion";
import React from "react";

// ──────────────────────────────────────────────────────────────
// 김포나진초 5·6학년 AI 바이브코딩 4주 소개 — Remotion 컴포지션
// ──────────────────────────────────────────────────────────────
// 시나리오: aiHardStudy/초등학교강의/video/scripts/00_시나리오.md
// 나레이션 mp3: public/audio/gimpo-najin/scene{1-6}.mp3 (ko-KR-SunHiNeural)
//
// Scene 길이 (실측 mp3 + 1초 buffer):
//   1) 인사    41.95s → 43s (1290 frames)
//   2) Week 1  39.84s → 41s (1230 frames)
//   3) Week 2  42.96s → 44s (1320 frames)
//   4) Week 3  43.10s → 45s (1350 frames)
//   5) Week 4  41.16s → 43s (1290 frames)
//   6) 마무리  42.77s → 44s (1320 frames)
// Total = 7800 frames = 260s = 4분 20초

const SCENE_DURATIONS = [1290, 1230, 1320, 1350, 1290, 1320] as const;
export const GIMPO_NAJIN_DURATION = SCENE_DURATIONS.reduce((a, b) => a + b, 0); // 7800

const COLORS = {
  yellow: "#FFD43B",
  sky: "#74C0FC",
  red: "#FF6B6B",
  purple: "#B197FC",
  textMain: "#212529",
  textSub: "#495057",
};

const WEEK_THEMES = [
  // Scene 1 (인사)
  { bg: "linear-gradient(135deg, #FFF9DB 0%, #E7F5FF 100%)", accent: COLORS.yellow },
  // Scene 2 (Week 1 — 따뜻한 노랑)
  { bg: "linear-gradient(135deg, #FFF3BF 0%, #FFE066 100%)", accent: COLORS.yellow },
  // Scene 3 (Week 2 — 청록)
  { bg: "linear-gradient(135deg, #C3FAE8 0%, #66D9E8 100%)", accent: COLORS.sky },
  // Scene 4 (Week 3 — 보라 마법)
  { bg: "linear-gradient(135deg, #E5DBFF 0%, #B197FC 100%)", accent: COLORS.purple },
  // Scene 5 (Week 4 — 무지개)
  {
    bg: "linear-gradient(135deg, #FFD8A8 0%, #FFADAD 33%, #B5E48C 66%, #74C0FC 100%)",
    accent: COLORS.red,
  },
  // Scene 6 (마무리 — 석양)
  { bg: "linear-gradient(135deg, #FFD8A8 0%, #FFB4A2 50%, #FFADAD 100%)", accent: COLORS.red },
];

// ──────────────────────────────────────────────────────────────
// 파티클: 작은 별 흩날림
// ──────────────────────────────────────────────────────────────
const StarParticles: React.FC<{ frame: number; count?: number }> = ({ frame, count = 30 }) => {
  const stars = Array.from({ length: count }, (_, i) => {
    const startX = (i * 137) % 1920;
    const speed = 0.4 + (i % 5) * 0.2;
    const wobble = Math.sin(frame * 0.02 + i) * 25;
    const y = ((frame * speed + i * 47) % 1300) - 100;
    const x = startX + wobble;
    const rotation = frame * (0.5 + (i % 3) * 0.3);
    const opacity = 0.5 + (i % 4) * 0.12;
    const size = 14 + (i % 3) * 8;
    const isStar = i % 2 === 0;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          fontSize: size,
          transform: `rotate(${rotation}deg)`,
          opacity,
          pointerEvents: "none",
        }}
      >
        {isStar ? "✨" : "⭐"}
      </div>
    );
  });
  return <>{stars}</>;
};

// ──────────────────────────────────────────────────────────────
// 공통 푸터: 학교명 + scene 번호
// ──────────────────────────────────────────────────────────────
const SceneFooter: React.FC<{ sceneNum: number }> = ({ sceneNum }) => (
  <>
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: 50,
        fontSize: 20,
        color: COLORS.textSub,
        opacity: 0.6,
        fontWeight: 500,
      }}
    >
      {sceneNum}/6
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 50,
        fontSize: 20,
        color: COLORS.textSub,
        opacity: 0.6,
        fontWeight: 500,
      }}
    >
      김포나진초등학교
    </div>
  </>
);

// ──────────────────────────────────────────────────────────────
// 공통 헤더: Week N + 부제 (Scene 2~5)
// ──────────────────────────────────────────────────────────────
const WeekHeader: React.FC<{
  week: number;
  subtitle: string;
  accent: string;
  fps: number;
  frame: number;
}> = ({ week, subtitle, accent, fps, frame }) => {
  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const subSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 100 } });
  return (
    <div style={{ position: "absolute", top: 80, left: 0, right: 0, textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          padding: "20px 60px",
          background: `${accent}33`,
          border: `4px solid ${accent}`,
          borderRadius: 80,
          transform: `scale(${titleSpring})`,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.textMain, lineHeight: 1 }}>
          Week {week}
        </div>
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.textMain,
          opacity: subSpring,
          transform: `translateY(${(1 - subSpring) * 30}px)`,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// 활동 카드 (Scene 2~4 공통)
// ──────────────────────────────────────────────────────────────
type ActivityCard = { emoji: string; title: string; sub?: string };

const ActivityCards: React.FC<{
  cards: ActivityCard[];
  startFrame: number;
  fps: number;
  frame: number;
  accent: string;
}> = ({ cards, startFrame, fps, frame, accent }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 380,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 32,
        padding: "0 80px",
        flexWrap: "wrap",
      }}
    >
      {cards.map((card, i) => {
        const localFrame = frame - startFrame - i * 30;
        const cardSpring = spring({ frame: localFrame, fps, config: { damping: 14, stiffness: 90 } });
        const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              width: 360,
              padding: "44px 32px",
              background: "white",
              borderRadius: 32,
              boxShadow: `0 20px 50px ${accent}55`,
              border: `4px solid ${accent}`,
              textAlign: "center",
              opacity,
              transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 40}px)`,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            <div style={{ fontSize: 100, marginBottom: 16, lineHeight: 1 }}>{card.emoji}</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.textMain, lineHeight: 1.2 }}>
              {card.title}
            </div>
            {card.sub && (
              <div style={{ fontSize: 24, color: COLORS.textSub, marginTop: 12, lineHeight: 1.3 }}>
                {card.sub}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ──────────────────────────────────────────────────────────────
// Scene 1 — 환영 인사 (1290 frames = 43s)
// ──────────────────────────────────────────────────────────────
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = WEEK_THEMES[0];

  const schoolNameSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const greetSpring = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 100 } });
  const waveAngle = Math.sin(frame * 0.15) * 15;

  // 말풍선 1: 4~9초 (120~270 frames)
  const bubble1Op = interpolate(frame, [120, 150, 270, 300], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // 말풍선 2: 9~14초 (270~420 frames)
  const bubble2Op = interpolate(frame, [270, 300, 420, 450], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // 비밀 공개: 15~25초 (450~750 frames)
  const secretOp = interpolate(frame, [450, 500, 1100, 1150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const secretScale = spring({
    frame: Math.max(0, frame - 450),
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  // 4주 함께해요 메시지: 25초~ (750~)
  const finalOp = interpolate(frame, [1100, 1150, 1290], [0, 1, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: "Pretendard, sans-serif" }}>
      <StarParticles frame={frame} count={35} />

      {/* 상단 학교 이름 */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 48,
          fontWeight: 600,
          color: COLORS.textSub,
          opacity: schoolNameSpring,
          transform: `translateY(${(1 - schoolNameSpring) * -40}px)`,
        }}
      >
        김포나진초등학교
      </div>

      {/* 중앙 인사 */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: greetSpring,
          transform: `translateY(${(1 - greetSpring) * 40}px)`,
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800, color: COLORS.textMain, lineHeight: 1.2 }}>
          5·6학년 친구들,
        </div>
        <div style={{ fontSize: 120, fontWeight: 900, color: COLORS.red, lineHeight: 1.1, marginTop: 16 }}>
          안녕!{" "}
          <span style={{ display: "inline-block", transform: `rotate(${waveAngle}deg)` }}>👋</span>
        </div>
        <div style={{ fontSize: 44, fontWeight: 500, color: COLORS.textSub, marginTop: 32 }}>
          AI 바이브코딩 4주 여행
        </div>
      </div>

      {/* 말풍선 1 — 신호등 */}
      <div
        style={{
          position: "absolute",
          top: 720,
          left: 200,
          padding: "28px 48px",
          background: "white",
          borderRadius: 40,
          fontSize: 40,
          fontWeight: 600,
          color: COLORS.textMain,
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          border: `4px solid ${COLORS.sky}`,
          opacity: bubble1Op,
        }}
      >
        🚦 신호등은 누가 바꿀까요?
      </div>

      {/* 말풍선 2 — 에어컨 */}
      <div
        style={{
          position: "absolute",
          top: 720,
          right: 180,
          padding: "28px 48px",
          background: "white",
          borderRadius: 40,
          fontSize: 40,
          fontWeight: 600,
          color: COLORS.textMain,
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          border: `4px solid ${COLORS.yellow}`,
          opacity: bubble2Op,
        }}
      >
        ❄️ 에어컨은 어떻게 알아서 꺼질까요?
      </div>

      {/* 비밀: 작은 컴퓨터 */}
      <div
        style={{
          position: "absolute",
          top: 660,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: secretOp,
          transform: `scale(${0.6 + secretScale * 0.4})`,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: COLORS.textMain }}>비밀은 바로...</div>
        <div style={{ fontSize: 200, lineHeight: 1.1, marginTop: 16 }}>🧠</div>
        <div style={{ fontSize: 64, fontWeight: 800, color: COLORS.red }}>작은 컴퓨터!</div>
      </div>

      {/* 마지막 메시지 */}
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.textMain,
          opacity: finalOp,
        }}
      >
        4주 동안 함께해요! 🎉
      </div>

      {/* 강사 카드 (우측 하단, 항상 노출) */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          right: 80,
          padding: "16px 28px",
          background: "white",
          borderRadius: 24,
          fontSize: 24,
          color: COLORS.textMain,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          fontWeight: 600,
        }}
      >
        👨‍🏫 홍광선 선생님 · ㈜유티텍
      </div>

      <SceneFooter sceneNum={1} />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────────
// Scene 2 — Week 1 빛과 소리 (1230 frames = 41s)
// ──────────────────────────────────────────────────────────────
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = WEEK_THEMES[1];
  const cards: ActivityCard[] = [
    { emoji: "💡", title: "빨간 LED 켜기", sub: "스마트폰 앱으로 한 번에" },
    { emoji: "✨", title: "깜빡깜빡", sub: "보드 위의 작은 마법" },
    { emoji: "🚦", title: "진짜 신호등", sub: "빨강 3초 · 노랑 1초 · 파랑 3초" },
    { emoji: "🎵", title: "작은별 연주", sub: "보드가 피아노가 돼요!" },
  ];

  // 마지막 5초 별 폭죽
  const finaleOp = interpolate(frame, [1080, 1150, 1230], [0, 1, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: "Pretendard, sans-serif" }}>
      <StarParticles frame={frame} count={28} />
      <WeekHeader week={1} subtitle="빛과 소리" accent={theme.accent} fps={fps} frame={frame} />
      <ActivityCards cards={cards.slice(0, 2)} startFrame={120} fps={fps} frame={frame} accent={theme.accent} />
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          padding: "0 80px",
        }}
      >
        {cards.slice(2).map((card, i) => {
          const localFrame = frame - 360 - i * 30;
          const cardSpring = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, stiffness: 90 },
          });
          const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                width: 360,
                padding: "32px 28px",
                background: "white",
                borderRadius: 32,
                boxShadow: `0 16px 40px ${theme.accent}55`,
                border: `4px solid ${theme.accent}`,
                textAlign: "center",
                opacity,
                transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 30}px)`,
              }}
            >
              <div style={{ fontSize: 88, lineHeight: 1, marginBottom: 12 }}>{card.emoji}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.textMain, lineHeight: 1.2 }}>
                {card.title}
              </div>
              {card.sub && (
                <div style={{ fontSize: 22, color: COLORS.textSub, marginTop: 8 }}>{card.sub}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* 마지막: 벌써 이만큼! */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 56,
          fontWeight: 800,
          color: COLORS.red,
          opacity: finaleOp,
        }}
      >
        벌써 이만큼! 🎆
      </div>

      <SceneFooter sceneNum={2} />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────────
// Scene 3 — Week 2 합체와 감각 (1320 frames = 44s)
// ──────────────────────────────────────────────────────────────
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = WEEK_THEMES[2];
  const cards: ActivityCard[] = [
    { emoji: "🎵💡", title: "LED 도레미", sub: "빨강=도 · 노랑=레 · 파랑=미" },
    { emoji: "📺", title: "OLED에 Hello!", sub: "작은 컴퓨터 화면" },
    { emoji: "🌡️", title: "온도 표시", sub: "지금 몇 도일까?" },
    { emoji: "🔥", title: "손으로 잡으면", sub: "파랑 → 노랑 → 빨강" },
  ];

  // OLED 타이핑 효과 (Scene 후반)
  const typedChars = Math.min(11, Math.floor(Math.max(0, frame - 800) / 8));
  const oledText = "온도: 25.3°C".slice(0, typedChars);
  const oledOp = interpolate(frame, [780, 820, 1280, 1320], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: "Pretendard, sans-serif" }}>
      <StarParticles frame={frame} count={25} />
      <WeekHeader week={2} subtitle="합체와 감각" accent={theme.accent} fps={fps} frame={frame} />
      <ActivityCards cards={cards.slice(0, 2)} startFrame={120} fps={fps} frame={frame} accent={theme.accent} />

      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          padding: "0 80px",
        }}
      >
        {cards.slice(2).map((card, i) => {
          const localFrame = frame - 360 - i * 30;
          const cardSpring = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, stiffness: 90 },
          });
          const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                width: 360,
                padding: "32px 28px",
                background: "white",
                borderRadius: 32,
                boxShadow: `0 16px 40px ${theme.accent}55`,
                border: `4px solid ${theme.accent}`,
                textAlign: "center",
                opacity,
                transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 30}px)`,
              }}
            >
              <div style={{ fontSize: 88, lineHeight: 1, marginBottom: 12 }}>{card.emoji}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.textMain, lineHeight: 1.2 }}>
                {card.title}
              </div>
              {card.sub && (
                <div style={{ fontSize: 22, color: COLORS.textSub, marginTop: 8 }}>{card.sub}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* OLED mockup */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 540,
          padding: "24px 36px",
          background: "#000",
          color: "#69DB7C",
          borderRadius: 16,
          fontFamily: "Consolas, monospace",
          fontSize: 56,
          fontWeight: 700,
          textAlign: "center",
          opacity: oledOp,
          boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
          border: "8px solid #495057",
        }}
      >
        {oledText}
        <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>_</span>
      </div>

      <SceneFooter sceneNum={3} />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────────
// Scene 4 — Week 3 버튼과 자동화 (1350 frames = 45s)
// ──────────────────────────────────────────────────────────────
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = WEEK_THEMES[3];
  const cards: ActivityCard[] = [
    { emoji: "🔘", title: "버튼 누르면 LED", sub: "내 손으로 직접!" },
    { emoji: "🔄", title: "ON / OFF 토글", sub: "전등 스위치처럼" },
    { emoji: "🌡️🔔", title: "자동 경보기", sub: "28도 넘으면 부저 울려라" },
    { emoji: "⏱️", title: "라면 타이머", sub: "3분 카운트다운 + 멜로디" },
  ];

  // 마법 주문 빈칸 채우기 (700~1050 frame)
  const spell1Op = interpolate(frame, [700, 760], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spell2Op = interpolate(frame, [820, 880], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const spellBoxOp = interpolate(frame, [620, 700, 1280, 1340], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 라면 타이머 카운트다운 (1050~1280 frame)
  const timerActive = frame >= 1050 && frame <= 1280;
  const timerRemaining = timerActive
    ? Math.max(0, 180 - Math.floor((frame - 1050) * 0.78))
    : 180;
  const timerMin = Math.floor(timerRemaining / 60);
  const timerSec = timerRemaining % 60;
  const timerStr = `${String(timerMin).padStart(2, "0")}:${String(timerSec).padStart(2, "0")}`;
  const timerOp = interpolate(frame, [1050, 1080, 1280], [0, 1, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: "Pretendard, sans-serif" }}>
      <StarParticles frame={frame} count={32} />
      <WeekHeader week={3} subtitle="버튼과 자동화" accent={theme.accent} fps={fps} frame={frame} />
      <ActivityCards cards={cards.slice(0, 2)} startFrame={120} fps={fps} frame={frame} accent={theme.accent} />
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          padding: "0 80px",
        }}
      >
        {cards.slice(2).map((card, i) => {
          const localFrame = frame - 360 - i * 30;
          const cardSpring = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, stiffness: 90 },
          });
          const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                width: 360,
                padding: "32px 28px",
                background: "white",
                borderRadius: 32,
                boxShadow: `0 16px 40px ${theme.accent}55`,
                border: `4px solid ${theme.accent}`,
                textAlign: "center",
                opacity,
                transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 30}px)`,
              }}
            >
              <div style={{ fontSize: 88, lineHeight: 1, marginBottom: 12 }}>{card.emoji}</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.textMain, lineHeight: 1.2 }}>
                {card.title}
              </div>
              {card.sub && (
                <div style={{ fontSize: 22, color: COLORS.textSub, marginTop: 8 }}>{card.sub}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* 마법 주문 박스 (중앙 하단) */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "32px 60px",
          background: "white",
          border: `6px solid ${COLORS.purple}`,
          borderRadius: 32,
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.textMain,
          boxShadow: `0 16px 50px ${COLORS.purple}88`,
          opacity: spellBoxOp,
          minWidth: 1000,
          textAlign: "center",
        }}
      >
        🎩 만약{" "}
        <span style={{ color: COLORS.purple, opacity: spell1Op }}>
          버튼이 눌리면
        </span>{" "}
        →{" "}
        <span style={{ color: COLORS.red, opacity: spell2Op }}>
          LED를 켜라!
        </span>{" "}
        ✨
      </div>

      {/* 라면 타이머 (시퀀스 마지막) */}
      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: "50%",
          transform: "translateX(-50%)",
          width: 540,
          padding: "32px 48px",
          background: "#000",
          color: timerRemaining === 0 ? COLORS.red : "#69DB7C",
          borderRadius: 24,
          fontFamily: "Consolas, monospace",
          fontSize: 96,
          fontWeight: 800,
          textAlign: "center",
          opacity: timerOp,
          boxShadow: "0 16px 50px rgba(0,0,0,0.3)",
          border: "8px solid #495057",
        }}
      >
        ⏱️ {timerStr}
        {timerRemaining === 0 && <div style={{ fontSize: 36, marginTop: 12 }}>띠리리리~ 🎵</div>}
      </div>

      <SceneFooter sceneNum={4} />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────────
// Scene 5 — Week 4 나만의 작품 (1290 frames = 43s)
// ──────────────────────────────────────────────────────────────
const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = WEEK_THEMES[4];

  const works: ActivityCard[] = [
    { emoji: "🎮", title: "반응속도 게임" },
    { emoji: "🎲", title: "주사위 게임" },
    { emoji: "⏱️", title: "라면 타이머" },
    { emoji: "🌡️", title: "디지털 온도계" },
    { emoji: "📡", title: "모스부호 SOS" },
    { emoji: "🐣", title: "디지털 애완동물" },
  ];

  // 6 카드 grid (450~)
  const cardsStart = 450;

  // 발표 일러스트 (Scene 후반)
  const presentOp = interpolate(frame, [1050, 1130, 1290], [0, 1, 1], {
    extrapolateLeft: "clamp",
  });
  const wave = Math.sin(frame * 0.2) * 8;

  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: "Pretendard, sans-serif" }}>
      <StarParticles frame={frame} count={40} />
      <WeekHeader week={4} subtitle="나만의 작품" accent={theme.accent} fps={fps} frame={frame} />

      {/* 큰 글자 */}
      <div
        style={{
          position: "absolute",
          top: 350,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.red,
          opacity: interpolate(frame, [200, 280], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        🎨 155개 예제 중 마음대로!
      </div>

      {/* 6 작품 grid */}
      <div
        style={{
          position: "absolute",
          top: 460,
          left: 0,
          right: 0,
          display: "grid",
          gridTemplateColumns: "repeat(3, 280px)",
          justifyContent: "center",
          gap: 24,
          padding: "0 80px",
        }}
      >
        {works.map((w, i) => {
          const localFrame = frame - cardsStart - i * 20;
          const flip = interpolate(localFrame, [0, 30], [180, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const op = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                padding: "28px 20px",
                background: "white",
                borderRadius: 24,
                border: `4px solid ${theme.accent}`,
                boxShadow: `0 12px 30px ${theme.accent}55`,
                textAlign: "center",
                opacity: op,
                transform: `rotateY(${flip}deg)`,
              }}
            >
              <div style={{ fontSize: 72, lineHeight: 1 }}>{w.emoji}</div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 26,
                  fontWeight: 700,
                  color: COLORS.textMain,
                  lineHeight: 1.2,
                }}
              >
                {w.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* 발표하는 학생 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: presentOp,
        }}
      >
        <div style={{ fontSize: 80, transform: `rotate(${wave}deg)` }}>🎤👏👏👏</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.textMain, marginTop: 8 }}>
          여러분이 작은 발명가!
        </div>
      </div>

      <SceneFooter sceneNum={5} />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────────
// Scene 6 — 마무리 (1320 frames = 44s)
// ──────────────────────────────────────────────────────────────
const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = WEEK_THEMES[5];

  const summary = [
    { week: 1, emoji: "💡🎵", title: "빛과 소리", color: COLORS.yellow },
    { week: 2, emoji: "📺🌡️", title: "합체와 감각", color: COLORS.sky },
    { week: 3, emoji: "🔘⏱️", title: "버튼과 자동화", color: COLORS.purple },
    { week: 4, emoji: "🎨🎤", title: "나만의 작품", color: COLORS.red },
  ];

  const headSpring = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });

  // 메이커 메시지 (800~)
  const makerOp = interpolate(frame, [780, 880, 1180, 1280], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const makerScale = spring({
    frame: Math.max(0, frame - 780),
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  // 마지막 인사 (1180~)
  const finalOp = interpolate(frame, [1180, 1240, 1320], [0, 1, 1], { extrapolateLeft: "clamp" });
  const wave = Math.sin(frame * 0.18) * 12;

  return (
    <AbsoluteFill style={{ background: theme.bg, fontFamily: "Pretendard, sans-serif" }}>
      <StarParticles frame={frame} count={45} />

      {/* 상단 인사 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headSpring,
          transform: `translateY(${(1 - headSpring) * -30}px)`,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 600, color: COLORS.textSub }}>김포나진초등학교</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.textMain, marginTop: 12 }}>
          곧 만나요! 🎉
        </div>
      </div>

      {/* 4주 요약 카드 */}
      <div
        style={{
          position: "absolute",
          top: 310,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          padding: "0 60px",
        }}
      >
        {summary.map((s, i) => {
          const localFrame = frame - 60 - i * 40;
          const cardSpring = spring({
            frame: localFrame,
            fps,
            config: { damping: 13, stiffness: 95 },
          });
          const op = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                width: 380,
                padding: "32px 20px",
                background: "white",
                borderRadius: 28,
                boxShadow: `0 14px 36px ${s.color}55`,
                border: `4px solid ${s.color}`,
                textAlign: "center",
                opacity: op,
                transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 30}px)`,
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>Week {s.week}</div>
              <div style={{ fontSize: 70, lineHeight: 1, marginTop: 8 }}>{s.emoji}</div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 32,
                  fontWeight: 700,
                  color: COLORS.textMain,
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* 메이커 메시지 */}
      <div
        style={{
          position: "absolute",
          top: 720,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: makerOp,
          transform: `scale(${0.6 + makerScale * 0.4})`,
        }}
      >
        <div style={{ fontSize: 100, fontWeight: 900, color: COLORS.red, lineHeight: 1.15 }}>
          여러분은 AI 시대의
        </div>
        <div style={{ fontSize: 140, fontWeight: 900, color: COLORS.red, lineHeight: 1.1 }}>
          메이커! 🎆
        </div>
      </div>

      {/* 마지막 손 흔들기 */}
      <div
        style={{
          position: "absolute",
          top: 740,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: finalOp,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: COLORS.textMain }}>
          5·6학년 친구들, 안녕!
        </div>
        <div
          style={{
            fontSize: 180,
            marginTop: 16,
            display: "inline-block",
            transform: `rotate(${wave}deg)`,
          }}
        >
          👋
        </div>
      </div>

      <SceneFooter sceneNum={6} />
    </AbsoluteFill>
  );
};

// ──────────────────────────────────────────────────────────────
// 메인 컴포지션
// ──────────────────────────────────────────────────────────────
export const GimpoNajinIntroVideo: React.FC = () => {
  const sceneComponents = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];
  let offset = 0;
  const sequences = sceneComponents.map((SceneComp, i) => {
    const dur = SCENE_DURATIONS[i];
    const from = offset;
    offset += dur;
    return (
      <Sequence key={i} from={from} durationInFrames={dur}>
        <SceneComp />
        <Audio src={staticFile(`audio/gimpo-najin/scene${i + 1}.mp3`)} />
      </Sequence>
    );
  });

  return <AbsoluteFill>{sequences}</AbsoluteFill>;
};
