/**
 * Lesson 5-3 썸네일: 풀링과 정규화
 */

import { AbsoluteFill } from "remotion";
import { colors } from "../../../styles";

export const Lesson53Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #059669 50%, #1e3a5f 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      {/* 레벨 표시 */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          backgroundColor: "#10b981",
          padding: "8px 20px",
          borderRadius: 8,
          fontSize: 24,
          color: colors.white,
          fontWeight: "bold",
        }}
      >
        Level 5-3
      </div>

      {/* 메인 제목 */}
      <h1
        style={{
          fontSize: 72,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        풀링과 정규화
      </h1>

      {/* 시각화 */}
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        {/* Max Pooling 시각화 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 35px)",
              gap: 3,
              backgroundColor: colors.gray[800],
              padding: 10,
              borderRadius: 12,
              border: "3px solid #3b82f6",
            }}
          >
            {[1, 3, 2, 1, 4, 2, 6, 4, 3, 1, 2, 3, 5, 2, 4, 1].map((v, i) => (
              <div
                key={i}
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: [0, 6, 12, 14].includes(i) ? "#22c55e" : colors.gray[700],
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                {v}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 16, color: "#3b82f6", marginTop: 8 }}>Pooling</div>
        </div>

        {/* 화살표 */}
        <span style={{ fontSize: 40, color: colors.white }}>→</span>

        {/* BatchNorm 시각화 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: colors.gray[800],
              padding: 15,
              borderRadius: 12,
              border: "3px solid #8b5cf6",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                {[0.2, 0.5, 0.8].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: `rgba(139, 92, 246, ${v})`,
                      borderRadius: 4,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 14, color: "#c4b5fd" }}>μ=0, σ=1</div>
            </div>
          </div>
          <div style={{ fontSize: 16, color: "#8b5cf6", marginTop: 8 }}>BatchNorm</div>
        </div>

        {/* 화살표 */}
        <span style={{ fontSize: 40, color: colors.white }}>→</span>

        {/* Dropout 시각화 */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 35px)",
              gap: 6,
              backgroundColor: colors.gray[800],
              padding: 12,
              borderRadius: 12,
              border: "3px solid #ef4444",
            }}
          >
            {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((active, i) => (
              <div
                key={i}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  backgroundColor: active ? "#22c55e" : colors.gray[600],
                  opacity: active ? 1 : 0.3,
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 16, color: "#ef4444", marginTop: 8 }}>Dropout</div>
        </div>
      </div>

      {/* 서브타이틀 */}
      <p
        style={{
          fontSize: 32,
          color: "#6ee7b7",
          marginTop: 30,
          fontWeight: "bold",
        }}
      >
        크기 축소 + 학습 안정화 + 과적합 방지
      </p>

      {/* 키워드 */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          display: "flex",
          gap: 15,
        }}
      >
        {["Max Pool", "Avg Pool", "GAP", "BatchNorm", "Dropout"].map((keyword) => (
          <div
            key={keyword}
            style={{
              backgroundColor: "#10b98122",
              padding: "8px 20px",
              borderRadius: 20,
              border: "2px solid #10b981",
              fontSize: 18,
              color: colors.white,
            }}
          >
            {keyword}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
