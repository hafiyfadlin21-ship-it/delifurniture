import { Link } from "react-router-dom";
import { rooms } from "../data/catalog.js";

const tips = [
  {
    title: "Make space for what you love",
    text: "Start with vertical storage. A tall bookcase frees floor space for the sofa you actually sit on.",
    image: rooms[0].image,
  },
  {
    title: "Plan a small kitchen",
    text: "Measure the work triangle first. Then pick cabinets that open without blocking the fridge.",
    image: rooms[2].image,
  },
  {
    title: "Sleep better in a condo bedroom",
    text: "Leave 70 cm of walking space beside the bed. Use under-bed boxes instead of a bulky chest.",
    image: rooms[1].image,
  },
  {
    title: "A desk that disappears at 6pm",
    text: "Choose a shallow desk and a chair that tucks fully underneath. The room becomes a guest space again.",
    image: rooms[3].image,
  },
];

export default function Ideas() {
  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / Plan & ideas
      </div>
      <h1 style={{ fontSize: 40, marginBottom: 12 }}>Plan & ideas</h1>
      <p style={{ maxWidth: 680, color: "var(--muted)" }}>
        HEIM is a Malaysian home furnishing store built around the same idea that made IKEA famous: well-designed,
        functional pieces at prices that work for everyday life. Use these guides to plan a room before you buy.
      </p>
      <div className="grid-4" style={{ gridTemplateColumns: "1fr 1fr", gap: 24, padding: "28px 0 56px" }}>
        {tips.map((t) => (
          <article key={t.title} className="story-card" style={{ minHeight: 360 }}>
            <img src={t.image} alt="" style={{ height: 200 }} />
            <div className="pad">
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <Link to="/rooms" style={{ fontWeight: 700 }}>Explore rooms →</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
