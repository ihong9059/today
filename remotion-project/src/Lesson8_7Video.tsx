import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_7_DURATION = 3788;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 459 },
  occupancy: { start: 459, duration: 546 },
  coalescing: { start: 1005, duration: 605 },
  divergence: { start: 1610, duration: 563 },
  bank: { start: 2173, duration: 534 },
  profiling: { start: 2707, duration: 494 },
  outro: { start: 3201, duration: 587 },
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
      <Audio src={staticFile("audio/lesson-8-7/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔧</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>CUDA 성능 최적화</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>GPU 성능 최대화</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-7
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOccupancy: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/occupancy.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Occupancy (점유율)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>📊</div>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>SM의 활성 워프 비율</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>100%가 항상 최선은 아님</li>
              <li>레지스터/공유메모리 영향</li>
              <li>적절한 균형이 중요</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>CUDA Occupancy Calculator</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              • 블록 크기 조정<br />
              • 레지스터 사용량 확인<br />
              • 최적값 탐색
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCoalescing: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/coalescing.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Memory Coalescing</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(0,200,100,0.2)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 28, color: "#4ade80", fontWeight: 700, marginBottom: 15 }}>Coalesced (좋음)</div>
            <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 20 }}>연속 스레드 → 연속 메모리</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ flex: 1, padding: 15, background: "#4ade80", borderRadius: 8, textAlign: "center", color: "#000" }}>T{i}→[{i}]</div>
              ))}
            </div>
            <div style={{ fontSize: 20, color: "#4ade80", marginTop: 15 }}>1 트랜잭션</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.2)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginBottom: 15 }}>Strided (나쁨)</div>
            <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 20 }}>연속 스레드 → 떨어진 메모리</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ flex: 1, padding: 15, background: COLORS.primary, borderRadius: 8, textAlign: "center", color: COLORS.light }}>T{i}→[{i*32}]</div>
              ))}
            </div>
            <div style={{ fontSize: 20, color: COLORS.primary, marginTop: 15 }}>최대 32배 느림</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDivergence: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/divergence.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Branch Divergence</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>⚠️</div>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>문제점</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              워프 내 스레드가 다른 분기<br />
              → 순차 실행됨<br />
              → 병렬성 감소
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(0,200,100,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>✅</div>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>해결책</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              조건문 최소화<br />
              워프 단위로 일관된 분기<br />
              모든 스레드 병렬 실행
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBank: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/bank.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Shared Memory Bank Conflict</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>Shared Memory는 32개 뱅크</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 5, marginBottom: 30 }}>
              {Array(32).fill(0).map((_, i) => (
                <div key={i} style={{ padding: 10, background: i < 4 ? COLORS.primary : "rgba(244,63,94,0.3)", borderRadius: 5, textAlign: "center", color: COLORS.light, fontSize: 14 }}>B{i}</div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>Bank Conflict 발생시:</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              • 같은 뱅크 동시 접근<br />
              • 순차 처리됨<br />
              • 인덱싱 조정으로 해결
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneProfiling: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/profiling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>프로파일링으로 병목 찾기</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>📈</div>
            <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700 }}>Nsight Systems</div>
            <div style={{ fontSize: 22, color: COLORS.light, marginTop: 15 }}>전체 흐름 분석<br />타임라인 시각화</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🔬</div>
            <div style={{ fontSize: 28, color: COLORS.secondary, fontWeight: 700 }}>Nsight Compute</div>
            <div style={{ fontSize: 22, color: COLORS.light, marginTop: 15 }}>커널 세부 분석<br />메모리/연산 효율</div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 40, fontSize: 28, color: COLORS.light }}>
          "측정 없이 최적화하지 마세요!"
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
      <Audio src={staticFile("audio/lesson-8-7/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>🎉</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>Level 8 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          GPU 병렬 컴퓨팅 마스터<br />
          효율적인 CUDA 코드 작성 가능
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          다음 레벨에서 계속!
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_7Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.occupancy.start} durationInFrames={SCENE_TIMINGS.occupancy.duration}><SceneOccupancy /></Sequence>
    <Sequence from={SCENE_TIMINGS.coalescing.start} durationInFrames={SCENE_TIMINGS.coalescing.duration}><SceneCoalescing /></Sequence>
    <Sequence from={SCENE_TIMINGS.divergence.start} durationInFrames={SCENE_TIMINGS.divergence.duration}><SceneDivergence /></Sequence>
    <Sequence from={SCENE_TIMINGS.bank.start} durationInFrames={SCENE_TIMINGS.bank.duration}><SceneBank /></Sequence>
    <Sequence from={SCENE_TIMINGS.profiling.start} durationInFrames={SCENE_TIMINGS.profiling.duration}><SceneProfiling /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
