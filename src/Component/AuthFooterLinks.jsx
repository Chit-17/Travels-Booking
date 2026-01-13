// src/components/AuthFooterLinks.jsx
export default function AuthFooterLinks({ mode, onCreate, onLogin }){
  return (
    <div className="footerLinks">
      {mode === "login" ? (
        <button className="linkBtn" type="button" onClick={onCreate}>
          New here? Create an account
        </button>
      ) : (
        <button className="linkBtn" type="button" onClick={onLogin}>
          Already have an account? Login
        </button>
      )}
      <div className="tinyLinks">
        <a className="link" href="/terms">Terms</a>
        <span className="dot">•</span>
        <a className="link" href="/privacy">Privacy</a>
      </div>
    </div>
  );
}
