import { Image } from "expo-image";

// Official PULSE wordmark (transparent olive / bone PNGs)
const OLIVE = require("../../assets/images/pulse/logo-olive.png");
const BONE = require("../../assets/images/pulse/logo-bone.png");

// source aspect ratio ≈ 1290 x 360 → 3.58
const RATIO = 1290 / 360;

export default function Logo({ tone = "olive", height = 22 }: { tone?: "olive" | "bone"; height?: number }) {
  return (
    <Image source={tone === "bone" ? BONE : OLIVE} style={{ height, width: height * RATIO }} contentFit="contain" />
  );
}
