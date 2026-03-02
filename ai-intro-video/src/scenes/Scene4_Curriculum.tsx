import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
} from "remotion";
import { colors } from "../styles";

interface Scene4Props {
  part: "basic" | "core" | "advanced";
  durationInFrames: number;
}

// 상세 커리큘럼 데이터
const curriculumDetails = {
  basic: {
    // Scene4a: 148초 = 4440 frames
    // 0-35초: 레벨0 파이썬
    // 35-70초: 레벨1 AI기초
    // 70-108초: 레벨2 수학기초
    // 108-148초: 레벨3 딥러닝핵심
    levels: [
      {
        level: 0,
        title: "파이썬 기초",
        icon: "🐍",
        duration: "6개 레슨, 4시간",
        color: colors.level[0],
        startSec: 0,
        endSec: 35,
        details: [
          "파이썬 설치와 개발 환경 설정",
          "변수와 자료형",
          "조건문과 반복문",
          "함수 정의",
          "NumPy로 배열 연산",
          "Matplotlib으로 데이터 시각화",
        ],
      },
      {
        level: 1,
        title: "AI 기초 이론",
        icon: "🧠",
        duration: "7개 레슨, 5시간",
        color: colors.level[1],
        startSec: 35,
        endSec: 70,
        details: [
          "인공지능의 정의",
          "뉴런의 수학적 모델링",
          "퍼셉트론의 구조와 학습 원리",
          "AND, OR, NOT 논리 게이트 구현",
          "XOR 문제와 그 한계",
          "다층 퍼셉트론의 필요성",
        ],
      },
      {
        level: 2,
        title: "수학 기초",
        icon: "📐",
        duration: "8개 레슨, 6시간",
        color: colors.level[2],
        startSec: 70,
        endSec: 108,
        details: [
          "함수와 그래프",
          "미분의 직관적 이해",
          "체인룰 (합성함수 미분)",
          "편미분과 그래디언트 벡터",
          "벡터와 행렬의 기초",
          "확률과 베이즈 정리",
          "정규분포와 통계 기초",
        ],
      },
      {
        level: 3,
        title: "딥러닝 핵심",
        icon: "🔥",
        duration: "8개 레슨, 6시간",
        color: colors.level[3],
        startSec: 108,
        endSec: 148,
        details: [
          "손실 함수 (MSE, 크로스 엔트로피)",
          "경사하강법의 원리",
          "SGD, 모멘텀, Adam",
          "순전파로 출력 계산",
          "역전파로 그래디언트 전파",
          "활성화 함수",
          "과적합 방지 기법",
        ],
      },
    ],
  },
  core: {
    // Scene4b: 116초 = 3480 frames
    // 0-38초: 레벨4 파이토치
    // 38-77초: 레벨5 CNN
    // 77-116초: 레벨6 RNN/LSTM
    levels: [
      {
        level: 4,
        title: "파이토치 입문",
        icon: "🔦",
        duration: "7개 레슨, 5시간",
        color: colors.level[4],
        startSec: 0,
        endSec: 38,
        details: [
          "텐서 생성과 연산",
          "GPU 활용법",
          "Autograd 자동 미분",
          "nn.Module로 신경망 정의",
          "DataLoader로 데이터 로딩",
          "학습 루프 작성",
          "모델 저장과 로드",
        ],
      },
      {
        level: 5,
        title: "CNN과 이미지 처리",
        icon: "🖼️",
        duration: "8개 레슨, 6시간",
        color: colors.level[5],
        startSec: 38,
        endSec: 77,
        details: [
          "합성곱 연산의 원리",
          "커널, 스트라이드, 패딩",
          "맥스 풀링",
          "배치 정규화",
          "LeNet, AlexNet, VGG 분석",
          "MNIST/CIFAR-10 분류",
          "전이 학습",
          "데이터 증강",
        ],
      },
      {
        level: 6,
        title: "시퀀스 모델 RNN/LSTM",
        icon: "🔄",
        duration: "7개 레슨, 5시간",
        color: colors.level[6],
        startSec: 77,
        endSec: 116,
        details: [
          "RNN의 순환 구조",
          "은닉 상태",
          "기울기 소실 문제",
          "LSTM의 게이트 구조",
          "GRU",
          "텍스트 전처리와 토큰화",
          "감성 분석 모델 구현",
        ],
      },
    ],
  },
  advanced: {
    // Scene4c: 103초 = 3090 frames
    // 0-40초: 레벨7 트랜스포머
    // 40-70초: 레벨8 GPU
    // 70-103초: 레벨9 프로젝트
    levels: [
      {
        level: 7,
        title: "트랜스포머와 LLM",
        icon: "🤖",
        duration: "8개 레슨, 6시간",
        color: colors.level[7],
        startSec: 0,
        endSec: 40,
        details: [
          "Attention 메커니즘",
          "Query, Key, Value",
          "Self-Attention",
          "Multi-Head Attention",
          "Positional Encoding",
          "트랜스포머 전체 구조",
          "BERT vs GPT",
          "LLM의 토큰화와 추론",
        ],
        highlight: "ChatGPT, GPT-4, Claude의 심장!",
      },
      {
        level: 8,
        title: "GPU 프로그래밍",
        icon: "⚡",
        duration: "7개 레슨, 5시간",
        color: colors.level[8],
        startSec: 40,
        endSec: 70,
        details: [
          "GPU vs CPU",
          "병렬 처리의 원리",
          "CUDA 커널, 스레드, 블록",
          "환경 설정",
          "첫 CUDA 프로그램",
          "메모리 관리",
          "파이토치 GPU 활용",
        ],
      },
      {
        level: 9,
        title: "종합 프로젝트",
        icon: "🚗",
        duration: "8개 레슨, 8시간",
        color: colors.level[9],
        startSec: 70,
        endSec: 103,
        details: [
          "번호판 인식 시스템 설계",
          "데이터 수집과 라벨링",
          "YOLO로 번호판 검출",
          "CNN OCR로 문자 인식",
          "파이프라인 구축",
          "모델 경량화",
          "웹 API 배포",
          "문서화와 발표",
        ],
        highlight: "포트폴리오 완성!",
      },
    ],
  },
};

export const Scene4_Curriculum: React.FC<Scene4Props> = ({ part, durationInFrames }) => {
  const frame = useCurrentFrame();
  const FPS = 30;
  const data = curriculumDetails[part];

  // 현재 프레임에 맞는 레벨 찾기
  const currentLevelIdx = data.levels.findIndex((lvl) => {
    const startFrame = lvl.startSec * FPS;
    const endFrame = lvl.endSec * FPS;
    return frame >= startFrame && frame < endFrame;
  });

  const currentLevel = currentLevelIdx >= 0 ? data.levels[currentLevelIdx] : null;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gray[900]} 0%, #1a1a2e 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* 배경 그라데이션 */}
      {currentLevel && (
        <div
          style={{
            position: "absolute",
            width: 1000,
            height: 1000,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${currentLevel.color}15 0%, transparent 60%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* 각 레벨 표시 */}
      {data.levels.map((lvl, levelIdx) => {
        const startFrame = lvl.startSec * FPS;
        const endFrame = lvl.endSec * FPS;
        const isActive = frame >= startFrame && frame < endFrame;

        if (!isActive) return null;

        const localFrame = frame - startFrame;
        const levelDuration = endFrame - startFrame;

        return (
          <div
            key={lvl.level}
            style={{
              width: "100%",
              maxWidth: 1600,
              zIndex: 10,
            }}
          >
            {/* 레벨 헤더 */}
            <div
              style={{
                opacity: interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 30,
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                  backgroundColor: lvl.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 56,
                }}
              >
                {lvl.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 24,
                    color: lvl.color,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  레벨 {lvl.level}
                </div>
                <h2
                  style={{
                    fontSize: 52,
                    fontWeight: "bold",
                    color: colors.white,
                    margin: 0,
                  }}
                >
                  {lvl.title}
                </h2>
                <div
                  style={{
                    fontSize: 24,
                    color: colors.gray[400],
                    marginTop: 10,
                  }}
                >
                  {lvl.duration}
                </div>
              </div>
            </div>

            {/* 하이라이트 메시지 (있는 경우) */}
            {lvl.highlight && (
              <div
                style={{
                  opacity: interpolate(localFrame, [30, 50], [0, 1], { extrapolateRight: "clamp" }),
                  textAlign: "center",
                  marginBottom: 30,
                }}
              >
                <span
                  style={{
                    backgroundColor: lvl.color,
                    padding: "10px 30px",
                    borderRadius: 30,
                    fontSize: 24,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  {lvl.highlight}
                </span>
              </div>
            )}

            {/* 상세 내용 그리드 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 20,
                marginTop: 30,
              }}
            >
              {lvl.details.map((detail, idx) => {
                const itemDelay = 40 + idx * 15;
                const itemOpacity = interpolate(
                  localFrame,
                  [itemDelay, itemDelay + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const itemX = interpolate(
                  localFrame,
                  [itemDelay, itemDelay + 20],
                  [idx % 2 === 0 ? -30 : 30, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                return (
                  <div
                    key={idx}
                    style={{
                      opacity: itemOpacity,
                      transform: `translateX(${itemX}px)`,
                      backgroundColor: `${colors.gray[800]}cc`,
                      padding: "20px 30px",
                      borderRadius: 16,
                      borderLeft: `4px solid ${lvl.color}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: lvl.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: colors.white,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span
                      style={{
                        fontSize: 24,
                        color: colors.gray[200],
                      }}
                    >
                      {detail}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 진행 표시기 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          right: 60,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* 전체 레벨 미니 표시 */}
        <div style={{ display: "flex", gap: 8 }}>
          {data.levels.map((lvl, idx) => {
            const startFrame = lvl.startSec * FPS;
            const isActive = frame >= startFrame;
            return (
              <div
                key={idx}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: isActive ? lvl.color : colors.gray[700],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.white,
                  transition: "background-color 0.3s",
                }}
              >
                {lvl.level}
              </div>
            );
          })}
        </div>

        {/* 파트 표시 */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          {["기초", "핵심", "고급"].map((p, idx) => {
            const partKeys = ["basic", "core", "advanced"];
            const isCurrentPart = partKeys[idx] === part;
            return (
              <div
                key={p}
                style={{
                  padding: "8px 20px",
                  borderRadius: 20,
                  backgroundColor: isCurrentPart ? colors.primary : colors.gray[700],
                  fontSize: 18,
                  color: colors.white,
                }}
              >
                {p}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
