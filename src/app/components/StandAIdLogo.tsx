export function StandAIdLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`tracking-tight ${className}`}>
      <span style={{ color: "#1D1D1F" }}>Stand</span>
      <span style={{ color: "#DC2626" }}>AI</span>
      <span style={{ color: "#1D1D1F" }}>d</span>
    </span>
  );
}