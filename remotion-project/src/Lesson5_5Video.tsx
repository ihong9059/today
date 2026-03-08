import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_5_DURATION = 4986;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 684 },
  data: { start: 684, duration: 745 },
  model: { start: 1429, duration: 799 },
  training: { start: 2228, duration: 684 },
  results: { start: 2912, duration: 639 },
  prediction: { start: 3551, duration: 624 },
  outro: { start: 4175, duration: 811 },
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
      <Audio src={staticFile("audio/lesson-5-5/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔢</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>CNN 구현 (MNIST)</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>PyTorch로 손글씨 분류하기</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>Level 5-5</div>
      </div>
    </AbsoluteFill>
  );
};

const SceneData: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene2_data.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>MNIST 데이터셋</h1>
      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "grid", gap: 20 }}>
            {[
              { label: "이미지 크기", value: "28 × 28 × 1", desc: "흑백" },
              { label: "훈련 데이터", value: "60,000개", desc: "" },
              { label: "테스트 데이터", value: "10,000개", desc: "" },
              { label: "클래스 수", value: "10개", desc: "숫자 0-9" }
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(236,72,153,0.1)", borderRadius: 15, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 22, color: "rgba(255,255,255,0.8)" }}>{item.label}</span>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary }}>{item.value}</span>
                  {item.desc && <span style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginLeft: 10 }}>{item.desc}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div key={n} style={{ width: 70, height: 70, background: "rgba(255,255,255,0.1)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 36, color: COLORS.light, fontWeight: 700 }}>{n}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneModel: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene3_model.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 30 }}>CNN 모델 구조</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1.2 }}>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { layer: "입력", size: "1×28×28", params: "-" },
              { layer: "Conv1 (3×3, 32)", size: "32×28×28", params: "320" },
              { layer: "MaxPool (2×2)", size: "32×14×14", params: "-" },
              { layer: "Conv2 (3×3, 64)", size: "64×14×14", params: "18,496" },
              { layer: "MaxPool (2×2)", size: "64×7×7", params: "-" },
              { layer: "Flatten", size: "3,136", params: "-" },
              { layer: "FC1", size: "128", params: "401,536" },
              { layer: "FC2 (출력)", size: "10", params: "1,290" }
            ].map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 150px 100px", alignItems: "center", background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: "12px 20px" }}>
                <span style={{ fontSize: 18, color: COLORS.primary }}>{item.layer}</span>
                <span style={{ fontSize: 16, color: COLORS.light }}>{item.size}</span>
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", textAlign: "right" }}>{item.params}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
          <div style={{ background: COLORS.primary, borderRadius: 15, padding: 25, textAlign: "center" }}>
            <div style={{ fontSize: 22, color: COLORS.light }}>총 파라미터</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.light }}>~420,000개</div>
          </div>
          <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 15, padding: 20 }}>
            <div style={{ fontSize: 20, color: "#22c55e", marginBottom: 10 }}>CNN 블록 순서</div>
            <div style={{ fontSize: 18, color: COLORS.light }}>Conv → BN → ReLU → Pool</div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneTraining: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene4_training.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>학습 설정</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
        {[
          { icon: "📉", title: "손실 함수", value: "CrossEntropyLoss" },
          { icon: "⚡", title: "옵티마이저", value: "Adam (lr=0.001)" },
          { icon: "🔄", title: "에포크", value: "10" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 35, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 15 }}>{item.icon}</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>{item.title}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.light }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {[
            { mode: "model.train()", desc: "BatchNorm, Dropout 활성화" },
            { mode: "model.eval()", desc: "BatchNorm, Dropout 비활성화" }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, color: COLORS.primary, fontFamily: "monospace", marginBottom: 10 }}>{item.mode}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneResults: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, frame / 60);
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-5/scene5_results.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>학습 결과</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 28, color: "#22c55e", marginBottom: 15 }}>테스트 정확도</div>
            <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.light }}>{Math.floor(99 * progress)}%+</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>10 에포크 학습</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>학습 곡선</div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 25, height: 200, display: "flex", alignItems: "flex-end", gap: 8 }}>
              {[0.3, 0.5, 0.7, 0.85, 0.92, 0.95, 0.97, 0.98, 0.99, 0.99].map((v, i) => (
                <div key={i} style={{ flex: 1, height: `${v * 180 * progress}px`, background: `linear-gradient(to top, ${COLORS.primary}, ${COLORS.primary}88)`, borderRadius: "5px 5px 0 0" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 16, color: "rgba(255,255,255,0.5)" }}>
              <span>1</span><span>에포크</span><span>10</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePrediction: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene6_prediction.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>예측 결과</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {[
          { num: 3, pred: 3, correct: true },
          { num: 7, pred: 7, correct: true },
          { num: 9, pred: 9, correct: true },
          { num: 4, pred: 4, correct: true },
          { num: 1, pred: 1, correct: true },
          { num: 5, pred: 5, correct: true },
          { num: 8, pred: 3, correct: false },
          { num: 2, pred: 2, correct: true }
        ].map((item, i) => (
          <div key={i} style={{ background: item.correct ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)", borderRadius: 15, padding: 20, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.1)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 15px", fontSize: 48, color: COLORS.light }}>{item.num}</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>예측: <span style={{ color: item.correct ? "#22c55e" : "#ef4444", fontWeight: 700 }}>{item.pred}</span></div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 30, textAlign: "center", fontSize: 24, color: "rgba(255,255,255,0.8)" }}>
        <span style={{ color: "#22c55e" }}>초록</span> = 정답, <span style={{ color: "#ef4444" }}>빨강</span> = 오답
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene7_outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "데이터 준비", desc: "transforms, DataLoader" },
          { title: "CNN 모델", desc: "Conv → BN → ReLU → Pool" },
          { title: "학습 루프", desc: "Adam, CrossEntropy" },
          { title: "결과", desc: "99%+ 정확도 달성" }
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>다음 시간: <span style={{ fontWeight: 700 }}>CNN 구현 (CIFAR-10)</span></div>
    </div>
  </AbsoluteFill>
);

export const Lesson5_5Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.data.start} durationInFrames={SCENE_TIMINGS.data.duration}><SceneData /></Sequence>
    <Sequence from={SCENE_TIMINGS.model.start} durationInFrames={SCENE_TIMINGS.model.duration}><SceneModel /></Sequence>
    <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}><SceneTraining /></Sequence>
    <Sequence from={SCENE_TIMINGS.results.start} durationInFrames={SCENE_TIMINGS.results.duration}><SceneResults /></Sequence>
    <Sequence from={SCENE_TIMINGS.prediction.start} durationInFrames={SCENE_TIMINGS.prediction.duration}><ScenePrediction /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
