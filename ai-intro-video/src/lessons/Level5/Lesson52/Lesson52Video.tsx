/**
 * Lesson 5-2: 합성곱 연산 이해하기
 * CNN의 핵심 연산인 합성곱에 대해 배웁니다.
 */

import { Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Kernel } from "./Scene2_Kernel";
import { Scene3_Operation } from "./Scene3_Operation";
import { Scene4_Calculation } from "./Scene4_Calculation";
import { Scene5_StridePadding } from "./Scene5_StridePadding";
import { Scene6_KernelEffects } from "./Scene6_KernelEffects";
import { Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 씬 길이 (30fps)
const SCENE_DURATIONS = {
  scene1: 1057,  // 35.26s
  scene2: 1028,  // 34.30s
  scene3: 990,   // 33.00s
  scene4: 977,   // 32.57s
  scene5: 940,   // 31.34s
  scene6: 1037,  // 34.58s
  scene7: 1056,  // 35.21s
};

// 전체 영상 길이
export const LESSON52_DURATION =
  SCENE_DURATIONS.scene1 +
  SCENE_DURATIONS.scene2 +
  SCENE_DURATIONS.scene3 +
  SCENE_DURATIONS.scene4 +
  SCENE_DURATIONS.scene5 +
  SCENE_DURATIONS.scene6 +
  SCENE_DURATIONS.scene7;  // 7085 frames = ~236.17s

export const Lesson52Video: React.FC = () => {
  let currentFrame = 0;

  return (
    <>
      {/* Scene 1: 인트로 - 합성곱이란 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1_Intro />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene1)}

      {/* Scene 2: 커널/필터 개념 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2_Kernel />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene2)}

      {/* Scene 3: 합성곱 연산 과정 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3_Operation />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene3)}

      {/* Scene 4: 구체적 계산 예시 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4_Calculation />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene4)}

      {/* Scene 5: 스트라이드와 패딩 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene5}>
        <Scene5_StridePadding />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene5)}

      {/* Scene 6: 다양한 커널의 효과 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene6}>
        <Scene6_KernelEffects />
      </Sequence>
      {(currentFrame += SCENE_DURATIONS.scene6)}

      {/* Scene 7: 아웃트로 - 정리 및 다음 강의 예고 */}
      <Sequence from={currentFrame} durationInFrames={SCENE_DURATIONS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </>
  );
};
