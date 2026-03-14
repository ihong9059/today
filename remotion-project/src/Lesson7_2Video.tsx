import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const LESSON_7_2_DURATION = 15807;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 1025 },
  scene02_why: { start: 1025, duration: 1199 },
  scene03_qkv_concept: { start: 2224, duration: 1340 },
  scene04_qkv_create: { start: 3564, duration: 1482 },
  scene05_attention_score: { start: 5046, duration: 1302 },
  scene06_scaling: { start: 6348, duration: 1365 },
  scene07_softmax: { start: 7713, duration: 1369 },
  scene08_weighted_sum: { start: 9082, duration: 1448 },
  scene09_example: { start: 10530, duration: 1331 },
  scene10_matrix: { start: 11861, duration: 1327 },
  scene11_visualization: { start: 13188, duration: 1284 },
  scene12_outro: { start: 14472, duration: 1335 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#8b5cf6",
  secondary: "#a78bfa",
  accent: "#c4b5fd",
  query: "#ec4899",
  key: "#f97316",
  value: "#22c55e",
  score: "#3b82f6",
  text: "#f1f5f9",
  textDim: "rgba(241, 245, 249, 0.7)",
  gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #4c1d95 100%)",
};

// GlobalOverlay: Top-left logo + Bottom-center education URL
const GlobalOverlay: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: 30,
        left: 40,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 1000,
      }}
    >
      <Img
        src={staticFile("images/logo.png")}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />
      <span
        style={{
          color: "#ffffff",
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        UTTEC-Lab
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(139, 92, 246, 0.9)",
        padding: "10px 30px",
        borderRadius: 25,
        zIndex: 1000,
      }}
    >
      <span
        style={{
          color: "#ffffff",
          fontSize: 20,
          fontFamily: "Pretendard, sans-serif",
          fontWeight: 600,
        }}
      >
        http://uttec-ai.duckdns.org
      </span>
    </div>
  </>
);

// Animation Helpers
const fadeIn = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });

const slideUp = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 25], [30, 0], { extrapolateRight: "clamp" });

const scaleIn = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

// Scene 1: Intro
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.gradient,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene01_intro.mp3")} />

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 100,
            marginBottom: 30,
            opacity: fadeIn(frame, 0),
            transform: `scale(${scaleIn(frame, fps, 0)})`,
          }}
        >
          🔍
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: 20,
            opacity: fadeIn(frame, 15),
            transform: `translateY(${slideUp(frame, 15)}px)`,
          }}
        >
          셀프 어텐션
        </div>

        <div
          style={{
            fontSize: 42,
            color: COLORS.accent,
            marginBottom: 30,
            opacity: fadeIn(frame, 30),
          }}
        >
          Self-Attention Deep Dive
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 30,
            marginTop: 30,
            opacity: fadeIn(frame, 45),
          }}
        >
          <div style={{ background: COLORS.query, padding: "15px 30px", borderRadius: 15, fontSize: 28, color: "#fff", fontWeight: 700 }}>
            Query
          </div>
          <div style={{ background: COLORS.key, padding: "15px 30px", borderRadius: 15, fontSize: 28, color: "#fff", fontWeight: 700 }}>
            Key
          </div>
          <div style={{ background: COLORS.value, padding: "15px 30px", borderRadius: 15, fontSize: 28, color: "#fff", fontWeight: 700 }}>
            Value
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            padding: "15px 50px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: 50,
            fontSize: 28,
            color: "#ffffff",
            display: "inline-block",
            opacity: fadeIn(frame, 60),
          }}
        >
          Level 7-2
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Why Self-Attention
const Scene02Why: React.FC = () => {
  const frame = useCurrentFrame();

  const sentence = ["그", "고양이는", "너무", "피곤해서", "잠이", "들었다"];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene02_why.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          왜 셀프 어텐션이 필요할까?
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 50,
            opacity: fadeIn(frame, 15),
          }}
        >
          단어들 사이의 관계를 파악해야 문장을 이해할 수 있어요!
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            marginBottom: 50,
            flexWrap: "wrap",
          }}
        >
          {sentence.map((word, i) => {
            const isHighlight = word === "그" || word === "고양이는";
            const delay = 30 + i * 10;

            return (
              <div
                key={i}
                style={{
                  background: isHighlight ? COLORS.primary : "rgba(139, 92, 246, 0.2)",
                  padding: "20px 30px",
                  borderRadius: 15,
                  fontSize: 32,
                  fontWeight: isHighlight ? 700 : 400,
                  color: "#ffffff",
                  opacity: fadeIn(frame, delay),
                  boxShadow: isHighlight ? `0 0 20px ${COLORS.primary}` : "none",
                }}
              >
                {word}
              </div>
            );
          })}
        </div>

        {frame > 90 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              opacity: fadeIn(frame, 90),
            }}
          >
            <div style={{ fontSize: 32, color: COLORS.primary }}>"그"</div>
            <div style={{ fontSize: 40 }}>→</div>
            <div style={{ fontSize: 32, color: COLORS.primary }}>"고양이"</div>
            <div style={{ fontSize: 26, color: COLORS.textDim, marginLeft: 20 }}>
              를 가리켜요!
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: 50,
            background: "rgba(139, 92, 246, 0.15)",
            borderRadius: 20,
            padding: 30,
            opacity: fadeIn(frame, 120),
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, marginBottom: 15 }}>
            셀프 어텐션의 역할
          </div>
          <div style={{ fontSize: 24, color: COLORS.textDim }}>
            "이 단어와 저 단어가 얼마나 관련있지?" → Q, K, V로 계산!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: QKV Concept
const Scene03QkvConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const concepts = [
    { name: "Query", korean: "질문", desc: "\"나는 이런 정보를 찾고 있어!\"", color: COLORS.query, icon: "🔍" },
    { name: "Key", korean: "키워드", desc: "\"나는 이런 정보를 가지고 있어!\"", color: COLORS.key, icon: "🔑" },
    { name: "Value", korean: "실제 정보", desc: "\"여기 찾던 정보가 있어!\"", color: COLORS.value, icon: "📦" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene03_qkv_concept.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 15,
            opacity: fadeIn(frame),
          }}
        >
          Query, Key, Value 개념
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 50,
            opacity: fadeIn(frame, 15),
          }}
        >
          도서관에서 책을 찾는 것과 비슷해요!
        </div>

        <div style={{ display: "flex", gap: 30 }}>
          {concepts.map((concept, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: `${concept.color}15`,
                border: `3px solid ${concept.color}`,
                borderRadius: 20,
                padding: 30,
                opacity: fadeIn(frame, 30 + i * 25),
                transform: `scale(${scaleIn(frame, fps, 30 + i * 25)})`,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 15, textAlign: "center" }}>
                {concept.icon}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: concept.color,
                  textAlign: "center",
                  marginBottom: 10,
                }}
              >
                {concept.name}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.secondary,
                  textAlign: "center",
                  marginBottom: 15,
                }}
              >
                ({concept.korean})
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.textDim,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {concept.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 28,
            color: COLORS.text,
            opacity: fadeIn(frame, 120),
          }}
        >
          Query로 Key를 검색 → 매칭되면 Value를 가져와요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Creating QKV
const Scene04QkvCreate: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene04_qkv_create.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 50,
            opacity: fadeIn(frame),
          }}
        >
          Q, K, V는 어떻게 만들까?
        </h1>

        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {/* 입력 */}
          <div style={{ flex: 1, opacity: fadeIn(frame, 20) }}>
            <div
              style={{
                background: "rgba(139, 92, 246, 0.2)",
                borderRadius: 20,
                padding: 40,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary }}>X</div>
              <div style={{ fontSize: 22, color: COLORS.textDim, marginTop: 10 }}>
                입력 단어 벡터
              </div>
            </div>
          </div>

          <div style={{ fontSize: 40, color: COLORS.primary, opacity: fadeIn(frame, 40) }}>→</div>

          {/* 변환 */}
          <div style={{ flex: 2, opacity: fadeIn(frame, 60) }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ background: COLORS.query, padding: "15px 25px", borderRadius: 10, color: "#fff", fontSize: 24, fontWeight: 700 }}>
                  Q = X × W_Q
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ background: COLORS.key, padding: "15px 25px", borderRadius: 10, color: "#fff", fontSize: 24, fontWeight: 700 }}>
                  K = X × W_K
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ background: COLORS.value, padding: "15px 25px", borderRadius: 10, color: "#fff", fontSize: 24, fontWeight: 700 }}>
                  V = X × W_V
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 50,
            background: "rgba(139, 92, 246, 0.15)",
            borderRadius: 20,
            padding: 30,
            opacity: fadeIn(frame, 100),
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary, marginBottom: 15 }}>
            핵심 포인트
          </div>
          <div style={{ fontSize: 22, color: COLORS.textDim, lineHeight: 1.8 }}>
            • 같은 입력 X에서 세 가지 다른 표현을 만들어요<br />
            • W_Q, W_K, W_V는 학습되는 가중치 행렬이에요<br />
            • 모델이 스스로 최적의 Q, K, V를 만드는 법을 배워요!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Attention Score
const Scene05AttentionScore: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene05_attention_score.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.score,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          어텐션 점수 계산
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          Query와 Key를 비교해서 얼마나 관련있는지 알아봐요!
        </div>

        <div style={{ display: "flex", gap: 40, alignItems: "center", marginBottom: 40 }}>
          <div
            style={{
              flex: 1,
              background: `${COLORS.query}20`,
              borderRadius: 20,
              padding: 30,
              textAlign: "center",
              opacity: fadeIn(frame, 30),
            }}
          >
            <div style={{ fontSize: 60, marginBottom: 10 }}>🔍</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.query }}>Query</div>
            <div style={{ fontSize: 20, color: COLORS.textDim, marginTop: 10 }}>
              "동물" 관심
            </div>
          </div>

          <div style={{ fontSize: 40, color: COLORS.primary, opacity: fadeIn(frame, 50) }}>
            내적
          </div>

          <div
            style={{
              flex: 1,
              background: `${COLORS.key}20`,
              borderRadius: 20,
              padding: 30,
              textAlign: "center",
              opacity: fadeIn(frame, 40),
            }}
          >
            <div style={{ fontSize: 60, marginBottom: 10 }}>🔑</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.key }}>Key</div>
            <div style={{ fontSize: 20, color: COLORS.textDim, marginTop: 10 }}>
              "고양이" → 높은 점수!
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(59, 130, 246, 0.15)",
            borderRadius: 20,
            padding: 30,
            textAlign: "center",
            opacity: fadeIn(frame, 70),
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.score, marginBottom: 15 }}>
            점수 = Q · K^T
          </div>
          <div style={{ fontSize: 22, color: COLORS.textDim }}>
            비슷할수록 내적 값이 커요 → 높은 점수!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Scaling
const Scene06Scaling: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene06_scaling.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          스케일링 (Scaling)
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 50,
            opacity: fadeIn(frame, 15),
          }}
        >
          내적 값이 너무 크면 문제가 생겨요!
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          <div
            style={{
              flex: 1,
              background: "rgba(239, 68, 68, 0.15)",
              border: "2px solid #ef4444",
              borderRadius: 20,
              padding: 30,
              opacity: fadeIn(frame, 30),
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: "#ef4444", marginBottom: 15 }}>
              문제점
            </div>
            <div style={{ fontSize: 22, color: COLORS.textDim, lineHeight: 1.8 }}>
              • 값이 너무 크면<br />
              • softmax 결과가 극단적 (0 or 1)<br />
              • 기울기가 작아짐<br />
              • 학습이 잘 안 됨!
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "rgba(34, 197, 94, 0.15)",
              border: "2px solid #22c55e",
              borderRadius: 20,
              padding: 30,
              opacity: fadeIn(frame, 60),
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: "#22c55e", marginBottom: 15 }}>
              해결책
            </div>
            <div style={{ fontSize: 22, color: COLORS.textDim, lineHeight: 1.8 }}>
              • √d_k 로 나누기!<br />
              • d_k = Key 벡터 차원<br />
              • 값이 적절한 범위로<br />
              • 안정적인 학습!
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 50,
            background: "rgba(139, 92, 246, 0.2)",
            borderRadius: 20,
            padding: 30,
            textAlign: "center",
            opacity: fadeIn(frame, 90),
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.primary }}>
            Scaled Score = (Q · K^T) / √d_k
          </div>
          <div style={{ fontSize: 24, color: COLORS.accent, marginTop: 15 }}>
            Scaled Dot-Product Attention의 핵심!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Softmax
const Scene07Softmax: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene07_softmax.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          Softmax 적용
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 50,
            opacity: fadeIn(frame, 15),
          }}
        >
          점수를 확률로 변환해요!
        </div>

        <div style={{ display: "flex", gap: 60, alignItems: "center", marginBottom: 40 }}>
          <div style={{ flex: 1, opacity: fadeIn(frame, 30) }}>
            <div style={{ fontSize: 24, color: COLORS.textDim, marginBottom: 20 }}>스케일링 후 점수</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["5", "3", "1"].map((score, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(139, 92, 246, 0.3)",
                    padding: "20px 30px",
                    borderRadius: 15,
                    fontSize: 32,
                    fontWeight: 700,
                    color: COLORS.text,
                  }}
                >
                  {score}
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 40, color: COLORS.primary, opacity: fadeIn(frame, 50) }}>
            →
          </div>

          <div style={{ flex: 1, opacity: fadeIn(frame, 70) }}>
            <div style={{ fontSize: 24, color: COLORS.textDim, marginBottom: 20 }}>Softmax 후</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["0.84", "0.11", "0.05"].map((prob, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.primary,
                    padding: "20px 30px",
                    borderRadius: 15,
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {prob}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(139, 92, 246, 0.15)",
            borderRadius: 20,
            padding: 30,
            opacity: fadeIn(frame, 100),
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary, marginBottom: 15 }}>
            Softmax의 역할
          </div>
          <div style={{ fontSize: 22, color: COLORS.textDim }}>
            • 모든 값의 합이 1이 되어요 (확률!)<br />
            • 높은 점수 → 높은 확률, 낮은 점수 → 낮은 확률<br />
            • "얼마나 집중할지" 비율이 결정돼요
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Weighted Sum
const Scene08WeightedSum: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene08_weighted_sum.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.value,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          가중 합 (Weighted Sum)
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          어텐션 가중치로 Value를 합쳐요!
        </div>

        <div style={{ display: "flex", gap: 30, marginBottom: 40 }}>
          {[
            { weight: "0.7", label: "단어1 V" },
            { weight: "0.2", label: "단어2 V" },
            { weight: "0.1", label: "단어3 V" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: `${COLORS.value}20`,
                borderRadius: 20,
                padding: 25,
                textAlign: "center",
                opacity: fadeIn(frame, 30 + i * 15),
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.value }}>
                ×{item.weight}
              </div>
              <div style={{ fontSize: 20, color: COLORS.textDim, marginTop: 10 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 40,
            color: COLORS.primary,
            marginBottom: 30,
            opacity: fadeIn(frame, 80),
          }}
        >
          + 모두 더하면...
        </div>

        <div
          style={{
            background: "rgba(34, 197, 94, 0.2)",
            borderRadius: 20,
            padding: 30,
            textAlign: "center",
            opacity: fadeIn(frame, 100),
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.value, marginBottom: 15 }}>
            새로운 벡터 탄생!
          </div>
          <div style={{ fontSize: 22, color: COLORS.textDim }}>
            중요한 단어의 정보가 많이 담겨요
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
            background: "rgba(139, 92, 246, 0.15)",
            borderRadius: 15,
            padding: 25,
            textAlign: "center",
            opacity: fadeIn(frame, 120),
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary }}>
            Attention(Q, K, V) = softmax(QK^T / √d_k) × V
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 9: Example
const Scene09Example: React.FC = () => {
  const frame = useCurrentFrame();

  const words = ["고양이가", "매트", "위에서", "잠을", "잤다"];
  const attentionScores = [0.6, 0.15, 0.05, 0.1, 0.1];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene09_example.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          실제 예시
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          "잤다"의 Query가 다른 단어들의 Key와 어텐션을 계산해요
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
            justifyContent: "center",
            marginBottom: 50,
          }}
        >
          {words.map((word, i) => {
            const score = attentionScores[i];
            const barHeight = score * 150;
            const delay = 30 + i * 15;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  opacity: fadeIn(frame, delay),
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 150,
                    background: "rgba(139, 92, 246, 0.2)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: barHeight,
                      background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}>{word}</div>
                <div style={{ fontSize: 18, color: COLORS.textDim }}>{score}</div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            background: "rgba(139, 92, 246, 0.15)",
            borderRadius: 20,
            padding: 30,
            opacity: fadeIn(frame, 100),
          }}
        >
          <div style={{ fontSize: 24, color: COLORS.text }}>
            "잤다"는 <span style={{ color: COLORS.primary, fontWeight: 700 }}>"고양이가"</span>에 가장 많이 집중!
            <br />
            <span style={{ color: COLORS.textDim }}>→ 누가 잤는지가 가장 중요하니까요!</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: Matrix Operations
const Scene10Matrix: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene10_matrix.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          행렬 연산으로 한 번에!
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 50,
            opacity: fadeIn(frame, 15),
          }}
        >
          실제로는 모든 단어를 동시에 처리해요
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {[
            { step: "1", desc: "문장의 모든 단어 → X 행렬", icon: "📚" },
            { step: "2", desc: "X × W_Q = Q 행렬, X × W_K = K 행렬, X × W_V = V 행렬", icon: "🔄" },
            { step: "3", desc: "Q × K^T → 모든 어텐션 점수 한 번에!", icon: "⚡" },
            { step: "4", desc: "÷ √d_k → softmax → × V → 끝!", icon: "✅" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "rgba(139, 92, 246, 0.1)",
                borderRadius: 15,
                padding: "20px 30px",
                opacity: fadeIn(frame, 30 + i * 20),
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  background: COLORS.primary,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {item.step}
              </div>
              <div style={{ fontSize: 32 }}>{item.icon}</div>
              <div style={{ fontSize: 24, color: COLORS.text }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 26,
            color: COLORS.accent,
            opacity: fadeIn(frame, 120),
          }}
        >
          GPU에서 행렬 연산은 병렬 처리로 초고속! 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 11: Visualization
const Scene11Visualization: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene11_visualization.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          어텐션 시각화
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          어텐션 가중치를 시각화하면 재미있는 패턴이 보여요!
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          <div
            style={{
              flex: 1,
              background: "rgba(139, 92, 246, 0.1)",
              borderRadius: 20,
              padding: 30,
              opacity: fadeIn(frame, 30),
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary, marginBottom: 20 }}>
              대명사 → 명사
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ background: COLORS.query, padding: "10px 20px", borderRadius: 10, color: "#fff", fontSize: 22 }}>
                "그"
              </div>
              <div style={{ fontSize: 30 }}>→</div>
              <div style={{ background: COLORS.value, padding: "10px 20px", borderRadius: 10, color: "#fff", fontSize: 22 }}>
                "고양이"
              </div>
            </div>
            <div style={{ fontSize: 20, color: COLORS.textDim, marginTop: 15 }}>
              대명사가 가리키는 명사에 높은 어텐션!
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "rgba(139, 92, 246, 0.1)",
              borderRadius: 20,
              padding: 30,
              opacity: fadeIn(frame, 60),
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary, marginBottom: 20 }}>
              동사 → 주어/목적어
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ background: COLORS.query, padding: "10px 20px", borderRadius: 10, color: "#fff", fontSize: 22 }}>
                "먹었다"
              </div>
              <div style={{ fontSize: 30 }}>→</div>
              <div style={{ background: COLORS.value, padding: "10px 20px", borderRadius: 10, color: "#fff", fontSize: 22 }}>
                "고양이" + "밥"
              </div>
            </div>
            <div style={{ fontSize: 20, color: COLORS.textDim, marginTop: 15 }}>
              문법적 관계가 자연스럽게 학습!
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 26,
            color: COLORS.text,
            opacity: fadeIn(frame, 100),
          }}
        >
          모델이 언어를 어떻게 이해하는지 분석할 수 있어요! 🧠
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 12: Outro
const Scene12Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const summaries = [
    { icon: "🔍", title: "Self-Attention", desc: "문장 내 단어 관계 파악" },
    { icon: "❓", title: "Query", desc: "무엇을 찾나" },
    { icon: "🔑", title: "Key", desc: "무엇이 있나" },
    { icon: "📦", title: "Value", desc: "실제 정보" },
    { icon: "📐", title: "계산", desc: "QK내적 → 스케일 → softmax → V합" },
    { icon: "⚡", title: "행렬 연산", desc: "GPU로 초고속 병렬 처리" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.gradient,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-2/scene12_outro.mp3")} />

      <div style={{ textAlign: "center", maxWidth: 1200, padding: "0 60px" }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: 40,
            opacity: fadeIn(frame),
          }}
        >
          오늘 배운 내용 정리
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginBottom: 50,
          }}
        >
          {summaries.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 15,
                padding: 25,
                opacity: fadeIn(frame, 15 + i * 10),
                transform: `scale(${scaleIn(frame, fps, 15 + i * 10)})`,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#ffffff" }}>{item.title}</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#ffffff",
            opacity: fadeIn(frame, 90),
          }}
        >
          다음 레슨: <span style={{ fontWeight: 700, color: COLORS.accent }}>멀티헤드 어텐션</span>
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "rgba(255,255,255,0.9)",
            opacity: fadeIn(frame, 105),
          }}
        >
          여러 개의 어텐션을 동시에! 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Component
export const Lesson7_2Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
      <Scene01Intro />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene02_why.start} durationInFrames={SCENE_TIMINGS.scene02_why.duration}>
      <Scene02Why />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene03_qkv_concept.start} durationInFrames={SCENE_TIMINGS.scene03_qkv_concept.duration}>
      <Scene03QkvConcept />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene04_qkv_create.start} durationInFrames={SCENE_TIMINGS.scene04_qkv_create.duration}>
      <Scene04QkvCreate />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene05_attention_score.start} durationInFrames={SCENE_TIMINGS.scene05_attention_score.duration}>
      <Scene05AttentionScore />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene06_scaling.start} durationInFrames={SCENE_TIMINGS.scene06_scaling.duration}>
      <Scene06Scaling />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene07_softmax.start} durationInFrames={SCENE_TIMINGS.scene07_softmax.duration}>
      <Scene07Softmax />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene08_weighted_sum.start} durationInFrames={SCENE_TIMINGS.scene08_weighted_sum.duration}>
      <Scene08WeightedSum />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene09_example.start} durationInFrames={SCENE_TIMINGS.scene09_example.duration}>
      <Scene09Example />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene10_matrix.start} durationInFrames={SCENE_TIMINGS.scene10_matrix.duration}>
      <Scene10Matrix />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene11_visualization.start} durationInFrames={SCENE_TIMINGS.scene11_visualization.duration}>
      <Scene11Visualization />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
      <Scene12Outro />
    </Sequence>
  </AbsoluteFill>
);
