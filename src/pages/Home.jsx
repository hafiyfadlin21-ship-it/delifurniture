import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, formatRM, products, stories } from "../data/catalog.js";
import ProductCard from "../components/ProductCard.jsx";
import { Icon } from "../components/Icons.jsx";

export default function Home() {
  const featured = products.find((p) => p.id === "besta-tv");
  const [hot, setHot] = useState(false);
  const arrivals = products.filter((p) => p.isNew);
  const ideas = [
    { title: "Store it or curate it", image: products[6].image, to: "/products/storage" },
    { title: "Go modular", image: products[5].image, to: "/products/storage" },
    { title: "Show what makes you happy", image: products[17].image, to: "/products/decor" },
  ];

  return (
    <div className="wrap">
      <div className="cat-strip">
        {categories.map((c) => (
          <Link key={c.slug} className="cat-tile" to={`/products/${c.slug}`}>
            <div className="thumb">
              <img src={c.image} alt="" />
            </div>
            {c.name}
          </Link>
        ))}
      </div>

      <div className="hero-copy">
        <h1>A place for everything. A place for everyone.</h1>
        <h2>Offer sini</h2>
        <p>
          offer desc
        </p>
        <p>Available while stocks last.</p>
      </div>

      <div className="hero-split">
        <div className="hero-promo">
          <span className="pill">3 Sep – 10 Nov 2026</span>
          <h3>offer/promo ad sini</h3>
          <Link to="/offers" className="btn btn-dark" style={{ alignSelf: "flex-start" }}>
            Shop the offer
          </Link>
        </div>
        <div className="hero-photo">
          <img
            src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=1400&q=80"
            alt="Living room with a TV bench and storage"
          />
          <button className="hotspot" style={{ left: "42%", top: "62%" }} type="button" onClick={() => setHot((v) => !v)} aria-label="Show product" />
          {hot && featured && (
            <Link className="hot-card" to={`/product/${featured.id}`} style={{ left: "46%", top: "68%" }}>
              <div className="row">
                <img src={featured.image} alt="" />
                <div>
                  <strong>{featured.name}</strong>
                  <div className="type">{featured.type}</div>
                  <div>{formatRM(featured.price)}</div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="service-row">
        <Link className="service-card" to="/services">
          <div className="ico"><Icon name="truck" /></div>
          <div>
            <h3>Delivery as low as RM9*</h3>
            <p>From small parcels to big furniture, we’ll deliver to your doorstep.</p>
          </div>
        </Link>
        <Link className="service-card" to="/services">
          <div className="ico"><Icon name="card" /></div>
          <div>
            <h3>Flexible payments, 0% interest</h3>
            <p>Shop online with 6, 12 or 24 month instalments on major bank cards.</p>
          </div>
        </Link>
        <Link className="service-card" to="/services">
          <div className="ico"><Icon name="store" /></div>
          <div>
            <h3>Free click & collect</h3>
            <p>Add to cart now and collect in-store for free.</p>
          </div>
        </Link>
        <Link className="service-card" to="/services">
          <div className="ico"><Icon name="check" /></div>
          <div>
            <h3>See all services</h3>
            <p>Assembly, planning and extra help whenever you need it.</p>
          </div>
        </Link>
      </div>

      <section className="section">
        <h2>Explore new collections this month</h2>
        <div className="story-row">
          {stories.map((s) => (
            <Link key={s.id} className="story-card" to="/offers">
              <img src={s.image} alt="" />
              <div className="pad">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Store & organise essentials</h2>
        <div className="idea-grid">
          {ideas.map((i) => (
            <Link key={i.title} className="idea-card" to={i.to}>
              <img src={i.image} alt="" />
              <span>{i.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>New arrivals</h2>
        <div className="grid-4">
          {arrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="family">
          <div>
            <h2>Welcome to HEIM Family — the club that is actually for everyone</h2>
            <p>
              Some clubs are for the select few. HEIM Family is not. Sign up free for member prices,
              birthday points and a few surprises all year round.
            </p>
            <Link to="/login" className="btn btn-dark">
              Join for free
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
            alt="Family in a furnished living room"
          />
        </div>
      </section>

      <section className="section">
        <h2>You may also like</h2>
        <div className="grid-4">
          {products.filter((p) => p.offer).slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
