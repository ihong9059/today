/**
 * Scene 4: 크로스 엔트로피
 * 분류 문제의 손실 함수
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene4_CrossEntropy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 분류 문제 설명
  const classificationOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  // 예시 애니메이션
  const catImageOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" });
  const predictionOpacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });
  const goodResultOpacity = interpolate(frame, [330, 360], [0, 1], { extrapolateRight: "clamp" });
  const badResultOpacity = interpolate(frame, [450, 480], [0, 1], { extrapolateRight: "clamp" });

  // 공식
  const formulaOpacity = interpolate(frame, [580, 610], [0, 1], { extrapolateRight: "clamp" });
  const formulaExplainOpacity = interpolate(frame, [680, 710], [0, 1], { extrapolateRight: "clamp" });

  const catScale = spring({ frame: frame - 150, fps, from: 0, to: 1, durationInFrames: 30 });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-1/scene4.mp3")} />

      {/* 제목 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginBottom: 30,
          opacity: titleOpacity,
        }}
      >
        <h1
          style={{
            fontSize: 60,
            color: colors.white,
            fontWeight: "bold",
          }}
        >
          Cross-Entropy
        </h1>
        <span style={{ color: colors.gray[400], fontSize: 32 }}>
          교차 엔트로피
        </span>
      </div>

      {/* 분류 문제 설명 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
          opacity: classificationOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#a855f720",
            border: "2px solid #a855f7",
            padding: "12px 30px",
            borderRadius: 10,
          }}
        >
          <span style={{ color: "#a855f7", fontSize: 28 }}>
            🎯 분류 문제: "이것은 고양이인가, 강아지인가?"
          </span>
        </div>
      </div>

      {/* 예시 섹션 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 60,
        }}
      >
        {/* 고양이 이미지 */}
        <div
          style={{
            textAlign: "center",
            opacity: catImageOpacity,
            transform: `scale(${Math.max(0, catScale)})`,
          }}
        >
          <div style={{ fontSize: 100 }}>🐱</div>
          <div style={{ color: colors.gray[400], fontSize: 20, marginTop: 10 }}>
            입력: 고양이 이미지
          </div>
        </div>

        {/* 화살표 */}
        <div
          style={{
            fontSize: 60,
            color: colors.gray[500],
            marginTop: 30,
            opacity: predictionOpacity,
          }}
        >
          →
        </div>

        {/* 예측 결과들 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {/* 좋은 예측 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 30px",
              borderRadius: 16,
              border: "2px solid #22c55e",
              opacity: goodResultOpacity,
            }}
          >
            <div style={{ color: "#22c55e", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              좋은 예측 ✓
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <span style={{ color: colors.gray[400] }}>고양이: </span>
                <span style={{ color: "#22c55e", fontWeight: "bold" }}>90%</span>
              </div>
              <div>
                <span style={{ color: colors.gray[400] }}>강아지: </span>
                <span style={{ color: colors.gray[500] }}>10%</span>
              </div>
            </div>
            <div style={{ color: "#22c55e", fontSize: 18, marginTop: 10 }}>
              → 손실 작음
            </div>
          </div>

          {/* 나쁜 예측 */}
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: "20px 30px",
              borderRadius: 16,
              border: "2px solid #f87171",
              opacity: badResultOpacity,
            }}
          >
            <div style={{ color: "#f87171", fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
              나쁜 예측 ✗
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <span style={{ color: colors.gray[400] }}>고양이: </span>
                <span style={{ color: "#f87171", fontWeight: "bold" }}>30%</span>
              </div>
              <div>
                <span style={{ color: colors.gray[400] }}>강아지: </span>
                <span style={{ color: colors.gray[500] }}>70%</span>
              </div>
            </div>
            <div style={{ color: "#f87171", fontSize: 18, marginTop: 10 }}>
              → 손실 큼
            </div>
          </div>
        </div>
      </div>

      {/* 공식 */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 60,
          right: 60,
          opacity: formulaOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gray[800],
            padding: "30px 50px",
            borderRadius: 16,
            border: "2px solid #a855f7",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, color: colors.white, fontFamily: "serif" }}>
            CE = -Σ <span style={{ color: "#22c55e" }}>y</span> · log(<span style={{ color: "#a855f7" }}>p</span>)
          </div>
        </div>
      </div>

      {/* 공식 설명 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
          opacity: formulaExplainOpacity,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#22c55e", fontSize: 28, fontWeight: "bold" }}>y</div>
          <div style={{ color: colors.gray[400], fontSize: 18 }}>정답 레이블</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#a855f7", fontSize: 28, fontWeight: "bold" }}>p</div>
          <div style={{ color: colors.gray[400], fontSize: 18 }}>예측 확률</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold" }}>log</div>
          <div style={{ color: colors.gray[400], fontSize: 18 }}>p→1이면 0, p→0이면 ∞</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
