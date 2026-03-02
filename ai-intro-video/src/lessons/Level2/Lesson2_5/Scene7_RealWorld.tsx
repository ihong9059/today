/**
 * Scene 7: 실제 AI 모델에서의 활용
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene7_RealWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const gptAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const memoryAppear = spring({ frame: frame - 180, fps, config: { damping: 12 } });
  const companyAppear = spring({ frame: frame - 350, fps, config: { damping: 12 } });

  // 파라미터 카운터 애니메이션
  const paramCount = interpolate(frame, [80, 180], [0, 175], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-5/scene7.mp3")} />

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
          🌐 실제 AI 모델의 규모
        </h1>
      </div>

      {/* GPT-3 스펙 */}
      <div style={{
        position: "absolute",
        top: 150,
        left: 100,
        opacity: gptAppear,
        transform: `translateY(${(1 - gptAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          border: "3px solid #3b82f6",
          borderRadius: 20,
          padding: 30,
          width: 480,
        }}>
          <h2 style={{ color: "#93c5fd", fontSize: 32, margin: "0 0 20px 0" }}>
            🤖 GPT-3 모델
          </h2>

          {/* 파라미터 카운터 */}
          <div style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: 20,
          }}>
            <span style={{
              fontSize: 70,
              fontWeight: "bold",
              color: "#fbbf24",
              fontFamily: "monospace",
            }}>
              {Math.floor(paramCount)}0
            </span>
            <span style={{ color: "#d1d5db", fontSize: 30 }}>억 개 파라미터</span>
          </div>

          <div style={{ color: "#d1d5db", fontSize: 20, lineHeight: 1.8 }}>
            • 대부분 <span style={{ color: "#22c55e" }}>가중치 행렬</span>에 저장<br />
            • 모델 로드에 <span style={{ color: "#fbbf24" }}>수백 GB</span> 메모리 필요<br />
            • 학습 시 기울기 저장 → 더 많은 메모리
          </div>
        </div>
      </div>

      {/* 메모리 요구사항 */}
      <div style={{
        position: "absolute",
        top: 150,
        right: 100,
        opacity: memoryAppear,
        transform: `translateX(${(1 - memoryAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          border: "3px solid #ef4444",
          borderRadius: 20,
          padding: 30,
          width: 480,
        }}>
          <h2 style={{ color: "#fca5a5", fontSize: 32, margin: "0 0 20px 0" }}>
            💾 메모리 요구사항
          </h2>

          {/* 메모리 바 */}
          <div style={{ marginBottom: 25 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ color: "#d1d5db" }}>추론 (Inference)</span>
              <span style={{ color: "#fbbf24" }}>~350 GB</span>
            </div>
            <div style={{
              width: "100%",
              height: 25,
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 10,
              overflow: "hidden",
            }}>
              <div style={{
                width: "50%",
                height: "100%",
                backgroundColor: "#f97316",
                borderRadius: 10,
              }} />
            </div>
          </div>

          <div style={{ marginBottom: 25 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ color: "#d1d5db" }}>학습 (Training)</span>
              <span style={{ color: "#ef4444" }}>~700+ GB</span>
            </div>
            <div style={{
              width: "100%",
              height: 25,
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 10,
              overflow: "hidden",
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ef4444",
                borderRadius: 10,
              }} />
            </div>
          </div>

          <div style={{
            color: "#fbbf24",
            fontSize: 22,
            textAlign: "center",
            padding: "15px 20px",
            backgroundColor: "rgba(251, 191, 36, 0.2)",
            borderRadius: 10,
          }}>
            → HBM 80GB+ GPU가 필수!
          </div>
        </div>
      </div>

      {/* 반도체 회사들 */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: companyAppear,
      }}>
        <div style={{
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          border: "3px solid #a855f7",
          borderRadius: 20,
          padding: "25px 50px",
          textAlign: "center",
        }}>
          <h3 style={{ color: "#c4b5fd", fontSize: 26, margin: "0 0 20px 0" }}>
            🏭 HBM 시장 주도 기업
          </h3>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 60,
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                marginBottom: 10,
              }}>🇰🇷</div>
              <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>삼성전자</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                marginBottom: 10,
              }}>🇰🇷</div>
              <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>SK하이닉스</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                marginBottom: 10,
              }}>🇺🇸</div>
              <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>마이크론</div>
            </div>
          </div>
          <div style={{ color: "#fde047", fontSize: 20, marginTop: 20 }}>
            AI 시대, HBM은 반도체 산업의 핵심!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
