import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_6_DURATION = 3547;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 430 },
  stream: { start: 430, duration: 490 },
  async: { start: 920, duration: 521 },
  overlap: { start: 1441, duration: 503 },
  sync: { start: 1944, duration: 555 },
  event: { start: 2499, duration: 496 },
  outro: { start: 2995, duration: 552 },
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
      <Audio src={staticFile("audio/lesson-8-6/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔀</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>스트림과 비동기 실행</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>GPU 활용 극대화</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-6
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneStream: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/stream.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CUDA Stream이란?</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>📋</div>
            <ul style={{ fontSize: 26, color: COLORS.light, lineHeight: 2 }}>
              <li>순서대로 실행되는 작업 큐</li>
              <li>같은 스트림 = 순차 실행</li>
              <li>다른 스트림 = 동시 실행 가능</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>예시 코드:</div>
            <pre style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>
{`cudaStream_t stream;
cudaStreamCreate(&stream);

kernel<<<grid, block, 0, stream>>>();

cudaStreamDestroy(stream);`}
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAsync: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/async.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>비동기 실행의 장점</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>💻</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>CPU 작업 계속</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>GPU 기다리지 않음</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🔄</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>오버랩 가능</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>전송 + 연산 동시</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>⏱️</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>시간 단축</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>전체 성능 향상</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOverlap: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/overlap.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>파이프라인 오버랩</h1>
        <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40, marginBottom: 30 }}>
          <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <div style={{ width: 120, fontSize: 20, color: COLORS.light }}>Stream 0:</div>
            <div style={{ flex: 1, display: "flex", gap: 5 }}>
              <div style={{ flex: 1, padding: 15, background: COLORS.primary, borderRadius: 8, textAlign: "center", color: COLORS.light }}>H→D</div>
              <div style={{ flex: 2, padding: 15, background: COLORS.secondary, borderRadius: 8, textAlign: "center", color: COLORS.light }}>Kernel</div>
              <div style={{ flex: 1, padding: 15, background: COLORS.accent, borderRadius: 8, textAlign: "center", color: COLORS.light }}>D→H</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ width: 120, fontSize: 20, color: COLORS.light }}>Stream 1:</div>
            <div style={{ flex: 1, display: "flex", gap: 5 }}>
              <div style={{ width: 80 }}></div>
              <div style={{ flex: 1, padding: 15, background: COLORS.primary, borderRadius: 8, textAlign: "center", color: COLORS.light }}>H→D</div>
              <div style={{ flex: 2, padding: 15, background: COLORS.secondary, borderRadius: 8, textAlign: "center", color: COLORS.light }}>Kernel</div>
              <div style={{ flex: 1, padding: 15, background: COLORS.accent, borderRadius: 8, textAlign: "center", color: COLORS.light }}>D→H</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 26, color: COLORS.light, textAlign: "center" }}>
          청크 단위로 나눠 처리 → 대기 시간 감소!
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSync: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/sync.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>동기화 방법</h1>
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginBottom: 15 }}>cudaStreamSynchronize</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>특정 스트림 완료 대기</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 28, color: COLORS.secondary, fontWeight: 700, marginBottom: 15 }}>cudaDeviceSynchronize</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>모든 스트림 완료 대기</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 28, color: COLORS.accent, fontWeight: 700, marginBottom: 15 }}>cudaEvent</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>세밀한 동기화 지점</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneEvent: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/event.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CUDA Event로 시간 측정</h1>
        <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
          <pre style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8, margin: 0 }}>
{`cudaEvent_t start, stop;
cudaEventCreate(&start);
cudaEventCreate(&stop);

cudaEventRecord(start);
kernel<<<grid, block>>>();
cudaEventRecord(stop);

cudaEventSynchronize(stop);
float ms;
cudaEventElapsedTime(&ms, start, stop);`}
          </pre>
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
      <Audio src={staticFile("audio/lesson-8-6/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          스트림으로 GPU 작업 병렬화<br />
          비동기 실행으로 성능 향상
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          다음: CUDA 성능 최적화
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_6Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.stream.start} durationInFrames={SCENE_TIMINGS.stream.duration}><SceneStream /></Sequence>
    <Sequence from={SCENE_TIMINGS.async.start} durationInFrames={SCENE_TIMINGS.async.duration}><SceneAsync /></Sequence>
    <Sequence from={SCENE_TIMINGS.overlap.start} durationInFrames={SCENE_TIMINGS.overlap.duration}><SceneOverlap /></Sequence>
    <Sequence from={SCENE_TIMINGS.sync.start} durationInFrames={SCENE_TIMINGS.sync.duration}><SceneSync /></Sequence>
    <Sequence from={SCENE_TIMINGS.event.start} durationInFrames={SCENE_TIMINGS.event.duration}><SceneEvent /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
