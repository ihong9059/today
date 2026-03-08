import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_3_DURATION = 4430;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 589 },
  hierarchy: { start: 589, duration: 725 },
  register: { start: 1314, duration: 631 },
  shared: { start: 1945, duration: 632 },
  global: { start: 2577, duration: 629 },
  constant: { start: 3206, duration: 608 },
  outro: { start: 3814, duration: 616 },
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
      <Audio src={staticFile("audio/lesson-8-3/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>💾</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>GPU 메모리 계층</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>성능 최적화의 핵심</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-3
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneHierarchy: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/hierarchy.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>메모리 계층 구조</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 15, alignItems: "center" }}>
          <div style={{ width: 200, padding: 20, background: COLORS.primary, borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>레지스터</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>가장 빠름</div>
          </div>
          <div style={{ fontSize: 30, color: COLORS.primary }}>↓</div>
          <div style={{ width: 300, padding: 20, background: "rgba(244,63,94,0.7)", borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>공유 메모리</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>블록 내 공유</div>
          </div>
          <div style={{ fontSize: 30, color: COLORS.primary }}>↓</div>
          <div style={{ width: 400, padding: 20, background: "rgba(244,63,94,0.5)", borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>L1/L2 캐시</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>자동 캐싱</div>
          </div>
          <div style={{ fontSize: 30, color: COLORS.primary }}>↓</div>
          <div style={{ width: 500, padding: 20, background: "rgba(244,63,94,0.3)", borderRadius: 10, textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>전역 메모리 (HBM)</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>가장 느림, 용량 큼</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneRegister: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/register.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>레지스터 (Register)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>⚡</div>
            <ul style={{ fontSize: 26, color: COLORS.light, lineHeight: 2 }}>
              <li>스레드 전용</li>
              <li>가장 빠른 접근</li>
              <li>지역 변수 저장</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>예시 코드:</div>
            <pre style={{ fontSize: 22, color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>
{`int idx = threadIdx.x;
float temp = A[idx];
// temp는 레지스터에 저장`}
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneShared: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/shared.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>공유 메모리 (Shared Memory)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🤝</div>
            <ul style={{ fontSize: 26, color: COLORS.light, lineHeight: 2 }}>
              <li>블록 내 스레드 공유</li>
              <li>레지스터 다음 빠름</li>
              <li>__shared__ 키워드</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>예시 코드:</div>
            <pre style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>
{`__shared__ float tile[16][16];
tile[ty][tx] = A[...];
__syncthreads();`}
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneGlobal: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/global.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>전역 메모리 (Global Memory)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🌍</div>
            <ul style={{ fontSize: 26, color: COLORS.light, lineHeight: 2 }}>
              <li>모든 스레드 접근 가능</li>
              <li>가장 큰 용량 (GB)</li>
              <li>상대적으로 느림</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ fontSize: 32, color: COLORS.light, textAlign: "center", marginBottom: 20 }}>
              병목 지점!
            </div>
            <div style={{ fontSize: 100 }}>🚧</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginTop: 20 }}>
              최소화 필요
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneConstant: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/constant.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>상수 메모리 (Constant Memory)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>📌</div>
            <ul style={{ fontSize: 26, color: COLORS.light, lineHeight: 2 }}>
              <li>읽기 전용</li>
              <li>캐시됨 → 빠름</li>
              <li>__constant__ 키워드</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>용도:</div>
            <div style={{ fontSize: 26, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              • 하이퍼파라미터<br />
              • 학습률<br />
              • 네트워크 설정값
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
      <Audio src={staticFile("audio/lesson-8-3/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          레지스터 → 공유 → 전역<br />
          빠른 메모리 활용 = 성능 향상
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          다음: 행렬 곱셈 최적화
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_3Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.hierarchy.start} durationInFrames={SCENE_TIMINGS.hierarchy.duration}><SceneHierarchy /></Sequence>
    <Sequence from={SCENE_TIMINGS.register.start} durationInFrames={SCENE_TIMINGS.register.duration}><SceneRegister /></Sequence>
    <Sequence from={SCENE_TIMINGS.shared.start} durationInFrames={SCENE_TIMINGS.shared.duration}><SceneShared /></Sequence>
    <Sequence from={SCENE_TIMINGS.global.start} durationInFrames={SCENE_TIMINGS.global.duration}><SceneGlobal /></Sequence>
    <Sequence from={SCENE_TIMINGS.constant.start} durationInFrames={SCENE_TIMINGS.constant.duration}><SceneConstant /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
