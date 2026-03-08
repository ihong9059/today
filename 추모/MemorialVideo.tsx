import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// 색상 팔레트
const colors = {
  dark: "#1a1a2e",
  darkBlue: "#16213e",
  accent: "#e8d5b7",
  white: "#ffffff",
  gray: "#a0a0a0",
};

// 시 텍스트
const poems = [
  {
    title: "같은 길을 걸었던 벗이여",
    lines: [
      "같은 시대를 살았고",
      "같은 하늘 아래 웃었던",
      "그대가 먼저 떠났네",
    ],
  },
  {
    title: "살아있는 오늘",
    lines: [
      "우리에게 주어진 오늘은",
      "어제의 누군가가",
      "간절히 원했던 내일",
    ],
  },
  {
    title: "동행",
    lines: [
      "먼저 간 이는",
      "우리 마음속에 살아",
      "함께 걷는 동행이 되네",
    ],
  },
  {
    title: "남겨진 우리에게",
    lines: [
      "숨 쉬는 것이 축복이고",
      "걸을 수 있는 것이 기적이며",
      "사랑하는 이와 함께함이 은총",
    ],
  },
];

// 페이드 텍스트 컴포넌트
const FadeText: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: string;
}> = ({ text, delay = 0, fontSize = 48, color = colors.white, fontWeight = "normal" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 30, 150, 180], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize,
        color,
        fontWeight,
        opacity,
        textAlign: "center",
        lineHeight: 1.8,
        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
      }}
    >
      {text}
    </div>
  );
};

// 시 장면 컴포넌트
const PoemScene: React.FC<{ poem: typeof poems[0]; sceneIndex: number }> = ({
  poem,
  sceneIndex,
}) => {
  const frame = useCurrentFrame();

  // 배경 페이드
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.dark,
        opacity: bgOpacity,
      }}
    >
      {/* 배경 그라데이션 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${colors.darkBlue} 0%, ${colors.dark} 100%)`,
        }}
      />

      {/* 부드러운 빛 효과 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(232,213,183,0.1) 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      {/* 제목 */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <FadeText
          text={poem.title}
          delay={0}
          fontSize={56}
          color={colors.accent}
          fontWeight="300"
        />
      </div>

      {/* 시 내용 */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {poem.lines.map((line, i) => (
          <FadeText
            key={i}
            text={line}
            delay={30 + i * 25}
            fontSize={42}
            color={colors.white}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 인트로 장면
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [30, 60, 150, 180], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${colors.darkBlue} 0%, ${colors.dark} 100%)`,
        }}
      />

      <div
        style={{
          opacity: titleOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            color: colors.accent,
            fontWeight: "300",
            letterSpacing: 10,
            marginBottom: 30,
          }}
        >
          추모
        </div>
        <div
          style={{
            fontSize: 32,
            color: colors.gray,
            fontWeight: "300",
          }}
        >
          In Loving Memory
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 아웃트로 장면
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.dark,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${colors.darkBlue} 0%, ${colors.dark} 100%)`,
        }}
      />

      <div
        style={{
          opacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 48,
            color: colors.accent,
            fontWeight: "300",
            marginBottom: 40,
            lineHeight: 1.6,
          }}
        >
          오늘 하루도 소중히
        </div>
        <div
          style={{
            fontSize: 28,
            color: colors.gray,
            fontWeight: "300",
          }}
        >
          2026년 3월 8일
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 메인 컴포넌트
export const MemorialVideo: React.FC = () => {
  const SCENE_DURATION = 210; // 7초 per scene

  return (
    <AbsoluteFill style={{ backgroundColor: colors.dark }}>
      {/* 인트로 */}
      <Sequence from={0} durationInFrames={SCENE_DURATION}>
        <IntroScene />
      </Sequence>

      {/* 시 장면들 */}
      {poems.map((poem, i) => (
        <Sequence
          key={i}
          from={SCENE_DURATION * (i + 1)}
          durationInFrames={SCENE_DURATION}
        >
          <PoemScene poem={poem} sceneIndex={i} />
        </Sequence>
      ))}

      {/* 아웃트로 */}
      <Sequence
        from={SCENE_DURATION * (poems.length + 1)}
        durationInFrames={SCENE_DURATION}
      >
        <OutroScene />
      </Sequence>

      {/* 배경 음악 - 음악 파일이 있으면 주석 해제 */}
      {/* <Audio src={staticFile("추모/audio/memorial_music.mp3")} volume={0.5} /> */}
    </AbsoluteFill>
  );
};

// 총 재생 시간: 인트로 + 4개 시 + 아웃트로 = 6장면 x 7초 = 42초
export const MEMORIAL_VIDEO_DURATION = 210 * 6; // 1260 frames = 42초
