/**
 * Lesson 2-4: 연쇄법칙
 * 메인 비디오 컴포넌트
 */

import { Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_CompositeFunction } from "./Scene2_CompositeFunction";
import { Scene3_ChainRuleFormula } from "./Scene3_ChainRuleFormula";
import { Scene4_NeuralNetwork } from "./Scene4_NeuralNetwork";
import { Scene5_Backpropagation } from "./Scene5_Backpropagation";
import { Scene6_Outro } from "./Scene6_Outro";

// 씬별 프레임 (오디오 분석 결과)
const SCENE_DURATIONS = {
  scene1: 853,
  scene2: 1164,
  scene3: 1268,
  scene4: 1272,
  scene5: 1183,
  scene6: 1152,
};

// 총 duration 계산
export const LESSON_2_4_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const Lesson2_4Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <>
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1} name="Scene1_Intro">
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene1)} durationInFrames={SCENE_DURATIONS.scene2} name="Scene2_CompositeFunction">
        <Scene2_CompositeFunction />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene2)} durationInFrames={SCENE_DURATIONS.scene3} name="Scene3_ChainRuleFormula">
        <Scene3_ChainRuleFormula />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene3)} durationInFrames={SCENE_DURATIONS.scene4} name="Scene4_NeuralNetwork">
        <Scene4_NeuralNetwork />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene4)} durationInFrames={SCENE_DURATIONS.scene5} name="Scene5_Backpropagation">
        <Scene5_Backpropagation />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene5)} durationInFrames={SCENE_DURATIONS.scene6} name="Scene6_Outro">
        <Scene6_Outro />
      </Sequence>
    </>
  );
};
