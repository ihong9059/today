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
export const LESSON_4_7_DURATION = 5853;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 803 },
  state_dict: { start: 803, duration: 886 },
  full_model: { start: 1689, duration: 791 },
  checkpoint: { start: 2480, duration: 840 },
  device: { start: 3320, duration: 863 },
  practical: { start: 4183, duration: 731 },
  outro: { start: 4914, duration: 939 },
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
          💾
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
          모델 저장과 로드
        </div>
        <div
          style={{
            fontSize: 40,
            color: COLORS.primary,
            fontWeight: 600,
          }}
        >
          학습된 모델을 저장하고 다시 사용하기
        </div>
        <div
          style={{
            marginTop: 50,
            background: COLORS.codeBackground,
            padding: "25px 50px",
            borderRadius: 20,
            fontSize: 30,
            color: COLORS.accent,
          }}
        >
          🎮 게임 세이브와 같아요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: State Dict
const Scene2StateDict: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const advantages = [
    { icon: "📦", text: "파일 크기가 작음" },
    { icon: "🔄", text: "PyTorch 버전에 덜 의존" },
    { icon: "🛠️", text: "코드 변경에 유연" },
    { icon: "🎯", text: "전이 학습에 적합" },
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
        <span style={{ fontSize: 70 }}>⭐</span> state_dict 방식 (권장)
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 30,
          marginBottom: 40,
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 26, color: COLORS.textSecondary, marginBottom: 15 }}># 저장</div>
        <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>
          torch.save(model.state_dict(), "model.pth")
        </div>
        <div style={{ fontSize: 26, color: COLORS.textSecondary, marginBottom: 15 }}># 로드</div>
        <div style={{ fontSize: 28, color: COLORS.accent }}>
          model.load_state_dict(torch.load("model.pth"))
        </div>
      </div>

      <div style={{ fontSize: 36, color: COLORS.primary, marginBottom: 25, fontWeight: 700 }}>
        장점 4가지
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {advantages.map((adv, i) => {
          const delay = 60 + i * 20;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                background: `linear-gradient(135deg, ${COLORS.codeBackground}, #2d3748)`,
                padding: "20px 30px",
                borderRadius: 15,
                display: "flex",
                alignItems: "center",
                gap: 15,
                transform: `scale(${Math.min(scale, 1)})`,
                border: `2px solid ${COLORS.primary}`,
              }}
            >
              <span style={{ fontSize: 40 }}>{adv.icon}</span>
              <span style={{ fontSize: 26, color: COLORS.text }}>{adv.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Full Model
const Scene3FullModel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const disadvantages = [
    "파일 크기가 큼",
    "Python 버전에 의존",
    "코드 구조 변경 시 로드 실패",
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
        <span style={{ fontSize: 70 }}>⚠️</span> 전체 모델 저장 (비권장)
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 30,
          marginBottom: 40,
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 26, color: COLORS.textSecondary, marginBottom: 15 }}># 저장 (구조 + 가중치)</div>
        <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20 }}>
          torch.save(model, "full_model.pth")
        </div>
        <div style={{ fontSize: 26, color: COLORS.textSecondary, marginBottom: 15 }}># 로드</div>
        <div style={{ fontSize: 28, color: COLORS.accent }}>
          model = torch.load("full_model.pth")
        </div>
      </div>

      <div style={{ fontSize: 36, color: "#dc2626", marginBottom: 25, fontWeight: 700 }}>
        ❌ 단점
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {disadvantages.map((dis, i) => {
          const delay = 50 + i * 20;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                background: "rgba(220, 38, 38, 0.1)",
                padding: "20px 30px",
                borderRadius: 15,
                borderLeft: "4px solid #dc2626",
                opacity,
              }}
            >
              <span style={{ fontSize: 28, color: COLORS.text }}>• {dis}</span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          background: "rgba(251, 191, 36, 0.1)",
          borderRadius: 15,
          borderLeft: `4px solid ${COLORS.accent}`,
        }}
      >
        <span style={{ fontSize: 24, color: COLORS.accent }}>
          💡 간단한 테스트나 임시 저장에만 사용하세요
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Checkpoint
const Scene4Checkpoint: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const contents = [
    { key: "model_state_dict", desc: "모델 가중치" },
    { key: "optimizer_state_dict", desc: "옵티마이저 상태" },
    { key: "epoch", desc: "에폭 번호" },
    { key: "loss", desc: "손실 값" },
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
        <span style={{ fontSize: 70 }}>🎮</span> 체크포인트 (풀 세이브)
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 15 }}>
          학습 상태 전체를 저장
        </div>
        <div style={{ fontSize: 24, color: COLORS.textSecondary }}>
          학습이 중단되어도 이어서 학습 가능!
        </div>
      </div>

      <div style={{ fontSize: 32, color: COLORS.primary, marginBottom: 20, fontWeight: 700 }}>
        체크포인트에 포함할 내용
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {contents.map((item, i) => {
          const delay = 40 + i * 20;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          return (
            <div
              key={item.key}
              style={{
                background: COLORS.codeBackground,
                padding: 25,
                borderRadius: 15,
                transform: `scale(${Math.min(scale, 1)})`,
                borderLeft: `4px solid ${COLORS.accent}`,
              }}
            >
              <div style={{ fontSize: 24, color: COLORS.accent, fontFamily: "monospace", marginBottom: 8 }}>
                {item.key}
              </div>
              <div style={{ fontSize: 22, color: COLORS.textSecondary }}>{item.desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Device Transfer
const Scene5Device: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

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
        <span style={{ fontSize: 70 }}>🔀</span> 디바이스 간 이동
      </div>

      <div style={{ display: "flex", gap: 30, marginBottom: 40 }}>
        <div
          style={{
            flex: 1,
            background: `linear-gradient(135deg, ${COLORS.codeBackground}, #1a365d)`,
            padding: 30,
            borderRadius: 20,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 15 }}>🖥️</div>
          <div style={{ fontSize: 28, color: COLORS.text, fontWeight: 700, marginBottom: 15 }}>GPU → CPU</div>
          <div
            style={{
              fontSize: 22,
              color: COLORS.accent,
              fontFamily: "monospace",
              background: "rgba(0,0,0,0.3)",
              padding: 15,
              borderRadius: 10,
            }}
          >
            map_location="cpu"
          </div>
        </div>

        <div
          style={{
            flex: 1,
            background: `linear-gradient(135deg, ${COLORS.codeBackground}, #065f46)`,
            padding: 30,
            borderRadius: 20,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 15 }}>🎮</div>
          <div style={{ fontSize: 28, color: COLORS.text, fontWeight: 700, marginBottom: 15 }}>CPU → GPU</div>
          <div
            style={{
              fontSize: 22,
              color: COLORS.accent,
              fontFamily: "monospace",
              background: "rgba(0,0,0,0.3)",
              padding: 15,
              borderRadius: 10,
            }}
          >
            map_location="cuda:0"
          </div>
        </div>
      </div>

      <div
        style={{
          background: COLORS.codeBackground,
          padding: 30,
          borderRadius: 20,
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 24, color: COLORS.textSecondary, marginBottom: 10 }}>예시 코드</div>
        <div style={{ fontSize: 26, color: COLORS.accent }}>
          model.load_state_dict(torch.load("model.pth", map_location="cpu"))
        </div>
      </div>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          background: "rgba(249, 115, 22, 0.1)",
          borderRadius: 15,
          borderLeft: `4px solid ${COLORS.primary}`,
        }}
      >
        <span style={{ fontSize: 24, color: COLORS.text }}>
          💡 다른 사람에게 모델 공유 시 특히 중요!
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Practical Strategy
const Scene6Practical: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const strategies = [
    { icon: "🏆", title: "최고 성능 모델", desc: "검증 손실이 가장 낮을 때 저장" },
    { icon: "💾", title: "주기적 체크포인트", desc: "매 에폭 또는 몇 에폭마다 저장" },
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
        <span style={{ fontSize: 70 }}>💼</span> 실무 전략
      </div>

      <div style={{ fontSize: 32, color: COLORS.accent, marginBottom: 30 }}>
        두 가지를 동시에 저장하세요!
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {strategies.map((strat, i) => {
          const delay = 40 + i * 30;
          const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
          return (
            <div
              key={i}
              style={{
                background: `linear-gradient(135deg, ${COLORS.codeBackground}, #2d3748)`,
                padding: 35,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 25,
                transform: `scale(${Math.min(scale, 1)})`,
                borderLeft: `4px solid ${COLORS.primary}`,
              }}
            >
              <div style={{ fontSize: 60 }}>{strat.icon}</div>
              <div>
                <div style={{ fontSize: 32, color: COLORS.text, fontWeight: 700, marginBottom: 10 }}>
                  {strat.title}
                </div>
                <div style={{ fontSize: 26, color: COLORS.textSecondary }}>{strat.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 40,
          background: COLORS.codeBackground,
          padding: 25,
          borderRadius: 15,
          fontFamily: "monospace",
          fontSize: 24,
          color: COLORS.accent,
        }}
      >
        💡 best_model_epoch10_loss0.123.pth
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
    { icon: "⭐", text: "state_dict 방식이 권장됨" },
    { icon: "🎮", text: "체크포인트로 학습 재개 가능" },
    { icon: "🔀", text: "map_location으로 디바이스 이동" },
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
        💾 모델 저장과 로드 정리
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 25, marginBottom: 40 }}>
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
          padding: 30,
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
          borderRadius: 20,
        }}
      >
        <div style={{ fontSize: 40, color: COLORS.text, fontWeight: 800 }}>
          🎉 Level 4 실전 프로젝트 완료!
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", marginTop: 15 }}>
          축하합니다! 다음 레벨에서 만나요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Video Component
export const Lesson4_7Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Audio tracks */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <Audio src={staticFile("audio/lesson-4-7/scene1_intro.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.state_dict.start} durationInFrames={SCENE_TIMINGS.state_dict.duration}>
        <Audio src={staticFile("audio/lesson-4-7/scene2_state_dict.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.full_model.start} durationInFrames={SCENE_TIMINGS.full_model.duration}>
        <Audio src={staticFile("audio/lesson-4-7/scene3_full_model.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.checkpoint.start} durationInFrames={SCENE_TIMINGS.checkpoint.duration}>
        <Audio src={staticFile("audio/lesson-4-7/scene4_checkpoint.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.device.start} durationInFrames={SCENE_TIMINGS.device.duration}>
        <Audio src={staticFile("audio/lesson-4-7/scene5_device.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.practical.start} durationInFrames={SCENE_TIMINGS.practical.duration}>
        <Audio src={staticFile("audio/lesson-4-7/scene6_practical.mp3")} />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}>
        <Audio src={staticFile("audio/lesson-4-7/scene7_outro.mp3")} />
      </Sequence>

      {/* Visual scenes */}
      <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}>
        <Scene1Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.state_dict.start} durationInFrames={SCENE_TIMINGS.state_dict.duration}>
        <Scene2StateDict />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.full_model.start} durationInFrames={SCENE_TIMINGS.full_model.duration}>
        <Scene3FullModel />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.checkpoint.start} durationInFrames={SCENE_TIMINGS.checkpoint.duration}>
        <Scene4Checkpoint />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.device.start} durationInFrames={SCENE_TIMINGS.device.duration}>
        <Scene5Device />
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
