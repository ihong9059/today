/**
 * Lesson 1-2: 뉴런에서 퍼셉트론으로
 * 메인 비디오 컴포넌트
 */

import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Brain } from "./Scene2_Brain";
import { Scene3_NeuronStructure } from "./Scene3_NeuronStructure";
import { Scene4_Threshold } from "./Scene4_Threshold";
import { Scene5_McCullochPitts } from "./Scene5_McCullochPitts";
import { Scene6_Perceptron } from "./Scene6_Perceptron";
import { Scene7_Learning } from "./Scene7_Learning";
import { Scene8_History } from "./Scene8_History";
import { Scene9_Summary } from "./Scene9_Summary";
import { Scene10_Outro } from "./Scene10_Outro";

// 오디오 분석 결과 기반 타이밍
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 1001, start: 0 },
  scene2_brain: { duration: 1099, start: 1001 },
  scene3_neuron_structure: { duration: 1310, start: 2100 },
  scene4_threshold: { duration: 1067, start: 3410 },
  scene5_mcculloch_pitts: { duration: 1351, start: 4477 },
  scene6_perceptron: { duration: 1441, start: 5828 },
  scene7_learning: { duration: 1150, start: 7269 },
  scene8_history: { duration: 1208, start: 8419 },
  scene9_summary: { duration: 1077, start: 9627 },
  scene10_outro: { duration: 1110, start: 10704 },
};

export const LESSON_1_2_DURATION = 11814;

export const Lesson1_2Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Scene 1: 인트로 */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1_Intro />
        <Audio src={staticFile("audio/lesson-1-2/scene1_intro.mp3")} />
      </Sequence>

      {/* Scene 2: 뇌의 규모 */}
      <Sequence from={SCENE_TIMINGS.scene2_brain.start} durationInFrames={SCENE_TIMINGS.scene2_brain.duration}>
        <Scene2_Brain />
        <Audio src={staticFile("audio/lesson-1-2/scene2_brain.mp3")} />
      </Sequence>

      {/* Scene 3: 뉴런 구조 */}
      <Sequence from={SCENE_TIMINGS.scene3_neuron_structure.start} durationInFrames={SCENE_TIMINGS.scene3_neuron_structure.duration}>
        <Scene3_NeuronStructure />
        <Audio src={staticFile("audio/lesson-1-2/scene3_neuron_structure.mp3")} />
      </Sequence>

      {/* Scene 4: 임계값 */}
      <Sequence from={SCENE_TIMINGS.scene4_threshold.start} durationInFrames={SCENE_TIMINGS.scene4_threshold.duration}>
        <Scene4_Threshold />
        <Audio src={staticFile("audio/lesson-1-2/scene4_threshold.mp3")} />
      </Sequence>

      {/* Scene 5: 맥컬록-피츠 뉴런 */}
      <Sequence from={SCENE_TIMINGS.scene5_mcculloch_pitts.start} durationInFrames={SCENE_TIMINGS.scene5_mcculloch_pitts.duration}>
        <Scene5_McCullochPitts />
        <Audio src={staticFile("audio/lesson-1-2/scene5_mcculloch_pitts.mp3")} />
      </Sequence>

      {/* Scene 6: 퍼셉트론 */}
      <Sequence from={SCENE_TIMINGS.scene6_perceptron.start} durationInFrames={SCENE_TIMINGS.scene6_perceptron.duration}>
        <Scene6_Perceptron />
        <Audio src={staticFile("audio/lesson-1-2/scene6_perceptron.mp3")} />
      </Sequence>

      {/* Scene 7: 학습 과정 */}
      <Sequence from={SCENE_TIMINGS.scene7_learning.start} durationInFrames={SCENE_TIMINGS.scene7_learning.duration}>
        <Scene7_Learning />
        <Audio src={staticFile("audio/lesson-1-2/scene7_learning.mp3")} />
      </Sequence>

      {/* Scene 8: 역사 */}
      <Sequence from={SCENE_TIMINGS.scene8_history.start} durationInFrames={SCENE_TIMINGS.scene8_history.duration}>
        <Scene8_History />
        <Audio src={staticFile("audio/lesson-1-2/scene8_history.mp3")} />
      </Sequence>

      {/* Scene 9: 요약 */}
      <Sequence from={SCENE_TIMINGS.scene9_summary.start} durationInFrames={SCENE_TIMINGS.scene9_summary.duration}>
        <Scene9_Summary />
        <Audio src={staticFile("audio/lesson-1-2/scene9_summary.mp3")} />
      </Sequence>

      {/* Scene 10: 아웃트로 */}
      <Sequence from={SCENE_TIMINGS.scene10_outro.start} durationInFrames={SCENE_TIMINGS.scene10_outro.duration}>
        <Scene10_Outro />
        <Audio src={staticFile("audio/lesson-1-2/scene10_outro.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
