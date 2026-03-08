import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_1_DURATION = 5231;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 628 },
  overview: { start: 628, duration: 786 },
  architecture: { start: 1414, duration: 1016 },
  detection: { start: 2430, duration: 736 },
  recognition: { start: 3166, duration: 686 },
  requirements: { start: 3852, duration: 811 },
  outro: { start: 4663, duration: 568 },
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
      <Audio src={staticFile("audio/lesson-9-1/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🏆</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>종합 프로젝트 개요</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>번호판 인식 시스템 구축</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-1
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOverview: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/overview.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>프로젝트 개요</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🚗</div>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>번호판 자동 인식</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>차량 이미지 입력</li>
              <li>번호판 영역 검출</li>
              <li>문자 인식 및 출력</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🎯</div>
            <div style={{ fontSize: 26, color: COLORS.light, marginBottom: 20 }}>실전 AI 프로젝트</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>데이터 수집부터 배포까지</li>
              <li>전체 파이프라인 구축</li>
              <li>MLOps 적용</li>
            </ul>
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
      <Audio src={staticFile("audio/lesson-9-1/architecture.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>시스템 아키텍처</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>
          {["이미지 입력", "번호판 검출", "문자 분할", "문자 인식", "결과 출력"].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{
                padding: "25px 35px",
                background: `rgba(245,158,11,${0.2 + i * 0.15})`,
                borderRadius: 15,
                textAlign: "center",
                color: COLORS.light,
                fontSize: 22,
                fontWeight: 600
              }}>
                {step}
              </div>
              {i < 4 && <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: 60, display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 24, color: COLORS.primary, marginBottom: 15 }}>Detection (검출)</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>YOLO 기반 객체 검출로 번호판 위치 파악</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 24, color: COLORS.primary, marginBottom: 15 }}>Recognition (인식)</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>CNN 기반 OCR로 문자 인식</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDetection: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/detection.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>번호판 검출 (Detection)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>📦</div>
            <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginBottom: 20 }}>YOLO</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>실시간 객체 검출</li>
              <li>높은 정확도</li>
              <li>바운딩 박스 추출</li>
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: 40, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: 300, height: 200, background: "rgba(245,158,11,0.2)", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <div style={{ fontSize: 60 }}>🚗</div>
                <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", border: `3px solid ${COLORS.primary}`, padding: "5px 15px", borderRadius: 5 }}>
                  <span style={{ color: COLORS.light, fontSize: 16 }}>12가 3456</span>
                </div>
              </div>
              <div style={{ marginTop: 20, color: "rgba(255,255,255,0.7)", fontSize: 18 }}>번호판 영역 검출</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneRecognition: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/recognition.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>문자 인식 (Recognition)</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20 }}>🔤</div>
            <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginBottom: 20 }}>CNN OCR</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>문자 세그멘테이션</li>
              <li>각 문자 분류</li>
              <li>결과 조합</li>
            </ul>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25, display: "flex", justifyContent: "center", gap: 10 }}>
              {["1", "2", "가", "3", "4", "5", "6"].map((char, i) => (
                <div key={i} style={{ width: 50, height: 60, background: COLORS.primary, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center", color: "#000", fontSize: 24, fontWeight: 700 }}>
                  {char}
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(0,200,100,0.2)", borderRadius: 15, padding: 25, textAlign: "center" }}>
              <div style={{ fontSize: 36, color: "#4ade80", fontWeight: 700 }}>12가 3456</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>인식 결과</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneRequirements: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-1/requirements.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>프로젝트 요구사항</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {[
            { icon: "💾", title: "데이터", items: ["다양한 번호판 이미지", "라벨링 데이터"] },
            { icon: "🧠", title: "모델", items: ["YOLO 검출 모델", "CNN 인식 모델"] },
            { icon: "⚙️", title: "환경", items: ["Python, PyTorch", "GPU 권장"] },
            { icon: "📊", title: "평가", items: ["정확도 측정", "에러 분석"] },
            { icon: "🚀", title: "배포", items: ["REST API", "Docker 컨테이너"] },
            { icon: "🔄", title: "운영", items: ["모니터링", "지속적 개선"] },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 24, color: COLORS.primary, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
              {item.items.map((text, j) => (
                <div key={j} style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 5 }}>• {text}</div>
              ))}
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
      <Audio src={staticFile("audio/lesson-9-1/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>🏆</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>프로젝트 시작!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          번호판 인식 시스템 개요 완료<br />
          다음: 데이터 수집과 준비
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_1Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.overview.start} durationInFrames={SCENE_TIMINGS.overview.duration}><SceneOverview /></Sequence>
    <Sequence from={SCENE_TIMINGS.architecture.start} durationInFrames={SCENE_TIMINGS.architecture.duration}><SceneArchitecture /></Sequence>
    <Sequence from={SCENE_TIMINGS.detection.start} durationInFrames={SCENE_TIMINGS.detection.duration}><SceneDetection /></Sequence>
    <Sequence from={SCENE_TIMINGS.recognition.start} durationInFrames={SCENE_TIMINGS.recognition.duration}><SceneRecognition /></Sequence>
    <Sequence from={SCENE_TIMINGS.requirements.start} durationInFrames={SCENE_TIMINGS.requirements.duration}><SceneRequirements /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
