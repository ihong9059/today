/**
 * Scene 6: HBM (High Bandwidth Memory)
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene6_HBM: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const problemAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const hbmAppear = spring({ frame: frame - 200, fps, config: { damping: 12 } });
  const specAppear = spring({ frame: frame - 350, fps, config: { damping: 12 } });

  // 데이터 흐름 애니메이션
  const dataFlow = (frame * 2) % 300;

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-5/scene6.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 50,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 55,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
        }}>
          🧮 HBM - 초고대역폭 메모리
        </h1>
      </div>

      {/* 메모리 병목 문제 */}
      <div style={{
        position: "absolute",
        top: 150,
        left: 80,
        opacity: problemAppear,
        transform: `translateY(${(1 - problemAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #ef4444",
          borderRadius: 20,
          padding: 30,
          width: 450,
        }}>
          <h2 style={{ color: "#fca5a5", fontSize: 28, margin: "0 0 15px 0" }}>
            ⚠️ 메모리 병목 현상
          </h2>

          {/* 비유 */}
          <div style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 10 }}>👨‍🍳 ➡️ 🚚 ➡️ 🥬</div>
            <div style={{ color: "#d1d5db", fontSize: 18, textAlign: "center" }}>
              "요리사(GPU)가 아무리 빨라도,<br />
              재료 배달(메모리)이 느리면 의미 없음"
            </div>
          </div>

          {/* 설명 */}
          <div style={{ color: "#d1d5db", fontSize: 18 }}>
            • GPU 연산 속도는 빠름<br />
            • 데이터 읽고 쓰는 속도가 못 따라감<br />
            • = <span style={{ color: "#fbbf24" }}>메모리 대역폭 문제</span>
          </div>
        </div>
      </div>

      {/* HBM 소개 */}
      <div style={{
        position: "absolute",
        top: 150,
        right: 80,
        opacity: hbmAppear,
        transform: `translateX(${(1 - hbmAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "3px solid #22c55e",
          borderRadius: 20,
          padding: 30,
          width: 450,
        }}>
          <h2 style={{ color: "#86efac", fontSize: 28, margin: "0 0 15px 0" }}>
            ✅ HBM (High Bandwidth Memory)
          </h2>

          {/* HBM 시각화 */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginBottom: 20,
          }}>
            {/* GPU 칩 */}
            <div style={{
              width: 100,
              height: 100,
              backgroundColor: "#22c55e",
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: colors.white,
            }}>
              GPU
            </div>

            {/* 데이터 흐름 */}
            <svg width={100} height={50}>
              {[0, 1, 2, 3].map((i) => (
                <rect
                  key={i}
                  x={10 + ((dataFlow + i * 25) % 100)}
                  y={10 + i * 8}
                  width={20}
                  height={6}
                  fill="#fbbf24"
                  rx={3}
                />
              ))}
            </svg>

            {/* HBM 스택 */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  width: 80,
                  height: 20,
                  backgroundColor: "#3b82f6",
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: colors.white,
                }}>
                  HBM{i}
                </div>
              ))}
            </div>
          </div>

          {/* 특징 */}
          <div style={{ color: "#d1d5db", fontSize: 18, lineHeight: 1.8 }}>
            • 초고대역폭 메모리 (3D 적층)<br />
            • GDDR 대비 <span style={{ color: "#fbbf24" }}>5~10배</span> 빠른 전송<br />
            • GPU와 직접 연결 → 병목 해결
          </div>
        </div>
      </div>

      {/* H100 스펙 */}
      <div style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: specAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "3px solid #a855f7",
          borderRadius: 20,
          padding: "25px 50px",
        }}>
          <h3 style={{ color: "#c4b5fd", fontSize: 26, margin: "0 0 20px 0", textAlign: "center" }}>
            🔥 NVIDIA H100 스펙
          </h3>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 50,
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#fbbf24", fontSize: 40, fontWeight: "bold" }}>3.35</div>
              <div style={{ color: "#d1d5db", fontSize: 18 }}>TB/s 대역폭</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#22c55e", fontSize: 40, fontWeight: "bold" }}>80</div>
              <div style={{ color: "#d1d5db", fontSize: 18 }}>GB HBM3</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#3b82f6", fontSize: 40, fontWeight: "bold" }}>16,896</div>
              <div style={{ color: "#d1d5db", fontSize: 18 }}>CUDA 코어</div>
            </div>
          </div>
          <div style={{
            color: "#fbbf24",
            fontSize: 20,
            textAlign: "center",
            marginTop: 20,
          }}>
            💡 초당 3.35 테라바이트 데이터 처리!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
