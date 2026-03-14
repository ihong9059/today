import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame } from "remotion";

export const LESSON_5_5_DURATION = 7421;

const SCENE_TIMINGS = {
  intro: { start: 0, duration: 448 },
  mnist_intro: { start: 448, duration: 636 },
  data_loading: { start: 1084, duration: 749 },
  model_structure: { start: 1833, duration: 887 },
  model_code: { start: 2720, duration: 704 },
  training_setup: { start: 3424, duration: 633 },
  training_loop: { start: 4057, duration: 609 },
  training_run: { start: 4666, duration: 693 },
  prediction: { start: 5359, duration: 588 },
  mlp_comparison: { start: 5947, duration: 704 },
  outro: { start: 6651, duration: 770 },
};

const COLORS = {
  background: "#0f0f1a",
  primary: "#a855f7",
  secondary: "#7c3aed",
  accent: "#c084fc",
  success: "#10b981",
  danger: "#ef4444",
  light: "#ffffff",
  gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #6366f1 100%)",
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
      <Audio src={staticFile("audio/lesson-5-5/scene01_intro.mp3")} />
      <div style={{ textAlign: "center", opacity, transform: `translateY(${20 - opacity * 20}px)` }}>
        <div style={{ fontSize: 180, marginBottom: 20 }}>🔢</div>
        <div style={{ fontSize: 72, fontWeight: 800, color: COLORS.light, marginBottom: 20 }}>MNIST CNN 구현</div>
        <div style={{ fontSize: 36, color: "rgba(255,255,255,0.9)" }}>PyTorch로 손글씨 숫자 인식하기</div>
        <div style={{ marginTop: 40, padding: "15px 40px", background: "rgba(0,0,0,0.3)", borderRadius: 50, fontSize: 28, color: COLORS.light }}>
          Level 5-5
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SceneMnistIntro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene02_mnist_intro.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 56, color: COLORS.primary, marginBottom: 40 }}>📚 MNIST 데이터셋 소개</h1>
      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(168,85,247,0.15)", borderRadius: 20, padding: 30, marginBottom: 30 }}>
            <div style={{ fontSize: 28, color: COLORS.light, lineHeight: 1.6 }}>
              <span style={{ color: COLORS.primary, fontWeight: 700 }}>MNIST</span>: 머신러닝의 "Hello World"<br/>
              손으로 쓴 숫자 0~9를 분류하는 과제
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { label: "학습 데이터", value: "60,000장" },
              { label: "테스트 데이터", value: "10,000장" },
              { label: "이미지 크기", value: "28×28 픽셀" },
              { label: "채널", value: "흑백 (1채널)" },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>{item.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.accent }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div key={num} style={{ width: 80, height: 80, background: "rgba(255,255,255,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700, color: COLORS.light }}>
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneDataLoading: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene03_data_loading.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 52, color: COLORS.primary, marginBottom: 40 }}>📦 데이터 로딩</h1>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 30, fontFamily: "monospace" }}>
        <div style={{ fontSize: 22, color: "#a855f7", marginBottom: 10 }}># PyTorch 데이터 로딩</div>
        <div style={{ fontSize: 24, color: COLORS.light, lineHeight: 1.8 }}>
          <span style={{ color: "#f472b6" }}>from</span> torchvision <span style={{ color: "#f472b6" }}>import</span> datasets, transforms<br/><br/>
          transform = transforms.Compose([<br/>
          &nbsp;&nbsp;transforms.ToTensor(),<br/>
          &nbsp;&nbsp;transforms.Normalize((0.1307,), (0.3081,))<br/>
          ])<br/><br/>
          train_data = datasets.MNIST(<br/>
          &nbsp;&nbsp;root=<span style={{ color: "#a3e635" }}>'./data'</span>,<br/>
          &nbsp;&nbsp;train=<span style={{ color: "#60a5fa" }}>True</span>,<br/>
          &nbsp;&nbsp;download=<span style={{ color: "#60a5fa" }}>True</span>,<br/>
          &nbsp;&nbsp;transform=transform<br/>
          )
        </div>
      </div>
      <div style={{ marginTop: 30, display: "flex", gap: 20 }}>
        <div style={{ flex: 1, background: "rgba(168,85,247,0.2)", borderRadius: 15, padding: 20 }}>
          <span style={{ fontSize: 22, color: COLORS.light }}>✓ ToTensor(): 0~255 → 0~1 변환</span>
        </div>
        <div style={{ flex: 1, background: "rgba(168,85,247,0.2)", borderRadius: 15, padding: 20 }}>
          <span style={{ fontSize: 22, color: COLORS.light }}>✓ Normalize(): 평균/표준편차 정규화</span>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneModelStructure: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene04_model_structure.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 52, color: COLORS.primary, marginBottom: 40 }}>🏗️ CNN 모델 구조</h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 15 }}>
        {[
          { name: "Conv1", size: "1→32", color: "#06b6d4" },
          { name: "Pool", size: "2×2", color: "#8b5cf6" },
          { name: "Conv2", size: "32→64", color: "#06b6d4" },
          { name: "Pool", size: "2×2", color: "#8b5cf6" },
          { name: "FC1", size: "9216→128", color: "#f59e0b" },
          { name: "FC2", size: "128→10", color: "#10b981" },
        ].map((layer, i) => (
          <React.Fragment key={i}>
            <div style={{ padding: "20px 25px", background: layer.color, borderRadius: 15, textAlign: "center", minWidth: 100 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.light }}>{layer.name}</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 5 }}>{layer.size}</div>
            </div>
            {i < 5 && <span style={{ fontSize: 30, color: "rgba(255,255,255,0.5)" }}>→</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 50, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 25 }}>
        {[
          { title: "입력", desc: "28×28×1 (MNIST 이미지)" },
          { title: "특징 추출", desc: "Conv + ReLU + MaxPool" },
          { title: "분류", desc: "Flatten → FC → Softmax" },
        ].map((item, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 15, padding: 25, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.accent, marginBottom: 10 }}>{item.title}</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

const SceneModelCode: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene05_model_code.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 52, color: COLORS.primary, marginBottom: 30 }}>💻 모델 코드</h1>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 30, fontFamily: "monospace" }}>
        <div style={{ fontSize: 20, color: COLORS.light, lineHeight: 1.7 }}>
          <span style={{ color: "#f472b6" }}>class</span> <span style={{ color: "#a3e635" }}>CNN</span>(nn.Module):<br/>
          &nbsp;&nbsp;<span style={{ color: "#f472b6" }}>def</span> <span style={{ color: "#60a5fa" }}>__init__</span>(self):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;super().__init__()<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;self.conv1 = nn.Conv2d(<span style={{ color: "#c084fc" }}>1</span>, <span style={{ color: "#c084fc" }}>32</span>, <span style={{ color: "#c084fc" }}>3</span>, <span style={{ color: "#c084fc" }}>1</span>)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;self.conv2 = nn.Conv2d(<span style={{ color: "#c084fc" }}>32</span>, <span style={{ color: "#c084fc" }}>64</span>, <span style={{ color: "#c084fc" }}>3</span>, <span style={{ color: "#c084fc" }}>1</span>)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;self.fc1 = nn.Linear(<span style={{ color: "#c084fc" }}>9216</span>, <span style={{ color: "#c084fc" }}>128</span>)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;self.fc2 = nn.Linear(<span style={{ color: "#c084fc" }}>128</span>, <span style={{ color: "#c084fc" }}>10</span>)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;self.pool = nn.MaxPool2d(<span style={{ color: "#c084fc" }}>2</span>, <span style={{ color: "#c084fc" }}>2</span>)
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneTrainingSetup: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene06_training_setup.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 52, color: COLORS.primary, marginBottom: 40 }}>⚙️ 학습 설정</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 30 }}>
        <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 30, fontFamily: "monospace" }}>
          <div style={{ fontSize: 24, color: COLORS.accent, marginBottom: 15 }}>손실 함수 & 최적화</div>
          <div style={{ fontSize: 22, color: COLORS.light, lineHeight: 1.8 }}>
            criterion = nn.CrossEntropyLoss()<br/><br/>
            optimizer = optim.Adam(<br/>
            &nbsp;&nbsp;model.parameters(),<br/>
            &nbsp;&nbsp;lr=<span style={{ color: "#c084fc" }}>0.001</span><br/>
            )
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "손실 함수", value: "CrossEntropyLoss", desc: "다중 클래스 분류용" },
            { label: "최적화기", value: "Adam", desc: "적응형 학습률" },
            { label: "학습률", value: "0.001", desc: "일반적인 시작값" },
            { label: "배치 크기", value: "64", desc: "GPU 메모리 고려" },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(168,85,247,0.15)", borderRadius: 15, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>{item.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.light }}>{item.value}</div>
              </div>
              <div style={{ fontSize: 18, color: COLORS.accent }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneTrainingLoop: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene07_training_loop.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 52, color: COLORS.primary, marginBottom: 30 }}>🔄 학습 루프</h1>
      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 30, fontFamily: "monospace" }}>
        <div style={{ fontSize: 20, color: COLORS.light, lineHeight: 1.8 }}>
          <span style={{ color: "#f472b6" }}>for</span> epoch <span style={{ color: "#f472b6" }}>in</span> range(epochs):<br/>
          &nbsp;&nbsp;<span style={{ color: "#f472b6" }}>for</span> data, target <span style={{ color: "#f472b6" }}>in</span> train_loader:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#64748b" }}># 1. 기울기 초기화</span><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;optimizer.zero_grad()<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#64748b" }}># 2. 순전파</span><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;output = model(data)<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#64748b" }}># 3. 손실 계산</span><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;loss = criterion(output, target)<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#64748b" }}># 4. 역전파</span><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;loss.backward()<br/><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#64748b" }}># 5. 가중치 업데이트</span><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;optimizer.step()
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneTrainingRun: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene08_training_run.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 52, color: COLORS.primary, marginBottom: 40 }}>📊 학습 실행 결과</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 20, padding: 25 }}>
            {[1, 2, 3, 4, 5].map((epoch) => (
              <div key={epoch} style={{ display: "flex", justifyContent: "space-between", padding: "15px 0", borderBottom: epoch < 5 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <span style={{ fontSize: 22, color: COLORS.light }}>Epoch {epoch}</span>
                <span style={{ fontSize: 22, color: COLORS.accent }}>Loss: {(0.5 - epoch * 0.08).toFixed(3)}</span>
                <span style={{ fontSize: 22, color: COLORS.success }}>Acc: {(90 + epoch * 1.5).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30 }}>
          <div style={{ background: "rgba(16,185,129,0.2)", borderRadius: 20, padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>최종 정확도</div>
            <div style={{ fontSize: 60, fontWeight: 800, color: COLORS.success }}>98.5%</div>
          </div>
          <div style={{ background: "rgba(168,85,247,0.2)", borderRadius: 20, padding: 25, textAlign: "center" }}>
            <span style={{ fontSize: 22, color: COLORS.light }}>5 에포크 학습, 약 1분 소요 (GPU)</span>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const ScenePrediction: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene09_prediction.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 52, color: COLORS.primary, marginBottom: 40 }}>🎯 예측 코드</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, background: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 30, fontFamily: "monospace" }}>
          <div style={{ fontSize: 20, color: COLORS.light, lineHeight: 1.8 }}>
            model.eval()<br/><br/>
            <span style={{ color: "#f472b6" }}>with</span> torch.no_grad():<br/>
            &nbsp;&nbsp;output = model(image)<br/>
            &nbsp;&nbsp;pred = output.argmax(dim=<span style={{ color: "#c084fc" }}>1</span>)<br/>
            &nbsp;&nbsp;<span style={{ color: "#f472b6" }}>print</span>(f<span style={{ color: "#a3e635" }}>"예측: {'{'}pred.item(){'}'}"</span>)
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
          <div style={{ background: "rgba(168,85,247,0.15)", borderRadius: 15, padding: 20 }}>
            <span style={{ fontSize: 22, color: COLORS.light }}>✓ model.eval(): 평가 모드 전환</span>
          </div>
          <div style={{ background: "rgba(168,85,247,0.15)", borderRadius: 15, padding: 20 }}>
            <span style={{ fontSize: 22, color: COLORS.light }}>✓ torch.no_grad(): 기울기 계산 비활성화</span>
          </div>
          <div style={{ background: "rgba(168,85,247,0.15)", borderRadius: 15, padding: 20 }}>
            <span style={{ fontSize: 22, color: COLORS.light }}>✓ argmax(): 가장 높은 확률의 클래스</span>
          </div>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneMlpComparison: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background, fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene10_mlp_comparison.mp3")} />
    <div style={{ padding: 80, paddingTop: 100 }}>
      <h1 style={{ fontSize: 52, color: COLORS.primary, marginBottom: 40 }}>📈 MLP vs CNN 비교</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1, background: "rgba(239,68,68,0.15)", borderRadius: 20, padding: 30, border: `2px solid ${COLORS.danger}40` }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.danger, marginBottom: 25 }}>MLP</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <div style={{ fontSize: 22, color: COLORS.light }}>• 정확도: ~97%</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>• 파라미터: ~400,000개</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>• 공간 정보 손실</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>• 이미지 크기에 민감</div>
          </div>
        </div>
        <div style={{ flex: 1, background: "rgba(16,185,129,0.15)", borderRadius: 20, padding: 30, border: `2px solid ${COLORS.success}40` }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.success, marginBottom: 25 }}>CNN</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <div style={{ fontSize: 22, color: COLORS.light }}>• 정확도: ~99%</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>• 파라미터: ~100,000개</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>• 공간 정보 보존</div>
            <div style={{ fontSize: 22, color: COLORS.light }}>• 위치 불변성</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, padding: 25, background: "rgba(168,85,247,0.2)", borderRadius: 15, textAlign: "center" }}>
        <span style={{ fontSize: 26, color: COLORS.light }}>CNN이 더 적은 파라미터로 더 높은 정확도를 달성!</span>
      </div>
    </div>
  </AbsoluteFill>
);

const SceneOutro: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.gradient, justifyContent: "center", alignItems: "center", fontFamily: "Pretendard, sans-serif" }}>
    <GlobalOverlay />
    <Audio src={staticFile("audio/lesson-5-5/scene11_outro.mp3")} />
    <div style={{ textAlign: "center", padding: 80 }}>
      <h1 style={{ fontSize: 56, color: COLORS.light, marginBottom: 50 }}>📝 오늘의 정리</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
        {[
          "MNIST: 28×28 손글씨 숫자 데이터셋",
          "CNN 구조: Conv → Pool → FC",
          "학습 루프: 기울기 초기화 → 순전파 → 역전파 → 업데이트",
          "CNN이 MLP보다 이미지 분류에 효과적",
        ].map((item, i) => (
          <div key={i} style={{ padding: "20px 30px", background: "rgba(255,255,255,0.15)", borderRadius: 15, borderLeft: `5px solid ${COLORS.accent}`, textAlign: "left" }}>
            <span style={{ fontSize: 26, color: COLORS.light }}>✓ {item}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 50, padding: "25px 50px", background: "rgba(0,0,0,0.3)", borderRadius: 20 }}>
        <span style={{ fontSize: 28, color: COLORS.light }}>다음 시간: <span style={{ fontWeight: 700 }}>CIFAR-10으로 더 어려운 분류!</span></span>
      </div>
    </div>
  </AbsoluteFill>
);

export const Lesson5_5Video: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.background }}>
    <Sequence from={SCENE_TIMINGS.intro.start} durationInFrames={SCENE_TIMINGS.intro.duration}><SceneIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.mnist_intro.start} durationInFrames={SCENE_TIMINGS.mnist_intro.duration}><SceneMnistIntro /></Sequence>
    <Sequence from={SCENE_TIMINGS.data_loading.start} durationInFrames={SCENE_TIMINGS.data_loading.duration}><SceneDataLoading /></Sequence>
    <Sequence from={SCENE_TIMINGS.model_structure.start} durationInFrames={SCENE_TIMINGS.model_structure.duration}><SceneModelStructure /></Sequence>
    <Sequence from={SCENE_TIMINGS.model_code.start} durationInFrames={SCENE_TIMINGS.model_code.duration}><SceneModelCode /></Sequence>
    <Sequence from={SCENE_TIMINGS.training_setup.start} durationInFrames={SCENE_TIMINGS.training_setup.duration}><SceneTrainingSetup /></Sequence>
    <Sequence from={SCENE_TIMINGS.training_loop.start} durationInFrames={SCENE_TIMINGS.training_loop.duration}><SceneTrainingLoop /></Sequence>
    <Sequence from={SCENE_TIMINGS.training_run.start} durationInFrames={SCENE_TIMINGS.training_run.duration}><SceneTrainingRun /></Sequence>
    <Sequence from={SCENE_TIMINGS.prediction.start} durationInFrames={SCENE_TIMINGS.prediction.duration}><ScenePrediction /></Sequence>
    <Sequence from={SCENE_TIMINGS.mlp_comparison.start} durationInFrames={SCENE_TIMINGS.mlp_comparison.duration}><SceneMlpComparison /></Sequence>
    <Sequence from={SCENE_TIMINGS.outro.start} durationInFrames={SCENE_TIMINGS.outro.duration}><SceneOutro /></Sequence>
  </AbsoluteFill>
);
