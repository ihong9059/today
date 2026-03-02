import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Scene1_Intro } from "./scenes/Scene1_Intro";
import { Scene2_Problem } from "./scenes/Scene2_Problem";
import { Scene3_Solution } from "./scenes/Scene3_Solution";
import { Scene4_Curriculum } from "./scenes/Scene4_Curriculum";
import { Scene5_Project } from "./scenes/Scene5_Project";
import { Scene6_CTA } from "./scenes/Scene6_CTA";
import { Scene7_Outro } from "./scenes/Scene7_Outro";

// 30 FPS 기준 - 나레이션 길이에 맞춤
// 총 길이: 약 12분 (725초, 21750 frames)
const FPS = 30;

// 각 씬의 나레이션 기반 타이밍 (초)
const TIMINGS = {
  scene1: { start: 0, duration: 53 },      // Intro: 52.49초
  scene2: { start: 53, duration: 67 },     // Problem: 65.66초
  scene3: { start: 120, duration: 68 },    // Solution: 66.96초
  scene4a: { start: 188, duration: 148 },  // Curriculum Basic: 147.10초
  scene4b: { start: 336, duration: 116 },  // Curriculum Core: 115.25초
  scene4c: { start: 452, duration: 103 },  // Curriculum Advanced: 102.50초
  scene5: { start: 555, duration: 68 },    // Project: 67.08초
  scene6: { start: 623, duration: 75 },    // CTA: 74.02초
  scene7: { start: 698, duration: 27 },    // Outro: 24.82초 + 여유
};

const SEC = (s: number) => Math.round(s * FPS);

export const AIIntroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Audio - 각 씬의 나레이션 */}
      <Sequence from={SEC(TIMINGS.scene1.start)}>
        <Audio src={staticFile("audio/scene1.mp3")} />
      </Sequence>
      <Sequence from={SEC(TIMINGS.scene2.start)}>
        <Audio src={staticFile("audio/scene2.mp3")} />
      </Sequence>
      <Sequence from={SEC(TIMINGS.scene3.start)}>
        <Audio src={staticFile("audio/scene3.mp3")} />
      </Sequence>
      <Sequence from={SEC(TIMINGS.scene4a.start)}>
        <Audio src={staticFile("audio/scene4a.mp3")} />
      </Sequence>
      <Sequence from={SEC(TIMINGS.scene4b.start)}>
        <Audio src={staticFile("audio/scene4b.mp3")} />
      </Sequence>
      <Sequence from={SEC(TIMINGS.scene4c.start)}>
        <Audio src={staticFile("audio/scene4c.mp3")} />
      </Sequence>
      <Sequence from={SEC(TIMINGS.scene5.start)}>
        <Audio src={staticFile("audio/scene5.mp3")} />
      </Sequence>
      <Sequence from={SEC(TIMINGS.scene6.start)}>
        <Audio src={staticFile("audio/scene6.mp3")} />
      </Sequence>
      <Sequence from={SEC(TIMINGS.scene7.start)}>
        <Audio src={staticFile("audio/scene7.mp3")} />
      </Sequence>

      {/* Visual Scenes */}
      <Sequence from={SEC(TIMINGS.scene1.start)} durationInFrames={SEC(TIMINGS.scene1.duration)}>
        <Scene1_Intro durationInFrames={SEC(TIMINGS.scene1.duration)} />
      </Sequence>

      <Sequence from={SEC(TIMINGS.scene2.start)} durationInFrames={SEC(TIMINGS.scene2.duration)}>
        <Scene2_Problem durationInFrames={SEC(TIMINGS.scene2.duration)} />
      </Sequence>

      <Sequence from={SEC(TIMINGS.scene3.start)} durationInFrames={SEC(TIMINGS.scene3.duration)}>
        <Scene3_Solution durationInFrames={SEC(TIMINGS.scene3.duration)} />
      </Sequence>

      <Sequence from={SEC(TIMINGS.scene4a.start)} durationInFrames={SEC(TIMINGS.scene4a.duration)}>
        <Scene4_Curriculum part="basic" durationInFrames={SEC(TIMINGS.scene4a.duration)} />
      </Sequence>

      <Sequence from={SEC(TIMINGS.scene4b.start)} durationInFrames={SEC(TIMINGS.scene4b.duration)}>
        <Scene4_Curriculum part="core" durationInFrames={SEC(TIMINGS.scene4b.duration)} />
      </Sequence>

      <Sequence from={SEC(TIMINGS.scene4c.start)} durationInFrames={SEC(TIMINGS.scene4c.duration)}>
        <Scene4_Curriculum part="advanced" durationInFrames={SEC(TIMINGS.scene4c.duration)} />
      </Sequence>

      <Sequence from={SEC(TIMINGS.scene5.start)} durationInFrames={SEC(TIMINGS.scene5.duration)}>
        <Scene5_Project durationInFrames={SEC(TIMINGS.scene5.duration)} />
      </Sequence>

      <Sequence from={SEC(TIMINGS.scene6.start)} durationInFrames={SEC(TIMINGS.scene6.duration)}>
        <Scene6_CTA durationInFrames={SEC(TIMINGS.scene6.duration)} />
      </Sequence>

      <Sequence from={SEC(TIMINGS.scene7.start)} durationInFrames={SEC(TIMINGS.scene7.duration)}>
        <Scene7_Outro durationInFrames={SEC(TIMINGS.scene7.duration)} />
      </Sequence>
    </AbsoluteFill>
  );
};
