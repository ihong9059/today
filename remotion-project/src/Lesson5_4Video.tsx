import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_4_DURATION = 9191;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 452 },
  lenet: { start: 452, duration: 1119 },
  alexnet_intro: { start: 1571, duration: 897 },
  alexnet_innovations: { start: 2468, duration: 1036 },
  vgg_intro: { start: 3504, duration: 724 },
  vgg_filter: { start: 4228, duration: 912 },
  vgg_variants: { start: 5140, duration: 843 },
  comparison: { start: 5983, duration: 1192 },
  modern_principles: { start: 7175, duration: 1127 },
  outro: { start: 8302, duration: 889 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#f59e0b",
  secondary: "#d97706",
  accent: "#10b981",
  success: "#10b981",
  danger: "#ef4444",
  cyan: "#06b6d4",
  purple: "#8b5cf6",
  blue: "#3b82f6",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
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
      <Audio src={staticFile("audio/lesson-5-4/scene1_intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🏛️</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>CNN 아키텍처의 역사</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>더 깊게, 더 효율적으로의 여정</div>
        <div style={{ marginTop: 40, display: "flex", gap: 20, justifyContent: "center" }}>
          {["LeNet", "AlexNet", "VGG"].map((model) => (
            <div key={model} style={{ padding: "15px 35px", background: "rgba(0,0,0,0.35)", borderRadius: 40, border: "3px solid rgba(255,255,255,0.4)", fontSize: 28, color: COLORS.light, fontWeight: 700 }}>
              {model}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 30, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 5-4
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneLeNet: React.FC = () => {
  const layers = [
    { name: "입력", size: "32×32×1", color: "#64748b" },
    { name: "Conv1", size: "28×28×6", color: COLORS.cyan },
    { name: "Pool", size: "14×14×6", color: COLORS.purple },
    { name: "Conv2", size: "10×10×16", color: COLORS.cyan },
    { name: "Pool", size: "5×5×16", color: COLORS.purple },
    { name: "FC", size: "120", color: COLORS.primary },
    { name: "FC", size: "84", color: COLORS.primary },
    { name: "출력", size: "10", color: COLORS.success },
  ];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-4/scene2_lenet.mp3")} />
      <div style={{ padding: 60, paddingTop: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <span style={{ fontSize: 70 }}>🧒</span>
          <div>
            <h2 style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, margin: 0 }}>LeNet-5 (1998)</h2>
            <p style={{ fontSize: 26, color: "rgba(255,255,255,0.8)", margin: 0 }}>CNN의 원조 할아버지 - 얀 르쿤 박사</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, marginBottom: 40 }}>
          {layers.map((layer, i) => {
            const height = 100 + (8 - i) * 15;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 70, height, background: `linear-gradient(180deg, ${layer.color} 0%, ${layer.color}80 100%)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: COLORS.light, fontWeight: 700, writingMode: "vertical-rl", textOrientation: "mixed" }}>{layer.name}</span>
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{layer.size}</span>
              </div>
            );
          })}
        </div>
        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: 30 }}>
          <h3 style={{ fontSize: 28, color: COLORS.primary, marginBottom: 20 }}>핵심 기여</h3>
          <div style={{ display: "flex", gap: 40 }}>
            {[
              { title: "합성곱 + 풀링", desc: "특징 추출 패턴 확립" },
              { title: "가중치 공유", desc: "파라미터 수 감소" },
              { title: "계층적 특징", desc: "저수준→고수준" },
            ].map((item, i) => (
              <div key={i} style={{ flex: 1 }}>
                <h4 style={{ fontSize: 22, color: COLORS.cyan, marginBottom: 10 }}>{item.title}</h4>
                <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneAlexNetIntro: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene3_alexnet_intro.mp3")} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 60 }}>
      <div style={{ fontSize: 100, marginBottom: 30 }}>🚀</div>
      <h2 style={{ fontSize: 70, fontWeight: 800, color: COLORS.light, textAlign: "center", marginBottom: 20 }}>AlexNet (2012)</h2>
      <p style={{ fontSize: 36, color: "rgba(255,255,255,0.8)", textAlign: "center", marginBottom: 50 }}>딥러닝 르네상스의 시작!</p>
      <div style={{ display: "flex", gap: 60, marginBottom: 40 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 150, height: 150, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.danger} 0%, #dc2626 100%)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 36, color: COLORS.light, fontWeight: 700 }}>25%</span>
          </div>
          <span style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>기존 방법</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 60, color: COLORS.light }}>→</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 150, height: 150, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.success} 0%, #059669 100%)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 15 }}>
            <span style={{ fontSize: 36, color: COLORS.light, fontWeight: 700 }}>15.3%</span>
          </div>
          <span style={{ fontSize: 24, color: "rgba(255,255,255,0.8)" }}>AlexNet</span>
        </div>
      </div>
      <div style={{ padding: "20px 50px", background: "rgba(0,0,0,0.3)", borderRadius: 20 }}>
        <span style={{ fontSize: 26, color: COLORS.light }}>ImageNet 에러율 10%p 감소! → AI 시대의 시작</span>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneAlexNetInnovations: React.FC = () => {
  const innovations = [
    { icon: "⚡", title: "ReLU 활성화", desc: "학습 속도 6배 향상", color: COLORS.primary },
    { icon: "🎲", title: "Dropout", desc: "과적합 효과적 방지", color: COLORS.purple },
    { icon: "🎮", title: "GPU 학습", desc: "2개 GPU 병렬 처리", color: COLORS.cyan },
    { icon: "🔄", title: "데이터 증강", desc: "회전, 반전, 자르기", color: COLORS.success },
    { icon: "📊", title: "LRN", desc: "정규화 기법 (→BN)", color: COLORS.blue },
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-4/scene4_alexnet_innovations.mp3")} />
      <div style={{ padding: 60, paddingTop: 100 }}>
        <h2 style={{ fontSize: 52, fontWeight: 800, color: COLORS.light, marginBottom: 50 }}>AlexNet의 5가지 혁신 💡</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
          {innovations.map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 25, border: `2px solid ${item.color}60` }}>
              <div style={{ width: 70, height: 70, borderRadius: 15, background: `${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 40 }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 22, color: item.color, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 50, padding: 30, background: "rgba(139,92,246,0.2)", borderRadius: 15, borderLeft: `4px solid ${COLORS.purple}` }}>
          <span style={{ fontSize: 26, color: COLORS.light }}>이 5가지 혁신이 AlexNet의 성공 비결입니다!</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneVGGIntro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene5_vgg_intro.mp3")} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 60 }}>
      <div style={{ fontSize: 100, marginBottom: 30 }}>🎯</div>
      <h2 style={{ fontSize: 70, fontWeight: 800, color: COLORS.light, textAlign: "center", marginBottom: 20 }}>VGGNet (2014)</h2>
      <p style={{ fontSize: 36, color: "rgba(255,255,255,0.8)", textAlign: "center", marginBottom: 50 }}>단순함의 미학 - 옥스포드 대학</p>
      <div style={{ padding: "30px 60px", background: "rgba(0,0,0,0.3)", borderRadius: 20, border: `3px solid rgba(255,255,255,0.3)` }}>
        <h3 style={{ fontSize: 40, color: COLORS.light, textAlign: "center", marginBottom: 15 }}>핵심 아이디어</h3>
        <p style={{ fontSize: 32, color: COLORS.light, textAlign: "center" }}>3×3 필터만 사용하자!</p>
        <p style={{ fontSize: 26, color: "rgba(255,255,255,0.8)", textAlign: "center", marginTop: 10 }}>그리고 네트워크를 깊게 쌓자!</p>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneVGGFilter: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-4/scene6_vgg_filter.mp3")} />
    <div style={{ padding: 60, paddingTop: 100 }}>
      <h2 style={{ fontSize: 48, fontWeight: 800, color: COLORS.light, marginBottom: 40 }}>3×3 필터 전략의 비밀 🔍</h2>
      <div style={{ display: "flex", gap: 50, justifyContent: "center", marginBottom: 50 }}>
        <div style={{ background: "rgba(239,68,68,0.2)", borderRadius: 20, padding: 30, width: 350, border: `2px solid ${COLORS.danger}60` }}>
          <h3 style={{ fontSize: 28, color: COLORS.danger, marginBottom: 20 }}>7×7 필터 1개</h3>
          <div style={{ width: 140, height: 140, background: COLORS.danger, borderRadius: 10, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24, color: COLORS.light, fontWeight: 700 }}>7×7</span>
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>
            <p>수용 영역: 7×7</p>
            <p>파라미터: 49C²</p>
            <p>ReLU: 1개</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 60, color: COLORS.light }}>VS</div>
        <div style={{ background: "rgba(16,185,129,0.2)", borderRadius: 20, padding: 30, width: 350, border: `2px solid ${COLORS.success}60` }}>
          <h3 style={{ fontSize: 28, color: COLORS.success, marginBottom: 20 }}>3×3 필터 3개</h3>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{ width: 60, height: 60, background: COLORS.success, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 18, color: COLORS.light, fontWeight: 700 }}>3×3</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)" }}>
            <p>수용 영역: 7×7 (동일!)</p>
            <p style={{ color: COLORS.success }}>파라미터: 27C² (45%↓)</p>
            <p style={{ color: COLORS.success }}>ReLU: 3개 (3배↑)</p>
          </div>
        </div>
      </div>
      <div style={{ padding: 30, background: "rgba(16,185,129,0.2)", borderRadius: 15, borderLeft: `4px solid ${COLORS.success}` }}>
        <span style={{ fontSize: 26, color: COLORS.light }}>💡 같은 범위를 보면서 파라미터는 적고, 표현력은 더 좋아요!</span>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneVGGVariants: React.FC = () => {
  const variants = [
    { name: "VGG-11", layers: 8, params: "1.3억", height: 120 },
    { name: "VGG-16", layers: 13, params: "1.38억", height: 180, highlight: true },
    { name: "VGG-19", layers: 16, params: "1.44억", height: 220 },
  ];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-4/scene7_vgg_variants.mp3")} />
      <div style={{ padding: 60, paddingTop: 100 }}>
        <h2 style={{ fontSize: 52, fontWeight: 800, color: COLORS.light, marginBottom: 50 }}>VGG 버전들 📊</h2>
        <div style={{ display: "flex", gap: 60, justifyContent: "center", alignItems: "flex-end" }}>
          {variants.map((v) => (
            <div key={v.name} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 200, height: v.height, background: v.highlight ? `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)` : `linear-gradient(180deg, ${COLORS.blue} 0%, ${COLORS.cyan} 100%)`, borderRadius: 15, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: v.highlight ? `0 0 30px ${COLORS.primary}60` : "none" }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.light }}>{v.name}</span>
                {v.highlight && <span style={{ fontSize: 14, color: COLORS.light, marginTop: 5, padding: "4px 12px", background: "rgba(0,0,0,0.3)", borderRadius: 10 }}>가장 인기!</span>}
              </div>
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <p style={{ fontSize: 20, color: COLORS.light, margin: 0 }}>Conv: {v.layers}개</p>
                <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", margin: "5px 0 0" }}>파라미터: {v.params}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 60, padding: 30, background: "rgba(0,0,0,0.3)", borderRadius: 15, textAlign: "center" }}>
          <span style={{ fontSize: 26, color: COLORS.light }}>기본 구조는 모두 같아요: 3×3 합성곱 + Max Pooling의 반복!</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneComparison: React.FC = () => {
  const models = [
    { name: "LeNet", year: "1998", depth: "5층", params: "6만", contrib: "기본 구조 확립", color: COLORS.cyan },
    { name: "AlexNet", year: "2012", depth: "8층", params: "6천만", contrib: "ReLU, Dropout, GPU", color: COLORS.purple },
    { name: "VGG", year: "2014", depth: "19층", params: "1.4억", contrib: "3×3 필터, 깊이", color: COLORS.primary },
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-4/scene8_comparison.mp3")} />
      <div style={{ padding: 60, paddingTop: 100 }}>
        <h2 style={{ fontSize: 52, fontWeight: 800, color: COLORS.light, marginBottom: 50 }}>아키텍처 비교 📈</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
          {models.map((m) => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 25, border: `2px solid ${m.color}60` }}>
              <div style={{ width: 100, height: 100, borderRadius: 15, background: `linear-gradient(135deg, ${m.color} 0%, ${m.color}80 100%)`, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 30 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: COLORS.light }}>{m.name}</span>
              </div>
              <div style={{ flex: 1, display: "flex", gap: 50 }}>
                <div><span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>년도</span><p style={{ fontSize: 24, color: COLORS.light, margin: 0 }}>{m.year}</p></div>
                <div><span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>깊이</span><p style={{ fontSize: 24, color: COLORS.light, margin: 0 }}>{m.depth}</p></div>
                <div><span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>파라미터</span><p style={{ fontSize: 24, color: COLORS.light, margin: 0 }}>{m.params}</p></div>
                <div style={{ flex: 1 }}><span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>핵심 기여</span><p style={{ fontSize: 24, color: m.color, margin: 0 }}>{m.contrib}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 25, background: "rgba(245,158,11,0.2)", borderRadius: 15, borderLeft: `4px solid ${COLORS.primary}` }}>
          <span style={{ fontSize: 24, color: COLORS.light }}>📈 시간이 지나며 더 깊고 효율적인 방향으로 발전했습니다!</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneModernPrinciples: React.FC = () => {
  const principles = [
    { icon: "🔲", title: "작은 필터", desc: "3×3이 표준, 1×1도 사용" },
    { icon: "📊", title: "배치 노말라이제이션", desc: "모든 Conv 뒤에 적용" },
    { icon: "⚡", title: "ReLU 활성화", desc: "또는 LeakyReLU, GELU" },
    { icon: "📐", title: "깊이 > 너비", desc: "더 깊은 네트워크 선호" },
    { icon: "🔗", title: "스킵 연결", desc: "매우 깊은 경우 필수" },
    { icon: "🌐", title: "Global Avg Pooling", desc: "FC 레이어 대신 사용" },
  ];
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)", fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-4/scene9_modern_principles.mp3")} />
      <div style={{ padding: 60, paddingTop: 100 }}>
        <h2 style={{ fontSize: 52, fontWeight: 800, color: COLORS.light, marginBottom: 50 }}>현대 CNN 설계 원칙 🏗️</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 25 }}>
          {principles.map((p, i) => (
            <div key={i} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: 25 }}>
              <div style={{ width: 60, height: 60, borderRadius: 15, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 15, fontSize: 32 }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: 24, color: COLORS.light, marginBottom: 10 }}>{p.title}</h3>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneOutro: React.FC = () => {
  const summaryItems = [
    { num: "1", text: "LeNet: CNN의 시조 (1998)" },
    { num: "2", text: "AlexNet: 딥러닝 르네상스 (2012)" },
    { num: "3", text: "VGG: 3×3 필터의 힘 (2014)" },
    { num: "4", text: "더 깊게, 더 효율적으로 발전" },
    { num: "5", text: "현대 CNN 설계 원칙 확립" },
  ];
  return (
    <AbsoluteFill style={{ background: COLORS.gradient, fontFamily: "Pretendard, sans-serif" }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-4/scene10_outro.mp3")} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 60 }}>
        <h2 style={{ fontSize: 56, fontWeight: 800, color: COLORS.light, marginBottom: 50 }}>오늘 배운 내용 정리 ✨</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 50 }}>
          {summaryItems.map((item) => (
            <div key={item.num} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.light, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 26, fontWeight: 700, color: COLORS.primary }}>{item.num}</span>
              </div>
              <span style={{ fontSize: 28, color: COLORS.light }}>{item.text}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "25px 60px", background: "rgba(0,0,0,0.4)", borderRadius: 20, border: `3px solid rgba(255,255,255,0.3)` }}>
          <span style={{ fontSize: 30, color: COLORS.light }}>다음 시간: PyTorch로 CNN 구현! 🔥</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson5_4Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.lenet.start} durationInFrames={SCENE_TIMINGS.lenet.duration}><SceneLeNet /></Sequence>
    <Sequence from={SCENE_TIMINGS.alexnet_intro.start} durationInFrames={SCENE_TIMINGS.alexnet_intro.duration}><SceneAlexNetIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.alexnet_innovations.start} durationInFrames={SCENE_TIMINGS.alexnet_innovations.duration}><SceneAlexNetInnovations /></Sequence>
    <Sequence from={SCENE_TIMINGS.vgg_intro.start} durationInFrames={SCENE_TIMINGS.vgg_intro.duration}><SceneVGGIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.vgg_filter.start} durationInFrames={SCENE_TIMINGS.vgg_filter.duration}><SceneVGGFilter /></Sequence>
    <Sequence from={SCENE_TIMINGS.vgg_variants.start} durationInFrames={SCENE_TIMINGS.vgg_variants.duration}><SceneVGGVariants /></Sequence>
    <Sequence from={SCENE_TIMINGS.comparison.start} durationInFrames={SCENE_TIMINGS.comparison.duration}><SceneComparison /></Sequence>
    <Sequence from={SCENE_TIMINGS.modern_principles.start} durationInFrames={SCENE_TIMINGS.modern_principles.duration}><SceneModernPrinciples /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);

export default Lesson5_4Video;
