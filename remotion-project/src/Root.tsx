import { Composition, Still } from "remotion";
import { MyComposition } from "./Composition";
import { EconomyNews } from "./EconomyNews";
import { DumulmeoriTravel } from "./DumulmeoriTravel";
import { AIIntroVideo, INTRO_VIDEO_DURATION } from "./AIIntroVideo";
import { Lesson0_1Video, LESSON_0_1_DURATION } from "./Lesson0_1Video";
import { Lesson0_1Thumbnail } from "./Lesson0_1Thumbnail";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Lesson0-1"
        component={Lesson0_1Video}
        durationInFrames={LESSON_0_1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still
        id="Lesson0-1-Thumbnail"
        component={Lesson0_1Thumbnail}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIIntroVideo"
        component={AIIntroVideo}
        durationInFrames={INTRO_VIDEO_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EconomyNews"
        component={EconomyNews}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DumulmeoriTravel"
        component={DumulmeoriTravel}
        durationInFrames={8700}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
