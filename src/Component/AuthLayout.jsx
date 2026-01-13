// src/components/AuthLayout.jsx
export default function AuthLayout({ title, subtitle, trustLine, children }){
  return (
    <div className="authPage">
      <div className="authGrid">
        <aside className="authSide">
          <div className="sideOverlay" />
          <div className="sideContent">
            <div className="brandMark">TripFleet</div>
            <h2 className="sideTag">Book tickets. Manage rentals. Grow fleets.</h2>
            <ul className="sideList">
              <li>Fast checkout and saved travelers</li>
              <li>Verified fleet owners & listings</li>
              <li>Support during booking</li>
            </ul>
          </div>
        </aside>

        <main className="authMain">
          <section className="card">
            <div className="brandRow">
              <div className="logoDot" aria-hidden="true" />
              <div>
                <div className="appName">TripFleet</div>
                <div className="trust">{trustLine}</div>
              </div>
            </div>

            <header className="head">
              <h1 className="h1">{title}</h1>
              <p className="sub">{subtitle}</p>
            </header>

            {children}

            <div className="legal">
              By continuing, you agree to Terms & Privacy.
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
