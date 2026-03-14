import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_1_DURATION = 5240;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 564 },
  overview: { start: 564, duration: 982 },
  pipeline: { start: 1546, duration: 939 },
  skills: { start: 2485, duration: 847 },
  data_intro: { start: 3332, duration: 818 },
  goals: { start: 4150, duration: 778 },
  outro: { start: 4928, duration: 312 },
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
      <Audio src={staticFile("audio/lesson-9-1/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🚗</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>종합 프로젝트 개요</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>차량 번호판 인식 시스템</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-1
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOverview: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/overview.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>프로젝트 개요</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 36, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>실전 차량 번호판 인식</div>
            <ul style={{ fontSize: 26, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>실시간 차량 영상에서 번호판 검출</li>
              <li>검출된 번호판의 문자 인식</li>
              <li>주차장, 톨게이트, 보안 시스템 활용</li>
              <li>객체 검출 + 문자 인식 통합</li>
            </ul>
          </div>
          <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 15 }}>🎯</div>
            <div style={{ fontSize: 28, color: COLORS.light }}>실무에 바로 적용 가능한 AI 시스템 구축</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePipeline: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/pipeline.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>처리 파이프라인</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {[
            { num: "1", title: "영상 입력", desc: "카메라/비디오에서 프레임 추출", icon: "📹" },
            { num: "2", title: "번호판 검출", desc: "YOLO로 번호판 영역 찾기", icon: "🔍" },
            { num: "3", title: "영역 추출", desc: "검출된 번호판만 크롭", icon: "✂️" },
            { num: "4", title: "문자 분할", desc: "개별 글자 영역 분리", icon: "📝" },
            { num: "5", title: "문자 인식", desc: "CNN으로 각 글자 분류", icon: "🔤" },
            { num: "6", title: "결과 출력", desc: "완성된 번호판 번호", icon: "✅" },
          ].map((step, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 30,
              background: "rgba(245,158,11,0.15)", borderRadius: 16, padding: 25,
              transform: `translateX(${Math.sin((frame + i * 10) * 0.05) * 5}px)`
            }}>
              <div style={{ fontSize: 50, minWidth: 80, textAlign: "center" }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 32, color: COLORS.primary, fontWeight: 700 }}>{step.num}. {step.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSkills: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/skills.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>필요한 기술</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { icon: "🎯", title: "객체 검출", desc: "YOLO v8\n번호판 위치 찾기" },
            { icon: "🧠", title: "이미지 분류", desc: "CNN\n문자 인식" },
            { icon: "🔧", title: "영상 처리", desc: "OpenCV\n전처리/후처리" },
            { icon: "📊", title: "데이터 준비", desc: "라벨링\n데이터 증강" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(245,158,11,0.15)",
              borderRadius: 16,
              padding: 40,
              textAlign: "center",
              transform: `scale(${1 + Math.sin((frame + i * 15) * 0.08) * 0.03})`
            }}>
              <div style={{ fontSize: 70, marginBottom: 20 }}>{item.icon}</div>
              <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>{item.title}</div>
              <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDataIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/data_intro.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>데이터셋 구성</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>번호판 검출용</div>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🚗</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>차량 이미지 1000장</li>
              <li>번호판 바운딩 박스</li>
              <li>다양한 각도/조명</li>
              <li>YOLO 포맷 라벨</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>문자 인식용</div>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🔤</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>개별 문자 5000장</li>
              <li>숫자 0-9, 한글</li>
              <li>다양한 폰트/왜곡</li>
              <li>분류 라벨</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneGoals: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/goals.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>학습 목표</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>기술적 목표</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>YOLO 객체 검출 모델 학습 및 활용</li>
              <li>CNN 문자 인식 모델 구축</li>
              <li>두 모델을 통합한 파이프라인 완성</li>
              <li>실시간 처리 성능 최적화</li>
            </ul>
          </div>
          <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>실전 역량</div>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>데이터 수집 및 라벨링 경험</li>
              <li>모델 평가 및 개선 전략</li>
              <li>실무 프로젝트 완성 능력</li>
            </ul>
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
      <Audio src={staticFile("audio/lesson-9-1/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          YOLO 검출 + CNN 인식<br />
          실전 번호판 인식 시스템 구축 시작
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: 데이터 수집과 전처리
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_1Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.overview.start} durationInFrames={SCENE_TIMINGS.overview.duration}><SceneOverview /></Sequence>
    <Sequence from={SCENE_TIMINGS.pipeline.start} durationInFrames={SCENE_TIMINGS.pipeline.duration}><ScenePipeline /></Sequence>
    <Sequence from={SCENE_TIMINGS.skills.start} durationInFrames={SCENE_TIMINGS.skills.duration}><SceneSkills /></Sequence>
    <Sequence from={SCENE_TIMINGS.data_intro.start} durationInFrames={SCENE_TIMINGS.data_intro.duration}><SceneDataIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.goals.start} durationInFrames={SCENE_TIMINGS.goals.duration}><SceneGoals /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
