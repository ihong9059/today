import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_6_2_DURATION = 5612;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 716 },
  structure: { start: 716, duration: 679 },
  hidden: { start: 1395, duration: 859 },
  sharing: { start: 2254, duration: 780 },
  unroll: { start: 3034, duration: 933 },
  types: { start: 3967, duration: 905 },
  outro: { start: 4872, duration: 740 },
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
      <Audio src={staticFile("audio/lesson-6-2/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔄</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>RNN의 구조와 동작</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>순환 신경망의 핵심 원리</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 6-2
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneStructure: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-2/structure.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>RNN 기본 구조</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: 60 }}>
        <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>입력층</div>
          <div style={{ width: 100, height: 100, background: COLORS.primary, borderRadius: "50%", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ fontSize: 36, color: COLORS.light, fontWeight: 700 }}>x<sub>t</sub></span>
          </div>
        </div>
        <div style={{ fontSize: 60, display: "flex", alignItems: "center", color: COLORS.primary }}>→</div>
        <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>은닉층</div>
          <div style={{ width: 100, height: 100, background: "#22c55e", borderRadius: "50%", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <span style={{ fontSize: 36, color: COLORS.light, fontWeight: 700 }}>h<sub>t</sub></span>
            <div style={{ position: "absolute", top: -40, right: -40, fontSize: 40 }}>🔄</div>
          </div>
        </div>
        <div style={{ fontSize: 60, display: "flex", alignItems: "center", color: COLORS.primary }}>→</div>
        <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>출력층</div>
          <div style={{ width: 100, height: 100, background: "#f97316", borderRadius: "50%", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <span style={{ fontSize: 36, color: COLORS.light, fontWeight: 700 }}>y<sub>t</sub></span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 50, textAlign: "center", fontSize: 28, color: "rgba(255,255,255,0.8)" }}>
        은닉 상태가 다음 시점으로 전달됨
      </div>
    </div>
  </AbsoluteFill>
);

const SceneHidden: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-2/hidden.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>은닉 상태 (Hidden State)</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>핵심 공식</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontFamily: "monospace", fontSize: 28, color: COLORS.primary }}>
              h<sub>t</sub> = tanh(W<sub>xh</sub>x<sub>t</sub> + W<sub>hh</sub>h<sub>t-1</sub> + b)
            </div>
            <div style={{ marginTop: 30, fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <div>• x<sub>t</sub>: 현재 입력</div>
              <div>• h<sub>t-1</sub>: 이전 은닉 상태</div>
              <div>• W: 가중치 행렬</div>
              <div>• tanh: 활성화 함수</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 32, color: "#22c55e", marginBottom: 20 }}>은닉 상태의 역할</h2>
            <ul style={{ fontSize: 24, color: COLORS.light, lineHeight: 2 }}>
              <li>이전 정보의 기억</li>
              <li>현재 입력과 통합</li>
              <li>다음 시점으로 전달</li>
              <li>문맥(Context) 유지</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneSharing: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-2/sharing.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>파라미터 공유</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🔗</div>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 15 }}>모든 시점에서 동일한 가중치</h2>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
              W<sub>xh</sub>, W<sub>hh</sub>, W<sub>hy</sub> 공유
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>장점</h2>
            <div style={{ display: "grid", gap: 15 }}>
              {[
                "파라미터 수 감소",
                "가변 길이 입력 처리",
                "일반화 성능 향상",
                "학습 효율성 증가"
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(6,182,212,0.1)", padding: 15, borderRadius: 10, fontSize: 22, color: COLORS.light }}>
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneUnroll: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-2/unroll.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>시간 펼치기 (Unrolling)</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 30, marginBottom: 40 }}>
          {["t-2", "t-1", "t", "t+1", "t+2"].map((t, i) => {
            const show = frame > i * 10;
            return (
              <div key={i} style={{ textAlign: "center", opacity: show ? 1 : 0.3 }}>
                <div style={{ width: 80, height: 80, background: COLORS.primary, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 15 }}>
                  <span style={{ fontSize: 20, color: COLORS.light, fontWeight: 700 }}>h<sub>{t}</sub></span>
                </div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>{t}</div>
                {i < 4 && <div style={{ position: "absolute", marginLeft: 90, marginTop: -55, fontSize: 30, color: COLORS.primary }}>→</div>}
              </div>
            );
          })}
        </div>
        <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
          <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 15 }}>역전파 시 시간을 따라 펼쳐서 계산</div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>BPTT (Backpropagation Through Time)</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTypes: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-2/types.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>RNN의 유형</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {[
          { title: "One-to-Many", desc: "이미지 캡셔닝", example: "1장의 이미지 → 문장" },
          { title: "Many-to-One", desc: "감성 분석", example: "문장 → 1개의 레이블" },
          { title: "Many-to-Many", desc: "기계 번역", example: "문장 → 문장" },
          { title: "Many-to-Many (동기)", desc: "품사 태깅", example: "단어 → 품사 (동시)" },
        ].map((type, i) => (
          <div key={i} style={{ background: "rgba(6,182,212,0.1)", borderRadius: 20, padding: 30, border: `2px solid ${COLORS.primary}` }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, marginBottom: 10 }}>{type.title}</div>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 10 }}>{type.desc}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>{type.example}</div>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-2/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "RNN 구조", desc: "입력-은닉-출력의 순환 구조" },
          { title: "은닉 상태", desc: "이전 정보를 기억하고 전달" },
          { title: "파라미터 공유", desc: "모든 시점에서 동일한 가중치" },
          { title: "다양한 유형", desc: "One-to-Many, Many-to-One 등" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>LSTM - 장기 기억의 비밀</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson6_2Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.structure.start} durationInFrames={SCENE_TIMINGS.structure.duration}><SceneStructure /></Sequence>
    <Sequence from={SCENE_TIMINGS.hidden.start} durationInFrames={SCENE_TIMINGS.hidden.duration}><SceneHidden /></Sequence>
    <Sequence from={SCENE_TIMINGS.sharing.start} durationInFrames={SCENE_TIMINGS.sharing.duration}><SceneSharing /></Sequence>
    <Sequence from={SCENE_TIMINGS.unroll.start} durationInFrames={SCENE_TIMINGS.unroll.duration}><SceneUnroll /></Sequence>
    <Sequence from={SCENE_TIMINGS.types.start} durationInFrames={SCENE_TIMINGS.types.duration}><SceneTypes /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
