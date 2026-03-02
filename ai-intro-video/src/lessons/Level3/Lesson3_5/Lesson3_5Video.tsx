/**
 * Lesson 3-5: 역전파 이론 (Backpropagation Theory) - Main Video
 */

import { Composition, Sequence, AbsoluteFill } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_WhyBackprop } from "./Scene2_WhyBackprop";
import { Scene3_ChainRule } from "./Scene3_ChainRule";
import { Scene4_SimpleExample } from "./Scene4_SimpleExample";
import { Scene5_MultiLayer } from "./Scene5_MultiLayer";
import { Scene6_Steps } from "./Scene6_Steps";
import { Scene7_Outro } from "./Scene7_Outro";

// Audio duration based timings (30fps)
const SCENE_TIMINGS = {
  scene1: { start: 0, duration: 930 },
  scene2: { start: 930, duration: 1066 },
  scene3: { start: 1996, duration: 1319 },
  scene4: { start: 3315, duration: 1331 },
  scene5: { start: 4646, duration: 1051 },
  scene6: { start: 5697, duration: 1155 },
  scene7: { start: 6852, duration: 1055 },
};

export const LESSON_3_5_DURATION = 7907;

export const Lesson3_5Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <Scene2_WhyBackprop />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <Scene3_ChainRule />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <Scene4_SimpleExample />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <Scene5_MultiLayer />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <Scene6_Steps />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
