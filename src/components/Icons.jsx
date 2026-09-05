export function Icon({ name, size = 22 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    search: <circle cx="11" cy="11" r="7" />,
    user: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 19c1.5-3.2 4-5 7-5s5.5 1.8 7 5" />
      </>
    ),
    heart: <path d="M12 20s-7-4.4-7-9.2A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7 3.8C19 15.6 12 20 12 20z" />,
    bag: (
      <>
        <path d="M6 8h12l-1 12H7L6 8z" />
        <path d="M9 8V7a3 3 0 0 1 6 0v1" />
      </>
    ),
    truck: (
      <>
        <path d="M3 7h11v10H3z" />
        <path d="M14 11h4l3 3v3h-7" />
        <circle cx="7" cy="18" r="1.4" />
        <circle cx="17" cy="18" r="1.4" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="1.5" />
        <path d="M3 10h18" />
      </>
    ),
    store: (
      <>
        <path d="M4 10h16v10H4z" />
        <path d="M4 10 6 4h12l2 6" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: <path d="M6 6l12 12M18 6L6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="M5 12l5 5L20 7" />,
  };
  return (
    <svg {...p}>
      {name === "search" && <path d="M20 20l-3.5-3.5" />}
      {paths[name]}
    </svg>
  );
}
