import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_4_DURATION = 5152;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 685 },
  lenet: { start: 685, duration: 692 },
  alexnet: { start: 1377, duration: 714 },
  vgg: { start: 2091, duration: 756 },
  comparison: { start: 2847, duration: 801 },
  principles: { start: 3648, duration: 717 },
  outro: { start: 4365, duration: 787 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#ec4899",
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
      <Audio src={staticFile("audio/lesson-5-4/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🏛️</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>CNN 아키텍처</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>LeNet, AlexNet, VGG의 발전</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>Level 5-4</div>
      </div>
    </AbsoluteFill>
  );
};

const SceneLenet: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene2_lenet.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 10 }}>LeNet-5 (1998)</h1>
      <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginBottom: 30 }}>CNN의 원조 할아버지 - 손글씨 숫자 인식</div>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { layer: "입력", size: "32×32×1", desc: "흑백 이미지" },
              { layer: "Conv1 (5×5)", size: "28×28×6", desc: "6개 필터" },
              { layer: "AvgPool", size: "14×14×6", desc: "다운샘플링" },
              { layer: "Conv2 (5×5)", size: "10×10×16", desc: "16개 필터" },
              { layer: "AvgPool", size: "5×5×16", desc: "다운샘플링" },
              { layer: "FC → 출력", size: "120 → 84 → 10", desc: "숫자 0-9" }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 15, background: "rgba(236,72,153,0.1)", borderRadius: 10, padding: 12 }}>
                <div style={{ width: 150, fontSize: 18, color: COLORS.primary, fontWeight: 600 }}>{item.layer}</div>
                <div style={{ width: 120, fontSize: 16, color: COLORS.light }}>{item.size}</div>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 30 }}>
            <h3 style={{ fontSize: 26, color: "#22c55e", marginBottom: 20 }}>핵심 기여</h3>
            <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 2 }}>
              <li>합성곱 + 풀링 패턴 확립</li>
              <li>가중치 공유로 파라미터 감소</li>
              <li>계층적 특징 추출</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneAlexnet: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene3_alexnet.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 10 }}>AlexNet (2012)</h1>
      <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginBottom: 30 }}>딥러닝 르네상스의 시작 - ImageNet 우승</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
        {[
          { icon: "⚡", title: "ReLU", desc: "학습 속도 6배 향상" },
          { icon: "🎲", title: "Dropout", desc: "과적합 방지" },
          { icon: "🖥️", title: "GPU 학습", desc: "2개 GPU 병렬" },
          { icon: "🔄", title: "데이터 증강", desc: "이미지 변환" },
          { icon: "📊", title: "LRN", desc: "정규화 기법" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(236,72,153,0.15)", borderRadius: 15, padding: 25, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 15 }}>{item.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.light, marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, display: "flex", gap: 30 }}>
        {[
          { label: "총 레이어", value: "8개" },
          { label: "파라미터", value: "~6천만" },
          { label: "입력", value: "227×227×3" },
          { label: "Top-5 에러", value: "15.3%" }
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>{item.label}</div>
            <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginTop: 5 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const SceneVgg: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene4_vgg.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 10 }}>VGGNet (2014)</h1>
      <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginBottom: 30 }}>단순함의 미학 - 3×3 필터만 사용</div>
      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: COLORS.primary, borderRadius: 20, padding: 30, marginBottom: 30 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, textAlign: "center" }}>핵심: 3×3 필터만 사용!</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 15 }}>7×7 vs 3×3 × 3개</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
              <div style={{ background: "rgba(239,68,68,0.2)", borderRadius: 10, padding: 15, textAlign: "center" }}>
                <div style={{ fontSize: 18, color: "#ef4444" }}>7×7 × 1개</div>
                <div style={{ fontSize: 16, color: COLORS.light }}>파라미터: 49C²</div>
              </div>
              <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 10, padding: 15, textAlign: "center" }}>
                <div style={{ fontSize: 18, color: "#22c55e" }}>3×3 × 3개</div>
                <div style={{ fontSize: 16, color: COLORS.light }}>파라미터: 27C²</div>
              </div>
            </div>
            <div style={{ marginTop: 15, textAlign: "center", fontSize: 18, color: "#22c55e" }}>45% 적은 파라미터 + 더 많은 비선형성!</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "grid", gap: 15 }}>
            {[
              { name: "VGG-11", layers: "8 Conv", params: "~1.3억" },
              { name: "VGG-16", layers: "13 Conv", params: "~1.38억" },
              { name: "VGG-19", layers: "16 Conv", params: "~1.44억" }
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(236,72,153,0.15)", borderRadius: 15, padding: 25, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary }}>{item.name}</div>
                <div style={{ fontSize: 20, color: COLORS.light }}>{item.layers}</div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>{item.params}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneComparison: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene5_comparison.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CNN 아키텍처 발전</h1>
      <div style={{ display: "grid", gap: 20 }}>
        {[
          { year: "1998", name: "LeNet-5", depth: "5층", params: "6만", contribution: "CNN의 기본 구조" },
          { year: "2012", name: "AlexNet", depth: "8층", params: "6천만", contribution: "딥러닝 르네상스" },
          { year: "2014", name: "VGG", depth: "19층", params: "1.4억", contribution: "3×3 필터의 힘" },
          { year: "2014", name: "GoogLeNet", depth: "22층", params: "5백만", contribution: "Inception 모듈" },
          { year: "2015", name: "ResNet", depth: "152층", params: "6천만", contribution: "스킵 연결" }
        ].map((item, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 130px 100px 120px 1fr", alignItems: "center", background: i < 3 ? "rgba(236,72,153,0.15)" : "rgba(255,255,255,0.05)", borderRadius: 12, padding: "18px 25px" }}>
            <div style={{ fontSize: 20, color: COLORS.primary, fontWeight: 600 }}>{item.year}</div>
            <div style={{ fontSize: 22, color: COLORS.light, fontWeight: 700 }}>{item.name}</div>
            <div style={{ fontSize: 18, color: COLORS.light }}>{item.depth}</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{item.params}</div>
            <div style={{ fontSize: 18, color: "#22c55e" }}>{item.contribution}</div>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const ScenePrinciples: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene6_principles.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>현대 CNN 설계 원칙</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25 }}>
        {[
          { icon: "🔲", title: "작은 필터 선호", desc: "3×3이 표준, 가끔 1×1" },
          { icon: "📊", title: "BatchNorm 사용", desc: "모든 Conv 뒤에 적용" },
          { icon: "⚡", title: "ReLU 활성화", desc: "또는 LeakyReLU, GELU" },
          { icon: "📏", title: "깊이 > 너비", desc: "더 깊은 네트워크 선호" },
          { icon: "🔗", title: "스킵 연결", desc: "매우 깊은 경우 필수" },
          { icon: "🌐", title: "Global Avg Pool", desc: "FC 레이어 대신 사용" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(236,72,153,0.1)", borderRadius: 15, padding: 25, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 40 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene7_outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 25, maxWidth: 1200 }}>
        {[
          { title: "LeNet (1998)", desc: "CNN 기본 구조 확립" },
          { title: "AlexNet (2012)", desc: "ReLU, Dropout, GPU" },
          { title: "VGG (2014)", desc: "3×3 필터, 깊이의 힘" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>다음 시간: <span style={{ fontWeight: 700 }}>CNN 구현 (MNIST)</span></div>
    </div>
  </AbsoluteFill>
);

export const Lesson5_4Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.lenet.start} durationInFrames={SCENE_TIMINGS.lenet.duration}><SceneLenet /></Sequence>
    <Sequence from={SCENE_TIMINGS.alexnet.start} durationInFrames={SCENE_TIMINGS.alexnet.duration}><SceneAlexnet /></Sequence>
    <Sequence from={SCENE_TIMINGS.vgg.start} durationInFrames={SCENE_TIMINGS.vgg.duration}><SceneVgg /></Sequence>
    <Sequence from={SCENE_TIMINGS.comparison.start} durationInFrames={SCENE_TIMINGS.comparison.duration}><SceneComparison /></Sequence>
    <Sequence from={SCENE_TIMINGS.principles.start} durationInFrames={SCENE_TIMINGS.principles.duration}><ScenePrinciples /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
