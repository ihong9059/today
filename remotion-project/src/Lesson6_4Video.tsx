import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_6_4_DURATION = 5623;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 652 },
  compare: { start: 652, duration: 803 },
  reset: { start: 1455, duration: 812 },
  update: { start: 2267, duration: 796 },
  candidate: { start: 3063, duration: 794 },
  choice: { start: 3857, duration: 893 },
  outro: { start: 4750, duration: 873 },
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
      <Audio src={staticFile("audio/lesson-6-4/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>⚡</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>GRU</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>LSTM의 효율적인 동생</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 6-4
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCompare: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-4/compare.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>LSTM vs GRU</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40 }}>
          <h2 style={{ fontSize: 32, color: COLORS.primary, marginBottom: 20 }}>LSTM</h2>
          <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 2 }}>
            <li>3개의 게이트</li>
            <li>셀 상태 + 은닉 상태</li>
            <li>더 많은 파라미터</li>
            <li>복잡한 구조</li>
          </ul>
        </div>
        <div style={{ flex: 1, background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 40 }}>
          <h2 style={{ fontSize: 32, color: "#22c55e", marginBottom: 20 }}>GRU</h2>
          <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 2 }}>
            <li>2개의 게이트</li>
            <li>은닉 상태만 사용</li>
            <li>더 적은 파라미터</li>
            <li>간결한 구조</li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: 40, textAlign: "center", fontSize: 26, color: "rgba(255,255,255,0.8)" }}>
        성능은 비슷하지만 GRU가 더 빠르고 가벼움
      </div>
    </div>
  </AbsoluteFill>
);

const SceneReset: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-4/reset.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: "#f97316", marginBottom: 40 }}>Reset Gate (리셋 게이트)</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(249,115,22,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>공식</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontFamily: "monospace", fontSize: 28, color: "#f97316" }}>
              r<sub>t</sub> = σ(W<sub>r</sub>·[h<sub>t-1</sub>, x<sub>t</sub>])
            </div>
            <div style={{ marginTop: 30, fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
              • 출력: 0~1 사이 값<br/>
              • 이전 은닉 상태 중<br/>
              • 얼마나 무시할지 결정
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>🔄</div>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 15 }}>역할</h2>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
              이전 정보를 얼마나<br/>
              새로운 후보에 반영할지 결정
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneUpdate: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-4/update.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: "#8b5cf6", marginBottom: 40 }}>Update Gate (업데이트 게이트)</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(139,92,246,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>공식</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontFamily: "monospace", fontSize: 28, color: "#8b5cf6" }}>
              z<sub>t</sub> = σ(W<sub>z</sub>·[h<sub>t-1</sub>, x<sub>t</sub>])
            </div>
            <div style={{ marginTop: 30, fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
              • LSTM의 Forget + Input 역할<br/>
              • 하나의 게이트로 통합<br/>
              • 더 효율적인 구조
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>⚖️</div>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 15 }}>역할</h2>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
              이전 상태와 새로운 후보<br/>
              사이의 균형을 결정
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneCandidate: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-4/candidate.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>후보 은닉 상태</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>공식</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontFamily: "monospace", fontSize: 24, color: COLORS.primary, marginBottom: 20 }}>
              h̃<sub>t</sub> = tanh(W·[r<sub>t</sub>*h<sub>t-1</sub>, x<sub>t</sub>])
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontFamily: "monospace", fontSize: 24, color: COLORS.primary }}>
              h<sub>t</sub> = (1-z<sub>t</sub>)*h<sub>t-1</sub> + z<sub>t</sub>*h̃<sub>t</sub>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>최종 은닉 상태</h2>
            <div style={{ display: "grid", gap: 15 }}>
              <div style={{ background: "rgba(6,182,212,0.2)", padding: 20, borderRadius: 10 }}>
                <div style={{ fontSize: 20, color: COLORS.light }}>z<sub>t</sub> = 0 → 이전 상태 유지</div>
              </div>
              <div style={{ background: "rgba(6,182,212,0.2)", padding: 20, borderRadius: 10 }}>
                <div style={{ fontSize: 20, color: COLORS.light }}>z<sub>t</sub> = 1 → 새로운 후보로 교체</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneChoice: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-4/choice.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>LSTM vs GRU 선택</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {[
          { title: "LSTM 선택", items: ["매우 긴 시퀀스", "복잡한 의존성", "충분한 데이터와 자원"] },
          { title: "GRU 선택", items: ["빠른 학습 필요", "적은 데이터", "실시간 처리"] },
          { title: "둘 다 시도", items: ["새로운 문제", "최적 모델 탐색", "교차 검증"] },
          { title: "최근 트렌드", items: ["Transformer 우세", "특정 상황에서 RNN 유효", "하이브리드 모델"] },
        ].map((section, i) => (
          <div key={i} style={{ background: "rgba(6,182,212,0.1)", borderRadius: 20, padding: 30, border: `2px solid ${COLORS.primary}` }}>
            <h3 style={{ fontSize: 26, color: COLORS.primary, marginBottom: 15 }}>{section.title}</h3>
            {section.items.map((item, j) => (
              <div key={j} style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginBottom: 8 }}>• {item}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-4/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "GRU 특징", desc: "2개의 게이트로 간결한 구조" },
          { title: "Reset Gate", desc: "이전 정보 반영 정도 결정" },
          { title: "Update Gate", desc: "기억과 망각을 동시에 처리" },
          { title: "모델 선택", desc: "상황에 따라 적절한 모델 선택" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>양방향 RNN</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson6_4Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.compare.start} durationInFrames={SCENE_TIMINGS.compare.duration}><SceneCompare /></Sequence>
    <Sequence from={SCENE_TIMINGS.reset.start} durationInFrames={SCENE_TIMINGS.reset.duration}><SceneReset /></Sequence>
    <Sequence from={SCENE_TIMINGS.update.start} durationInFrames={SCENE_TIMINGS.update.duration}><SceneUpdate /></Sequence>
    <Sequence from={SCENE_TIMINGS.candidate.start} durationInFrames={SCENE_TIMINGS.candidate.duration}><SceneCandidate /></Sequence>
    <Sequence from={SCENE_TIMINGS.choice.start} durationInFrames={SCENE_TIMINGS.choice.duration}><SceneChoice /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
