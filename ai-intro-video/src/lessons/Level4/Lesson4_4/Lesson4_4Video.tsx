/**
 * Lesson 4-4: nn.Module 기초
 * 메인 비디오 컴포넌트
 */

import { Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_ModuleHierarchy } from "./Scene2_ModuleHierarchy";
import { Scene3_Init } from "./Scene3_Init";
import { Scene4_Forward } from "./Scene4_Forward";
import { Scene5_Parameters } from "./Scene5_Parameters";
import { Scene6_Sequential } from "./Scene6_Sequential";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 씬 타이밍
export const SCENE_TIMINGS = {
  scene1: 852,
  scene2: 1130,
  scene3: 1066,
  scene4: 1152,
  scene5: 1262,
  scene6: 1004,
  scene7: 923,
};

export const LESSON_4_4_DURATION =
  SCENE_TIMINGS.scene1 +
  SCENE_TIMINGS.scene2 +
  SCENE_TIMINGS.scene3 +
  SCENE_TIMINGS.scene4 +
  SCENE_TIMINGS.scene5 +
  SCENE_TIMINGS.scene6 +
  SCENE_TIMINGS.scene7;

export const Lesson4_4Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <>
      <Sequence from={currentFrame} durationInFrames={SCENE_TIMINGS.scene1}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene1)} durationInFrames={SCENE_TIMINGS.scene2}>
        <Scene2_ModuleHierarchy />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene2)} durationInFrames={SCENE_TIMINGS.scene3}>
        <Scene3_Init />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene3)} durationInFrames={SCENE_TIMINGS.scene4}>
        <Scene4_Forward />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene4)} durationInFrames={SCENE_TIMINGS.scene5}>
        <Scene5_Parameters />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene5)} durationInFrames={SCENE_TIMINGS.scene6}>
        <Scene6_Sequential />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene6)} durationInFrames={SCENE_TIMINGS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
