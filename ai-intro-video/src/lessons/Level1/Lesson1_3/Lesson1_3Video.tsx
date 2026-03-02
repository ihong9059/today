/**
 * Lesson 1-3: 퍼셉트론 구조
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Overview } from "./Scene2_Overview";
import { Scene3_Input } from "./Scene3_Input";
import { Scene4_Weight } from "./Scene4_Weight";
import { Scene5_Bias } from "./Scene5_Bias";
import { Scene6_Formula } from "./Scene6_Formula";
import { Scene7_Activation } from "./Scene7_Activation";
import { Scene8_Example } from "./Scene8_Example";
import { Scene9_Summary } from "./Scene9_Summary";
import { Scene10_Outro } from "./Scene10_Outro";

// 오디오 분석 결과 기반 타이밍 (30fps)
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 1054, start: 0 },
  scene2_overview: { duration: 1309, start: 1054 },
  scene3_input: { duration: 1138, start: 2363 },
  scene4_weight: { duration: 1497, start: 3501 },
  scene5_bias: { duration: 1063, start: 4998 },
  scene6_formula: { duration: 1202, start: 6061 },
  scene7_activation: { duration: 1495, start: 7263 },
  scene8_example: { duration: 1659, start: 8758 },
  scene9_summary: { duration: 1396, start: 10417 },
  scene10_outro: { duration: 1208, start: 11813 },
};

export const LESSON_1_3_DURATION = 13021;

export const Lesson1_3Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Scene 1: 인트로 */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1_Intro />
        <Audio src={staticFile("audio/lesson-1-3/scene1_intro.mp3")} />
      </Sequence>

      {/* Scene 2: 전체 구조 개요 */}
      <Sequence from={SCENE_TIMINGS.scene2_overview.start} durationInFrames={SCENE_TIMINGS.scene2_overview.duration}>
        <Scene2_Overview />
        <Audio src={staticFile("audio/lesson-1-3/scene2_overview.mp3")} />
      </Sequence>

      {/* Scene 3: 입력 */}
      <Sequence from={SCENE_TIMINGS.scene3_input.start} durationInFrames={SCENE_TIMINGS.scene3_input.duration}>
        <Scene3_Input />
        <Audio src={staticFile("audio/lesson-1-3/scene3_input.mp3")} />
      </Sequence>

      {/* Scene 4: 가중치 */}
      <Sequence from={SCENE_TIMINGS.scene4_weight.start} durationInFrames={SCENE_TIMINGS.scene4_weight.duration}>
        <Scene4_Weight />
        <Audio src={staticFile("audio/lesson-1-3/scene4_weight.mp3")} />
      </Sequence>

      {/* Scene 5: 편향 */}
      <Sequence from={SCENE_TIMINGS.scene5_bias.start} durationInFrames={SCENE_TIMINGS.scene5_bias.duration}>
        <Scene5_Bias />
        <Audio src={staticFile("audio/lesson-1-3/scene5_bias.mp3")} />
      </Sequence>

      {/* Scene 6: 수학 공식 */}
      <Sequence from={SCENE_TIMINGS.scene6_formula.start} durationInFrames={SCENE_TIMINGS.scene6_formula.duration}>
        <Scene6_Formula />
        <Audio src={staticFile("audio/lesson-1-3/scene6_formula.mp3")} />
      </Sequence>

      {/* Scene 7: 활성화 함수 */}
      <Sequence from={SCENE_TIMINGS.scene7_activation.start} durationInFrames={SCENE_TIMINGS.scene7_activation.duration}>
        <Scene7_Activation />
        <Audio src={staticFile("audio/lesson-1-3/scene7_activation.mp3")} />
      </Sequence>

      {/* Scene 8: 실제 예제 */}
      <Sequence from={SCENE_TIMINGS.scene8_example.start} durationInFrames={SCENE_TIMINGS.scene8_example.duration}>
        <Scene8_Example />
        <Audio src={staticFile("audio/lesson-1-3/scene8_example.mp3")} />
      </Sequence>

      {/* Scene 9: 정리 */}
      <Sequence from={SCENE_TIMINGS.scene9_summary.start} durationInFrames={SCENE_TIMINGS.scene9_summary.duration}>
        <Scene9_Summary />
        <Audio src={staticFile("audio/lesson-1-3/scene9_summary.mp3")} />
      </Sequence>

      {/* Scene 10: 아웃트로 */}
      <Sequence from={SCENE_TIMINGS.scene10_outro.start} durationInFrames={SCENE_TIMINGS.scene10_outro.duration}>
        <Scene10_Outro />
        <Audio src={staticFile("audio/lesson-1-3/scene10_outro.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
