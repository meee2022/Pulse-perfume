/* eslint-disable @next/next/no-img-element */
// Official PULSE wordmark (transparent PNG from the brand). Tone "light" flips it
// to paper-white for use over dark imagery.
export default function Logo({
  tone = "dark",
  height = 26,
  className = "",
}: {
  tone?: "dark" | "light";
  height?: number;
  className?: string;
}) {
  return (
    <img
      src="/images/logo-original.png"
      alt="PULSE Perfume"
      style={{ height, filter: tone === "light" ? "brightness(0) invert(1)" : undefined }}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
