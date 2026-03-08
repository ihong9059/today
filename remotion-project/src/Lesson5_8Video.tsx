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
export const LESSON_5_8_DURATION = 5127;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 690 },
  why: { start: 690, duration: 648 },
  geometric: { start: 1338, duration: 703 },
  color: { start: 2041, duration: 753 },
  advanced: { start: 2794, duration: 734 },
  pytorch: { start: 3528, duration: 727 },
  outro: { start: 4255, duration: 872 },
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
        <div style={{ fontSize: 60, marginBottom: 20 }}>🔀</div>
        <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.light, marginBottom: 20, fontFamily: "Pretendard, sans-serif" }}>
          데이터 증강
        </div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)", fontFamily: "Pretendard, sans-serif" }}>
          학습 데이터를 인위적으로 확장하기
        </div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
          Level 5-8
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Why Augmentation
const WhyScene: React.FC = () => {
  const frame = useCurrentFrame();

  const reasons = [
    { icon: "📈", title: "데이터 부족 해결", desc: "적은 데이터로 많은 학습" },
    { icon: "🛡️", title: "과적합 방지", desc: "다양한 변형으로 일반화" },
    { icon: "🎯", title: "불변성 학습", desc: "위치/회전/색상에 강건" },
    { icon: "💡", title: "무료 데이터", desc: "라벨링 비용 없이 확장" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        왜 데이터 증강이 필요한가?
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {reasons.map((reason, i) => {
          const delay = i * 12;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          const scale = spring({ frame: frame - delay, fps: 30, from: 0.8, to: 1, durationInFrames: 20 });
          return (
            <div key={reason.title} style={{ opacity, transform: `scale(${scale})`, background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 30, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontSize: 50 }}>{reason.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 8, fontFamily: "Pretendard, sans-serif" }}>{reason.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif" }}>{reason.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Geometric Transforms
const GeometricScene: React.FC = () => {
  const frame = useCurrentFrame();

  const transforms = [
    { name: "Horizontal Flip", icon: "↔️", desc: "좌우 반전" },
    { name: "Vertical Flip", icon: "↕️", desc: "상하 반전" },
    { name: "Rotation", icon: "🔄", desc: "회전 (±30°)" },
    { name: "Random Crop", icon: "✂️", desc: "랜덤 자르기" },
    { name: "Resize", icon: "📐", desc: "크기 조정" },
    { name: "Affine", icon: "📏", desc: "기울이기" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        기하학적 변환
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 25 }}>
        {transforms.map((t, i) => {
          const delay = i * 8;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={t.name} style={{ opacity, background: "rgba(236,72,153,0.15)", borderRadius: 15, padding: 25, textAlign: "center" }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{t.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.light, marginBottom: 8, fontFamily: "Pretendard, sans-serif" }}>{t.name}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif" }}>{t.desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Color Transforms
const ColorScene: React.FC = () => {
  const frame = useCurrentFrame();

  const colorTransforms = [
    { name: "ColorJitter", params: "밝기, 대비, 채도, 색조", icon: "🎨" },
    { name: "Grayscale", params: "흑백 변환 (확률적)", icon: "⬛" },
    { name: "Normalize", params: "평균/표준편차 정규화", icon: "📊" },
    { name: "GaussianBlur", params: "가우시안 블러", icon: "🌫️" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        색상/픽셀 변환
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {colorTransforms.map((ct, i) => {
          const delay = i * 12;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          const slideUp = interpolate(frame, [delay, delay + 20], [30, 0], { extrapolateRight: "clamp" });
          return (
            <div key={ct.name} style={{ opacity, transform: `translateY(${slideUp}px)`, background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 30, display: "flex", alignItems: "center", gap: 25 }}>
              <div style={{ fontSize: 60 }}>{ct.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 10, fontFamily: "Pretendard, sans-serif" }}>{ct.name}</div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif" }}>{ct.params}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Advanced Techniques
const AdvancedScene: React.FC = () => {
  const frame = useCurrentFrame();

  const advanced = [
    { name: "Cutout", desc: "이미지 일부를 검은색으로 가림", effect: "강건성 향상" },
    { name: "Mixup", desc: "두 이미지와 레이블 혼합", effect: "일반화 향상" },
    { name: "CutMix", desc: "다른 이미지 일부를 붙여넣기", effect: "정확도 향상" },
    { name: "AutoAugment", desc: "자동으로 최적 정책 탐색", effect: "성능 최적화" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        고급 증강 기법
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {advanced.map((adv, i) => {
          const delay = i * 12;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          const slideIn = interpolate(frame, [delay, delay + 20], [-50, 0], { extrapolateRight: "clamp" });
          return (
            <div key={adv.name} style={{ opacity, transform: `translateX(${slideIn}px)`, background: "rgba(236,72,153,0.15)", borderRadius: 15, padding: "20px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 700 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, minWidth: 130, fontFamily: "Pretendard, sans-serif" }}>{adv.name}</div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", fontFamily: "Pretendard, sans-serif" }}>{adv.desc}</div>
              </div>
              <div style={{ background: COLORS.gradient, padding: "8px 20px", borderRadius: 20, fontSize: 18, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>{adv.effect}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: PyTorch Implementation
const PytorchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  const codeLines = [
    "train_transform = transforms.Compose([",
    "    transforms.RandomHorizontalFlip(),",
    "    transforms.RandomCrop(32, padding=4),",
    "    transforms.ColorJitter(0.2, 0.2, 0.2),",
    "    transforms.ToTensor(),",
    "    transforms.Normalize(mean, std)",
    "])",
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 40, fontFamily: "Pretendard, sans-serif" }}>
        PyTorch 구현
      </div>
      <div style={{ opacity, background: "rgba(0,0,0,0.5)", borderRadius: 20, padding: 40, border: `2px solid ${COLORS.primary}` }}>
        {codeLines.map((line, i) => {
          const lineOpacity = interpolate(frame, [20 + i * 10, 30 + i * 10], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ opacity: lineOpacity, fontSize: 24, color: COLORS.light, fontFamily: "monospace", marginBottom: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.5)", marginRight: 20 }}>{i + 1}</span>
              <span style={{ color: line.includes("transforms.") ? COLORS.primary : COLORS.light }}>{line}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 40, display: "flex", gap: 30 }}>
        {["훈련 시에만 적용", "테스트 시 원본 사용", "순서 중요"].map((tip, i) => (
          <div key={i} style={{ background: "rgba(236,72,153,0.2)", padding: "12px 25px", borderRadius: 10, fontSize: 20, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
            {tip}
          </div>
        ))}
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

  const keyPoints = ["기하학적 변환: 회전, 반전, 자르기", "색상 변환: ColorJitter, Normalize", "고급 기법: Cutout, Mixup, CutMix", "훈련 시에만 적용"];

  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ textAlign: "center", opacity, transform: `scale(${scale})` }}>
        <div style={{ fontSize: 50, fontWeight: 700, color: COLORS.light, marginBottom: 40, fontFamily: "Pretendard, sans-serif" }}>
          Level 5 완료!
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {keyPoints.map((point, i) => {
            const pointOpacity = interpolate(frame, [20 + i * 10, 30 + i * 10], [0, 1], { extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity: pointOpacity, fontSize: 30, color: COLORS.light, background: "rgba(0,0,0,0.2)", padding: "15px 40px", borderRadius: 50, fontFamily: "Pretendard, sans-serif" }}>
                ✓ {point}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 50, fontSize: 28, color: "rgba(255,255,255,0.9)", fontFamily: "Pretendard, sans-serif" }}>
          CNN & 이미지 처리 마스터!
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson5_8Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Audio */}
      <Audio src={staticFile("audio/lesson-5-8/scene1_intro.mp3")} startFrom={0} />
      <Sequence from={SCENE_TIMINGS.why.start}>
        <Audio src={staticFile("audio/lesson-5-8/scene2_why.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.geometric.start}>
        <Audio src={staticFile("audio/lesson-5-8/scene3_geometric.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.color.start}>
        <Audio src={staticFile("audio/lesson-5-8/scene4_color.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.advanced.start}>
        <Audio src={staticFile("audio/lesson-5-8/scene5_advanced.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.pytorch.start}>
        <Audio src={staticFile("audio/lesson-5-8/scene6_pytorch.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start}>
        <Audio src={staticFile("audio/lesson-5-8/scene7_outro.mp3")} />
      </Sequence>

      {/* Scenes */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.why.start} durationInFrames={SCENE_TIMINGS.why.duration}>
        <WhyScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.geometric.start} durationInFrames={SCENE_TIMINGS.geometric.duration}>
        <GeometricScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.color.start} durationInFrames={SCENE_TIMINGS.color.duration}>
        <ColorScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.advanced.start} durationInFrames={SCENE_TIMINGS.advanced.duration}>
        <AdvancedScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.pytorch.start} durationInFrames={SCENE_TIMINGS.pytorch.duration}>
        <PytorchScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
