import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_5_DURATION = 4215;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 503 },
  precision: { start: 503, duration: 759 },
  why: { start: 1262, duration: 541 },
  amp: { start: 1803, duration: 655 },
  scaling: { start: 2458, duration: 641 },
  bf16: { start: 3099, duration: 548 },
  outro: { start: 3647, duration: 568 },
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
      <Audio src={staticFile("audio/lesson-8-5/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>⚡</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>Mixed Precision 훈련</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>숫자 정밀도로 속도 향상</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-5
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePrecision: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/precision.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>부동소수점 정밀도</h1>
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 15 }}>FP32</div>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 10 }}>32비트</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>높은 정밀도<br />넓은 범위</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.secondary, marginBottom: 15 }}>FP16</div>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 10 }}>16비트</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>절반 메모리<br />좁은 범위</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.accent, marginBottom: 15 }}>BF16</div>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 10 }}>16비트</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>FP32 지수범위<br />Brain Float</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneWhy: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/why.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>왜 Mixed Precision?</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>💾</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>메모리 절반</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>더 큰 배치 가능</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🚀</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>2배+ 속도</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>Tensor Core 활용</div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🤖</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>대용량 모델</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>LLM 학습 필수</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAmp: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/amp.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>PyTorch AMP 사용</h1>
        <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
          <pre style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8, margin: 0 }}>
{`from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()

for data, target in loader:
    with autocast():           # FP16 자동 적용
        output = model(data)
        loss = criterion(output, target)

    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()`}
          </pre>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneScaling: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/scaling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Loss Scaling</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, color: COLORS.light, marginBottom: 30 }}>문제: FP16 언더플로우</div>
            <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 15, padding: 25, marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
                작은 그래디언트 → 0으로 반올림
              </div>
            </div>
            <div style={{ fontSize: 28, color: COLORS.light, marginBottom: 30, marginTop: 40 }}>해결: 스케일링</div>
            <div style={{ background: "rgba(244,63,94,0.1)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
                Loss × 큰 값 → 역전파 → ÷ 원복
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 150 }}>⚖️</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBf16: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/bf16.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>BF16의 장점</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🧠</div>
            <ul style={{ fontSize: 26, color: COLORS.light, lineHeight: 2 }}>
              <li>FP32와 같은 지수 범위</li>
              <li>오버플로우 거의 없음</li>
              <li>Loss Scaling 불필요</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>지원 GPU:</div>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              • NVIDIA A100+<br />
              • NVIDIA H100<br />
              • AMD MI300
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
      <Audio src={staticFile("audio/lesson-8-5/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          Mixed Precision으로 2배 이상 속도 향상<br />
          메모리 효율과 성능을 동시에!
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          다음: 스트림과 비동기 실행
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_5Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.precision.start} durationInFrames={SCENE_TIMINGS.precision.duration}><ScenePrecision /></Sequence>
    <Sequence from={SCENE_TIMINGS.why.start} durationInFrames={SCENE_TIMINGS.why.duration}><SceneWhy /></Sequence>
    <Sequence from={SCENE_TIMINGS.amp.start} durationInFrames={SCENE_TIMINGS.amp.duration}><SceneAmp /></Sequence>
    <Sequence from={SCENE_TIMINGS.scaling.start} durationInFrames={SCENE_TIMINGS.scaling.duration}><SceneScaling /></Sequence>
    <Sequence from={SCENE_TIMINGS.bf16.start} durationInFrames={SCENE_TIMINGS.bf16.duration}><SceneBf16 /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
