/**
 * Scene 8: 딥러닝으로의 연결
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene8_DeepLearning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #0f766e 30%, #134e4a 70%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-1-7/scene8_deep_learning.mp3")} />

      {/* 제목 */}
      <h2
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        다층 퍼셉트론 → 딥러닝
      </h2>

      {/* 층 시각화 */}
      <div
        style={{
          display: "flex",
          gap: 30,
          alignItems: "center",
          marginBottom: 50,
          opacity: interpolate(frame, [30, 70], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {/* 2층 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ color: "#3b82f6", fontSize: 20, marginBottom: 10 }}>2층</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#3b82f6" }} />
            <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#3b82f6" }} />
          </div>
          <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#22c55e", marginTop: 10 }} />
        </div>

        <div style={{ fontSize: 32, color: colors.gray[500] }}>→</div>

        {/* 3층 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ color: "#a855f7", fontSize: 20, marginBottom: 10 }}>3층</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ width: 25, height: 25, borderRadius: "50%", backgroundColor: "#3b82f6" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: 25, height: 25, borderRadius: "50%", backgroundColor: "#a855f7" }} />
            ))}
          </div>
          <div style={{ width: 25, height: 25, borderRadius: "50%", backgroundColor: "#22c55e", marginTop: 8 }} />
        </div>

        <div style={{ fontSize: 32, color: colors.gray[500] }}>→</div>

        {/* 깊은 네트워크 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: interpolate(frame, [100, 140], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ color: "#f59e0b", fontSize: 20, marginBottom: 10 }}>깊은 네트워크</div>
          {[0, 1, 2, 3, 4].map((layer) => (
            <div key={layer} style={{ display: "flex", gap: 5, marginTop: layer > 0 ? 5 : 0 }}>
              {Array(5 - Math.abs(layer - 2))
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: layer === 0 ? "#3b82f6" : layer === 4 ? "#22c55e" : "#a855f7",
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* 응용 분야 */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginBottom: 40,
          opacity: interpolate(frame, [160, 200], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {[
          { icon: "🖼️", label: "이미지 인식" },
          { icon: "🎤", label: "음성 인식" },
          { icon: "💬", label: "자연어 처리" },
          { icon: "🤖", label: "AI 에이전트" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 30px",
              borderRadius: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              transform: `translateY(${interpolate(frame, [160 + i * 20, 200 + i * 20], [30, 0], { extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div style={{ fontSize: 48 }}>{item.icon}</div>
            <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 역사 */}
      <div
        style={{
          backgroundColor: colors.gray[800],
          padding: "25px 50px",
          borderRadius: 15,
          borderLeft: "5px solid #f59e0b",
          opacity: interpolate(frame, [260, 300], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ color: "#f59e0b", fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>1986년</div>
        <div style={{ color: colors.white, fontSize: 24 }}>
          역전파 알고리즘 발표 → 다층 퍼셉트론 학습 가능!
        </div>
        <div style={{ color: "#22c55e", fontSize: 22, marginTop: 10 }}>
          AI의 두 번째 전성기 시작
        </div>
      </div>
    </AbsoluteFill>
  );
};
