/**
 * Lesson 3-2: 경사하강법 기본
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Intuition } from "./Scene2_Intuition";
import { Scene3_Formula } from "./Scene3_Formula";
import { Scene4_LearningRate } from "./Scene4_LearningRate";
import { Scene5_Convergence } from "./Scene5_Convergence";
import { Scene6_PyTorchCode } from "./Scene6_PyTorchCode";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1: { duration: 942, start: 0 },
  scene2: { duration: 1379, start: 942 },
  scene3: { duration: 1557, start: 2321 },
  scene4: { duration: 1503, start: 3878 },
  scene5: { duration: 1526, start: 5381 },
  scene6: { duration: 1727, start: 6907 },
  scene7: { duration: 1406, start: 8634 },
};

export const LESSON_3_2_DURATION = 10040;

export const Lesson3_2Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: 인트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene1.start}
        durationInFrames={SCENE_TIMINGS.scene1.duration}
      >
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: 경사하강법 직관 */}
      <Sequence
        from={SCENE_TIMINGS.scene2.start}
        durationInFrames={SCENE_TIMINGS.scene2.duration}
      >
        <Scene2_Intuition />
      </Sequence>

      {/* Scene 3: 핵심 공식 */}
      <Sequence
        from={SCENE_TIMINGS.scene3.start}
        durationInFrames={SCENE_TIMINGS.scene3.duration}
      >
        <Scene3_Formula />
      </Sequence>

      {/* Scene 4: 학습률 */}
      <Sequence
        from={SCENE_TIMINGS.scene4.start}
        durationInFrames={SCENE_TIMINGS.scene4.duration}
      >
        <Scene4_LearningRate />
      </Sequence>

      {/* Scene 5: 수렴 과정 */}
      <Sequence
        from={SCENE_TIMINGS.scene5.start}
        durationInFrames={SCENE_TIMINGS.scene5.duration}
      >
        <Scene5_Convergence />
      </Sequence>

      {/* Scene 6: PyTorch 코드 */}
      <Sequence
        from={SCENE_TIMINGS.scene6.start}
        durationInFrames={SCENE_TIMINGS.scene6.duration}
      >
        <Scene6_PyTorchCode />
      </Sequence>

      {/* Scene 7: 아웃트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene7.start}
        durationInFrames={SCENE_TIMINGS.scene7.duration}
      >
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
