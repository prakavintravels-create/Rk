import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, CheckCircle2, MapPin, Clock3, ShieldCheck, Headphones,
  Plane, Route, BriefcaseBusiness, Compass, Star, Menu, X, Phone,
  MessageCircle, CalendarDays, CarFront, ChevronRight
} from "lucide-react";
import "./styles.css";

const PHONE = "916380772299"; // WhatsApp format: country code + number
const EMAIL = "prakavintravels@gmail.com";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trip, setTrip] = useState({
    pickup: "", drop: "", date: "", time: "", vehicle: "Any suitable car", tripType: "One-way drop"
  });
  const [notice, setNotice] = useState("");

  const update = (e) => setTrip({ ...trip, [e.target.name]: e.target.value });

  const bookTrip = (e) => {
    e.preventDefault();
    if (!trip.pickup.trim() || !trip.drop.trim()) {
      setNotice("Please enter both pickup and drop locations.");
      return;
    }
    const message = [
      "Hello Prakavin Travels! I would like to request a taxi booking.",
      `Trip type: ${trip.tripType}`,
      `Pickup: ${trip.pickup}`,
      `Drop: ${trip.drop}`,
      `Date: ${trip.date || "Not decided"}`,
      `Time: ${trip.time || "Not decided"}`,
      `Vehicle: ${trip.vehicle}`,
      "Please share the fare and availability."
    ].join("\n");
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setNotice("WhatsApp is opening with your booking details. Please send the message to confirm your request.");
  };

  const services = [
    { icon: <Route />, title: "One-Way Drop Taxi", text: "Pay for your journey with a convenient point-to-point trip." },
    { icon: <Plane />, title: "Airport Transfers", text: "Plan airport pickups and drops with a ride arranged in advance." },
    { icon: <BriefcaseBusiness />, title: "Outstation Trips", text: "Comfortable travel for work, family visits and long-distance journeys." },
    { icon: <Compass />, title: "Tour Packages", text: "Plan sightseeing and multi-stop holidays with a trip tailored to you." }
  ];

  const benefits = [
    { icon: <ShieldCheck />, title: "Travel with confidence", text: "Booking details shared clearly before you confirm." },
    { icon: <Clock3 />, title: "Plan ahead", text: "Send your trip request early and coordinate your pickup." },
    { icon: <Headphones />, title: "Direct assistance", text: "Talk to our team by phone or WhatsApp about your journey." }
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Comfortable rides. Clear communication. Every journey.</span>
          <a href={`tel:+${PHONE}`}><Phone size={14} /> +91 63807 72299</a>
        </div>
      </div>

      <header className="header">
        <div className="container nav">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Prakavin Travels home">
            <span className="brand-mark"><CarFront size={27} /></span>
            <span><strong>Prakavin</strong><small>TRAVELS</small></span>
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            <a href="#services" onClick={closeMenu}>Our Services</a>
            <a href="#fleet" onClick={closeMenu}>Our Cars</a>
            <a href="#packages" onClick={closeMenu}>Tour Packages</a>
            <a href="#about" onClick={closeMenu}>About Us</a>
            <a className="nav-cta" href="#booking" onClick={closeMenu}>Book a Taxi <ArrowRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot"></span> YOUR JOURNEY, OUR PRIORITY</div>
              <h1>Go farther.<br /><em>Travel better.</em></h1>
              <p className="hero-lead">Reliable taxi bookings for one-way drops, airport transfers, outstation travel and holidays across India.</p>
              <div className="hero-actions">
                <a className="button button-yellow" href="#booking">Book your ride <ArrowRight size={18} /></a>
                <a className="button button-glass" href="#services">Explore services</a>
              </div>
              <div className="hero-points">
                <span><CheckCircle2 size={17} /> Easy WhatsApp booking</span>
                <span><CheckCircle2 size={17} /> Trips planned around you</span>
              </div>
            </div>
            <div className="booking-card" id="booking">
              <div className="booking-heading">
                <div>
                  <span className="section-kicker">LET'S GET MOVING</span>
                  <h2>Plan your ride</h2>
                </div>
                <span className="booking-icon"><CarFront /></span>
              </div>
              <form onSubmit={bookTrip}>
                <label>Trip type
                  <select name="tripType" value={trip.tripType} onChange={update}>
                    <option>One-way drop</option>
                    <option>Round trip</option>
                    <option>Airport transfer</option>
                    <option>Tour package</option>
                    <option>Outstation trip</option>
                  </select>
                </label>
                <div className="location-field">
                  <label>Pickup location
                    <span className="input-icon"><MapPin size={17} /><input name="pickup" value={trip.pickup} onChange={update} placeholder="Enter pickup city or address" required /></span>
                  </label>
                  <label>Drop location
                    <span className="input-icon"><MapPin size={17} /><input name="drop" value={trip.drop} onChange={update} placeholder="Where are you going?" required /></span>
                  </label>
                </div>
                <div className="form-row">
                  <label>Travel date
                    <span className="input-icon"><CalendarDays size={16} /><input type="date" name="date" value={trip.date} onChange={update} min={new Date().toISOString().split("T")[0]} /></span>
                  </label>
                  <label>Pickup time
                    <span className="input-icon"><Clock3 size={16} /><input type="time" name="time" value={trip.time} onChange={update} /></span>
                  </label>
                </div>
                <label>Preferred vehicle
                  <select name="vehicle" value={trip.vehicle} onChange={update}>
                    <option>Any suitable car</option>
                    <option>Toyota Etios</option>
                    <option>Toyota Innova Crysta</option>
                  </select>
                </label>
                <button className="button button-yellow book-submit" type="submit">Request booking on WhatsApp <MessageCircle size={18} /></button>
                {notice && <p className="form-notice" role="status">{notice}</p>}
                <p className="form-footnote">Your trip is a request until availability and fare are confirmed.</p>
              </form>
            </div>
          </div>
          <div className="hero-bottom">
            <div className="container hero-bottom-inner">
              <span><strong>01</strong> Simple booking</span>
              <span><strong>02</strong> Your route, your plan</span>
              <span><strong>03</strong> Direct communication</span>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            {benefits.map((item) => <div className="trust-item" key={item.title}><span className="trust-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-head">
              <div><span className="section-kicker">TRAVEL YOUR WAY</span><h2>One service. <em>Many destinations.</em></h2></div>
              <p>From a quick airport transfer to a long-distance family trip, tell us where you need to go and we'll help plan the ride.</p>
            </div>
            <div className="service-grid">
              {services.map((item, i) => <article className="service-card" key={item.title}>
                <span className="service-number">0{i + 1}</span>
                <span className="service-icon">{item.icon}</span>
                <h3>{item.title}</h3><p>{item.text}</p>
                <a href="#booking" onClick={() => setTrip({ ...trip, tripType: item.title === "One-Way Drop Taxi" ? "One-way drop" : item.title === "Airport Transfers" ? "Airport transfer" : item.title === "Outstation Trips" ? "Outstation trip" : "Tour package" })}>Plan this trip <ChevronRight size={16} /></a>
              </article>)}
            </div>
          </div>
        </section>

        <section className="fleet-section section" id="fleet">
          <div className="container">
            <div className="section-head">
              <div><span className="section-kicker">YOUR RIDE, YOUR CHOICE</span><h2>Choose your <em>comfort.</em></h2></div>
              <p>Select a vehicle preference when you send your booking request. Final availability and pricing are confirmed directly.</p>
            </div>
            <div className="fleet-grid">
              <article className="car-card">
                <div className="car-image etios-image" role="img" aria-label="White sedan suitable for taxi journeys"><span className="car-tag">Everyday comfort</span></div>
                <div className="car-info"><div><h3>Toyota Etios</h3><p>Comfortable sedan for everyday journeys</p></div><span className="car-symbol"><CarFront /></span></div>
                <div className="car-bottom"><span>Ideal for city-to-city trips</span><a href="#booking" onClick={() => setTrip({ ...trip, vehicle: "Toyota Etios" })}>Select car <ArrowRight size={16} /></a></div>
              </article>
              <article className="car-card">
                <div className="car-image innova-image" role="img" aria-label="Premium white multi-purpose vehicle suitable for family travel"><span className="car-tag">Extra space</span></div>
                <div className="car-info"><div><h3>Toyota Innova Crysta</h3><p>Room for family trips and extra luggage</p></div><span className="car-symbol"><CarFront /></span></div>
                <div className="car-bottom"><span>Ideal for group travel</span><a href="#booking" onClick={() => setTrip({ ...trip, vehicle: "Toyota Innova Crysta" })}>Select car <ArrowRight size={16} /></a></div>
              </article>
            </div>
            <p className="small-note">Vehicle models are preferences only and are subject to availability. No fares or availability are guaranteed by this demo website.</p>
          </div>
        </section>

        <section className="package-section section" id="packages">
          <div className="container package-layout">
            <div className="package-copy">
              <span className="section-kicker">MAKE TIME FOR THE JOURNEY</span>
              <h2>More than a ride.<br /><em>Make it a getaway.</em></h2>
              <p>Planning a family holiday, a weekend escape or a multi-city trip? Share your destinations and dates with us to discuss a tour plan.</p>
              <a className="button button-yellow" href="#booking" onClick={() => setTrip({ ...trip, tripType: "Tour package" })}>Plan a tour package <ArrowRight size={18} /></a>
            </div>
            <div className="package-highlights">
              <div className="package-highlight"><span>01</span><div><h3>Flexible routes</h3><p>Discuss pickup points, stops and destinations.</p></div></div>
              <div className="package-highlight"><span>02</span><div><h3>Family journeys</h3><p>Choose a vehicle preference that suits your group.</p></div></div>
              <div className="package-highlight"><span>03</span><div><h3>Clear trip details</h3><p>Confirm inclusions, timing and price before travel.</p></div></div>
            </div>
          </div>
        </section>

        <section className="about-section section" id="about">
          <div className="container about-grid">
            <div className="about-visual">
              <div className="about-photo"></div>
              <div className="about-stamp"><span>YOUR TRIP</span><strong>MATTERS</strong><span>EVERY MILE</span></div>
            </div>
            <div className="about-copy">
              <span className="section-kicker">WELCOME TO PRAKAVIN TRAVELS</span>
              <h2>Good journeys start with <em>a good plan.</em></h2>
              <p>We make it easy to enquire about your next ride. Share your route, date and vehicle preference, then coordinate directly with our team to confirm the details.</p>
              <ul className="check-list"><li><CheckCircle2 /> Easy booking requests through WhatsApp</li><li><CheckCircle2 /> One-way, airport, outstation and tour enquiries</li><li><CheckCircle2 /> Trip details confirmed before you travel</li></ul>
              <a className="text-link" href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hello Prakavin Travels, I would like to enquire about a taxi booking.")}`} target="_blank" rel="noreferrer">Talk to our team <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="reviews-section section">
          <div className="container">
            <div className="review-heading"><span className="section-kicker">YOUR EXPERIENCE MATTERS</span><h2>Service built around <em>your journey.</em></h2><p>We look forward to earning your trust on every trip.</p></div>
            <div className="review-notice"><Star /><div><strong>Have travelled with us?</strong><p>We welcome genuine customer feedback. Add verified reviews here as your business collects them.</p></div></div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-inner">
            <div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Where will we take you next?</h2><p>Send your route to request a booking and confirm your fare with our team.</p></div>
            <a className="button button-dark" href="#booking">Plan your journey <ArrowRight size={18} /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <a className="brand brand-light" href="#home"><span className="brand-mark"><CarFront size={27} /></span><span><strong>Prakavin</strong><small>TRAVELS</small></span></a>
            <p>Thoughtful travel planning for journeys across India.</p>
            <a className="footer-whatsapp" href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hello Prakavin Travels, I have a booking enquiry.")}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat on WhatsApp</a>
          </div>
          <div><h3>Explore</h3><a href="#services">Our Services</a><a href="#fleet">Our Cars</a><a href="#packages">Tour Packages</a><a href="#about">About Us</a></div>
          <div><h3>Contact</h3><a href={`tel:+${PHONE}`}><Phone size={15} /> +91 63807 72299</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span className="footer-muted">India-wide trip enquiries</span></div>
        </div>
        <div className="footer-bottom"><div className="container"><span>© {new Date().getFullYear()} Prakavin Travels. All rights reserved.</span><a href="#home">Back to top ↑</a></div></div>
      </footer>

      <a className="floating-whatsapp" href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hello Prakavin Travels, I would like to book a taxi.")}`} target="_blank" rel="noreferrer" aria-label="Contact Prakavin Travels on WhatsApp"><MessageCircle size={25} /></a>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
