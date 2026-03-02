import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
  L02_Scene1_Intro,
  L02_Scene2_Numbers,
  L02_Scene3_StringBool,
  L02_Scene4_List,
  L02_Scene5_Dict,
  L02_Scene6_AIUsage,
  L02_Scene7_Outro,
} from "./index";

// 오디오 타이밍 데이터 (분석 결과 기반)
// scene1: 37.68초 (1130 frames)
// scene2: 46.25초 (1387 frames)
// scene3: 38.93초 (1167 frames)
// scene4: 61.66초 (1849 frames)
// scene5: 63.17초 (1895 frames)
// scene6: 71.21초 (2136 frames)
// scene7: 60.02초 (1800 frames)
// Total: 378.91초 (11364 frames) = 약 6분 18초

const SCENE_TIMINGS = {
  scene1: { duration: 1130, start: 0 },
  scene2: { duration: 1387, start: 1130 },
  scene3: { duration: 1167, start: 2517 },
  scene4: { duration: 1849, start: 3684 },
  scene5: { duration: 1895, start: 5533 },
  scene6: { duration: 2136, start: 7428 },
  scene7: { duration: 1800, start: 9564 },
};

// 총 프레임 수 계산
export const LESSON_02_TOTAL_FRAMES =
  SCENE_TIMINGS.scene1.duration +
  SCENE_TIMINGS.scene2.duration +
  SCENE_TIMINGS.scene3.duration +
  SCENE_TIMINGS.scene4.duration +
  SCENE_TIMINGS.scene5.duration +
  SCENE_TIMINGS.scene6.duration +
  SCENE_TIMINGS.scene7.duration;

export const Lesson02Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Scene 1: Intro */}
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <L02_Scene1_Intro durationInFrames={SCENE_TIMINGS.scene1.duration} />
        <Audio src={staticFile("audio/lesson-0-2/scene1.mp3")} />
      </Sequence>

      {/* Scene 2: Numbers (int, float) */}
      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <L02_Scene2_Numbers durationInFrames={SCENE_TIMINGS.scene2.duration} />
        <Audio src={staticFile("audio/lesson-0-2/scene2.mp3")} />
      </Sequence>

      {/* Scene 3: String and Boolean */}
      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <L02_Scene3_StringBool durationInFrames={SCENE_TIMINGS.scene3.duration} />
        <Audio src={staticFile("audio/lesson-0-2/scene3.mp3")} />
      </Sequence>

      {/* Scene 4: List */}
      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <L02_Scene4_List durationInFrames={SCENE_TIMINGS.scene4.duration} />
        <Audio src={staticFile("audio/lesson-0-2/scene4.mp3")} />
      </Sequence>

      {/* Scene 5: Dictionary */}
      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <L02_Scene5_Dict durationInFrames={SCENE_TIMINGS.scene5.duration} />
        <Audio src={staticFile("audio/lesson-0-2/scene5.mp3")} />
      </Sequence>

      {/* Scene 6: AI Usage */}
      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <L02_Scene6_AIUsage durationInFrames={SCENE_TIMINGS.scene6.duration} />
        <Audio src={staticFile("audio/lesson-0-2/scene6.mp3")} />
      </Sequence>

      {/* Scene 7: Outro */}
      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <L02_Scene7_Outro durationInFrames={SCENE_TIMINGS.scene7.duration} />
        <Audio src={staticFile("audio/lesson-0-2/scene7.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
