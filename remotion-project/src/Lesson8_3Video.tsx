import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_3_DURATION = 6810;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 570 },
  data_loading: { start: 570, duration: 937 },
  tensor_operations: { start: 1507, duration: 1042 },
  cudnn_optimization: { start: 2549, duration: 976 },
  torch_compile: { start: 3525, duration: 954 },
  gradient_checkpointing: { start: 4479, duration: 902 },
  profiling: { start: 5381, duration: 841 },
  outro: { start: 6222, duration: 588 },
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
      <Audio src={staticFile("audio/lesson-8-3/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🚀</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>PyTorch CUDA 최적화</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>GPU 성능을 극대화하는 방법</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-3
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneDataLoading: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/data_loading.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>데이터 로딩 최적화</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>📦</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>DataLoader 설정</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>num_workers: CPU 코어 수</li>
              <li>pin_memory=True</li>
              <li>persistent_workers=True</li>
              <li>prefetch_factor=2</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>⚡</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>성능 향상</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>CPU-GPU 전송 최적화</li>
              <li>병렬 데이터 로딩</li>
              <li>메모리 고정으로 속도 향상</li>
              <li>GPU 대기 시간 최소화</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTensorOperations: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/tensor_operations.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>텐서 연산 최적화</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { icon: "💾", title: "Inplace 연산", desc: "메모리 재사용\nx.add_(y)" },
            { icon: "🔢", title: "Vectorization", desc: "루프 대신 벡터 연산\ntorch.matmul 활용" },
            { icon: "📐", title: "메모리 레이아웃", desc: "contiguous() 사용\n메모리 정렬 최적화" },
            { icon: "🔗", title: "Fused 연산", desc: "여러 연산 결합\naddmm, addcmul 등" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 35,
              transform: `translateY(${Math.sin((frame + i * 15) * 0.05) * 3}px)`
            }}>
              <div style={{ fontSize: 50, textAlign: "center", marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15, textAlign: "center" }}>{item.title}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCudnnOptimization: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/cudnn_optimization.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>cuDNN 자동 튜닝</h1>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, marginBottom: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 24, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#66d9ef" }}>import</span> torch</div>
            <div style={{ marginTop: 15 }}># cuDNN 자동 튜너 활성화</div>
            <div>torch.backends.cudnn.<span style={{ color: "#a6e22e" }}>benchmark</span> = <span style={{ color: "#ae81ff" }}>True</span></div>
            <div style={{ marginTop: 15 }}># 결정론적 알고리즘 (재현성)</div>
            <div>torch.backends.cudnn.<span style={{ color: "#a6e22e" }}>deterministic</span> = <span style={{ color: "#ae81ff" }}>True</span></div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30 }}>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>benchmark=True</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>최적의 알고리즘 자동 선택</li>
              <li>고정된 입력 크기에 유리</li>
              <li>첫 실행 시 약간의 오버헤드</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30 }}>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>주의사항</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>입력 크기 변동 시 비효율적</li>
              <li>메모리 사용량 증가 가능</li>
              <li>재현성이 중요하면 사용 주의</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTorchCompile: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/torch_compile.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>torch.compile() 활용</h1>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, marginBottom: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 24, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#66d9ef" }}>import</span> torch</div>
            <div style={{ marginTop: 15 }}># 모델 컴파일 (PyTorch 2.0+)</div>
            <div>compiled_model = torch.<span style={{ color: "#a6e22e" }}>compile</span>(model)</div>
            <div style={{ marginTop: 15 }}># 모드 선택</div>
            <div>torch.<span style={{ color: "#a6e22e" }}>compile</span>(model, mode=<span style={{ color: "#e6db74" }}>"reduce-overhead"</span>)</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
          {[
            { mode: "default", desc: "균형잡힌 최적화", perf: "+30%" },
            { mode: "reduce-overhead", desc: "오버헤드 최소화", perf: "+40%" },
            { mode: "max-autotune", desc: "최대 성능", perf: "+50%" },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30, textAlign: "center" }}>
              <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.mode}</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginBottom: 15 }}>{item.desc}</div>
              <div style={{ fontSize: 32, color: COLORS.primary, fontWeight: 800 }}>{item.perf}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneGradientCheckpointing: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/gradient_checkpointing.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Gradient Checkpointing</h1>
        <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>💾</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>메모리 vs 연산</div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>Trade-off 전략</div>
          </div>
          <div style={{ flex: 2, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><strong>원리:</strong> 중간 활성화 값 저장 대신 재계산</li>
              <li><strong>장점:</strong> 메모리 사용량 크게 감소</li>
              <li><strong>단점:</strong> 학습 시간 약간 증가 (20-30%)</li>
              <li><strong>활용:</strong> 큰 모델, 긴 시퀀스 처리</li>
            </ul>
          </div>
        </div>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 35, marginTop: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#66d9ef" }}>from</span> torch.utils.checkpoint <span style={{ color: "#66d9ef" }}>import</span> checkpoint</div>
            <div style={{ marginTop: 10 }}>output = <span style={{ color: "#a6e22e" }}>checkpoint</span>(model_layer, input)</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneProfiling: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-3/profiling.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>성능 프로파일링</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {[
            { icon: "⏱️", title: "nvidia-smi", desc: "GPU 사용률\n메모리 모니터링" },
            { icon: "📊", title: "torch.profiler", desc: "상세 프로파일링\n병목 지점 파악" },
            { icon: "🔍", title: "nvprof/nsight", desc: "커널 수준 분석\nCUDA 최적화" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 35,
              textAlign: "center",
              transform: `scale(${1 + Math.sin((frame + i * 20) * 0.04) * 0.03})`
            }}>
              <div style={{ fontSize: 60, marginBottom: 15 }}>{item.icon}</div>
              <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>{item.title}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", whiteSpace: "pre-line", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.9)" }}>측정 없이는 최적화도 없다!</div>
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
      <Audio src={staticFile("audio/lesson-8-3/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          데이터 로딩, 텐서 연산, cuDNN, torch.compile<br />
          Gradient Checkpointing, 프로파일링
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: Mixed Precision Training
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_3Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.data_loading.start} durationInFrames={SCENE_TIMINGS.data_loading.duration}><SceneDataLoading /></Sequence>
    <Sequence from={SCENE_TIMINGS.tensor_operations.start} durationInFrames={SCENE_TIMINGS.tensor_operations.duration}><SceneTensorOperations /></Sequence>
    <Sequence from={SCENE_TIMINGS.cudnn_optimization.start} durationInFrames={SCENE_TIMINGS.cudnn_optimization.duration}><SceneCudnnOptimization /></Sequence>
    <Sequence from={SCENE_TIMINGS.torch_compile.start} durationInFrames={SCENE_TIMINGS.torch_compile.duration}><SceneTorchCompile /></Sequence>
    <Sequence from={SCENE_TIMINGS.gradient_checkpointing.start} durationInFrames={SCENE_TIMINGS.gradient_checkpointing.duration}><SceneGradientCheckpointing /></Sequence>
    <Sequence from={SCENE_TIMINGS.profiling.start} durationInFrames={SCENE_TIMINGS.profiling.duration}><SceneProfiling /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
