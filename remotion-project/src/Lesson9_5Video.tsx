import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

const DURATION = 5704;

export const LESSON_9_5_DURATION = DURATION;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 528 },
  detection_metrics: { start: 528, duration: 911 },
  ocr_metrics: { start: 1439, duration: 805 },
  error_analysis: { start: 2244, duration: 797 },
  optimization: { start: 3041, duration: 755 },
  inference_speed: { start: 3796, duration: 711 },
  mlflow: { start: 4507, duration: 710 },
  outro: { start: 5217, duration: 487 },
};

const COLORS = {
  background: "#0f172a",
  primary: "#f59e0b",
  secondary: "#d97706",
  accent: "#b45309",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
};

const GlobalOverlay: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 30, left: 40, zIndex: 9999, display: "flex", alignItems: "center", gap: 15 }}>
      <Img src={staticFile("images/logo.png")} style={{ width: 60, height: 60, borderRadius: 8 }} />
      <span style={{ color: "white", fontSize: 28, fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>UTTEC-Lab</span>
    </div>
    <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: "rgba(245, 158, 11, 0.9)", padding: "10px 30px", borderRadius: 25 }}>
      <span style={{ color: "white", fontSize: 22, fontWeight: "bold", letterSpacing: 1 }}>http://uttec-ai.duckdns.org</span>
    </div>
  </>
);

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.gradient,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GlobalOverlay />
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "bold",
            color: COLORS.light,
            marginBottom: "20px",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          Level 9-5
        </h1>
        <h2
          style={{
            fontSize: "60px",
            color: COLORS.light,
            fontWeight: "600",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          모델 평가와 최적화
        </h2>
        <div
          style={{
            marginTop: "40px",
            fontSize: "36px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Evaluation & Optimization
        </div>
      </div>
      <Audio src={staticFile("audio/lesson-9-5/intro.mp3")} />
    </AbsoluteFill>
  );
};

const DetectionMetricsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const metrics = [
    { name: "Precision", value: "92.5%", description: "정확도" },
    { name: "Recall", value: "89.3%", description: "재현율" },
    { name: "F1-Score", value: "90.8%", description: "조화평균" },
    { name: "mAP", value: "88.7%", description: "평균 정밀도" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        padding: "80px",
      }}
    >
      <GlobalOverlay />
      <h2
        style={{
          fontSize: "56px",
          color: COLORS.primary,
          marginBottom: "60px",
          fontWeight: "bold",
        }}
      >
        객체 탐지 성능 지표
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginBottom: "60px",
        }}
      >
        {metrics.map((metric, idx) => {
          const delay = idx * 8;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateRight: "clamp",
          });
          const translateY = interpolate(frame, [delay, delay + 20], [30, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={metric.name}
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: `2px solid ${COLORS.primary}`,
                borderRadius: "16px",
                padding: "40px",
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  color: COLORS.secondary,
                  marginBottom: "10px",
                }}
              >
                {metric.description}
              </div>
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: COLORS.primary,
                  marginBottom: "10px",
                }}
              >
                {metric.name}
              </div>
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: "bold",
                  color: COLORS.light,
                }}
              >
                {metric.value}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontSize: "32px",
          color: COLORS.light,
          background: "rgba(245, 158, 11, 0.15)",
          padding: "30px",
          borderRadius: "12px",
          borderLeft: `6px solid ${COLORS.primary}`,
        }}
      >
        IoU, Precision, Recall을 조합하여 종합 평가
      </div>

      <Audio src={staticFile("audio/lesson-9-5/detection_metrics.mp3")} />
    </AbsoluteFill>
  );
};

const OCRMetricsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const metrics = [
    { name: "CER", value: "3.2%", description: "문자 오류율", icon: "📝" },
    { name: "WER", value: "5.8%", description: "단어 오류율", icon: "📄" },
    { name: "Accuracy", value: "94.2%", description: "정확도", icon: "✓" },
    { name: "Edit Distance", value: "2.1", description: "편집 거리", icon: "✏️" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        padding: "80px",
      }}
    >
      <GlobalOverlay />
      <h2
        style={{
          fontSize: "56px",
          color: COLORS.primary,
          marginBottom: "60px",
          fontWeight: "bold",
        }}
      >
        OCR 성능 평가 지표
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}
      >
        {metrics.map((metric, idx) => {
          const delay = idx * 10;
          const scale = spring({
            frame: frame - delay,
            fps: 30,
            config: { damping: 15 },
          });

          return (
            <div
              key={metric.name}
              style={{
                background: "rgba(217, 119, 6, 0.1)",
                border: `3px solid ${COLORS.secondary}`,
                borderRadius: "20px",
                padding: "40px",
                transform: `scale(${scale})`,
                display: "flex",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <div style={{ fontSize: "72px" }}>{metric.icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "28px",
                    color: COLORS.secondary,
                    marginBottom: "8px",
                  }}
                >
                  {metric.description}
                </div>
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: COLORS.primary,
                    marginBottom: "8px",
                  }}
                >
                  {metric.name}
                </div>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    color: COLORS.light,
                  }}
                >
                  {metric.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "60px",
          fontSize: "32px",
          color: COLORS.light,
          background: "rgba(245, 158, 11, 0.15)",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        문자/단어 단위 오류율로 인식 성능 정량화
      </div>

      <Audio src={staticFile("audio/lesson-9-5/ocr_metrics.mp3")} />
    </AbsoluteFill>
  );
};

const ErrorAnalysisScene: React.FC = () => {
  const frame = useCurrentFrame();

  const errors = [
    { type: "저조도 이미지", count: 23, icon: "🌙", percent: "15%" },
    { type: "회전/왜곡", count: 18, icon: "🔄", percent: "12%" },
    { type: "작은 텍스트", count: 31, icon: "🔍", percent: "20%" },
    { type: "복잡한 배경", count: 27, icon: "🎨", percent: "18%" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        padding: "80px",
      }}
    >
      <GlobalOverlay />
      <h2
        style={{
          fontSize: "56px",
          color: COLORS.primary,
          marginBottom: "40px",
          fontWeight: "bold",
        }}
      >
        오류 사례 분석
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {errors.map((error, idx) => {
          const delay = idx * 8;
          const width = interpolate(frame, [delay, delay + 20], [0, 100], {
            extrapolateRight: "clamp",
          });

          return (
            <div key={error.type} style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    color: COLORS.light,
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <span style={{ fontSize: "48px" }}>{error.icon}</span>
                  {error.type}
                </div>
                <div
                  style={{
                    fontSize: "40px",
                    color: COLORS.primary,
                    fontWeight: "bold",
                  }}
                >
                  {error.count}건 ({error.percent})
                </div>
              </div>
              <div
                style={{
                  height: "20px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${width}%`,
                    background: COLORS.gradient,
                    borderRadius: "10px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "60px",
          fontSize: "32px",
          color: COLORS.light,
          background: "rgba(245, 158, 11, 0.15)",
          padding: "30px",
          borderRadius: "12px",
          borderLeft: `6px solid ${COLORS.primary}`,
        }}
      >
        실패 사례를 체계적으로 분류하고 개선 방향 도출
      </div>

      <Audio src={staticFile("audio/lesson-9-5/error_analysis.mp3")} />
    </AbsoluteFill>
  );
};

const OptimizationScene: React.FC = () => {
  const frame = useCurrentFrame();

  const techniques = [
    { name: "Model Pruning", benefit: "크기 50% 감소", icon: "✂️" },
    { name: "Quantization", benefit: "속도 2배 향상", icon: "⚡" },
    { name: "Knowledge Distillation", benefit: "성능 유지", icon: "🎓" },
    { name: "Data Augmentation", benefit: "정확도 +3%", icon: "🔄" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        padding: "80px",
      }}
    >
      <GlobalOverlay />
      <h2
        style={{
          fontSize: "56px",
          color: COLORS.primary,
          marginBottom: "60px",
          fontWeight: "bold",
        }}
      >
        모델 최적화 기법
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}
      >
        {techniques.map((tech, idx) => {
          const delay = idx * 10;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateRight: "clamp",
          });
          const translateX = interpolate(frame, [delay, delay + 15], [-50, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={tech.name}
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: `2px solid ${COLORS.primary}`,
                borderRadius: "16px",
                padding: "40px",
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <div
                style={{
                  fontSize: "64px",
                  marginBottom: "20px",
                }}
              >
                {tech.icon}
              </div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: COLORS.light,
                  marginBottom: "15px",
                }}
              >
                {tech.name}
              </div>
              <div
                style={{
                  fontSize: "28px",
                  color: COLORS.primary,
                  fontWeight: "600",
                }}
              >
                {tech.benefit}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "60px",
          fontSize: "32px",
          color: COLORS.light,
          background: "rgba(245, 158, 11, 0.15)",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        모델 경량화와 성능 향상을 동시에 달성
      </div>

      <Audio src={staticFile("audio/lesson-9-5/optimization.mp3")} />
    </AbsoluteFill>
  );
};

const InferenceSpeedScene: React.FC = () => {
  const frame = useCurrentFrame();

  const speeds = [
    { device: "CPU", time: "245ms", fps: "4.1", color: "#60a5fa" },
    { device: "GPU", time: "18ms", fps: "55.6", color: "#34d399" },
    { device: "TensorRT", time: "8ms", fps: "125", color: COLORS.primary },
    { device: "ONNX", time: "12ms", fps: "83.3", color: "#a78bfa" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        padding: "80px",
      }}
    >
      <GlobalOverlay />
      <h2
        style={{
          fontSize: "56px",
          color: COLORS.primary,
          marginBottom: "60px",
          fontWeight: "bold",
        }}
      >
        추론 속도 벤치마크
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "35px",
        }}
      >
        {speeds.map((speed, idx) => {
          const delay = idx * 10;
          const scale = spring({
            frame: frame - delay,
            fps: 30,
            config: { damping: 12 },
          });

          return (
            <div
              key={speed.device}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `3px solid ${speed.color}`,
                borderRadius: "16px",
                padding: "35px",
                transform: `scale(${scale})`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "42px",
                  fontWeight: "bold",
                  color: COLORS.light,
                }}
              >
                {speed.device}
              </div>
              <div style={{ display: "flex", gap: "60px" }}>
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "8px",
                    }}
                  >
                    Latency
                  </div>
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      color: speed.color,
                    }}
                  >
                    {speed.time}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      color: "rgba(255,255,255,0.6)",
                      marginBottom: "8px",
                    }}
                  >
                    FPS
                  </div>
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      color: speed.color,
                    }}
                  >
                    {speed.fps}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: "60px",
          fontSize: "32px",
          color: COLORS.light,
          background: "rgba(245, 158, 11, 0.15)",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        실시간 처리를 위한 추론 속도 최적화
      </div>

      <Audio src={staticFile("audio/lesson-9-5/inference_speed.mp3")} />
    </AbsoluteFill>
  );
};

const MLflowScene: React.FC = () => {
  const frame = useCurrentFrame();

  const features = [
    { name: "Experiment Tracking", icon: "📊", desc: "실험 추적" },
    { name: "Model Registry", icon: "📦", desc: "모델 저장소" },
    { name: "Metrics Logging", icon: "📈", desc: "지표 기록" },
    { name: "Artifact Storage", icon: "💾", desc: "결과물 저장" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.background,
        padding: "80px",
      }}
    >
      <GlobalOverlay />
      <h2
        style={{
          fontSize: "56px",
          color: COLORS.primary,
          marginBottom: "60px",
          fontWeight: "bold",
        }}
      >
        MLflow로 실험 관리
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginBottom: "50px",
        }}
      >
        {features.map((feature, idx) => {
          const delay = idx * 8;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateRight: "clamp",
          });
          const translateY = interpolate(frame, [delay, delay + 20], [40, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={feature.name}
              style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: `2px solid ${COLORS.secondary}`,
                borderRadius: "16px",
                padding: "40px",
                opacity,
                transform: `translateY(${translateY}px)`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "72px", marginBottom: "20px" }}>
                {feature.icon}
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: COLORS.light,
                  marginBottom: "10px",
                }}
              >
                {feature.name}
              </div>
              <div
                style={{
                  fontSize: "26px",
                  color: COLORS.primary,
                }}
              >
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontSize: "28px",
          color: COLORS.light,
          background: "rgba(245, 158, 11, 0.15)",
          padding: "30px",
          borderRadius: "12px",
          borderLeft: `6px solid ${COLORS.primary}`,
          fontFamily: "monospace",
        }}
      >
        <div style={{ marginBottom: "15px", color: COLORS.primary }}>
          # MLflow 실험 추적
        </div>
        <div>mlflow.log_metric("mAP", 0.887)</div>
        <div>mlflow.log_param("batch_size", 32)</div>
        <div>mlflow.log_artifact("model.pth")</div>
      </div>

      <Audio src={staticFile("audio/lesson-9-5/mlflow.mp3")} />
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.gradient,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GlobalOverlay />
      <div
        style={{
          textAlign: "center",
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            fontSize: "72px",
            marginBottom: "30px",
          }}
        >
          ✅
        </div>
        <h2
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: COLORS.light,
            marginBottom: "30px",
          }}
        >
          평가와 최적화 완료!
        </h2>
        <p
          style={{
            fontSize: "36px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          다음: 모델 배포
        </p>
      </div>
      <Audio src={staticFile("audio/lesson-9-5/outro.mp3")} />
    </AbsoluteFill>
  );
};

export const Lesson9_5Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={SCENE_TIMINGS.intro.duration}>
        <IntroScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.detection_metrics.start}
        durationInFrames={SCENE_TIMINGS.detection_metrics.duration}
      >
        <DetectionMetricsScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.ocr_metrics.start}
        durationInFrames={SCENE_TIMINGS.ocr_metrics.duration}
      >
        <OCRMetricsScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.error_analysis.start}
        durationInFrames={SCENE_TIMINGS.error_analysis.duration}
      >
        <ErrorAnalysisScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.optimization.start}
        durationInFrames={SCENE_TIMINGS.optimization.duration}
      >
        <OptimizationScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.inference_speed.start}
        durationInFrames={SCENE_TIMINGS.inference_speed.duration}
      >
        <InferenceSpeedScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.mlflow.start}
        durationInFrames={SCENE_TIMINGS.mlflow.duration}
      >
        <MLflowScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.outro.start}
        durationInFrames={SCENE_TIMINGS.outro.duration}
      >
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
