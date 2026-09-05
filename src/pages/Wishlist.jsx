import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { getProduct } from "../data/catalog.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist() {
  const { list } = useStore();
  const items = list.map((i) => getProduct(i.id)).filter(Boolean);

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / Shopping list
      </div>
      <h1 style={{ fontSize: 36 }}>Shopping list</h1>
      {items.length === 0 ? (
        <div className="empty">
          <h2>Nothing saved yet</h2>
          <p>Tap the heart on a product to keep it here while you plan a room.</p>
          <Link to="/products" className="btn btn-blue">Browse products</Link>
        </div>
      ) : (
        <div className="grid-4" style={{ padding: "24px 0 48px" }}>
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
