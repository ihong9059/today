import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_4_DURATION = 4161;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 519 },
  naive: { start: 519, duration: 534 },
  problem: { start: 1053, duration: 562 },
  tiling: { start: 1615, duration: 631 },
  implementation: { start: 2246, duration: 654 },
  performance: { start: 2900, duration: 688 },
  outro: { start: 3588, duration: 573 },
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
      <Audio src={staticFile("audio/lesson-8-4/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🧮</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>행렬 곱셈 최적화</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>Tiling 기법 적용</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-4
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneNaive: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/naive.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>기본 행렬 곱셈</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, padding: 10, background: "rgba(244,63,94,0.3)", borderRadius: 10 }}>
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} style={{ width: 40, height: 40, background: COLORS.primary, borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", color: COLORS.light, fontSize: 16 }}>A</div>
                ))}
              </div>
              <div style={{ fontSize: 40, color: COLORS.primary }}>×</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, padding: 10, background: "rgba(244,63,94,0.3)", borderRadius: 10 }}>
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} style={{ width: 40, height: 40, background: COLORS.secondary, borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", color: COLORS.light, fontSize: 16 }}>B</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 30 }}>
            <pre style={{ fontSize: 20, color: COLORS.light, lineHeight: 1.6, margin: 0 }}>
{`C[i][j] = 0
for k in range(N):
    C[i][j] += A[i][k] * B[k][j]`}
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneProblem: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/problem.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>문제점: 메모리 접근</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🔄</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>중복 접근</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
              같은 데이터를<br />여러 번 로드
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🐢</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>전역 메모리 병목</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
              느린 메모리<br />반복 접근
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTiling: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/tiling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>타일링 (Tiling) 기법</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5, padding: 10, background: "rgba(244,63,94,0.2)", borderRadius: 10, marginBottom: 20 }}>
              {Array(16).fill(0).map((_, i) => (
                <div key={i} style={{ width: 50, height: 50, background: i < 4 ? COLORS.primary : "rgba(244,63,94,0.3)", borderRadius: 5 }}></div>
              ))}
            </div>
            <div style={{ fontSize: 24, color: COLORS.light }}>타일 단위로 공유 메모리에 로드</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 30 }}>
              <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20, fontWeight: 700 }}>핵심 아이디어:</div>
              <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
                <li>작은 타일로 분할</li>
                <li>공유 메모리에 캐싱</li>
                <li>재사용 극대화</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneImplementation: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/implementation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>구현 핵심</h1>
        <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
          <pre style={{ fontSize: 20, color: COLORS.light, lineHeight: 1.8, margin: 0 }}>
{`__shared__ float As[TILE][TILE];
__shared__ float Bs[TILE][TILE];

// 1. 전역 → 공유 메모리 로드
As[ty][tx] = A[...];
Bs[ty][tx] = B[...];
__syncthreads();

// 2. 공유 메모리에서 연산
for (int k = 0; k < TILE; k++)
    sum += As[ty][k] * Bs[k][tx];`}
          </pre>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePerformance: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/performance.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>성능 향상</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>메모리 접근 감소</div>
            <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
              <div>
                <div style={{ width: 80, height: 200, background: "rgba(244,63,94,0.3)", borderRadius: 10, position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, width: "100%", height: "100%", background: COLORS.primary, borderRadius: 10 }}></div>
                </div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>기본</div>
              </div>
              <div>
                <div style={{ width: 80, height: 200, background: "rgba(244,63,94,0.3)", borderRadius: 10, position: "relative" }}>
                  <div style={{ position: "absolute", bottom: 0, width: "100%", height: "30%", background: COLORS.secondary, borderRadius: 10 }}></div>
                </div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>타일링</div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 60, color: COLORS.primary, fontWeight: 800 }}>10x</div>
              <div style={{ fontSize: 28, color: COLORS.light }}>성능 향상 가능!</div>
            </div>
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
      <Audio src={staticFile("audio/lesson-8-4/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>🎉</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>Level 8 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          GPU 병렬 컴퓨팅 마스터<br />
          타일링으로 성능 최적화
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          다음 레벨에서 계속!
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_4Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.naive.start} durationInFrames={SCENE_TIMINGS.naive.duration}><SceneNaive /></Sequence>
    <Sequence from={SCENE_TIMINGS.problem.start} durationInFrames={SCENE_TIMINGS.problem.duration}><SceneProblem /></Sequence>
    <Sequence from={SCENE_TIMINGS.tiling.start} durationInFrames={SCENE_TIMINGS.tiling.duration}><SceneTiling /></Sequence>
    <Sequence from={SCENE_TIMINGS.implementation.start} durationInFrames={SCENE_TIMINGS.implementation.duration}><SceneImplementation /></Sequence>
    <Sequence from={SCENE_TIMINGS.performance.start} durationInFrames={SCENE_TIMINGS.performance.duration}><ScenePerformance /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
