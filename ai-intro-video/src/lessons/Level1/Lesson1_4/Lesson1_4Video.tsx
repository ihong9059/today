/**
 * Lesson 1-4: 퍼셉트론 학습
 * 메인 비디오 컴포지션
 */

import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_WhatIsLearning } from "./Scene2_WhatIsLearning";
import { Scene3_PerceptronLearning } from "./Scene3_PerceptronLearning";
import { Scene4_Error } from "./Scene4_Error";
import { Scene5_UpdateRule } from "./Scene5_UpdateRule";
import { Scene6_LearningRate } from "./Scene6_LearningRate";
import { Scene7_ExampleSetup } from "./Scene7_ExampleSetup";
import { Scene8_ExampleTraining } from "./Scene8_ExampleTraining";
import { Scene9_Algorithm } from "./Scene9_Algorithm";
import { Scene10_Outro } from "./Scene10_Outro";

// 오디오 분석 결과 기반 타이밍 (30fps)
export const SCENE_TIMINGS = {
  scene1_intro: { duration: 804, start: 0 },
  scene2_what_is_learning: { duration: 1094, start: 804 },
  scene3_perceptron_learning: { duration: 1079, start: 1898 },
  scene4_error: { duration: 1217, start: 2977 },
  scene5_update_rule: { duration: 1334, start: 4194 },
  scene6_learning_rate: { duration: 1321, start: 5528 },
  scene7_example_setup: { duration: 1265, start: 6849 },
  scene8_example_training: { duration: 1554, start: 8114 },
  scene9_algorithm: { duration: 1343, start: 9668 },
  scene10_outro: { duration: 1493, start: 11011 },
};

export const LESSON_1_4_DURATION = 12504;

export const Lesson1_4Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Scene 1: Intro */}
      <Sequence from={SCENE_TIMINGS.scene1_intro.start} durationInFrames={SCENE_TIMINGS.scene1_intro.duration}>
        <Scene1_Intro />
        <Audio src={staticFile("audio/lesson-1-4/scene1_intro.mp3")} />
      </Sequence>

      {/* Scene 2: What is Learning */}
      <Sequence from={SCENE_TIMINGS.scene2_what_is_learning.start} durationInFrames={SCENE_TIMINGS.scene2_what_is_learning.duration}>
        <Scene2_WhatIsLearning />
        <Audio src={staticFile("audio/lesson-1-4/scene2_what_is_learning.mp3")} />
      </Sequence>

      {/* Scene 3: Perceptron Learning */}
      <Sequence from={SCENE_TIMINGS.scene3_perceptron_learning.start} durationInFrames={SCENE_TIMINGS.scene3_perceptron_learning.duration}>
        <Scene3_PerceptronLearning />
        <Audio src={staticFile("audio/lesson-1-4/scene3_perceptron_learning.mp3")} />
      </Sequence>

      {/* Scene 4: Error */}
      <Sequence from={SCENE_TIMINGS.scene4_error.start} durationInFrames={SCENE_TIMINGS.scene4_error.duration}>
        <Scene4_Error />
        <Audio src={staticFile("audio/lesson-1-4/scene4_error.mp3")} />
      </Sequence>

      {/* Scene 5: Update Rule */}
      <Sequence from={SCENE_TIMINGS.scene5_update_rule.start} durationInFrames={SCENE_TIMINGS.scene5_update_rule.duration}>
        <Scene5_UpdateRule />
        <Audio src={staticFile("audio/lesson-1-4/scene5_update_rule.mp3")} />
      </Sequence>

      {/* Scene 6: Learning Rate */}
      <Sequence from={SCENE_TIMINGS.scene6_learning_rate.start} durationInFrames={SCENE_TIMINGS.scene6_learning_rate.duration}>
        <Scene6_LearningRate />
        <Audio src={staticFile("audio/lesson-1-4/scene6_learning_rate.mp3")} />
      </Sequence>

      {/* Scene 7: Example Setup */}
      <Sequence from={SCENE_TIMINGS.scene7_example_setup.start} durationInFrames={SCENE_TIMINGS.scene7_example_setup.duration}>
        <Scene7_ExampleSetup />
        <Audio src={staticFile("audio/lesson-1-4/scene7_example_setup.mp3")} />
      </Sequence>

      {/* Scene 8: Example Training */}
      <Sequence from={SCENE_TIMINGS.scene8_example_training.start} durationInFrames={SCENE_TIMINGS.scene8_example_training.duration}>
        <Scene8_ExampleTraining />
        <Audio src={staticFile("audio/lesson-1-4/scene8_example_training.mp3")} />
      </Sequence>

      {/* Scene 9: Algorithm */}
      <Sequence from={SCENE_TIMINGS.scene9_algorithm.start} durationInFrames={SCENE_TIMINGS.scene9_algorithm.duration}>
        <Scene9_Algorithm />
        <Audio src={staticFile("audio/lesson-1-4/scene9_algorithm.mp3")} />
      </Sequence>

      {/* Scene 10: Outro */}
      <Sequence from={SCENE_TIMINGS.scene10_outro.start} durationInFrames={SCENE_TIMINGS.scene10_outro.duration}>
        <Scene10_Outro />
        <Audio src={staticFile("audio/lesson-1-4/scene10_outro.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
