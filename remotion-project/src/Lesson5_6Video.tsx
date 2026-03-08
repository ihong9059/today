import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

// Duration from audio analysis
export const LESSON_5_6_DURATION = 5048;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 677 },
  dataset: { start: 677, duration: 805 },
  augmentation: { start: 1482, duration: 595 },
  deeper_cnn: { start: 2077, duration: 810 },
  training: { start: 2887, duration: 783 },
  analysis: { start: 3670, duration: 610 },
  outro: { start: 4280, duration: 768 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#ec4899",
  secondary: "#db2777",
  accent: "#be185d",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, fontSize: 20, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif", zIndex: 100 }}>
      ai.uttec-lab.com
    </div>
  </>
);

// Scene 1: Intro
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, from: -50, to: 0, durationInFrames: 30 });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🎨</div>
        <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.light, marginBottom: 20, fontFamily: "Pretendard, sans-serif" }}>
          CNN 구현 (CIFAR-10)
        </div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)", fontFamily: "Pretendard, sans-serif" }}>
          컬러 이미지 분류 도전하기
        </div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
          Level 5-6
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Dataset Comparison
const DatasetScene: React.FC = () => {
  const frame = useCurrentFrame();

  const datasets = [
    { name: "MNIST", size: "28×28", color: "흑백", classes: "숫자 0-9", difficulty: "쉬움" },
    { name: "CIFAR-10", size: "32×32", color: "컬러", classes: "사물 10종", difficulty: "중간" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        MNIST vs CIFAR-10
      </div>
      <div style={{ display: "flex", gap: 60 }}>
        {datasets.map((ds, i) => {
          const slideIn = interpolate(frame, [i * 15, i * 15 + 30], [-100, 0], { extrapolateRight: "clamp" });
          const opacity = interpolate(frame, [i * 15, i * 15 + 30], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={ds.name} style={{ opacity, transform: `translateX(${slideIn}px)`, background: "rgba(236,72,153,0.1)", borderRadius: 20, padding: 40, border: `2px solid ${COLORS.primary}`, minWidth: 300 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.light, marginBottom: 30, textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>{ds.name}</div>
              {[
                { label: "크기", value: ds.size },
                { label: "색상", value: ds.color },
                { label: "클래스", value: ds.classes },
                { label: "난이도", value: ds.difficulty },
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: 15, fontFamily: "Pretendard, sans-serif" }}>
                  <span style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
                  <span style={{ fontSize: 24, color: COLORS.light, fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 50, fontSize: 28, color: COLORS.primary, fontFamily: "Pretendard, sans-serif" }}>
        CIFAR-10: 비행기, 자동차, 새, 고양이, 사슴, 개, 개구리, 말, 배, 트럭
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Data Augmentation
const AugmentationScene: React.FC = () => {
  const frame = useCurrentFrame();

  const techniques = [
    { name: "RandomHorizontalFlip", effect: "좌우 반전", icon: "↔️" },
    { name: "RandomCrop", effect: "랜덤 자르기", icon: "✂️" },
    { name: "RandomRotation", effect: "회전", icon: "🔄" },
    { name: "ColorJitter", effect: "색상 변환", icon: "🎨" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        데이터 증강 기법
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {techniques.map((tech, i) => {
          const delay = i * 10;
          const scale = spring({ frame: frame - delay, fps: 30, from: 0.8, to: 1, durationInFrames: 20 });
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={tech.name} style={{ opacity, transform: `scale(${scale})`, background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 30, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontSize: 50 }}>{tech.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 8, fontFamily: "Pretendard, sans-serif" }}>{tech.name}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif" }}>{tech.effect}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 50, fontSize: 26, color: "rgba(255,255,255,0.8)", fontFamily: "Pretendard, sans-serif", textAlign: "center" }}>
        학습 데이터를 인위적으로 늘려 과적합 방지
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Deeper CNN Architecture
const DeeperCNNScene: React.FC = () => {
  const frame = useCurrentFrame();

  const blocks = [
    { name: "Block 1", in: "3ch", out: "64ch", size: "32→16" },
    { name: "Block 2", in: "64ch", out: "128ch", size: "16→8" },
    { name: "Block 3", in: "128ch", out: "256ch", size: "8→4" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        CIFAR-10용 깊은 CNN
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        {blocks.map((block, i) => {
          const delay = i * 15;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          const slideUp = interpolate(frame, [delay, delay + 20], [30, 0], { extrapolateRight: "clamp" });
          return (
            <React.Fragment key={block.name}>
              <div style={{ opacity, transform: `translateY(${slideUp}px)`, background: COLORS.gradient, borderRadius: 15, padding: "30px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 15, fontFamily: "Pretendard, sans-serif" }}>{block.name}</div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", marginBottom: 8, fontFamily: "Pretendard, sans-serif" }}>{block.in} → {block.out}</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif" }}>{block.size}</div>
              </div>
              {i < blocks.length - 1 && (
                <div style={{ fontSize: 40, color: COLORS.primary, opacity }}>→</div>
              )}
            </React.Fragment>
          );
        })}
        <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>
        <div style={{ background: "rgba(236,72,153,0.2)", borderRadius: 15, padding: "30px 40px", textAlign: "center", border: `2px solid ${COLORS.primary}` }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 15, fontFamily: "Pretendard, sans-serif" }}>Classifier</div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", fontFamily: "Pretendard, sans-serif" }}>4096 → 512 → 10</div>
        </div>
      </div>
      <div style={{ marginTop: 50, fontSize: 24, color: "rgba(255,255,255,0.8)", fontFamily: "Pretendard, sans-serif" }}>
        각 블록: Conv × 2 + BN + ReLU + MaxPool
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Training Process
const TrainingScene: React.FC = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 200], [0, 100], { extrapolateRight: "clamp" });
  const epochs = Math.floor(interpolate(frame, [0, 200], [1, 20], { extrapolateRight: "clamp" }));
  const accuracy = interpolate(frame, [0, 200], [30, 85], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        학습 과정
      </div>
      <div style={{ display: "flex", gap: 60 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", marginBottom: 20, fontFamily: "Pretendard, sans-serif" }}>Epoch</div>
          <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>{epochs}/20</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", marginBottom: 20, fontFamily: "Pretendard, sans-serif" }}>Test Accuracy</div>
          <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.primary, fontFamily: "Pretendard, sans-serif" }}>{accuracy.toFixed(1)}%</div>
        </div>
      </div>
      <div style={{ marginTop: 50, width: 600, height: 20, background: "rgba(255,255,255,0.2)", borderRadius: 10 }}>
        <div style={{ width: `${progress}%`, height: "100%", background: COLORS.gradient, borderRadius: 10, transition: "width 0.3s" }} />
      </div>
      <div style={{ marginTop: 40, display: "flex", gap: 40 }}>
        {[
          { label: "Optimizer", value: "Adam" },
          { label: "Learning Rate", value: "0.001" },
          { label: "Scheduler", value: "StepLR" },
        ].map((item) => (
          <div key={item.label} style={{ background: "rgba(236,72,153,0.15)", padding: "15px 30px", borderRadius: 10 }}>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif" }}>{item.label}</div>
            <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>{item.value}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Analysis
const AnalysisScene: React.FC = () => {
  const frame = useCurrentFrame();

  const comparison = [
    { model: "MNIST CNN", input: "1×28×28", blocks: "2개", augment: "불필요", target: "99%+" },
    { model: "CIFAR-10 CNN", input: "3×32×32", blocks: "3개", augment: "필수", target: "85%+" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        CNN 비교 분석
      </div>
      <div style={{ background: "rgba(236,72,153,0.1)", borderRadius: 20, padding: 40, border: `2px solid ${COLORS.primary}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "150px repeat(4, 120px)", gap: 20, marginBottom: 20 }}>
          {["모델", "입력", "블록", "증강", "목표"].map((header) => (
            <div key={header} style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>
              {header}
            </div>
          ))}
        </div>
        {comparison.map((row, i) => {
          const opacity = interpolate(frame, [i * 20, i * 20 + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={row.model} style={{ display: "grid", gridTemplateColumns: "150px repeat(4, 120px)", gap: 20, opacity, marginBottom: 15 }}>
              <div style={{ fontSize: 20, color: COLORS.light, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>{row.model}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>{row.input}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>{row.blocks}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>{row.augment}</div>
              <div style={{ fontSize: 20, color: COLORS.primary, textAlign: "center", fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>{row.target}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Outro
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, from: 0.9, to: 1, durationInFrames: 30 });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const keyPoints = ["CIFAR-10: 컬러 이미지 분류", "데이터 증강으로 과적합 방지", "더 깊은 CNN 아키텍처", "85%+ 정확도 달성"];

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ textAlign: "center", opacity, transform: `scale(${scale})` }}>
        <div style={{ fontSize: 50, fontWeight: 700, color: COLORS.light, marginBottom: 40, fontFamily: "Pretendard, sans-serif" }}>
          핵심 정리
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {keyPoints.map((point, i) => {
            const pointOpacity = interpolate(frame, [20 + i * 10, 30 + i * 10], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: pointOpacity, fontSize: 32, color: COLORS.light, background: "rgba(0,0,0,0.2)", padding: "15px 40px", borderRadius: 50, fontFamily: "Pretendard, sans-serif" }}>
                ✓ {point}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 50, fontSize: 28, color: "rgba(255,255,255,0.9)", fontFamily: "Pretendard, sans-serif" }}>
          다음: 전이 학습
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson5_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Audio */}
      <Audio src={staticFile("audio/lesson-5-6/scene1_intro.mp3")} startFrom={0} />
      <Sequence from={SCENE_TIMINGS.dataset.start}>
        <Audio src={staticFile("audio/lesson-5-6/scene2_dataset.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.augmentation.start}>
        <Audio src={staticFile("audio/lesson-5-6/scene3_augmentation.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.deeper_cnn.start}>
        <Audio src={staticFile("audio/lesson-5-6/scene4_deeper_cnn.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.training.start}>
        <Audio src={staticFile("audio/lesson-5-6/scene5_training.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.analysis.start}>
        <Audio src={staticFile("audio/lesson-5-6/scene6_analysis.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start}>
        <Audio src={staticFile("audio/lesson-5-6/scene7_outro.mp3")} />
      </Sequence>

      {/* Scenes */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.dataset.start} durationInFrames={SCENE_TIMINGS.dataset.duration}>
        <DatasetScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.augmentation.start} durationInFrames={SCENE_TIMINGS.augmentation.duration}>
        <AugmentationScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.deeper_cnn.start} durationInFrames={SCENE_TIMINGS.deeper_cnn.duration}>
        <DeeperCNNScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}>
        <TrainingScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.analysis.start} durationInFrames={SCENE_TIMINGS.analysis.duration}>
        <AnalysisScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
