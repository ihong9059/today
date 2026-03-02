/**
 * Lesson 2-5: 벡터와 행렬 기초 + GPU/HBM
 * 메인 비디오 컴포넌트
 */

import { Sequence, Audio, staticFile } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Vector } from "./Scene2_Vector";
import { Scene3_Matrix } from "./Scene3_Matrix";
import { Scene4_MatrixMultiplication } from "./Scene4_MatrixMultiplication";
import { Scene5_WhyGPU } from "./Scene5_WhyGPU";
import { Scene6_HBM } from "./Scene6_HBM";
import { Scene7_RealWorld } from "./Scene7_RealWorld";
import { Scene8_Outro } from "./Scene8_Outro";

// 씬별 프레임 (오디오 분석 결과)
const SCENE_DURATIONS = {
  scene1: 827,
  scene2: 1153,
  scene3: 1014,
  scene4: 1220,
  scene5: 1357,
  scene6: 1562,
  scene7: 1356,
  scene8: 1428,
};

// 총 duration 계산
export const LESSON_2_5_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const Lesson2_5Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <>
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1} name="Scene1_Intro">
        <Scene1_Intro />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene1)} durationInFrames={SCENE_DURATIONS.scene2} name="Scene2_Vector">
        <Scene2_Vector />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene2)} durationInFrames={SCENE_DURATIONS.scene3} name="Scene3_Matrix">
        <Scene3_Matrix />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene3)} durationInFrames={SCENE_DURATIONS.scene4} name="Scene4_MatrixMultiplication">
        <Scene4_MatrixMultiplication />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene4)} durationInFrames={SCENE_DURATIONS.scene5} name="Scene5_WhyGPU">
        <Scene5_WhyGPU />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene5)} durationInFrames={SCENE_DURATIONS.scene6} name="Scene6_HBM">
        <Scene6_HBM />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene6)} durationInFrames={SCENE_DURATIONS.scene7} name="Scene7_RealWorld">
        <Scene7_RealWorld />
      </Sequence>

      <Sequence from={(currentFrame += SCENE_DURATIONS.scene7)} durationInFrames={SCENE_DURATIONS.scene8} name="Scene8_Outro">
        <Scene8_Outro />
      </Sequence>
    </>
  );
};
