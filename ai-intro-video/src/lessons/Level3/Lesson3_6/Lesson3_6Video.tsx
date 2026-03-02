/**
 * Lesson 3-6: 역전파 구현 (Backpropagation Implementation) - Main Video
 */

import { Sequence, AbsoluteFill } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Setup } from "./Scene2_Setup";
import { Scene3_Forward1 } from "./Scene3_Forward1";
import { Scene4_Forward2 } from "./Scene4_Forward2";
import { Scene5_Backward1 } from "./Scene5_Backward1";
import { Scene6_Backward2 } from "./Scene6_Backward2";
import { Scene7_Outro } from "./Scene7_Outro";

// Audio duration based timings (30fps)
const SCENE_TIMINGS = {
  scene1: { start: 0, duration: 644 },
  scene2: { start: 644, duration: 863 },
  scene3: { start: 1507, duration: 1051 },
  scene4: { start: 2558, duration: 964 },
  scene5: { start: 3522, duration: 954 },
  scene6: { start: 4476, duration: 912 },
  scene7: { start: 5388, duration: 849 },
};

export const LESSON_3_6_DURATION = 6237;

export const Lesson3_6Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <Scene2_Setup />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <Scene3_Forward1 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <Scene4_Forward2 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <Scene5_Backward1 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <Scene6_Backward2 />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
