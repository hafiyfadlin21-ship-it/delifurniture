import { Link } from "react-router-dom";
import { rooms } from "../data/catalog.js";

export default function Rooms() {
  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / Rooms
      </div>
      <h1 style={{ fontSize: 40, margin: "8px 0 20px" }}>Shop by room</h1>
      <p style={{ maxWidth: 640, color: "var(--muted)" }}>
        Start with the room, not the product. Each space is styled with pieces you can buy as a set or one at a time.
      </p>
      <div className="idea-grid" style={{ padding: "28px 0 56px" }}>
        {rooms.map((r) => (
          <Link key={r.slug} className="idea-card" to={`/rooms/${r.slug}`} style={{ minHeight: 280 }}>
            <img src={r.image} alt="" />
            <span>{r.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
