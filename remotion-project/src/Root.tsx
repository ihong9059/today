import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { EconomyNews } from "./EconomyNews";
import { DumulmeoriTravel } from "./DumulmeoriTravel";
import { AIIntroVideo, INTRO_VIDEO_DURATION } from "./AIIntroVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
