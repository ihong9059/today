/**
 * Lesson 2-3: 편미분
 * 메인 비디오 컴포넌트
 */

import { Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_WhyPartial } from "./Scene2_WhyPartial";
import { Scene3_Calculate } from "./Scene3_Calculate";
import { Scene4_Gradient } from "./Scene4_Gradient";
import { Scene5_NeuralNetwork } from "./Scene5_NeuralNetwork";
import { Scene6_Outro } from "./Scene6_Outro";

// 씬별 프레임 (오디오 분석 결과)
const SCENE_DURATIONS = {
  scene1: 1301,
  scene2: 1324,
  scene3: 1813,
  scene4: 1504,
  scene5: 1813,
  scene6: 1610,
};

// 총 duration 계산
export const LESSON_2_3_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const Lesson2_3Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <>
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1} name="Scene1_Intro">
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene1)} durationInFrames={SCENE_DURATIONS.scene2} name="Scene2_WhyPartial">
        <Scene2_WhyPartial />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene2)} durationInFrames={SCENE_DURATIONS.scene3} name="Scene3_Calculate">
        <Scene3_Calculate />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene3)} durationInFrames={SCENE_DURATIONS.scene4} name="Scene4_Gradient">
        <Scene4_Gradient />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene4)} durationInFrames={SCENE_DURATIONS.scene5} name="Scene5_NeuralNetwork">
        <Scene5_NeuralNetwork />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene5)} durationInFrames={SCENE_DURATIONS.scene6} name="Scene6_Outro">
        <Scene6_Outro />
      </Sequence>
    </>
  );
};
