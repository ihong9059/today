import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import {
  L01_Scene1_Intro,
  L01_Scene2_PythonInstall,
  L01_Scene3_IDEIntro,
  L01_Scene4_VSCodeSetup,
  L01_Scene5_Jupyter,
  L01_Scene6_VirtualEnv,
  L01_Scene7_Outro,
} from "./index";

// 오디오 타이밍 데이터 (분석 결과 기반)
// scene1: 19.51초 (585 frames)
// scene2: 52.44초 (1573 frames)
// scene3: 66.86초 (2005 frames)
// scene4: 56.95초 (1708 frames)
// scene5: 47.21초 (1416 frames)
// scene6: 73.18초 (2195 frames)
// scene7: 72.82초 (2184 frames) - AI 도구 활용 조언 추가

const SCENE_TIMINGS = {
  scene1: { duration: 585, start: 0 },
  scene2: { duration: 1573, start: 585 },
  scene3: { duration: 2005, start: 585 + 1573 },
  scene4: { duration: 1708, start: 585 + 1573 + 2005 },
  scene5: { duration: 1416, start: 585 + 1573 + 2005 + 1708 },
  scene6: { duration: 2195, start: 585 + 1573 + 2005 + 1708 + 1416 },
  scene7: { duration: 2184, start: 585 + 1573 + 2005 + 1708 + 1416 + 2195 },
};

// 총 프레임 수 계산
export const LESSON_01_TOTAL_FRAMES =
  SCENE_TIMINGS.scene1.duration +
  SCENE_TIMINGS.scene2.duration +
  SCENE_TIMINGS.scene3.duration +
  SCENE_TIMINGS.scene4.duration +
  SCENE_TIMINGS.scene5.duration +
  SCENE_TIMINGS.scene6.duration +
  SCENE_TIMINGS.scene7.duration;

export const Lesson01Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Scene 1: Intro */}
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <L01_Scene1_Intro durationInFrames={SCENE_TIMINGS.scene1.duration} />
        <Audio src={staticFile("audio/lesson-0-1/scene1.mp3")} />
      </Sequence>

      {/* Scene 2: Python Install */}
      <Sequence from={SCENE_TIMINGS.scene2.start} durationInFrames={SCENE_TIMINGS.scene2.duration}>
        <L01_Scene2_PythonInstall durationInFrames={SCENE_TIMINGS.scene2.duration} />
        <Audio src={staticFile("audio/lesson-0-1/scene2.mp3")} />
      </Sequence>

      {/* Scene 3: IDE Intro */}
      <Sequence from={SCENE_TIMINGS.scene3.start} durationInFrames={SCENE_TIMINGS.scene3.duration}>
        <L01_Scene3_IDEIntro durationInFrames={SCENE_TIMINGS.scene3.duration} />
        <Audio src={staticFile("audio/lesson-0-1/scene3.mp3")} />
      </Sequence>

      {/* Scene 4: VS Code Setup */}
      <Sequence from={SCENE_TIMINGS.scene4.start} durationInFrames={SCENE_TIMINGS.scene4.duration}>
        <L01_Scene4_VSCodeSetup durationInFrames={SCENE_TIMINGS.scene4.duration} />
        <Audio src={staticFile("audio/lesson-0-1/scene4.mp3")} />
      </Sequence>

      {/* Scene 5: Jupyter Notebook */}
      <Sequence from={SCENE_TIMINGS.scene5.start} durationInFrames={SCENE_TIMINGS.scene5.duration}>
        <L01_Scene5_Jupyter durationInFrames={SCENE_TIMINGS.scene5.duration} />
        <Audio src={staticFile("audio/lesson-0-1/scene5.mp3")} />
      </Sequence>

      {/* Scene 6: Virtual Environment */}
      <Sequence from={SCENE_TIMINGS.scene6.start} durationInFrames={SCENE_TIMINGS.scene6.duration}>
        <L01_Scene6_VirtualEnv durationInFrames={SCENE_TIMINGS.scene6.duration} />
        <Audio src={staticFile("audio/lesson-0-1/scene6.mp3")} />
      </Sequence>

      {/* Scene 7: Outro */}
      <Sequence from={SCENE_TIMINGS.scene7.start} durationInFrames={SCENE_TIMINGS.scene7.duration}>
        <L01_Scene7_Outro durationInFrames={SCENE_TIMINGS.scene7.duration} />
        <Audio src={staticFile("audio/lesson-0-1/scene7.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
