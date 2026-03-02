/**
 * Lesson 5-1: 컴퓨터 비전 소개
 * 메인 비디오 컴포넌트
 */

import { Composition, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Pixel } from "./Scene2_Pixel";
import { Scene3_Channel } from "./Scene3_Channel";
import { Scene4_Tensor } from "./Scene4_Tensor";
import { Scene5_Normalization } from "./Scene5_Normalization";
import { Scene6_PyTorch } from "./Scene6_PyTorch";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 씬 duration
const SCENE_DURATIONS = {
  scene1: 1149,
  scene2: 1154,
  scene3: 1486,
  scene4: 1385,
  scene5: 1212,
  scene6: 1067,
  scene7: 1112,
};

// 씬 시작 프레임 계산
const SCENE_STARTS = {
  scene1: 0,
  scene2: SCENE_DURATIONS.scene1,
  scene3: SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2,
  scene4: SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3,
  scene5: SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3 + SCENE_DURATIONS.scene4,
  scene6: SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3 + SCENE_DURATIONS.scene4 + SCENE_DURATIONS.scene5,
  scene7: SCENE_DURATIONS.scene1 + SCENE_DURATIONS.scene2 + SCENE_DURATIONS.scene3 + SCENE_DURATIONS.scene4 + SCENE_DURATIONS.scene5 + SCENE_DURATIONS.scene6,
};

// 총 duration
export const LESSON51_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const Lesson51Video: React.FC = () => {
  return (
    <>
      <Sequence from={SCENE_STARTS.scene1} durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={SCENE_STARTS.scene2} durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2_Pixel />
      </Sequence>

      <Sequence from={SCENE_STARTS.scene3} durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3_Channel />
      </Sequence>

      <Sequence from={SCENE_STARTS.scene4} durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4_Tensor />
      </Sequence>

      <Sequence from={SCENE_STARTS.scene5} durationInFrames={SCENE_DURATIONS.scene5}>
        <Scene5_Normalization />
      </Sequence>

      <Sequence from={SCENE_STARTS.scene6} durationInFrames={SCENE_DURATIONS.scene6}>
        <Scene6_PyTorch />
      </Sequence>

      <Sequence from={SCENE_STARTS.scene7} durationInFrames={SCENE_DURATIONS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
