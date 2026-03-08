import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_4_DURATION = 3978;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 431 },
  pipeline: { start: 431, duration: 628 },
  segmentation: { start: 1059, duration: 561 },
  cnn: { start: 1620, duration: 684 },
  training: { start: 2304, duration: 574 },
  integration: { start: 2878, duration: 677 },
  outro: { start: 3555, duration: 423 },
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
      <Audio src={staticFile("audio/lesson-9-4/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔤</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>문자 인식 - CNN</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>OCR 시스템 구현</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-4
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePipeline: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/pipeline.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>OCR 파이프라인</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
          {["번호판 영역", "이진화", "문자 분할", "문자 인식", "결과 조합"].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{
                padding: "25px 30px",
                background: `rgba(245,158,11,${0.2 + i * 0.15})`,
                borderRadius: 15,
                textAlign: "center",
                color: COLORS.light,
                fontSize: 20,
                fontWeight: 600
              }}>
                {step}
              </div>
              {i < 4 && <div style={{ fontSize: 30, color: COLORS.primary }}>→</div>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: 60, display: "flex", gap: 30 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 50, marginBottom: 15 }}>📷</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>입력: 번호판 이미지</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 50, marginBottom: 15 }}>🔧</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>처리: 전처리 + CNN</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 50, marginBottom: 15 }}>📝</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>출력: 텍스트 결과</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSegmentation: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/segmentation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>문자 분할</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: 30, marginBottom: 30 }}>
              <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>번호판 이미지</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 5, padding: 20, background: "rgba(255,255,255,0.1)", borderRadius: 10 }}>
                {["1", "2", "가", "3", "4", "5", "6"].map((char, i) => (
                  <div key={i} style={{ width: 50, height: 60, border: `2px dashed ${COLORS.primary}`, borderRadius: 5, display: "flex", justifyContent: "center", alignItems: "center", color: COLORS.light, fontSize: 24 }}>
                    {char}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>분할 방법</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>Connected Component 분석</li>
              <li>수직 투영 히스토그램</li>
              <li>딥러닝 기반 분할</li>
              <li>고정 위치 슬라이싱</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCNN: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/cnn.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CNN 문자 인식</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "#1e293b", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 15 }}>CNN 구조</div>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: COLORS.light, lineHeight: 1.8 }}>
              <div>Conv2d(1, 32, 3) → ReLU</div>
              <div>MaxPool2d(2)</div>
              <div>Conv2d(32, 64, 3) → ReLU</div>
              <div>MaxPool2d(2)</div>
              <div>Flatten()</div>
              <div>Linear(64*5*5, 128)</div>
              <div>Linear(128, 36)  # 0-9, A-Z</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 15, padding: 25, marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>클래스</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["0-9", "가-힣", "A-Z"].map((cls, i) => (
                  <div key={i} style={{ padding: "8px 15px", background: COLORS.primary, borderRadius: 20, color: "#000", fontSize: 16, fontWeight: 600 }}>
                    {cls}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(0,200,100,0.15)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 22, color: "#4ade80", marginBottom: 10 }}>입력 크기</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>28x28 또는 32x32 그레이스케일</div>
            </div>
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
      <Audio src={staticFile("audio/lesson-9-4/training.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>모델 학습</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "#1e293b", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 15 }}>학습 코드</div>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: COLORS.light, lineHeight: 1.8 }}>
              <div>criterion = nn.CrossEntropyLoss()</div>
              <div>optimizer = optim.Adam(lr=0.001)</div>
              <div style={{ marginTop: 10 }}>for epoch in range(50):</div>
              <div style={{ paddingLeft: 20 }}>for images, labels in loader:</div>
              <div style={{ paddingLeft: 40 }}>outputs = model(images)</div>
              <div style={{ paddingLeft: 40 }}>loss = criterion(outputs, labels)</div>
              <div style={{ paddingLeft: 40 }}>loss.backward()</div>
              <div style={{ paddingLeft: 40 }}>optimizer.step()</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25, marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>학습 팁</div>
              <ul style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                <li>데이터 균형 맞추기</li>
                <li>데이터 증강 적용</li>
                <li>조기 종료 사용</li>
                <li>학습률 스케줄링</li>
              </ul>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1, background: "rgba(0,200,100,0.15)", borderRadius: 10, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 32, color: "#4ade80", fontWeight: 700 }}>98%+</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>목표 정확도</div>
              </div>
              <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 10, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 32, color: COLORS.primary, fontWeight: 700 }}>50</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Epochs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneIntegration: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/integration.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>YOLO + CNN 통합</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <div style={{ padding: "30px 50px", background: "rgba(245,158,11,0.3)", borderRadius: 15, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🎯</div>
            <div style={{ fontSize: 24, color: COLORS.light }}>YOLO</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>번호판 검출</div>
          </div>
          <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>
          <div style={{ padding: "30px 50px", background: "rgba(245,158,11,0.5)", borderRadius: 15, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>✂️</div>
            <div style={{ fontSize: 24, color: COLORS.light }}>Crop</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>영역 추출</div>
          </div>
          <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>
          <div style={{ padding: "30px 50px", background: "rgba(245,158,11,0.7)", borderRadius: 15, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🔤</div>
            <div style={{ fontSize: 24, color: "#000" }}>CNN</div>
            <div style={{ fontSize: 16, color: "rgba(0,0,0,0.6)" }}>문자 인식</div>
          </div>
        </div>
        <div style={{ background: "rgba(0,200,100,0.15)", borderRadius: 15, padding: 25, textAlign: "center" }}>
          <div style={{ fontSize: 36, color: "#4ade80", fontWeight: 700 }}>12가 3456</div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>최종 인식 결과</div>
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
      <Audio src={staticFile("audio/lesson-9-4/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>🔤</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>문자 인식 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          CNN OCR 시스템 구현 완료<br />
          다음: 모델 성능 평가
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_4Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.pipeline.start} durationInFrames={SCENE_TIMINGS.pipeline.duration}><ScenePipeline /></Sequence>
    <Sequence from={SCENE_TIMINGS.segmentation.start} durationInFrames={SCENE_TIMINGS.segmentation.duration}><SceneSegmentation /></Sequence>
    <Sequence from={SCENE_TIMINGS.cnn.start} durationInFrames={SCENE_TIMINGS.cnn.duration}><SceneCNN /></Sequence>
    <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}><SceneTraining /></Sequence>
    <Sequence from={SCENE_TIMINGS.integration.start} durationInFrames={SCENE_TIMINGS.integration.duration}><SceneIntegration /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
