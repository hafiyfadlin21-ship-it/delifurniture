import { Link, useSearchParams } from "react-router-dom";
import { searchProducts } from "../data/catalog.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const results = searchProducts(q);

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / Search
      </div>
      <h1 style={{ fontSize: 32 }}>Results for “{q}”</h1>
      <p style={{ color: "var(--muted)" }}>{results.length} products</p>
      {results.length === 0 ? (
        <div className="empty">
          <h2>No matches</h2>
          <p>Try “sofa”, “desk”, “lamp” or a product name like VARDAG.</p>
          <Link to="/products" className="btn btn-blue">Browse all</Link>
        </div>
      ) : (
        <div className="grid-4" style={{ padding: "24px 0 48px" }}>
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
