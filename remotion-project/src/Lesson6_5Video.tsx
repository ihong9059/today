import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_6_5_DURATION = 5609;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 634 },
  why: { start: 634, duration: 828 },
  structure: { start: 1462, duration: 798 },
  output: { start: 2260, duration: 838 },
  usage: { start: 3098, duration: 912 },
  code: { start: 4010, duration: 827 },
  outro: { start: 4837, duration: 772 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#06b6d4",
  secondary: "#0891b2",
  accent: "#0e7490",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, fontFamily: "Pretendard, sans-serif", zIndex: 100 }}>
      ai.uttec-lab.com
    </div>
  </>
);

const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-5/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>↔️</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>양방향 RNN</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>과거와 미래를 함께 보기</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 6-5
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneWhy: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-5/why.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>왜 양방향이 필요할까?</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>예시 문장</h2>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontSize: 24, color: COLORS.light }}>
              "나는 <span style={{ color: "#ef4444", fontWeight: 700 }}>은행</span>에서 돈을 찾았다"
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 15, padding: 25, fontSize: 24, color: COLORS.light, marginTop: 15 }}>
              "나는 <span style={{ color: "#22c55e", fontWeight: 700 }}>은행</span> 나무를 심었다"
            </div>
            <div style={{ marginTop: 20, fontSize: 20, color: "rgba(255,255,255,0.7)" }}>
              '은행'의 의미는 뒤에 나오는 단어를 봐야 알 수 있음
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>한계와 해결</h2>
            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ background: "rgba(239,68,68,0.2)", padding: 20, borderRadius: 10 }}>
                <div style={{ fontSize: 22, color: "#ef4444", fontWeight: 600 }}>단방향 RNN</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>과거 정보만 사용</div>
              </div>
              <div style={{ background: "rgba(34,197,94,0.2)", padding: 20, borderRadius: 10 }}>
                <div style={{ fontSize: 22, color: "#22c55e", fontWeight: 600 }}>양방향 RNN</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>과거 + 미래 정보 모두 활용</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneStructure: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-5/structure.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>양방향 RNN 구조</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 20 }}>
          {["x₁", "x₂", "x₃", "x₄"].map((x, i) => (
            <div key={i} style={{ width: 80, height: 80, background: COLORS.primary, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 28, color: COLORS.light, fontWeight: 700 }}>
              {x}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 100 }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {["→", "→", "→"].map((_, i) => (
              <React.Fragment key={i}>
                <div style={{ width: 60, height: 60, background: "#22c55e", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20, color: COLORS.light, fontWeight: 700 }}>h→</div>
                <span style={{ fontSize: 30, color: "#22c55e" }}>→</span>
              </React.Fragment>
            ))}
            <div style={{ width: 60, height: 60, background: "#22c55e", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20, color: COLORS.light, fontWeight: 700 }}>h→</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 100 }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ width: 60, height: 60, background: "#ef4444", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20, color: COLORS.light, fontWeight: 700 }}>←h</div>
            {["←", "←", "←"].map((_, i) => (
              <React.Fragment key={i}>
                <span style={{ fontSize: 30, color: "#ef4444" }}>←</span>
                <div style={{ width: 60, height: 60, background: "#ef4444", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20, color: COLORS.light, fontWeight: 700 }}>←h</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, textAlign: "center", fontSize: 24, color: "rgba(255,255,255,0.8)" }}>
        순방향과 역방향 RNN이 동시에 작동
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutput: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-5/output.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>출력 결합 방식</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        {[
          { title: "Concatenate", desc: "[h→; h←]", detail: "차원이 2배로 증가" },
          { title: "Sum", desc: "h→ + h←", detail: "차원 유지" },
          { title: "Average", desc: "(h→ + h←) / 2", detail: "차원 유지" },
          { title: "Multiply", desc: "h→ * h←", detail: "요소별 곱셈" },
        ].map((method, i) => (
          <div key={i} style={{ background: "rgba(6,182,212,0.1)", borderRadius: 20, padding: 30, border: `2px solid ${COLORS.primary}` }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, marginBottom: 10 }}>{method.title}</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontFamily: "monospace", marginBottom: 10 }}>{method.desc}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>{method.detail}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 30, textAlign: "center", fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
        가장 일반적: Concatenate 방식
      </div>
    </div>
  </AbsoluteFill>
);

const SceneUsage: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-5/usage.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>사용 시점</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: "#22c55e", marginBottom: 20 }}>적합한 경우</h2>
            <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 2 }}>
              <li>전체 시퀀스 접근 가능</li>
              <li>품사 태깅, 개체명 인식</li>
              <li>감성 분석</li>
              <li>기계 번역 (인코더)</li>
            </ul>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(239,68,68,0.2)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: "#ef4444", marginBottom: 20 }}>부적합한 경우</h2>
            <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 2 }}>
              <li>실시간 스트리밍</li>
              <li>자동 완성</li>
              <li>실시간 음성 인식</li>
              <li>미래 정보 없는 상황</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneCode: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-5/code.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>PyTorch 구현</h1>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 40, fontFamily: "monospace" }}>
        <div style={{ fontSize: 22, color: "#22c55e", marginBottom: 10 }}># 양방향 LSTM</div>
        <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 5 }}>lstm = nn.LSTM(</div>
        <div style={{ fontSize: 24, color: COLORS.light, marginLeft: 40, marginBottom: 5 }}>input_size=<span style={{ color: "#f97316" }}>100</span>,</div>
        <div style={{ fontSize: 24, color: COLORS.light, marginLeft: 40, marginBottom: 5 }}>hidden_size=<span style={{ color: "#f97316" }}>256</span>,</div>
        <div style={{ fontSize: 24, color: COLORS.light, marginLeft: 40, marginBottom: 5 }}>num_layers=<span style={{ color: "#f97316" }}>2</span>,</div>
        <div style={{ fontSize: 24, color: COLORS.light, marginLeft: 40, marginBottom: 5 }}>bidirectional=<span style={{ color: "#3b82f6" }}>True</span></div>
        <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 20 }}>)</div>
        <div style={{ fontSize: 22, color: "#22c55e", marginBottom: 10 }}># 출력 크기: 256 * 2 = 512</div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-5/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "양방향 필요성", desc: "문맥 이해에 미래 정보도 중요" },
          { title: "구조", desc: "순방향 + 역방향 RNN 동시 작동" },
          { title: "출력 결합", desc: "주로 Concatenate 방식 사용" },
          { title: "사용 시점", desc: "전체 시퀀스 접근 가능할 때" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>Seq2Seq 모델</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson6_5Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.why.start} durationInFrames={SCENE_TIMINGS.why.duration}><SceneWhy /></Sequence>
    <Sequence from={SCENE_TIMINGS.structure.start} durationInFrames={SCENE_TIMINGS.structure.duration}><SceneStructure /></Sequence>
    <Sequence from={SCENE_TIMINGS.output.start} durationInFrames={SCENE_TIMINGS.output.duration}><SceneOutput /></Sequence>
    <Sequence from={SCENE_TIMINGS.usage.start} durationInFrames={SCENE_TIMINGS.usage.duration}><SceneUsage /></Sequence>
    <Sequence from={SCENE_TIMINGS.code.start} durationInFrames={SCENE_TIMINGS.code.duration}><SceneCode /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
