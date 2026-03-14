import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_2_DURATION = 7090;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 575 },
  why_conv: { start: 575, duration: 879 },
  how_conv: { start: 1454, duration: 728 },
  kernel: { start: 2182, duration: 1146 },
  stride: { start: 3328, duration: 777 },
  padding: { start: 4105, duration: 976 },
  feature_map: { start: 5081, duration: 997 },
  outro: { start: 6078, duration: 1012 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#ec4899",
  secondary: "#db2777",
  accent: "#f59e0b",
  success: "#10b981",
  danger: "#ef4444",
  cyan: "#06b6d4",
  light: "#ffffff",
  gray800: "#1e293b",
  gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 12, zIndex: 100 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 50, height: 50, borderRadius: 8 }} />
      <span style={{ color: COLORS.light, fontSize: 24, fontWeight: 700 }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, right: 40, color: "rgba(255,255,255,0.6)", fontSize: 20, zIndex: 100 }}>
      ai.uttec-lab.com
    </div>
  </>
);

// Scene 1: Intro
const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-2/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔍</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>합성곱 연산</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>CNN의 핵심! 작은 필터로 특징을 찾아내요</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 5-2
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Why Convolution
const SceneWhyConv: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene2_why_conv.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>🤔 왜 합성곱이 필요할까요?</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, background: "rgba(239,68,68,0.15)", borderRadius: 20, padding: 35, border: "2px solid rgba(239,68,68,0.4)" }}>
          <h2 style={{ fontSize: 32, color: COLORS.danger, marginBottom: 25 }}>❌ MLP의 문제점</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { emoji: "📏", text: "이미지를 1차원으로 펼침", issue: "공간 정보 손실" },
              { emoji: "💾", text: "파라미터가 너무 많음", issue: "수백만 개 필요" },
              { emoji: "📍", text: "위치 불변성 없음", issue: "같은 물체 못 찾음" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 15, background: COLORS.gray800, borderRadius: 15, padding: 20 }}>
                <span style={{ fontSize: 40 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontSize: 22, color: COLORS.light }}>{item.text}</div>
                  <div style={{ fontSize: 18, color: COLORS.danger }}>{item.issue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, background: "rgba(16,185,129,0.15)", borderRadius: 20, padding: 35, border: "2px solid rgba(16,185,129,0.4)" }}>
          <h2 style={{ fontSize: 32, color: COLORS.success, marginBottom: 25 }}>✅ CNN의 장점</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { emoji: "🖼️", text: "2D 구조 유지", benefit: "공간 정보 보존" },
              { emoji: "🔄", text: "가중치 공유", benefit: "파라미터 적음" },
              { emoji: "🎯", text: "위치 불변성", benefit: "어디서든 인식" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 15, background: COLORS.gray800, borderRadius: 15, padding: 20 }}>
                <span style={{ fontSize: 40 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontSize: 22, color: COLORS.light }}>{item.text}</div>
                  <div style={{ fontSize: 18, color: COLORS.success }}>{item.benefit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

// Scene 3: How Convolution Works
const SceneHowConv: React.FC = () => {
  const imageRegion = [[1, 2, 3], [0, 1, 2], [1, 2, 1]];
  const kernel = [[1, 0, 1], [0, 1, 0], [1, 0, 1]];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-2/scene3_how_conv.mp3")} />
      <div style={{ padding: 80, paddingTop: 100 }}>
        <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>🔢 합성곱 계산 방법</h1>
        <div style={{ display: "flex", gap: 30, alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: COLORS.gray800, borderRadius: 20, padding: 25, textAlign: "center" }}>
            <div style={{ fontSize: 22, color: COLORS.cyan, marginBottom: 15 }}>이미지 영역</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: 6 }}>
              {imageRegion.flat().map((val, i) => (
                <div key={i} style={{ width: 60, height: 60, background: "rgba(6,182,212,0.3)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: COLORS.light }}>{val}</div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 50, color: COLORS.primary }}>×</div>
          <div style={{ background: COLORS.gray800, borderRadius: 20, padding: 25, textAlign: "center" }}>
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 15 }}>커널 (필터)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)", gap: 6 }}>
              {kernel.flat().map((val, i) => (
                <div key={i} style={{ width: 60, height: 60, background: "rgba(236,72,153,0.3)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: COLORS.light }}>{val}</div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 50, color: COLORS.accent }}>=</div>
          <div style={{ background: "rgba(245,158,11,0.2)", borderRadius: 20, padding: 25, border: `3px solid ${COLORS.accent}`, textAlign: "center" }}>
            <div style={{ fontSize: 22, color: COLORS.accent, marginBottom: 15 }}>결과</div>
            <div style={{ width: 80, height: 80, background: COLORS.accent, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 800, color: COLORS.light }}>8</div>
          </div>
        </div>
        <div style={{ marginTop: 40, background: COLORS.gray800, borderRadius: 20, padding: 30 }}>
          <h3 style={{ fontSize: 24, color: COLORS.light, marginBottom: 15 }}>📝 계산 과정</h3>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", fontFamily: "monospace" }}>
            (1×1) + (2×0) + (3×1) + (0×0) + (1×1) + (2×0) + (1×1) + (2×0) + (1×1) = <span style={{ color: COLORS.accent, fontWeight: 700 }}>8</span>
          </div>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 15 }}>→ 같은 위치끼리 곱하고, 모두 더하면 하나의 값이 나와요!</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Kernel
const SceneKernel: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene4_kernel.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>🎛️ 커널 (필터)의 역할</h1>
      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(236,72,153,0.2)", borderRadius: 20, padding: 35, marginBottom: 30, border: "2px solid rgba(236,72,153,0.4)" }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>커널이란?</h2>
            <p style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              <span style={{ color: COLORS.accent, fontWeight: 700 }}>학습 가능한</span> 작은 가중치 행렬이에요.<br/>CNN이 학습하면서 커널 값이 자동으로 조정돼요.
            </p>
          </div>
          <div style={{ background: COLORS.gray800, borderRadius: 20, padding: 35 }}>
            <h3 style={{ fontSize: 24, color: COLORS.cyan, marginBottom: 20 }}>📐 일반적인 커널 크기</h3>
            <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
              {["3×3 (가장 많이 사용)", "5×5 (넓은 영역)", "1×1 (채널 조정)"].map((size, i) => (
                <div key={i} style={{ padding: "12px 20px", background: "rgba(6,182,212,0.2)", borderRadius: 10, fontSize: 18, color: COLORS.light }}>{size}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 26, color: COLORS.light, marginBottom: 25 }}>🔎 커널이 감지하는 특징</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {[
              { name: "수직 엣지", role: "세로선 감지", example: "건물, 문" },
              { name: "수평 엣지", role: "가로선 감지", example: "지평선, 선반" },
              { name: "가우시안", role: "블러 (노이즈 제거)", example: "배경 처리" },
              { name: "샤프닝", role: "선명도 강화", example: "디테일 강조" },
            ].map((k, i) => (
              <div key={i} style={{ background: COLORS.gray800, borderRadius: 15, padding: 20 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.primary, marginBottom: 8 }}>{k.name}</div>
                <div style={{ fontSize: 18, color: COLORS.light, marginBottom: 5 }}>{k.role}</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>예: {k.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

// Scene 5: Stride
const SceneStride: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene5_stride.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>👟 스트라이드 (Stride)</h1>
      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(6,182,212,0.2)", borderRadius: 20, padding: 35, marginBottom: 30, border: "2px solid rgba(6,182,212,0.4)" }}>
            <h2 style={{ fontSize: 30, color: COLORS.cyan, marginBottom: 20 }}>스트라이드란?</h2>
            <p style={{ fontSize: 24, color: COLORS.light }}>커널이 <span style={{ color: COLORS.accent, fontWeight: 700 }}>이동하는 칸 수</span>예요</p>
            <div style={{ marginTop: 25, display: "flex", gap: 20 }}>
              <div style={{ padding: "15px 25px", background: COLORS.gray800, borderRadius: 15 }}>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>Stride = 1</div>
                <div style={{ fontSize: 22, color: COLORS.light }}>한 칸씩 이동</div>
              </div>
              <div style={{ padding: "15px 25px", background: COLORS.gray800, borderRadius: 15 }}>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>Stride = 2</div>
                <div style={{ fontSize: 22, color: COLORS.light }}>두 칸씩 이동</div>
              </div>
            </div>
          </div>
          <div style={{ background: COLORS.gray800, borderRadius: 20, padding: 35 }}>
            <h3 style={{ fontSize: 24, color: COLORS.accent, marginBottom: 20 }}>📐 출력 크기 공식</h3>
            <div style={{ fontSize: 24, color: COLORS.light, fontFamily: "monospace", background: "#0f172a", padding: 20, borderRadius: 15, textAlign: "center" }}>
              출력 = (입력 - 커널) / 스트라이드 + 1
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 24, color: COLORS.light, marginBottom: 25 }}>📊 계산 예시</h3>
          <div style={{ background: COLORS.gray800, borderRadius: 20, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: COLORS.primary, padding: 15 }}>
              {["입력", "커널", "스트라이드", "출력"].map((h, i) => (
                <div key={i} style={{ fontSize: 18, fontWeight: 700, color: COLORS.light, textAlign: "center" }}>{h}</div>
              ))}
            </div>
            {[
              { input: "7×7", kernel: "3×3", stride: "1", output: "5×5" },
              { input: "7×7", kernel: "3×3", stride: "2", output: "3×3" },
              { input: "32×32", kernel: "3×3", stride: "1", output: "30×30" },
            ].map((ex, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: 15, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 20, color: COLORS.light, textAlign: "center" }}>{ex.input}</div>
                <div style={{ fontSize: 20, color: COLORS.light, textAlign: "center" }}>{ex.kernel}</div>
                <div style={{ fontSize: 20, color: COLORS.cyan, textAlign: "center", fontWeight: 700 }}>{ex.stride}</div>
                <div style={{ fontSize: 20, color: COLORS.accent, textAlign: "center", fontWeight: 700 }}>{ex.output}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

// Scene 6: Padding
const ScenePadding: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene6_padding.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>📦 패딩 (Padding)</h1>
      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(239,68,68,0.15)", borderRadius: 20, padding: 35, marginBottom: 30, border: "2px solid rgba(239,68,68,0.4)" }}>
            <h2 style={{ fontSize: 28, color: COLORS.danger, marginBottom: 20 }}>⚠️ 문제점</h2>
            <p style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              합성곱을 하면 크기가 줄어들어요<br/>5×5 → (3×3 커널) → <span style={{ color: COLORS.danger, fontWeight: 700 }}>3×3</span>
            </p>
          </div>
          <div style={{ background: "rgba(16,185,129,0.15)", borderRadius: 20, padding: 35, border: "2px solid rgba(16,185,129,0.4)" }}>
            <h2 style={{ fontSize: 28, color: COLORS.success, marginBottom: 20 }}>✅ 해결: 패딩</h2>
            <p style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              가장자리에 0을 추가해요!<br/>5×5 + 패딩1 → 7×7 → (3×3 커널) → <span style={{ color: COLORS.success, fontWeight: 700 }}>5×5</span>
            </p>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 24, color: COLORS.light, marginBottom: 25 }}>🎯 패딩 종류</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { name: "Valid (패딩 없음)", desc: "크기 감소", color: COLORS.danger },
              { name: "Same (동일 크기)", desc: "입력 = 출력 크기", color: COLORS.success },
              { name: "Zero Padding", desc: "0으로 채움 (가장 일반적)", color: COLORS.primary },
            ].map((p, i) => (
              <div key={i} style={{ background: COLORS.gray800, borderRadius: 15, padding: 25, borderLeft: `5px solid ${p.color}` }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: p.color, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 30, background: "rgba(245,158,11,0.2)", borderRadius: 15, padding: 25, border: `2px solid ${COLORS.accent}` }}>
            <h4 style={{ fontSize: 20, color: COLORS.accent, marginBottom: 10 }}>📐 완전한 공식</h4>
            <div style={{ fontSize: 20, color: COLORS.light, fontFamily: "monospace" }}>출력 = (입력 + 2×패딩 - 커널) / 스트라이드 + 1</div>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

// Scene 7: Feature Map
const SceneFeatureMap: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene7_feature_map.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>🗺️ 특성 맵 (Feature Map)</h1>
      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(236,72,153,0.2)", borderRadius: 20, padding: 35, marginBottom: 30, border: "2px solid rgba(236,72,153,0.4)" }}>
            <h2 style={{ fontSize: 28, color: COLORS.light, marginBottom: 20 }}>특성 맵이란?</h2>
            <p style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
              합성곱의 <span style={{ color: COLORS.accent, fontWeight: 700 }}>출력 결과</span>예요.<br/>원본 이미지에서 특정 특징이 어디에 있는지 보여주는 지도와 같아요.
            </p>
          </div>
          <div style={{ background: COLORS.gray800, borderRadius: 20, padding: 35 }}>
            <h3 style={{ fontSize: 24, color: COLORS.cyan, marginBottom: 20 }}>🔢 여러 커널 = 여러 채널</h3>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", marginBottom: 15 }}>32개의 커널 → <span style={{ color: COLORS.cyan, fontWeight: 700 }}>32개의 특성 맵</span></div>
            <div style={{ padding: 15, background: "#0f172a", borderRadius: 10, fontFamily: "monospace", fontSize: 20, color: COLORS.light }}>
              28×28×1 → (32개 커널) → <span style={{ color: COLORS.accent, fontWeight: 700 }}>26×26×32</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 24, color: COLORS.light, marginBottom: 25 }}>📊 층이 깊어질수록</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { layer: "초기 레이어", features: "선, 엣지, 점", example: "세로선, 가로선", color: COLORS.cyan },
              { layer: "중간 레이어", features: "텍스처, 패턴", example: "눈, 바퀴, 잎사귀", color: "#8b5cf6" },
              { layer: "깊은 레이어", features: "고수준 특징", example: "얼굴, 자동차, 동물", color: COLORS.primary },
            ].map((item, i) => (
              <div key={i} style={{ background: COLORS.gray800, borderRadius: 15, padding: 25, borderLeft: `5px solid ${item.color}` }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.layer}</div>
                <div style={{ fontSize: 18, color: COLORS.light, marginBottom: 5 }}>{item.features}</div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>예: {item.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

// Scene 8: Outro
const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-2/scene8_outro.mp3")} />
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, color: COLORS.light, marginBottom: 40 }}>📝 오늘 배운 내용</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 25, maxWidth: 1100, marginBottom: 30 }}>
        {[
          { emoji: "🔍", title: "합성곱", desc: "커널로 이미지를 훑으며 특징 추출" },
          { emoji: "🎛️", title: "커널", desc: "학습 가능한 가중치 (보통 3×3)" },
          { emoji: "👟", title: "스트라이드", desc: "커널 이동 칸 수 (1 또는 2)" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25, backdropFilter: "blur(10px)" }}>
            <div style={{ fontSize: 50, marginBottom: 10 }}>{item.emoji}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 25, justifyContent: "center", marginBottom: 40 }}>
        {[
          { emoji: "📦", title: "패딩", desc: "가장자리에 0 추가하여 크기 유지" },
          { emoji: "🗺️", title: "특성 맵", desc: "합성곱 출력, 특징의 위치 표시" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.2)", borderRadius: 15, padding: 25, width: 280, backdropFilter: "blur(10px)" }}>
            <div style={{ fontSize: 50, marginBottom: 10 }}>{item.emoji}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.light }}>{item.title}</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>{item.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 28, color: COLORS.light }}>
        다음 시간: <span style={{ fontWeight: 700 }}>풀링과 배치 정규화 🏊</span>
      </div>
      <div style={{ marginTop: 20, fontSize: 28, color: COLORS.light }}>오늘도 수고하셨습니다! 👏</div>
    </div>
  </AbsoluteFill>
);

// Main Composition
export const Lesson5_2Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.why_conv.start} durationInFrames={SCENE_TIMINGS.why_conv.duration}><SceneWhyConv /></Sequence>
    <Sequence from={SCENE_TIMINGS.how_conv.start} durationInFrames={SCENE_TIMINGS.how_conv.duration}><SceneHowConv /></Sequence>
    <Sequence from={SCENE_TIMINGS.kernel.start} durationInFrames={SCENE_TIMINGS.kernel.duration}><SceneKernel /></Sequence>
    <Sequence from={SCENE_TIMINGS.stride.start} durationInFrames={SCENE_TIMINGS.stride.duration}><SceneStride /></Sequence>
    <Sequence from={SCENE_TIMINGS.padding.start} durationInFrames={SCENE_TIMINGS.padding.duration}><ScenePadding /></Sequence>
    <Sequence from={SCENE_TIMINGS.feature_map.start} durationInFrames={SCENE_TIMINGS.feature_map.duration}><SceneFeatureMap /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
