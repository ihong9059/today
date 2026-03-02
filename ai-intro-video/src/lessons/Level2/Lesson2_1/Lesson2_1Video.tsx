/**
 * Lesson 2-1: 함수와 그래프
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_WhatIsFunction } from "./Scene2_WhatIsFunction";
import { Scene3_LinearFunction } from "./Scene3_LinearFunction";
import { Scene4_QuadraticFunction } from "./Scene4_QuadraticFunction";
import { Scene5_ExponentialFunction } from "./Scene5_ExponentialFunction";
import { Scene6_SigmoidFunction } from "./Scene6_SigmoidFunction";
import { Scene7_ReLUFunction } from "./Scene7_ReLUFunction";
import { Scene8_Summary } from "./Scene8_Summary";
import { Scene9_Outro } from "./Scene9_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1: { duration: 1258, start: 0 },
  scene2: { duration: 1424, start: 1258 },
  scene3: { duration: 1562, start: 2682 },
  scene4: { duration: 1494, start: 4244 },
  scene5: { duration: 1502, start: 5738 },
  scene6: { duration: 1637, start: 7240 },
  scene7: { duration: 1708, start: 8877 },
  scene8: { duration: 1632, start: 10585 },
  scene9: { duration: 1067, start: 12217 },
};

export const LESSON_2_1_DURATION = 13284;

export const Lesson2_1Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: 인트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene1.start}
        durationInFrames={SCENE_TIMINGS.scene1.duration}
      >
        <Scene1_Intro />
      </Sequence>

      {/* Scene 2: 함수란 무엇인가 */}
      <Sequence
        from={SCENE_TIMINGS.scene2.start}
        durationInFrames={SCENE_TIMINGS.scene2.duration}
      >
        <Scene2_WhatIsFunction />
      </Sequence>

      {/* Scene 3: 1차 함수 */}
      <Sequence
        from={SCENE_TIMINGS.scene3.start}
        durationInFrames={SCENE_TIMINGS.scene3.duration}
      >
        <Scene3_LinearFunction />
      </Sequence>

      {/* Scene 4: 2차 함수 */}
      <Sequence
        from={SCENE_TIMINGS.scene4.start}
        durationInFrames={SCENE_TIMINGS.scene4.duration}
      >
        <Scene4_QuadraticFunction />
      </Sequence>

      {/* Scene 5: 지수 함수 */}
      <Sequence
        from={SCENE_TIMINGS.scene5.start}
        durationInFrames={SCENE_TIMINGS.scene5.duration}
      >
        <Scene5_ExponentialFunction />
      </Sequence>

      {/* Scene 6: 시그모이드 함수 */}
      <Sequence
        from={SCENE_TIMINGS.scene6.start}
        durationInFrames={SCENE_TIMINGS.scene6.duration}
      >
        <Scene6_SigmoidFunction />
      </Sequence>

      {/* Scene 7: ReLU 함수 */}
      <Sequence
        from={SCENE_TIMINGS.scene7.start}
        durationInFrames={SCENE_TIMINGS.scene7.duration}
      >
        <Scene7_ReLUFunction />
      </Sequence>

      {/* Scene 8: 요약 */}
      <Sequence
        from={SCENE_TIMINGS.scene8.start}
        durationInFrames={SCENE_TIMINGS.scene8.duration}
      >
        <Scene8_Summary />
      </Sequence>

      {/* Scene 9: 아웃트로 */}
      <Sequence
        from={SCENE_TIMINGS.scene9.start}
        durationInFrames={SCENE_TIMINGS.scene9.duration}
      >
        <Scene9_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
