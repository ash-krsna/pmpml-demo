import { Link } from "react-router-dom";

function Ticket() {
  return (
    <main className="app-shell inner-page">
      <header className="app-header">
        <Link to="/" className="back-button" aria-label="Back to dashboard">
          ←
        </Link>

        <div className="page-header-title">
          <h1>Bus Ticket</h1>
          <p>Journey planner demo</p>
        </div>
      </header>

      <section className="ticket-placeholder">
        <div className="placeholder-icon">🚌</div>
        <span className="eyebrow">PLAN YOUR JOURNEY</span>
        <h2>Where are you travelling?</h2>
        <p>
          This demonstration page will let you explore a sample bus journey.
        </p>

        <label htmlFor="from-stop">From</label>
        <input id="from-stop" placeholder="e.g. Swargate" />

        <label htmlFor="to-stop">To</label>
        <input id="to-stop" placeholder="e.g. Pune Station" />

        <button
          className="primary-button"
          onClick={() => alert("Journey planning will be added next.")}
        >
          Plan Demo Journey
        </button>

        <p className="demo-disclaimer">
          Demo only. No real tickets can be purchased here.
        </p>
      </section>

      <Link to="/" className="return-home">
        ← Return to dashboard
      </Link>
    </main>
  );
}

export default Ticket;