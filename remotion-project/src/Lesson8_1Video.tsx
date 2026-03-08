import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_1_DURATION = 4848;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 436 },
  cpuVsGpu: { start: 436, duration: 771 },
  whyGpu: { start: 1207, duration: 815 },
  simd: { start: 2022, duration: 806 },
  bandwidth: { start: 2828, duration: 705 },
  cooperation: { start: 3533, duration: 637 },
  outro: { start: 4170, duration: 678 },
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
      <Audio src={staticFile("audio/lesson-8-1/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🖥️</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>GPU와 병렬 컴퓨팅</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>딥러닝 가속의 핵심</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-1
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCpuVsGpu: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/cpu_vs_gpu.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CPU vs GPU</h1>
        <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🧠</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>CPU</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>천재 교수 1명</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)", marginTop: 10 }}>복잡한 문제 해결</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>⚡</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>GPU</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>학생 1000명</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)", marginTop: 10 }}>단순 작업 병렬 처리</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneWhyGpu: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/why_gpu.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>딥러닝과 GPU</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>행렬 연산</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[1,2,3,4,5,6,7,8,9].map(i => (
                <div key={i} style={{
                  width: 60, height: 60,
                  background: `rgba(244,63,94,${0.3 + (frame % 30) / 60})`,
                  borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center",
                  color: COLORS.light, fontSize: 20
                }}>{i}</div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>🔢</div>
            <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center" }}>독립적 연산<br />= 병렬 처리 최적</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSimd: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/simd.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>SIMD: 하나의 명령, 여러 데이터</h1>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 100 }}>📣</div>
            <div style={{ fontSize: 24, color: COLORS.light, marginTop: 20 }}>호루라기 한 번</div>
          </div>
          <div style={{ fontSize: 60, color: COLORS.primary }}>→</div>
          <div style={{ flex: 2 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {Array(32).fill(0).map((_, i) => (
                <div key={i} style={{
                  width: 50, height: 50,
                  background: COLORS.primary,
                  borderRadius: "50%",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontSize: 16, color: COLORS.light,
                  transform: `scale(${1 + Math.sin((frame + i * 3) * 0.1) * 0.1})`
                }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 24, color: COLORS.light, textAlign: "center", marginTop: 20 }}>32개 스레드 = 1 Warp</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBandwidth: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/bandwidth.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>메모리 대역폭</h1>
        <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🛣️</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>CPU</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>2차선 도로</div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🚀</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>GPU HBM</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>64차선 고속도로</div>
            <div style={{ fontSize: 20, color: COLORS.primary, marginTop: 10 }}>2TB/s 이상!</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCooperation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/cooperation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CPU + GPU 협력</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 15 }}>🧠</div>
            <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center", fontWeight: 700, marginBottom: 15 }}>CPU</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>데이터 로드</li>
              <li>전처리</li>
              <li>학습 루프 제어</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 15 }}>⚡</div>
            <div style={{ fontSize: 28, color: COLORS.light, textAlign: "center", fontWeight: 700, marginBottom: 15 }}>GPU</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>순전파</li>
              <li>역전파</li>
              <li>가중치 업데이트</li>
            </ul>
          </div>
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
      <Audio src={staticFile("audio/lesson-8-1/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          CPU: 순차 처리 | GPU: 병렬 처리<br />
          딥러닝 행렬 연산 → GPU 최적
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          다음: CUDA 프로그래밍 기초
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_1Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.cpuVsGpu.start} durationInFrames={SCENE_TIMINGS.cpuVsGpu.duration}><SceneCpuVsGpu /></Sequence>
    <Sequence from={SCENE_TIMINGS.whyGpu.start} durationInFrames={SCENE_TIMINGS.whyGpu.duration}><SceneWhyGpu /></Sequence>
    <Sequence from={SCENE_TIMINGS.simd.start} durationInFrames={SCENE_TIMINGS.simd.duration}><SceneSimd /></Sequence>
    <Sequence from={SCENE_TIMINGS.bandwidth.start} durationInFrames={SCENE_TIMINGS.bandwidth.duration}><SceneBandwidth /></Sequence>
    <Sequence from={SCENE_TIMINGS.cooperation.start} durationInFrames={SCENE_TIMINGS.cooperation.duration}><SceneCooperation /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
