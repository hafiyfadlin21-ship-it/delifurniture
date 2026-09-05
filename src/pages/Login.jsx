import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Login() {
  const { user, login, logout } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    login({ name: name || "Family member", email });
    navigate("/");
  }

  if (user) {
    return (
      <div className="wrap auth-page">
        <h1>Hej {user.name}!</h1>
        <p>You are signed in to HEIM Family. Member prices apply automatically in this demo.</p>
        <p style={{ color: "var(--muted)" }}>{user.email}</p>
        <button className="btn btn-ghost" type="button" onClick={logout}>Log out</button>
      </div>
    );
  }

  return (
    <div className="wrap auth-page">
      <h1>Hej! Log in or join</h1>
      <p style={{ color: "var(--muted)" }}>
        Create a free HEIM Family account. This is a front-end demo — nothing is sent to a server.
      </p>
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@email.com" />
        <button className="btn btn-blue" type="submit">Continue</button>
      </form>
      <p style={{ marginTop: 24 }}>
        <Link to="/">Back to shopping</Link>
      </p>
    </div>
  );
}
