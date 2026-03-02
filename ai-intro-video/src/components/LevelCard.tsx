import { interpolate, useCurrentFrame, spring } from "remotion";
import { colors } from "../styles";

interface LevelCardProps {
  level: number;
  title: string;
  icon: string;
  delay?: number;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  icon,
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const levelColor = colors.level[level as keyof typeof colors.level] || colors.primary;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        backgroundColor: colors.gray[800],
        borderRadius: 16,
        border: `3px solid ${levelColor}`,
        minWidth: 200,
        boxShadow: `0 0 30px ${levelColor}40`,
      }}
    >
      <div
        style={{
          fontSize: 48,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: levelColor,
          marginBottom: 4,
        }}
      >
        Level {level}
      </div>
      <div
        style={{
          fontSize: 18,
          color: colors.white,
          textAlign: "center",
        }}
      >
        {title}
      </div>
    </div>
  );
};
