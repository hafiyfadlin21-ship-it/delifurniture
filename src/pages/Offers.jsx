import { Link } from "react-router-dom";
import { products, stories } from "../data/catalog.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Offers() {
  const deals = products.filter((p) => p.offer);
  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / Offers
      </div>
      <h1 style={{ fontSize: 40 }}>Offers & promotions</h1>
      <div className="banner-lite">
        <div>
          <strong>Gift card campaign</strong>
          <p style={{ margin: "6px 0 0" }}>Spend on RAMVERK storage until 10 Nov and earn a HEIM Gift Card up to RM500.</p>
        </div>
        <Link to="/products/storage" className="btn btn-dark">
          Shop storage
        </Link>
      </div>
      <div className="story-row" style={{ marginBottom: 32 }}>
        {stories.map((s) => (
          <article key={s.id} className="story-card">
            <img src={s.image} alt="" />
            <div className="pad">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>
      <h2 style={{ marginBottom: 16 }}>Limited time prices</h2>
      <div className="grid-4" style={{ paddingBottom: 48 }}>
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
