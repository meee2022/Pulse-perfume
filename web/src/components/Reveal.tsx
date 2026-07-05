"use client";

// Content is visible by default; the entrance is a pure CSS enhancement that
// never gates visibility (safe on hidden tabs / reduced motion / no-JS).
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
