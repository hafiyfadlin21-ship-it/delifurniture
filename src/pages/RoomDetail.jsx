import { Link, useParams } from "react-router-dom";
import { byRoom, rooms } from "../data/catalog.js";
import ProductCard from "../components/ProductCard.jsx";

export default function RoomDetail() {
  const { slug } = useParams();
  const room = rooms.find((r) => r.slug === slug);
  const items = byRoom(slug);

  if (!room) {
    return (
      <div className="wrap empty">
        <h2>Room not found</h2>
        <Link to="/rooms">All rooms</Link>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / <Link to="/rooms">Rooms</Link> / {room.name}
      </div>
      <div className="hero-split" style={{ margin: "16px 0 28px" }}>
        <div className="hero-promo" style={{ background: "#0058a3" }}>
          <h3>{room.name}</h3>
          <p style={{ fontSize: 18, maxWidth: "28ch" }}>{room.blurb}</p>
        </div>
        <div className="hero-photo">
          <img src={room.image} alt={room.name} />
        </div>
      </div>
      <h2 style={{ marginBottom: 16 }}>{items.length} products for this room</h2>
      <div className="grid-4" style={{ paddingBottom: 48 }}>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {items.length === 0 && (
        <p>We are still furnishing this room online. Browse <Link to="/products">all products</Link>.</p>
      )}
    </div>
  );
}
