/**
 * Lesson 3-7: 활성화 함수 (Activation Functions) - Main Video
 */

import { Sequence, AbsoluteFill } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_WhyNeeded } from "./Scene2_WhyNeeded";
import { Scene3_Sigmoid } from "./Scene3_Sigmoid";
import { Scene4_Tanh } from "./Scene4_Tanh";
import { Scene5_ReLU } from "./Scene5_ReLU";
import { Scene6_Softmax } from "./Scene6_Softmax";
import { Scene7_Outro } from "./Scene7_Outro";

// Audio duration based timings (30fps)
const SCENE_TIMINGS = {
  scene1: { start: 0, duration: 726 },
  scene2: { start: 726, duration: 871 },
  scene3: { start: 1597, duration: 973 },
  scene4: { start: 2570, duration: 889 },
  scene5: { start: 3459, duration: 1057 },
  scene6: { start: 4516, duration: 937 },
  scene7: { start: 5453, duration: 852 },
};

export const LESSON_3_7_DURATION = 6305;

export const Lesson3_7Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <Scene2_WhyNeeded />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <Scene3_Sigmoid />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <Scene4_Tanh />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <Scene5_ReLU />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <Scene6_Softmax />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
