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

export const LESSON_7_1_DURATION = 19155;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 1273 },
  scene02_rnn_problem: { start: 1273, duration: 1569 },
  scene03_attention_idea: { start: 2842, duration: 1576 },
  scene04_parallel: { start: 4418, duration: 1654 },
  scene05_architecture: { start: 6072, duration: 1594 },
  scene06_encoder: { start: 7666, duration: 1602 },
  scene07_decoder: { start: 9268, duration: 1626 },
  scene08_positional: { start: 10894, duration: 1539 },
  scene09_comparison: { start: 12433, duration: 1665 },
  scene10_impact: { start: 14098, duration: 1589 },
  scene11_preview: { start: 15687, duration: 1620 },
  scene12_outro: { start: 17307, duration: 1848 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#8b5cf6",
  secondary: "#a78bfa",
  accent: "#c4b5fd",
  encoder: "#22c55e",
  decoder: "#f97316",
  attention: "#ec4899",
  rnn: "#ef4444",
  transformer: "#3b82f6",
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
      <Audio src={staticFile("audio/lesson-7-1/scene01_intro.mp3")} />

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 48,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 20,
            opacity: fadeIn(frame, 0),
            transform: `translateY(${slideUp(frame, 0)}px)`,
          }}
        >
          Level 7 - 트랜스포머의 세계
        </div>

        <div
          style={{
            fontSize: 100,
            marginBottom: 30,
            opacity: fadeIn(frame, 15),
            transform: `scale(${scaleIn(frame, fps, 15)})`,
          }}
        >
          🤖
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: 20,
            opacity: fadeIn(frame, 30),
            transform: `translateY(${slideUp(frame, 30)}px)`,
          }}
        >
          트랜스포머 개요
        </div>

        <div
          style={{
            fontSize: 42,
            color: COLORS.accent,
            fontStyle: "italic",
            opacity: fadeIn(frame, 45),
            transform: `translateY(${slideUp(frame, 45)}px)`,
          }}
        >
          "Attention is All You Need"
        </div>

        <div
          style={{
            marginTop: 50,
            padding: "15px 50px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: 50,
            fontSize: 28,
            color: "#ffffff",
            display: "inline-block",
            opacity: fadeIn(frame, 60),
          }}
        >
          2017년, AI 역사를 바꾼 논문
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: RNN Problem
const Scene02RnnProblem: React.FC = () => {
  const frame = useCurrentFrame();

  const problems = [
    { icon: "⏱️", title: "순차 처리", desc: "단어를 하나씩, 순서대로 처리\n병렬화가 불가능해요" },
    { icon: "📉", title: "기울기 소실", desc: "문장이 길어지면\n앞부분 정보를 잊어버려요" },
    { icon: "🐢", title: "학습 속도", desc: "병렬 처리 불가로\n학습 시간이 오래 걸려요" },
    { icon: "😵", title: "장거리 의존성", desc: "멀리 떨어진 단어 관계를\n파악하기 어려워요" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene02_rnn_problem.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.rnn,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          RNN의 한계점
        </h1>

        <div
          style={{
            fontSize: 24,
            color: COLORS.textDim,
            marginBottom: 50,
            opacity: fadeIn(frame, 15),
          }}
        >
          왜 새로운 모델이 필요했을까요?
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
          {problems.map((problem, i) => (
            <div
              key={i}
              style={{
                background: `rgba(239, 68, 68, 0.1)`,
                border: `2px solid ${COLORS.rnn}`,
                borderRadius: 20,
                padding: 35,
                opacity: fadeIn(frame, 30 + i * 20),
                transform: `translateY(${slideUp(frame, 30 + i * 20)}px)`,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 15 }}>{problem.icon}</div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: COLORS.rnn,
                  marginBottom: 10,
                }}
              >
                {problem.title}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.textDim,
                  whiteSpace: "pre-line",
                  lineHeight: 1.5,
                }}
              >
                {problem.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Attention Idea
const Scene03AttentionIdea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["나는", "너를", "정말", "많이", "사랑해"];
  const targetWord = "사랑해";

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene03_attention_idea.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.attention,
            marginBottom: 20,
            opacity: fadeIn(frame),
          }}
        >
          어텐션의 핵심 아이디어
        </h1>

        <div
          style={{
            fontSize: 28,
            color: COLORS.text,
            marginBottom: 50,
            opacity: fadeIn(frame, 15),
            textAlign: "center",
          }}
        >
          "모든 단어가 서로를 직접 참조한다!"
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginBottom: 50,
          }}
        >
          {words.map((word, i) => {
            const isTarget = word === targetWord;
            const delay = 30 + i * 15;
            const attentionProgress = interpolate(
              frame,
              [100, 150],
              [0, 1],
              { extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  background: isTarget
                    ? COLORS.attention
                    : `rgba(139, 92, 246, ${0.3 + attentionProgress * (isTarget ? 0 : 0.4)})`,
                  padding: "20px 30px",
                  borderRadius: 15,
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#ffffff",
                  opacity: fadeIn(frame, delay),
                  transform: `scale(${scaleIn(frame, fps, delay)})`,
                  boxShadow: isTarget ? `0 0 30px ${COLORS.attention}` : "none",
                }}
              >
                {word}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 40,
            opacity: fadeIn(frame, 120),
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(236, 72, 153, 0.15)",
              borderRadius: 20,
              padding: 30,
              borderLeft: `4px solid ${COLORS.attention}`,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.attention, marginBottom: 15 }}>
              Self-Attention
            </div>
            <div style={{ fontSize: 22, color: COLORS.textDim, lineHeight: 1.6 }}>
              각 단어가 문장 내 모든 단어와의<br />
              관계를 동시에 파악해요
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: "rgba(139, 92, 246, 0.15)",
              borderRadius: 20,
              padding: 30,
              borderLeft: `4px solid ${COLORS.primary}`,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary, marginBottom: 15 }}>
              장점
            </div>
            <div style={{ fontSize: 22, color: COLORS.textDim, lineHeight: 1.6 }}>
              거리에 상관없이<br />
              중요한 단어에 집중할 수 있어요
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Parallel Processing
const Scene04Parallel: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene04_parallel.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.transformer,
            marginBottom: 50,
            opacity: fadeIn(frame),
          }}
        >
          병렬 처리의 혁신
        </h1>

        <div style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
          {/* RNN 방식 */}
          <div style={{ flex: 1, opacity: fadeIn(frame, 20) }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.rnn,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              RNN (순차 처리)
            </div>

            <div style={{ display: "flex", gap: 15, justifyContent: "center", flexWrap: "wrap" }}>
              {["단어1", "단어2", "단어3", "단어4"].map((word, i) => {
                const delay = 40 + i * 30;
                const show = frame > delay;

                return (
                  <React.Fragment key={i}>
                    <div
                      style={{
                        background: show ? COLORS.rnn : "rgba(239, 68, 68, 0.3)",
                        padding: "15px 25px",
                        borderRadius: 10,
                        fontSize: 24,
                        color: "#ffffff",
                        opacity: show ? 1 : 0.3,
                      }}
                    >
                      {word}
                    </div>
                    {i < 3 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: 24,
                          color: COLORS.rnn,
                          opacity: show ? 1 : 0.3,
                        }}
                      >
                        →
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: 30,
                fontSize: 22,
                color: COLORS.textDim,
              }}
            >
              🐢 한 번에 하나씩, 느리게...
            </div>
          </div>

          {/* Transformer 방식 */}
          <div style={{ flex: 1, opacity: fadeIn(frame, 100) }}>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.transformer,
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              Transformer (병렬 처리)
            </div>

            <div style={{ display: "flex", gap: 15, justifyContent: "center", flexWrap: "wrap" }}>
              {["단어1", "단어2", "단어3", "단어4"].map((word, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.transformer,
                    padding: "15px 25px",
                    borderRadius: 10,
                    fontSize: 24,
                    color: "#ffffff",
                  }}
                >
                  {word}
                </div>
              ))}
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: 30,
                fontSize: 22,
                color: COLORS.textDim,
              }}
            >
              🚀 모든 단어를 동시에! 빠르게!
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            textAlign: "center",
            background: "rgba(59, 130, 246, 0.15)",
            borderRadius: 20,
            padding: 30,
            opacity: fadeIn(frame, 150),
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.transformer, marginBottom: 10 }}>
            GPU의 진정한 힘을 활용!
          </div>
          <div style={{ fontSize: 22, color: COLORS.textDim }}>
            수천 개의 단어를 동시에 처리 → 학습 속도 수십 배 향상
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Architecture Overview
const Scene05Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene05_architecture.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 50,
            opacity: fadeIn(frame),
            textAlign: "center",
          }}
        >
          트랜스포머 전체 구조
        </h1>

        <div style={{ display: "flex", gap: 80, justifyContent: "center", alignItems: "center" }}>
          {/* 인코더 */}
          <div
            style={{
              opacity: fadeIn(frame, 20),
              transform: `scale(${scaleIn(frame, fps, 20)})`,
            }}
          >
            <div
              style={{
                width: 280,
                background: `linear-gradient(180deg, ${COLORS.encoder} 0%, rgba(34, 197, 94, 0.7) 100%)`,
                borderRadius: 20,
                padding: 40,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 20 }}>📥</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#ffffff", marginBottom: 15 }}>
                인코더
              </div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.9)" }}>
                입력을 이해하고<br />
                의미를 추출해요
              </div>
            </div>
          </div>

          {/* 화살표 */}
          <div
            style={{
              fontSize: 60,
              color: COLORS.primary,
              opacity: fadeIn(frame, 60),
            }}
          >
            ➡️
          </div>

          {/* 디코더 */}
          <div
            style={{
              opacity: fadeIn(frame, 80),
              transform: `scale(${scaleIn(frame, fps, 80)})`,
            }}
          >
            <div
              style={{
                width: 280,
                background: `linear-gradient(180deg, ${COLORS.decoder} 0%, rgba(249, 115, 22, 0.7) 100%)`,
                borderRadius: 20,
                padding: 40,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 20 }}>📤</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#ffffff", marginBottom: 15 }}>
                디코더
              </div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.9)" }}>
                이해한 내용을 바탕으로<br />
                출력을 생성해요
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            display: "flex",
            gap: 30,
            justifyContent: "center",
            opacity: fadeIn(frame, 120),
          }}
        >
          <div
            style={{
              background: "rgba(139, 92, 246, 0.15)",
              borderRadius: 15,
              padding: "20px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.primary }}>번역</div>
            <div style={{ fontSize: 20, color: COLORS.textDim }}>영어 → 한국어</div>
          </div>
          <div
            style={{
              background: "rgba(139, 92, 246, 0.15)",
              borderRadius: 15,
              padding: "20px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.primary }}>요약</div>
            <div style={{ fontSize: 20, color: COLORS.textDim }}>긴 글 → 짧은 요약</div>
          </div>
          <div
            style={{
              background: "rgba(139, 92, 246, 0.15)",
              borderRadius: 15,
              padding: "20px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.primary }}>QA</div>
            <div style={{ fontSize: 20, color: COLORS.textDim }}>질문 → 답변</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Encoder
const Scene06Encoder: React.FC = () => {
  const frame = useCurrentFrame();

  const components = [
    { name: "Self-Attention", desc: "입력 단어들 사이의 관계를 파악", color: COLORS.attention },
    { name: "Add & Norm", desc: "잔차 연결 + 레이어 정규화", color: COLORS.secondary },
    { name: "Feed Forward", desc: "비선형 변환으로 표현력 강화", color: COLORS.transformer },
    { name: "Add & Norm", desc: "잔차 연결 + 레이어 정규화", color: COLORS.secondary },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene06_encoder.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.encoder,
            marginBottom: 15,
            opacity: fadeIn(frame),
          }}
        >
          인코더 내부 구조
        </h1>

        <div
          style={{
            fontSize: 24,
            color: COLORS.textDim,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          입력을 이해하는 핵심 블록
        </div>

        <div style={{ display: "flex", gap: 60 }}>
          {/* 구조 다이어그램 */}
          <div style={{ flex: 1 }}>
            {components.map((comp, i) => (
              <div
                key={i}
                style={{
                  background: `${comp.color}20`,
                  border: `2px solid ${comp.color}`,
                  borderRadius: 15,
                  padding: "20px 30px",
                  marginBottom: 15,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: fadeIn(frame, 30 + i * 20),
                  transform: `translateX(${slideUp(frame, 30 + i * 20) * -1}px)`,
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 700, color: comp.color }}>
                  {comp.name}
                </div>
                <div style={{ fontSize: 20, color: COLORS.textDim }}>{comp.desc}</div>
              </div>
            ))}

            <div
              style={{
                textAlign: "center",
                marginTop: 20,
                fontSize: 24,
                color: COLORS.encoder,
                opacity: fadeIn(frame, 120),
              }}
            >
              ↑ 이 블록이 N번 반복돼요! (보통 6번)
            </div>
          </div>

          {/* 설명 */}
          <div
            style={{
              flex: 0.8,
              background: "rgba(34, 197, 94, 0.1)",
              borderRadius: 20,
              padding: 30,
              opacity: fadeIn(frame, 100),
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.encoder, marginBottom: 20 }}>
              핵심 포인트
            </div>
            <div style={{ fontSize: 22, color: COLORS.textDim, lineHeight: 1.8 }}>
              • Self-Attention으로 문맥 파악<br />
              • 잔차 연결로 학습 안정화<br />
              • 레이어 정규화로 빠른 수렴<br />
              • FFN으로 비선형 변환
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Decoder
const Scene07Decoder: React.FC = () => {
  const frame = useCurrentFrame();

  const components = [
    { name: "Masked Self-Attention", desc: "미래 단어를 보지 않도록 마스킹", color: COLORS.attention },
    { name: "Add & Norm", desc: "잔차 연결 + 레이어 정규화", color: COLORS.secondary },
    { name: "Cross-Attention", desc: "인코더 출력과 연결!", color: COLORS.encoder },
    { name: "Add & Norm", desc: "잔차 연결 + 레이어 정규화", color: COLORS.secondary },
    { name: "Feed Forward", desc: "비선형 변환", color: COLORS.transformer },
    { name: "Add & Norm", desc: "잔차 연결 + 레이어 정규화", color: COLORS.secondary },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene07_decoder.mp3")} />

      <div style={{ padding: "70px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.decoder,
            marginBottom: 10,
            opacity: fadeIn(frame),
          }}
        >
          디코더 내부 구조
        </h1>

        <div
          style={{
            fontSize: 24,
            color: COLORS.textDim,
            marginBottom: 30,
            opacity: fadeIn(frame, 15),
          }}
        >
          출력을 생성하는 핵심 블록
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {/* 구조 다이어그램 */}
          <div style={{ flex: 1 }}>
            {components.map((comp, i) => (
              <div
                key={i}
                style={{
                  background: `${comp.color}20`,
                  border: `2px solid ${comp.color}`,
                  borderRadius: 12,
                  padding: "15px 25px",
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: fadeIn(frame, 25 + i * 15),
                  transform: `translateX(${slideUp(frame, 25 + i * 15) * -1}px)`,
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 700, color: comp.color }}>
                  {comp.name}
                </div>
                <div style={{ fontSize: 18, color: COLORS.textDim }}>{comp.desc}</div>
              </div>
            ))}
          </div>

          {/* 설명 */}
          <div
            style={{
              flex: 0.7,
              background: "rgba(249, 115, 22, 0.1)",
              borderRadius: 20,
              padding: 25,
              opacity: fadeIn(frame, 110),
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.decoder, marginBottom: 15 }}>
              인코더와의 차이점
            </div>
            <div style={{ fontSize: 20, color: COLORS.textDim, lineHeight: 1.7 }}>
              • <span style={{ color: COLORS.attention }}>Masked</span> Self-Attention<br />
              → 미래 정보 차단!<br /><br />
              • <span style={{ color: COLORS.encoder }}>Cross</span>-Attention 추가<br />
              → 인코더 출력 참조!
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Positional Encoding
const Scene08Positional: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words1 = ["나는", "너를", "사랑해"];
  const words2 = ["너를", "나는", "사랑해"];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene08_positional.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 15,
            opacity: fadeIn(frame),
          }}
        >
          위치 인코딩 (Positional Encoding)
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          어텐션은 순서를 모른다? 그래서 위치 정보를 따로 넣어줘요!
        </div>

        <div style={{ display: "flex", gap: 60, marginBottom: 40 }}>
          {/* 문장 1 */}
          <div
            style={{
              flex: 1,
              background: "rgba(139, 92, 246, 0.1)",
              borderRadius: 20,
              padding: 30,
              opacity: fadeIn(frame, 30),
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.primary, marginBottom: 20 }}>
              문장 1
            </div>
            <div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
              {words1.map((word, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.primary,
                    padding: "15px 25px",
                    borderRadius: 10,
                    fontSize: 24,
                    color: "#ffffff",
                    transform: `scale(${scaleIn(frame, fps, 50 + i * 10)})`,
                  }}
                >
                  <div>{word}</div>
                  <div style={{ fontSize: 16, marginTop: 5, opacity: 0.8 }}>위치: {i + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 문장 2 */}
          <div
            style={{
              flex: 1,
              background: "rgba(249, 115, 22, 0.1)",
              borderRadius: 20,
              padding: 30,
              opacity: fadeIn(frame, 60),
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.decoder, marginBottom: 20 }}>
              문장 2
            </div>
            <div style={{ display: "flex", gap: 15, justifyContent: "center" }}>
              {words2.map((word, i) => (
                <div
                  key={i}
                  style={{
                    background: COLORS.decoder,
                    padding: "15px 25px",
                    borderRadius: 10,
                    fontSize: 24,
                    color: "#ffffff",
                    transform: `scale(${scaleIn(frame, fps, 80 + i * 10)})`,
                  }}
                >
                  <div>{word}</div>
                  <div style={{ fontSize: 16, marginTop: 5, opacity: 0.8 }}>위치: {i + 1}</div>
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
            textAlign: "center",
            opacity: fadeIn(frame, 120),
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, marginBottom: 15 }}>
            sin, cos 함수로 위치 정보 생성
          </div>
          <div style={{ fontSize: 22, color: COLORS.textDim }}>
            각 위치마다 고유한 패턴 → 모델이 순서를 알 수 있어요!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 9: RNN vs Transformer Comparison
const Scene09Comparison: React.FC = () => {
  const frame = useCurrentFrame();

  const comparisons = [
    { aspect: "처리 방식", rnn: "순차 처리", transformer: "병렬 처리" },
    { aspect: "장거리 의존성", rnn: "어려움", transformer: "쉬움" },
    { aspect: "학습 안정성", rnn: "기울기 소실", transformer: "안정적" },
    { aspect: "확장성", rnn: "제한적", transformer: "수천억 파라미터!" },
    { aspect: "학습 속도", rnn: "느림", transformer: "빠름" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene09_comparison.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 50,
            opacity: fadeIn(frame),
            textAlign: "center",
          }}
        >
          RNN vs Transformer 비교
        </h1>

        <div
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* 헤더 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              background: "rgba(139, 92, 246, 0.3)",
              padding: "20px 30px",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.text }}>비교 항목</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.rnn, textAlign: "center" }}>
              RNN
            </div>
            <div
              style={{ fontSize: 24, fontWeight: 700, color: COLORS.transformer, textAlign: "center" }}
            >
              Transformer
            </div>
          </div>

          {/* 비교 항목 */}
          {comparisons.map((comp, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "20px 30px",
                borderTop: "1px solid rgba(139, 92, 246, 0.2)",
                opacity: fadeIn(frame, 30 + i * 15),
              }}
            >
              <div style={{ fontSize: 22, color: COLORS.text }}>{comp.aspect}</div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.rnn,
                  textAlign: "center",
                  opacity: 0.8,
                }}
              >
                {comp.rnn}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.transformer,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {comp.transformer}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 24,
            color: COLORS.textDim,
            opacity: fadeIn(frame, 120),
          }}
        >
          💡 그래도 RNN은 작은 모델, 실시간 처리에서 여전히 유용해요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: Impact
const Scene10Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const models = [
    { name: "BERT", type: "인코더만", desc: "문장 이해, 질문 답변", icon: "📚" },
    { name: "GPT", type: "디코더만", desc: "텍스트 생성, ChatGPT!", icon: "💬" },
    { name: "T5", type: "인코더+디코더", desc: "번역, 요약, 만능!", icon: "🎯" },
    { name: "ViT", type: "비전 트랜스포머", desc: "이미지도 트랜스포머로!", icon: "🖼️" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene10_impact.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 15,
            opacity: fadeIn(frame),
          }}
        >
          트랜스포머의 영향력
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          "Attention is All You Need" → AI 시대를 열었어요!
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25 }}>
          {models.map((model, i) => (
            <div
              key={i}
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 20,
                padding: 30,
                opacity: fadeIn(frame, 30 + i * 20),
                transform: `scale(${scaleIn(frame, fps, 30 + i * 20)})`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 15 }}>
                <div style={{ fontSize: 50 }}>{model.icon}</div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.primary }}>
                    {model.name}
                  </div>
                  <div style={{ fontSize: 18, color: COLORS.secondary }}>{model.type}</div>
                </div>
              </div>
              <div style={{ fontSize: 22, color: COLORS.textDim }}>{model.desc}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 30,
            justifyContent: "center",
            opacity: fadeIn(frame, 120),
          }}
        >
          {["🎵 음악", "🧬 단백질", "🎮 게임", "🔬 과학"].map((field, i) => (
            <div
              key={i}
              style={{
                background: "rgba(139, 92, 246, 0.2)",
                padding: "15px 25px",
                borderRadius: 30,
                fontSize: 22,
                color: COLORS.text,
              }}
            >
              {field}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 11: Preview
const Scene11Preview: React.FC = () => {
  const frame = useCurrentFrame();

  const lessons = [
    { num: "7-2", title: "셀프 어텐션", desc: "Query, Key, Value의 비밀!" },
    { num: "7-3", title: "멀티헤드 어텐션", desc: "여러 관점에서 동시에!" },
    { num: "7-4", title: "위치 인코딩", desc: "sin, cos의 마법!" },
    { num: "7-5", title: "인코더-디코더", desc: "전체 아키텍처 완전 정복!" },
    { num: "7-6~8", title: "GPT, BERT, RLHF", desc: "실제 모델들의 비밀!" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-7-1/scene11_preview.mp3")} />

      <div style={{ padding: "80px 60px" }}>
        <h1
          style={{
            fontSize: 52,
            color: COLORS.primary,
            marginBottom: 15,
            opacity: fadeIn(frame),
          }}
        >
          이번 레벨에서 배울 내용
        </h1>

        <div
          style={{
            fontSize: 26,
            color: COLORS.textDim,
            marginBottom: 40,
            opacity: fadeIn(frame, 15),
          }}
        >
          트랜스포머의 모든 것을 마스터해요!
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {lessons.map((lesson, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 25,
                background: "rgba(139, 92, 246, 0.1)",
                borderRadius: 15,
                padding: "20px 30px",
                opacity: fadeIn(frame, 30 + i * 20),
                transform: `translateX(${slideUp(frame, 30 + i * 20) * -1}px)`,
              }}
            >
              <div
                style={{
                  background: COLORS.primary,
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: 10,
                  fontSize: 22,
                  fontWeight: 700,
                  minWidth: 80,
                  textAlign: "center",
                }}
              >
                {lesson.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.text }}>
                  {lesson.title}
                </div>
                <div style={{ fontSize: 20, color: COLORS.textDim }}>{lesson.desc}</div>
              </div>
              <div style={{ fontSize: 30 }}>🚀</div>
            </div>
          ))}
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
    { icon: "🤖", title: "트랜스포머", desc: "2017년 구글의 혁신" },
    { icon: "👁️", title: "어텐션", desc: "모든 단어가 서로를 직접 참조" },
    { icon: "⚡", title: "병렬 처리", desc: "동시에 빠르게!" },
    { icon: "📥📤", title: "인코더-디코더", desc: "이해하고 생성하는 구조" },
    { icon: "📍", title: "위치 인코딩", desc: "순서 정보 추가" },
    { icon: "🌍", title: "영향력", desc: "GPT, BERT, 비전까지!" },
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
      <Audio src={staticFile("audio/lesson-7-1/scene12_outro.mp3")} />

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
                opacity: fadeIn(frame, 20 + i * 10),
                transform: `scale(${scaleIn(frame, fps, 20 + i * 10)})`,
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>{item.title}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#ffffff",
            opacity: fadeIn(frame, 100),
          }}
        >
          다음 레슨: <span style={{ fontWeight: 700, color: COLORS.accent }}>셀프 어텐션 Deep Dive!</span>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 28,
            color: "rgba(255,255,255,0.9)",
            opacity: fadeIn(frame, 120),
          }}
        >
          감사합니다! 🙏
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Component
export const Lesson7_1Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
      <Scene01Intro />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene02_rnn_problem.start} durationInFrames={SCENE_TIMINGS.scene02_rnn_problem.duration}>
      <Scene02RnnProblem />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene03_attention_idea.start} durationInFrames={SCENE_TIMINGS.scene03_attention_idea.duration}>
      <Scene03AttentionIdea />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene04_parallel.start} durationInFrames={SCENE_TIMINGS.scene04_parallel.duration}>
      <Scene04Parallel />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene05_architecture.start} durationInFrames={SCENE_TIMINGS.scene05_architecture.duration}>
      <Scene05Architecture />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene06_encoder.start} durationInFrames={SCENE_TIMINGS.scene06_encoder.duration}>
      <Scene06Encoder />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene07_decoder.start} durationInFrames={SCENE_TIMINGS.scene07_decoder.duration}>
      <Scene07Decoder />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene08_positional.start} durationInFrames={SCENE_TIMINGS.scene08_positional.duration}>
      <Scene08Positional />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene09_comparison.start} durationInFrames={SCENE_TIMINGS.scene09_comparison.duration}>
      <Scene09Comparison />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene10_impact.start} durationInFrames={SCENE_TIMINGS.scene10_impact.duration}>
      <Scene10Impact />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene11_preview.start} durationInFrames={SCENE_TIMINGS.scene11_preview.duration}>
      <Scene11Preview />
    </Sequence>
    <Sequence from={SCENE_TIMINGS.scene12_outro.start} durationInFrames={SCENE_TIMINGS.scene12_outro.duration}>
      <Scene12Outro />
    </Sequence>
  </AbsoluteFill>
);
