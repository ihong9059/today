import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_6_1_DURATION = 5699;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 824 },
  sequence: { start: 824, duration: 649 },
  types: { start: 1473, duration: 1063 },
  timeseries: { start: 2536, duration: 815 },
  text: { start: 3351, duration: 853 },
  whyRnn: { start: 4204, duration: 762 },
  outro: { start: 4966, duration: 733 },
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
      <Audio src={staticFile("audio/lesson-6-1/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>📝</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>시퀀스 데이터란?</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>순서가 중요한 데이터의 세계</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 6-1
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneSequence: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/sequence.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>시퀀스 데이터의 정의</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40, marginBottom: 30 }}>
              <div style={{ fontSize: 32, color: COLORS.light, marginBottom: 20, fontWeight: 700 }}>
                순서가 의미를 가지는 데이터
              </div>
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>
                각 요소의 위치가 정보를 담고 있음
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              {["H", "E", "L", "L", "O"].map((char, i) => (
                <div key={i} style={{
                  width: 70, height: 70,
                  background: COLORS.primary,
                  borderRadius: 10,
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontSize: 36, fontWeight: 700, color: COLORS.light,
                  opacity: frame > i * 5 ? 1 : 0,
                  transform: `translateY(${frame > i * 5 ? 0 : 20}px)`,
                  transition: "all 0.3s"
                }}>{char}</div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 100 }}>📊</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const types = [
    { emoji: "📈", title: "시계열 데이터", desc: "주식가격, 기온, 센서" },
    { emoji: "📝", title: "텍스트", desc: "문장, 문서, 대화" },
    { emoji: "🎵", title: "오디오", desc: "음성, 음악" },
    { emoji: "🎬", title: "비디오", desc: "프레임의 연속" },
    { emoji: "🧬", title: "DNA/RNA", desc: "염기 서열" },
    { emoji: "👆", title: "제스처", desc: "동작의 연속" },
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/types.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>시퀀스 데이터의 종류</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {types.map((type, i) => {
            const delay = i * 8;
            const show = frame > delay;
            return (
              <div key={i} style={{
                background: "rgba(6,182,212,0.1)", borderRadius: 20, padding: 30, textAlign: "center",
                border: `2px solid ${COLORS.primary}`,
                opacity: show ? 1 : 0,
                transform: `scale(${show ? 1 : 0.8})`
              }}>
                <div style={{ fontSize: 60, marginBottom: 15 }}>{type.emoji}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 10 }}>{type.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>{type.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTimeseries: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-6-1/timeseries.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>시계열 데이터</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40 }}>
              <h2 style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>특징</h2>
              <ul style={{ fontSize: 24, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
                <li>시간 순서대로 측정된 데이터</li>
                <li>과거가 미래에 영향</li>
                <li>추세, 계절성, 주기성</li>
                <li>불규칙 변동 포함</li>
              </ul>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40, height: 300, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8 }}>
              {[60, 75, 65, 80, 90, 70, 85, 95, 80, 100].map((h, i) => (
                <div key={i} style={{
                  width: 40, height: `${h * 2.5}px`,
                  background: `linear-gradient(to top, ${COLORS.primary}, ${COLORS.secondary})`,
                  borderRadius: "5px 5px 0 0",
                  opacity: frame > i * 5 ? 1 : 0.3,
                }} />
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 20, color: "rgba(255,255,255,0.6)", fontSize: 20 }}>
              시간 →
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneText: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-1/text.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>텍스트 데이터</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(6,182,212,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>단어의 순서가 의미를 결정</h2>
            <div style={{ display: "grid", gap: 20 }}>
              {[
                { text: "나는 너를 사랑해", emoji: "❤️" },
                { text: "너는 나를 사랑해", emoji: "💕" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, background: "rgba(0,0,0,0.2)", padding: 20, borderRadius: 15 }}>
                  <span style={{ fontSize: 40 }}>{item.emoji}</span>
                  <span style={{ fontSize: 26, color: COLORS.light }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>응용 분야</h2>
            <div style={{ display: "grid", gap: 15 }}>
              {["기계 번역", "감성 분석", "텍스트 요약", "질의응답"].map((app, i) => (
                <div key={i} style={{ background: "rgba(6,182,212,0.2)", padding: 15, borderRadius: 10, fontSize: 24, color: COLORS.light }}>
                  {app}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneWhyRnn: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-1/why_rnn.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>왜 RNN이 필요한가?</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(239,68,68,0.2)", borderRadius: 20, padding: 30, marginBottom: 20 }}>
            <h2 style={{ fontSize: 28, color: "#ef4444", marginBottom: 15 }}>일반 신경망의 한계</h2>
            <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8 }}>
              <li>고정된 입력 크기</li>
              <li>순서 정보 무시</li>
              <li>이전 정보 기억 불가</li>
            </ul>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 30 }}>
            <h2 style={{ fontSize: 28, color: "#22c55e", marginBottom: 15 }}>RNN의 장점</h2>
            <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8 }}>
              <li>가변 길이 입력 처리</li>
              <li>순서 정보 활용</li>
              <li>은닉 상태로 정보 전달</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <div style={{ fontSize: 80 }}>🔄</div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.8)", marginTop: 20 }}>
          순환(Recurrent) 구조로 시퀀스를 처리
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-1/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "시퀀스 데이터", desc: "순서가 의미를 갖는 데이터" },
          { title: "다양한 종류", desc: "시계열, 텍스트, 오디오 등" },
          { title: "순서의 중요성", desc: "같은 요소도 순서에 따라 의미 변화" },
          { title: "RNN 필요성", desc: "순서 정보를 기억하고 처리" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>RNN의 구조와 동작 원리</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson6_1Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.sequence.start} durationInFrames={SCENE_TIMINGS.sequence.duration}><SceneSequence /></Sequence>
    <Sequence from={SCENE_TIMINGS.types.start} durationInFrames={SCENE_TIMINGS.types.duration}><SceneTypes /></Sequence>
    <Sequence from={SCENE_TIMINGS.timeseries.start} durationInFrames={SCENE_TIMINGS.timeseries.duration}><SceneTimeseries /></Sequence>
    <Sequence from={SCENE_TIMINGS.text.start} durationInFrames={SCENE_TIMINGS.text.duration}><SceneText /></Sequence>
    <Sequence from={SCENE_TIMINGS.whyRnn.start} durationInFrames={SCENE_TIMINGS.whyRnn.duration}><SceneWhyRnn /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
