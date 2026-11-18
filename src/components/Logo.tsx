/**
 * Line Energy wordmark, rebuilt from the client's logo (white "Line", yellow "E", white "nergy",
 * small "сонячні системи" underneath). Text-based so it stays crisp at any size.
 */
export function Logo({ sub = true, className = "" }: { sub?: boolean; className?: string }) {
  return (
    <span className={`logo ${className}`} aria-hidden="true">
      <span className="logo-word">
        Line<b>E</b>nergy
      </span>
      {sub && <span className="logo-sub">сонячні системи</span>}
    </span>
  );
}
