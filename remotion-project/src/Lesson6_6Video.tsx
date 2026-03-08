import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_6_6_DURATION = 5335;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 584 },
  structure: { start: 584, duration: 724 },
  encoder: { start: 1308, duration: 739 },
  decoder: { start: 2047, duration: 901 },
  problem: { start: 2948, duration: 749 },
  application: { start: 3697, duration: 837 },
  outro: { start: 4534, duration: 801 },
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
      <Audio src={staticFile("audio/lesson-6-6/intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔀</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>Seq2Seq 모델</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>시퀀스에서 시퀀스로</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 6-6
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneStructure: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-6/structure.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>Seq2Seq 기본 구조</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ background: "#22c55e", borderRadius: 20, padding: 40, marginBottom: 20 }}>
            <div style={{ fontSize: 60, marginBottom: 15 }}>📥</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>Encoder</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>입력 시퀀스 압축</div>
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)" }}>"나는 학생입니다"</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>
          <div style={{ background: "rgba(6,182,212,0.3)", borderRadius: "50%", width: 120, height: 120, display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>Context</div>
              <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>Vector</div>
            </div>
          </div>
          <div style={{ fontSize: 40, color: COLORS.primary }}>→</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ background: "#f97316", borderRadius: 20, padding: 40, marginBottom: 20 }}>
            <div style={{ fontSize: 60, marginBottom: 15 }}>📤</div>
            <div style={{ fontSize: 32, color: COLORS.light, fontWeight: 700 }}>Decoder</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>출력 시퀀스 생성</div>
          </div>
          <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)" }}>"I am a student"</div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneEncoder: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-6/encoder.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: "#22c55e", marginBottom: 40 }}>Encoder</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(34,197,94,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>동작 과정</h2>
            <ol style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>입력 토큰을 임베딩</li>
              <li>LSTM/GRU로 순차 처리</li>
              <li>마지막 은닉 상태 추출</li>
              <li>Context Vector 생성</li>
            </ol>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>Context Vector</h2>
            <div style={{ display: "grid", gap: 15 }}>
              <div style={{ background: "rgba(34,197,94,0.2)", padding: 20, borderRadius: 10, fontSize: 20, color: COLORS.light }}>
                입력 시퀀스 전체를 요약
              </div>
              <div style={{ background: "rgba(34,197,94,0.2)", padding: 20, borderRadius: 10, fontSize: 20, color: COLORS.light }}>
                고정 크기의 벡터
              </div>
              <div style={{ background: "rgba(34,197,94,0.2)", padding: 20, borderRadius: 10, fontSize: 20, color: COLORS.light }}>
                Decoder의 초기 상태로 전달
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneDecoder: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-6/decoder.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: "#f97316", marginBottom: 40 }}>Decoder</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(249,115,22,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>동작 과정</h2>
            <ol style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 2 }}>
              <li>&lt;SOS&gt; 토큰으로 시작</li>
              <li>이전 출력을 다음 입력으로</li>
              <li>소프트맥스로 단어 예측</li>
              <li>&lt;EOS&gt; 토큰까지 반복</li>
            </ol>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>Teacher Forcing</h2>
            <div style={{ display: "grid", gap: 15 }}>
              <div style={{ background: "rgba(249,115,22,0.2)", padding: 20, borderRadius: 10 }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "#f97316" }}>학습 시</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>정답 토큰을 입력으로 사용</div>
              </div>
              <div style={{ background: "rgba(249,115,22,0.2)", padding: 20, borderRadius: 10 }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: "#f97316" }}>추론 시</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>실제 예측값을 입력으로 사용</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneProblem: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-6/problem.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: "#ef4444", marginBottom: 40 }}>Seq2Seq의 한계</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(239,68,68,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: "#ef4444", marginBottom: 20 }}>병목 현상</h2>
            <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 2 }}>
              <li>고정 크기 Context Vector</li>
              <li>긴 문장 정보 손실</li>
              <li>앞부분 정보 희석</li>
              <li>성능 저하</li>
            </ul>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 28, color: "#22c55e", marginBottom: 20 }}>해결책: Attention</h2>
            <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 2 }}>
              <li>모든 인코더 출력 활용</li>
              <li>동적으로 가중치 부여</li>
              <li>중요한 부분에 집중</li>
              <li>다음 레벨에서 학습!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneApplication: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-6/application.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>Seq2Seq 응용 분야</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
        {[
          { emoji: "🌍", title: "기계 번역", desc: "한국어 → 영어" },
          { emoji: "💬", title: "챗봇", desc: "질문 → 응답" },
          { emoji: "📄", title: "텍스트 요약", desc: "긴 글 → 요약문" },
          { emoji: "🎤", title: "음성 인식", desc: "음성 → 텍스트" },
          { emoji: "🖼️", title: "이미지 캡셔닝", desc: "이미지 → 설명" },
          { emoji: "💻", title: "코드 생성", desc: "설명 → 코드" },
        ].map((app, i) => (
          <div key={i} style={{ background: "rgba(6,182,212,0.1)", borderRadius: 20, padding: 30, textAlign: "center", border: `2px solid ${COLORS.primary}` }}>
            <div style={{ fontSize: 60, marginBottom: 15 }}>{app.emoji}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.light, marginBottom: 10 }}>{app.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>{app.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-6-6/outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[
          { title: "Seq2Seq 구조", desc: "Encoder-Decoder 아키텍처" },
          { title: "Context Vector", desc: "입력 시퀀스의 압축된 표현" },
          { title: "병목 현상", desc: "고정 크기 벡터의 한계" },
          { title: "다양한 응용", desc: "번역, 챗봇, 요약 등" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>감성 분석 구현</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson6_6Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.structure.start} durationInFrames={SCENE_TIMINGS.structure.duration}><SceneStructure /></Sequence>
    <Sequence from={SCENE_TIMINGS.encoder.start} durationInFrames={SCENE_TIMINGS.encoder.duration}><SceneEncoder /></Sequence>
    <Sequence from={SCENE_TIMINGS.decoder.start} durationInFrames={SCENE_TIMINGS.decoder.duration}><SceneDecoder /></Sequence>
    <Sequence from={SCENE_TIMINGS.problem.start} durationInFrames={SCENE_TIMINGS.problem.duration}><SceneProblem /></Sequence>
    <Sequence from={SCENE_TIMINGS.application.start} durationInFrames={SCENE_TIMINGS.application.duration}><SceneApplication /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
