import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
} from "remotion";

export const LESSON_4_4_DURATION = 6429;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 752 },
  what_is_module: { start: 752, duration: 987 },
  basic_rules: { start: 1739, duration: 1043 },
  forward: { start: 2782, duration: 986 },
  parameters: { start: 3768, duration: 876 },
  submodule: { start: 4644, duration: 863 },
  outro: { start: 5507, duration: 922 },
};

const COLORS = {
  primary: "#f97316",
  secondary: "#ea580c",
  accent: "#fbbf24",
  dark: "#1a1a2e",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 15, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: "#ffffff", fontSize: 24, fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, zIndex: 100 }}>
      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 20, fontWeight: 500, textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>ai.uttec-lab.com</span>
    </div>
  </>
);

const AnimatedTitle: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const y = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 100 } });
  const translateY = interpolate(y, [0, 1], [30, 0]);
  return <div style={{ opacity, transform: `translateY(${translateY}px)` }}>{children}</div>;
};

const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-4/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 40, color: COLORS.light, marginBottom: 20 }}>Level 4 - Lesson 4</div>
        <div style={{ fontSize: 90, fontWeight: "bold", color: COLORS.light, marginBottom: 30, textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          🧱 nn.Module 기초
        </div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>PyTorch 신경망의 기본 클래스</div>
        <AnimatedTitle delay={60}>
          <div style={{ marginTop: 60, fontSize: 28, color: "rgba(255,255,255,0.8)" }}>
            레고 브릭처럼 조합하는 신경망
          </div>
        </AnimatedTitle>
      </div>
    </AbsoluteFill>
  );
};

const Scene2WhatIsModule: React.FC = () => {
  const frame = useCurrentFrame();
  const features = [
    { icon: "📦", name: "파라미터 관리", desc: "가중치 자동 추적" },
    { icon: "🖥️", name: "디바이스 이동", desc: "GPU/CPU 전환" },
    { icon: "🔄", name: "모드 전환", desc: "train/eval" },
    { icon: "💾", name: "저장/로드", desc: "state_dict" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-4/scene2_what_is_module.mp3")} />
      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50 }}>❓ nn.Module이란?</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", marginBottom: 40 }}>
          모든 신경망 레이어와 모델의 <span style={{ color: COLORS.accent }}>기본 클래스(부모 클래스)</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {features.map((f, i) => {
            const delay = 60 + i * 45;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div key={f.name} style={{ display: "flex", alignItems: "center", gap: 20, background: "rgba(249,115,22,0.15)", borderRadius: 20, padding: 30, opacity, transform: `scale(${0.9 + opacity * 0.1})` }}>
                <div style={{ fontSize: 50 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 5 }}>{f.name}</div>
                  <div style={{ fontSize: 22, color: COLORS.light }}>{f.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene3BasicRules: React.FC = () => {
  const frame = useCurrentFrame();
  const rules = [
    { num: "1️⃣", rule: "super().__init__()", desc: "부모 클래스 초기화 호출" },
    { num: "2️⃣", rule: "__init__에서 레이어 정의", desc: "nn.Linear, nn.Conv2d 등" },
    { num: "3️⃣", rule: "forward에서 데이터 흐름 정의", desc: "입력 → 출력 과정" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-4/scene3_basic_rules.mp3")} />
      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50 }}>📜 반드시 지켜야 할 규칙</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {rules.map((r, i) => {
            const delay = 30 + i * 90;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div key={r.rule} style={{ display: "flex", gap: 30, background: "#2d2d44", borderRadius: 20, padding: 35, borderLeft: `5px solid ${COLORS.primary}`, opacity, transform: `translateX(${(1 - opacity) * -50}px)` }}>
                <div style={{ fontSize: 50 }}>{r.num}</div>
                <div>
                  <div style={{ fontSize: 28, color: "#4ade80", fontFamily: "monospace", marginBottom: 10 }}>{r.rule}</div>
                  <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>{r.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene4Forward: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-4/scene4_forward.mp3")} />
      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50 }}>➡️ forward() 메서드</div>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "#2d2d44", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>순전파 정의</div>
            <div style={{ fontSize: 24, color: COLORS.light, lineHeight: 1.8 }}>
              입력 데이터가 출력까지<br />어떻게 흘러가는지 정의
            </div>
            <div style={{ marginTop: 30, padding: 20, background: "rgba(0,0,0,0.3)", borderRadius: 10 }}>
              <div style={{ fontSize: 20, color: "#4ade80", fontFamily: "monospace" }}>
                def forward(self, x):<br />
                &nbsp;&nbsp;x = relu(self.fc1(x))<br />
                &nbsp;&nbsp;return self.fc2(x)
              </div>
            </div>
          </div>
          <div style={{ flex: 1, background: "#2d2d44", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>호출 방법</div>
            <div style={{ fontSize: 24, color: "#ff6b6b", marginBottom: 20 }}>❌ model.forward(x)</div>
            <div style={{ fontSize: 24, color: "#4ade80", marginBottom: 20 }}>✅ model(x)</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              직접 forward()를 부르지 않음<br />
              PyTorch가 자동으로 호출함
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene5Parameters: React.FC = () => {
  const frame = useCurrentFrame();
  const methods = [
    { method: "model.parameters()", desc: "모든 파라미터 반복자" },
    { method: "model.named_parameters()", desc: "이름과 함께 파라미터" },
    { method: "p.numel()", desc: "파라미터 개수" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-4/scene5_parameters.mp3")} />
      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50 }}>📊 파라미터 관리</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {methods.map((m, i) => {
            const delay = 30 + i * 60;
            const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div key={m.method} style={{ display: "flex", alignItems: "center", gap: 30, background: "rgba(249,115,22,0.15)", borderRadius: 20, padding: 30, opacity }}>
                <div style={{ fontSize: 24, color: "#4ade80", fontFamily: "monospace", background: "rgba(0,0,0,0.3)", padding: "15px 25px", borderRadius: 10 }}>{m.method}</div>
                <div style={{ fontSize: 26, color: COLORS.light }}>{m.desc}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 40, padding: 30, background: "#2d2d44", borderRadius: 20 }}>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
            💡 옵티마이저에 전달: <span style={{ color: "#4ade80", fontFamily: "monospace" }}>Adam(model.parameters())</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene6Submodule: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-4/scene6_submodule.mp3")} />
      <div style={{ padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.primary, marginBottom: 50 }}>🔗 서브모듈</div>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "#2d2d44", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>nn.Sequential</div>
            <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 20 }}>레이어를 순서대로 쌓기</div>
            <div style={{ fontSize: 18, color: "#4ade80", fontFamily: "monospace", background: "rgba(0,0,0,0.3)", padding: 15, borderRadius: 10, lineHeight: 1.8 }}>
              nn.Sequential(<br />
              &nbsp;&nbsp;nn.Linear(784, 256),<br />
              &nbsp;&nbsp;nn.ReLU(),<br />
              &nbsp;&nbsp;nn.Linear(256, 10)<br />
              )
            </div>
          </div>
          <div style={{ flex: 1, background: "#2d2d44", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>nn.ModuleList</div>
            <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 20 }}>동적으로 레이어 관리</div>
            <div style={{ fontSize: 18, color: "#4ade80", fontFamily: "monospace", background: "rgba(0,0,0,0.3)", padding: 15, borderRadius: 10, lineHeight: 1.8 }}>
              layers = nn.ModuleList([<br />
              &nbsp;&nbsp;nn.Linear(64, 64)<br />
              &nbsp;&nbsp;for _ in range(3)<br />
              ])
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-4-4/scene7_outro.mp3")} />
      <div style={{ textAlign: "center", padding: 80 }}>
        <div style={{ fontSize: 56, fontWeight: "bold", color: COLORS.light, marginBottom: 50 }}>📝 오늘 배운 내용</div>
        <div style={{ display: "flex", gap: 30, marginBottom: 50, opacity }}>
          {[
            { icon: "🧱", title: "nn.Module", desc: "기본 클래스" },
            { icon: "📜", title: "3가지 규칙", desc: "super, init, forward" },
            { icon: "📊", title: "파라미터", desc: "관리와 추적" },
          ].map((item) => (
            <div key={item.title} style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: 30 }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 28, color: COLORS.light, fontWeight: "bold", marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.9)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <AnimatedTitle delay={120}>
          <div style={{ fontSize: 36, color: COLORS.light, marginBottom: 20 }}>다음 레슨: 데이터 로딩</div>
          <div style={{ fontSize: 50, color: COLORS.light }}>다음 시간에 만나요! 👋</div>
        </AnimatedTitle>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson4_4Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.dark }}>
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><Scene1Intro /></Sequence>
      <Sequence from={SCENE_TIMINGS.what_is_module.start} durationInFrames={SCENE_TIMINGS.what_is_module.duration}><Scene2WhatIsModule /></Sequence>
      <Sequence from={SCENE_TIMINGS.basic_rules.start} durationInFrames={SCENE_TIMINGS.basic_rules.duration}><Scene3BasicRules /></Sequence>
      <Sequence from={SCENE_TIMINGS.forward.start} durationInFrames={SCENE_TIMINGS.forward.duration}><Scene4Forward /></Sequence>
      <Sequence from={SCENE_TIMINGS.parameters.start} durationInFrames={SCENE_TIMINGS.parameters.duration}><Scene5Parameters /></Sequence>
      <Sequence from={SCENE_TIMINGS.submodule.start} durationInFrames={SCENE_TIMINGS.submodule.duration}><Scene6Submodule /></Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><Scene7Outro /></Sequence>
    </AbsoluteFill>
  );
};
