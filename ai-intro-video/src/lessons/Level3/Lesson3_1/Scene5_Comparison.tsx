/**
 * Scene 5: 손실 함수 비교
 * MSE vs Cross-Entropy 비교 및 선택 가이드
 */

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Audio, staticFile } from "remotion";
import { colors } from "../../../styles";

export const Scene5_Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // 테이블 애니메이션
  const tableHeaderOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const row1Opacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: "clamp" });
  const row2Opacity = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: "clamp" });
  const row3Opacity = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: "clamp" });

  // 중요 포인트
  const warningOpacity = interpolate(frame, [350, 380], [0, 1], { extrapolateRight: "clamp" });

  // PyTorch 코드
  const codeOpacity = interpolate(frame, [480, 510], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gray[900],
        padding: 60,
      }}
    >
      <Audio src={staticFile("audio/lesson-3-1/scene5.mp3")} />

      {/* 제목 */}
      <h1
        style={{
          fontSize: 64,
          color: colors.white,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        손실 함수 비교
      </h1>

      {/* 비교 테이블 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <table
          style={{
            borderCollapse: "collapse",
            fontSize: 26,
          }}
        >
          {/* 헤더 */}
          <thead>
            <tr style={{ opacity: tableHeaderOpacity }}>
              <th
                style={{
                  backgroundColor: colors.gray[700],
                  color: colors.white,
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                문제 유형
              </th>
              <th
                style={{
                  backgroundColor: colors.gray[700],
                  color: colors.white,
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                손실 함수
              </th>
              <th
                style={{
                  backgroundColor: colors.gray[700],
                  color: colors.white,
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                출력층 활성화
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 회귀 */}
            <tr style={{ opacity: row1Opacity }}>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: "#60a5fa",
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                  fontWeight: "bold",
                }}
              >
                📊 회귀
              </td>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: colors.white,
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                MSE
              </td>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: colors.gray[400],
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                없음 (Linear)
              </td>
            </tr>
            {/* 이진 분류 */}
            <tr style={{ opacity: row2Opacity }}>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: "#a855f7",
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                  fontWeight: "bold",
                }}
              >
                🎯 이진 분류
              </td>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: colors.white,
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                Binary CE
              </td>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: colors.white,
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                Sigmoid
              </td>
            </tr>
            {/* 다중 분류 */}
            <tr style={{ opacity: row3Opacity }}>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: "#22c55e",
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                  fontWeight: "bold",
                }}
              >
                🏷️ 다중 분류
              </td>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: colors.white,
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                Categorical CE
              </td>
              <td
                style={{
                  backgroundColor: colors.gray[800],
                  color: colors.white,
                  padding: "20px 40px",
                  border: `1px solid ${colors.gray[600]}`,
                }}
              >
                Softmax
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 중요 경고 */}
      <div
        style={{
          backgroundColor: "#fbbf2420",
          border: "2px solid #fbbf24",
          padding: "20px 40px",
          borderRadius: 16,
          marginBottom: 30,
          opacity: warningOpacity,
        }}
      >
        <div style={{ color: "#fbbf24", fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
          ⚠️ 중요!
        </div>
        <div style={{ color: colors.gray[300], fontSize: 24 }}>
          손실 함수는 문제 유형에 맞게 선택해야 합니다!<br />
          • 회귀에 CE → 학습 안 됨<br />
          • 분류에 MSE → 수렴 느림
        </div>
      </div>

      {/* PyTorch 코드 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: codeOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "25px 35px",
            borderRadius: 12,
            border: "1px solid #334155",
          }}
        >
          <div style={{ color: "#60a5fa", fontSize: 20, marginBottom: 12 }}>회귀:</div>
          <code style={{ color: "#22c55e", fontSize: 22, fontFamily: "monospace" }}>
            nn.MSELoss()
          </code>
        </div>
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "25px 35px",
            borderRadius: 12,
            border: "1px solid #334155",
          }}
        >
          <div style={{ color: "#a855f7", fontSize: 20, marginBottom: 12 }}>분류:</div>
          <code style={{ color: "#22c55e", fontSize: 22, fontFamily: "monospace" }}>
            nn.CrossEntropyLoss()
          </code>
        </div>
      </div>
    </AbsoluteFill>
  );
};
