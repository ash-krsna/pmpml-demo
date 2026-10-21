import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import pmpmlLogo from "../assets/images/pmpml-logo.png";

const REFERENCE_PREFIX = "1610181310U1TZ6";
const REFERENCE_SUFFIXES = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
}

function formatTime(date: Date): string {
  return date
    .toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
}

function getDailyDemoReference(date: Date): string {
  // Stable for the local calendar day; this is not a real ticket identifier.
  const dayValue = Math.floor(
    new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() /
      86_400_000,
  );
  // Anchor the sequence so the reference ends in F on 21 Oct 2026.
  const anchorDay = Math.floor(new Date(2026, 9, 21).getTime() / 86_400_000);
  const suffixIndex =
    ((dayValue - anchorDay + REFERENCE_SUFFIXES.indexOf("F")) %
      REFERENCE_SUFFIXES.length +
      REFERENCE_SUFFIXES.length) %
    REFERENCE_SUFFIXES.length;
  const suffix = REFERENCE_SUFFIXES[suffixIndex];
  return `${REFERENCE_PREFIX}${suffix}`;
}

function DailyPass() {
  const [now, setNow] = useState<Date>(() => new Date());
  const [showDemoQR, setShowDemoQR] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const showQrButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showDemoQR) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDemoQR(false);
      }
      if (event.key === "Tab") {
        // Keep keyboard focus inside the simple two-control dialog.
        const closeButton = closeButtonRef.current;
        if (event.shiftKey && document.activeElement === closeButton) {
          event.preventDefault();
          showQrButtonRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDemoQR]);

  useEffect(() => {
    if (!showDemoQR) showQrButtonRef.current?.focus({ preventScroll: true });
  }, [showDemoQR]);

  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const remainingSeconds = Math.max(
    0,
    Math.floor((midnight.getTime() - now.getTime()) / 1000),
  );
  const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  return (
    <main className="pass-screen">
      <div className="pass-blue-strip" aria-hidden="true" />

      <header className="pass-topbar">
        <Link to="/" className="pass-close" aria-label="Back to dashboard">
          ×
        </Link>

        <nav className="pass-top-links" aria-label="Pass navigation">
          <button
            type="button"
            onClick={() => window.alert("This is a demonstration application.")}
          >
            Need Help?
          </button>
          <Link to="/daily-pass">All Passes</Link>
        </nav>
      </header>

      <section className="pass-content" aria-label="Daily pass demonstration">
        <article className="reference-pass">
          <div className="reference-pass-heading">
            पुणे महानगर परिवहन महामंडळ लि.
          </div>

          <div className="reference-pass-details">
            <div>
              <span>Pass Type</span>
              <strong>PMC &amp; PCMC</strong>
            </div>
            <div>
              <span>ID</span>
              <strong>8183</strong>
            </div>
            <div>
              <span>Fare</span>
              <strong>₹70.83</strong>
            </div>
          </div>

          <div className="reference-perforation" aria-hidden="true" />

          <div className="reference-booking">
            <div>
              <span>Booking Time</span>
              <strong>{formatDate(now)} | {formatTime(now)}</strong>
            </div>
            <div>
              <span>Validity Time</span>
              <strong>{formatDate(now)} | 11:59 PM</strong>
            </div>
          </div>

          <div className="reference-number" aria-label="Demonstration reference number">
            {getDailyDemoReference(now)}
          </div>

          <div className="reference-pass-strip">One Day Pass</div>

          <div className="reference-emblem-area">
            <img
              src={pmpmlLogo}
              alt="PMPML logo shown for demonstration"
              className="pmpml-logo"
            />
          </div>

          <footer className="reference-expiry">
            Expires in {hours}:{minutes}:{seconds}
          </footer>
        </article>

        <button
          ref={showQrButtonRef}
          type="button"
          className="reference-qr-button"
          onClick={() => setShowDemoQR(true)}
        >
          <span aria-hidden="true">▦</span>
          Show QR Code
        </button>

      </section>

      {showDemoQR && (
        <div
          className="demo-qr-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowDemoQR(false);
          }}
        >
          <section
            className="demo-qr-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-qr-title"
            aria-describedby="demo-qr-disclaimer"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="demo-qr-close"
              aria-label="Close QR code dialog"
              onClick={() => setShowDemoQR(false)}
            >
              ×
            </button>
            <h2 id="demo-qr-title">QR Code Preview</h2>
            <div className="demo-qr-pattern" role="img" aria-label="Decorative QR-style demonstration placeholder; not scannable">
              <span>DEMO</span>
            </div>
            <p id="demo-qr-disclaimer">Demo QR Code — Not Valid for Travel</p>
            <small>This decorative placeholder is not scannable and cannot validate a journey.</small>
          </section>
        </div>
      )}
    </main>
  );
}

export default DailyPass;
