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
export const LESSON_5_7_DURATION = 4999;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 610 },
  concept: { start: 610, duration: 596 },
  methods: { start: 1206, duration: 785 },
  pretrained: { start: 1991, duration: 820 },
  finetuning: { start: 2811, duration: 715 },
  results: { start: 3526, duration: 648 },
  outro: { start: 4174, duration: 825 },
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
        <div style={{ fontSize: 60, marginBottom: 20 }}>🔄</div>
        <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.light, marginBottom: 20, fontFamily: "Pretendard, sans-serif" }}>
          전이 학습
        </div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)", fontFamily: "Pretendard, sans-serif" }}>
          사전 훈련 모델 활용하기
        </div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
          Level 5-7
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Concept
const ConceptScene: React.FC = () => {
  const frame = useCurrentFrame();

  const benefits = [
    { icon: "📊", title: "적은 데이터", desc: "수백~수천 장으로도 가능" },
    { icon: "⚡", title: "빠른 학습", desc: "처음부터보다 훨씬 빠름" },
    { icon: "🎯", title: "높은 성능", desc: "작은 데이터셋에서도 우수" },
    { icon: "💻", title: "컴퓨팅 절약", desc: "GPU 시간 대폭 감소" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 30, fontFamily: "Pretendard, sans-serif" }}>
        전이 학습의 이점
      </div>
      <div style={{ fontSize: 28, color: "rgba(255,255,255,0.8)", marginBottom: 50, fontFamily: "Pretendard, sans-serif", textAlign: "center" }}>
        "거인의 어깨 위에 서라"
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {benefits.map((benefit, i) => {
          const delay = i * 12;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          const scale = spring({ frame: frame - delay, fps: 30, from: 0.8, to: 1, durationInFrames: 20 });
          return (
            <div key={benefit.title} style={{ opacity, transform: `scale(${scale})`, background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 30, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontSize: 50 }}>{benefit.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 8, fontFamily: "Pretendard, sans-serif" }}>{benefit.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif" }}>{benefit.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Two Approaches
const MethodsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const methods = [
    {
      name: "특성 추출",
      subtitle: "Feature Extraction",
      layers: [
        { name: "Conv 레이어들", status: "동결" },
        { name: "새 FC 레이어", status: "학습" },
      ],
      when: "데이터가 적거나 비슷한 도메인",
    },
    {
      name: "미세 조정",
      subtitle: "Fine-tuning",
      layers: [
        { name: "초기 Conv", status: "동결" },
        { name: "후기 Conv", status: "학습 (작은 lr)" },
        { name: "FC 레이어", status: "학습" },
      ],
      when: "데이터 충분하거나 다른 도메인",
    },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        두 가지 접근 방식
      </div>
      <div style={{ display: "flex", gap: 50 }}>
        {methods.map((method, i) => {
          const delay = i * 30;
          const opacity = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: "clamp" });
          const slideIn = interpolate(frame, [delay, delay + 30], [50, 0], { extrapolateRight: "clamp" });
          return (
            <div key={method.name} style={{ opacity, transform: `translateX(${i === 0 ? -slideIn : slideIn}px)`, background: "rgba(236,72,153,0.1)", borderRadius: 20, padding: 35, minWidth: 350, border: `2px solid ${COLORS.primary}` }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.light, marginBottom: 5, fontFamily: "Pretendard, sans-serif" }}>{method.name}</div>
              <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 25, fontFamily: "Pretendard, sans-serif" }}>{method.subtitle}</div>
              {method.layers.map((layer, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, padding: "10px 15px", background: layer.status === "동결" ? "rgba(100,100,100,0.3)" : "rgba(236,72,153,0.3)", borderRadius: 8 }}>
                  <span style={{ fontSize: 20, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>{layer.name}</span>
                  <span style={{ fontSize: 20, color: layer.status === "동결" ? "rgba(255,255,255,0.5)" : COLORS.primary, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>{layer.status}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, fontSize: 18, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 15 }}>
                {method.when}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Pretrained Models
const PretrainedScene: React.FC = () => {
  const frame = useCurrentFrame();

  const models = [
    { name: "ResNet18", params: "11M", top1: "69.8%" },
    { name: "ResNet50", params: "25M", top1: "76.1%" },
    { name: "VGG16", params: "138M", top1: "71.6%" },
    { name: "EfficientNet-B0", params: "5M", top1: "77.1%" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        사전 훈련 모델 (torchvision)
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {models.map((model, i) => {
          const delay = i * 10;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={model.name} style={{ opacity, background: "rgba(236,72,153,0.15)", borderRadius: 15, padding: 25, display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 350 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>{model.name}</div>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", fontFamily: "Pretendard, sans-serif" }}>Params</div>
                  <div style={{ fontSize: 22, color: COLORS.light, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>{model.params}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", fontFamily: "Pretendard, sans-serif" }}>Top-1</div>
                  <div style={{ fontSize: 22, color: COLORS.primary, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>{model.top1}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 50, background: "rgba(0,0,0,0.3)", padding: "20px 40px", borderRadius: 10 }}>
        <code style={{ fontSize: 24, color: COLORS.primary, fontFamily: "monospace" }}>
          model = models.resnet18(weights='IMAGENET1K_V1')
        </code>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Fine-tuning Implementation
const FinetuningScene: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { step: 1, action: "모델 로드", code: "model = models.resnet18(weights=...)" },
    { step: 2, action: "파라미터 동결", code: "param.requires_grad = False" },
    { step: 3, action: "분류기 교체", code: "model.fc = nn.Linear(512, 10)" },
    { step: 4, action: "선택적 해동", code: "layer4.requires_grad = True" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        미세 조정 구현 단계
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {steps.map((step, i) => {
          const delay = i * 15;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          const slideIn = interpolate(frame, [delay, delay + 20], [-50, 0], { extrapolateRight: "clamp" });
          return (
            <div key={step.step} style={{ opacity, transform: `translateX(${slideIn}px)`, display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.gradient, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 24, fontWeight: 700, color: COLORS.light }}>
                {step.step}
              </div>
              <div style={{ background: "rgba(236,72,153,0.15)", borderRadius: 12, padding: "15px 25px", minWidth: 600, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 24, color: COLORS.light, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>{step.action}</span>
                <code style={{ fontSize: 18, color: COLORS.primary, fontFamily: "monospace" }}>{step.code}</code>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Results
const ResultsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const comparison = [
    { method: "처음부터 학습", accuracy: "60%", time: "2시간", data: "5000장" },
    { method: "특성 추출", accuracy: "85%", time: "10분", data: "500장" },
    { method: "미세 조정", accuracy: "92%", time: "30분", data: "1000장" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.primary, marginBottom: 50, fontFamily: "Pretendard, sans-serif" }}>
        전이 학습 효과
      </div>
      <div style={{ background: "rgba(236,72,153,0.1)", borderRadius: 20, padding: 40, border: `2px solid ${COLORS.primary}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "180px repeat(3, 120px)", gap: 25, marginBottom: 25 }}>
          {["방법", "정확도", "시간", "데이터"].map((header) => (
            <div key={header} style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>
              {header}
            </div>
          ))}
        </div>
        {comparison.map((row, i) => {
          const opacity = interpolate(frame, [i * 20, i * 20 + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={row.method} style={{ display: "grid", gridTemplateColumns: "180px repeat(3, 120px)", gap: 25, opacity, marginBottom: 20, padding: "15px 0", borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
              <div style={{ fontSize: 20, color: COLORS.light, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>{row.method}</div>
              <div style={{ fontSize: 24, color: i === 2 ? COLORS.primary : "rgba(255,255,255,0.8)", textAlign: "center", fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>{row.accuracy}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>{row.time}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>{row.data}</div>
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

  const keyPoints = ["사전 훈련된 모델 재활용", "특성 추출 vs 미세 조정", "적은 데이터로 높은 성능", "ResNet, VGG 등 활용"];

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
          다음: 데이터 증강
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson5_7Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Audio */}
      <Audio src={staticFile("audio/lesson-5-7/scene1_intro.mp3")} startFrom={0} />
      <Sequence from={SCENE_TIMINGS.concept.start}>
        <Audio src={staticFile("audio/lesson-5-7/scene2_concept.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.methods.start}>
        <Audio src={staticFile("audio/lesson-5-7/scene3_methods.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.pretrained.start}>
        <Audio src={staticFile("audio/lesson-5-7/scene4_pretrained.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.finetuning.start}>
        <Audio src={staticFile("audio/lesson-5-7/scene5_finetuning.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.results.start}>
        <Audio src={staticFile("audio/lesson-5-7/scene6_results.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start}>
        <Audio src={staticFile("audio/lesson-5-7/scene7_outro.mp3")} />
      </Sequence>

      {/* Scenes */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.concept.start} durationInFrames={SCENE_TIMINGS.concept.duration}>
        <ConceptScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.methods.start} durationInFrames={SCENE_TIMINGS.methods.duration}>
        <MethodsScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.pretrained.start} durationInFrames={SCENE_TIMINGS.pretrained.duration}>
        <PretrainedScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.finetuning.start} durationInFrames={SCENE_TIMINGS.finetuning.duration}>
        <FinetuningScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.results.start} durationInFrames={SCENE_TIMINGS.results.duration}>
        <ResultsScene />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
