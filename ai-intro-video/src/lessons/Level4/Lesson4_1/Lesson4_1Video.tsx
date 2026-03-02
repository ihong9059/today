/**
 * Lesson 4-1: MNIST 손글씨 분류
 * 메인 비디오 컴포넌트
 */

import { Composition, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_MNISTData } from "./Scene2_MNISTData";
import { Scene3_ModelDesign } from "./Scene3_ModelDesign";
import { Scene4_PyTorchCode } from "./Scene4_PyTorchCode";
import { Scene5_TrainingSetup } from "./Scene5_TrainingSetup";
import { Scene6_TrainingLoop } from "./Scene6_TrainingLoop";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1: { duration: 890, start: 0 },
  scene2: { duration: 868, start: 890 },
  scene3: { duration: 1066, start: 1758 },
  scene4: { duration: 948, start: 2824 },
  scene5: { duration: 930, start: 3772 },
  scene6: { duration: 938, start: 4702 },
  scene7: { duration: 939, start: 5640 },
};

export const LESSON_4_1_DURATION = 6579;

export const Lesson4_1Video: React.FC = () => {
  return (
    <>
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <Scene2_MNISTData />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <Scene3_ModelDesign />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <Scene4_PyTorchCode />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <Scene5_TrainingSetup />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <Scene6_TrainingLoop />
      </Sequence>

      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
