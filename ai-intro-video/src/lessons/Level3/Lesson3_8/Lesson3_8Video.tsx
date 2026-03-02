/**
 * Lesson 3-8: 과적합과 정규화 - 메인 비디오
 */

import { Composition, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Overfitting } from "./Scene2_Overfitting";
import { Scene3_Detection } from "./Scene3_Detection";
import { Scene4_L2 } from "./Scene4_L2";
import { Scene5_Dropout } from "./Scene5_Dropout";
import { Scene6_Other } from "./Scene6_Other";
import { Scene7_Outro } from "./Scene7_Outro";

const SCENE_TIMINGS = {
  scene1: { start: 0, duration: 707 },
  scene2: { start: 707, duration: 744 },
  scene3: { start: 1451, duration: 800 },
  scene4: { start: 2251, duration: 721 },
  scene5: { start: 2972, duration: 927 },
  scene6: { start: 3899, duration: 732 },
  scene7: { start: 4631, duration: 918 },
};

export const LESSON_3_8_DURATION = 5549;

export const Lesson3_8Video: React.FC = () => {
  return (
    <>
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <Scene1_Intro />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <Scene2_Overfitting />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <Scene3_Detection />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <Scene4_L2 />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <Scene5_Dropout />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <Scene6_Other />
      </Sequence>
      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
