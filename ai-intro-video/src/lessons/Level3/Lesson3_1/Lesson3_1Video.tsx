/**
 * Lesson 3-1: 손실 함수
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_WhyLossFunction } from "./Scene2_WhyLossFunction";
import { Scene3_MSE } from "./Scene3_MSE";
import { Scene4_CrossEntropy } from "./Scene4_CrossEntropy";
import { Scene5_Comparison } from "./Scene5_Comparison";
import { Scene6_LossLandscape } from "./Scene6_LossLandscape";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1: { duration: 1075, start: 0 },
  scene2: { duration: 1551, start: 1075 },
  scene3: { duration: 1591, start: 2626 },
  scene4: { duration: 1798, start: 4217 },
  scene5: { duration: 1707, start: 6015 },
  scene6: { duration: 1767, start: 7722 },
  scene7: { duration: 1320, start: 9489 },
};

export const LESSON_3_1_DURATION = 10809;

export const Lesson3_1Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: 인트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene1.start}
        durationInFrames={SCENE_TIMINGS.scene1.duration}
      >
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: 왜 손실 함수가 필요한가 */}
      <Sequence
        from={SCENE_TIMINGS.scene2.start}
        durationInFrames={SCENE_TIMINGS.scene2.duration}
      >
        <Scene2_WhyLossFunction />
      </Sequence>

      {/* Scene 3: MSE */}
      <Sequence
        from={SCENE_TIMINGS.scene3.start}
        durationInFrames={SCENE_TIMINGS.scene3.duration}
      >
        <Scene3_MSE />
      </Sequence>

      {/* Scene 4: Cross-Entropy */}
      <Sequence
        from={SCENE_TIMINGS.scene4.start}
        durationInFrames={SCENE_TIMINGS.scene4.duration}
      >
        <Scene4_CrossEntropy />
      </Sequence>

      {/* Scene 5: 손실 함수 비교 */}
      <Sequence
        from={SCENE_TIMINGS.scene5.start}
        durationInFrames={SCENE_TIMINGS.scene5.duration}
      >
        <Scene5_Comparison />
      </Sequence>

      {/* Scene 6: 손실 지형 */}
      <Sequence
        from={SCENE_TIMINGS.scene6.start}
        durationInFrames={SCENE_TIMINGS.scene6.duration}
      >
        <Scene6_LossLandscape />
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
