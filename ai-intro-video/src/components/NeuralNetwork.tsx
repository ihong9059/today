import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../styles";

interface NeuralNetworkProps {
  scale?: number;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();

  const layers = [3, 5, 5, 3];
  const nodeRadius = 15 * scale;
  const layerSpacing = 150 * scale;
  const nodeSpacing = 60 * scale;

  const nodes: { x: number; y: number; layer: number }[] = [];

  layers.forEach((nodeCount, layerIndex) => {
    const layerX = layerIndex * layerSpacing;
    const startY = -((nodeCount - 1) * nodeSpacing) / 2;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: layerX,
        y: startY + i * nodeSpacing,
        layer: layerIndex,
      });
    }
  });

  const connections: { from: number; to: number }[] = [];
  let nodeIndex = 0;

  for (let l = 0; l < layers.length - 1; l++) {
    const currentLayerStart = nodeIndex;
    const currentLayerEnd = nodeIndex + layers[l];
    const nextLayerStart = currentLayerEnd;
    const nextLayerEnd = nextLayerStart + layers[l + 1];

    for (let i = currentLayerStart; i < currentLayerEnd; i++) {
      for (let j = nextLayerStart; j < nextLayerEnd; j++) {
        connections.push({ from: i, to: j });
      }
    }
    nodeIndex = currentLayerEnd;
  }

  const width = (layers.length - 1) * layerSpacing + nodeRadius * 4;
  const height = Math.max(...layers) * nodeSpacing + nodeRadius * 4;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${-nodeRadius * 2} ${-height / 2} ${width} ${height}`}
    >
      {/* Connections */}
      {connections.map((conn, idx) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        const progress = interpolate(
          frame,
          [idx * 0.5, idx * 0.5 + 30],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const pulseProgress = (frame + idx * 5) % 60;
        const pulseOpacity = interpolate(pulseProgress, [0, 30, 60], [0.1, 0.4, 0.1]);

        return (
          <line
            key={`conn-${idx}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={fromNode.x + (toNode.x - fromNode.x) * progress}
            y2={fromNode.y + (toNode.y - fromNode.y) * progress}
            stroke={colors.primary}
            strokeWidth={1.5 * scale}
            opacity={pulseOpacity}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, idx) => {
        const delay = node.layer * 15;
        const nodeOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const pulse = Math.sin((frame + idx * 10) * 0.1) * 0.2 + 0.8;

        return (
          <g key={`node-${idx}`} opacity={nodeOpacity}>
            <circle
              cx={node.x}
              cy={node.y}
              r={nodeRadius * pulse}
              fill={colors.primary}
              opacity={0.3}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={nodeRadius * 0.7}
              fill={colors.primary}
            />
          </g>
        );
      })}
    </svg>
  );
};
