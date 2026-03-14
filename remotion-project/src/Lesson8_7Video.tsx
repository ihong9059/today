import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_7_DURATION = 6436;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 519 },
  torch_profiler: { start: 519, duration: 891 },
  tensorboard: { start: 1410, duration: 816 },
  bottleneck: { start: 2226, duration: 782 },
  debugging: { start: 3008, duration: 935 },
  common_issues: { start: 3943, duration: 1050 },
  best_practices: { start: 4993, duration: 873 },
  outro: { start: 5866, duration: 570 },
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
      <Audio src={staticFile("audio/lesson-8-7/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔍</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>프로파일링과 디버깅</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>병목 찾기와 문제 해결</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-7
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTorchProfiler: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/torch_profiler.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>torch.profiler 사용법</h1>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, marginBottom: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#66d9ef" }}>from</span> torch.profiler <span style={{ color: "#66d9ef" }}>import</span> profile, ProfilerActivity</div>
            <div style={{ marginTop: 15 }}><span style={{ color: "#66d9ef" }}>with</span> <span style={{ color: "#a6e22e" }}>profile</span>(</div>
            <div style={{ paddingLeft: 30 }}>activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],</div>
            <div style={{ paddingLeft: 30 }}>record_shapes=<span style={{ color: "#ae81ff" }}>True</span></div>
            <div>) <span style={{ color: "#66d9ef" }}>as</span> prof:</div>
            <div style={{ paddingLeft: 30 }}>output = model(input)</div>
            <div style={{ marginTop: 15 }}><span style={{ color: "#75715e" }}># 결과 출력</span></div>
            <div><span style={{ color: "#66d9ef" }}>print</span>(prof.key_averages().<span style={{ color: "#a6e22e" }}>table</span>(sort_by=<span style={{ color: "#e6db74" }}>"cuda_time_total"</span>))</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30 }}>
            <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>측정 항목</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>CPU/GPU 시간</li>
              <li>메모리 사용량</li>
              <li>연산별 소요 시간</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30 }}>
            <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>옵션</div>
            <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              <li>record_shapes: 텐서 크기</li>
              <li>profile_memory: 메모리</li>
              <li>with_stack: 호출 스택</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTensorboard: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/tensorboard.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>TensorBoard 시각화</h1>
        <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>📊</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>프로파일 결과 시각화</div>
          </div>
          <div style={{ flex: 2, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><strong>타임라인:</strong> 연산 실행 순서</li>
              <li><strong>메모리:</strong> 할당/해제 패턴</li>
              <li><strong>분포:</strong> 연산별 시간 분포</li>
              <li><strong>호출 그래프:</strong> 함수 호출 관계</li>
            </ul>
          </div>
        </div>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 35, marginTop: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
            <div>prof.<span style={{ color: "#a6e22e" }}>export_chrome_trace</span>(<span style={{ color: "#e6db74" }}>"trace.json"</span>)</div>
            <div style={{ marginTop: 10 }}><span style={{ color: "#75715e" }}># tensorboard --logdir=./log</span></div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBottleneck: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/bottleneck.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>병목 지점 찾기</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { icon: "📥", title: "데이터 로딩", desc: "DataLoader 병렬화\npin_memory 사용" },
            { icon: "🔄", title: "CPU-GPU 전송", desc: "배치 크기 증가\n불필요한 .cpu() 제거" },
            { icon: "⚡", title: "GPU 연산", desc: "연산 효율 확인\nFused 연산 활용" },
            { icon: "💾", title: "메모리 접근", desc: "Coalescing 최적화\n캐시 활용" },
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

const SceneDebugging: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/debugging.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>디버깅 도구</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>🐛</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>CUDA 디버깅</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>CUDA_LAUNCH_BLOCKING=1</li>
              <li>torch.autograd.set_detect_anomaly(True)</li>
              <li>cuda-memcheck</li>
              <li>compute-sanitizer</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>🔧</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>PyTorch 디버깅</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>torch.autograd.gradcheck()</li>
              <li>register_hook() 사용</li>
              <li>torch.isnan() 체크</li>
              <li>print() / logging</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneCommonIssues: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/common_issues.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>흔한 문제와 해결법</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25 }}>
          {[
            { issue: "CUDA OOM", solution: "배치 크기 감소\nGradient Accumulation\nempty_cache()" },
            { issue: "Loss가 NaN", solution: "Gradient Clipping\n학습률 감소\nBatch Normalization" },
            { issue: "느린 학습", solution: "프로파일링 수행\n병목 지점 최적화\nMixed Precision" },
            { issue: "정확도 불안정", solution: "Seed 고정\nBatch Size 조정\n데이터셋 확인" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 30
            }}>
              <div style={{ fontSize: 24, color: COLORS.primary, fontWeight: 700, marginBottom: 15 }}>
                {item.issue}
              </div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", whiteSpace: "pre-line", lineHeight: 1.8 }}>
                {item.solution}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBestPractices: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-7/best_practices.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>모범 사례</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>✅</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>개발 습관</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>작은 데이터로 먼저 테스트</li>
              <li>정기적인 프로파일링</li>
              <li>버전 관리 (git)</li>
              <li>실험 기록 (wandb, mlflow)</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>💡</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>성능 최적화</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>측정 후 최적화</li>
              <li>단계적 개선</li>
              <li>문서화와 주석</li>
              <li>재현 가능한 환경</li>
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
      <Audio src={staticFile("audio/lesson-8-7/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>🎉</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>Level 8 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          GPU 최적화 완전 정복<br />
          프로파일링과 디버깅 마스터
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음 레벨에서 만나요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_7Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.torch_profiler.start} durationInFrames={SCENE_TIMINGS.torch_profiler.duration}><SceneTorchProfiler /></Sequence>
    <Sequence from={SCENE_TIMINGS.tensorboard.start} durationInFrames={SCENE_TIMINGS.tensorboard.duration}><SceneTensorboard /></Sequence>
    <Sequence from={SCENE_TIMINGS.bottleneck.start} durationInFrames={SCENE_TIMINGS.bottleneck.duration}><SceneBottleneck /></Sequence>
    <Sequence from={SCENE_TIMINGS.debugging.start} durationInFrames={SCENE_TIMINGS.debugging.duration}><SceneDebugging /></Sequence>
    <Sequence from={SCENE_TIMINGS.common_issues.start} durationInFrames={SCENE_TIMINGS.common_issues.duration}><SceneCommonIssues /></Sequence>
    <Sequence from={SCENE_TIMINGS.best_practices.start} durationInFrames={SCENE_TIMINGS.best_practices.duration}><SceneBestPractices /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
