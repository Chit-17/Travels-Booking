// src/components/inputs/TextInput.jsx
import { useId } from "react";
export default function TextInput({ label, value, onChange, error, ...rest }){
  const id = useId();
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}</label>
      <input
        id={id}
        className={error ? "input invalid" : "input"}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        {...rest}
      />
      {error ? <div className="error">{error}</div> : null}
    </div>
  );
}
