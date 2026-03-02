/**
 * Scene 2: 벡터란 무엇인가?
 */

import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { colors } from "../../../styles";

export const Scene2_Vector: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const vectorAppear = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const exampleAppear = spring({ frame: frame - 150, fps, config: { damping: 12 } });
  const wordAppear = spring({ frame: frame - 300, fps, config: { damping: 12 } });

  // 벡터 요소 애니메이션
  const element1 = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const element2 = interpolate(frame, [75, 105], [0, 1], { extrapolateRight: "clamp" });
  const element3 = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)` }}>
      <Audio src={staticFile("audio/lesson-2-5/scene2.mp3")} />

      {/* 타이틀 */}
      <div style={{
        position: "absolute",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        opacity: titleOpacity,
      }}>
        <h1 style={{
          fontSize: 60,
          color: colors.white,
          fontWeight: "bold",
          margin: 0,
        }}>
          📊 벡터란 무엇인가?
        </h1>
      </div>

      {/* 벡터 정의 */}
      <div style={{
        position: "absolute",
        top: 180,
        left: 100,
        opacity: vectorAppear,
        transform: `translateY(${(1 - vectorAppear) * 30}px)`,
      }}>
        <div style={{
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          border: "3px solid #3b82f6",
          borderRadius: 20,
          padding: "30px 40px",
          maxWidth: 800,
        }}>
          <h2 style={{ color: "#93c5fd", fontSize: 32, margin: "0 0 20px 0" }}>
            벡터 = 숫자들의 순서가 있는 목록
          </h2>

          {/* 벡터 시각화 */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 50,
            fontFamily: "monospace",
            color: colors.white,
          }}>
            <span>[</span>
            <span style={{
              opacity: element1,
              transform: `scale(${element1})`,
              color: "#60a5fa",
            }}>1</span>
            <span>,</span>
            <span style={{
              opacity: element2,
              transform: `scale(${element2})`,
              color: "#34d399",
            }}>2</span>
            <span>,</span>
            <span style={{
              opacity: element3,
              transform: `scale(${element3})`,
              color: "#fbbf24",
            }}>3</span>
            <span>]</span>
            <span style={{ color: "#94a3b8", fontSize: 30, marginLeft: 20 }}>
              ← 3차원 벡터
            </span>
          </div>
        </div>
      </div>

      {/* AI에서의 활용 */}
      <div style={{
        position: "absolute",
        top: 420,
        left: 100,
        opacity: exampleAppear,
        transform: `translateY(${(1 - exampleAppear) * 30}px)`,
      }}>
        <h3 style={{ color: "#a855f7", fontSize: 36, margin: "0 0 25px 0" }}>
          AI에서 벡터의 활용
        </h3>

        <div style={{ display: "flex", gap: 30 }}>
          {[
            { icon: "🖼️", title: "이미지 픽셀", desc: "RGB 값들", color: "#ef4444" },
            { icon: "📝", title: "단어 임베딩", desc: "의미를 숫자로", color: "#22c55e" },
            { icon: "🧠", title: "뉴런 출력", desc: "활성화 값", color: "#3b82f6" },
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: `${item.color}20`,
              border: `2px solid ${item.color}`,
              borderRadius: 15,
              padding: "20px 30px",
              textAlign: "center",
              width: 200,
              opacity: interpolate(frame, [180 + i * 30, 210 + i * 30], [0, 1], { extrapolateRight: "clamp" }),
            }}>
              <div style={{ fontSize: 50, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ color: colors.white, fontSize: 22, fontWeight: "bold" }}>{item.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 18 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 단어 임베딩 예시 */}
      <div style={{
        position: "absolute",
        top: 200,
        right: 80,
        opacity: wordAppear,
        transform: `translateX(${(1 - wordAppear) * 30}px)`,
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        border: "2px solid #22c55e",
        borderRadius: 20,
        padding: "25px 35px",
        maxWidth: 500,
      }}>
        <h3 style={{ color: "#86efac", fontSize: 28, margin: "0 0 15px 0" }}>
          예: "왕" 단어 임베딩
        </h3>
        <div style={{
          fontFamily: "monospace",
          color: "#d1d5db",
          fontSize: 18,
          lineHeight: 1.8,
        }}>
          <div>[0.23, -0.45, 0.87, 0.12, ...]</div>
          <div style={{ color: "#9ca3af", marginTop: 10 }}>
            → 300개의 숫자 = 300차원 벡터
          </div>
          <div style={{ color: "#fbbf24", marginTop: 15, fontSize: 20 }}>
            컴퓨터가 단어의 의미를 계산 가능!
          </div>
        </div>
      </div>

      {/* 3D 벡터 시각화 */}
      <svg
        width={400}
        height={300}
        style={{
          position: "absolute",
          bottom: 60,
          right: 100,
          opacity: interpolate(frame, [250, 280], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        {/* 축 */}
        <line x1={50} y1={250} x2={350} y2={250} stroke="#6b7280" strokeWidth={2} />
        <line x1={50} y1={250} x2={50} y2={50} stroke="#6b7280" strokeWidth={2} />
        <line x1={50} y1={250} x2={150} y2={150} stroke="#6b7280" strokeWidth={2} strokeDasharray="5,5" />

        {/* 축 라벨 */}
        <text x={360} y={255} fill="#9ca3af" fontSize={18}>x</text>
        <text x={40} y={40} fill="#9ca3af" fontSize={18}>y</text>
        <text x={155} y={145} fill="#9ca3af" fontSize={18}>z</text>

        {/* 벡터 화살표 */}
        <line x1={50} y1={250} x2={250} y2={100} stroke="#3b82f6" strokeWidth={4} />
        <polygon points="250,100 235,108 242,118" fill="#3b82f6" />

        {/* 벡터 라벨 */}
        <text x={260} y={90} fill="#60a5fa" fontSize={20} fontWeight="bold">v = [1, 2, 3]</text>
      </svg>
    </AbsoluteFill>
  );
};
