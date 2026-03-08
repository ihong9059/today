import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_5_DURATION = 3402;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 400 },
  metrics: { start: 400, duration: 542 },
  mAP: { start: 942, duration: 531 },
  confusion: { start: 1473, duration: 520 },
  analysis: { start: 1993, duration: 524 },
  visualization: { start: 2517, duration: 503 },
  outro: { start: 3020, duration: 382 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#f59e0b",
  secondary: "#d97706",
  accent: "#b45309",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
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
      <Audio src={staticFile("audio/lesson-9-5/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>📊</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>모델 평가</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>성능 측정과 분석</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-5
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMetrics: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-5/metrics.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>평가 지표</h1>
        <div style={{ display: "flex", gap: 30 }}>
          {[
            { name: "Precision", formula: "TP / (TP + FP)", desc: "예측 중 맞춘 비율", color: "#4ade80" },
            { name: "Recall", formula: "TP / (TP + FN)", desc: "실제 중 찾은 비율", color: "#3b82f6" },
            { name: "F1 Score", formula: "2 × P × R / (P + R)", desc: "정밀도와 재현율 조화", color: "#f59e0b" },
          ].map((metric, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 28, color: metric.color, fontWeight: 700, marginBottom: 20 }}>{metric.name}</div>
              <div style={{ padding: "15px 20px", background: "#1e293b", borderRadius: 10, fontFamily: "monospace", fontSize: 18, color: COLORS.light, marginBottom: 20 }}>
                {metric.formula}
              </div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{metric.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMAP: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-5/mAP.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>mAP (Mean Average Precision)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>IoU (Intersection over Union)</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 30 }}>
              <div style={{ width: 100, height: 80, background: "rgba(245,158,11,0.5)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <div style={{ position: "absolute", width: 80, height: 60, border: "3px solid #4ade80", borderRadius: 5, top: 15, left: 15 }} />
                <span style={{ color: COLORS.light, fontSize: 14 }}>예측</span>
              </div>
            </div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>IoU = 교집합 / 합집합</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>mAP 종류</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              {[
                { name: "mAP@0.5", desc: "IoU 50% 이상" },
                { name: "mAP@0.75", desc: "IoU 75% 이상" },
                { name: "mAP@0.5:0.95", desc: "50-95% 평균" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", background: "rgba(245,158,11,0.2)", borderRadius: 10 }}>
                  <span style={{ color: COLORS.primary, fontWeight: 600 }}>{item.name}</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneConfusion: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-5/confusion.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>혼동 행렬</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5, padding: 20, background: "rgba(0,0,0,0.3)", borderRadius: 15 }}>
              <div />
              <div style={{ textAlign: "center", color: COLORS.primary, padding: 10 }}>예측: P</div>
              <div style={{ textAlign: "center", color: COLORS.primary, padding: 10 }}>예측: N</div>
              <div style={{ textAlign: "right", color: COLORS.primary, padding: 10 }}>실제: P</div>
              <div style={{ background: "#4ade80", padding: 20, borderRadius: 8, textAlign: "center", color: "#000", fontWeight: 700 }}>TP</div>
              <div style={{ background: "#f43f5e", padding: 20, borderRadius: 8, textAlign: "center", color: "#fff", fontWeight: 700 }}>FN</div>
              <div style={{ textAlign: "right", color: COLORS.primary, padding: 10 }}>실제: N</div>
              <div style={{ background: "#f43f5e", padding: 20, borderRadius: 8, textAlign: "center", color: "#fff", fontWeight: 700 }}>FP</div>
              <div style={{ background: "#4ade80", padding: 20, borderRadius: 8, textAlign: "center", color: "#000", fontWeight: 700 }}>TN</div>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>해석</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><span style={{ color: "#4ade80" }}>TP</span>: 올바른 검출</li>
              <li><span style={{ color: "#f43f5e" }}>FP</span>: 잘못된 검출 (오탐)</li>
              <li><span style={{ color: "#f43f5e" }}>FN</span>: 놓친 검출 (미탐)</li>
              <li><span style={{ color: "#4ade80" }}>TN</span>: 올바른 무시</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAnalysis: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-5/analysis.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>에러 분석</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {[
            { icon: "🌙", title: "야간 이미지", desc: "조명 부족으로 인식 실패" },
            { icon: "📐", title: "기울어진 번호판", desc: "회전된 번호판 검출 어려움" },
            { icon: "🔍", title: "작은 번호판", desc: "저해상도 이미지" },
            { icon: "🌫️", title: "흐린 이미지", desc: "모션 블러, 초점 이탈" },
            { icon: "🎨", title: "특수 번호판", desc: "다양한 디자인" },
            { icon: "☀️", title: "역광", desc: "강한 배경광" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 22, color: COLORS.primary, fontWeight: 600, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneVisualization: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-5/visualization.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>결과 시각화</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>PR Curve</div>
            <div style={{ height: 150, background: "rgba(0,0,0,0.3)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: 80 }}>📈</div>
            </div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>Precision-Recall 곡선</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>학습 곡선</div>
            <div style={{ height: 150, background: "rgba(0,0,0,0.3)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: 80 }}>📉</div>
            </div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>Loss/Accuracy 추이</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>샘플 결과</div>
            <div style={{ height: 150, background: "rgba(0,0,0,0.3)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: 80 }}>🖼️</div>
            </div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>예측 결과 시각화</div>
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
      <Audio src={staticFile("audio/lesson-9-5/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>📊</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>평가 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          모델 성능 평가 방법 학습<br />
          다음: 모델 배포
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_5Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.metrics.start} durationInFrames={SCENE_TIMINGS.metrics.duration}><SceneMetrics /></Sequence>
    <Sequence from={SCENE_TIMINGS.mAP.start} durationInFrames={SCENE_TIMINGS.mAP.duration}><SceneMAP /></Sequence>
    <Sequence from={SCENE_TIMINGS.confusion.start} durationInFrames={SCENE_TIMINGS.confusion.duration}><SceneConfusion /></Sequence>
    <Sequence from={SCENE_TIMINGS.analysis.start} durationInFrames={SCENE_TIMINGS.analysis.duration}><SceneAnalysis /></Sequence>
    <Sequence from={SCENE_TIMINGS.visualization.start} durationInFrames={SCENE_TIMINGS.visualization.duration}><SceneVisualization /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
