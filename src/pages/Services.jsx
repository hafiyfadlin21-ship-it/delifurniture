import { Link } from "react-router-dom";
import { Icon } from "../components/Icons.jsx";

const services = [
  { icon: "truck", title: "Home delivery", text: "From RM9 for parcels. Large furniture is scheduled in 2-hour windows across Peninsular Malaysia." },
  { icon: "store", title: "Click & collect", text: "Order online, pick up at Cheras, Batu Kawan, Johor or your nearest HEIM store. Free." },
  { icon: "card", title: "0% instalments", text: "6, 12 or 24 months with Maybank, Public Bank, CIMB, Hong Leong and HSBC." },
  { icon: "check", title: "Assembly", text: "We assemble in your home from RM80. Book with delivery or after you collect." },
  { icon: "pin", title: "Kitchen planning", text: "Book a 60-minute session in-store. Bring measurements or we can visit." },
  { icon: "bag", title: "365-day returns", text: "Unused items in original packaging. Price-drop protection for 60 days after purchase." },
];

export default function Services() {
  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / Services
      </div>
      <h1 style={{ fontSize: 40 }}>Services</h1>
      <p style={{ color: "var(--muted)", maxWidth: 640 }}>Extra help is available whenever you need it — from the first measurement to the last screw.</p>
      <div className="grid-4" style={{ gridTemplateColumns: "1fr 1fr", padding: "28px 0 20px" }}>
        {services.map((s) => (
          <article key={s.title} className="service-card" style={{ background: "var(--grey)", padding: 24, borderRadius: 4 }}>
            <div className="ico"><Icon name={s.icon} /></div>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="banner-lite">
        <div>
          <strong>Track an order</strong>
          <p style={{ margin: "6px 0 0" }}>This demo does not connect to a warehouse. In production, enter your order number here.</p>
        </div>
        <Link to="/cart" className="btn btn-dark">Go to bag</Link>
      </div>
    </div>
  );
}
