import { AbsoluteFill, Audio, useCurrentFrame, interpolate, spring, useVideoConfig, staticFile } from "remotion";

export const Scene5_AIApplications: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // 분류 문제 섹션
  const classificationOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

  // 이미지 예시
  const imageOpacity = interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" });
  const catProb = interpolate(frame, [100, 180], [0, 90], { extrapolateRight: "clamp" });
  const dogProb = interpolate(frame, [100, 180], [0, 10], { extrapolateRight: "clamp" });

  // NLP 섹션
  const nlpOpacity = interpolate(frame, [280, 300], [0, 1], { extrapolateRight: "clamp" });

  // 소프트맥스
  const softmaxOpacity = interpolate(frame, [400, 420], [0, 1], { extrapolateRight: "clamp" });
  const softmaxScale = spring({ frame: frame - 400, fps, from: 0.8, to: 1, durationInFrames: 30 });

  // 확률 바 애니메이션
  const barAnimation = Math.min(1, (frame - 100) / 80);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0a1e" }}>
      <Audio src={staticFile("audio/lesson-2-6/scene5.mp3")} />

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 70% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* 타이틀 */}
      <div
        style={{
          position: "absolute",
          top: "4%",
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <h2 style={{ fontSize: 52, color: "#a855f7", margin: 0 }}>AI에서의 확률 활용</h2>
      </div>

      {/* 분류 문제 섹션 */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: "5%",
          right: "5%",
          opacity: classificationOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 40,
          }}
        >
          {/* 이미지 분류 예시 */}
          <div
            style={{
              flex: 1,
              background: "rgba(168, 85, 247, 0.1)",
              borderRadius: 20,
              padding: 25,
              opacity: imageOpacity,
            }}
          >
            <h3 style={{ fontSize: 28, color: "#e879f9", margin: 0, marginBottom: 20 }}>
              🖼️ 이미지 분류
            </h3>

            <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
              {/* 이미지 */}
              <div
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #fbbf24, #f97316)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 80 }}>🐱</span>
              </div>

              {/* 확률 바 */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 15 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ color: "white", fontSize: 22 }}>고양이 🐱</span>
                    <span style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold" }}>
                      {Math.round(catProb)}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 30,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${catProb * barAnimation}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #22c55e, #16a34a)",
                        borderRadius: 15,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ color: "white", fontSize: 22 }}>개 🐕</span>
                    <span style={{ color: "#ef4444", fontSize: 22, fontWeight: "bold" }}>
                      {Math.round(dogProb)}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 30,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${dogProb * barAnimation}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #ef4444, #dc2626)",
                        borderRadius: 15,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NLP 예시 */}
          <div
            style={{
              flex: 1,
              background: "rgba(59, 130, 246, 0.1)",
              borderRadius: 20,
              padding: 25,
              opacity: nlpOpacity,
            }}
          >
            <h3 style={{ fontSize: 28, color: "#60a5fa", margin: 0, marginBottom: 20 }}>
              💬 자연어 처리
            </h3>

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 22, color: "white", margin: 0 }}>
                "오늘 날씨가 정말 <span style={{ color: "#fbbf24", borderBottom: "2px solid #fbbf24" }}>___</span>"
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { word: "좋아요", prob: 45, color: "#22c55e" },
                { word: "덥네요", prob: 30, color: "#3b82f6" },
                { word: "춥네요", prob: 20, color: "#8b5cf6" },
                { word: "이상해요", prob: 5, color: "#94a3b8" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                    opacity: interpolate(
                      frame,
                      [300 + i * 30, 320 + i * 30],
                      [0, 1],
                      { extrapolateRight: "clamp" }
                    ),
                  }}
                >
                  <span style={{ fontSize: 20, color: "white", width: 100 }}>{item.word}</span>
                  <div
                    style={{
                      flex: 1,
                      height: 20,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.prob}%`,
                        height: "100%",
                        background: item.color,
                        borderRadius: 10,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 18, color: item.color, width: 50 }}>{item.prob}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 소프트맥스 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: "50%",
          transform: `translateX(-50%) scale(${softmaxScale})`,
          opacity: softmaxOpacity,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(59, 130, 246, 0.2))",
            border: "2px solid #a855f7",
            borderRadius: 20,
            padding: "25px 50px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 36, color: "white" }}>σ</span>
            </div>
            <div>
              <p style={{ fontSize: 28, color: "white", margin: 0 }}>
                <span style={{ color: "#fbbf24" }}>소프트맥스(Softmax)</span> 함수
              </p>
              <p style={{ fontSize: 22, color: "#94a3b8", marginTop: 10 }}>
                모든 클래스의 확률 합 = <span style={{ color: "#22c55e", fontWeight: "bold" }}>1</span>
              </p>
            </div>
          </div>

          {/* 확률 합 시각화 */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", height: 30, borderRadius: 15, overflow: "hidden", flex: 1 }}>
              <div style={{ width: "45%", background: "#22c55e" }} />
              <div style={{ width: "30%", background: "#3b82f6" }} />
              <div style={{ width: "20%", background: "#8b5cf6" }} />
              <div style={{ width: "5%", background: "#94a3b8" }} />
            </div>
            <span style={{ fontSize: 24, color: "#22c55e", fontWeight: "bold" }}>= 100%</span>
          </div>
        </div>
      </div>

      {/* 레슨 번호 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          fontSize: 24,
          color: "#a855f7",
          opacity: 0.7,
        }}
      >
        Lesson 2-6
      </div>
    </AbsoluteFill>
  );
};
