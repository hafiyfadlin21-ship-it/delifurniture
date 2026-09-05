import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { categories, rooms } from "../data/catalog.js";
import { Icon } from "./Icons.jsx";

export default function Header() {
  const { cartCount, list, user, postcode, setPostcode } = useStore();
  const [q, setQ] = useState("");
  const [mega, setMega] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const navigate = useNavigate();

  function onSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setMobile(false);
  }

  return (
    <>
      <div className="util">
        <div className="util-inner">
          <div className="util-left">
            <button type="button">
              <Icon name="globe" size={16} /> MY | English
            </button>
          </div>
          <div className="util-promo">
            <Icon name="card" size={16} /> Deli Furniture - Based in Papar, Sabah
          </div>
          <div className="util-right">
            <button type="button" onClick={() => setPostOpen((v) => !v)}>
              <Icon name="truck" size={16} /> {postcode || "Enter postal code"}
            </button>
          </div>
        </div>
      </div>
      {postOpen && (
        <div style={{ background: "#111", color: "#fff", padding: "12px 0" }}>
          <form
            className="wrap"
            style={{ display: "flex", gap: 8, alignItems: "center" }}
            onSubmit={(e) => {
              e.preventDefault();
              setPostOpen(false);
            }}
          >
            <span style={{ fontSize: 13 }}>Check delivery for your area</span>
            <input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="e.g. 50450"
              style={{ height: 40, borderRadius: 4, border: 0, padding: "0 12px", width: 160 }}
            />
            <button className="btn btn-yellow" type="submit" style={{ padding: "8px 16px" }}>
              Save
            </button>
          </form>
        </div>
      )}
      <header className="header" onMouseLeave={() => setMega(null)}>
        <div className="header-main">
          <button className="menu-toggle" type="button" onClick={() => setMobile(true)} aria-label="Open menu">
            <Icon name="menu" />
          </button>
          <Link to="/" className="logo" aria-label="DELI home">
            <img src="/logo.png" alt="DELI" />
          </Link>
          <nav className="nav-links">
            <button type="button" onMouseEnter={() => setMega("products")}>
              Products
            </button>
            <button type="button" onMouseEnter={() => setMega("rooms")}>
              Rooms
            </button>
            <Link to="/offers" onMouseEnter={() => setMega(null)}>
              Offers
            </Link>
            <Link to="/ideas" onMouseEnter={() => setMega(null)}>
              Plan & ideas
            </Link>
            <Link to="/services" onMouseEnter={() => setMega(null)}>
              Services
            </Link>
          </nav>
          <form className="search" onSubmit={onSearch}>
            <Icon name="search" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="What are you looking for?"
              aria-label="Search for products"
            />
          </form>
          <div className="header-actions">
            <Link className="icon-btn" to="/login">
              <Icon name="user" />
              <span>{user ? user.name.split(" ")[0] : "Log in"}</span>
            </Link>
            <Link className="icon-btn" to="/list" aria-label="Shopping list">
              <Icon name="heart" />
              {list.length > 0 && <span className="badge">{list.length}</span>}
            </Link>
            <Link className="icon-btn" to="/cart" aria-label="Shopping cart">
              <Icon name="bag" />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
        {mega === "products" && (
          <div className="mega">
            <div className="wrap mega-grid">
              {categories.map((c) => (
                <Link key={c.slug} to={`/products/${c.slug}`} onClick={() => setMega(null)}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        {mega === "rooms" && (
          <div className="mega">
            <div className="wrap mega-grid">
              {rooms.map((r) => (
                <Link key={r.slug} to={`/rooms/${r.slug}`} onClick={() => setMega(null)}>
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      {mobile && (
        <div className="mobile-nav" style={{ display: "block" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/" className="logo" onClick={() => setMobile(false)} aria-label="DELI home">
              <img src="/logo.png" alt="DELI" />
            </Link>
            <button type="button" onClick={() => setMobile(false)} aria-label="Close" style={{ background: "none", border: 0 }}>
              <Icon name="close" />
            </button>
          </div>
          <form className="search" style={{ margin: "20px 0" }} onSubmit={onSearch}>
            <Icon name="search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" />
          </form>
          <nav style={{ display: "grid", gap: 12, fontWeight: 700, fontSize: 20 }}>
            <Link to="/products" onClick={() => setMobile(false)}>Products</Link>
            <Link to="/rooms" onClick={() => setMobile(false)}>Rooms</Link>
            <Link to="/offers" onClick={() => setMobile(false)}>Offers</Link>
            <Link to="/ideas" onClick={() => setMobile(false)}>Plan & ideas</Link>
            <Link to="/services" onClick={() => setMobile(false)}>Services</Link>
            <Link to="/login" onClick={() => setMobile(false)}>Log in</Link>
          </nav>
        </div>
      )}
    </>
  );
}
