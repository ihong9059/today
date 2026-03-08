import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_2_DURATION = 3754;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 462 },
  collection: { start: 462, duration: 670 },
  labeling: { start: 1132, duration: 529 },
  format: { start: 1661, duration: 606 },
  augmentation: { start: 2267, duration: 573 },
  split: { start: 2840, duration: 542 },
  outro: { start: 3382, duration: 372 },
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
      <Audio src={staticFile("audio/lesson-9-2/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>📊</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>데이터 수집과 준비</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>고품질 데이터셋 구축</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-2
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCollection: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/collection.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 수집</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>📷</div>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 15 }}>직접 촬영</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>다양한 차량 촬영</li>
              <li>여러 조명 조건</li>
              <li>다양한 각도</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>🌐</div>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 15 }}>공개 데이터셋</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>Kaggle 데이터셋</li>
              <li>오픈 소스 활용</li>
              <li>라이선스 확인</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>🔄</div>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 15 }}>데이터 증강</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>회전, 밝기 조절</li>
              <li>노이즈 추가</li>
              <li>다양성 확보</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneLabeling: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/labeling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 라벨링</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: 40, height: 300, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
              <div style={{ fontSize: 100 }}>🚗</div>
              <div style={{ position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50)", border: `3px solid ${COLORS.primary}`, padding: "10px 20px", borderRadius: 8 }}>
                <span style={{ color: COLORS.light, fontSize: 20 }}>12가 3456</span>
              </div>
              <div style={{ position: "absolute", top: 20, right: 20, background: COLORS.primary, padding: "5px 15px", borderRadius: 20, fontSize: 14, color: "#000" }}>
                license_plate
              </div>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>라벨링 도구</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>LabelImg - YOLO 포맷</li>
              <li>CVAT - 웹 기반</li>
              <li>Roboflow - 자동화</li>
            </ul>
            <div style={{ marginTop: 30, padding: 20, background: "rgba(245,158,11,0.2)", borderRadius: 10 }}>
              <div style={{ fontSize: 18, color: COLORS.primary }}>바운딩 박스 좌표 저장</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>class x_center y_center width height</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneFormat: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/format.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 형식</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 24, color: COLORS.primary, fontWeight: 700, marginBottom: 20 }}>YOLO 포맷</div>
            <div style={{ background: "#1e293b", padding: 20, borderRadius: 10, fontFamily: "monospace", fontSize: 16, color: COLORS.light }}>
              0 0.5 0.8 0.3 0.1<br />
              # class x_center y_center w h
            </div>
            <div style={{ marginTop: 15, fontSize: 18, color: "rgba(255,255,255,0.7)" }}>정규화된 좌표 (0~1)</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 24, color: COLORS.primary, fontWeight: 700, marginBottom: 20 }}>COCO 포맷</div>
            <div style={{ background: "#1e293b", padding: 20, borderRadius: 10, fontFamily: "monospace", fontSize: 14, color: COLORS.light }}>
              {`{"bbox": [x, y, w, h],`}<br />
              {` "category_id": 0}`}
            </div>
            <div style={{ marginTop: 15, fontSize: 18, color: "rgba(255,255,255,0.7)" }}>절대 좌표 (픽셀)</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 24, color: COLORS.primary, fontWeight: 700, marginBottom: 20 }}>Pascal VOC</div>
            <div style={{ background: "#1e293b", padding: 20, borderRadius: 10, fontFamily: "monospace", fontSize: 14, color: COLORS.light }}>
              {`<bndbox>`}<br />
              {`  <xmin>100</xmin>...`}<br />
              {`</bndbox>`}
            </div>
            <div style={{ marginTop: 15, fontSize: 18, color: "rgba(255,255,255,0.7)" }}>XML 형식</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAugmentation: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/augmentation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 증강</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 25 }}>
          {[
            { icon: "🔄", name: "회전", desc: "±15도" },
            { icon: "↔️", name: "플립", desc: "좌우 반전" },
            { icon: "☀️", name: "밝기", desc: "±30%" },
            { icon: "🎨", name: "대비", desc: "±20%" },
            { icon: "📐", name: "크롭", desc: "랜덤 자르기" },
            { icon: "🔲", name: "스케일", desc: "0.8~1.2" },
            { icon: "🌫️", name: "블러", desc: "가우시안" },
            { icon: "⚡", name: "노이즈", desc: "랜덤 노이즈" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.15)", borderRadius: 15, padding: 25, textAlign: "center" }}>
              <div style={{ fontSize: 50, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 22, color: COLORS.light, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: "center", fontSize: 24, color: COLORS.primary }}>
          Albumentations 라이브러리 활용
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSplit: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/split.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터셋 분할</h1>
        <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", height: 60, borderRadius: 10, overflow: "hidden", marginBottom: 30 }}>
              <div style={{ width: "70%", background: "#4ade80", display: "flex", justifyContent: "center", alignItems: "center", color: "#000", fontWeight: 700, fontSize: 20 }}>Train 70%</div>
              <div style={{ width: "15%", background: COLORS.primary, display: "flex", justifyContent: "center", alignItems: "center", color: "#000", fontWeight: 700, fontSize: 18 }}>Val 15%</div>
              <div style={{ width: "15%", background: "#f43f5e", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>Test 15%</div>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                { name: "Train", pct: "70%", color: "#4ade80", desc: "모델 학습용" },
                { name: "Validation", pct: "15%", color: COLORS.primary, desc: "하이퍼파라미터 튜닝" },
                { name: "Test", pct: "15%", color: "#f43f5e", desc: "최종 성능 평가" },
              ].map((item, i) => (
                <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 20 }}>
                  <div style={{ fontSize: 24, color: item.color, fontWeight: 700 }}>{item.name}</div>
                  <div style={{ fontSize: 36, color: COLORS.light, margin: "10px 0" }}>{item.pct}</div>
                  <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>{item.desc}</div>
                </div>
              ))}
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
      <Audio src={staticFile("audio/lesson-9-2/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>데이터 준비 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          고품질 데이터셋 구축 방법 학습<br />
          다음: YOLO로 번호판 검출
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_2Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.collection.start} durationInFrames={SCENE_TIMINGS.collection.duration}><SceneCollection /></Sequence>
    <Sequence from={SCENE_TIMINGS.labeling.start} durationInFrames={SCENE_TIMINGS.labeling.duration}><SceneLabeling /></Sequence>
    <Sequence from={SCENE_TIMINGS.format.start} durationInFrames={SCENE_TIMINGS.format.duration}><SceneFormat /></Sequence>
    <Sequence from={SCENE_TIMINGS.augmentation.start} durationInFrames={SCENE_TIMINGS.augmentation.duration}><SceneAugmentation /></Sequence>
    <Sequence from={SCENE_TIMINGS.split.start} durationInFrames={SCENE_TIMINGS.split.duration}><SceneSplit /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
