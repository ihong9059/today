import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_6_3_DURATION = 5465;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 635 },
  vanishing: { start: 635, duration: 969 },
  cell: { start: 1604, duration: 729 },
  forget: { start: 2333, duration: 827 },
  input: { start: 3160, duration: 773 },
  output: { start: 3933, duration: 778 },
  outro: { start: 4711, duration: 754 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#06b6d4",
  secondary: "#0891b2",
  accent: "#0e7490",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, fontFamily: "Pretendard, sans-serif", zIndex: 100 }}>
      ai.uttec-lab.com
    </div>
  </>
);

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-3/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🧠</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>LSTM</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>장기 기억의 비밀</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 6-3
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneVanishing: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-3/vanishing.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>기울기 소실 문제</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(239,68,68,0.2)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: "#ef4444", marginBottom: 20 }}>문제 상황</h2>
            <ul style={{ fontSize: 24, color: COLORS.light, lineHeight: 2 }}>
              <li>긴 시퀀스에서 역전파 시</li>
              <li>기울기가 점점 작아짐</li>
              <li>앞부분 정보 학습 불가</li>
              <li>장기 의존성 학습 실패</li>
            </ul>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>예시</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontSize: 22, color: COLORS.light }}>
              "나는 <span style={{ color: COLORS.primary }}>프랑스</span>에서 태어났고... (긴 문장) ... <span style={{ color: "#ef4444 "}}>프랑스어</span>를 잘 한다"
            </div>
            <div style={{ marginTop: 20, fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
              프랑스어를 예측하려면 프랑스를 기억해야 함
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneCell: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-3/cell.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>셀 상태 (Cell State)</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40 }}>
          <div style={{ fontSize: 80, textAlign: "center", marginBottom: 30 }}>🛤️</div>
          <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>컨베이어 벨트</h2>
          <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
            <li>정보가 직접 흐르는 경로</li>
            <li>곱셈과 덧셈만 거침</li>
            <li>기울기가 잘 보존됨</li>
            <li>장기 기억 저장</li>
          </ul>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
          <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>게이트 메커니즘</h2>
          <div style={{ display: "grid", gap: 20 }}>
            {[
              { name: "Forget Gate", desc: "무엇을 잊을지", color: "#ef4444" },
              { name: "Input Gate", desc: "무엇을 저장할지", color: "#22c55e" },
              { name: "Output Gate", desc: "무엇을 출력할지", color: "#3b82f6" },
            ].map((gate, i) => (
              <div key={i} style={{ background: `rgba(${gate.color === "#ef4444" ? "239,68,68" : gate.color === "#22c55e" ? "34,197,94" : "59,130,246"},0.2)`, padding: 20, borderRadius: 15 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: gate.color }}>{gate.name}</div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>{gate.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneForget: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-3/forget.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: "#ef4444", marginBottom: 40 }}>Forget Gate (망각 게이트)</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(239,68,68,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>공식</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontFamily: "monospace", fontSize: 28, color: "#ef4444" }}>
              f<sub>t</sub> = σ(W<sub>f</sub>·[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub>)
            </div>
            <div style={{ marginTop: 30, fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
              • 출력: 0~1 사이 값<br/>
              • 0: 완전히 잊음<br/>
              • 1: 완전히 기억
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>🗑️</div>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 15 }}>역할</h2>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
              이전 셀 상태에서<br/>
              불필요한 정보를 제거
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneInput: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-3/input.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: "#22c55e", marginBottom: 40 }}>Input Gate (입력 게이트)</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(34,197,94,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>공식</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 20, fontFamily: "monospace", fontSize: 24, color: "#22c55e", marginBottom: 15 }}>
              i<sub>t</sub> = σ(W<sub>i</sub>·[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>i</sub>)
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 20, fontFamily: "monospace", fontSize: 24, color: "#22c55e" }}>
              C̃<sub>t</sub> = tanh(W<sub>C</sub>·[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>C</sub>)
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>➕</div>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 15 }}>역할</h2>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
              새로운 정보 중<br/>
              무엇을 저장할지 결정
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutput: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-3/output.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: "#3b82f6", marginBottom: 40 }}>Output Gate (출력 게이트)</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(59,130,246,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>공식</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 20, fontFamily: "monospace", fontSize: 24, color: "#3b82f6", marginBottom: 15 }}>
              o<sub>t</sub> = σ(W<sub>o</sub>·[h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>o</sub>)
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 20, fontFamily: "monospace", fontSize: 24, color: "#3b82f6" }}>
              h<sub>t</sub> = o<sub>t</sub> * tanh(C<sub>t</sub>)
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>📤</div>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 15 }}>역할</h2>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
              셀 상태 중 무엇을<br/>
              은닉 상태로 출력할지 결정
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-3/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "기울기 소실", desc: "RNN의 장기 의존성 학습 문제" },
          { title: "셀 상태", desc: "정보가 직접 흐르는 컨베이어 벨트" },
          { title: "3개의 게이트", desc: "Forget, Input, Output" },
          { title: "장기 기억", desc: "긴 시퀀스도 효과적으로 학습" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>GRU - LSTM의 효율적인 동생</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson6_3Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.vanishing.start} durationInFrames={SCENE_TIMINGS.vanishing.duration}><SceneVanishing /></Sequence>
    <Sequence from={SCENE_TIMINGS.cell.start} durationInFrames={SCENE_TIMINGS.cell.duration}><SceneCell /></Sequence>
    <Sequence from={SCENE_TIMINGS.forget.start} durationInFrames={SCENE_TIMINGS.forget.duration}><SceneForget /></Sequence>
    <Sequence from={SCENE_TIMINGS.input.start} durationInFrames={SCENE_TIMINGS.input.duration}><SceneInput /></Sequence>
    <Sequence from={SCENE_TIMINGS.output.start} durationInFrames={SCENE_TIMINGS.output.duration}><SceneOutput /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
