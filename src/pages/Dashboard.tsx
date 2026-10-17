import { Link } from "react-router-dom";
import "../assets/styles/global.css";

const services = [
  {
    icon: "🎫",
    title: "Bus Ticket",
    description: "Explore and book your bus journey",
    action: "View Ticket",
    link: "/ticket",
    className: "ticket-service",
  },
  {
    icon: "🚌",
    title: "Daily Pass",
    description: "Travel throughout the day with a demo pass",
    action: "View Pass",
    link: "/daily-pass",
    className: "pass-service",
  },
];

function Dashboard() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">P</div>
          <div>
            <h1>PMPML</h1>
            <p>City Mobility Demo</p>
          </div>
        </div>

        <button
          className="help-button"
          onClick={() => alert("Welcome to the PMPML demo app!")}
        >
          Need Help?
        </button>
      </header>

      <section className="welcome-section">
        <span className="eyebrow">YOUR CITY. YOUR JOURNEY.</span>
        <h2>Where would you like to go?</h2>
        <p>Plan your next journey around Pune.</p>
      </section>

      <section className="search-section">
        <label htmlFor="destination">Search your destination</label>

        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            id="destination"
            type="text"
            placeholder="उदा. स्वारगेट, पुणे स्टेशन"
          />
          <button
            aria-label="Search destination"
            onClick={() => alert("Destination search demo")}
          >
            →
          </button>
        </div>

        <p className="search-hint">Find a destination to plan your trip.</p>
      </section>

      <section className="services-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TRAVEL MADE SIMPLE</span>
            <h2>Our Services</h2>
          </div>
          <span className="section-count">02 SERVICES</span>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article
              className={`service-card ${service.className}`}
              key={service.title}
            >
              <div className="service-icon">{service.icon}</div>

              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <Link className="service-link" to={service.link}>
                  {service.action} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="nearby-section">
        <div className="nearby-icon">⌖</div>
        <div>
          <h3>Nearby bus stops</h3>
          <p>Discover stops around your location.</p>
        </div>
        <span className="nearby-arrow">→</span>
      </section>

      <footer className="demo-notice">
        <span>ⓘ</span>
        Demonstration application — not an official ticketing service.
      </footer>

      <nav className="bottom-navigation" aria-label="Main navigation">
        <Link to="/" className="nav-item active">
          <span>⌂</span>
          <small>Home</small>
        </Link>

        <Link to="/ticket" className="nav-item">
          <span>▤</span>
          <small>Buses</small>
        </Link>

        <button
          className="nav-item"
          onClick={() => alert("Help centre demo")}
        >
          <span>?</span>
          <small>Help</small>
        </button>
      </nav>
    </main>
  );
}

export default Dashboard;