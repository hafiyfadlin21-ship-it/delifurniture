import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import { formatRM } from "../data/catalog.js";
import { Icon } from "./Icons.jsx";

export default function ProductCard({ product }) {
  const { addToCart, toggleList, inList } = useStore();
  const loved = inList(product.id);

  return (
    <article className="pcard">
      <button
        className={`heart ${loved ? "on" : ""}`}
        type="button"
        aria-label={loved ? "Remove from shopping list" : "Add to shopping list"}
        onClick={() => toggleList(product)}
      >
        <Icon name="heart" size={18} />
      </button>
      <Link to={`/product/${product.id}`}>
        <div className="img">
          <img src={product.image} alt={`${product.name} ${product.type}`} />
        </div>
        {product.offer && <span className="tag">Limited time offer</span>}
        {product.isNew && !product.offer && <span className="tag">New</span>}
        <div className="name">{product.name}</div>
        <div className="type">{product.type}</div>
        <div className="price">
          {formatRM(product.price)}
          {product.oldPrice ? <span className="old">{formatRM(product.oldPrice)}</span> : null}
        </div>
        <div className="stars">★ {product.rating} ({product.reviews})</div>
      </Link>
      <button
        className="bag"
        type="button"
        aria-label={`Add ${product.name} to bag`}
        onClick={() => addToCart(product)}
      >
        <Icon name="bag" size={18} />
      </button>
    </article>
  );
}
