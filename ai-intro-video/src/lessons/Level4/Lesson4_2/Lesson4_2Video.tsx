/**
 * Lesson 4-2: 이미지 분류 CNN
 * 메인 비디오 컴포넌트
 */

import { Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_WhyCNN } from "./Scene2_WhyCNN";
import { Scene3_Convolution } from "./Scene3_Convolution";
import { Scene4_Pooling } from "./Scene4_Pooling";
import { Scene5_PyTorchCode } from "./Scene5_PyTorchCode";
import { Scene6_Training } from "./Scene6_Training";
import { Scene7_Outro } from "./Scene7_Outro";

export const SCENE_TIMINGS = {
  scene1: { duration: 998, start: 0 },
  scene2: { duration: 1178, start: 998 },
  scene3: { duration: 1008, start: 2176 },
  scene4: { duration: 911, start: 3184 },
  scene5: { duration: 1047, start: 4095 },
  scene6: { duration: 886, start: 5142 },
  scene7: { duration: 1015, start: 6028 },
};

export const LESSON_4_2_DURATION = 7043;

export const Lesson4_2Video: React.FC = () => {
  return (
    <>
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <Scene2_WhyCNN />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <Scene3_Convolution />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <Scene4_Pooling />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <Scene5_PyTorchCode />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <Scene6_Training />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
