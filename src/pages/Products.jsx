import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { byCategory, categories, products } from "../data/catalog.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  const { category } = useParams();
  const cat = categories.find((c) => c.slug === category);
  const [sort, setSort] = useState("featured");
  const [onlyOffer, setOnlyOffer] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  const list = useMemo(() => {
    let items = category ? byCategory(category) : products;
    if (onlyOffer) items = items.filter((p) => p.offer);
    if (onlyNew) items = items.filter((p) => p.isNew);
    if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "rating") items = [...items].sort((a, b) => b.rating - a.rating);
    return items;
  }, [category, sort, onlyOffer, onlyNew]);

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link>
        {cat ? ` / ${cat.name}` : ""}
      </div>
      <div className="toolbar">
        <div>
          <h1 style={{ fontSize: 36 }}>{cat ? cat.name : "All products"}</h1>
          <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>{list.length} products</p>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ height: 44, padding: "0 12px" }}>
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Customer rating</option>
        </select>
      </div>
      <div className="filters">
        <button className={`chip ${onlyOffer ? "on" : ""}`} type="button" onClick={() => setOnlyOffer((v) => !v)}>
          Offers
        </button>
        <button className={`chip ${onlyNew ? "on" : ""}`} type="button" onClick={() => setOnlyNew((v) => !v)}>
          New
        </button>
        {!category &&
          categories.slice(0, 8).map((c) => (
            <Link key={c.slug} className="chip" to={`/products/${c.slug}`}>
              {c.name}
            </Link>
          ))}
      </div>
      <div className="grid-4" style={{ padding: "24px 0 48px" }}>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="empty">
          <h2>No products match these filters</h2>
          <p>Try clearing Offers or New, or browse another category.</p>
        </div>
      )}
    </div>
  );
}
