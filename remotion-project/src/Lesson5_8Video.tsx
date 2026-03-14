import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

// Duration from audio analysis (10 scenes)
export const LESSON_5_8_DURATION = 6031;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 406 },
  scene02_why_augmentation: { start: 406, duration: 537 },
  scene03_benefits: { start: 943, duration: 572 },
  scene04_geometric: { start: 1515, duration: 717 },
  scene05_color: { start: 2232, duration: 601 },
  scene06_compose: { start: 2833, duration: 593 },
  scene07_pipeline: { start: 3426, duration: 619 },
  scene08_tips: { start: 4045, duration: 632 },
  scene09_effect: { start: 4677, duration: 621 },
  scene10_outro: { start: 5298, duration: 733 },
};

// Orange/Amber color theme for Data Augmentation
const COLORS = {
  background: "#0f172a",
  primary: "#f59e0b",
  secondary: "#d97706",
  accent: "#b45309",
  light: "#ffffff",
  muted: "rgba(255,255,255,0.7)",
  card: "rgba(245,158,11,0.15)",
  cardBorder: "rgba(245,158,11,0.4)",
  gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
};

// Global Overlay - Top-left logo + Bottom-right URL
const GlobalOverlay: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: 30,
        left: 40,
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 100,
      }}
    >
      <Img
        src={staticFile("images/logo.png")}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />
      <span
        style={{
          color: COLORS.light,
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        UTTEC-Lab
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 40,
        color: "rgba(255,255,255,0.6)",
        fontSize: 20,
        zIndex: 100,
      }}
    >
      ai.uttec-lab.com
    </div>
  </>
);

// Scene 1: Intro
const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);

  return (
    <AbsoluteFill style={{ background: COLORS.gradient }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene01_intro.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          opacity,
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 30 }}>📸</div>
        <div
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: COLORS.light,
            marginBottom: 20,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          데이터 증강
        </div>
        <div
          style={{
            fontSize: 40,
            color: "rgba(255,255,255,0.9)",
            fontFamily: "Pretendard, sans-serif",
            marginBottom: 30,
          }}
        >
          Data Augmentation
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "Pretendard, sans-serif",
            marginBottom: 40,
          }}
        >
          적은 데이터를 많은 것처럼 만드는 기술
        </div>
        <div
          style={{
            padding: "18px 50px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: 50,
            fontSize: 28,
            color: COLORS.light,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          Level 5-8
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: 왜 필요한가?
const Scene02WhyAugmentation: React.FC = () => {
  const problems = [
    { icon: "📊", title: "데이터 부족", desc: "훈련 데이터가 적으면 암기해요" },
    { icon: "🎭", title: "다양성 부족", desc: "한정된 조건의 데이터만 있어요" },
    { icon: "💰", title: "라벨링 비용", desc: "데이터 수집에 비용이 많이 들어요" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene02_why_augmentation.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          왜 데이터 증강이 필요할까요?
        </div>

        <div style={{ display: "flex", gap: 30, marginBottom: 40 }}>
          {problems.map((item, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 20,
                padding: "30px 35px",
                textAlign: "center",
                minWidth: 280,
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 55, marginBottom: 15 }}>{item.icon}</div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: COLORS.light,
                  marginBottom: 10,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.muted,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: `${COLORS.primary}20`,
            padding: "20px 40px",
            borderRadius: 15,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: COLORS.light,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            💡 증강으로 가상의 데이터를 늘릴 수 있어요!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: 증강의 효과
const Scene03Benefits: React.FC = () => {
  const benefits = [
    { icon: "📈", title: "데이터 양 증가", desc: "원본 하나로 여러 변형 생성" },
    { icon: "🛡️", title: "과적합 방지", desc: "매번 다른 변형으로 암기 불가" },
    { icon: "🔄", title: "불변성 학습", desc: "회전, 이동, 색상에 강건" },
    { icon: "🌍", title: "일반화 향상", desc: "실제 환경에서도 잘 동작" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene03_benefits.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          데이터 증강의 효과
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 25,
          }}
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 20,
                padding: "25px 35px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                minWidth: 380,
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 50 }}>{benefit.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: COLORS.light,
                    marginBottom: 5,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {benefit.title}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: COLORS.muted,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {benefit.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: 기하학적 변환
const Scene04Geometric: React.FC = () => {
  const transforms = [
    { name: "RandomHorizontalFlip", desc: "좌우 반전", emoji: "↔️" },
    { name: "RandomVerticalFlip", desc: "상하 반전", emoji: "↕️" },
    { name: "RandomRotation", desc: "임의 회전", emoji: "🔄" },
    { name: "RandomCrop", desc: "일부 자르기", emoji: "✂️" },
    { name: "RandomResizedCrop", desc: "크기 변경 후 자르기", emoji: "📐" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene04_geometric.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          기하학적 변환
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {transforms.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: COLORS.card,
                borderRadius: 15,
                padding: "18px 30px",
                minWidth: 600,
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 40, width: 50 }}>{t.emoji}</div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: COLORS.primary,
                  fontFamily: "monospace",
                  flex: 1,
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.muted,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {t.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: 색상 변환
const Scene05Color: React.FC = () => {
  const colorTransforms = [
    { prop: "brightness", desc: "밝기 조절", color: "#fef08a" },
    { prop: "contrast", desc: "대비 조절", color: "#fde047" },
    { prop: "saturation", desc: "채도 조절", color: "#facc15" },
    { prop: "hue", desc: "색조 변경", color: "#f59e0b" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene05_color.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          색상 변환: ColorJitter
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 25,
            marginBottom: 40,
          }}
        >
          {colorTransforms.map((t, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 15,
                padding: "25px 35px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  background: t.color,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: COLORS.light,
                    fontFamily: "monospace",
                    marginBottom: 5,
                  }}
                >
                  {t.prop}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: COLORS.muted,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {t.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#1e293b",
            borderRadius: 15,
            padding: "20px 30px",
          }}
        >
          <code
            style={{
              fontSize: 22,
              color: COLORS.light,
              fontFamily: "monospace",
            }}
          >
            ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.1)
          </code>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 22,
            color: COLORS.muted,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          + RandomGrayscale: 확률적으로 흑백 변환
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Compose로 조합
const Scene06Compose: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene06_compose.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          transforms.Compose
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {/* Train transform */}
          <div
            style={{
              background: COLORS.card,
              border: `2px solid ${COLORS.primary}`,
              borderRadius: 20,
              padding: 30,
              minWidth: 350,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.primary,
                marginBottom: 20,
                fontFamily: "Pretendard, sans-serif",
                textAlign: "center",
              }}
            >
              🏋️ 훈련용
            </div>
            {["RandomHorizontalFlip", "RandomRotation", "RandomCrop", "ColorJitter", "ToTensor", "Normalize"].map((t, i) => (
              <div
                key={t}
                style={{
                  fontSize: 18,
                  color: COLORS.light,
                  fontFamily: "monospace",
                  padding: "8px 15px",
                  background: i < 4 ? `${COLORS.primary}30` : "rgba(100,100,100,0.3)",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Test transform */}
          <div
            style={{
              background: "rgba(100,100,100,0.1)",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: 20,
              padding: 30,
              minWidth: 350,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.muted,
                marginBottom: 20,
                fontFamily: "Pretendard, sans-serif",
                textAlign: "center",
              }}
            >
              📊 테스트용
            </div>
            {["ToTensor", "Normalize"].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: 18,
                  color: COLORS.light,
                  fontFamily: "monospace",
                  padding: "8px 15px",
                  background: "rgba(100,100,100,0.3)",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              >
                {t}
              </div>
            ))}
            <div
              style={{
                marginTop: 20,
                fontSize: 16,
                color: COLORS.muted,
                fontFamily: "Pretendard, sans-serif",
                textAlign: "center",
              }}
            >
              증강 없이 원본으로 평가
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: 실전 파이프라인
const Scene07Pipeline: React.FC = () => {
  const pipeline = [
    { name: "RandomHorizontalFlip", param: "p=0.5" },
    { name: "RandomRotation", param: "15" },
    { name: "RandomCrop", param: "32, padding=4" },
    { name: "ColorJitter", param: "0.2, 0.2, 0.2, 0.1" },
    { name: "ToTensor + Normalize", param: "CIFAR 기준" },
    { name: "RandomErasing", param: "p=0.2 (선택)" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene07_pipeline.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          CIFAR-10 실전 파이프라인
        </div>

        <div
          style={{
            background: "#1e293b",
            borderRadius: 20,
            padding: 35,
          }}
        >
          {pipeline.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                marginBottom: i < pipeline.length - 1 ? 15 : 0,
              }}
            >
              <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  background: COLORS.gradient,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.light,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.light,
                  fontFamily: "monospace",
                  minWidth: 280,
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: COLORS.primary,
                  fontFamily: "monospace",
                }}
              >
                ({p.param})
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: 팁
const Scene08Tips: React.FC = () => {
  const tips = [
    { icon: "🎯", tip: "도메인에 맞게 선택", desc: "숫자 6/9는 회전 X" },
    { icon: "⚖️", tip: "너무 강한 증강 피하기", desc: "원본 특성 유지" },
    { icon: "📊", tip: "테스트엔 증강 없이", desc: "공정한 평가" },
    { icon: "📈", tip: "점진적 강도 증가", desc: "효과 확인하며" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene08_tips.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          데이터 증강 팁
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 25,
          }}
        >
          {tips.map((t, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 20,
                padding: "25px 30px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 45 }}>{t.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.light,
                    marginBottom: 5,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {t.tip}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: COLORS.muted,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {t.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 9: 효과
const Scene09Effect: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene09_effect.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          증강 효과 비교
        </div>

        <div style={{ display: "flex", gap: 50, marginBottom: 40 }}>
          {/* Without augmentation */}
          <div
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "2px solid #ef4444",
              borderRadius: 20,
              padding: "30px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#ef4444",
                marginBottom: 20,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              ❌ 증강 없이
            </div>
            <div
              style={{
                fontSize: 22,
                color: COLORS.muted,
                fontFamily: "Pretendard, sans-serif",
                marginBottom: 10,
              }}
            >
              훈련 정확도: <span style={{ color: "#ef4444" }}>98%</span>
            </div>
            <div
              style={{
                fontSize: 22,
                color: COLORS.muted,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              테스트 정확도: <span style={{ color: "#ef4444" }}>75%</span>
            </div>
            <div
              style={{
                marginTop: 15,
                fontSize: 18,
                color: "#ef4444",
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              과적합!
            </div>
          </div>

          {/* With augmentation */}
          <div
            style={{
              background: "rgba(34,197,94,0.15)",
              border: "2px solid #22c55e",
              borderRadius: 20,
              padding: "30px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#22c55e",
                marginBottom: 20,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              ✅ 증강 적용
            </div>
            <div
              style={{
                fontSize: 22,
                color: COLORS.muted,
                fontFamily: "Pretendard, sans-serif",
                marginBottom: 10,
              }}
            >
              훈련 정확도: <span style={{ color: "#22c55e" }}>92%</span>
            </div>
            <div
              style={{
                fontSize: 22,
                color: COLORS.muted,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              테스트 정확도: <span style={{ color: "#22c55e" }}>88%</span>
            </div>
            <div
              style={{
                marginTop: 15,
                fontSize: 18,
                color: "#22c55e",
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              일반화 성공!
            </div>
          </div>
        </div>

        <div
          style={{
            background: `${COLORS.primary}20`,
            padding: "20px 40px",
            borderRadius: 15,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: COLORS.light,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            💡 증강만으로 5~10% 정확도 향상!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: Outro
const Scene10Outro: React.FC = () => {
  const keyPoints = [
    "데이터 증강 = 훈련 데이터 가상 확장",
    "기하학적: Flip, Rotation, Crop",
    "색상: ColorJitter (밝기, 대비, 채도)",
    "훈련에만 적용, 테스트는 원본으로",
    "과적합 방지 + 일반화 향상",
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.gradient }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-8/scene10_outro.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 60,
        }}
      >
        <div
          style={{
            fontSize: 55,
            fontWeight: 700,
            color: COLORS.light,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
          }}
        >
          핵심 정리
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {keyPoints.map((point, i) => (
            <div
              key={i}
              style={{
                background: "rgba(0,0,0,0.25)",
                padding: "16px 40px",
                borderRadius: 50,
                fontSize: 24,
                color: COLORS.light,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              ✓ {point}
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "rgba(255,255,255,0.95)",
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
          }}
        >
          Level 5 완료! 🎉
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 26,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          다음 Level에서 만나요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson5_8Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Scene sequences with embedded audio */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_why_augmentation.start} durationInFrames={SCENE_TIMINGS.scene02_why_augmentation.duration}>
        <Scene02WhyAugmentation />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_benefits.start} durationInFrames={SCENE_TIMINGS.scene03_benefits.duration}>
        <Scene03Benefits />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_geometric.start} durationInFrames={SCENE_TIMINGS.scene04_geometric.duration}>
        <Scene04Geometric />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_color.start} durationInFrames={SCENE_TIMINGS.scene05_color.duration}>
        <Scene05Color />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_compose.start} durationInFrames={SCENE_TIMINGS.scene06_compose.duration}>
        <Scene06Compose />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_pipeline.start} durationInFrames={SCENE_TIMINGS.scene07_pipeline.duration}>
        <Scene07Pipeline />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_tips.start} durationInFrames={SCENE_TIMINGS.scene08_tips.duration}>
        <Scene08Tips />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_effect.start} durationInFrames={SCENE_TIMINGS.scene09_effect.duration}>
        <Scene09Effect />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_outro.start} durationInFrames={SCENE_TIMINGS.scene10_outro.duration}>
        <Scene10Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
