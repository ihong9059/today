import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../styles";

interface TypeWriterProps {
  text: string;
  startFrame?: number;
  speed?: number;
  fontSize?: number;
  color?: string;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  startFrame = 0,
  speed = 2,
  fontSize = 32,
  color = colors.white,
}) => {
  const frame = useCurrentFrame();

  const charsToShow = Math.floor(
    interpolate(
      frame,
      [startFrame, startFrame + text.length * speed],
      [0, text.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  const displayText = text.slice(0, charsToShow);
  const showCursor = frame % 30 < 15 && charsToShow < text.length;

  return (
    <span
      style={{
        fontSize,
        color,
        fontFamily: "monospace",
      }}
    >
      {displayText}
      {showCursor && (
        <span style={{ opacity: 0.8 }}>|</span>
      )}
    </span>
  );
};
