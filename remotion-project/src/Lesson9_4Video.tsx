import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_4_DURATION = 6088;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 528 },
  ocr_approach: { start: 528, duration: 945 },
  segmentation: { start: 1473, duration: 871 },
  cnn_model: { start: 2344, duration: 906 },
  training: { start: 3250, duration: 801 },
  evaluation: { start: 4051, duration: 764 },
  integration: { start: 4815, duration: 788 },
  outro: { start: 5603, duration: 485 },
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
      <Audio src={staticFile("audio/lesson-9-4/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔤</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>CNN 문자 인식</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>번호판 OCR 시스템</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-4
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOcrApproach: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/ocr_approach.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>OCR 접근 방법</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>전통적 OCR</div>
            <div style={{ fontSize: 70, textAlign: "center", marginBottom: 20 }}>📚</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>Tesseract, EasyOCR</li>
              <li>범용 문자 인식</li>
              <li>정확도 한계</li>
              <li>특수 환경 취약</li>
            </ul>
          </div>
          <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>커스텀 CNN</div>
            <div style={{ fontSize: 70, textAlign: "center", marginBottom: 20 }}>🎯</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>번호판 전용 학습</li>
              <li>높은 정확도 (99%+)</li>
              <li>빠른 추론 속도</li>
              <li>도메인 최적화</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 30, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35, textAlign: "center" }}>
          <div style={{ fontSize: 28, color: COLORS.light }}>
            이번 프로젝트: 문자 분할 + CNN 분류 방식
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSegmentation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/segmentation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>문자 분할</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {[
            { step: "1", icon: "🎨", title: "전처리", desc: "그레이스케일 변환, 이진화, 노이즈 제거" },
            { step: "2", icon: "🔍", title: "윤곽선 검출", desc: "OpenCV findContours로 문자 영역 찾기" },
            { step: "3", icon: "📏", title: "필터링", desc: "크기/종횡비로 잘못된 영역 제거" },
            { step: "4", icon: "↔️", title: "정렬", desc: "x 좌표 기준 왼쪽→오른쪽 정렬" },
            { step: "5", icon: "✂️", title: "개별 추출", desc: "각 문자를 28x28로 크롭/리사이즈" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 30,
              background: "rgba(245,158,11,0.15)", borderRadius: 16, padding: 25,
              transform: `translateX(${Math.sin((frame + i * 10) * 0.05) * 5}px)`
            }}>
              <div style={{
                fontSize: 36, minWidth: 70, height: 70,
                background: COLORS.primary, borderRadius: "50%",
                display: "flex", justifyContent: "center", alignItems: "center",
                color: COLORS.light, fontWeight: 800
              }}>{item.step}</div>
              <div style={{ fontSize: 50, minWidth: 80, textAlign: "center" }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>{item.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCnnModel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/cnn_model.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CNN 모델 구조</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { layer: "Input", spec: "28×28×1 (그레이스케일)", icon: "📥" },
            { layer: "Conv1", spec: "32 filters, 3×3, ReLU", icon: "🔲" },
            { layer: "MaxPool1", spec: "2×2, stride 2 → 14×14", icon: "⬇️" },
            { layer: "Conv2", spec: "64 filters, 3×3, ReLU", icon: "🔲" },
            { layer: "MaxPool2", spec: "2×2, stride 2 → 7×7", icon: "⬇️" },
            { layer: "Flatten", spec: "7×7×64 = 3136", icon: "📊" },
            { layer: "Dense", spec: "128 units, ReLU, Dropout(0.5)", icon: "🧠" },
            { layer: "Output", spec: "36 classes (0-9, 가-하)", icon: "📤" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 25,
              background: "rgba(245,158,11,0.15)", borderRadius: 12, padding: 20,
              transform: `scale(${1 + Math.sin((frame + i * 8) * 0.06) * 0.02})`
            }}>
              <div style={{ fontSize: 40, minWidth: 70, textAlign: "center" }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700 }}>{item.layer}</div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 5 }}>{item.spec}</div>
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
      <Audio src={staticFile("audio/lesson-9-4/training.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>모델 학습</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>하이퍼파라미터</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>Optimizer: Adam</li>
              <li>Learning Rate: 0.001</li>
              <li>Batch Size: 64</li>
              <li>Epochs: 50</li>
              <li>Loss: Categorical CE</li>
            </ul>
          </div>
          <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>데이터 증강</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>회전: ±10도</li>
              <li>이동: ±10%</li>
              <li>확대/축소: 0.9-1.1배</li>
              <li>밝기 조절</li>
              <li>노이즈 추가</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 30, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
          <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>학습 팁</div>
          <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
            <li>Class Imbalance: 클래스별 동일한 샘플 수 유지</li>
            <li>Early Stopping: validation loss 10 epoch 개선 없으면 중단</li>
            <li>Model Checkpoint: 최고 성능 모델 저장</li>
          </ul>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneEvaluation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/evaluation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>모델 평가</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>평가 지표</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <div style={{ marginBottom: 15 }}>
                <span style={{ color: COLORS.primary, fontWeight: 700 }}>Accuracy</span>: 전체 정확도
              </div>
              <div style={{ marginBottom: 15 }}>
                <span style={{ color: COLORS.primary, fontWeight: 700 }}>Precision</span>: 예측 중 맞춘 비율
              </div>
              <div style={{ marginBottom: 15 }}>
                <span style={{ color: COLORS.primary, fontWeight: 700 }}>Recall</span>: 실제 중 찾은 비율
              </div>
              <div>
                <span style={{ color: COLORS.primary, fontWeight: 700 }}>F1-Score</span>: 조화 평균
              </div>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>목표 성능</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", marginBottom: 5 }}>문자별 정확도</div>
                <div style={{ fontSize: 48, color: COLORS.primary, fontWeight: 800 }}>99%+</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", marginBottom: 5 }}>번호판 전체 정확도</div>
                <div style={{ fontSize: 48, color: COLORS.primary, fontWeight: 800 }}>95%+</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 30, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
          <div style={{ fontSize: 26, color: COLORS.light }}>Confusion Matrix로 오분류 패턴 분석</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneIntegration: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-4/integration.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>시스템 통합</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {[
            { step: "1", title: "YOLO 검출", desc: "차량 이미지에서 번호판 위치 찾기" },
            { step: "2", title: "영역 추출", desc: "검출된 번호판 영역 크롭" },
            { step: "3", title: "문자 분할", desc: "개별 문자 영역 분리 (OpenCV)" },
            { step: "4", title: "CNN 인식", desc: "각 문자를 CNN으로 분류" },
            { step: "5", title: "후처리", desc: "결과 조합 및 검증 (형식 체크)" },
            { step: "6", title: "출력", desc: "최종 번호판 번호 반환" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 30,
              background: "rgba(245,158,11,0.15)", borderRadius: 16, padding: 25,
              transform: `translateX(${Math.sin((frame + i * 10) * 0.05) * 5}px)`
            }}>
              <div style={{
                fontSize: 36, minWidth: 70, height: 70,
                background: COLORS.primary, borderRadius: "50%",
                display: "flex", justifyContent: "center", alignItems: "center",
                color: COLORS.light, fontWeight: 800
              }}>{item.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>{item.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 30, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
          <div style={{ fontSize: 26, color: COLORS.light }}>전체 처리 시간: 100ms 이하 (실시간 가능)</div>
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
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          문자 분할 + CNN 인식 시스템 완성<br />
          번호판 인식 프로젝트 통합 완료
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          축하합니다! Level 9 종합 프로젝트 완성
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_4Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.ocr_approach.start} durationInFrames={SCENE_TIMINGS.ocr_approach.duration}><SceneOcrApproach /></Sequence>
    <Sequence from={SCENE_TIMINGS.segmentation.start} durationInFrames={SCENE_TIMINGS.segmentation.duration}><SceneSegmentation /></Sequence>
    <Sequence from={SCENE_TIMINGS.cnn_model.start} durationInFrames={SCENE_TIMINGS.cnn_model.duration}><SceneCnnModel /></Sequence>
    <Sequence from={SCENE_TIMINGS.training.start} durationInFrames={SCENE_TIMINGS.training.duration}><SceneTraining /></Sequence>
    <Sequence from={SCENE_TIMINGS.evaluation.start} durationInFrames={SCENE_TIMINGS.evaluation.duration}><SceneEvaluation /></Sequence>
    <Sequence from={SCENE_TIMINGS.integration.start} durationInFrames={SCENE_TIMINGS.integration.duration}><SceneIntegration /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
