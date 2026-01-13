// src/components/AuthTabs.jsx
export default function AuthTabs({ value, onChange }){
  return (
    <div className="tabs" role="tablist" aria-label="Authentication tabs">
      <button
        className={value==="login" ? "tab on" : "tab"}
        role="tab"
        aria-selected={value==="login"}
        type="button"
        onClick={()=>onChange("login")}
      >
        Login
      </button>
      <button
        className={value==="register" ? "tab on" : "tab"}
        role="tab"
        aria-selected={value==="register"}
        type="button"
        onClick={()=>onChange("register")}
      >
        Register
      </button>
    </div>
  );
}
