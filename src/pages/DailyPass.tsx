import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pmpmlLogo from "../assets/images/pmpml-logo.png";

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

function DailyPass() {
  const [now, setNow] = useState<Date>(() => new Date());
  const [showDemoQR, setShowDemoQR] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  // Calculate the countdown to the end of the current local day.
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);

  const remainingSeconds = Math.max(
    0,
    Math.floor((midnight.getTime() - now.getTime()) / 1000),
  );

  const hours = String(
    Math.floor(remainingSeconds / 3600),
  ).padStart(2, "0");

  const minutes = String(
    Math.floor((remainingSeconds % 3600) / 60),
  ).padStart(2, "0");

  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  return (
    <main className="pass-screen">
      {/* Top navigation */}
      <header className="pass-topbar">
        <Link
          to="/"
          className="pass-close"
          aria-label="Back to dashboard"
        >
          ×
        </Link>

        <nav className="pass-top-links" aria-label="Pass navigation">
          <button
            type="button"
            onClick={() => {
              window.alert("This is a demonstration application.");
            }}
          >
            Need Help?
          </button>

          <Link to="/daily-pass">All passes</Link>
        </nav>
      </header>

      <section className="pass-content">
        <article className="reference-pass">
          {/* Marathi heading */}
          <div className="reference-pass-heading">
            पुणे महानगर परिवहन महामंडळ लि.
          </div>

          {/* Pass details */}
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

          {/* Perforated divider */}
          <div
            className="reference-perforation"
            aria-hidden="true"
          />

          {/* Booking and validity times */}
          <div className="reference-booking">
            <div>
              <span>Booking Time</span>
              <strong>
                {formatDate(now)} | {formatTime(now)}
              </strong>
            </div>

            <div>
              <span>Validity Time</span>
              <strong>
                {formatDate(now)} | 11:59 PM
              </strong>
            </div>
          </div>

          {/* Clearly marked demonstration reference */}
          <div className="reference-number">
            DEMO · NOT VALID FOR TRAVEL
          </div>

          {/* Red pass strip */}
          <div className="reference-pass-strip">
            One Day Pass
          </div>

          {/* Imported logo with zoom animation */}
          <div className="reference-emblem-area">
            <div className="demo-logo-wrapper">
              <img
                src={pmpmlLogo}
                alt="Logo displayed in the demonstration pass"
                className="pmpml-logo"
              />

              <span className="logo-demo-label">
                DEMONSTRATION ONLY
              </span>
            </div>
          </div>

          {/* Live countdown */}
          <footer className="reference-expiry">
            Demo preview · {hours}:{minutes}:{seconds} remaining today
          </footer>
        </article>

        {/* Demo QR button */}
        <button
          type="button"
          className="reference-qr-button"
          onClick={() => setShowDemoQR((previous) => !previous)}
          aria-expanded={showDemoQR}
        >
          <span aria-hidden="true">▦</span>
          {showDemoQR ? "Hide demo QR code" : "Show demo QR code"}
        </button>

        {/* Non-functional QR placeholder */}
        {showDemoQR && (
          <div className="demo-qr-panel">
            <div className="demo-qr-pattern" aria-hidden="true">
              <span>DEMO</span>
            </div>

            <p>
              Demonstration placeholder only. This is not a
              scannable or valid travel-validation QR code.
            </p>
          </div>
        )}

        <p className="pass-disclaimer">
          DEMONSTRATION ONLY · NOT AN OFFICIAL PMPML PASS
        </p>
      </section>
    </main>
  );
}

export default DailyPass;