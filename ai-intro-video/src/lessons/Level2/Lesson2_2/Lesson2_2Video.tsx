/**
 * Lesson 2-2: 미분의 기초
 * 메인 비디오 컴포넌트
 */

import { Sequence, Audio, staticFile } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_WhatIsDifferentiation } from "./Scene2_WhatIsDifferentiation";
import { Scene3_BasicFormulas } from "./Scene3_BasicFormulas";
import { Scene4_GradientDescent } from "./Scene4_GradientDescent";
import { Scene5_Formula } from "./Scene5_Formula";
import { Scene6_Example } from "./Scene6_Example";
import { Scene7_Outro } from "./Scene7_Outro";

// 씬별 프레임 (오디오 분석 결과)
const SCENE_DURATIONS = {
  scene1: 945,
  scene2: 1206,
  scene3: 1234,
  scene4: 1201,
  scene5: 1049,
  scene6: 1252,
  scene7: 1215,
};

// 총 duration 계산
export const LESSON_2_2_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const Lesson2_2Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <>
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1} name="Scene1_Intro">
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene1)} durationInFrames={SCENE_DURATIONS.scene2} name="Scene2_WhatIsDifferentiation">
        <Scene2_WhatIsDifferentiation />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene2)} durationInFrames={SCENE_DURATIONS.scene3} name="Scene3_BasicFormulas">
        <Scene3_BasicFormulas />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene3)} durationInFrames={SCENE_DURATIONS.scene4} name="Scene4_GradientDescent">
        <Scene4_GradientDescent />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene4)} durationInFrames={SCENE_DURATIONS.scene5} name="Scene5_Formula">
        <Scene5_Formula />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene5)} durationInFrames={SCENE_DURATIONS.scene6} name="Scene6_Example">
        <Scene6_Example />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene6)} durationInFrames={SCENE_DURATIONS.scene7} name="Scene7_Outro">
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
