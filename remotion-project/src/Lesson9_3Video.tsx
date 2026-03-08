import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_3_DURATION = 3782;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 473 },
  yolo: { start: 473, duration: 575 },
  architecture: { start: 1048, duration: 589 },
  training: { start: 1637, duration: 603 },
  metrics: { start: 2240, duration: 526 },
  inference: { start: 2766, duration: 558 },
  outro: { start: 3324, duration: 458 },
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
      <Audio src={staticFile("audio/lesson-9-3/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🎯</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>번호판 검출 - YOLO</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>실시간 객체 검출</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-3
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneYolo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/yolo.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>YOLO란?</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.primary, fontWeight: 700, marginBottom: 20 }}>You Only Look Once</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>단일 신경망으로 한 번에 검출</li>
              <li>실시간 객체 검출 가능</li>
              <li>높은 정확도와 빠른 속도</li>
              <li>End-to-End 학습</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>YOLO 버전</div>
              <div style={{ display: "flex", gap: 15 }}>
                {["v5", "v7", "v8"].map((ver, i) => (
                  <div key={i} style={{ flex: 1, padding: 20, background: i === 2 ? COLORS.primary : "rgba(245,158,11,0.2)", borderRadius: 10 }}>
                    <div style={{ fontSize: 28, color: i === 2 ? "#000" : COLORS.light, fontWeight: 700 }}>YOLO{ver}</div>
                    <div style={{ fontSize: 16, color: i === 2 ? "#000" : "rgba(255,255,255,0.6)", marginTop: 10 }}>{i === 2 ? "최신 권장" : "안정적"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneArchitecture: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/architecture.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>YOLO 아키텍처</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
          {["Backbone", "Neck", "Head"].map((part, i) => (
            <React.Fragment key={i}>
              <div style={{
                padding: "30px 50px",
                background: `rgba(245,158,11,${0.2 + i * 0.2})`,
                borderRadius: 15,
                textAlign: "center",
              }}>
                <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>{part}</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>
                  {i === 0 ? "특징 추출" : i === 1 ? "특징 융합" : "검출 출력"}
                </div>
              </div>
              {i < 2 && <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: 50, display: "flex", gap: 30 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 10 }}>CSPDarknet</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>효율적인 특징 추출 백본</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 10 }}>FPN + PAN</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>다중 스케일 특징 융합</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 10 }}>Anchor-free</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>직접 박스 예측</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTraining: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/training.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>YOLO 학습</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "#1e293b", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 20 }}>학습 코드</div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: COLORS.light, lineHeight: 1.8 }}>
              <div>from ultralytics import YOLO</div>
              <div style={{ marginTop: 10 }}>model = YOLO('yolov8n.pt')</div>
              <div style={{ marginTop: 10 }}>model.train(</div>
              <div style={{ paddingLeft: 20 }}>data='license_plate.yaml',</div>
              <div style={{ paddingLeft: 20 }}>epochs=100,</div>
              <div style={{ paddingLeft: 20 }}>imgsz=640</div>
              <div>)</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25, marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>하이퍼파라미터</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Epochs", "100"],
                  ["Batch", "16"],
                  ["Image Size", "640"],
                  ["Learning Rate", "0.01"],
                ].map(([k, v], i) => (
                  <div key={i} style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>{k}: <span style={{ color: COLORS.primary }}>{v}</span></div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(0,200,100,0.15)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 22, color: "#4ade80", marginBottom: 10 }}>Transfer Learning</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>사전 학습 가중치로 빠른 수렴</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMetrics: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/metrics.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>평가 지표</h1>
        <div style={{ display: "flex", gap: 40 }}>
          {[
            { name: "mAP50", value: "95%+", desc: "IoU 50% 기준" },
            { name: "mAP50-95", value: "70%+", desc: "IoU 50-95% 평균" },
            { name: "Precision", value: "90%+", desc: "정밀도" },
            { name: "Recall", value: "90%+", desc: "재현율" },
          ].map((metric, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>{metric.name}</div>
              <div style={{ fontSize: 48, color: COLORS.primary, fontWeight: 700 }}>{metric.value}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 10 }}>{metric.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25, textAlign: "center" }}>
          <div style={{ fontSize: 24, color: COLORS.light }}>번호판 검출은 단일 클래스로 높은 정확도 달성 가능</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneInference: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/inference.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>추론 (Inference)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "#1e293b", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 20 }}>추론 코드</div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: COLORS.light, lineHeight: 1.8 }}>
              <div>model = YOLO('best.pt')</div>
              <div style={{ marginTop: 10 }}>results = model('car.jpg')</div>
              <div style={{ marginTop: 10 }}>for box in results[0].boxes:</div>
              <div style={{ paddingLeft: 20 }}>x1, y1, x2, y2 = box.xyxy[0]</div>
              <div style={{ paddingLeft: 20 }}>conf = box.conf[0]</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>출력 정보</div>
              <ul style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                <li>바운딩 박스 좌표 (x1, y1, x2, y2)</li>
                <li>신뢰도 점수 (Confidence)</li>
                <li>클래스 ID</li>
              </ul>
            </div>
            <div style={{ background: "rgba(0,200,100,0.15)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 22, color: "#4ade80", marginBottom: 10 }}>실시간 처리</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>GPU: 30+ FPS 가능</div>
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
      <Audio src={staticFile("audio/lesson-9-3/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>🎯</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>번호판 검출 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          YOLO로 번호판 위치 검출 학습<br />
          다음: CNN으로 문자 인식
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_3Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.yolo.start} durationInFrames={SCENE_TIMINGS.yolo.duration}><SceneYolo /></Sequence>
    <Sequence from={SCENE_TIMINGS.architecture.start} durationInFrames={SCENE_TIMINGS.architecture.duration}><SceneArchitecture /></Sequence>
    <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}><SceneTraining /></Sequence>
    <Sequence from={SCENE_TIMINGS.metrics.start} durationInFrames={SCENE_TIMINGS.metrics.duration}><SceneMetrics /></Sequence>
    <Sequence from={SCENE_TIMINGS.inference.start} durationInFrames={SCENE_TIMINGS.inference.duration}><SceneInference /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
