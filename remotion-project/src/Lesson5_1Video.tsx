import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_1_DURATION = 8784;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 579 },
  what_is_cv: { start: 579, duration: 908 },
  applications: { start: 1487, duration: 1412 },
  pixel: { start: 2899, duration: 1103 },
  channel: { start: 4002, duration: 1107 },
  tensor: { start: 5109, duration: 1269 },
  normalization: { start: 6378, duration: 1131 },
  outro: { start: 7509, duration: 1275 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#ec4899",
  secondary: "#db2777",
  accent: "#be185d",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
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
      <Audio src={staticFile("audio/lesson-5-1/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🖼️</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>컴퓨터 비전 소개</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>이미지를 숫자로 이해하는 방법</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 5-1
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneWhatIsCV: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-1/scene2_what_is_cv.mp3")} />
      <div style={{ padding: 80, paddingTop: 100, opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>컴퓨터 비전이란?</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 40, marginBottom: 30 }}>
              <div style={{ fontSize: 28, color: COLORS.light, lineHeight: 1.6 }}>
                컴퓨터가 <span style={{ color: COLORS.primary, fontWeight: 700 }}>이미지나 영상</span>을<br />
                인간처럼 이해하고 분석하는 기술
              </div>
            </div>
            <div style={{ display: "grid", gap: 20 }}>
              {[
                { icon: "👁️", text: "시각 정보 처리" },
                { icon: "🧠", text: "패턴 인식" },
                { icon: "📊", text: "데이터 추출" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 20 }}>
                  <span style={{ fontSize: 36 }}>{item.icon}</span>
                  <span style={{ fontSize: 24, color: COLORS.light }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 150, marginBottom: 20 }}>🖼️➡️🤖</div>
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>이미지 → 컴퓨터 이해</div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneApplications: React.FC = () => {
  const frame = useCurrentFrame();
  const apps = [
    { emoji: "🐱", title: "이미지 분류", desc: "고양이 vs 개" },
    { emoji: "🚗", title: "객체 탐지", desc: "자율주행" },
    { emoji: "👤", title: "얼굴 인식", desc: "Face ID" },
    { emoji: "🏥", title: "의료 영상", desc: "X-ray 분석" },
    { emoji: "📝", title: "OCR", desc: "텍스트 추출" },
    { emoji: "🏃", title: "자세 추정", desc: "운동 분석" },
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-1/scene3_applications.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 50 }}>컴퓨터 비전의 응용 분야</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
          {apps.map((app, i) => {
            const delay = i * 10;
            const show = frame > delay;
            return (
              <div key={i} style={{ background: "rgba(236,72,153,0.1)", borderRadius: 20, padding: 30, textAlign: "center", border: `2px solid ${COLORS.primary}`, opacity: show ? 1 : 0, transform: `scale(${show ? 1 : 0.8})`, transition: "all 0.3s" }}>
                <div style={{ fontSize: 60, marginBottom: 15 }}>{app.emoji}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, marginBottom: 10 }}>{app.title}</div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.7)" }}>{app.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ScenePixel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-1/scene4_pixel.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>픽셀(Pixel)이란?</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 40, marginBottom: 30 }}>
              <div style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>
                <span style={{ color: COLORS.primary, fontWeight: 700 }}>Pixel</span> = Picture + Element
              </div>
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>이미지의 가장 작은 단위</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[{ name: "HD", size: "1920×1080", pixels: "200만" }, { name: "4K", size: "3840×2160", pixels: "800만" }, { name: "MNIST", size: "28×28", pixels: "784" }, { name: "CIFAR-10", size: "32×32", pixels: "1,024" }].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.primary }}>{item.name}</div>
                  <div style={{ fontSize: 20, color: COLORS.light }}>{item.size}</div>
                  <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>{item.pixels} 픽셀</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4 }}>
              {Array.from({ length: 64 }).map((_, i) => {
                const brightness = Math.floor(Math.random() * 255);
                const show = frame > i * 2;
                return <div key={i} style={{ width: 40, height: 40, background: `rgb(${brightness},${brightness},${brightness})`, borderRadius: 4, opacity: show ? 1 : 0 }} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneChannel: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-1/scene5_channel.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>채널(Channel)의 이해</h1>
        <div style={{ display: "flex", gap: 60 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>흑백 이미지 (1채널)</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
              <div style={{ width: 60, height: 60, background: "linear-gradient(to right, #000, #fff)", borderRadius: 10 }} />
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>0 (검정) ~ 255 (흰색)</div>
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>Shape: (H, W) 또는 (H, W, 1)</div>
          </div>
          <div style={{ flex: 1, background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 40 }}>
            <h2 style={{ fontSize: 32, color: COLORS.light, marginBottom: 20 }}>컬러 이미지 (3채널)</h2>
            <div style={{ display: "flex", gap: 15, marginBottom: 20 }}>
              {[{ color: "#ff0000", label: "R" }, { color: "#00ff00", label: "G" }, { color: "#0000ff", label: "B" }].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, background: c.color, borderRadius: 8 }} />
                  <span style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>{c.label}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>Shape: (H, W, 3) 또는 (C, H, W)</div>
          </div>
        </div>
        <div style={{ marginTop: 40, display: "flex", gap: 20, justifyContent: "center" }}>
          {[{ color: "rgb(255,0,0)", name: "빨강" }, { color: "rgb(0,255,0)", name: "초록" }, { color: "rgb(0,0,255)", name: "파랑" }, { color: "rgb(255,255,0)", name: "노랑" }].map((c, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 60, height: 60, background: c.color, borderRadius: 10, marginBottom: 10 }} />
              <div style={{ fontSize: 18, color: COLORS.light }}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneTensor: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-1/scene6_tensor.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>텐서로 표현하기</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 40 }}>
          <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>PyTorch 방식</h2>
          <div style={{ fontSize: 48, color: COLORS.light, fontWeight: 700, marginBottom: 15 }}>(N, C, H, W)</div>
          <div style={{ display: "grid", gap: 10 }}>
            {[{ label: "N", desc: "배치 크기" }, { label: "C", desc: "채널 수" }, { label: "H", desc: "높이" }, { label: "W", desc: "너비" }].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <div style={{ width: 40, height: 40, background: COLORS.primary, borderRadius: 8, display: "flex", justifyContent: "center", alignItems: "center", color: COLORS.light, fontWeight: 700 }}>{item.label}</div>
                <span style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, background: "rgba(236,72,153,0.15)", borderRadius: 20, padding: 40 }}>
          <h2 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>예시</h2>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 25, fontFamily: "monospace" }}>
            <div style={{ fontSize: 24, color: "#22c55e", marginBottom: 10 }}># 64개의 224x224 컬러 이미지</div>
            <div style={{ fontSize: 28, color: COLORS.light }}>shape = (64, 3, 224, 224)</div>
          </div>
          <div style={{ marginTop: 30, padding: 20, background: "rgba(255,255,255,0.1)", borderRadius: 10 }}>
            <div style={{ fontSize: 22, color: COLORS.light }}>NumPy: (H, W, C)</div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)", marginTop: 5 }}>변환 시 주의 필요!</div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneNormalization: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-1/scene7_normalization.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>정규화의 중요성</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(239,68,68,0.2)", borderRadius: 20, padding: 30, marginBottom: 30 }}>
            <h2 style={{ fontSize: 28, color: "#ef4444", marginBottom: 15 }}>원본 (0~255)</h2>
            <ul style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8 }}>
              <li>값이 너무 큼</li>
              <li>학습 불안정</li>
              <li>수렴 속도 느림</li>
            </ul>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(34,197,94,0.2)", borderRadius: 20, padding: 30 }}>
            <h2 style={{ fontSize: 28, color: "#22c55e", marginBottom: 15 }}>정규화 방법</h2>
            <div style={{ display: "grid", gap: 15 }}>
              {[{ method: "0~1 범위", formula: "pixel / 255.0" }, { method: "-1~1 범위", formula: "(pixel - 127.5) / 127.5" }, { method: "표준화", formula: "(pixel - mean) / std" }].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: 15 }}>
                  <div style={{ fontSize: 20, color: COLORS.primary, fontWeight: 600 }}>{item.method}</div>
                  <div style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>{item.formula}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-1/scene8_outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25, maxWidth: 1000 }}>
        {[{ title: "픽셀", desc: "이미지의 최소 단위, 0~255" }, { title: "채널", desc: "흑백=1채널, 컬러=3채널(RGB)" }, { title: "텐서 Shape", desc: "PyTorch: (N, C, H, W)" }, { title: "정규화", desc: "학습 안정성 향상" }].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginTop: 10 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, fontSize: 32, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>합성곱 연산</span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson5_1Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.what_is_cv.start} durationInFrames={SCENE_TIMINGS.what_is_cv.duration}><SceneWhatIsCV /></Sequence>
    <Sequence from={SCENE_TIMINGS.applications.start} durationInFrames={SCENE_TIMINGS.applications.duration}><SceneApplications /></Sequence>
    <Sequence from={SCENE_TIMINGS.pixel.start} durationInFrames={SCENE_TIMINGS.pixel.duration}><ScenePixel /></Sequence>
    <Sequence from={SCENE_TIMINGS.channel.start} durationInFrames={SCENE_TIMINGS.channel.duration}><SceneChannel /></Sequence>
    <Sequence from={SCENE_TIMINGS.tensor.start} durationInFrames={SCENE_TIMINGS.tensor.duration}><SceneTensor /></Sequence>
    <Sequence from={SCENE_TIMINGS.normalization.start} durationInFrames={SCENE_TIMINGS.normalization.duration}><SceneNormalization /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
