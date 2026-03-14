import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_7_DURATION = 5284;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 541 },
  versioning: { start: 541, duration: 789 },
  pipeline: { start: 1330, duration: 811 },
  cicd: { start: 2141, duration: 926 },
  monitoring: { start: 3067, duration: 883 },
  abtest: { start: 3950, duration: 874 },
  outro: { start: 4824, duration: 460 },
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
      <Audio src={staticFile("audio/lesson-9-7/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔄</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>MLOps 기초</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>지속적인 모델 운영</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-7
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneVersioning: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-7/versioning.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>버전 관리</h1>
        <div style={{ display: "flex", gap: 40 }}>
          {[
            { icon: "💾", title: "데이터 버전", tool: "DVC", desc: "데이터셋 버전 추적\nGit-like 관리" },
            { icon: "📝", title: "코드 버전", tool: "Git", desc: "소스 코드 관리\n협업 워크플로" },
            { icon: "🧠", title: "모델 버전", tool: "MLflow", desc: "실험 추적\n파라미터 기록" },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
              <div style={{ padding: "8px 20px", background: COLORS.primary, borderRadius: 20, display: "inline-block", color: "#000", fontWeight: 600, fontSize: 18, marginBottom: 15 }}>{item.tool}</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePipeline: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-7/pipeline.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>자동화 파이프라인</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 15, marginBottom: 40 }}>
          {["데이터 수집", "전처리", "학습", "평가", "배포"].map((step, i) => (
            <React.Fragment key={i}>
              <div style={{
                padding: "20px 25px",
                background: `rgba(245,158,11,${0.2 + i * 0.15})`,
                borderRadius: 12,
                textAlign: "center",
                color: COLORS.light,
                fontSize: 18,
                fontWeight: 600
              }}>
                {step}
              </div>
              {i < 4 && <div style={{ fontSize: 24, color: COLORS.primary }}>→</div>}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>Apache Airflow</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>DAG 기반 워크플로 오케스트레이션</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>Kubeflow</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>K8s 기반 ML 파이프라인</div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>Prefect</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>현대적 데이터 파이프라인</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCICD: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-7/cicd.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CI/CD for ML</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginBottom: 20 }}>CI (Continuous Integration)</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>코드 변경 시 자동 테스트</li>
              <li>데이터 검증</li>
              <li>모델 학습 트리거</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginBottom: 20 }}>CD (Continuous Deployment)</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>성능 기준 통과 시 자동 배포</li>
              <li>롤백 자동화</li>
              <li>스테이징 환경 테스트</li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 20 }}>
          {["GitHub Actions", "Jenkins", "GitLab CI"].map((tool, i) => (
            <div key={i} style={{ padding: "12px 25px", background: "rgba(245,158,11,0.2)", borderRadius: 25, color: COLORS.light, fontSize: 18 }}>{tool}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMonitoring: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-7/monitoring.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>서비스 모니터링</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {[
            { icon: "📉", title: "모델 성능", desc: "정확도 저하 감지\nData Drift 탐지" },
            { icon: "⏱️", title: "추론 시간", desc: "레이턴시 모니터링\n병목 구간 파악" },
            { icon: "❌", title: "에러율", desc: "오류 추적\n실패 패턴 분석" },
            { icon: "💻", title: "리소스", desc: "CPU/GPU 사용량\n메모리 모니터링" },
            { icon: "🔔", title: "알림", desc: "이상 감지 시 알림\nSlack/Email 연동" },
            { icon: "📊", title: "대시보드", desc: "Grafana 시각화\n실시간 현황" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 25 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 20, color: COLORS.primary, fontWeight: 600, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneABTest: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-7/abtest.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>A/B 테스트</h1>
        <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", marginBottom: 30 }}>
              <div style={{ flex: 1, background: "#3b82f6", padding: 25, borderRadius: "15px 0 0 15px", textAlign: "center" }}>
                <div style={{ fontSize: 28, color: "#fff", fontWeight: 700 }}>Model A</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>기존 모델 (90%)</div>
              </div>
              <div style={{ flex: 1, background: "#4ade80", padding: 25, borderRadius: "0 15px 15px 0", textAlign: "center" }}>
                <div style={{ fontSize: 28, color: "#000", fontWeight: 700 }}>Model B</div>
                <div style={{ fontSize: 18, color: "rgba(0,0,0,0.7)", marginTop: 10 }}>신규 모델 (10%)</div>
              </div>
            </div>
            <div style={{ background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 20, color: COLORS.light }}>트래픽 분할로 실제 성능 비교</div>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30 }}>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>카나리 배포</div>
            <ul style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>점진적 트래픽 이동</li>
              <li>문제 시 빠른 롤백</li>
              <li>통계적 유의성 검증</li>
              <li>리스크 최소화</li>
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
      <Audio src={staticFile("audio/lesson-9-7/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>🔄</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>MLOps 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          지속적인 모델 운영 방법 학습<br />
          다음: 최종 회고
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_7Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.versioning.start} durationInFrames={SCENE_TIMINGS.versioning.duration}><SceneVersioning /></Sequence>
    <Sequence from={SCENE_TIMINGS.pipeline.start} durationInFrames={SCENE_TIMINGS.pipeline.duration}><ScenePipeline /></Sequence>
    <Sequence from={SCENE_TIMINGS.cicd.start} durationInFrames={SCENE_TIMINGS.cicd.duration}><SceneCICD /></Sequence>
    <Sequence from={SCENE_TIMINGS.monitoring.start} durationInFrames={SCENE_TIMINGS.monitoring.duration}><SceneMonitoring /></Sequence>
    <Sequence from={SCENE_TIMINGS.abtest.start} durationInFrames={SCENE_TIMINGS.abtest.duration}><SceneABTest /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
