/**
 * Lesson 0-6: Matplotlib 기초 - AI 학습 과정 시각화
 * 메인 비디오 컴포넌트
 * 레벨 0 마지막 강의!
 */

import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { L06_Scene1_Intro } from "./Scene1_Intro";
import { L06_Scene2_Basics } from "./Scene2_Basics";
import { L06_Scene3_GraphTypes } from "./Scene3_GraphTypes";
import { L06_Scene4_LearningCurve } from "./Scene4_LearningCurve";
import { L06_Scene5_Subplot } from "./Scene5_Subplot";
import { L06_Scene6_ImageShow } from "./Scene6_ImageShow";
import { L06_Scene7_Outro } from "./Scene7_Outro";

// 오디오 분석 결과 기반 타이밍 (30fps)
const SCENE_TIMINGS = {
  scene1: { duration: 1962, start: 0 },
  scene2: { duration: 1971, start: 1962 },
  scene3: { duration: 1986, start: 3933 },
  scene4: { duration: 2057, start: 5919 },
  scene5: { duration: 1998, start: 7976 },
  scene6: { duration: 1958, start: 9974 },
  scene7: { duration: 2163, start: 11932 },
};

export const LESSON06_DURATION = 14095; // 총 프레임 수 (~7.8분)

export const Lesson06Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {/* Scene 1: Intro */}
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <L06_Scene1_Intro durationInFrames={SCENE_TIMINGS.scene1.duration} />
        <Audio src={staticFile("audio/lesson-0-6/scene1.mp3")} />
      </Sequence>

      {/* Scene 2: Basics */}
      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <L06_Scene2_Basics durationInFrames={SCENE_TIMINGS.scene2.duration} />
        <Audio src={staticFile("audio/lesson-0-6/scene2.mp3")} />
      </Sequence>

      {/* Scene 3: Graph Types */}
      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <L06_Scene3_GraphTypes durationInFrames={SCENE_TIMINGS.scene3.duration} />
        <Audio src={staticFile("audio/lesson-0-6/scene3.mp3")} />
      </Sequence>

      {/* Scene 4: Learning Curve */}
      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <L06_Scene4_LearningCurve durationInFrames={SCENE_TIMINGS.scene4.duration} />
        <Audio src={staticFile("audio/lesson-0-6/scene4.mp3")} />
      </Sequence>

      {/* Scene 5: Subplot */}
      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <L06_Scene5_Subplot durationInFrames={SCENE_TIMINGS.scene5.duration} />
        <Audio src={staticFile("audio/lesson-0-6/scene5.mp3")} />
      </Sequence>

      {/* Scene 6: Image Show */}
      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <L06_Scene6_ImageShow durationInFrames={SCENE_TIMINGS.scene6.duration} />
        <Audio src={staticFile("audio/lesson-0-6/scene6.mp3")} />
      </Sequence>

      {/* Scene 7: Outro - Level 0 완료! */}
      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <L06_Scene7_Outro durationInFrames={SCENE_TIMINGS.scene7.duration} />
        <Audio src={staticFile("audio/lesson-0-6/scene7.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
