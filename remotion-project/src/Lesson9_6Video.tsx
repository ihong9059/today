import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_9_6_DURATION = 5023;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 551 },
  fastapi: { start: 551, duration: 847 },
  optimization: { start: 1398, duration: 891 },
  docker: { start: 2289, duration: 715 },
  edge: { start: 3004, duration: 832 },
  scaling: { start: 3836, duration: 711 },
  outro: { start: 4547, duration: 476 },
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
      <Audio src={staticFile("audio/lesson-9-6/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🚀</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>모델 배포</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>서비스 운영 환경 구축</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 9-6
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneFastAPI: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-6/fastapi.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>FastAPI REST API</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "#1e293b", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 15 }}>API 코드</div>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: COLORS.light, lineHeight: 1.8 }}>
              <div>@app.post("/predict")</div>
              <div>async def predict(file: UploadFile):</div>
              <div style={{ paddingLeft: 20 }}>image = read_image(file)</div>
              <div style={{ paddingLeft: 20 }}>plates = detector(image)</div>
              <div style={{ paddingLeft: 20 }}>text = recognizer(plates)</div>
              <div style={{ paddingLeft: 20 }}>return {`{"plate": text}`}</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(245,158,11,0.15)", borderRadius: 15, padding: 25, marginBottom: 20 }}>
              <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>FastAPI 장점</div>
              <ul style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                <li>비동기 처리 (async/await)</li>
                <li>자동 API 문서화 (Swagger)</li>
                <li>타입 검증 (Pydantic)</li>
                <li>높은 성능</li>
              </ul>
            </div>
            <div style={{ background: "rgba(0,200,100,0.15)", borderRadius: 15, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 20, color: "#4ade80" }}>http://localhost:8000/docs</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOptimization: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-6/optimization.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>모델 최적화</h1>
        <div style={{ display: "flex", gap: 30 }}>
          {[
            { icon: "⚡", title: "TorchScript", desc: "JIT 컴파일\n추론 속도 향상" },
            { icon: "🔄", title: "ONNX", desc: "범용 모델 포맷\n다양한 런타임" },
            { icon: "📉", title: "Quantization", desc: "FP32 → INT8\n모델 크기 감소" },
            { icon: "✂️", title: "Pruning", desc: "불필요한 가중치 제거\n경량화" },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 24, color: COLORS.primary, fontWeight: 700, marginBottom: 15 }}>{item.title}</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDocker: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-6/docker.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Docker 컨테이너화</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "#1e293b", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 15 }}>Dockerfile</div>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: COLORS.light, lineHeight: 1.8 }}>
              <div>FROM python:3.10-slim</div>
              <div>WORKDIR /app</div>
              <div>COPY requirements.txt .</div>
              <div>RUN pip install -r requirements.txt</div>
              <div>COPY . .</div>
              <div>EXPOSE 8000</div>
              <div>CMD ["uvicorn", "main:app"]</div>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 22, color: COLORS.light, marginBottom: 20 }}>Docker 장점</div>
            <ul style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>환경 일관성 보장</li>
              <li>배포 자동화</li>
              <li>스케일링 용이</li>
              <li>격리된 실행 환경</li>
            </ul>
            <div style={{ marginTop: 20, background: "#1e293b", padding: 15, borderRadius: 10, fontFamily: "monospace", fontSize: 14, color: COLORS.light }}>
              docker build -t plate-api .<br />
              docker run -p 8000:8000 plate-api
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneEdge: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-6/edge.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>엣지 배포</h1>
        <div style={{ display: "flex", gap: 40 }}>
          {[
            { icon: "🍓", title: "Raspberry Pi", desc: "ARM 기반 소형 컴퓨터\nPyTorch Mobile" },
            { icon: "🎮", title: "Jetson", desc: "NVIDIA GPU 탑재\nTensorRT 최적화" },
            { icon: "📱", title: "Mobile", desc: "Android/iOS\nTFLite, CoreML" },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 80, marginBottom: 20 }}>{item.icon}</div>
              <div style={{ fontSize: 28, color: COLORS.primary, fontWeight: 700, marginBottom: 15 }}>{item.title}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line" }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, background: "rgba(245,158,11,0.1)", borderRadius: 15, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 22, color: COLORS.light }}>실시간 처리를 위한 모델 경량화 필수</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneScaling: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-9-6/scaling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>서비스 확장</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 15 }}>☸️</div>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>Kubernetes</div>
            <ul style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", textAlign: "left", lineHeight: 1.8 }}>
              <li>오토 스케일링</li>
              <li>롤링 업데이트</li>
              <li>셀프 힐링</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 15 }}>⚖️</div>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>Load Balancer</div>
            <ul style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", textAlign: "left", lineHeight: 1.8 }}>
              <li>트래픽 분산</li>
              <li>고가용성</li>
              <li>헬스 체크</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(245,158,11,0.15)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 60, marginBottom: 15 }}>📊</div>
            <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>Monitoring</div>
            <ul style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", textAlign: "left", lineHeight: 1.8 }}>
              <li>Prometheus</li>
              <li>Grafana</li>
              <li>알림 설정</li>
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
      <Audio src={staticFile("audio/lesson-9-6/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>🚀</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>배포 완료!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          모델 서비스화 방법 학습<br />
          다음: MLOps 기초
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson9_6Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.fastapi.start} durationInFrames={SCENE_TIMINGS.fastapi.duration}><SceneFastAPI /></Sequence>
    <Sequence from={SCENE_TIMINGS.optimization.start} durationInFrames={SCENE_TIMINGS.optimization.duration}><SceneOptimization /></Sequence>
    <Sequence from={SCENE_TIMINGS.docker.start} durationInFrames={SCENE_TIMINGS.docker.duration}><SceneDocker /></Sequence>
    <Sequence from={SCENE_TIMINGS.edge.start} durationInFrames={SCENE_TIMINGS.edge.duration}><SceneEdge /></Sequence>
    <Sequence from={SCENE_TIMINGS.scaling.start} durationInFrames={SCENE_TIMINGS.scaling.duration}><SceneScaling /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
