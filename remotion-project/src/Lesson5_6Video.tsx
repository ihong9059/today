import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

// Duration from audio analysis (11 scenes: scene01 ~ scene11)
export const LESSON_5_6_DURATION = 6596;

const SCENE_TIMINGS = {
  scene01_intro: { start: 0, duration: 443 },
  scene02_cifar10_intro: { start: 443, duration: 682 },
  scene03_classes: { start: 1125, duration: 616 },
  scene04_data_loading: { start: 1741, duration: 601 },
  scene05_augmentation: { start: 2342, duration: 568 },
  scene06_model_structure: { start: 2910, duration: 517 },
  scene07_model_code: { start: 3427, duration: 614 },
  scene08_training_setup: { start: 4041, duration: 609 },
  scene09_training_run: { start: 4650, duration: 588 },
  scene10_comparison: { start: 5238, duration: 665 },
  scene11_outro: { start: 5903, duration: 693 },
};

// Pink/Magenta theme for CIFAR-10 lesson
const COLORS = {
  background: "#0f0f23",
  primary: "#ec4899",
  secondary: "#f472b6",
  accent: "#db2777",
  light: "#ffffff",
  muted: "rgba(255,255,255,0.7)",
  card: "rgba(236,72,153,0.15)",
  cardBorder: "rgba(236,72,153,0.4)",
  gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
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
      <Audio src={staticFile("audio/lesson-5-6/scene01_intro.mp3")} />
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
        <div style={{ fontSize: 70, marginBottom: 20 }}>🎨</div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.light,
            marginBottom: 20,
            fontFamily: "Pretendard, sans-serif",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          CNN 구현 (CIFAR-10)
        </div>
        <div
          style={{
            fontSize: 36,
            color: "rgba(255,255,255,0.9)",
            fontFamily: "Pretendard, sans-serif",
            marginBottom: 40,
          }}
        >
          컬러 이미지 분류 도전하기
        </div>
        <div
          style={{
            padding: "18px 50px",
            background: "rgba(0,0,0,0.3)",
            borderRadius: 50,
            fontSize: 30,
            color: COLORS.light,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          Level 5-6
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: CIFAR-10 Introduction
const Scene02Cifar10Intro: React.FC = () => {
  const comparisons = [
    { label: "이미지 크기", mnist: "28×28", cifar: "32×32" },
    { label: "색상", mnist: "흑백 (1채널)", cifar: "컬러 (3채널)" },
    { label: "배경", mnist: "단순 (검정)", cifar: "복잡 (다양)" },
    { label: "목표 정확도", mnist: "99%+", cifar: "85%+" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene02_cifar10_intro.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          MNIST vs CIFAR-10
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {/* MNIST */}
          <div
            style={{
              flex: 1,
              background: COLORS.card,
              borderRadius: 20,
              padding: 35,
              border: `2px solid ${COLORS.cardBorder}`,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.light,
                marginBottom: 30,
                textAlign: "center",
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              MNIST
            </div>
            {comparisons.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 24, color: COLORS.muted, fontFamily: "Pretendard, sans-serif" }}>
                  {c.label}
                </span>
                <span style={{ fontSize: 24, color: COLORS.light, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>
                  {c.mnist}
                </span>
              </div>
            ))}
          </div>

          {/* CIFAR-10 */}
          <div
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.accent}20)`,
              borderRadius: 20,
              padding: 35,
              border: `2px solid ${COLORS.primary}`,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.primary,
                marginBottom: 30,
                textAlign: "center",
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              CIFAR-10
            </div>
            {comparisons.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 24, color: COLORS.muted, fontFamily: "Pretendard, sans-serif" }}>
                  {c.label}
                </span>
                <span style={{ fontSize: 24, color: COLORS.primary, fontWeight: 600, fontFamily: "Pretendard, sans-serif" }}>
                  {c.cifar}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 50,
            fontSize: 28,
            color: COLORS.muted,
            textAlign: "center",
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          CIFAR-10은 실제 사물 이미지! MNIST보다 훨씬 복잡해요
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: CIFAR-10 Classes
const Scene03Classes: React.FC = () => {
  const classes = [
    { name: "비행기", emoji: "✈️" },
    { name: "자동차", emoji: "🚗" },
    { name: "새", emoji: "🐦" },
    { name: "고양이", emoji: "🐱" },
    { name: "사슴", emoji: "🦌" },
    { name: "개", emoji: "🐕" },
    { name: "개구리", emoji: "🐸" },
    { name: "말", emoji: "🐴" },
    { name: "배", emoji: "🚢" },
    { name: "트럭", emoji: "🚚" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene03_classes.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
          }}
        >
          CIFAR-10의 10개 클래스
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 25,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {classes.map((cls, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 20,
                padding: "30px 20px",
                textAlign: "center",
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div style={{ fontSize: 50, marginBottom: 15 }}>{cls.emoji}</div>
              <div
                style={{
                  fontSize: 24,
                  color: COLORS.light,
                  fontWeight: 600,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {cls.name}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 50,
            fontSize: 26,
            color: COLORS.muted,
            textAlign: "center",
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          숫자 분류보다 훨씬 어려운 실제 사물 분류!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Data Loading
const Scene04DataLoading: React.FC = () => {
  const code = `# CIFAR-10 데이터 로딩
from torchvision import datasets, transforms

train_transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomCrop(32, padding=4),
    transforms.ToTensor(),
    transforms.Normalize(
        (0.4914, 0.4822, 0.4465),  # RGB 평균
        (0.2470, 0.2435, 0.2616)   # RGB 표준편차
    )
])

train_dataset = datasets.CIFAR10(
    './data', train=True, download=True,
    transform=train_transform
)`;

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene04_data_loading.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 40,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          CIFAR-10 데이터 로딩
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          <div
            style={{
              flex: 1.3,
              background: "#1e1e3f",
              borderRadius: 16,
              padding: 30,
              fontFamily: "Monaco, monospace",
              fontSize: 16,
              lineHeight: 1.6,
              border: `1px solid ${COLORS.cardBorder}`,
            }}
          >
            <pre style={{ margin: 0, color: "#e0e0e0", whiteSpace: "pre-wrap" }}>
              {code.split("\n").map((line, i) => (
                <div
                  key={i}
                  style={{
                    color: line.startsWith("#") ? COLORS.primary : line.includes("=") ? "#f472b6" : "#e0e0e0",
                  }}
                >
                  {line}
                </div>
              ))}
            </pre>
          </div>

          <div style={{ flex: 0.7, display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { title: "정규화 값", desc: "RGB 채널별 평균/표준편차" },
              { title: "배치 크기", desc: "128개씩 묶어서 학습" },
              { title: "데이터 증강", desc: "좌우반전 + 랜덤크롭" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: COLORS.card,
                  borderRadius: 16,
                  padding: 25,
                  border: `1px solid ${COLORS.cardBorder}`,
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.primary,
                    marginBottom: 8,
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
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Data Augmentation
const Scene05Augmentation: React.FC = () => {
  const techniques = [
    { name: "RandomHorizontalFlip", effect: "좌우 반전", icon: "↔️", desc: "고양이가 왼쪽을 보든 오른쪽을 보든 고양이!" },
    { name: "RandomCrop", effect: "랜덤 자르기", icon: "✂️", desc: "이미지 일부를 크롭해서 위치 불변성 학습" },
    { name: "RandomRotation", effect: "회전", icon: "🔄", desc: "약간 기울어진 이미지도 인식 가능" },
    { name: "ColorJitter", effect: "색상 변환", icon: "🎨", desc: "밝기/대비 변화에 강인한 모델" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene05_augmentation.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 20,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          데이터 증강 (Data Augmentation)
        </div>
        <div
          style={{
            fontSize: 26,
            color: COLORS.muted,
            marginBottom: 40,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          이미지를 변형해서 학습 데이터를 인위적으로 늘리는 기법
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 25 }}>
          {techniques.map((tech, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 20,
                padding: 30,
                border: `2px solid ${COLORS.cardBorder}`,
                display: "flex",
                gap: 25,
                alignItems: "flex-start",
              }}
            >
              <div style={{ fontSize: 55 }}>{tech.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: COLORS.primary,
                    marginBottom: 8,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {tech.name}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: COLORS.light,
                    marginBottom: 10,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {tech.effect}
                </div>
                <div
                  style={{
                    fontSize: 18,
                    color: COLORS.muted,
                    fontFamily: "Pretendard, sans-serif",
                  }}
                >
                  {tech.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            padding: "20px 40px",
            background: `${COLORS.primary}20`,
            borderRadius: 16,
            fontSize: 26,
            color: COLORS.light,
            textAlign: "center",
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          🎯 데이터 증강으로 과적합을 줄이고 일반화 성능 향상!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Model Structure
const Scene06ModelStructure: React.FC = () => {
  const blocks = [
    { name: "Block 1", input: "3ch", output: "64ch", size: "32→16" },
    { name: "Block 2", input: "64ch", output: "128ch", size: "16→8" },
    { name: "Block 3", input: "128ch", output: "256ch", size: "8→4" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene06_model_structure.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
          }}
        >
          CIFAR-10용 깊은 CNN 구조
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginBottom: 50,
          }}
        >
          {/* Input */}
          <div
            style={{
              background: COLORS.card,
              borderRadius: 16,
              padding: "25px 35px",
              textAlign: "center",
              border: `2px solid ${COLORS.muted}`,
            }}
          >
            <div style={{ fontSize: 22, color: COLORS.muted, marginBottom: 8, fontFamily: "Pretendard, sans-serif" }}>
              Input
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
              3×32×32
            </div>
          </div>

          <div style={{ fontSize: 36, color: COLORS.primary }}>→</div>

          {blocks.map((block, i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  background: COLORS.gradient,
                  borderRadius: 16,
                  padding: "25px 30px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.light, marginBottom: 12, fontFamily: "Pretendard, sans-serif" }}>
                  {block.name}
                </div>
                <div style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", marginBottom: 6, fontFamily: "Pretendard, sans-serif" }}>
                  {block.input} → {block.output}
                </div>
                <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", fontFamily: "Pretendard, sans-serif" }}>
                  {block.size}
                </div>
              </div>
              {i < blocks.length - 1 && <div style={{ fontSize: 36, color: COLORS.primary }}>→</div>}
            </React.Fragment>
          ))}

          <div style={{ fontSize: 36, color: COLORS.primary }}>→</div>

          {/* Classifier */}
          <div
            style={{
              background: COLORS.card,
              borderRadius: 16,
              padding: "25px 35px",
              textAlign: "center",
              border: `2px solid ${COLORS.primary}`,
            }}
          >
            <div style={{ fontSize: 22, color: COLORS.primary, marginBottom: 8, fontFamily: "Pretendard, sans-serif" }}>
              Classifier
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
              4096→512→10
            </div>
          </div>
        </div>

        <div
          style={{
            background: COLORS.card,
            borderRadius: 16,
            padding: 30,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: COLORS.primary,
              marginBottom: 20,
              fontFamily: "Pretendard, sans-serif",
              textAlign: "center",
            }}
          >
            각 블록 구성
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            {["Conv2d × 2", "BatchNorm2d", "ReLU", "MaxPool2d"].map((item, i) => (
              <div
                key={i}
                style={{
                  background: `${COLORS.primary}30`,
                  padding: "12px 25px",
                  borderRadius: 30,
                  fontSize: 22,
                  color: COLORS.light,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Model Code
const Scene07ModelCode: React.FC = () => {
  const code = `class CIFAR10_CNN(nn.Module):
    def __init__(self):
        super().__init__()

        self.block1 = nn.Sequential(
            nn.Conv2d(3, 64, 3, padding=1),   # 입력: 3채널
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 64, 3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2)                # 32→16
        )

        self.classifier = nn.Sequential(
            nn.Dropout(0.5),                   # 과적합 방지
            nn.Linear(256 * 4 * 4, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(512, 10)                 # 10개 클래스
        )`;

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene07_model_code.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 30,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          CIFAR-10 CNN 코드
        </div>

        <div style={{ display: "flex", gap: 30 }}>
          <div
            style={{
              flex: 1.4,
              background: "#1e1e3f",
              borderRadius: 16,
              padding: 25,
              fontFamily: "Monaco, monospace",
              fontSize: 15,
              lineHeight: 1.5,
              border: `1px solid ${COLORS.cardBorder}`,
            }}
          >
            <pre style={{ margin: 0, color: "#e0e0e0", whiteSpace: "pre-wrap" }}>
              {code.split("\n").map((line, i) => (
                <div
                  key={i}
                  style={{
                    color: line.includes("#") ? "#6a9955" : line.includes("class") || line.includes("def") ? "#dcdcaa" : "#e0e0e0",
                  }}
                >
                  {line}
                </div>
              ))}
            </pre>
          </div>

          <div style={{ flex: 0.6, display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "3️⃣", title: "입력 채널", desc: "RGB 3채널" },
              { icon: "🔒", title: "Dropout", desc: "50% 뉴런 비활성화" },
              { icon: "🎯", title: "출력", desc: "10개 클래스" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: COLORS.card,
                  borderRadius: 16,
                  padding: 20,
                  border: `1px solid ${COLORS.cardBorder}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <div style={{ fontSize: 35 }}>{item.icon}</div>
                  <div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: COLORS.primary,
                        fontFamily: "Pretendard, sans-serif",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        color: COLORS.muted,
                        fontFamily: "Pretendard, sans-serif",
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Training Setup
const Scene08TrainingSetup: React.FC = () => {
  const settings = [
    { label: "손실 함수", value: "CrossEntropyLoss", desc: "다중 분류용" },
    { label: "옵티마이저", value: "Adam", desc: "lr=0.001" },
    { label: "스케줄러", value: "StepLR", desc: "10에폭마다 lr÷2" },
    { label: "에폭 수", value: "20", desc: "MNIST보다 더 많이" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene08_training_setup.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
          }}
        >
          학습 설정
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 30,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {settings.map((s, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                borderRadius: 20,
                padding: 35,
                border: `2px solid ${COLORS.cardBorder}`,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  color: COLORS.muted,
                  marginBottom: 10,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.primary,
                  marginBottom: 8,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 20,
                  color: COLORS.muted,
                  fontFamily: "Pretendard, sans-serif",
                }}
              >
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 50,
            padding: "25px 40px",
            background: `${COLORS.primary}20`,
            borderRadius: 16,
            fontSize: 26,
            color: COLORS.light,
            textAlign: "center",
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          🎯 학습률 스케줄러: 처음엔 빠르게, 나중엔 세밀하게!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 9: Training Run
const Scene09TrainingRun: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(100, frame / 3);
  const epoch = Math.min(20, Math.floor(frame / 15) + 1);
  const accuracy = Math.min(87, 25 + frame * 0.2);
  const loss = Math.max(0.35, 2.3 - frame * 0.006);

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene09_training_run.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
          }}
        >
          학습 실행 중...
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 80, marginBottom: 50 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, color: COLORS.muted, marginBottom: 15, fontFamily: "Pretendard, sans-serif" }}>
              Epoch
            </div>
            <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.light, fontFamily: "Pretendard, sans-serif" }}>
              {epoch}<span style={{ fontSize: 40, color: COLORS.muted }}>/20</span>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, color: COLORS.muted, marginBottom: 15, fontFamily: "Pretendard, sans-serif" }}>
              Loss
            </div>
            <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.secondary, fontFamily: "Pretendard, sans-serif" }}>
              {loss.toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, color: COLORS.muted, marginBottom: 15, fontFamily: "Pretendard, sans-serif" }}>
              Accuracy
            </div>
            <div style={{ fontSize: 80, fontWeight: 800, color: COLORS.primary, fontFamily: "Pretendard, sans-serif" }}>
              {accuracy.toFixed(1)}%
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ height: 30, background: "rgba(255,255,255,0.1)", borderRadius: 15, overflow: "hidden" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: COLORS.gradient,
                borderRadius: 15,
              }}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: 50,
            display: "flex",
            justifyContent: "center",
            gap: 30,
          }}
        >
          {[
            { label: "model.train()", desc: "학습 모드" },
            { label: "model.eval()", desc: "평가 모드" },
            { label: "scheduler.step()", desc: "lr 업데이트" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: COLORS.card,
                padding: "15px 30px",
                borderRadius: 12,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.primary, fontFamily: "Monaco, monospace" }}>
                {item.label}
              </div>
              <div style={{ fontSize: 16, color: COLORS.muted, fontFamily: "Pretendard, sans-serif", marginTop: 5 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 10: MNIST vs CIFAR-10 CNN Comparison
const Scene10Comparison: React.FC = () => {
  const comparisons = [
    { aspect: "입력", mnist: "1×28×28", cifar: "3×32×32" },
    { aspect: "Conv 블록", mnist: "2개", cifar: "3개" },
    { aspect: "데이터 증강", mnist: "불필요", cifar: "필수" },
    { aspect: "Dropout", mnist: "선택", cifar: "필수" },
    { aspect: "목표 정확도", mnist: "99%+", cifar: "85%+" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.background }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene10_comparison.mp3")} />
      <div style={{ padding: 60 }}>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.primary,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
            textAlign: "center",
          }}
        >
          MNIST CNN vs CIFAR-10 CNN
        </div>

        <div
          style={{
            background: COLORS.card,
            borderRadius: 20,
            padding: 40,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 20,
              marginBottom: 25,
              paddingBottom: 20,
              borderBottom: `2px solid ${COLORS.cardBorder}`,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.muted, fontFamily: "Pretendard, sans-serif" }}>
              항목
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.light, textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>
              MNIST CNN
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.primary, textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>
              CIFAR-10 CNN
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((c, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 20,
                padding: "18px 0",
                borderBottom: i < comparisons.length - 1 ? `1px solid ${COLORS.cardBorder}` : "none",
              }}
            >
              <div style={{ fontSize: 22, color: COLORS.muted, fontFamily: "Pretendard, sans-serif" }}>
                {c.aspect}
              </div>
              <div style={{ fontSize: 22, color: COLORS.light, textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>
                {c.mnist}
              </div>
              <div style={{ fontSize: 22, color: COLORS.primary, fontWeight: 600, textAlign: "center", fontFamily: "Pretendard, sans-serif" }}>
                {c.cifar}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 50,
            fontSize: 28,
            color: COLORS.light,
            textAlign: "center",
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          같은 CNN이지만, 데이터에 따라 접근 방식이 달라져요!
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 11: Outro
const Scene11Outro: React.FC = () => {
  const keyPoints = [
    "CIFAR-10: 컬러 이미지 사물 분류",
    "데이터 증강: 좌우반전 + 랜덤크롭",
    "3개 Conv 블록 + Dropout",
    "학습률 스케줄러로 안정적 학습",
    "85%+ 정확도 달성",
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.gradient }}>
      <GlobalOverlay />
      <Audio src={staticFile("audio/lesson-5-6/scene11_outro.mp3")} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.light,
            marginBottom: 50,
            fontFamily: "Pretendard, sans-serif",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          핵심 정리
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {keyPoints.map((point, i) => (
            <div
              key={i}
              style={{
                fontSize: 30,
                color: COLORS.light,
                background: "rgba(0,0,0,0.25)",
                padding: "18px 45px",
                borderRadius: 50,
                fontFamily: "Pretendard, sans-serif",
              }}
            >
              ✓ {point}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 60,
            padding: "20px 50px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: 50,
            fontSize: 30,
            color: COLORS.light,
            fontFamily: "Pretendard, sans-serif",
          }}
        >
          다음 시간: 전이 학습 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Lesson5_6Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
      {/* Scene sequences with embedded audio */}
      <Sequence from={SCENE_TIMINGS.scene01_intro.start} durationInFrames={SCENE_TIMINGS.scene01_intro.duration}>
        <Scene01Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene02_cifar10_intro.start} durationInFrames={SCENE_TIMINGS.scene02_cifar10_intro.duration}>
        <Scene02Cifar10Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene03_classes.start} durationInFrames={SCENE_TIMINGS.scene03_classes.duration}>
        <Scene03Classes />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene04_data_loading.start} durationInFrames={SCENE_TIMINGS.scene04_data_loading.duration}>
        <Scene04DataLoading />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene05_augmentation.start} durationInFrames={SCENE_TIMINGS.scene05_augmentation.duration}>
        <Scene05Augmentation />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene06_model_structure.start} durationInFrames={SCENE_TIMINGS.scene06_model_structure.duration}>
        <Scene06ModelStructure />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene07_model_code.start} durationInFrames={SCENE_TIMINGS.scene07_model_code.duration}>
        <Scene07ModelCode />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene08_training_setup.start} durationInFrames={SCENE_TIMINGS.scene08_training_setup.duration}>
        <Scene08TrainingSetup />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene09_training_run.start} durationInFrames={SCENE_TIMINGS.scene09_training_run.duration}>
        <Scene09TrainingRun />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene10_comparison.start} durationInFrames={SCENE_TIMINGS.scene10_comparison.duration}>
        <Scene10Comparison />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene11_outro.start} durationInFrames={SCENE_TIMINGS.scene11_outro.duration}>
        <Scene11Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
