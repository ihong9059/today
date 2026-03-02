/**
 * Lesson 4-3: 텍스트 분류
 * 메인 비디오 컴포넌트
 */

import { Composition, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Tokenization } from "./Scene2_Tokenization";
import { Scene3_Embedding } from "./Scene3_Embedding";
import { Scene4_ModelArchitecture } from "./Scene4_ModelArchitecture";
import { Scene5_PyTorchCode } from "./Scene5_PyTorchCode";
import { Scene6_Training } from "./Scene6_Training";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 씬 타이밍
export const SCENE_TIMINGS = {
  scene1: 817,
  scene2: 1075,
  scene3: 936,
  scene4: 936,
  scene5: 848,
  scene6: 911,
  scene7: 1022,
};

export const LESSON_4_3_DURATION =
  SCENE_TIMINGS.scene1 +
  SCENE_TIMINGS.scene2 +
  SCENE_TIMINGS.scene3 +
  SCENE_TIMINGS.scene4 +
  SCENE_TIMINGS.scene5 +
  SCENE_TIMINGS.scene6 +
  SCENE_TIMINGS.scene7;

export const Lesson4_3Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <>
      <Sequence from={currentFrame} durationInFrames={SCENE_TIMINGS.scene1}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene1)} durationInFrames={SCENE_TIMINGS.scene2}>
        <Scene2_Tokenization />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene2)} durationInFrames={SCENE_TIMINGS.scene3}>
        <Scene3_Embedding />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene3)} durationInFrames={SCENE_TIMINGS.scene4}>
        <Scene4_ModelArchitecture />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene4)} durationInFrames={SCENE_TIMINGS.scene5}>
        <Scene5_PyTorchCode />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene5)} durationInFrames={SCENE_TIMINGS.scene6}>
        <Scene6_Training />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_TIMINGS.scene6)} durationInFrames={SCENE_TIMINGS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
