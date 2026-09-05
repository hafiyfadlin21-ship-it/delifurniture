import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatRM, getProduct, products } from "../data/catalog.js";
import { useStore } from "../context/StoreContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { Icon } from "../components/Icons.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart, toggleList, inList } = useStore();
  const [color, setColor] = useState(product?.colors[0] || "");
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="wrap empty">
        <h2>Product not found</h2>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function add() {
    addToCart(product, { color, qty });
    setToast("Added to bag");
    setTimeout(() => setToast(""), 1800);
  }

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / <Link to={`/products/${product.category}`}>Products</Link> / {product.name}
      </div>
      <div className="pdp">
        <div className="gallery">
          {product.images.map((src, i) => (
            <img key={src + i} src={src} alt={`${product.name} ${i + 1}`} />
          ))}
        </div>
        <div className="buy">
          {product.offer && <span className="tag">Limited time offer</span>}
          <h1 className="name">{product.name}</h1>
          <div className="type">{product.type}</div>
          <div className="price">
            {formatRM(product.price)}
            {product.oldPrice ? <span className="old">{formatRM(product.oldPrice)}</span> : null}
          </div>
          <div className="stars">★ {product.rating} ({product.reviews} reviews)</div>
          <p>{product.description}</p>
          <div>
            <strong>Colour</strong>
            <div className="swatches">
              {product.colors.map((c) => (
                <button key={c} className={`swatch ${c === color ? "on" : ""}`} type="button" onClick={() => setColor(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="qty">
            <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease">
              −
            </button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((n) => n + 1)} aria-label="Increase">
              +
            </button>
          </div>
          <div className="buy-actions">
            <button className="btn btn-blue" type="button" onClick={add}>
              Add to bag
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => toggleList(product)}>
              <Icon name="heart" size={16} /> {inList(product.id) ? "Saved" : "Save"}
            </button>
          </div>
          <button className="btn btn-dark" type="button" style={{ width: "100%", marginTop: 10 }} onClick={() => { add(); navigate("/checkout"); }}>
            Buy now
          </button>
          <div className="meta">
            <p>Measurements: {product.size}</p>
            <p>Article number: {product.article}</p>
            <p>Delivery from RM9 · Click & collect free · 365-day returns on unused items</p>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="section">
          <h2>You might also like</h2>
          <div className="grid-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
