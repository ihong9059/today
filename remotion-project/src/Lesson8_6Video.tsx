import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_6_DURATION = 6515;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 498 },
  memory_analysis: { start: 498, duration: 1022 },
  batch_size: { start: 1520, duration: 996 },
  no_grad: { start: 2516, duration: 873 },
  memory_cleanup: { start: 3389, duration: 888 },
  offloading: { start: 4277, duration: 845 },
  efficient_data: { start: 5122, duration: 875 },
  outro: { start: 5997, duration: 518 },
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
      <Audio src={staticFile("audio/lesson-8-6/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>💾</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>메모리 최적화</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>GPU 메모리 효율적으로 활용하기</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-6
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMemoryAnalysis: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/memory_analysis.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>메모리 사용량 분석</h1>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, marginBottom: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#75715e" }}># 현재 메모리 사용량</span></div>
            <div>torch.cuda.<span style={{ color: "#a6e22e" }}>memory_allocated</span>() / <span style={{ color: "#ae81ff" }}>1e9</span>  <span style={{ color: "#75715e" }}># GB</span></div>
            <div style={{ marginTop: 15 }}><span style={{ color: "#75715e" }}># 최대 메모리 사용량</span></div>
            <div>torch.cuda.<span style={{ color: "#a6e22e" }}>max_memory_allocated</span>() / <span style={{ color: "#ae81ff" }}>1e9</span></div>
            <div style={{ marginTop: 15 }}><span style={{ color: "#75715e" }}># 메모리 통계 초기화</span></div>
            <div>torch.cuda.<span style={{ color: "#a6e22e" }}>reset_peak_memory_stats</span>()</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[
            { label: "모델", percent: 40 },
            { label: "활성화", percent: 30 },
            { label: "그래디언트", percent: 20 },
            { label: "Optimizer", percent: 10 },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(244,63,94,0.15)", borderRadius: 12, padding: 25, textAlign: "center" }}>
              <div style={{ fontSize: 22, color: COLORS.light, fontWeight: 700, marginBottom: 10 }}>{item.label}</div>
              <div style={{ fontSize: 36, color: COLORS.primary, fontWeight: 800 }}>{item.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBatchSize: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/batch_size.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>배치 크기 최적화</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>📊</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>Gradient Accumulation</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>작은 배치로 여러 번 순전파</li>
              <li>그래디언트 누적</li>
              <li>한 번에 업데이트</li>
              <li>메모리 절약 + 큰 효과 배치</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, fontFamily: "monospace" }}>
            <div style={{ fontSize: 20, color: "#f8f8f2", lineHeight: 2 }}>
              <div>accumulation_steps = <span style={{ color: "#ae81ff" }}>4</span></div>
              <div style={{ marginTop: 10 }}><span style={{ color: "#66d9ef" }}>for</span> i, (data, target) <span style={{ color: "#66d9ef" }}>in</span> <span style={{ color: "#a6e22e" }}>enumerate</span>(loader):</div>
              <div style={{ paddingLeft: 20 }}>output = model(data)</div>
              <div style={{ paddingLeft: 20 }}>loss = criterion(output, target)</div>
              <div style={{ paddingLeft: 20 }}>loss = loss / accumulation_steps</div>
              <div style={{ paddingLeft: 20 }}>loss.<span style={{ color: "#a6e22e" }}>backward</span>()</div>
              <div style={{ paddingLeft: 20, marginTop: 10 }}><span style={{ color: "#66d9ef" }}>if</span> (i+<span style={{ color: "#ae81ff" }}>1</span>) % accumulation_steps == <span style={{ color: "#ae81ff" }}>0</span>:</div>
              <div style={{ paddingLeft: 40 }}>optimizer.<span style={{ color: "#a6e22e" }}>step</span>()</div>
              <div style={{ paddingLeft: 40 }}>optimizer.<span style={{ color: "#a6e22e" }}>zero_grad</span>()</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneNoGrad: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/no_grad.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>불필요한 그래디언트 차단</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 35, fontFamily: "monospace" }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 15, fontWeight: 700 }}>추론/검증 시</div>
            <div style={{ fontSize: 20, color: "#f8f8f2", lineHeight: 2 }}>
              <div><span style={{ color: "#66d9ef" }}>with</span> torch.<span style={{ color: "#a6e22e" }}>no_grad</span>():</div>
              <div style={{ paddingLeft: 20 }}>output = model(data)</div>
              <div style={{ paddingLeft: 20 }}>loss = criterion(output, target)</div>
            </div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>
              그래디언트 저장 안 함
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 35, fontFamily: "monospace" }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 15, fontWeight: 700 }}>일부 파라미터 동결</div>
            <div style={{ fontSize: 20, color: "#f8f8f2", lineHeight: 2 }}>
              <div><span style={{ color: "#66d9ef" }}>for</span> param <span style={{ color: "#66d9ef" }}>in</span> model.backbone.<span style={{ color: "#a6e22e" }}>parameters</span>():</div>
              <div style={{ paddingLeft: 20 }}>param.requires_grad = <span style={{ color: "#ae81ff" }}>False</span></div>
            </div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>
              해당 레이어는 업데이트 안 함
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 35, fontFamily: "monospace" }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 15, fontWeight: 700 }}>eval 모드</div>
            <div style={{ fontSize: 20, color: "#f8f8f2", lineHeight: 2 }}>
              <div>model.<span style={{ color: "#a6e22e" }}>eval</span>()</div>
              <div style={{ marginTop: 10 }}><span style={{ color: "#75715e" }}># 추론 수행</span></div>
              <div style={{ marginTop: 10 }}>model.<span style={{ color: "#a6e22e" }}>train</span>()</div>
            </div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>
              Dropout/BatchNorm 비활성화
            </div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 35, fontFamily: "monospace" }}>
            <div style={{ fontSize: 20, color: COLORS.primary, marginBottom: 15, fontWeight: 700 }}>inplace 연산</div>
            <div style={{ fontSize: 20, color: "#f8f8f2", lineHeight: 2 }}>
              <div>x.<span style={{ color: "#a6e22e" }}>relu_</span>()  <span style={{ color: "#75715e" }}># inplace</span></div>
              <div>x.<span style={{ color: "#a6e22e" }}>add_</span>(y)  <span style={{ color: "#75715e" }}># inplace</span></div>
            </div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>
              새 메모리 할당 안 함
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMemoryCleanup: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/memory_cleanup.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>메모리 정리</h1>
        <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, fontFamily: "monospace" }}>
            <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
              <div><span style={{ color: "#75715e" }}># 캐시 비우기</span></div>
              <div>torch.cuda.<span style={{ color: "#a6e22e" }}>empty_cache</span>()</div>
              <div style={{ marginTop: 20 }}><span style={{ color: "#75715e" }}># 변수 삭제</span></div>
              <div><span style={{ color: "#66d9ef" }}>del</span> large_tensor</div>
              <div>torch.cuda.<span style={{ color: "#a6e22e" }}>empty_cache</span>()</div>
              <div style={{ marginTop: 20 }}><span style={{ color: "#75715e" }}># 그래디언트 초기화</span></div>
              <div>optimizer.<span style={{ color: "#a6e22e" }}>zero_grad</span>(set_to_none=<span style={{ color: "#ae81ff" }}>True</span>)</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 35, marginBottom: 20 }}>
              <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>⚠️ 주의</div>
              <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                <li>empty_cache()는 느림</li>
                <li>자주 호출하지 말 것</li>
                <li>필요할 때만 사용</li>
              </ul>
            </div>
            <div style={{ background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 35 }}>
              <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>✅ 추천</div>
              <ul style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                <li>set_to_none=True 사용</li>
                <li>불필요한 변수 즉시 삭제</li>
                <li>메모리 누수 방지</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOffloading: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/offloading.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>CPU Offloading</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>🔄</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>메모리 교환</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              GPU 메모리 부족 시<br />
              일부 데이터를 CPU로
            </div>
          </div>
          <div style={{ flex: 2, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>활용 전략</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><strong>Optimizer 상태:</strong> CPU에 저장</li>
              <li><strong>활성화 값:</strong> 필요 시 재계산</li>
              <li><strong>파라미터:</strong> 사용 시에만 GPU로</li>
              <li><strong>Trade-off:</strong> 속도 vs 메모리</li>
            </ul>
          </div>
        </div>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 35, marginTop: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 20, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#75715e" }}># DeepSpeed ZeRO Offload</span></div>
            <div><span style={{ color: "#66d9ef" }}>from</span> deepspeed <span style={{ color: "#66d9ef" }}>import</span> DeepSpeedConfig</div>
            <div>config = {"{"} <span style={{ color: "#e6db74" }}>"zero_optimization"</span>: {"{"} <span style={{ color: "#e6db74" }}>"offload_optimizer"</span>: {"{"} <span style={{ color: "#e6db74" }}>"device"</span>: <span style={{ color: "#e6db74" }}>"cpu"</span> {"}"} {"}"} {"}"}</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneEfficientData: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-6/efficient_data.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>효율적인 데이터 타입</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {[
            { type: "FP16/BF16", memory: "50% 절약", use: "학습/추론" },
            { type: "INT8", memory: "75% 절약", use: "추론 최적화" },
            { type: "INT4", memory: "87.5% 절약", use: "양자화 모델" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 35,
              textAlign: "center",
              transform: `translateY(${Math.sin((frame + i * 20) * 0.05) * 5}px)`
            }}>
              <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>{item.type}</div>
              <div style={{ fontSize: 36, color: COLORS.primary, fontWeight: 800, marginBottom: 10 }}>{item.memory}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>{item.use}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 40, marginTop: 40 }}>
          <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>추가 팁</div>
          <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2, columns: 2, columnGap: 40 }}>
            <li>작은 입력 크기로 시작</li>
            <li>Dynamic Shape 피하기</li>
            <li>불필요한 .cpu() 호출 제거</li>
            <li>메모리 프로파일링 습관화</li>
          </ul>
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
      <Audio src={staticFile("audio/lesson-8-6/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          메모리 분석, 배치 최적화, 그래디언트 차단<br />
          메모리 정리, Offloading, 효율적 데이터 타입
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: 프로파일링과 디버깅
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_6Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.memory_analysis.start} durationInFrames={SCENE_TIMINGS.memory_analysis.duration}><SceneMemoryAnalysis /></Sequence>
    <Sequence from={SCENE_TIMINGS.batch_size.start} durationInFrames={SCENE_TIMINGS.batch_size.duration}><SceneBatchSize /></Sequence>
    <Sequence from={SCENE_TIMINGS.no_grad.start} durationInFrames={SCENE_TIMINGS.no_grad.duration}><SceneNoGrad /></Sequence>
    <Sequence from={SCENE_TIMINGS.memory_cleanup.start} durationInFrames={SCENE_TIMINGS.memory_cleanup.duration}><SceneMemoryCleanup /></Sequence>
    <Sequence from={SCENE_TIMINGS.offloading.start} durationInFrames={SCENE_TIMINGS.offloading.duration}><SceneOffloading /></Sequence>
    <Sequence from={SCENE_TIMINGS.efficient_data.start} durationInFrames={SCENE_TIMINGS.efficient_data.duration}><SceneEfficientData /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
