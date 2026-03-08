import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_2_DURATION = 4408;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 577 },
  hostDevice: { start: 577, duration: 673 },
  kernel: { start: 1250, duration: 611 },
  threadBlock: { start: 1861, duration: 665 },
  example: { start: 2526, duration: 733 },
  pytorch: { start: 3259, duration: 612 },
  outro: { start: 3871, duration: 537 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#f43f5e",
  secondary: "#e11d48",
  accent: "#be123c",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)",
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
      <Audio src={staticFile("audio/lesson-8-2/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔧</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>CUDA 프로그래밍 기초</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>GPU 프로그래밍의 시작</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-2
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneHostDevice: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/host_device.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Host와 Device</h1>
        <div style={{ display: "flex", gap: 60, justifyContent: "center", alignItems: "center" }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>💻</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>Host</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>CPU + CPU 메모리</div>
          </div>
          <div style={{ fontSize: 60, color: COLORS.primary }}>⇄</div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🎮</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>Device</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>GPU + GPU 메모리</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneKernel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/kernel.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>커널 (Kernel)</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30, marginBottom: 20 }}>
              <div style={{ fontSize: 24, color: COLORS.light }}>CPU (for loop)</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)", marginTop: 10 }}>순차 처리: 1→2→3→...</div>
            </div>
            <div style={{ background: "rgba(244,63,94,0.3)", borderRadius: 20, padding: 30 }}>
              <div style={{ fontSize: 24, color: COLORS.light }}>GPU (kernel)</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>병렬 처리: 모두 동시!</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ fontSize: 120 }}>⚡</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneThreadBlock: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/thread_block.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Thread → Block → Grid</h1>
        <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, background: COLORS.primary, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 24, color: COLORS.light, margin: "0 auto" }}>T</div>
            <div style={{ fontSize: 20, color: COLORS.light, marginTop: 10 }}>Thread</div>
          </div>
          <div style={{ fontSize: 40, color: COLORS.primary, alignSelf: "center" }}>→</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, padding: 10, background: "rgba(244,63,94,0.3)", borderRadius: 10 }}>
              {Array(9).fill(0).map((_, i) => (
                <div key={i} style={{ width: 25, height: 25, background: COLORS.primary, borderRadius: "50%" }}></div>
              ))}
            </div>
            <div style={{ fontSize: 20, color: COLORS.light, marginTop: 10 }}>Block</div>
          </div>
          <div style={{ fontSize: 40, color: COLORS.primary, alignSelf: "center" }}>→</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, padding: 15, background: "rgba(244,63,94,0.15)", borderRadius: 10 }}>
              {Array(4).fill(0).map((_, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3, padding: 5, background: "rgba(244,63,94,0.3)", borderRadius: 5 }}>
                  {Array(9).fill(0).map((_, j) => (
                    <div key={j} style={{ width: 8, height: 8, background: COLORS.primary, borderRadius: "50%" }}></div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 20, color: COLORS.light, marginTop: 10 }}>Grid</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneExample: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/example.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>벡터 덧셈 예제</h1>
        <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 30 }}>
          <pre style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.6, margin: 0 }}>
{`// 각 스레드가 하나의 원소 처리
int idx = blockIdx.x * blockDim.x + threadIdx.x;
C[idx] = A[idx] + B[idx];`}
          </pre>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 30, justifyContent: "center" }}>
          {["A", "+", "B", "=", "C"].map((item, i) => (
            <div key={i} style={{
              width: item === "+" || item === "=" ? 50 : 100,
              height: 60,
              background: item === "+" || item === "=" ? "transparent" : "rgba(244,63,94,0.3)",
              borderRadius: 10,
              display: "flex", justifyContent: "center", alignItems: "center",
              fontSize: 32, color: COLORS.light, fontWeight: 700
            }}>{item}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePytorch: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/pytorch.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>PyTorch에서는 간단!</h1>
        <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
          <pre style={{ fontSize: 28, color: COLORS.light, lineHeight: 1.8, margin: 0 }}>
{`tensor.cuda()
# 또는
tensor.to('cuda')`}
          </pre>
        </div>
        <div style={{ marginTop: 40, textAlign: "center", fontSize: 28, color: "rgba(255,255,255,0.8)" }}>
          내부 원리를 이해하면 성능 최적화에 도움!
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          Host/Device | 커널 | Thread-Block-Grid
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          다음: GPU 메모리 계층
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_2Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.hostDevice.start} durationInFrames={SCENE_TIMINGS.hostDevice.duration}><SceneHostDevice /></Sequence>
    <Sequence from={SCENE_TIMINGS.kernel.start} durationInFrames={SCENE_TIMINGS.kernel.duration}><SceneKernel /></Sequence>
    <Sequence from={SCENE_TIMINGS.threadBlock.start} durationInFrames={SCENE_TIMINGS.threadBlock.duration}><SceneThreadBlock /></Sequence>
    <Sequence from={SCENE_TIMINGS.example.start} durationInFrames={SCENE_TIMINGS.example.duration}><SceneExample /></Sequence>
    <Sequence from={SCENE_TIMINGS.pytorch.start} durationInFrames={SCENE_TIMINGS.pytorch.duration}><ScenePytorch /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
