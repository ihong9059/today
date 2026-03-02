import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { EconomyNews } from "./EconomyNews";
import { DumulmeoriTravel } from "./DumulmeoriTravel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
