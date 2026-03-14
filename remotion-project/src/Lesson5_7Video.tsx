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
export const LESSON_5_7_DURATION = 6387;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 383 },
  scene02_what_is_transfer: { start: 383, duration: 652 },
  scene03_benefits: { start: 1035, duration: 681 },
  scene04_two_approaches: { start: 1716, duration: 717 },
  scene05_pretrained_model: { start: 2433, duration: 633 },
  scene06_feature_extraction: { start: 3066, duration: 611 },
  scene07_fine_tuning: { start: 3677, duration: 665 },
  scene08_practice: { start: 4342, duration: 694 },
  scene09_comparison: { start: 5036, duration: 688 },
  scene10_outro: { start: 5724, duration: 663 },
};

// Teal/Cyan color theme for Transfer Learning
const COLORS = {
  background: "#0f172a",
  primary: "#14b8a6",
  secondary: "#0d9488",
  accent: "#0f766e",
  light: "#ffffff",
  muted: "rgba(255,255,255,0.7)",
  card: "rgba(20,184,166,0.15)",
  cardBorder: "rgba(20,184,166,0.4)",
  gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
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
      <Audio src={staticFile("audio/lesson-5-7/scene01_intro.mp3")} />
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
        <div style={{ fontSize: 80, marginBottom: 30 }}>🔄</div>
        <div
          style={{
            fontSize: 90,
            fontWeight: 800,
            color: COLORS.light,
            marginBottom: 20,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          전이 학습
        </div>
        <div
          style={{
            fontSize: 40,
            color: "rgba(255,255,255,0.9)",
            fontFamily: "Pretendard, sans-serif",
            marginBottom: 30,
          }}
        >
          Transfer Learning
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "Pretendard, sans-serif",
            marginBottom: 40,
          }}
        >
          사전 훈련된 모델로 빠르게 학습하기
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
          Level 5-7
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: 전이 학습이란?
const Scene02WhatIsTransfer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene02_what_is_transfer.mp3")} />
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
          전이 학습이란?
        </div>

        {/* Giant's shoulder metaphor */}
        <div
          style={{
            background: COLORS.card,
            borderRadius: 25,
            padding: 40,
            maxWidth: 900,
            marginBottom: 40,
            border: `2px solid ${COLORS.cardBorder}`,
          }}
        >
          <div style={{ fontSize: 50, marginBottom: 20, textAlign: "center" }}>
            🧍‍♂️ ➡️ 🦸
          </div>
          <div
            style={{
              fontSize: 32,
              color: COLORS.light,
              textAlign: "center",
              fontFamily: "Pretendard, sans-serif",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: COLORS.primary, fontWeight: 700 }}>
              "거인의 어깨 위에 서라"
            </span>
          </div>
        </div>

        {/* Key points */}
        <div style={{ display: "flex", gap: 30 }}>
          {[
            { emoji: "📚", text: "이미 학습된 지식을" },
            { emoji: "🔄", text: "새로운 문제에" },
            { emoji: "✨", text: "재활용해요!" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 20,
                padding: "25px 35px",
                textAlign: "center",
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 45, marginBottom: 15 }}>{item.emoji}</div>
              <div
                style={{
                  fontSize: 24,
                  color: COLORS.light,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            color: COLORS.muted,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          ImageNet 학습 모델 → 새 문제 해결
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: 전이 학습의 장점
const Scene03Benefits: React.FC = () => {
  const benefits = [
    { icon: "📊", title: "적은 데이터", desc: "수백~수천 장으로도 충분해요" },
    { icon: "⚡", title: "빠른 학습", desc: "처음부터 학습보다 훨씬 빨라요" },
    { icon: "🎯", title: "높은 성능", desc: "작은 데이터셋에서도 좋은 결과" },
    { icon: "💻", title: "컴퓨팅 절약", desc: "GPU 시간을 대폭 줄여요" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene03_benefits.mp3")} />
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
          전이 학습의 장점
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 30,
          }}
        >
          {benefits.map((benefit, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 20,
                padding: "30px 40px",
                display: "flex",
                alignItems: "center",
                gap: 25,
                minWidth: 400,
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 55 }}>{benefit.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.light,
                    marginBottom: 8,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {benefit.title}
                </div>
                <div
                  style={{
                    fontSize: 22,
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

        <div
          style={{
            marginTop: 50,
            background: `${COLORS.primary}20`,
            padding: "20px 40px",
            borderRadius: 15,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: COLORS.light,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            💡 CNN이 이미 배운 특성들을 그대로 활용해요!
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: 두 가지 접근 방식
const Scene04TwoApproaches: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene04_two_approaches.mp3")} />
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
          두 가지 접근 방식
        </div>

        <div style={{ display: "flex", gap: 50 }}>
          {/* Feature Extraction */}
          <div
            style={{
              background: COLORS.card,
              border: `3px solid ${COLORS.primary}`,
              borderRadius: 25,
              padding: 40,
              minWidth: 380,
            }}
          >
            <div style={{ fontSize: 50, marginBottom: 15, textAlign: "center" }}>
              ❄️
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.light,
                marginBottom: 10,
                fontFamily: "Pretendard, sans-serif",
                textAlign: "center",
              }}
            >
              특성 추출
            </div>
            <div
              style={{
                fontSize: 20,
                color: COLORS.primary,
                marginBottom: 25,
                fontFamily: "Pretendard, sans-serif",
                textAlign: "center",
              }}
            >
              Feature Extraction
            </div>
            <div
              style={{
                background: "rgba(100,100,100,0.3)",
                padding: "12px 20px",
                borderRadius: 10,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 20, color: COLORS.muted, fontFamily: "Pretendard, sans-serif" }}>
                Conv 레이어들 → <span style={{ color: "#60a5fa" }}>동결 🔒</span>
              </span>
            </div>
            <div
              style={{
                background: `${COLORS.primary}30`,
                padding: "12px 20px",
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 20, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
                FC 레이어만 → <span style={{ color: COLORS.primary }}>학습 🔥</span>
              </span>
            </div>
          </div>

          {/* Fine-tuning */}
          <div
            style={{
              background: COLORS.card,
              border: `3px solid ${COLORS.primary}`,
              borderRadius: 25,
              padding: 40,
              minWidth: 380,
            }}
          >
            <div style={{ fontSize: 50, marginBottom: 15, textAlign: "center" }}>
              🔥
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.light,
                marginBottom: 10,
                fontFamily: "Pretendard, sans-serif",
                textAlign: "center",
              }}
            >
              미세 조정
            </div>
            <div
              style={{
                fontSize: 20,
                color: COLORS.primary,
                marginBottom: 25,
                fontFamily: "Pretendard, sans-serif",
                textAlign: "center",
              }}
            >
              Fine-tuning
            </div>
            <div
              style={{
                background: "rgba(100,100,100,0.3)",
                padding: "12px 20px",
                borderRadius: 10,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 20, color: COLORS.muted, fontFamily: "Pretendard, sans-serif" }}>
                초기 Conv → <span style={{ color: "#60a5fa" }}>동결 🔒</span>
              </span>
            </div>
            <div
              style={{
                background: "rgba(251,191,36,0.3)",
                padding: "12px 20px",
                borderRadius: 10,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 20, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
                후기 Conv → <span style={{ color: "#fbbf24" }}>해동 학습</span>
              </span>
            </div>
            <div
              style={{
                background: `${COLORS.primary}30`,
                padding: "12px 20px",
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 20, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
                FC 레이어 → <span style={{ color: COLORS.primary }}>학습 🔥</span>
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            color: COLORS.muted,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          데이터 양과 상황에 따라 선택해요
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: 사전 훈련 모델 불러오기
const Scene05PretrainedModel: React.FC = () => {
  const codeLines = [
    "import torchvision.models as models",
    "",
    "# ImageNet으로 훈련된 ResNet18 불러오기",
    "model = models.resnet18(",
    "    weights='IMAGENET1K_V1'  # 사전 훈련 가중치",
    ")",
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene05_pretrained_model.mp3")} />
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
          사전 훈련 모델 불러오기
        </div>

        {/* Model info */}
        <div style={{ display: "flex", gap: 30, marginBottom: 40 }}>
          {[
            { name: "ResNet18", params: "11M", desc: "가벼움" },
            { name: "ResNet50", params: "25M", desc: "균형" },
            { name: "VGG16", params: "138M", desc: "무거움" },
          ].map((model, i) => (
            <div
              key={i}
              style={{
                background: i === 0 ? `${COLORS.primary}25` : COLORS.card,
                border: i === 0 ? `2px solid ${COLORS.primary}` : `2px solid ${COLORS.cardBorder}`,
                borderRadius: 15,
                padding: "20px 35px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: COLORS.light,
                  marginBottom: 8,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {model.name}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.primary,
                  marginBottom: 5,
                  fontFamily: "monospace",
                }}
              >
                {model.params}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: COLORS.muted,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {model.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Code block */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: 15,
            padding: 35,
            minWidth: 700,
          }}
        >
          {codeLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: 22,
                fontFamily: "monospace",
                color: line.startsWith("#") ? "#6b7280" : line.includes("weights") ? COLORS.primary : COLORS.light,
                marginBottom: 8,
              }}
            >
              {line || "\u00A0"}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 22,
            color: COLORS.muted,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          💡 torchvision에서 쉽게 불러올 수 있어요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: 특성 추출 구현
const Scene06FeatureExtraction: React.FC = () => {
  const steps = [
    { step: 1, code: "for param in model.parameters():", desc: "모든 파라미터" },
    { step: 2, code: "    param.requires_grad = False", desc: "학습 비활성화" },
    { step: 3, code: "model.fc = nn.Linear(512, 10)", desc: "새 분류기 교체" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene06_feature_extraction.mp3")} />
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
            display: "flex",
            alignItems: "center",
            gap: 15,
            marginBottom: 50,
          }}
        >
          <span style={{ fontSize: 50 }}>❄️</span>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: COLORS.primary,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            특성 추출 구현
          </div>
        </div>

        {/* Visual diagram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: "rgba(100,100,100,0.4)",
              padding: "15px 25px",
              borderRadius: 10,
              fontSize: 22,
              color: COLORS.muted,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            Conv 층들 🔒
          </div>
          <div style={{ fontSize: 30, color: COLORS.primary }}>→</div>
          <div
            style={{
              background: `${COLORS.primary}40`,
              padding: "15px 25px",
              borderRadius: 10,
              fontSize: 22,
              color: COLORS.light,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            새 FC 층 🔥
          </div>
        </div>

        {/* Code steps */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: 20,
            padding: 40,
            minWidth: 700,
          }}
        >
          {steps.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: i < steps.length - 1 ? 20 : 0,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: COLORS.gradient,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 20,
                  fontWeight: 700,
                  color: COLORS.light,
                  flexShrink: 0,
                }}
              >
                {item.step}
              </div>
              <code
                style={{
                  fontSize: 22,
                  color: COLORS.light,
                  fontFamily: "monospace",
                  flex: 1,
                }}
              >
                {item.code}
              </code>
              <span
                style={{
                  fontSize: 18,
                  color: COLORS.muted,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 35,
            fontSize: 24,
            color: COLORS.muted,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          FC만 학습하니까 빠르고 안정적이에요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: 미세 조정 구현
const Scene07FineTuning: React.FC = () => {
  const layers = [
    { name: "layer1, layer2, layer3", status: "동결", color: "rgba(100,100,100,0.4)" },
    { name: "layer4", status: "해동 (작은 lr)", color: "rgba(251,191,36,0.3)" },
    { name: "fc (새 분류기)", status: "학습", color: `${COLORS.primary}40` },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene07_fine_tuning.mp3")} />
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
            display: "flex",
            alignItems: "center",
            gap: 15,
            marginBottom: 50,
          }}
        >
          <span style={{ fontSize: 50 }}>🔥</span>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: COLORS.primary,
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            미세 조정 구현
          </div>
        </div>

        {/* Layer visualization */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15,
            marginBottom: 40,
          }}
        >
          {layers.map((layer, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  background: layer.color,
                  padding: "15px 30px",
                  borderRadius: 12,
                  minWidth: 350,
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    color: COLORS.light,
                    fontFamily: "monospace",
                  }}
                >
                  {layer.name}
                </span>
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: i === 0 ? COLORS.muted : i === 1 ? "#fbbf24" : COLORS.primary,
                  fontWeight: 600,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {layer.status}
              </div>
            </div>
          ))}
        </div>

        {/* Key code */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: 15,
            padding: 30,
          }}
        >
          <code
            style={{
              fontSize: 22,
              color: COLORS.light,
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
          >
            <span style={{ color: "#6b7280" }}># layer4 해동</span>
            {"\n"}for param in model.layer4.parameters():
            {"\n"}{"    "}param.requires_grad = <span style={{ color: COLORS.primary }}>True</span>
          </code>
        </div>

        <div
          style={{
            marginTop: 35,
            background: "rgba(251,191,36,0.2)",
            padding: "15px 30px",
            borderRadius: 12,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: "#fbbf24",
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            ⚠️ 해동 층은 작은 학습률 (lr/10) 사용!
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: 실전 예제 (CIFAR-10)
const Scene08Practice: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene08_practice.mp3")} />
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
          실전 예제: CIFAR-10
        </div>

        {/* Data info */}
        <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
          <div
            style={{
              background: COLORS.card,
              borderRadius: 20,
              padding: "25px 40px",
              textAlign: "center",
              border: `2px solid ${COLORS.cardBorder}`,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.primary,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              5,000장
            </div>
            <div
              style={{
                fontSize: 20,
                color: COLORS.muted,
                fontFamily: "Pretendard, sans-serif",
                marginTop: 8,
              }}
            >
              전체의 10%만 사용
            </div>
          </div>
          <div
            style={{
              background: COLORS.card,
              borderRadius: 20,
              padding: "25px 40px",
              textAlign: "center",
              border: `2px solid ${COLORS.cardBorder}`,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.primary,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              224×224
            </div>
            <div
              style={{
                fontSize: 20,
                color: COLORS.muted,
                fontFamily: "Pretendard, sans-serif",
                marginTop: 8,
              }}
            >
              Resize (32→224)
            </div>
          </div>
        </div>

        {/* Transform code */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: 15,
            padding: 30,
            marginBottom: 30,
          }}
        >
          <code
            style={{
              fontSize: 20,
              color: COLORS.light,
              fontFamily: "monospace",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
            }}
          >
            <span style={{ color: "#6b7280" }}># ImageNet 정규화 사용</span>
            {"\n"}transforms.Normalize(
            {"\n"}{"    "}mean=[<span style={{ color: COLORS.primary }}>0.485, 0.456, 0.406</span>],
            {"\n"}{"    "}std=[<span style={{ color: COLORS.primary }}>0.229, 0.224, 0.225</span>]
            {"\n"})
          </code>
        </div>

        {/* Result */}
        <div
          style={{
            background: `${COLORS.primary}25`,
            border: `2px solid ${COLORS.primary}`,
            borderRadius: 20,
            padding: "25px 50px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span style={{ fontSize: 45 }}>🎯</span>
          <div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.light,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              5 에폭 → 80% 이상 정확도!
            </div>
            <div
              style={{
                fontSize: 20,
                color: COLORS.muted,
                fontFamily: "Pretendard, sans-serif",
                marginTop: 5,
              }}
            >
              10% 데이터로 이 정도면 대단하죠?
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 9: 특성 추출 vs 미세 조정 비교
const Scene09Comparison: React.FC = () => {
  const comparison = [
    { aspect: "학습 대상", fe: "FC만", ft: "FC + 일부 Conv" },
    { aspect: "학습 속도", fe: "빠름 ⚡", ft: "느림" },
    { aspect: "필요 데이터", fe: "적음", ft: "더 많음" },
    { aspect: "성능", fe: "좋음", ft: "더 좋을 수 있음" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene09_comparison.mp3")} />
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
          어떤 방법을 선택할까?
        </div>

        {/* Comparison table */}
        <div
          style={{
            background: COLORS.card,
            borderRadius: 20,
            padding: 40,
            border: `2px solid ${COLORS.primary}`,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "150px 200px 200px",
              gap: 25,
              marginBottom: 25,
            }}
          >
            <div />
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.primary,
                textAlign: "center",
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              ❄️ 특성 추출
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.primary,
                textAlign: "center",
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              🔥 미세 조정
            </div>
          </div>

          {/* Rows */}
          {comparison.map((row, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "150px 200px 200px",
                gap: 25,
                marginBottom: i < comparison.length - 1 ? 20 : 0,
                padding: "15px 0",
                borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.muted,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {row.aspect}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.light,
                  textAlign: "center",
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {row.fe}
              </div>
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.light,
                  textAlign: "center",
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {row.ft}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            color: COLORS.muted,
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          💡 특성 추출부터 시작하고,
          <br />
          성능이 부족하면 미세 조정을 시도해요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: Outro
const Scene10Outro: React.FC = () => {
  const keyPoints = [
    "전이 학습 = 사전 훈련 지식 재활용",
    "특성 추출: Conv 동결, FC만 학습",
    "미세 조정: 일부 층 해동 (작은 lr)",
    "레이어별 학습률 설정 가능",
    "적은 데이터로 높은 성능 달성!",
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.gradient }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-7/scene10_outro.mp3")} />
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
            gap: 18,
            marginBottom: 50,
          }}
        >
          {keyPoints.map((point, i) => (
            <div
              key={i}
              style={{
                background: "rgba(0,0,0,0.25)",
                padding: "18px 40px",
                borderRadius: 50,
                fontSize: 26,
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
            fontSize: 28,
            color: "rgba(255,255,255,0.9)",
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
          }}
        >
          다음 시간: 데이터 증강 📸
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.light,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          오늘도 수고하셨습니다! 👏
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson5_7Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Scene sequences with embedded audio */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_what_is_transfer.start} durationInFrames={SCENE_TIMINGS.scene02_what_is_transfer.duration}>
        <Scene02WhatIsTransfer />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_benefits.start} durationInFrames={SCENE_TIMINGS.scene03_benefits.duration}>
        <Scene03Benefits />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_two_approaches.start} durationInFrames={SCENE_TIMINGS.scene04_two_approaches.duration}>
        <Scene04TwoApproaches />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_pretrained_model.start} durationInFrames={SCENE_TIMINGS.scene05_pretrained_model.duration}>
        <Scene05PretrainedModel />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_feature_extraction.start} durationInFrames={SCENE_TIMINGS.scene06_feature_extraction.duration}>
        <Scene06FeatureExtraction />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_fine_tuning.start} durationInFrames={SCENE_TIMINGS.scene07_fine_tuning.duration}>
        <Scene07FineTuning />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_practice.start} durationInFrames={SCENE_TIMINGS.scene08_practice.duration}>
        <Scene08Practice />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_comparison.start} durationInFrames={SCENE_TIMINGS.scene09_comparison.duration}>
        <Scene09Comparison />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_outro.start} durationInFrames={SCENE_TIMINGS.scene10_outro.duration}>
        <Scene10Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
