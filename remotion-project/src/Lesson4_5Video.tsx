import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  spring,
} from "remotion";

// Duration based on audio analysis
export const LESSON_4_5_DURATION = 6174;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 690 },
  dataset: { start: 690, duration: 876 },
  dataloader: { start: 1566, duration: 719 },
  parameters: { start: 2285, duration: 1085 },
  transforms: { start: 3370, duration: 956 },
  practical: { start: 4326, duration: 825 },
  outro: { start: 5151, duration: 1023 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#f97316",
  secondary: "#ea580c",
  accent: "#fbbf24",
  text: "#f8fafc",
  textSecondary: "#94a3b8",
  codeBackground: "#1e293b",
  gradientStart: "#f97316",
  gradientEnd: "#dc2626",
};

// Global Overlay Component
const GlobalOverlay: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 1000,
        }}
      >
        <Img
          src={staticFile("images/logo.png")}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />
        <span
          style={{
            color: COLORS.text,
            fontSize: 24,
            fontWeight: 700,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          UTTEC-Lab
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          color: COLORS.textSecondary,
          fontSize: 20,
          fontFamily: "Pretendard, sans-serif",
          zIndex: 1000,
        }}
      >
        ai.uttec-lab.com
      </div>
    </>
  );
};

// Scene 1: Intro
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" });

  const iconScale = spring({ frame: frame - 15, fps, config: { damping: 12 } });

  const conceptsOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 150,
            marginBottom: 30,
            transform: `scale(${iconScale})`,
          }}
        >
          📦
        </div>
        <div
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: COLORS.text,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 20,
          }}
        >
          데이터 로딩
        </div>
        <div
          style={{
            fontSize: 40,
            color: COLORS.primary,
            fontWeight: 600,
          }}
        >
          Dataset & DataLoader 마스터하기
        </div>
        <div
          style={{
            display: "flex",
            gap: 30,
            marginTop: 60,
            justifyContent: "center",
            opacity: conceptsOpacity,
          }}
        >
          {["효율성", "배치 처리", "병렬 로딩"].map((concept, i) => (
            <div
              key={concept}
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                padding: "18px 40px",
                borderRadius: 50,
                fontSize: 28,
                color: COLORS.text,
                fontWeight: 600,
              }}
            >
              {concept}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Dataset Class
const Scene2Dataset: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const methods = [
    { name: "__init__", desc: "초기 설정", icon: "⚙️" },
    { name: "__len__", desc: "데이터셋 크기", icon: "📏" },
    { name: "__getitem__", desc: "데이터 가져오기", icon: "🎯" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 70,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 40,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 80 }}>📋</span> Dataset 클래스
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 40,
          marginBottom: 40,
        }}
      >
        <div style={{ fontSize: 32, color: COLORS.accent, marginBottom: 20 }}>
          데이터 하나를 어떻게 가져올 것인가를 정의
        </div>
        <div style={{ fontSize: 28, color: COLORS.textSecondary }}>
          비유: 창고에서 재료를 꺼내는 규칙
        </div>
      </div>

      <div style={{ fontSize: 40, color: COLORS.primary, marginBottom: 30, fontWeight: 700 }}>
        필수 메서드 3가지
      </div>

      <div style={{ display: "flex", gap: 30 }}>
        {methods.map((method, i) => {
          const delay = 60 + i * 30;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          return (
            <div
              key={method.name}
              style={{
                flex: 1,
                background: `linear-gradient(135deg, ${COLORS.codeBackground}, #2d3748)`,
                borderRadius: 20,
                padding: 35,
                transform: `scale(${Math.min(scale, 1)})`,
                border: `2px solid ${COLORS.primary}`,
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 15 }}>{method.icon}</div>
              <div style={{ fontSize: 32, color: COLORS.accent, fontFamily: "monospace", marginBottom: 10 }}>
                {method.name}
              </div>
              <div style={{ fontSize: 26, color: COLORS.textSecondary }}>{method.desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: DataLoader
const Scene3DataLoader: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const features = [
    { icon: "📦", label: "배치 묶기" },
    { icon: "🔀", label: "셔플" },
    { icon: "⚡", label: "병렬 처리" },
  ];

  // Animation for conveyor belt
  const conveyorOffset = (frame * 2) % 200;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 70,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 30,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 80 }}>🚚</span> DataLoader
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 35,
          marginBottom: 40,
        }}
      >
        <div style={{ fontSize: 32, color: COLORS.accent, marginBottom: 15 }}>
          레스토랑의 웨이터와 같은 역할
        </div>
        <div style={{ fontSize: 26, color: COLORS.textSecondary }}>
          Dataset(주방)에서 데이터를 가져와 모델(테이블)에 배달
        </div>
      </div>

      {/* Conveyor belt visualization */}
      <div
        style={{
          background: "#374151",
          height: 100,
          borderRadius: 20,
          marginBottom: 40,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: ((i * 200 - conveyorOffset + 1000) % 1000) - 100,
              width: 80,
              height: 60,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              borderRadius: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 30,
            }}
          >
            📊
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
        {features.map((feature, i) => {
          const delay = 40 + i * 25;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={feature.label}
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                padding: "25px 50px",
                borderRadius: 20,
                opacity,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 10 }}>{feature.icon}</div>
              <div style={{ fontSize: 28, color: COLORS.text, fontWeight: 600 }}>{feature.label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: DataLoader Parameters
const Scene4Parameters: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const params = [
    { name: "batch_size", desc: "한 번에 처리할 데이터 수", tip: "메모리 허용 범위에서 크게" },
    { name: "shuffle", desc: "데이터 섞기 여부", tip: "훈련: True, 테스트: False" },
    { name: "num_workers", desc: "병렬 로딩 프로세스 수", tip: "CPU 코어 수에 맞춰 설정" },
    { name: "pin_memory", desc: "GPU 전송 최적화", tip: "CUDA 사용 시 True" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 40,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>⚙️</span> DataLoader 파라미터
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25 }}>
        {params.map((param, i) => {
          const delay = 30 + i * 25;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          return (
            <div
              key={param.name}
              style={{
                background: COLORS.codeBackground,
                borderRadius: 20,
                padding: 30,
                transform: `scale(${Math.min(scale, 1)})`,
                borderLeft: `4px solid ${COLORS.primary}`,
              }}
            >
              <div style={{ fontSize: 30, color: COLORS.accent, fontFamily: "monospace", marginBottom: 12 }}>
                {param.name}
              </div>
              <div style={{ fontSize: 24, color: COLORS.text, marginBottom: 10 }}>{param.desc}</div>
              <div style={{ fontSize: 20, color: COLORS.textSecondary, fontStyle: "italic" }}>
                💡 {param.tip}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Transforms
const Scene5Transforms: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const transforms = [
    { name: "ToTensor()", desc: "이미지 → 텐서 변환", type: "필수" },
    { name: "Normalize()", desc: "평균/표준편차 정규화", type: "필수" },
    { name: "RandomFlip()", desc: "랜덤 좌우 반전", type: "증강" },
    { name: "RandomRotation()", desc: "랜덤 회전", type: "증강" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 30,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>🔄</span> Transforms (전처리 & 증강)
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 30,
          marginBottom: 40,
        }}
      >
        <div style={{ fontSize: 28, color: COLORS.accent }}>
          ⚠️ 훈련 데이터에만 증강 적용, 테스트는 원본 그대로!
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25 }}>
        {transforms.map((t, i) => {
          const delay = 40 + i * 20;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={t.name}
              style={{
                background: t.type === "필수"
                  ? `linear-gradient(135deg, ${COLORS.codeBackground}, #1a365d)`
                  : `linear-gradient(135deg, ${COLORS.codeBackground}, #2d3748)`,
                borderRadius: 20,
                padding: 30,
                opacity,
                border: `2px solid ${t.type === "필수" ? COLORS.accent : COLORS.primary}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 28, color: COLORS.accent, fontFamily: "monospace" }}>
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: t.type === "필수" ? COLORS.accent : COLORS.primary,
                    background: t.type === "필수" ? "rgba(251, 191, 36, 0.2)" : "rgba(249, 115, 22, 0.2)",
                    padding: "5px 15px",
                    borderRadius: 20,
                  }}
                >
                  {t.type}
                </div>
              </div>
              <div style={{ fontSize: 24, color: COLORS.textSecondary }}>{t.desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Practical Examples
const Scene6Practical: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const examples = [
    { name: "ImageFolder", desc: "폴더 구조 기반 이미지 로딩", icon: "🖼️" },
    { name: "CSV Dataset", desc: "pandas로 읽어서 텐서 변환", icon: "📊" },
    { name: "random_split", desc: "훈련/검증 데이터 분할", icon: "✂️" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 60,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 50,
          opacity: titleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span style={{ fontSize: 70 }}>💼</span> 실전 예제
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {examples.map((ex, i) => {
          const delay = 30 + i * 30;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          const slideX = interpolate(frame, [delay, delay + 25], [-100, 0], { extrapolateRight: "clamp" });
          return (
            <div
              key={ex.name}
              style={{
                background: `linear-gradient(135deg, ${COLORS.codeBackground}, #2d3748)`,
                borderRadius: 20,
                padding: 40,
                display: "flex",
                alignItems: "center",
                gap: 30,
                transform: `translateX(${slideX}px) scale(${Math.min(scale, 1)})`,
                borderLeft: `4px solid ${COLORS.primary}`,
              }}
            >
              <div style={{ fontSize: 60 }}>{ex.icon}</div>
              <div>
                <div style={{ fontSize: 36, color: COLORS.accent, fontWeight: 700, marginBottom: 10 }}>
                  {ex.name}
                </div>
                <div style={{ fontSize: 26, color: COLORS.textSecondary }}>{ex.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Outro
const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const summary = [
    { icon: "📋", text: "Dataset: __init__, __len__, __getitem__" },
    { icon: "🚚", text: "DataLoader: batch_size, shuffle, num_workers" },
    { icon: "🔄", text: "transforms: 전처리 & 데이터 증강" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, padding: 80 }}>
      <div
        style={{
          fontSize: 70,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 50,
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        📦 데이터 로딩 정리
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 25, marginBottom: 50 }}>
        {summary.map((item, i) => {
          const delay = 30 + i * 25;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                background: COLORS.codeBackground,
                borderRadius: 20,
                padding: 35,
                display: "flex",
                alignItems: "center",
                gap: 25,
                opacity,
              }}
            >
              <div style={{ fontSize: 50 }}>{item.icon}</div>
              <div style={{ fontSize: 32, color: COLORS.text }}>{item.text}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 30,
        }}
      >
        <div
          style={{
            fontSize: 36,
            color: COLORS.primary,
            fontWeight: 600,
          }}
        >
          다음 레슨: 학습 루프 🔄
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Video Component
export const Lesson4_5Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <Audio src={staticFile("audio/lesson-4-5/scene1_intro.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.dataset.start} durationInFrames={SCENE_TIMINGS.dataset.duration}>
        <Audio src={staticFile("audio/lesson-4-5/scene2_dataset.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.dataloader.start} durationInFrames={SCENE_TIMINGS.dataloader.duration}>
        <Audio src={staticFile("audio/lesson-4-5/scene3_dataloader.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.parameters.start} durationInFrames={SCENE_TIMINGS.parameters.duration}>
        <Audio src={staticFile("audio/lesson-4-5/scene4_parameters.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.transforms.start} durationInFrames={SCENE_TIMINGS.transforms.duration}>
        <Audio src={staticFile("audio/lesson-4-5/scene5_transforms.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.practical.start} durationInFrames={SCENE_TIMINGS.practical.duration}>
        <Audio src={staticFile("audio/lesson-4-5/scene6_practical.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <Audio src={staticFile("audio/lesson-4-5/scene7_outro.mp3")} />
      </Sequence>

      {/* Visual scenes */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.dataset.start} durationInFrames={SCENE_TIMINGS.dataset.duration}>
        <Scene2Dataset />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.dataloader.start} durationInFrames={SCENE_TIMINGS.dataloader.duration}>
        <Scene3DataLoader />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.parameters.start} durationInFrames={SCENE_TIMINGS.parameters.duration}>
        <Scene4Parameters />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.transforms.start} durationInFrames={SCENE_TIMINGS.transforms.duration}>
        <Scene5Transforms />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.practical.start} durationInFrames={SCENE_TIMINGS.practical.duration}>
        <Scene6Practical />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <Scene7Outro />
      </Sequence>

      {/* Global overlay */}
      <GlobalOverlay />
    </AbsoluteFill>
  );
};
