/**
 * Lesson 5-3: 풀링과 정규화
 * 풀링 레이어와 정규화 기법에 대해 배웁니다.
 */

import { Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_MaxPooling } from "./Scene2_MaxPooling";
import { Scene3_AvgPooling } from "./Scene3_AvgPooling";
import { Scene4_BatchNorm } from "./Scene4_BatchNorm";
import { Scene5_BatchNormEffect } from "./Scene5_BatchNormEffect";
import { Scene6_Dropout } from "./Scene6_Dropout";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 씬 길이 (30fps)
const SCENE_DURATIONS = {
  scene1: 1260,  // 42.00s
  scene2: 1332,  // 44.40s
  scene3: 1481,  // 49.37s
  scene4: 1555,  // 51.86s
  scene5: 1371,  // 45.72s
  scene6: 1347,  // 44.90s
  scene7: 1508,  // 50.28s
};

// 전체 영상 길이
export const LESSON53_DURATION =
  SCENE_DURATIONS.scene1 +
  SCENE_DURATIONS.scene2 +
  SCENE_DURATIONS.scene3 +
  SCENE_DURATIONS.scene4 +
  SCENE_DURATIONS.scene5 +
  SCENE_DURATIONS.scene6 +
  SCENE_DURATIONS.scene7;  // 9854 frames = ~328.47s

export const Lesson53Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <>
      {/* Scene 1: 인트로 - 풀링과 정규화 소개 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1_Intro />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene1)}

      {/* Scene 2: Max Pooling */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2_MaxPooling />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene2)}

      {/* Scene 3: Average Pooling & GAP */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3_AvgPooling />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene3)}

      {/* Scene 4: Batch Normalization 원리 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4_BatchNorm />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene4)}

      {/* Scene 5: BatchNorm 효과와 구현 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene5}>
        <Scene5_BatchNormEffect />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene5)}

      {/* Scene 6: Dropout */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene6}>
        <Scene6_Dropout />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene6)}

      {/* Scene 7: 아웃트로 - 정리 및 다음 강의 예고 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
