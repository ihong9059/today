import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Structure } from "./Scene2_Structure";
import { Scene3_Forward } from "./Scene3_Forward";
import { Scene4_Backward } from "./Scene4_Backward";
import { Scene5_Validation } from "./Scene5_Validation";
import { Scene6_Monitoring } from "./Scene6_Monitoring";
import { Scene7_Outro } from "./Scene7_Outro";

export const SCENE_TIMINGS = {
  scene1: 807,
  scene2: 798,
  scene3: 915,
  scene4: 1126,
  scene5: 956,
  scene6: 923,
  scene7: 882,
};

export const LESSON_4_6_DURATION = Object.values(SCENE_TIMINGS).reduce((a, b) => a + b, 0); // 6407 frames

export const Lesson4_6Video: React.FC = () => {
  const getStartFrame = (sceneKey: keyof typeof SCENE_TIMINGS) => {
    let start = 0;
    for (const key of Object.keys(SCENE_TIMINGS) as (keyof typeof SCENE_TIMINGS)[]) {
      if (key === sceneKey) return start;
      start += SCENE_TIMINGS[key];
    }
    return start;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
      <Sequence from={getStartFrame("scene1")} durationInFrames={SCENE_TIMINGS.scene1}>
        <Scene1_Intro />
      </Sequence>

      <Sequence from={getStartFrame("scene2")} durationInFrames={SCENE_TIMINGS.scene2}>
        <Scene2_Structure />
      </Sequence>

      <Sequence from={getStartFrame("scene3")} durationInFrames={SCENE_TIMINGS.scene3}>
        <Scene3_Forward />
      </Sequence>

      <Sequence from={getStartFrame("scene4")} durationInFrames={SCENE_TIMINGS.scene4}>
        <Scene4_Backward />
      </Sequence>

      <Sequence from={getStartFrame("scene5")} durationInFrames={SCENE_TIMINGS.scene5}>
        <Scene5_Validation />
      </Sequence>

      <Sequence from={getStartFrame("scene6")} durationInFrames={SCENE_TIMINGS.scene6}>
        <Scene6_Monitoring />
      </Sequence>

      <Sequence from={getStartFrame("scene7")} durationInFrames={SCENE_TIMINGS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
