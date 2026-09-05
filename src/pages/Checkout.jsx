import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatRM } from "../data/catalog.js";

export default function Checkout() {
  const { cart, cartTotal, clearCart, user } = useStore();
  const [done, setDone] = useState(false);
  const [method, setMethod] = useState("collect");
  const navigate = useNavigate();
  const delivery = method === "deliver" && cartTotal < 300 ? 9 : 0;
  const total = cartTotal + delivery;

  if (cart.length === 0 && !done) {
    return (
      <div className="wrap empty">
        <h2>Your bag is empty</h2>
        <Link to="/products">Continue shopping</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="wrap auth-page">
        <h1>Tack! Order received</h1>
        <p>NEHH DUIT HILANG</p>
        <Link to="/" className="btn btn-blue">Back to home</Link>
      </div>
    );
  }

  function place(e) {
    e.preventDefault();
    clearCart();
    setDone(true);
  }

  return (
    <div className="wrap" style={{ paddingBottom: 48 }}>
      <div className="crumbs">
        <Link to="/cart">Bag</Link> / Checkout
      </div>
      <h1 style={{ fontSize: 36 }}>Checkout</h1>
      <div className="cart-layout">
        <form className="form" onSubmit={place}>
          <h3>Contact</h3>
          <label htmlFor="cname">Full name</label>
          <input id="cname" required defaultValue={user?.name || ""} />
          <label htmlFor="cemail">Email</label>
          <input id="cemail" type="email" required defaultValue={user?.email || ""} />
          <label htmlFor="cphone">Mobile</label>
          <input id="cphone" required placeholder="01X-XXXXXXX" />
          <h3 style={{ marginTop: 12 }}>How would you like to get it?</h3>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="radio" name="m" checked={method === "collect"} onChange={() => setMethod("collect")} />
            Click & collect — free
          </label>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="radio" name="m" checked={method === "deliver"} onChange={() => setMethod("deliver")} />
            Home delivery {cartTotal >= 300 ? "(free over RM300)" : "(from RM9)"}
          </label>
          {method === "deliver" && (
            <>
              <label htmlFor="addr">Address</label>
              <textarea id="addr" required placeholder="Street, city, postcode" />
            </>
          )}
          {method === "collect" && (
            <>
              <label htmlFor="store">Store</label>
              <select id="store">
                <option>Deli Furniture Papar</option>
              </select>
            </>
          )}
          <h3 style={{ marginTop: 12 }}>Payment (demo)</h3>
          <label htmlFor="card">Card number</label>
          <input id="card" required placeholder="•••• •••• •••• 4242" />
          <button className="btn btn-blue" type="submit">Place order · {formatRM(total)}</button>
        </form>
        <aside className="summary">
          <h3>{cart.length} items</h3>
          {cart.map((i) => (
            <div className="sum-row" key={i.key}>
              <span>{i.name} × {i.qty}</span>
              <span>{formatRM(i.price * i.qty)}</span>
            </div>
          ))}
          <div className="sum-row"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatRM(delivery)}</span></div>
          <div className="sum-row" style={{ fontWeight: 800 }}><span>Total</span><span>{formatRM(total)}</span></div>
          <button className="btn btn-ghost" type="button" style={{ width: "100%" }} onClick={() => navigate("/cart")}>
            Edit bag
          </button>
        </aside>
      </div>
    </div>
  );
}
