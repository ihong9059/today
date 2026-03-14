import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_1_DURATION = 7899;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 626 },
  cpu_vs_gpu: { start: 626, duration: 1184 },
  why_gpu: { start: 1810, duration: 1101 },
  parallel_computing: { start: 2911, duration: 1156 },
  nvidia_ecosystem: { start: 4067, duration: 1151 },
  memory_bandwidth: { start: 5218, duration: 1021 },
  practical_tips: { start: 6239, duration: 1115 },
  outro: { start: 7354, duration: 545 },
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
      <Audio src={staticFile("audio/lesson-8-1/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🖥️</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>GPU와 병렬 컴퓨팅</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>딥러닝 가속의 핵심</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-1
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCpuVsGpu: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/cpu_vs_gpu.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>CPU vs GPU 설계 철학</h1>
        <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🧠</div>
            <div style={{ fontSize: 36, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>CPU</div>
            <div style={{ fontSize: 26, color: "rgba(255,255,255,0.9)", marginBottom: 10 }}>천재 교수 1명</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", textAlign: "left", lineHeight: 1.8, marginTop: 20 }}>
              <li>복잡한 연산 처리</li>
              <li>분기/조건문 최적화</li>
              <li>순차 처리 특화</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>⚡</div>
            <div style={{ fontSize: 36, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>GPU</div>
            <div style={{ fontSize: 26, color: "rgba(255,255,255,0.9)", marginBottom: 10 }}>학생 1000명</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", textAlign: "left", lineHeight: 1.8, marginTop: 20 }}>
              <li>단순 연산 병렬 처리</li>
              <li>동일 작업 대량 처리</li>
              <li>수천 개 코어 보유</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneWhyGpu: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/why_gpu.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>딥러닝에 GPU가 필요한 이유</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 25 }}>행렬 연산의 특성</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {Array(16).fill(0).map((_, i) => (
                <div key={i} style={{
                  width: 60, height: 60,
                  background: `rgba(244,63,94,${0.3 + (frame % 30) / 60})`,
                  borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center",
                  color: COLORS.light, fontSize: 20
                }}>{i + 1}</div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 100, textAlign: "center", marginBottom: 20 }}>🔢</div>
            <ul style={{ fontSize: 26, color: "rgba(255,255,255,0.9)", lineHeight: 2 }}>
              <li>각 원소가 독립적으로 계산</li>
              <li>수백만 개 파라미터 동시 업데이트</li>
              <li>병렬 처리에 최적화된 구조</li>
              <li>GPU로 수십~수백 배 속도 향상</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneParallelComputing: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/parallel_computing.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>병렬 컴퓨팅 원리</h1>
        <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>📣</div>
            <div style={{ fontSize: 28, color: COLORS.light }}>SIMD</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>Single Instruction<br />Multiple Data</div>
          </div>
          <div style={{ fontSize: 60, color: COLORS.primary }}>→</div>
          <div style={{ flex: 2 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {Array(32).fill(0).map((_, i) => (
                <div key={i} style={{
                  width: 45, height: 45,
                  background: COLORS.primary,
                  borderRadius: "50%",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontSize: 14, color: COLORS.light,
                  transform: `scale(${1 + Math.sin((frame + i * 3) * 0.1) * 0.1})`
                }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 26, color: COLORS.light, textAlign: "center", marginTop: 25 }}>32개 스레드 = 1 Warp</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", textAlign: "center", marginTop: 10 }}>하나의 명령으로 32개 데이터 동시 처리</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneNvidiaEcosystem: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/nvidia_ecosystem.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>NVIDIA 생태계</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {[
            { icon: "🎮", title: "CUDA", desc: "병렬 컴퓨팅 플랫폼" },
            { icon: "🧠", title: "cuDNN", desc: "딥러닝 라이브러리" },
            { icon: "⚡", title: "TensorRT", desc: "추론 최적화" },
            { icon: "📊", title: "NCCL", desc: "멀티 GPU 통신" },
            { icon: "🔧", title: "Nsight", desc: "프로파일링 도구" },
            { icon: "🚀", title: "Triton", desc: "추론 서버" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 30,
              textAlign: "center",
              transform: `translateY(${Math.sin((frame + i * 10) * 0.05) * 5}px)`
            }}>
              <div style={{ fontSize: 50, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMemoryBandwidth: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-1/memory_bandwidth.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>메모리 대역폭</h1>
        <div style={{ display: "flex", gap: 60, justifyContent: "center", alignItems: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🛣️</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>CPU DDR5</div>
            <div style={{ fontSize: 48, color: COLORS.primary, fontWeight: 800 }}>~100GB/s</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>2차선 도로</div>
          </div>
          <div style={{ fontSize: 60, color: COLORS.primary }}>vs</div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🚀</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>GPU HBM3</div>
            <div style={{ fontSize: 48, color: COLORS.primary, fontWeight: 800 }}>~3TB/s</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)", marginTop: 10 }}>64차선 고속도로</div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.9)" }}>GPU는 메모리 대역폭도 30배 이상 빠릅니다</div>
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
      <Audio src={staticFile("audio/lesson-8-1/practical_tips.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>GPU 활용 팁</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>💡</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>필수 확인 사항</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>nvidia-smi로 GPU 상태 확인</li>
              <li>CUDA 버전과 드라이버 호환성</li>
              <li>VRAM 용량 확인 (8GB 이상 권장)</li>
              <li>PCIe 대역폭 확인</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>⚠️</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>흔한 실수</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>모델이 GPU에 안 올라감</li>
              <li>데이터가 CPU에 남아있음</li>
              <li>배치 사이즈가 너무 작음</li>
              <li>병목이 데이터 로딩</li>
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
      <Audio src={staticFile("audio/lesson-8-1/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          CPU: 순차 처리 전문가 | GPU: 병렬 처리 전문가<br />
          딥러닝 행렬 연산 → GPU 최적
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: CUDA 프로그래밍 기초
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_1Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.cpu_vs_gpu.start} durationInFrames={SCENE_TIMINGS.cpu_vs_gpu.duration}><SceneCpuVsGpu /></Sequence>
    <Sequence from={SCENE_TIMINGS.why_gpu.start} durationInFrames={SCENE_TIMINGS.why_gpu.duration}><SceneWhyGpu /></Sequence>
    <Sequence from={SCENE_TIMINGS.parallel_computing.start} durationInFrames={SCENE_TIMINGS.parallel_computing.duration}><SceneParallelComputing /></Sequence>
    <Sequence from={SCENE_TIMINGS.nvidia_ecosystem.start} durationInFrames={SCENE_TIMINGS.nvidia_ecosystem.duration}><SceneNvidiaEcosystem /></Sequence>
    <Sequence from={SCENE_TIMINGS.memory_bandwidth.start} durationInFrames={SCENE_TIMINGS.memory_bandwidth.duration}><SceneMemoryBandwidth /></Sequence>
    <Sequence from={SCENE_TIMINGS.practical_tips.start} durationInFrames={SCENE_TIMINGS.practical_tips.duration}><ScenePracticalTips /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
