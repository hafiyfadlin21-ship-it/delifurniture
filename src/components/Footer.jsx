import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div>
          <h3>Deli Furniture Membership</h3>
          <p style={{ color: "var(--muted)", marginTop: 0 }}>
            Join for free and get member prices, birthday points and early access to new collections.
          </p>
          <Link to="/login" className="btn btn-dark" style={{ marginTop: 12 }}>
            Join for free/bayar
          </Link>
        </div>
        <div>
          <h3>Shop at Deli</h3>
          <Link to="/products">All products</Link>
          <Link to="/offers">Product offers</Link>
          <Link to="/products">New arrivals</Link>
          <Link to="/rooms">Room inspiration</Link>
          <Link to="/services">Planning tools</Link>
        </div>
        <div>
          <h3>Customer service</h3>
          <Link to="/services">Our services</Link>
          <Link to="/services">Delivery</Link>
          <Link to="/services">Track your order</Link>
          <Link to="/services">Return policy</Link>
          <Link to="/services">FAQ</Link>
        </div>
        <div>
          <h3>This is Deli Furniture</h3>
          <Link to="/ideas">About us</Link>
          <Link to="/login">Deli Furniture Family</Link>
          <Link to="/services">Deli Furniture for Business</Link>
          <Link to="/ideas">A sustainable everyday</Link>
        </div>
        <div>
          <h3>News & media</h3>
          <Link to="/offers">Corporate news</Link>
          <Link to="/services">Product recalls</Link>
          <Link to="/services">Media contacts</Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© Deli Furniture Papar , Jalan Pengalat , Papar , Malaysia , 89600</span>
        <span>Privacy · Cookies · Terms of purchase</span>
      </div>
    </footer>
  );
}
