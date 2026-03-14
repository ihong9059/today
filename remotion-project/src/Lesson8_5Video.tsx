import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_5_DURATION = 6269;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 560 },
  why_distributed: { start: 560, duration: 837 },
  data_parallel: { start: 1397, duration: 820 },
  ddp: { start: 2217, duration: 1014 },
  model_parallel: { start: 3231, duration: 819 },
  fsdp: { start: 4050, duration: 913 },
  practical_tips: { start: 4963, duration: 787 },
  outro: { start: 5750, duration: 519 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#f43f5e",
  secondary: "#e11d48",
  accent: "#be123c",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, zIndex: 9999, display: "flex", alignItems: "center", gap: 15 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 60, height: 60, borderRadius: 8 }} />
      <span style={{ color: "white", fontSize: 28, fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: "rgba(244, 63, 94, 0.9)", padding: "10px 30px", borderRadius: 25 }}>
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
      <Audio src={staticFile("audio/lesson-8-5/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🌐</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>분산 학습 기초</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>여러 GPU로 함께 학습하기</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-5
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneWhyDistributed: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/why_distributed.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>왜 분산 학습인가?</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>⚡</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>속도</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>4 GPU = 4배 빠른 학습</li>
              <li>배치 크기 증가</li>
              <li>학습 시간 단축</li>
              <li>더 많은 실험 가능</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>💪</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>규모</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>대형 모델 학습 가능</li>
              <li>메모리 한계 극복</li>
              <li>대규모 데이터셋 처리</li>
              <li>상용 모델 수준 도달</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDataParallel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/data_parallel.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>DataParallel (DP)</h1>
        <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <div style={{ fontSize: 80, marginBottom: 15 }}>📦</div>
              <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700 }}>단일 프로세스</div>
            </div>
            <div style={{ background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30 }}>
              <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
                <li>가장 간단한 방법</li>
                <li>한 줄로 적용 가능</li>
                <li>GPU 0이 병목</li>
                <li>멀티 노드 불가</li>
              </ul>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, fontFamily: "monospace" }}>
            <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
              <div><span style={{ color: "#66d9ef" }}>import</span> torch.nn <span style={{ color: "#66d9ef" }}>as</span> nn</div>
              <div style={{ marginTop: 15 }}># 간단한 적용</div>
              <div>model = nn.<span style={{ color: "#a6e22e" }}>DataParallel</span>(model)</div>
              <div style={{ marginTop: 15 }}># GPU 지정</div>
              <div>model = nn.<span style={{ color: "#a6e22e" }}>DataParallel</span>(</div>
              <div style={{ paddingLeft: 30 }}>model,</div>
              <div style={{ paddingLeft: 30 }}>device_ids=[<span style={{ color: "#ae81ff" }}>0</span>,<span style={{ color: "#ae81ff" }}>1</span>,<span style={{ color: "#ae81ff" }}>2</span>,<span style={{ color: "#ae81ff" }}>3</span>]</div>
              <div>)</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDdp: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/ddp.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>DistributedDataParallel (DDP)</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { icon: "🚀", title: "멀티 프로세스", desc: "각 GPU마다 독립 프로세스\n통신 오버헤드 최소화" },
            { icon: "⚡", title: "효율적", desc: "GPU 0 병목 없음\nDP보다 훨씬 빠름" },
            { icon: "🌐", title: "확장성", desc: "멀티 노드 지원\n수백 개 GPU 활용" },
            { icon: "🔄", title: "그래디언트 동기화", desc: "All-reduce 연산\n모든 GPU 평균 계산" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 35,
              transform: `translateY(${Math.sin((frame + i * 15) * 0.05) * 5}px)`
            }}>
              <div style={{ fontSize: 50, textAlign: "center", marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15, textAlign: "center" }}>{item.title}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneModelParallel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/model_parallel.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Model Parallelism</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>🧩</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Pipeline Parallel</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>모델을 레이어별로 분할</li>
              <li>각 GPU가 일부 레이어 담당</li>
              <li>순차적으로 데이터 전달</li>
              <li>초대형 모델에 적합</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>🔀</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Tensor Parallel</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>하나의 레이어를 분할</li>
              <li>행렬 연산을 나눔</li>
              <li>매우 큰 레이어 처리</li>
              <li>통신량이 많음</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneFsdp: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/fsdp.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>FSDP (Fully Sharded Data Parallel)</h1>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 100, marginBottom: 20 }}>💎</div>
          <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>최신 분산 학습 기술</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {[
            { title: "파라미터 샤딩", desc: "모델 파라미터 분할 저장" },
            { title: "그래디언트 샤딩", desc: "그래디언트도 분산 저장" },
            { title: "Optimizer 샤딩", desc: "Optimizer 상태 분할" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 30,
              textAlign: "center",
              transform: `scale(${1 + Math.sin((frame + i * 20) * 0.04) * 0.02})`
            }}>
              <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 35, marginTop: 40, textAlign: "center" }}>
          <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 10 }}>
            <strong>결과:</strong> 메모리 사용량 최대 1/N로 감소 (N = GPU 개수)
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>
            DDP 대비 훨씬 큰 모델 학습 가능
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePracticalTips: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-5/practical_tips.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>실전 팁</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>🎯</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>선택 가이드</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><strong>소형 모델:</strong> DDP</li>
              <li><strong>중형 모델:</strong> DDP + Mixed Precision</li>
              <li><strong>대형 모델:</strong> FSDP</li>
              <li><strong>초대형 모델:</strong> FSDP + Model Parallel</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>💡</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>주의사항</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>배치 크기 조정 필요</li>
              <li>학습률 스케일링</li>
              <li>Seed 고정으로 재현성 확보</li>
              <li>통신 오버헤드 고려</li>
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
      <Audio src={staticFile("audio/lesson-8-5/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          DP, DDP, Model Parallel, FSDP<br />
          모델 크기에 맞는 분산 전략 선택
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: 메모리 최적화
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_5Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.why_distributed.start} durationInFrames={SCENE_TIMINGS.why_distributed.duration}><SceneWhyDistributed /></Sequence>
    <Sequence from={SCENE_TIMINGS.data_parallel.start} durationInFrames={SCENE_TIMINGS.data_parallel.duration}><SceneDataParallel /></Sequence>
    <Sequence from={SCENE_TIMINGS.ddp.start} durationInFrames={SCENE_TIMINGS.ddp.duration}><SceneDdp /></Sequence>
    <Sequence from={SCENE_TIMINGS.model_parallel.start} durationInFrames={SCENE_TIMINGS.model_parallel.duration}><SceneModelParallel /></Sequence>
    <Sequence from={SCENE_TIMINGS.fsdp.start} durationInFrames={SCENE_TIMINGS.fsdp.duration}><SceneFsdp /></Sequence>
    <Sequence from={SCENE_TIMINGS.practical_tips.start} durationInFrames={SCENE_TIMINGS.practical_tips.duration}><ScenePracticalTips /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
