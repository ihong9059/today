/**
 * Scene 7: 활성화 함수 설명
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene7_Activation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const stepReveal = interpolate(frame, [60, 100], [0, 1], { extrapolateRight: "clamp" });
  const sigmoidReveal = interpolate(frame, [240, 280], [0, 1], { extrapolateRight: "clamp" });
  const reluReveal = interpolate(frame, [400, 440], [0, 1], { extrapolateRight: "clamp" });

  // 계단 함수 애니메이션
  const stepX = interpolate(frame, [100, 200], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1e3a5f 50%, ${colors.gray[900]} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 타이틀 */}
      <div
        style={{
          opacity: titleOpacity,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>⚡</span>
        <div>
          <h2
            style={{
              fontSize: 64,
              color: "#22c55e",
              fontWeight: "bold",
            }}
          >
            구성요소 4: 활성화 함수
          </h2>
          <p
            style={{
              fontSize: 30,
              color: colors.gray[400],
            }}
          >
            최종 판단을 내리는 함수
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
        {/* 계단 함수 */}
        <div
          style={{
            opacity: stepReveal,
            backgroundColor: "#3b82f615",
            border: "2px solid #3b82f6",
            borderRadius: 20,
            padding: 25,
            width: 360,
          }}
        >
          <h3
            style={{
              fontSize: 30,
              color: "#3b82f6",
              fontWeight: "bold",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            🔌 계단 함수 (Step)
          </h3>

          {/* 그래프 */}
          <div
            style={{
              width: "100%",
              height: 150,
              backgroundColor: colors.gray[800],
              borderRadius: 10,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 축 */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: 2,
                height: "100%",
                backgroundColor: colors.gray[600],
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "100%",
                height: 2,
                backgroundColor: colors.gray[600],
              }}
            />
            {/* 계단 함수 그래프 */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "50%",
                height: 3,
                backgroundColor: "#3b82f6",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 20,
                width: "50%",
                height: 3,
                backgroundColor: "#3b82f6",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 20,
                width: 3,
                height: "calc(50% - 20px)",
                backgroundColor: "#3b82f6",
              }}
            />
          </div>

          <div style={{ marginTop: 15, fontSize: 22, color: colors.gray[300], textAlign: "center" }}>
            z &gt; 0 → 1 (ON)
            <br />
            z ≤ 0 → 0 (OFF)
          </div>
          <p style={{ marginTop: 10, fontSize: 18, color: colors.gray[500], textAlign: "center" }}>
            전기 스위치처럼 켜짐/꺼짐
          </p>
        </div>

        {/* 시그모이드 */}
        <div
          style={{
            opacity: sigmoidReveal,
            backgroundColor: "#f9731615",
            border: "2px solid #f97316",
            borderRadius: 20,
            padding: 25,
            width: 360,
          }}
        >
          <h3
            style={{
              fontSize: 30,
              color: "#f97316",
              fontWeight: "bold",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            📈 시그모이드 (Sigmoid)
          </h3>

          {/* 그래프 */}
          <div
            style={{
              width: "100%",
              height: 150,
              backgroundColor: colors.gray[800],
              borderRadius: 10,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 축 */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: 2,
                height: "100%",
                backgroundColor: colors.gray[600],
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "100%",
                height: 2,
                backgroundColor: colors.gray[600],
              }}
            />
            {/* S자 곡선 (근사) */}
            <svg width="100%" height="100%" style={{ position: "absolute" }}>
              <path
                d="M 10 130 Q 80 130 160 75 Q 240 20 310 20"
                stroke="#f97316"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>

          <div style={{ marginTop: 15, fontSize: 22, color: colors.gray[300], textAlign: "center" }}>
            출력: 0 ~ 1 (부드러운 변화)
          </div>
          <p style={{ marginTop: 10, fontSize: 18, color: colors.gray[500], textAlign: "center" }}>
            0.7 = 70% 확신
          </p>
        </div>

        {/* ReLU */}
        <div
          style={{
            opacity: reluReveal,
            backgroundColor: "#22c55e15",
            border: "2px solid #22c55e",
            borderRadius: 20,
            padding: 25,
            width: 360,
          }}
        >
          <h3
            style={{
              fontSize: 30,
              color: "#22c55e",
              fontWeight: "bold",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            ⚡ ReLU
          </h3>

          {/* 그래프 */}
          <div
            style={{
              width: "100%",
              height: 150,
              backgroundColor: colors.gray[800],
              borderRadius: 10,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 축 */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                width: 2,
                height: "100%",
                backgroundColor: colors.gray[600],
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "100%",
                height: 2,
                backgroundColor: colors.gray[600],
              }}
            />
            {/* ReLU 그래프 */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "50%",
                height: 3,
                backgroundColor: "#22c55e",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 150,
                height: 3,
                backgroundColor: "#22c55e",
                transform: "rotate(-45deg)",
                transformOrigin: "left center",
              }}
            />
          </div>

          <div style={{ marginTop: 15, fontSize: 22, color: colors.gray[300], textAlign: "center" }}>
            z &lt; 0 → 0
            <br />
            z ≥ 0 → z (그대로)
          </div>
          <p style={{ marginTop: 10, fontSize: 18, color: colors.gray[500], textAlign: "center" }}>
            현대 딥러닝에서 가장 인기!
          </p>
        </div>
      </div>

      {/* 하단 메시지 */}
      {frame > 500 && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            backgroundColor: "#22c55e20",
            border: "2px solid #22c55e",
            borderRadius: 15,
            padding: "15px 40px",
            opacity: interpolate(frame, [500, 540], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ fontSize: 28, color: "#22c55e", fontWeight: "bold" }}>
            활성화 함수는 상황에 따라 선택합니다!
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
