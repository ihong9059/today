import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_2_DURATION = 4969;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 671 },
  mlp_vs_cnn: { start: 671, duration: 729 },
  convolution: { start: 1400, duration: 635 },
  kernel: { start: 2035, duration: 607 },
  stride_padding: { start: 2642, duration: 823 },
  pytorch: { start: 3465, duration: 766 },
  outro: { start: 4231, duration: 738 },
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
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, fontFamily: "Pretendard, sans-serif", zIndex: 100 }}>ai.uttec-lab.com</div>
  </>
);

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-2/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔍</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>합성곱 연산</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>CNN의 핵심 연산 이해하기</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>Level 5-2</div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMlpVsCnn: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene2_mlp_vs_cnn.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>MLP vs CNN</h1>
      <div style={{ display: "flex", gap: 40 }}>
        {[
          { title: "MLP", items: ["이미지를 1D로 펼침", "공간 정보 손실", "파라미터 매우 많음", "위치 불변성 없음"], color: "rgba(239,68,68,0.2)" },
          { title: "CNN", items: ["2D 구조 유지", "공간 정보 보존", "파라미터 적음 (가중치 공유)", "위치 불변성 있음"], color: "rgba(34,197,94,0.2)" }
        ].map((col, i) => (
          <div key={i} style={{ flex: 1, background: col.color, borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 36, color: COLORS.light, marginBottom: 25 }}>{col.title}</h2>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2.2 }}>
              {col.items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const SceneConvolution: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-2/scene3_convolution.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>합성곱 계산</h1>
        <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>이미지 영역</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
              {[1, 2, 3, 0, 1, 2, 1, 2, 1].map((v, i) => (
                <div key={i} style={{ width: 60, height: 60, background: "rgba(255,255,255,0.1)", borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 28, color: COLORS.light }}>{v}</div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 60, color: COLORS.primary }}>×</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>커널</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
              {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((v, i) => (
                <div key={i} style={{ width: 60, height: 60, background: COLORS.primary, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 28, color: COLORS.light }}>{v}</div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 60, color: COLORS.primary }}>=</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>결과</div>
            <div style={{ width: 100, height: 100, background: "rgba(34,197,94,0.3)", borderRadius: 15, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 48, color: "#22c55e", fontWeight: 700 }}>8</div>
          </div>
        </div>
        <div style={{ marginTop: 40, background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 25, fontSize: 22, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>
          (1×1) + (2×0) + (3×1) + (0×0) + (1×1) + (2×0) + (1×1) + (2×0) + (1×1) = <span style={{ color: "#22c55e", fontWeight: 700 }}>8</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneKernel: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene4_kernel.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>커널(필터)의 역할</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {[
          { title: "수평 엣지", desc: "가로선 감지", kernel: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]] },
          { title: "수직 엣지", desc: "세로선 감지", kernel: [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]] },
          { title: "가우시안", desc: "블러 효과", kernel: [[1, 2, 1], [2, 4, 2], [1, 2, 1]] },
          { title: "샤프닝", desc: "선명도 강화", kernel: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(236,72,153,0.1)", borderRadius: 15, padding: 25, display: "flex", alignItems: "center", gap: 25 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
              {item.kernel.flat().map((v, j) => (
                <div key={j} style={{ width: 35, height: 35, background: v > 0 ? COLORS.primary : v < 0 ? "#ef4444" : "rgba(255,255,255,0.1)", borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 14, color: COLORS.light }}>{v}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, textAlign: "center", fontSize: 28, color: COLORS.light }}>
        가장 많이 사용: <span style={{ color: COLORS.primary, fontWeight: 700 }}>3×3</span>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneStridePadding: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene5_stride_padding.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>스트라이드와 패딩</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 35 }}>
          <h2 style={{ fontSize: 32, color: COLORS.primary, marginBottom: 20 }}>스트라이드 (Stride)</h2>
          <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 15 }}>커널이 이동하는 칸 수</div>
          <div style={{ display: "grid", gap: 15 }}>
            <div style={{ background: "rgba(236,72,153,0.2)", borderRadius: 10, padding: 15 }}>
              <span style={{ color: COLORS.primary }}>Stride=1:</span> 한 칸씩 이동
            </div>
            <div style={{ background: "rgba(236,72,153,0.2)", borderRadius: 10, padding: 15 }}>
              <span style={{ color: COLORS.primary }}>Stride=2:</span> 출력 크기 절반
            </div>
          </div>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 35 }}>
          <h2 style={{ fontSize: 32, color: COLORS.primary, marginBottom: 20 }}>패딩 (Padding)</h2>
          <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 15 }}>가장자리에 값 추가</div>
          <div style={{ display: "grid", gap: 15 }}>
            <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 10, padding: 15 }}>
              <span style={{ color: "#22c55e" }}>Padding=0:</span> 크기 감소
            </div>
            <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 10, padding: 15 }}>
              <span style={{ color: "#22c55e" }}>Padding=1:</span> 크기 유지 (Same)
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, background: COLORS.primary, borderRadius: 15, padding: 25, textAlign: "center" }}>
        <div style={{ fontSize: 24, color: COLORS.light }}>출력 크기 = (입력 + 2×패딩 - 커널) / 스트라이드 + 1</div>
      </div>
    </div>
  </AbsoluteFill>
);

const ScenePytorch: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene6_pytorch.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>PyTorch로 합성곱 구현</h1>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 40, fontFamily: "monospace" }}>
        <div style={{ fontSize: 22, color: "#22c55e", marginBottom: 20 }}># Conv2d 레이어 정의</div>
        <div style={{ fontSize: 24, color: COLORS.light, lineHeight: 1.8 }}>
          conv = nn.Conv2d(<br />
          &nbsp;&nbsp;&nbsp;&nbsp;in_channels=<span style={{ color: "#f59e0b" }}>3</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#6b7280" }}># 입력 채널 (RGB)</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;out_channels=<span style={{ color: "#f59e0b" }}>64</span>,&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#6b7280" }}># 출력 채널 (필터 수)</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;kernel_size=<span style={{ color: "#f59e0b" }}>3</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#6b7280" }}># 3×3 커널</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;stride=<span style={{ color: "#f59e0b" }}>1</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#6b7280" }}># 스트라이드</span><br />
          &nbsp;&nbsp;&nbsp;&nbsp;padding=<span style={{ color: "#f59e0b" }}>1</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#6b7280" }}># 패딩 (Same)</span><br />
          )
        </div>
      </div>
      <div style={{ marginTop: 30, display: "flex", gap: 20 }}>
        <div style={{ flex: 1, background: "rgba(236,72,153,0.2)", borderRadius: 15, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 20, color: COLORS.light }}>파라미터 수</div>
          <div style={{ fontSize: 32, color: COLORS.primary, fontWeight: 700 }}>64 × 3 × 3 × 3 + 64</div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>= 1,792</div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene7_outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "합성곱", desc: "커널 × 이미지 영역의 합" },
          { title: "커널", desc: "학습되는 가중치, 보통 3×3" },
          { title: "스트라이드", desc: "커널 이동 칸 수" },
          { title: "패딩", desc: "가장자리에 값 추가" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>다음 시간: <span style={{ fontWeight: 700 }}>풀링과 정규화</span></div>
    </div>
  </AbsoluteFill>
);

export const Lesson5_2Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.mlp_vs_cnn.start} durationInFrames={SCENE_TIMINGS.mlp_vs_cnn.duration}><SceneMlpVsCnn /></Sequence>
    <Sequence from={SCENE_TIMINGS.convolution.start} durationInFrames={SCENE_TIMINGS.convolution.duration}><SceneConvolution /></Sequence>
    <Sequence from={SCENE_TIMINGS.kernel.start} durationInFrames={SCENE_TIMINGS.kernel.duration}><SceneKernel /></Sequence>
    <Sequence from={SCENE_TIMINGS.stride_padding.start} durationInFrames={SCENE_TIMINGS.stride_padding.duration}><SceneStridePadding /></Sequence>
    <Sequence from={SCENE_TIMINGS.pytorch.start} durationInFrames={SCENE_TIMINGS.pytorch.duration}><ScenePytorch /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
