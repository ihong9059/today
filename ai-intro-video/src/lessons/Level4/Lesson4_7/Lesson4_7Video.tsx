import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_StateDict } from "./Scene2_StateDict";
import { Scene3_FullModel } from "./Scene3_FullModel";
import { Scene4_Checkpoint } from "./Scene4_Checkpoint";
import { Scene5_Device } from "./Scene5_Device";
import { Scene6_Tips } from "./Scene6_Tips";
import { Scene7_Outro } from "./Scene7_Outro";

export const SCENE_TIMINGS = {
  scene1: 688,
  scene2: 1344,
  scene3: 1085,
  scene4: 1177,
  scene5: 1014,
  scene6: 1372,
  scene7: 1052,
};

export const LESSON_4_7_DURATION = Object.values(SCENE_TIMINGS).reduce((a, b) => a + b, 0); // 7732 frames

export const Lesson4_7Video: React.FC = () => {
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
        <Scene2_StateDict />
      </Sequence>

      <Sequence from={getStartFrame("scene3")} durationInFrames={SCENE_TIMINGS.scene3}>
        <Scene3_FullModel />
      </Sequence>

      <Sequence from={getStartFrame("scene4")} durationInFrames={SCENE_TIMINGS.scene4}>
        <Scene4_Checkpoint />
      </Sequence>

      <Sequence from={getStartFrame("scene5")} durationInFrames={SCENE_TIMINGS.scene5}>
        <Scene5_Device />
      </Sequence>

      <Sequence from={getStartFrame("scene6")} durationInFrames={SCENE_TIMINGS.scene6}>
        <Scene6_Tips />
      </Sequence>

      <Sequence from={getStartFrame("scene7")} durationInFrames={SCENE_TIMINGS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
