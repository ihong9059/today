import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_2_DURATION = 7175;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 541 },
  cuda_basics: { start: 541, duration: 875 },
  thread_hierarchy: { start: 1416, duration: 1167 },
  memory_types: { start: 2583, duration: 1089 },
  pytorch_cuda: { start: 3672, duration: 1000 },
  synchronization: { start: 4672, duration: 973 },
  error_handling: { start: 5645, duration: 996 },
  outro: { start: 6641, duration: 534 },
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
      <Audio src={staticFile("audio/lesson-8-2/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔧</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>CUDA 프로그래밍 기초</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>GPU 프로그래밍의 시작</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-2
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCudaBasics: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/cuda_basics.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CUDA란 무엇인가?</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>🎮</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>CUDA</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", textAlign: "center" }}>Compute Unified Device Architecture</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2, marginTop: 20 }}>
              <li>NVIDIA의 병렬 컴퓨팅 플랫폼</li>
              <li>GPU에서 범용 연산 수행</li>
              <li>C/C++ 확장 언어 제공</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>📦</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Host & Device</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><strong>Host:</strong> CPU와 시스템 메모리</li>
              <li><strong>Device:</strong> GPU와 GPU 메모리</li>
              <li>데이터를 Host에서 Device로 전송</li>
              <li>연산 후 결과를 다시 Host로</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneThreadHierarchy: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/thread_hierarchy.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>스레드 계층 구조</h1>
        <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
          {[
            { title: "Grid", desc: "전체 커널 실행 단위", icon: "🌐", color: "rgba(244,63,94,0.3)" },
            { title: "Block", desc: "스레드 그룹\n공유 메모리 접근", icon: "📦", color: "rgba(244,63,94,0.5)" },
            { title: "Thread", desc: "개별 실행 단위\n로컬 변수 보유", icon: "⚡", color: "rgba(244,63,94,0.7)" },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1,
              background: item.color,
              borderRadius: 20,
              padding: 35,
              textAlign: "center",
              transform: `scale(${1 + Math.sin((frame + i * 20) * 0.03) * 0.02})`
            }}>
              <div style={{ fontSize: 70, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>{item.title}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>Grid → Block(들) → Thread(들)</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMemoryTypes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/memory_types.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CUDA 메모리 종류</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { title: "Global Memory", desc: "모든 스레드 접근 가능\n가장 크고 느림", speed: "느림" },
            { title: "Shared Memory", desc: "블록 내 공유\n매우 빠름", speed: "빠름" },
            { title: "Local Memory", desc: "스레드 전용\nGlobal에 저장", speed: "느림" },
            { title: "Register", desc: "스레드 전용\n가장 빠름", speed: "매우 빠름" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700 }}>{item.title}</div>
                <div style={{ fontSize: 16, color: COLORS.primary, background: "rgba(244,63,94,0.3)", padding: "5px 15px", borderRadius: 20 }}>{item.speed}</div>
              </div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePytorchCuda: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/pytorch_cuda.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>PyTorch에서 CUDA 사용</h1>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#66d9ef" }}>import</span> torch</div>
            <div style={{ marginTop: 15 }}># GPU 사용 가능 확인</div>
            <div>torch.cuda.<span style={{ color: "#a6e22e" }}>is_available</span>()</div>
            <div style={{ marginTop: 15 }}># 텐서를 GPU로 이동</div>
            <div>x = x.<span style={{ color: "#a6e22e" }}>to</span>(<span style={{ color: "#e6db74" }}>'cuda'</span>)</div>
            <div style={{ marginTop: 15 }}># 모델을 GPU로 이동</div>
            <div>model = model.<span style={{ color: "#a6e22e" }}>cuda</span>()</div>
            <div style={{ marginTop: 15 }}># GPU 선택</div>
            <div>device = torch.<span style={{ color: "#a6e22e" }}>device</span>(<span style={{ color: "#e6db74" }}>'cuda:0'</span>)</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSynchronization: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/synchronization.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>동기화와 비동기 실행</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>🔄</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>비동기 실행</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>CUDA 연산은 기본적으로 비동기</li>
              <li>CPU와 GPU가 병렬로 동작</li>
              <li>커널 호출 후 바로 반환</li>
              <li>처리량 최대화</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>⏱️</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>동기화</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>torch.cuda.synchronize()</li>
              <li>GPU 작업 완료 대기</li>
              <li>정확한 시간 측정에 필요</li>
              <li>디버깅 시 유용</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneErrorHandling: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-2/error_handling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>에러 처리</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>흔한 에러들</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><strong>CUDA out of memory:</strong> GPU 메모리 부족</li>
              <li><strong>device-side assert:</strong> 인덱스 오류</li>
              <li><strong>CUDA runtime error:</strong> 런타임 에러</li>
              <li><strong>CUDA illegal memory access:</strong> 잘못된 메모리 접근</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 35 }}>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>해결 방법</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>배치 크기 줄이기</li>
              <li>torch.cuda.empty_cache()</li>
              <li>CUDA_LAUNCH_BLOCKING=1</li>
              <li>nvidia-smi로 상태 확인</li>
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
      <Audio src={staticFile("audio/lesson-8-2/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          CUDA 기초: Host/Device, 스레드 계층, 메모리 종류<br />
          PyTorch에서 쉽게 GPU 활용 가능
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: PyTorch CUDA 최적화
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_2Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.cuda_basics.start} durationInFrames={SCENE_TIMINGS.cuda_basics.duration}><SceneCudaBasics /></Sequence>
    <Sequence from={SCENE_TIMINGS.thread_hierarchy.start} durationInFrames={SCENE_TIMINGS.thread_hierarchy.duration}><SceneThreadHierarchy /></Sequence>
    <Sequence from={SCENE_TIMINGS.memory_types.start} durationInFrames={SCENE_TIMINGS.memory_types.duration}><SceneMemoryTypes /></Sequence>
    <Sequence from={SCENE_TIMINGS.pytorch_cuda.start} durationInFrames={SCENE_TIMINGS.pytorch_cuda.duration}><ScenePytorchCuda /></Sequence>
    <Sequence from={SCENE_TIMINGS.synchronization.start} durationInFrames={SCENE_TIMINGS.synchronization.duration}><SceneSynchronization /></Sequence>
    <Sequence from={SCENE_TIMINGS.error_handling.start} durationInFrames={SCENE_TIMINGS.error_handling.duration}><SceneErrorHandling /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
