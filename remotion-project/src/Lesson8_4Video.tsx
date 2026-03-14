import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_8_4_DURATION = 6736;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 591 },
  float_precision: { start: 591, duration: 997 },
  why_mixed: { start: 1588, duration: 984 },
  amp_scaler: { start: 2572, duration: 953 },
  implementation: { start: 3525, duration: 861 },
  best_practices: { start: 4386, duration: 882 },
  bf16: { start: 5268, duration: 977 },
  outro: { start: 6245, duration: 491 },
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
      <Audio src={staticFile("audio/lesson-8-4/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>⚖️</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>Mixed Precision Training</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>속도와 메모리의 완벽한 균형</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 8-4
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneFloatPrecision: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/float_precision.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>부동소수점 정밀도</h1>
        <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
          {[
            { type: "FP32", bits: "32비트", range: "±3.4×10³⁸", precision: "7자리", memory: "4 bytes" },
            { type: "FP16", bits: "16비트", range: "±6.5×10⁴", precision: "3자리", memory: "2 bytes" },
            { type: "BF16", bits: "16비트", range: "±3.4×10³⁸", precision: "2자리", memory: "2 bytes" },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1,
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 30,
              textAlign: "center",
              transform: `translateY(${Math.sin((frame + i * 20) * 0.05) * 5}px)`
            }}>
              <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>{item.type}</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
                <div><strong>비트:</strong> {item.bits}</div>
                <div><strong>범위:</strong> {item.range}</div>
                <div><strong>정밀도:</strong> {item.precision}</div>
                <div><strong>메모리:</strong> {item.memory}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneWhyMixed: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/why_mixed.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>왜 Mixed Precision인가?</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>📈</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>장점</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><strong>속도:</strong> 2-3배 빠른 학습</li>
              <li><strong>메모리:</strong> 50% 절약</li>
              <li><strong>배치:</strong> 2배 큰 배치 가능</li>
              <li><strong>처리량:</strong> 전체 처리량 증가</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 60, textAlign: "center", marginBottom: 20 }}>🎯</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>핵심 아이디어</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>순전파: FP16으로 빠르게</li>
              <li>역전파: FP16으로 메모리 절약</li>
              <li>가중치: FP32로 정확하게</li>
              <li>그래디언트: 스케일링 적용</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAmpScaler: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/amp_scaler.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>자동 혼합 정밀도 (AMP)</h1>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 40, marginBottom: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#66d9ef" }}>from</span> torch.cuda.amp <span style={{ color: "#66d9ef" }}>import</span> autocast, GradScaler</div>
            <div style={{ marginTop: 15 }}>scaler = <span style={{ color: "#a6e22e" }}>GradScaler</span>()</div>
            <div style={{ marginTop: 15 }}><span style={{ color: "#66d9ef" }}>for</span> data, target <span style={{ color: "#66d9ef" }}>in</span> dataloader:</div>
            <div style={{ paddingLeft: 30 }}><span style={{ color: "#66d9ef" }}>with</span> <span style={{ color: "#a6e22e" }}>autocast</span>():</div>
            <div style={{ paddingLeft: 60 }}>output = model(data)</div>
            <div style={{ paddingLeft: 60 }}>loss = criterion(output, target)</div>
            <div style={{ paddingLeft: 30 }}>scaler.<span style={{ color: "#a6e22e" }}>scale</span>(loss).<span style={{ color: "#a6e22e" }}>backward</span>()</div>
            <div style={{ paddingLeft: 30 }}>scaler.<span style={{ color: "#a6e22e" }}>step</span>(optimizer)</div>
            <div style={{ paddingLeft: 30 }}>scaler.<span style={{ color: "#a6e22e" }}>update</span>()</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30 }}>
            <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>autocast()</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              자동으로 FP16/FP32 선택<br />
              연산 타입에 따라 최적화
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 16, padding: 30 }}>
            <div style={{ fontSize: 26, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>GradScaler()</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
              그래디언트 스케일링<br />
              Underflow 방지
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneImplementation: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/implementation.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>구현 단계</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
          {[
            { step: "1", title: "Scaler 생성", desc: "GradScaler 인스턴스 생성" },
            { step: "2", title: "autocast 적용", desc: "순전파를 autocast로 감싸기" },
            { step: "3", title: "Loss 스케일링", desc: "scaler.scale(loss).backward()" },
            { step: "4", title: "Optimizer 업데이트", desc: "scaler.step() & scaler.update()" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "rgba(244,63,94,0.15)",
              borderRadius: 16,
              padding: 35,
              display: "flex",
              gap: 20,
              alignItems: "center",
              transform: `translateX(${Math.sin((frame + i * 15) * 0.05) * 3}px)`
            }}>
              <div style={{
                width: 60,
                height: 60,
                background: COLORS.primary,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 28,
                color: COLORS.light,
                fontWeight: 800,
                flexShrink: 0
              }}>{item.step}</div>
              <div>
                <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>{item.desc}</div>
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
      <Audio src={staticFile("audio/lesson-8-4/best_practices.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>모범 사례</h1>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>✅</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>권장 사항</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>배치 크기 증가 시도</li>
              <li>학습률 조정 (배치 증가 시)</li>
              <li>정확도 모니터링</li>
              <li>Tensor Core GPU 사용</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <div style={{ fontSize: 50, textAlign: "center", marginBottom: 20 }}>⚠️</div>
            <div style={{ fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20, textAlign: "center" }}>주의 사항</div>
            <ul style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>손실 값 NaN 체크</li>
              <li>Gradient clipping 적용</li>
              <li>일부 연산은 FP32 유지</li>
              <li>초기 수렴 확인</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneBf16: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-8-4/bf16.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>BFloat16 (BF16)</h1>
        <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 100, marginBottom: 20 }}>🎯</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>BF16의 장점</div>
          </div>
          <div style={{ flex: 2, background: "rgba(244,63,94,0.15)", borderRadius: 20, padding: 40 }}>
            <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li><strong>동일한 범위:</strong> FP32와 같은 범위</li>
              <li><strong>안정성:</strong> Overflow/Underflow 적음</li>
              <li><strong>편의성:</strong> 스케일링 불필요</li>
              <li><strong>성능:</strong> FP16과 동일한 속도</li>
            </ul>
          </div>
        </div>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: 35, marginTop: 40, fontFamily: "monospace" }}>
          <div style={{ fontSize: 22, color: "#f8f8f2", lineHeight: 2 }}>
            <div><span style={{ color: "#75715e" }}># BF16 사용 (Ampere GPU 이상)</span></div>
            <div><span style={{ color: "#66d9ef" }}>with</span> <span style={{ color: "#a6e22e" }}>autocast</span>(dtype=torch.bfloat16):</div>
            <div style={{ paddingLeft: 30 }}>output = model(data)</div>
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
      <Audio src={staticFile("audio/lesson-8-4/outro.mp3")} />
      <div style={{ textAlign: "center", opacity }}>
        <div style={{ fontSize: 120, marginBottom: 30 }}>✅</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 30 }}>학습 완료!</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
          FP16/FP32/BF16 혼합 사용<br />
          AMP로 자동 최적화, 2-3배 속도 향상
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
          다음: 분산 학습 기초
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson8_4Video: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.float_precision.start} durationInFrames={SCENE_TIMINGS.float_precision.duration}><SceneFloatPrecision /></Sequence>
    <Sequence from={SCENE_TIMINGS.why_mixed.start} durationInFrames={SCENE_TIMINGS.why_mixed.duration}><SceneWhyMixed /></Sequence>
    <Sequence from={SCENE_TIMINGS.amp_scaler.start} durationInFrames={SCENE_TIMINGS.amp_scaler.duration}><SceneAmpScaler /></Sequence>
    <Sequence from={SCENE_TIMINGS.implementation.start} durationInFrames={SCENE_TIMINGS.implementation.duration}><SceneImplementation /></Sequence>
    <Sequence from={SCENE_TIMINGS.best_practices.start} durationInFrames={SCENE_TIMINGS.best_practices.duration}><SceneBestPractices /></Sequence>
    <Sequence from={SCENE_TIMINGS.bf16.start} durationInFrames={SCENE_TIMINGS.bf16.duration}><SceneBf16 /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
