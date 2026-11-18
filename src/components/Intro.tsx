/**
 * First-visit curtain: the "E" of the wordmark flickers on like a lamp, a yellow line charges
 * from left to right, then the curtain lifts. Pure CSS, so content never waits for JavaScript.
 * The inline script in the layout adds html.no-intro on repeat views and away from the home page.
 */
export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-mark">
        <span className="logo-word intro-word">
          Line<b>E</b>nergy
        </span>
        <span className="intro-bar">
          <i />
        </span>
        <span className="intro-pct mono">заряд</span>
      </div>
    </div>
  );
}
