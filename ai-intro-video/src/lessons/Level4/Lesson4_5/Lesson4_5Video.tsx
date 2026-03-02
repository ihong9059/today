import { AbsoluteFill, Sequence } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
import { Scene2_Dataset } from "./Scene2_Dataset";
import { Scene3_DataLoader } from "./Scene3_DataLoader";
import { Scene4_Transforms } from "./Scene4_Transforms";
import { Scene5_BuiltinDatasets } from "./Scene5_BuiltinDatasets";
import { Scene6_CustomDataset } from "./Scene6_CustomDataset";
import { Scene7_Outro } from "./Scene7_Outro";

export const SCENE_TIMINGS = {
  scene1: 810,
  scene2: 968,
  scene3: 880,
  scene4: 864,
  scene5: 943,
  scene6: 964,
  scene7: 984,
};

export const LESSON_4_5_DURATION = Object.values(SCENE_TIMINGS).reduce((a, b) => a + b, 0); // 6413 frames

export const Lesson4_5Video: React.FC = () => {
  let currentFrame = 0;

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
        <Scene2_Dataset />
      </Sequence>

      <Sequence from={getStartFrame("scene3")} durationInFrames={SCENE_TIMINGS.scene3}>
        <Scene3_DataLoader />
      </Sequence>

      <Sequence from={getStartFrame("scene4")} durationInFrames={SCENE_TIMINGS.scene4}>
        <Scene4_Transforms />
      </Sequence>

      <Sequence from={getStartFrame("scene5")} durationInFrames={SCENE_TIMINGS.scene5}>
        <Scene5_BuiltinDatasets />
      </Sequence>

      <Sequence from={getStartFrame("scene6")} durationInFrames={SCENE_TIMINGS.scene6}>
        <Scene6_CustomDataset />
      </Sequence>

      <Sequence from={getStartFrame("scene7")} durationInFrames={SCENE_TIMINGS.scene7}>
        <Scene7_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
