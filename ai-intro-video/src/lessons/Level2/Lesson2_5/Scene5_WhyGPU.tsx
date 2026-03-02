/**
 * Scene 5: AI는 왜 GPU를 사용할까?
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene5_WhyGPU: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const cpuAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const gpuAppear = spring({ frame: frame - 180, fps, config: { damping: 12 } });
  const comparisonAppear = spring({ frame: frame - 350, fps, config: { damping: 12 } });

  // CPU 순차 처리 애니메이션
  const cpuProgress = interpolate(frame, [100, 200], [0, 100], { extrapolateRight: "clamp" });

  // GPU 병렬 처리 애니메이션
  const gpuProgress = interpolate(frame, [220, 270], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-5/scene5.mp3")} />

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
          🎮 AI는 왜 GPU를 사용할까?
        </h1>
      </div>

      {/* CPU vs GPU 비교 */}
      <div style={{
        position: "absolute",
        top: 150,
        left: 80,
        display: "flex",
        gap: 60,
      }}>
        {/* CPU */}
        <div style={{
          opacity: cpuAppear,
          transform: `translateY(${(1 - cpuAppear) * 30}px)`,
        }}>
          <div style={{
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            border: "3px solid #3b82f6",
            borderRadius: 20,
            padding: 30,
            width: 380,
          }}>
            <h2 style={{ color: "#93c5fd", fontSize: 32, margin: "0 0 15px 0", textAlign: "center" }}>
              CPU
            </h2>
            <div style={{ color: "#d1d5db", fontSize: 20, textAlign: "center", marginBottom: 20 }}>
              복잡한 작업을 <span style={{ color: "#fbbf24" }}>순차적</span>으로 처리
            </div>

            {/* CPU 코어 시각화 */}
            <div style={{ display: "flex", gap: 15, justifyContent: "center", marginBottom: 20 }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: "#3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: colors.white,
                  fontWeight: "bold",
                }}>
                  코어{i}
                </div>
              ))}
            </div>
            <div style={{ color: "#9ca3af", fontSize: 16, textAlign: "center" }}>4~16개 코어</div>

            {/* 순차 처리 프로그레스 */}
            <div style={{
              marginTop: 25,
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 10,
              height: 30,
              overflow: "hidden",
            }}>
              <div style={{
                width: `${cpuProgress}%`,
                height: "100%",
                backgroundColor: "#3b82f6",
                borderRadius: 10,
                transition: "width 0.1s",
              }} />
            </div>
            <div style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", marginTop: 5 }}>
              순차 처리: 한 번에 하나씩
            </div>
          </div>
        </div>

        {/* GPU */}
        <div style={{
          opacity: gpuAppear,
          transform: `translateY(${(1 - gpuAppear) * 30}px)`,
        }}>
          <div style={{
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            border: "3px solid #22c55e",
            borderRadius: 20,
            padding: 30,
            width: 380,
          }}>
            <h2 style={{ color: "#86efac", fontSize: 32, margin: "0 0 15px 0", textAlign: "center" }}>
              GPU
            </h2>
            <div style={{ color: "#d1d5db", fontSize: 20, textAlign: "center", marginBottom: 20 }}>
              단순한 작업을 <span style={{ color: "#fbbf24" }}>대량 병렬</span>로 처리
            </div>

            {/* GPU 코어 시각화 (많은 작은 코어) */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginBottom: 10 }}>
              {Array.from({ length: 64 }, (_, i) => (
                <div key={i} style={{
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  backgroundColor: gpuProgress > (i / 64) * 100 ? "#22c55e" : "#374151",
                }} />
              ))}
            </div>
            <div style={{ color: "#9ca3af", fontSize: 16, textAlign: "center" }}>수만 개 코어</div>

            {/* 병렬 처리 프로그레스 */}
            <div style={{
              marginTop: 25,
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 10,
              height: 30,
              overflow: "hidden",
            }}>
              <div style={{
                width: `${gpuProgress}%`,
                height: "100%",
                backgroundColor: "#22c55e",
                borderRadius: 10,
                transition: "width 0.1s",
              }} />
            </div>
            <div style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", marginTop: 5 }}>
              병렬 처리: 수천 개 동시에!
            </div>
          </div>
        </div>
      </div>

      {/* 행렬 연산 비교 */}
      <div style={{
        position: "absolute",
        bottom: 100,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: comparisonAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          border: "3px solid #fbbf24",
          borderRadius: 20,
          padding: "25px 50px",
          textAlign: "center",
        }}>
          <h3 style={{ color: "#fde047", fontSize: 28, margin: "0 0 20px 0" }}>
            💡 100×100 행렬 곱셈 = 백만 번의 연산
          </h3>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
            fontSize: 22,
          }}>
            <div>
              <div style={{ color: "#3b82f6", fontWeight: "bold", fontSize: 26 }}>CPU</div>
              <div style={{ color: "#d1d5db" }}>순차 처리 → 느림</div>
            </div>
            <div style={{ color: "#a855f7", fontSize: 40 }}>vs</div>
            <div>
              <div style={{ color: "#22c55e", fontWeight: "bold", fontSize: 26 }}>GPU</div>
              <div style={{ color: "#d1d5db" }}>병렬 처리 → 수십~수백 배 빠름!</div>
            </div>
          </div>
        </div>
      </div>

      {/* 속도 비교 시각화 */}
      <div style={{
        position: "absolute",
        top: 180,
        right: 80,
        opacity: interpolate(frame, [400, 430], [0, 1], { extrapolateRight: "clamp" }),
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "2px solid #a855f7",
          borderRadius: 15,
          padding: "20px 30px",
        }}>
          <div style={{ color: "#c4b5fd", fontSize: 20, marginBottom: 15 }}>속도 비교</div>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={{ color: "#3b82f6", width: 50 }}>CPU</div>
            <div style={{ width: 80, height: 20, backgroundColor: "#3b82f6", borderRadius: 5 }} />
            <span style={{ color: "#9ca3af" }}>1x</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 15, marginTop: 10 }}>
            <div style={{ color: "#22c55e", width: 50 }}>GPU</div>
            <div style={{ width: 250, height: 20, backgroundColor: "#22c55e", borderRadius: 5 }} />
            <span style={{ color: "#fbbf24", fontWeight: "bold" }}>50~100x</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
