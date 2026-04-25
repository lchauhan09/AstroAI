import Svg, { Path, Circle } from "react-native-svg";

type IconProps = { size?: number; color?: string };

export const ZodiacIcons = {
  aries: ({ size = 20, color = "#F5D27A" }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M6 5c2 0 3 2 3 5v9M18 5c-2 0-3 2-3 5v9"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  ),
  taurus: ({ size = 20, color = "#F5D27A" }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={13} r={4.5} stroke={color} strokeWidth={1.6} />
      <Path
        d="M7 6c1.2 1.2 2.7 2 5 2s3.8-.8 5-2"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  ),
  gemini: ({ size = 20, color = "#F5D27A" }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M7 4h10M7 20h10M9 4v16M15 4v16"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  ),
  cancer: ({ size = 20, color = "#F5D27A" }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={17} cy={7} r={4} stroke={color} strokeWidth={1.6} />
      <Circle cx={7} cy={17} r={4} stroke={color} strokeWidth={1.6} />
      <Path
        d="M21 7c-4 0-4 4-8 4M3 17c4 0 4-4 8-4"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  ),
};

export const PlanetIcons = {
  sun: ({ size = 20, color = "#F5D27A" }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={1.6} />
      <Path
        d="M12 3v2.5M12 18.5V21M4.5 12H3M21 12h-2.5M6 6l-1.5-1.5M19.5 19.5 18 18M6 18l-1.5 1.5M19.5 4.5 18 6"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
      />
    </Svg>
  ),
  moon: ({ size = 20, color = "#F5D27A" }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M16.5 4.5A7 7 0 0 1 9 17a7 7 0 0 0 7.5-12.5Z"
        stroke={color}
        strokeWidth={1.6}
        fill="none"
      />
    </Svg>
  ),
  mercury: ({ size = 20, color = "#F5D27A" }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={13} r={4} stroke={color} strokeWidth={1.6} />
      <Path
        d="M12 17v4M10 19h4M7 5c1 2 3 3 5 3s4-1 5-3"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  ),
};
