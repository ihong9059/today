import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_2_DURATION = 5439;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 537 },
  data_sources: { start: 537, duration: 891 },
  annotation: { start: 1428, duration: 886 },
  preprocessing: { start: 2314, duration: 928 },
  augmentation: { start: 3242, duration: 835 },
  split: { start: 4077, duration: 868 },
  outro: { start: 4945, duration: 494 },
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
      <Audio src={staticFile("audio/lesson-9-2/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>📊</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>데이터 수집과 전처리</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>번호판 데이터셋 준비</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-2
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDataSources: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/data_sources.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 수집 방법</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { icon: "🌐", title: "공개 데이터셋", desc: "Roboflow, Kaggle\n번호판 데이터셋" },
            { icon: "📹", title: "직접 촬영", desc: "주차장, 도로\n다양한 환경" },
            { icon: "🎨", title: "합성 데이터", desc: "번호판 템플릿\n자동 생성" },
            { icon: "🔄", title: "크롤링", desc: "웹 이미지 수집\n저작권 주의" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(245,158,11,0.15)",
              borderRadius: 16,
              padding: 40,
              textAlign: "center",
              transform: `translateY(${Math.sin((frame + i * 10) * 0.05) * 5}px)`
            }}>
              <div style={{ fontSize: 70, marginBottom: 20 }}>{item.icon}</div>
              <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>{item.title}</div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: "center", fontSize: 26, color: "rgba(255,255,255,0.9)" }}>
          최소 1000장 이상, 다양한 조건의 이미지 확보 권장
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAnnotation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/annotation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 라벨링</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>라벨링 도구</div>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🏷️</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>LabelImg (간단한 GUI)</li>
              <li>CVAT (협업 가능)</li>
              <li>Roboflow (클라우드)</li>
              <li>Labelbox (엔터프라이즈)</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>라벨 포맷</div>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>📝</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>YOLO: txt (정규화 좌표)</li>
              <li>COCO: json (절대 좌표)</li>
              <li>Pascal VOC: xml</li>
              <li>좌표: x, y, w, h</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 30, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
          <div style={{ fontSize: 26, color: COLORS.light }}>정확한 라벨링이 모델 성능의 90%를 결정합니다</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePreprocessing: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/preprocessing.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 전처리</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {[
            { icon: "📏", title: "크기 정규화", desc: "640x640으로 리사이즈, 종횡비 유지" },
            { icon: "🎨", title: "색상 정규화", desc: "RGB 0-255 → 0-1, 평균/표준편차 정규화" },
            { icon: "🔄", title: "노이즈 제거", desc: "블러, 샤프닝으로 선명도 개선" },
            { icon: "💡", title: "조명 보정", desc: "히스토그램 평활화, 대비 향상" },
            { icon: "✂️", title: "배경 제거", desc: "관심 영역만 추출, 불필요한 부분 크롭" },
          ].map((step, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 30,
              background: "rgba(245,158,11,0.15)", borderRadius: 16, padding: 25,
              transform: `translateX(${Math.sin((frame + i * 10) * 0.05) * 5}px)`
            }}>
              <div style={{ fontSize: 50, minWidth: 80, textAlign: "center" }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 32, color: COLORS.primary, fontWeight: 700 }}>{step.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAugmentation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/augmentation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 증강</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 25 }}>
          {[
            { icon: "🔄", title: "회전/반전", desc: "좌우 반전\n±15도 회전" },
            { icon: "📐", title: "크롭/스케일", desc: "랜덤 크롭\n0.8-1.2배 확대" },
            { icon: "🎨", title: "색상 변형", desc: "밝기 조절\n채도/대비" },
            { icon: "☁️", title: "노이즈 추가", desc: "가우시안 노이즈\nSalt & Pepper" },
            { icon: "🌫️", title: "블러", desc: "모션 블러\n가우시안 블러" },
            { icon: "🔆", title: "조명 효과", desc: "그림자 추가\n반사광 시뮬레이션" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(245,158,11,0.15)",
              borderRadius: 16,
              padding: 30,
              textAlign: "center",
              transform: `scale(${1 + Math.sin((frame + i * 12) * 0.08) * 0.03})`
            }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 30, textAlign: "center", fontSize: 26, color: "rgba(255,255,255,0.9)" }}>
          데이터 증강으로 학습 데이터 3-5배 증가 효과
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSplit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-2/split.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>데이터셋 분할</h1>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", alignItems: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>📚</div>
            <div style={{ fontSize: 36, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>Train</div>
            <div style={{ fontSize: 64, color: COLORS.primary, fontWeight: 800 }}>70%</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>모델 학습용</div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>✅</div>
            <div style={{ fontSize: 36, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>Valid</div>
            <div style={{ fontSize: 64, color: COLORS.primary, fontWeight: 800 }}>20%</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>검증 및 튜닝</div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🧪</div>
            <div style={{ fontSize: 36, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>Test</div>
            <div style={{ fontSize: 64, color: COLORS.primary, fontWeight: 800 }}>10%</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>최종 평가</div>
          </div>
        </div>
        <div style={{ marginTop: 50, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
          <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
            <li>계층화 분할 (Stratified Split): 클래스 비율 유지</li>
            <li>랜덤 시드 고정으로 재현성 확보</li>
            <li>Test 셋은 절대 학습에 사용 금지</li>
          </ul>
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
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          수집 → 라벨링 → 전처리 → 증강 → 분할<br />
          고품질 데이터셋 준비 완료
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: YOLO 번호판 검출
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_2Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.data_sources.start} durationInFrames={SCENE_TIMINGS.data_sources.duration}><SceneDataSources /></Sequence>
    <Sequence from={SCENE_TIMINGS.annotation.start} durationInFrames={SCENE_TIMINGS.annotation.duration}><SceneAnnotation /></Sequence>
    <Sequence from={SCENE_TIMINGS.preprocessing.start} durationInFrames={SCENE_TIMINGS.preprocessing.duration}><ScenePreprocessing /></Sequence>
    <Sequence from={SCENE_TIMINGS.augmentation.start} durationInFrames={SCENE_TIMINGS.augmentation.duration}><SceneAugmentation /></Sequence>
    <Sequence from={SCENE_TIMINGS.split.start} durationInFrames={SCENE_TIMINGS.split.duration}><SceneSplit /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
