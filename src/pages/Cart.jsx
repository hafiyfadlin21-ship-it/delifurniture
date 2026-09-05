import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatRM } from "../data/catalog.js";

export default function Cart() {
  const { cart, setQty, removeFromCart, cartTotal } = useStore();
  const delivery = cartTotal >= 300 || cartTotal === 0 ? 0 : 9;

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link to="/">Home</Link> / Shopping bag
      </div>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>Shopping bag</h1>
      {cart.length === 0 ? (
        <div className="empty">
          <h2>Your bag is empty</h2>
          <p>Fill it with sofas, storage and the little things that make a room work.</p>
          <Link to="/products" className="btn btn-blue">Continue shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.map((item) => (
              <div className="cart-item" key={item.key}>
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <div>
                  <Link to={`/product/${item.id}`}>
                    <strong style={{ textTransform: "uppercase" }}>{item.name}</strong>
                  </Link>
                  <div className="type">{item.type}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)", margin: "6px 0" }}>{item.color}</div>
                  <div className="qty">
                    <button type="button" onClick={() => setQty(item.key, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => setQty(item.key, item.qty + 1)}>+</button>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.key)} style={{ background: "none", border: 0, marginTop: 10, cursor: "pointer", textDecoration: "underline" }}>
                    Remove
                  </button>
                </div>
                <div className="price-col" style={{ fontWeight: 800 }}>
                  {formatRM(item.price * item.qty)}
                </div>
              </div>
            ))}
          </div>
          <aside className="summary">
            <h3>Order summary</h3>
            <div className="sum-row"><span>Products</span><span>{formatRM(cartTotal)}</span></div>
            <div className="sum-row"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatRM(delivery)}</span></div>
            <div className="sum-row" style={{ fontWeight: 800, fontSize: 18, marginTop: 12 }}>
              <span>Total</span><span>{formatRM(cartTotal + delivery)}</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>Free delivery on orders RM300 and above.</p>
            <Link to="/checkout" className="btn btn-blue">Checkout</Link>
            <Link to="/products" className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}>Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
