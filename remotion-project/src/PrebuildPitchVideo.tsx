import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const PREBUILD_PITCH_DURATION = 10859;

const T = {
  hook:       { start: 0,     duration: 763 },
  vibecoding: { start: 763,   duration: 1285 },
  problem:    { start: 2048,  duration: 1030 },
  solution:   { start: 3078,  duration: 1178 },
  aiDetail:   { start: 4256,  duration: 1701 },
  learning:   { start: 5957,  duration: 1809 },
  curriculum: { start: 7766,  duration: 1292 },
  benefits:   { start: 9058,  duration: 1144 },
  cta:        { start: 10202, duration: 657 },
};

const C = {
  bg: "#0B1426",
  bgGrad: "linear-gradient(135deg, #0B1426 0%, #1a2744 40%, #0d1a30 100%)",
  primary: "#00E5FF",
  secondary: "#7C4DFF",
  accent: "#FF6D00",
  success: "#00E676",
  danger: "#FF5252",
  white: "#FFFFFF",
  gray: "rgba(255,255,255,0.7)",
  cardBg: "rgba(0, 229, 255, 0.06)",
  cardBorder: "rgba(0, 229, 255, 0.25)",
};

const F = "Pretendard, 'Noto Sans KR', sans-serif";

/* ── helpers ── */
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; from?: number }> = ({
  children, delay = 0, from = 30,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  const opacity = Math.min(1, f / 20);
  return <div style={{ opacity, transform: `translateY(${(1 - opacity) * from}px)` }}>{children}</div>;
};

const Brand: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 36, left: 50, zIndex: 9999, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>⚡</div>
      <span style={{ color: C.white, fontSize: 22, fontWeight: 800, fontFamily: F, letterSpacing: 1 }}>AI 사전빌드</span>
    </div>
    <div style={{ position: "absolute", bottom: 28, right: 50, zIndex: 9999, color: "rgba(255,255,255,0.4)", fontSize: 16, fontFamily: F }}>
      UTTEC · AI 하드웨어 교육 플랫폼
    </div>
  </>
);

const Grid: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      position: "absolute", inset: 0, opacity: 0.05,
      backgroundImage: `linear-gradient(${C.primary} 1px, transparent 1px), linear-gradient(90deg, ${C.primary} 1px, transparent 1px)`,
      backgroundSize: "80px 80px",
      transform: `translate(${Math.sin(frame / 200) * 8}px, ${Math.cos(frame / 300) * 8}px)`,
    }} />
  );
};

const Card: React.FC<{ children: React.ReactNode; width?: number | string; style?: React.CSSProperties }> = ({
  children, width = "auto", style,
}) => (
  <div style={{
    background: C.cardBg, border: `1px solid ${C.cardBorder}`, borderRadius: 20,
    padding: "32px 40px", width, backdropFilter: "blur(10px)",
    boxShadow: "0 0 40px rgba(0,229,255,0.08)", ...style,
  }}>{children}</div>
);

const Tag: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
  <div style={{ fontSize: 24, color, letterSpacing: 3, marginBottom: 16, fontWeight: 700 }}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 52 }) => (
  <div style={{ fontSize: size, fontWeight: 900, color: C.white, marginBottom: 50, textAlign: "center", lineHeight: 1.3 }}>{children}</div>
);

const CountUp: React.FC<{ target: number; suffix?: string; frame: number; start?: number; dur?: number; color?: string; size?: number }> = ({
  target, suffix = "", frame, start = 0, dur = 40, color = C.primary, size = 72,
}) => {
  const p = interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <span style={{ fontSize: size, fontWeight: 900, color, fontFamily: F, textShadow: `0 0 30px ${color}60` }}>{Math.round(target * p)}{suffix}</span>;
};

/* ═══════════ Scene 1: Hook ═══════════ */
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const tagOp = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [80, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSc = interpolate(frame, [80, 120], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOp = interpolate(frame, [180, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cmdOp = interpolate(frame, [300, 340], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const resultOp = interpolate(frame, [500, 540], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.bgGrad, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        <div style={{ opacity: tagOp, fontSize: 26, color: C.gray, letterSpacing: 4, marginBottom: 30 }}>AI VIBE CODING FOR HARDWARE</div>
        <div style={{ opacity: titleOp, transform: `scale(${titleSc})`, fontSize: 100, fontWeight: 900, color: C.white, textAlign: "center", lineHeight: 1.15, textShadow: `0 0 60px ${C.primary}50`, marginBottom: 30 }}>
          말하면,<br /><span style={{ color: C.primary }}>하드웨어</span>가 된다
        </div>
        <div style={{ opacity: subOp, fontSize: 28, color: C.gray, textAlign: "center", marginBottom: 40 }}>
          코딩을 몰라도, 한국어로 말하면 AI가 만들어줍니다
        </div>
        <div style={{ opacity: cmdOp, background: "rgba(0,0,0,0.4)", borderRadius: 16, padding: "20px 50px", border: `1px solid ${C.primary}40` }}>
          <span style={{ color: C.gray, fontSize: 22 }}>💬 </span>
          <span style={{ color: C.primary, fontSize: 26, fontWeight: 700 }}>"빨간 LED를 1초마다 깜빡여줘"</span>
        </div>
        <div style={{ opacity: resultOp, marginTop: 30, fontSize: 24, color: C.success }}>
          ✅ 30초 후 → LED가 깜빡입니다
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Scene 2: Vibe Coding 설명 ═══════════ */
const SceneVibeCoding: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { icon: "💬", title: "자연어 입력", desc: "원하는 동작을\n한국어로 설명", color: C.primary },
    { icon: "🤖", title: "AI 코드 생성", desc: "Claude AI가\nESP32 코드 작성", color: C.secondary },
    { icon: "⚙️", title: "자동 컴파일", desc: "서버가 즉시\n바이너리 생성", color: C.accent },
    { icon: "📡", title: "무선 전송", desc: "BLE로 보드에\n펌웨어 전송", color: C.success },
    { icon: "🎉", title: "즉시 실행", desc: "LED, 부저, 센서\n바로 동작!", color: "#FF4081" },
  ];

  return (
    <AbsoluteFill style={{ background: C.bgGrad, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "80px 80px" }}>
        <FadeIn delay={0}><Tag color={C.primary}>VIBE CODING</Tag></FadeIn>
        <FadeIn delay={15}><Title>바이브 코딩이란?</Title></FadeIn>
        <FadeIn delay={30}>
          <div style={{ fontSize: 26, color: C.gray, textAlign: "center", marginBottom: 50, marginTop: -30, maxWidth: 900, lineHeight: 1.6 }}>
            코드를 직접 작성하는 대신, <strong style={{ color: C.white }}>원하는 동작을 말로 설명</strong>하면<br />
            <strong style={{ color: C.primary }}>AI가 코드를 생성</strong>하고 보드에 무선 전송하는 방식
          </div>
        </FadeIn>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <FadeIn delay={80 + i * 50}>
                <div style={{ textAlign: "center", width: 200 }}>
                  <div style={{ fontSize: 52, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 17, color: C.gray, lineHeight: 1.5, whiteSpace: "pre-line" }}>{s.desc}</div>
                </div>
              </FadeIn>
              {i < steps.length - 1 && (
                <FadeIn delay={100 + i * 50}>
                  <div style={{ fontSize: 28, color: C.primary, opacity: 0.5, marginTop: -30 }}>→</div>
                </FadeIn>
              )}
            </React.Fragment>
          ))}
        </div>
        <FadeIn delay={400}>
          <div style={{ marginTop: 40, fontSize: 24, color: C.success, background: `${C.success}15`, padding: "12px 40px", borderRadius: 30 }}>
            코딩 경험 제로 → 하드웨어 제어 가능
          </div>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Scene 3: Problem ═══════════ */
const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const problems: { icon: string; title: string; desc: string }[] = [
    { icon: "⏱️", title: "50초 대기", desc: "AI 생성 + 컴파일\n매번 반복" },
    { icon: "🖥️", title: "서버 병목", desc: "동시 1~2명만\n빌드 가능" },
    { icon: "💰", title: "API 비용", desc: "매 요청마다\nClaude API 과금" },
    { icon: "😴", title: "집중력 저하", desc: "대기 시간에\n학생 이탈" },
  ];
  return (
    <AbsoluteFill style={{ background: C.bgGrad, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "80px 100px" }}>
        <FadeIn delay={0}><Tag color={C.danger}>PROBLEM</Tag></FadeIn>
        <FadeIn delay={15}><Title>실시간 바이브 코딩의 <span style={{ color: C.danger }}>교실 한계</span></Title></FadeIn>
        <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
          {problems.map((p, i) => (
            <FadeIn key={i} delay={60 + i * 40}>
              <Card width={370} style={{ border: `1px solid ${C.danger}30`, background: "rgba(255,82,82,0.06)", textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>{p.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: C.white, marginBottom: 10 }}>{p.title}</div>
                <div style={{ fontSize: 20, color: C.gray, lineHeight: 1.5, whiteSpace: "pre-line" }}>{p.desc}</div>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={250}>
          <div style={{ marginTop: 40, fontSize: 24, color: C.danger }}>
            10명 교실에서 바이브 코딩은 사실상 불가능
          </div>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Scene 4: Solution ═══════════ */
const SceneSolution: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const sc = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ background: C.bgGrad, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        <FadeIn delay={0}><Tag color={C.success}>SOLUTION</Tag></FadeIn>
        <div style={{ transform: `scale(${sc})`, fontSize: 84, fontWeight: 900, color: C.white, textAlign: "center", lineHeight: 1.2, marginBottom: 30 }}>
          <span style={{ color: C.primary }}>사전빌드</span> 시스템
        </div>
        <FadeIn delay={60}>
          <div style={{ fontSize: 28, color: C.gray, textAlign: "center", lineHeight: 1.8, maxWidth: 1000, marginBottom: 50 }}>
            바이브 코딩의 핵심 — AI 코드 생성 + 컴파일을 <strong style={{ color: C.white }}>수업 전에 미리 수행</strong><br />
            155개 펌웨어를 사전 빌드하여 수업 시간엔 <strong style={{ color: C.primary }}>선택 → 18초 전송</strong>만
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div style={{ display: "flex", gap: 50 }}>
            {[
              { label: "실시간 빌드", value: "50초", sub: "매번 AI + 컴파일", color: C.danger, arrow: true },
              { label: "사전빌드", value: "18초", sub: "즉시 전송만", color: C.success, arrow: false },
            ].map((item, i) => (
              <Card key={i} width={420} style={{ textAlign: "center", border: `1px solid ${item.color}40`, padding: "40px" }}>
                <div style={{ fontSize: 20, color: C.gray, marginBottom: 10 }}>{item.label}</div>
                <div style={{ fontSize: 64, fontWeight: 900, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 18, color: C.gray, marginTop: 8 }}>{item.sub}</div>
              </Card>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <div style={{ marginTop: 40, display: "flex", gap: 40 }}>
            {[
              { v: "0초", l: "빌드 시간", c: C.success },
              { v: "30명+", l: "동시 수용", c: C.primary },
              { v: "0원", l: "API 비용", c: C.accent },
            ].map((x, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: x.c }}>{x.v}</div>
                <div style={{ fontSize: 18, color: C.gray }}>{x.l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Scene 5: AI Detail ═══════════ */
const SceneAIDetail: React.FC = () => {
  const frame = useCurrentFrame();
  const roles = [
    {
      icon: "💻", title: "1. 코드 생성", color: C.primary,
      details: ["ESP32 하드웨어 사양 이해", "GPIO, 센서, BLE 설정 반영", "완전한 펌웨어 코드 자동 작성"],
    },
    {
      icon: "📖", title: "2. 학습 가이드 생성", color: C.secondary,
      details: ["동작 원리 설명 (학생 눈높이)", "핵심 코드 한 줄씩 주석", "사용된 프로그래밍 개념 해설"],
    },
    {
      icon: "🎯", title: "3. 퀴즈 + 추천", color: C.accent,
      details: ["이해 확인 4지선다 퀴즈", "오답 시 설명 제공", "다음 도전 과제 자동 추천"],
    },
  ];

  return (
    <AbsoluteFill style={{ background: C.bgGrad, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "70px 80px" }}>
        <FadeIn delay={0}><Tag color={C.secondary}>AI의 세 가지 역할</Tag></FadeIn>
        <FadeIn delay={15}><Title>AI는 코드만 짜는 게 아닙니다</Title></FadeIn>
        <FadeIn delay={30}>
          <div style={{ fontSize: 24, color: C.gray, textAlign: "center", marginBottom: 50, marginTop: -30 }}>
            코드 생성 + 학습 콘텐츠 + 학습 경로까지 — <strong style={{ color: C.white }}>교육의 전체를 AI가 만듭니다</strong>
          </div>
        </FadeIn>
        <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
          {roles.map((r, i) => (
            <FadeIn key={i} delay={80 + i * 60}>
              <Card width={500} style={{ padding: "36px 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 44 }}>{r.icon}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: r.color }}>{r.title}</div>
                </div>
                {r.details.map((d, j) => (
                  <FadeIn key={j} delay={120 + i * 60 + j * 25}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: r.color, flexShrink: 0 }} />
                      <div style={{ fontSize: 20, color: C.white }}>{d}</div>
                    </div>
                  </FadeIn>
                ))}
              </Card>
            </FadeIn>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Scene 6: Learning Cycle ═══════════ */
const SceneLearning: React.FC = () => {
  const frame = useCurrentFrame();
  const cycle = [
    { icon: "🚀", title: "체험", desc: "예제 선택 → 18초 전송 →\n실제 LED/부저/센서 동작 확인", color: C.primary },
    { icon: "📖", title: "이해", desc: "AI 학습 가이드 열기\ndigitalWrite, delay, if문\n한 줄씩 의미를 이해", color: C.secondary },
    { icon: "❓", title: "확인", desc: "퀴즈로 이해도 점검\n\"delay(1000)은 몇 초?\"", color: C.accent },
    { icon: "🎮", title: "도전", desc: "AI 추천 다음 과제\n\"속도를 바꿔보기\"\n\"LED 2개로 확장\"", color: C.success },
  ];

  return (
    <AbsoluteFill style={{ background: C.bgGrad, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "70px 80px" }}>
        <FadeIn delay={0}><Tag color={C.success}>LEARNING CYCLE</Tag></FadeIn>
        <FadeIn delay={15}><Title>체험 → 이해 → 확인 → 도전</Title></FadeIn>
        <FadeIn delay={30}>
          <div style={{ fontSize: 24, color: C.gray, textAlign: "center", marginBottom: 50, marginTop: -30 }}>
            단순 실행이 아닌, <strong style={{ color: C.white }}>코딩 원리를 체득하는 학습 사이클</strong>
          </div>
        </FadeIn>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {cycle.map((c, i) => (
            <React.Fragment key={i}>
              <FadeIn delay={60 + i * 80}>
                <Card width={360} style={{ textAlign: "center", padding: "36px 30px", border: `1px solid ${c.color}30` }}>
                  <div style={{ fontSize: 56, marginBottom: 14 }}>{c.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: c.color, marginBottom: 12 }}>{c.title}</div>
                  <div style={{ fontSize: 18, color: C.gray, lineHeight: 1.6, whiteSpace: "pre-line" }}>{c.desc}</div>
                </Card>
              </FadeIn>
              {i < cycle.length - 1 && (
                <FadeIn delay={100 + i * 80}>
                  <div style={{ fontSize: 32, color: c.color, opacity: 0.6 }}>→</div>
                </FadeIn>
              )}
            </React.Fragment>
          ))}
        </div>
        <FadeIn delay={500}>
          <div style={{ marginTop: 40, fontSize: 22, color: C.gray, textAlign: "center", lineHeight: 1.6 }}>
            이 사이클이 <strong style={{ color: C.primary }}>155개 예제</strong>에 걸쳐 자동으로 이어집니다<br />
            <span style={{ color: C.success }}>게임하듯 다음 단계를 도전</span>하며 코딩 사고력이 자랍니다
          </div>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Scene 7: Curriculum ═══════════ */
const SceneCurriculum: React.FC = () => {
  const frame = useCurrentFrame();
  const cats = [
    { code: "A~C", name: "LED · 부저 기초", count: 20, level: "★", color: "#4CAF50" },
    { code: "D~G", name: "멜로디 · 센서 · 스위치", count: 21, level: "★★", color: "#2196F3" },
    { code: "H~N", name: "패턴 · 조합 · 종합 출력", count: 39, level: "★★★", color: "#9C27B0" },
    { code: "O~S", name: "자동화 · BLE · 실생활", count: 27, level: "★★★", color: "#FF9800" },
    { code: "T~Y", name: "BLE 게임 · 멀티태스크 · 종합", count: 42, level: "★★★★", color: "#F44336" },
  ];
  return (
    <AbsoluteFill style={{ background: C.bgGrad, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "70px 120px" }}>
        <FadeIn delay={0}><Tag color={C.secondary}>CURRICULUM</Tag></FadeIn>
        <FadeIn delay={15}><Title>25개 카테고리 · <span style={{ color: C.primary }}>155개</span> 예제</Title></FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          {cats.map((cat, i) => {
            const bw = interpolate(frame, [60 + i * 20, 110 + i * 20], [0, cat.count / 42 * 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <FadeIn key={i} delay={50 + i * 20}>
                <div style={{ display: "flex", alignItems: "center", gap: 20, background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px 28px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: cat.color, width: 60, textAlign: "center", background: `${cat.color}20`, padding: "4px 10px", borderRadius: 8 }}>{cat.code}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 6 }}>{cat.name}</div>
                    <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                      <div style={{ width: `${bw}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)` }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 20, color: C.gray, width: 70, textAlign: "center" }}>{cat.level}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: cat.color, width: 50, textAlign: "right" }}>{cat.count}</div>
                </div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={200}>
          <div style={{ marginTop: 30, fontSize: 22, color: C.gray }}>
            LED 깜빡이기부터 스마트폰 BLE 게임까지 — <strong style={{ color: C.primary }}>단계별 성장 설계</strong>
          </div>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Scene 8: Benefits ═══════════ */
const SceneBenefits: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bgGrad, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "80px 80px" }}>
        <FadeIn delay={0}><Tag color={C.success}>BENEFITS</Tag></FadeIn>
        <FadeIn delay={15}><Title>도입 효과</Title></FadeIn>
        <div style={{ display: "flex", gap: 30, justifyContent: "center", marginBottom: 40 }}>
          {[
            { icon: "⚡", metric: <CountUp target={64} suffix="%" frame={frame} start={50} color={C.primary} />, label: "시간 절감", desc: "50초 → 18초" },
            { icon: "👥", metric: <CountUp target={30} suffix="명+" frame={frame} start={80} color={C.success} />, label: "동시 수업", desc: "서버 병목 없음" },
            { icon: "💰", metric: <CountUp target={0} suffix="원" frame={frame} start={110} dur={10} color={C.accent} />, label: "추가 API 비용", desc: "사전 빌드 = 비용 제로" },
          ].map((item, i) => (
            <FadeIn key={i} delay={40 + i * 30}>
              <Card width={420} style={{ textAlign: "center", padding: "40px" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ marginBottom: 10 }}>{item.metric}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: C.white, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 18, color: C.gray }}>{item.desc}</div>
              </Card>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={200}>
          <Card style={{ textAlign: "center", border: `1px solid ${C.success}40`, padding: "24px 60px" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.success, marginBottom: 8 }}>🎓 가장 중요한 효과</div>
            <div style={{ fontSize: 22, color: C.white }}>
              바이브 코딩으로 <strong style={{ color: C.primary }}>진입 장벽 제거</strong> + 학습 사이클로 <strong style={{ color: C.secondary }}>코딩 원리 체득</strong>
            </div>
          </Card>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Scene 9: CTA ═══════════ */
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = Math.sin(frame / 15) * 0.03 + 1;
  const sc = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 10 } });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, #1a2744 0%, ${C.bg} 70%)`, fontFamily: F }}>
      <Grid /><Brand />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 80 }}>
        <FadeIn delay={0}><Tag color={C.primary}>GET STARTED</Tag></FadeIn>
        <div style={{ transform: `scale(${sc})`, fontSize: 72, fontWeight: 900, color: C.white, textAlign: "center", lineHeight: 1.3, marginBottom: 30 }}>
          코딩을 몰라도 <span style={{ color: C.primary }}>체험</span>하고<br />
          체험을 통해 <span style={{ color: C.secondary }}>이해</span>하는
        </div>
        <FadeIn delay={60}>
          <div style={{ fontSize: 36, fontWeight: 800, color: C.accent, marginBottom: 40 }}>
            AI 바이브 코딩 교육 플랫폼
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ fontSize: 24, color: C.gray, textAlign: "center", lineHeight: 1.8, marginBottom: 50 }}>
            155개 예제 · 25개 카테고리 · 무제한 학생 · AI 학습 가이드
          </div>
        </FadeIn>
        <FadeIn delay={140}>
          <div style={{ transform: `scale(${pulse})`, background: `linear-gradient(135deg, ${C.primary}, ${C.secondary})`, color: C.white, fontSize: 32, fontWeight: 800, padding: "24px 80px", borderRadius: 60, boxShadow: `0 0 60px ${C.primary}40` }}>
            도입 문의 →
          </div>
        </FadeIn>
        <FadeIn delay={180}>
          <div style={{ marginTop: 30, fontSize: 20, color: C.gray }}>info@uttec.co.kr · uttec.co.kr</div>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ═══════════ Main Composition ═══════════ */
export const PrebuildPitchVideo: React.FC = () => {
  const scenes = [
    { key: "hook", comp: <SceneHook />, audio: "scene01_hook" },
    { key: "vibecoding", comp: <SceneVibeCoding />, audio: "scene02_vibecoding" },
    { key: "problem", comp: <SceneProblem />, audio: "scene03_problem" },
    { key: "solution", comp: <SceneSolution />, audio: "scene04_solution" },
    { key: "aiDetail", comp: <SceneAIDetail />, audio: "scene05_ai_detail" },
    { key: "learning", comp: <SceneLearning />, audio: "scene06_learning" },
    { key: "curriculum", comp: <SceneCurriculum />, audio: "scene07_curriculum" },
    { key: "benefits", comp: <SceneBenefits />, audio: "scene08_benefits" },
    { key: "cta", comp: <SceneCTA />, audio: "scene09_cta" },
  ];

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      {scenes.map((s) => {
        const t = T[s.key as keyof typeof T];
        return (
          <React.Fragment key={s.key}>
            <Sequence from={t.start} durationInFrames={t.duration}>
              <Audio src={staticFile(`audio/prebuild-pitch/${s.audio}.mp3`)} />
            </Sequence>
            <Sequence from={t.start} durationInFrames={t.duration}>
              {s.comp}
            </Sequence>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
