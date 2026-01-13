// src/components/RoleSwitch.jsx
export default function RoleSwitch({ value, onChange, label }){
  return (
    <fieldset className="roleField">
      <legend className="legend">{label}</legend>
      <div className="roleSeg">
        <label className={value==="customer" ? "roleOpt on" : "roleOpt"}>
          <input
            type="radio"
            name="role"
            value="customer"
            checked={value==="customer"}
            onChange={()=>onChange("customer")}
          />
          Customer
        </label>
        <label className={value==="owner" ? "roleOpt on" : "roleOpt"}>
          <input
            type="radio"
            name="role"
            value="owner"
            checked={value==="owner"}
            onChange={()=>onChange("owner")}
          />
          Fleet Owner
        </label>
      </div>
    </fieldset>
  );
}
