import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
  staticFile,
  Sequence,
  Easing,
} from "remotion";
import React from "react";

// 뉴스 데이터
const newsData = [
  {
    title: "2026 한국 경제 전망",
    subtitle: "KDI 경제성장률 1.8% 전망",
    icon: "📊",
    color: "#3B82F6",
  },
  {
    title: "수출 강세 지속",
    subtitle: "1월 수출 33.9% 증가",
    icon: "📈",
    color: "#10B981",
  },
  {
    title: "삼성 HBM4 양산 성공",
    subtitle: "세계 최초 AI 반도체 양산",
    icon: "🔬",
    color: "#8B5CF6",
  },
  {
    title: "물가 안정세",
    subtitle: "소비자물가 2.0% 전망",
    icon: "💰",
    color: "#F59E0B",
  },
  {
    title: "리스크 요인",
    subtitle: "미국 관세 인상 영향",
    icon: "⚠️",
    color: "#EF4444",
  },
];

// 애니메이션 배경 그라데이션
const AnimatedBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const hue1 = interpolate(frame, [0, 900], [220, 280], {
    extrapolateRight: "clamp",
  });
  const hue2 = interpolate(frame, [0, 900], [200, 260], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg,
          hsl(${hue1}, 80%, 8%) 0%,
          hsl(${hue2}, 70%, 12%) 50%,
          hsl(${hue1 + 20}, 75%, 10%) 100%)`,
      }}
    />
  );
};

// 파티클 효과
const Particles: React.FC<{ frame: number }> = ({ frame }) => {
  const particles = Array.from({ length: 30 }, (_, i) => {
    const x = (i * 67 + frame * (0.2 + i * 0.02)) % 1920;
    const y = (i * 43 + frame * (0.3 + i * 0.01)) % 1080;
    const size = 2 + (i % 4);
    const opacity = 0.1 + (i % 5) * 0.05;

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
          backgroundColor: `rgba(100, 180, 255, ${opacity})`,
          filter: "blur(1px)",
        }}
      />
    );
  });

  return <>{particles}</>;
};

// 뉴스 카드 컴포넌트
const NewsCard: React.FC<{
  data: typeof newsData[0];
  index: number;
  frame: number;
  fps: number;
}> = ({ data, index, frame, fps }) => {
  const delay = index * 15;
  const localFrame = Math.max(0, frame - delay);

  const slideIn = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const glowIntensity = interpolate(
    Math.sin(frame * 0.05 + index),
    [-1, 1],
    [0.3, 0.8]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 100 + index * 340,
        top: 400,
        width: 300,
        padding: 24,
        borderRadius: 20,
        background: `linear-gradient(145deg,
          rgba(255,255,255,0.1) 0%,
          rgba(255,255,255,0.05) 100%)`,
        backdropFilter: "blur(10px)",
        border: `1px solid rgba(255,255,255,0.2)`,
        boxShadow: `0 0 ${20 * glowIntensity}px ${data.color}40,
                    0 20px 40px rgba(0,0,0,0.3)`,
        transform: `translateY(${(1 - slideIn) * 100}px)`,
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 48,
          marginBottom: 12,
        }}
      >
        {data.icon}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: 8,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        {data.title}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.7)",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        {data.subtitle}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${data.color}, transparent)`,
          borderRadius: "0 0 20px 20px",
        }}
      />
    </div>
  );
};

// 데이터 차트 애니메이션
const AnimatedChart: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const chartData = [1.8, 33.9, 2.0, 1.3];
  const labels = ["GDP 성장률", "수출 증가", "물가 상승", "수출 둔화"];
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div
      style={{
        position: "absolute",
        right: 80,
        top: 150,
        width: 400,
        height: 200,
        display: "flex",
        alignItems: "flex-end",
        gap: 20,
      }}
    >
      {chartData.map((value, i) => {
        const delay = 200 + i * 10;
        const localFrame = Math.max(0, frame - delay);
        const height = spring({
          frame: localFrame,
          fps,
          config: { damping: 12, stiffness: 80 },
        });

        return (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.9)",
                marginBottom: 8,
                fontWeight: 600,
              }}
            >
              {value}%
            </div>
            <div
              style={{
                width: "100%",
                height: height * value * 4,
                background: `linear-gradient(180deg, ${colors[i]}, ${colors[i]}80)`,
                borderRadius: 8,
                boxShadow: `0 0 20px ${colors[i]}50`,
              }}
            />
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              {labels[i]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 타이틀 애니메이션
const AnimatedTitle: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 100,
        transform: `translateY(${(1 - titleSpring) * -50}px)`,
      }}
    >
      <div
        style={{
          fontSize: 18,
          color: "#60A5FA",
          fontWeight: 500,
          letterSpacing: 4,
          marginBottom: 12,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        ECONOMIC NEWS
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: "#FFFFFF",
          lineHeight: 1.2,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        2026 한국 경제
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        최신 동향
      </div>
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 20,
          color: "rgba(255,255,255,0.6)",
          marginTop: 16,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        2026년 2월 | KDI · 한국은행 · 산업연구원
      </div>
    </div>
  );
};

// 하단 티커
const BottomTicker: React.FC<{ frame: number }> = ({ frame }) => {
  const tickerText =
    "📊 KDI 경제성장률 1.8% 전망 | 📈 1월 수출 33.9% 증가 | 🔬 삼성 HBM4 세계 최초 양산 | 💰 물가 상승률 2.0% | ⚠️ 미국 관세 영향 주시 ";
  const scrollX = -frame * 2;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "linear-gradient(90deg, #1E3A8A, #3B82F6)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          fontSize: 18,
          color: "#FFFFFF",
          fontWeight: 500,
          transform: `translateX(${scrollX}px)`,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        {tickerText.repeat(5)}
      </div>
    </div>
  );
};

// 메인 컴포지션
export const EconomyNews: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 아웃트로 페이드
  const outroOpacity = interpolate(
    frame,
    [durationInFrames - 60, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: outroOpacity }}>
      <AnimatedBackground frame={frame} />
      <Particles frame={frame} />

      <AnimatedTitle frame={frame} fps={fps} />
      <AnimatedChart frame={frame} fps={fps} />

      {/* 뉴스 카드들 - 순차적으로 등장 */}
      <Sequence from={60}>
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            data={news}
            index={index}
            frame={frame - 60}
            fps={fps}
          />
        ))}
      </Sequence>

      <BottomTicker frame={frame} />

      {/* 나레이션 오디오 */}
      <Audio src={staticFile("narration.mp3")} volume={1} />

      {/* 로고/워터마크 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: 14,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        ECONOMIC REPORT 2026
      </div>
    </AbsoluteFill>
  );
};
