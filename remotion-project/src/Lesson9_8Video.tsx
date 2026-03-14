import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_8_DURATION = 5120;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 504 },
  journey: { start: 504, duration: 743 },
  advanced: { start: 1247, duration: 804 },
  project: { start: 2051, duration: 820 },
  skills: { start: 2871, duration: 809 },
  next_steps: { start: 3680, duration: 741 },
  outro: { start: 4421, duration: 699 },
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
      <Audio src={staticFile("audio/lesson-9-8/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🏆</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>최종 회고</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>AI 첫걸음 완료</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-8
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneJourney: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-8/journey.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>전체 과정 회고 (1-4)</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 25 }}>
          {[
            { level: "Level 1", title: "AI 기초", icon: "🤖", items: ["AI 개념", "머신러닝 기초", "데이터의 이해"] },
            { level: "Level 2", title: "파이썬 & 수학", icon: "🐍", items: ["Python 기초", "NumPy/Pandas", "선형대수/미적분"] },
            { level: "Level 3", title: "딥러닝 기초", icon: "🧠", items: ["신경망 구조", "역전파", "활성화 함수"] },
            { level: "Level 4", title: "PyTorch 실습", icon: "🔥", items: ["텐서 연산", "nn.Module", "학습 루프"] },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.15)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 600 }}>{item.level}</div>
              <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 15 }}>{item.title}</div>
              {item.items.map((text, j) => (
                <div key={j} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 5 }}>• {text}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAdvanced: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-8/advanced.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>전체 과정 회고 (5-8)</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 25 }}>
          {[
            { level: "Level 5", title: "컴퓨터 비전", icon: "👁️", items: ["CNN 구조", "합성곱 연산", "전이 학습"] },
            { level: "Level 6", title: "시퀀스 모델", icon: "📊", items: ["RNN/LSTM", "시계열 데이터", "Seq2Seq"] },
            { level: "Level 7", title: "Transformer", icon: "🤖", items: ["Attention", "GPT/BERT", "LLM 활용"] },
            { level: "Level 8", title: "GPU 프로그래밍", icon: "⚡", items: ["CUDA 기초", "메모리 최적화", "병렬 컴퓨팅"] },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.15)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 600 }}>{item.level}</div>
              <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 15 }}>{item.title}</div>
              {item.items.map((text, j) => (
                <div key={j} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 5 }}>• {text}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneProject: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-8/project.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>종합 프로젝트 완성</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 15, marginBottom: 40 }}>
          {["데이터 수집", "YOLO 검출", "CNN 인식", "모델 평가", "배포", "MLOps"].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{
                padding: "15px 20px",
                background: `rgba(245,158,11,${0.2 + i * 0.12})`,
                borderRadius: 10,
                textAlign: "center",
                color: COLORS.light,
                fontSize: 16,
                fontWeight: 600
              }}>
                {step}
              </div>
              {i < 5 && <div style={{ fontSize: 20, color: COLORS.primary }}>→</div>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1, background: "rgba(0,200,100,0.15)", borderRadius: 15, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 15 }}>🚗</div>
            <div style={{ fontSize: 28, color: "#4ade80", fontWeight: 700 }}>번호판 인식 시스템</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 15 }}>처음부터 끝까지<br />전체 AI 프로젝트 사이클 경험</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 30 }}>
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 20 }}>학습한 기술 스택</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Python", "PyTorch", "YOLO", "CNN", "FastAPI", "Docker", "MLflow"].map((tech, i) => (
                <div key={i} style={{ padding: "8px 16px", background: "rgba(245,158,11,0.3)", borderRadius: 20, color: COLORS.light, fontSize: 14 }}>{tech}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSkills: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-8/skills.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>AI 커리어 방향</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { icon: "🔧", title: "ML Engineer", desc: "모델 개발 및 최적화\n프로덕션 시스템 구축" },
            { icon: "📊", title: "Data Scientist", desc: "데이터 분석 및 인사이트\n비즈니스 문제 해결" },
            { icon: "⚙️", title: "MLOps Engineer", desc: "모델 운영 자동화\n파이프라인 구축" },
            { icon: "🔬", title: "Research Scientist", desc: "새로운 알고리즘 개발\n논문 연구" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35, display: "flex", alignItems: "center", gap: 25 }}>
              <div style={{ fontSize: 60 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 26, color: COLORS.primary, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneNextSteps: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-8/next_steps.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>다음 학습 방향</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { icon: "🏅", title: "Kaggle 대회", desc: "실전 경험 쌓기\n실력 검증 및 향상" },
            { icon: "🌐", title: "오픈소스 기여", desc: "실제 프로젝트 참여\n커뮤니티 네트워킹" },
            { icon: "📚", title: "논문 읽기", desc: "최신 기술 동향 파악\n직접 구현해보기" },
            { icon: "💼", title: "포트폴리오", desc: "개인 프로젝트 구축\n결과물 공유" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35, display: "flex", alignItems: "center", gap: 25 }}>
              <div style={{ fontSize: 60 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 26, color: COLORS.primary, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line" }}>{item.desc}</div>
              </div>
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
      <Audio src={staticFile("audio/lesson-9-8/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 150, marginBottom: 30 }}>🎉</div>
        <div style={{ fontSize: 64, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>축하합니다!</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          AI 첫걸음 전체 과정을 완료했습니다!<br />
          여러분의 AI 여정을 응원합니다!
        </div>
        <div style={{ marginTop: 50, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          🚀 Keep Learning, Keep Growing! 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_8Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.journey.start} durationInFrames={SCENE_TIMINGS.journey.duration}><SceneJourney /></Sequence>
    <Sequence from={SCENE_TIMINGS.advanced.start} durationInFrames={SCENE_TIMINGS.advanced.duration}><SceneAdvanced /></Sequence>
    <Sequence from={SCENE_TIMINGS.project.start} durationInFrames={SCENE_TIMINGS.project.duration}><SceneProject /></Sequence>
    <Sequence from={SCENE_TIMINGS.skills.start} durationInFrames={SCENE_TIMINGS.skills.duration}><SceneSkills /></Sequence>
    <Sequence from={SCENE_TIMINGS.next_steps.start} durationInFrames={SCENE_TIMINGS.next_steps.duration}><SceneNextSteps /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
