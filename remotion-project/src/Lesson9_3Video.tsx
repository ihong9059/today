import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_3_DURATION = 6122;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 557 },
  yolo_intro: { start: 557, duration: 774 },
  setup: { start: 1331, duration: 833 },
  training: { start: 2164, duration: 840 },
  hyperparams: { start: 3004, duration: 999 },
  monitoring: { start: 4003, duration: 798 },
  inference: { start: 4801, duration: 816 },
  outro: { start: 5617, duration: 505 },
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
    <div style={{ position: "absolute", top: 30, left: 40, zIndex: 9999, display: "flex", alignItems: "center", gap: 15 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 60, height: 60, borderRadius: 8 }} />
      <span style={{ color: "white", fontSize: 28, fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: "rgba(245, 158, 11, 0.9)", padding: "10px 30px", borderRadius: 25 }}>
      <span style={{ color: "white", fontSize: 22, fontWeight: "bold", letterSpacing: 1 }}>http://uttec-ai.duckdns.org</span>
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
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>YOLO 번호판 검출</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>실시간 객체 검출 모델</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-3
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneYoloIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/yolo_intro.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>YOLO란?</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>You Only Look Once</div>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>⚡</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>1-stage 검출기 (빠른 속도)</li>
              <li>이미지 1번만 보고 검출</li>
              <li>실시간 처리 가능 (30+ FPS)</li>
              <li>정확도와 속도 균형</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>YOLO v8 특징</div>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🚀</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>최신 아키텍처 (2023년)</li>
              <li>간편한 사용법 (Ultralytics)</li>
              <li>모델 크기별 제공 (n/s/m/l/x)</li>
              <li>전이 학습 지원</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSetup: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/setup.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>YOLO 환경 설정</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {[
            { step: "1", title: "Ultralytics 설치", cmd: "pip install ultralytics" },
            { step: "2", title: "데이터 구조", cmd: "dataset/\n  train/images, labels/\n  valid/images, labels/" },
            { step: "3", title: "YAML 설정", cmd: "path, train, val\nnc: 1  # 클래스 수\nnames: ['license_plate']" },
            { step: "4", title: "사전학습 모델", cmd: "yolov8n.pt (6MB, 빠름)\nyolov8m.pt (50MB, 균형)" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 30,
              background: "rgba(245,158,11,0.15)", borderRadius: 16, padding: 30,
              transform: `translateX(${Math.sin((frame + i * 10) * 0.05) * 5}px)`
            }}>
              <div style={{
                fontSize: 36, minWidth: 70, height: 70,
                background: COLORS.primary, borderRadius: "50%",
                display: "flex", justifyContent: "center", alignItems: "center",
                color: COLORS.light, fontWeight: 800
              }}>{item.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
                <div style={{
                  fontSize: 20, color: "rgba(255,255,255,0.8)",
                  fontFamily: "monospace", background: "rgba(0,0,0,0.3)",
                  padding: "12px 20px", borderRadius: 8, whiteSpace: "pre-line"
                }}>{item.cmd}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTraining: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/training.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>모델 학습</h1>
        <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40, marginBottom: 30 }}>
          <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>학습 코드</div>
          <div style={{
            fontSize: 22, color: "rgba(255,255,255,0.9)",
            fontFamily: "monospace", background: "rgba(0,0,0,0.4)",
            padding: 25, borderRadius: 12, lineHeight: 1.8
          }}>
            from ultralytics import YOLO<br /><br />
            model = YOLO('yolov8n.pt')<br />
            model.train(<br />
            &nbsp;&nbsp;data='plates.yaml',<br />
            &nbsp;&nbsp;epochs=100,<br />
            &nbsp;&nbsp;imgsz=640,<br />
            &nbsp;&nbsp;batch=16<br />
            )
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25 }}>
          {[
            { icon: "📊", title: "학습 시간", desc: "GPU: 1-2시간\nCPU: 10-20시간" },
            { icon: "💾", title: "결과물", desc: "best.pt (최고 모델)\nlast.pt (마지막)" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.15)", borderRadius: 16, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneHyperparams: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/hyperparams.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>하이퍼파라미터 튜닝</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25 }}>
          {[
            { param: "epochs", value: "100-200", desc: "학습 반복 횟수", icon: "🔄" },
            { param: "batch", value: "16-32", desc: "배치 크기 (GPU 메모리)", icon: "📦" },
            { param: "imgsz", value: "640", desc: "입력 이미지 크기", icon: "📐" },
            { param: "lr0", value: "0.01", desc: "초기 학습률", icon: "📈" },
            { param: "patience", value: "50", desc: "조기 종료 임계값", icon: "⏱️" },
            { param: "augment", value: "True", desc: "데이터 증강 활성화", icon: "🎨" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(245,158,11,0.15)",
              borderRadius: 16,
              padding: 30,
              transform: `scale(${1 + Math.sin((frame + i * 12) * 0.08) * 0.03})`
            }}>
              <div style={{ fontSize: 50, textAlign: "center", marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginBottom: 10 }}>{item.param}</div>
              <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 800, marginBottom: 10 }}>{item.value}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 30, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
          <div style={{ fontSize: 26, color: COLORS.light }}>작은 데이터셋: batch ↓, epochs ↑, patience ↑</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMonitoring: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/monitoring.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>학습 모니터링</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>주요 지표</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>Box Loss: 바운딩 박스 정확도</li>
              <li>Cls Loss: 분류 손실</li>
              <li>mAP50: 정확도 (IoU 0.5)</li>
              <li>mAP50-95: 엄격한 정확도</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>과적합 방지</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>Train vs Valid Loss 비교</li>
              <li>Early Stopping 활용</li>
              <li>데이터 증강 강화</li>
              <li>Dropout, Weight Decay</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 30, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
          <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>목표 성능</div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.9)" }}>
            mAP50 &gt; 0.90 (90% 정확도), 추론 속도 &gt; 30 FPS
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneInference: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-3/inference.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>추론 및 활용</h1>
        <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40, marginBottom: 30 }}>
          <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>추론 코드</div>
          <div style={{
            fontSize: 22, color: "rgba(255,255,255,0.9)",
            fontFamily: "monospace", background: "rgba(0,0,0,0.4)",
            padding: 25, borderRadius: 12, lineHeight: 1.8
          }}>
            model = YOLO('best.pt')<br />
            results = model('car.jpg')<br /><br />
            for r in results:<br />
            &nbsp;&nbsp;boxes = r.boxes  # 좌표<br />
            &nbsp;&nbsp;conf = r.boxes.conf  # 신뢰도<br />
            &nbsp;&nbsp;cls = r.boxes.cls  # 클래스
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 25 }}>
          {[
            { icon: "🖼️", title: "이미지", desc: "단일 이미지 검출" },
            { icon: "📹", title: "비디오", desc: "실시간 스트림" },
            { icon: "📂", title: "배치", desc: "대량 이미지 처리" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(245,158,11,0.15)", borderRadius: 16, padding: 30, textAlign: "center",
              transform: `translateY(${Math.sin((frame + i * 15) * 0.08) * 5}px)`
            }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
            </div>
          ))}
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
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          YOLO v8로 번호판 검출 모델 완성<br />
          실시간 추론 가능
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: CNN 문자 인식
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_3Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.yolo_intro.start} durationInFrames={SCENE_TIMINGS.yolo_intro.duration}><SceneYoloIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.setup.start} durationInFrames={SCENE_TIMINGS.setup.duration}><SceneSetup /></Sequence>
    <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}><SceneTraining /></Sequence>
    <Sequence from={SCENE_TIMINGS.hyperparams.start} durationInFrames={SCENE_TIMINGS.hyperparams.duration}><SceneHyperparams /></Sequence>
    <Sequence from={SCENE_TIMINGS.monitoring.start} durationInFrames={SCENE_TIMINGS.monitoring.duration}><SceneMonitoring /></Sequence>
    <Sequence from={SCENE_TIMINGS.inference.start} durationInFrames={SCENE_TIMINGS.inference.duration}><SceneInference /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
