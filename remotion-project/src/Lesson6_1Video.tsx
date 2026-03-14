import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const LESSON_6_1_DURATION = 11463;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 852 },
  scene02_analogy: { start: 852, duration: 1092 },
  scene03_types: { start: 1944, duration: 1292 },
  scene04_timeseries: { start: 3236, duration: 1020 },
  scene05_text: { start: 4256, duration: 1185 },
  scene06_audio: { start: 5441, duration: 899 },
  scene07_mlp_problem: { start: 6340, duration: 1376 },
  scene08_rnn_intro: { start: 7716, duration: 1227 },
  scene09_comparison: { start: 8943, duration: 1164 },
  scene10_outro: { start: 10107, duration: 1356 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#06b6d4",
  secondary: "#0891b2",
  accent: "#22d3ee",
  light: "#ffffff",
  dark: "#164e63",
  gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
};

const fadeIn = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: "clamp" });

const slideUp = (frame: number, delay = 0) =>
  interpolate(frame - delay, [0, 25], [30, 0], { extrapolateRight: "clamp" });

const scaleIn = (frame: number, fps: number) =>
  spring({ frame, fps, config: { damping: 12 } });

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700, fontFamily: "Pretendard, sans-serif" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", background: "rgba(6, 182, 212, 0.9)", padding: "12px 30px", borderRadius: 25, zIndex: 100 }}>
      <span style={{ color: COLORS.light, fontSize: 20, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>http://uttec-ai.duckdns.org</span>
    </div>
  </>
);

const AnimatedBackground: React.FC<{ variant?: "gradient" | "dark" }> = ({ variant = "gradient" }) => {
  const frame = useCurrentFrame();
  const pos = (frame % 200) / 200;
  if (variant === "dark") {
    return <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${135 + pos * 30}deg, ${COLORS.background} 0%, #1e293b 50%, ${COLORS.dark} 100%)` }} />;
  }
  return <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${135 + pos * 20}deg, ${COLORS.primary} 0%, ${COLORS.secondary} 50%, #0e7490 100%)` }} />;
};

const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="gradient" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene01_intro.mp3")} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", padding: 60 }}>
        <div style={{ fontSize: 140, marginBottom: 30, transform: `scale(${scaleIn(frame, fps)})` }}>📝</div>
        <h1 style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20, opacity: fadeIn(frame, 15), transform: `translateY(${slideUp(frame, 15)}px)` }}>시퀀스 데이터란?</h1>
        <p style={{ fontSize: 36, color: "rgba(255,255,255,0.9)", marginBottom: 30, opacity: fadeIn(frame, 25) }}>순서가 있는 데이터의 세계</p>
        <div style={{ padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light, opacity: fadeIn(frame, 35) }}>Level 6 - Lesson 1</div>
      </div>
    </AbsoluteFill>
  );
};

const Scene02Analogy: React.FC = () => {
  const frame = useCurrentFrame();
  const pages = [{ text: "주인공 이름", page: 1 }, { text: "배경 설명", page: 2 }, { text: "사건 발생", page: 3 }];
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene02_analogy.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40, opacity: fadeIn(frame) }}>비유: 소설책 읽기</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
              {pages.map((p, i) => (
                <div key={i} style={{ width: 180, height: 240, background: frame > 30 + i * 25 ? `linear-gradient(145deg, ${COLORS.primary}, ${COLORS.secondary})` : "#334155", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", opacity: fadeIn(frame, 20 + i * 15), transform: `translateY(${slideUp(frame, 20 + i * 15)}px)` }}>
                  <div style={{ fontSize: 48, marginBottom: 10 }}>📄</div>
                  <div style={{ fontSize: 20, color: COLORS.light, fontWeight: 600, textAlign: "center" }}>{p.text}</div>
                  <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Page {p.page}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(239, 68, 68, 0.2)", border: "2px solid #ef4444", borderRadius: 16, padding: 30, opacity: fadeIn(frame, 70) }}>
              <div style={{ fontSize: 28, color: "#ef4444", fontWeight: 700, marginBottom: 10 }}>⚠️ 페이지를 섞으면?</div>
              <div style={{ fontSize: 24, color: COLORS.light }}>이야기를 전혀 이해할 수 없습니다!</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30 }}>
            <div style={{ background: "rgba(6, 182, 212, 0.15)", borderRadius: 16, padding: 30, opacity: fadeIn(frame, 90) }}>
              <div style={{ fontSize: 26, color: COLORS.accent, marginBottom: 15, fontWeight: 700 }}>✅ "안녕하세요"</div>
              <div style={{ fontSize: 22, color: COLORS.light }}>의미가 통하는 인사말</div>
            </div>
            <div style={{ background: "rgba(239, 68, 68, 0.15)", borderRadius: 16, padding: 30, opacity: fadeIn(frame, 100) }}>
              <div style={{ fontSize: 26, color: "#ef4444", marginBottom: 15, fontWeight: 700 }}>❌ "하녕안세요"</div>
              <div style={{ fontSize: 22, color: COLORS.light }}>같은 글자들이지만 의미 없음</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene03Types: React.FC = () => {
  const frame = useCurrentFrame();
  const types = [
    { icon: "📈", name: "시계열", desc: "주가, 기온, 심박수", meaning: "시간 흐름 방향" },
    { icon: "📝", name: "텍스트", desc: "문장, 대화, 뉴스", meaning: "단어/글자 순서" },
    { icon: "🔊", name: "음성", desc: "목소리, 음악, 소리", meaning: "파형 시간 변화" },
  ];
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene03_types.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50, opacity: fadeIn(frame) }}>시퀀스 데이터의 세 가지 유형</h1>
        <div style={{ display: "flex", gap: 40 }}>
          {types.map((t, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(6, 182, 212, 0.1)", border: `2px solid ${COLORS.primary}`, borderRadius: 20, padding: 40, textAlign: "center", opacity: fadeIn(frame, 20 + i * 20), transform: `translateY(${slideUp(frame, 20 + i * 20)}px)` }}>
              <div style={{ fontSize: 80, marginBottom: 20 }}>{t.icon}</div>
              <div style={{ fontSize: 36, color: COLORS.primary, fontWeight: 700, marginBottom: 15 }}>{t.name}</div>
              <div style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>{t.desc}</div>
              <div style={{ fontSize: 20, color: COLORS.accent, background: "rgba(6, 182, 212, 0.2)", padding: "10px 20px", borderRadius: 20 }}>{t.meaning}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 50, textAlign: "center", fontSize: 32, color: COLORS.light, opacity: fadeIn(frame, 80) }}>💡 공통점: 앞의 것을 보아야 뒤의 것을 이해할 수 있다!</div>
      </div>
    </AbsoluteFill>
  );
};

const Scene04Timeseries: React.FC = () => {
  const frame = useCurrentFrame();
  const data = [{ day: "월", price: 100, change: "-" }, { day: "화", price: 105, change: "+5 📈" }, { day: "수", price: 103, change: "-2 📉" }, { day: "목", price: 108, change: "+5 📈" }, { day: "금", price: "???", change: "예측?" }];
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene04_timeseries.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50, opacity: fadeIn(frame) }}>📈 시계열 데이터 자세히 보기</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(6, 182, 212, 0.1)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ display: "flex", background: COLORS.primary, padding: "15px 0" }}>
                <div style={{ flex: 1, textAlign: "center", color: COLORS.light, fontWeight: 700, fontSize: 24 }}>요일</div>
                <div style={{ flex: 1, textAlign: "center", color: COLORS.light, fontWeight: 700, fontSize: 24 }}>가격</div>
                <div style={{ flex: 1, textAlign: "center", color: COLORS.light, fontWeight: 700, fontSize: 24 }}>변화</div>
              </div>
              {data.map((d, i) => (
                <div key={i} style={{ display: "flex", padding: "20px 0", borderBottom: i < data.length - 1 ? "1px solid rgba(6,182,212,0.2)" : "none", opacity: fadeIn(frame, 15 + i * 10), background: i === 4 ? "rgba(6, 182, 212, 0.15)" : "transparent" }}>
                  <div style={{ flex: 1, textAlign: "center", color: COLORS.light, fontSize: 22 }}>{d.day}</div>
                  <div style={{ flex: 1, textAlign: "center", color: i === 4 ? COLORS.accent : COLORS.light, fontSize: 22, fontWeight: i === 4 ? 700 : 400 }}>{d.price}원</div>
                  <div style={{ flex: 1, textAlign: "center", color: COLORS.light, fontSize: 22 }}>{d.change}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30 }}>
            <div style={{ background: "rgba(6, 182, 212, 0.2)", borderRadius: 16, padding: 40, opacity: fadeIn(frame, 60) }}>
              <div style={{ fontSize: 28, color: COLORS.accent, fontWeight: 700 }}>💡 핵심</div>
              <div style={{ fontSize: 26, color: COLORS.light, marginTop: 15, lineHeight: 1.6 }}>"어제까지의 흐름"을 알아야 "내일"을 예측할 수 있습니다!</div>
            </div>
            <div style={{ background: "rgba(239, 68, 68, 0.15)", borderRadius: 16, padding: 30, opacity: fadeIn(frame, 75) }}>
              <div style={{ fontSize: 24, color: "#ef4444", fontWeight: 700 }}>⚠️ 순서를 무시하면?</div>
              <div style={{ fontSize: 22, color: COLORS.light, marginTop: 10 }}>평균 104원만 알면 추세를 전혀 알 수 없음!</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene05Text: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene05_text.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50, opacity: fadeIn(frame) }}>📝 텍스트 데이터: 순서가 의미를 결정</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(6, 182, 212, 0.1)", borderRadius: 16, padding: 30, marginBottom: 30, opacity: fadeIn(frame, 20) }}>
              <div style={{ fontSize: 28, color: COLORS.accent, marginBottom: 20, fontWeight: 700 }}>🐕 "개가 사람을 물었다"</div>
              <div style={{ fontSize: 24, color: COLORS.light }}>가해자: 개</div>
            </div>
            <div style={{ background: "rgba(239, 68, 68, 0.1)", borderRadius: 16, padding: 30, opacity: fadeIn(frame, 35) }}>
              <div style={{ fontSize: 28, color: "#ef4444", marginBottom: 20, fontWeight: 700 }}>👤 "사람이 개를 물었다"</div>
              <div style={{ fontSize: 24, color: COLORS.light }}>가해자: 사람!! (같은 단어, 다른 의미)</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20, opacity: fadeIn(frame, 50) }}>문맥이 의미를 결정</div>
            <div style={{ background: "rgba(6, 182, 212, 0.1)", borderRadius: 16, padding: 25, marginBottom: 20, opacity: fadeIn(frame, 55) }}>
              <div style={{ fontSize: 24, color: COLORS.light }}>"빨간 <span style={{ color: COLORS.accent }}>사과</span>가 맛있다"</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>→ 🍎 과일</div>
            </div>
            <div style={{ background: "rgba(6, 182, 212, 0.1)", borderRadius: 16, padding: 25, marginBottom: 30, opacity: fadeIn(frame, 65) }}>
              <div style={{ fontSize: 24, color: COLORS.light }}>"진심으로 <span style={{ color: COLORS.accent }}>사과</span>드립니다"</div>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>→ 🙏 용서를 구하는 행위</div>
            </div>
            <div style={{ background: "rgba(6, 182, 212, 0.2)", borderRadius: 16, padding: 25, opacity: fadeIn(frame, 80) }}>
              <div style={{ fontSize: 22, color: COLORS.light }}>💡 AI가 텍스트를 이해하려면 이전 단어를 기억해야!</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene06Audio: React.FC = () => {
  const frame = useCurrentFrame();
  const wavePoints = Array.from({ length: 40 }, (_, i) => Math.sin((i + frame * 0.3) * 0.15) * 50);
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene06_audio.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50, opacity: fadeIn(frame) }}>🔊 음성 데이터: 시간에 따른 파형</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(6, 182, 212, 0.1)", borderRadius: 16, padding: 40, height: 200, display: "flex", alignItems: "center", justifyContent: "center", opacity: fadeIn(frame, 20) }}>
              <svg width="100%" height="120" viewBox="0 0 400 120">
                <path d={`M 0 60 ${wavePoints.map((y, i) => `L ${i * 10} ${60 + y}`).join(" ")}`} stroke={COLORS.primary} strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div style={{ display: "flex", marginTop: 20, gap: 10 }}>
              {[{ time: "0.0초", sound: '"아~"' }, { time: "0.1초", sound: '"ㄴ"' }, { time: "0.2초", sound: '"녕"' }].map((t, i) => (
                <div key={i} style={{ flex: 1, background: COLORS.primary, borderRadius: 12, padding: 15, textAlign: "center", opacity: fadeIn(frame, 40 + i * 15) }}>
                  <div style={{ fontSize: 20, color: COLORS.light, fontWeight: 600 }}>{t.time}</div>
                  <div style={{ fontSize: 24, color: COLORS.light }}>{t.sound}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 30 }}>
            <div style={{ background: "rgba(6, 182, 212, 0.15)", borderRadius: 16, padding: 30, opacity: fadeIn(frame, 50) }}>
              <div style={{ fontSize: 26, color: COLORS.light, lineHeight: 1.6 }}>소리 = 공기의 진동 시간에 따라 변하는 파형</div>
            </div>
            <div style={{ background: "rgba(239, 68, 68, 0.15)", border: "2px solid #ef4444", borderRadius: 16, padding: 30, opacity: fadeIn(frame, 65) }}>
              <div style={{ fontSize: 26, color: "#ef4444", fontWeight: 700 }}>⚠️ 순서가 바뀌면?</div>
              <div style={{ fontSize: 24, color: COLORS.light, marginTop: 10 }}>"녕안" 같은 이상한 소리!</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene07MLPProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const problems = [
    { num: "1", title: "순서를 무시", desc: "100, 105, 103, 108을 동시에 처리하면 순서 정보 손실" },
    { num: "2", title: "고정 입력 크기", desc: "10단어용 ≠ 100단어용, 길이마다 별도 모델?" },
    { num: "3", title: "기억 능력 없음", desc: '"cat"을 기억해야 다음 단어 예측 가능' },
  ];
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene07_mlp_problem.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 20, opacity: fadeIn(frame) }}>❌ MLP/CNN의 한계</h1>
        <p style={{ fontSize: 28, color: "rgba(255,255,255,0.7)", marginBottom: 50, opacity: fadeIn(frame, 10) }}>일반 신경망은 각 입력을 독립적으로 처리합니다</p>
        <div style={{ display: "flex", gap: 30 }}>
          {problems.map((p, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(239, 68, 68, 0.1)", border: "2px solid rgba(239, 68, 68, 0.5)", borderRadius: 20, padding: 30, opacity: fadeIn(frame, 25 + i * 20), transform: `translateY(${slideUp(frame, 25 + i * 20)}px)` }}>
              <div style={{ width: 60, height: 60, background: "#ef4444", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 28, color: COLORS.light, fontWeight: 700, marginBottom: 20 }}>{p.num}</div>
              <div style={{ fontSize: 28, color: "#ef4444", fontWeight: 700, marginBottom: 15 }}>{p.title}</div>
              <div style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene08RNNIntro: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene08_rnn_intro.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40, opacity: fadeIn(frame) }}>✨ RNN의 등장!</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(6, 182, 212, 0.15)", borderRadius: 20, padding: 40, marginBottom: 30, opacity: fadeIn(frame, 20) }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>📔</div>
              <div style={{ fontSize: 28, color: COLORS.accent, fontWeight: 700, marginBottom: 15 }}>비유: 메모장을 들고 책 읽기</div>
              <div style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.6 }}>한 문장을 읽을 때마다 메모장에 핵심 내용을 적고, 다음 문장을 읽을 때 메모장을 참고!</div>
            </div>
            <div style={{ background: "rgba(6, 182, 212, 0.2)", borderRadius: 16, padding: 25, opacity: fadeIn(frame, 40) }}>
              <div style={{ fontSize: 24, color: COLORS.light }}>메모장 = <span style={{ color: COLORS.accent, fontWeight: 700 }}>Hidden State (은닉 상태)</span></div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 15 }}>
            {[{ input: "입력1", hidden: "h1", action: "메모 저장" }, { input: "입력2 + h1", hidden: "h2", action: "메모 업데이트" }, { input: "입력3 + h2", hidden: "h3", action: "메모 업데이트" }].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 15, opacity: fadeIn(frame, 50 + i * 15), transform: `translateX(${interpolate(frame - (50 + i * 15), [0, 20], [30, 0], { extrapolateRight: "clamp" })}px)` }}>
                <div style={{ background: COLORS.secondary, borderRadius: 10, padding: "12px 20px", fontSize: 20, color: COLORS.light, minWidth: 130, textAlign: "center" }}>[{step.input}]</div>
                <div style={{ fontSize: 28, color: COLORS.accent }}>→</div>
                <div style={{ background: COLORS.primary, borderRadius: 10, padding: "12px 20px", fontSize: 20, color: COLORS.light, fontWeight: 700 }}>{step.hidden}</div>
                <div style={{ fontSize: 28, color: COLORS.accent }}>→</div>
                <div style={{ fontSize: 20, color: COLORS.light }}>{step.action}</div>
              </div>
            ))}
            <div style={{ marginTop: 20, background: "rgba(6, 182, 212, 0.15)", borderRadius: 12, padding: 20, opacity: fadeIn(frame, 90) }}>
              <div style={{ fontSize: 22, color: COLORS.light }}>순서 정보가 자연스럽게 유지됩니다! ✅</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene09Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const comparisons = [
    { feature: "순서", static: "무관/공간적", sequence: "시간적 - 매우 중요" },
    { feature: "모델", static: "MLP, CNN", sequence: "RNN, LSTM, Transformer" },
    { feature: "입력 크기", static: "보통 고정", sequence: "가변 길이" },
    { feature: "핵심 패턴", static: "공간적 특징", sequence: "시간적 의존성" },
  ];
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="dark" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene09_comparison.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50, opacity: fadeIn(frame) }}>📊 정적 vs 시퀀스 데이터 비교</h1>
        <div style={{ background: "rgba(6, 182, 212, 0.1)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ display: "flex", background: COLORS.primary }}>
            <div style={{ flex: 1, padding: 20, fontSize: 24, fontWeight: 700, color: COLORS.light, textAlign: "center" }}>특성</div>
            <div style={{ flex: 2, padding: 20, fontSize: 24, fontWeight: 700, color: COLORS.light, textAlign: "center", borderLeft: "2px solid rgba(255,255,255,0.2)" }}>정적 데이터 (이미지, 표)</div>
            <div style={{ flex: 2, padding: 20, fontSize: 24, fontWeight: 700, color: COLORS.light, textAlign: "center", borderLeft: "2px solid rgba(255,255,255,0.2)" }}>시퀀스 데이터 (텍스트, 음성)</div>
          </div>
          {comparisons.map((c, i) => (
            <div key={i} style={{ display: "flex", borderTop: "1px solid rgba(6,182,212,0.2)", opacity: fadeIn(frame, 20 + i * 15) }}>
              <div style={{ flex: 1, padding: 20, fontSize: 22, color: COLORS.accent, fontWeight: 600, textAlign: "center" }}>{c.feature}</div>
              <div style={{ flex: 2, padding: 20, fontSize: 22, color: COLORS.light, textAlign: "center", borderLeft: "1px solid rgba(6,182,212,0.2)" }}>{c.static}</div>
              <div style={{ flex: 2, padding: 20, fontSize: 22, color: COLORS.accent, textAlign: "center", borderLeft: "1px solid rgba(6,182,212,0.2)", fontWeight: 600 }}>{c.sequence}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene10Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const summaries = [
    { num: "1", text: "시퀀스 데이터는 순서가 중요한 데이터" },
    { num: "2", text: "시계열, 텍스트, 음성 세 유형이 있음" },
    { num: "3", text: "MLP/CNN은 순서를 무시, 기억이 없음" },
    { num: "4", text: "RNN은 Hidden State로 순서를 기억" },
  ];
  return (
    <AbsoluteFill style={{ fontFamily: "Pretendard, sans-serif" }}>
      <AnimatedBackground variant="gradient" />
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/scene10_outro.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.light, marginBottom: 50, opacity: fadeIn(frame) }}>🎯 오늘 배운 내용 정리</h1>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {summaries.map((s, i) => (
            <div key={i} style={{ flex: "1 1 45%", background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 30, display: "flex", alignItems: "center", gap: 20, opacity: fadeIn(frame, 15 + i * 15), transform: `translateY(${slideUp(frame, 15 + i * 15)}px)` }}>
              <div style={{ width: 50, height: 50, background: COLORS.light, borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 24, fontWeight: 700, color: COLORS.primary }}>{s.num}</div>
              <div style={{ fontSize: 24, color: COLORS.light }}>{s.text}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 50, textAlign: "center", opacity: fadeIn(frame, 80) }}>
          <div style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>다음 시간: RNN의 구체적인 동작 원리! 🚀</div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>순환 구조와 은닉 상태 계산을 직접 구현해 봅니다</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson6_1Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}><Scene01Intro /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene02_analogy.start} durationInFrames={SCENE_TIMINGS.scene02_analogy.duration}><Scene02Analogy /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene03_types.start} durationInFrames={SCENE_TIMINGS.scene03_types.duration}><Scene03Types /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene04_timeseries.start} durationInFrames={SCENE_TIMINGS.scene04_timeseries.duration}><Scene04Timeseries /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene05_text.start} durationInFrames={SCENE_TIMINGS.scene05_text.duration}><Scene05Text /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene06_audio.start} durationInFrames={SCENE_TIMINGS.scene06_audio.duration}><Scene06Audio /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene07_mlp_problem.start} durationInFrames={SCENE_TIMINGS.scene07_mlp_problem.duration}><Scene07MLPProblem /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene08_rnn_intro.start} durationInFrames={SCENE_TIMINGS.scene08_rnn_intro.duration}><Scene08RNNIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene09_comparison.start} durationInFrames={SCENE_TIMINGS.scene09_comparison.duration}><Scene09Comparison /></Sequence>
    <Sequence from={SCENE_TIMINGS.scene10_outro.start} durationInFrames={SCENE_TIMINGS.scene10_outro.duration}><Scene10Outro /></Sequence>
  </AbsoluteFill>
);
