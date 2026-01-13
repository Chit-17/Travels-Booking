// src/components/inputs/PasswordInput.jsx
import { useId, useState } from "react";

export default function PasswordInput({ label, value, onChange, error, autoComplete }){
  const id = useId();
  const [show, setShow] = useState(false);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}</label>
      <div className="pwWrap">
        <input
          id={id}
          className={error ? "input invalid" : "input"}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e)=>onChange(e.target.value)}
          autoComplete={autoComplete}
        />
        <button
          className="pwBtn"
          type="button"
          aria-pressed={show}
          aria-controls={id}
          onClick={()=>setShow(s=>!s)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
}
