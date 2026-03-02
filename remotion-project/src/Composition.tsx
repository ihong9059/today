import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, staticFile } from "remotion";

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in animation
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Scale animation
  const scale = interpolate(frame, [0, 30], [0.5, 1], {
    extrapolateRight: "clamp",
  });

  // Rotation animation (360도 회전)
  const rotation = interpolate(frame, [0, durationInFrames], [0, 360], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0b1215",
      }}
    >
      {/* Remotion Logo with rotation */}
      <div
        style={{
          opacity,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
        }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Remotion Logo */}
          <circle cx="200" cy="200" r="180" fill="#0B84F3" />
          <path
            d="M200 80 L200 200 L320 200"
            stroke="white"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="200" cy="200" r="30" fill="white" />
        </svg>
      </div>

      {/* Text */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          opacity,
          color: "white",
          fontSize: 48,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Remotion
      </div>
    </AbsoluteFill>
  );
};
