// src/app/AuthPage.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../Component/AuthLayout";
import AuthTabs from "../Component/AuthTabs";
import RoleSwitch from "../Component/RoleSwitch";
import PhoneOrEmailInput from "../Component/inputs/PhoneOrEmailInput";
import TextInput from "../Component/inputs/TextInput";
import PasswordInput from "../Component/inputs/PasswordInput";
import DocUploader from "../Component/DocUploader";
import AuthFooterLinks from "../Component/AuthFooterLinks";
import "../styles/auth.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/; // simple India-centric mobile check

function validateLogin(v){
  const e = {};
  if(!v.identifier) e.identifier = "Enter email or mobile number.";
  else if(!(emailRegex.test(v.identifier) || phoneRegex.test(v.identifier))) {
    e.identifier = "Enter a valid email or 10-digit mobile number.";
  }
  if(!v.password) e.password = "Password is required.";
  return e;
}

function validateRegisterStep1(v){
  const e = {};
  if(!v.fullName) e.fullName = "Full name is required.";
  if(!v.email) e.email = "Email is required.";
  else if(!emailRegex.test(v.email)) e.email = "Enter a valid email.";
  if(!v.mobile) e.mobile = "Mobile number is required.";
  else if(!phoneRegex.test(v.mobile)) e.mobile = "Enter a valid 10-digit mobile number.";
  if(!v.password) e.password = "Password is required.";
  if(!v.confirmPassword) e.confirmPassword = "Confirm your password.";
  if(v.password && v.confirmPassword && v.password !== v.confirmPassword) e.confirmPassword = "Passwords do not match.";
  if(!v.agree) e.agree = "You must agree to the Terms.";
  return e;
}

function validateCustomerStep2(v){
  const e = {};
  // optional fields, keep minimal
  return e;
}

function validateOwnerStep2(v){
  const e = {};
  if(!v.ownerType) e.ownerType = "Select owner type.";
  if(v.ownerType === "company" && !v.companyName) e.companyName = "Company name is required.";
  if(!v.city) e.city = "Operating city is required.";
  if(!v.address) e.address = "Address is required.";
  if(!v.docs?.length) e.docs = "Upload at least one document (Aadhaar/PAN/Driving license).";
  return e;
}

export default function AuthPage(){
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("login"); // login | register
  const [role, setRole] = useState("customer"); // customer | owner

  const [loading, setLoading] = useState(false);
  const [topError, setTopError] = useState("");

  const [login, setLogin] = useState({ identifier: "", password: "", remember: true });
  const [loginErrors, setLoginErrors] = useState({});

  const [step, setStep] = useState(1); // register steps: 1, 2
  const [reg1, setReg1] = useState({ fullName:"", email:"", mobile:"", password:"", confirmPassword:"", agree:false });
  const [reg1Errors, setReg1Errors] = useState({});

  const [cust2, setCust2] = useState({ city:"", language:"English" });
  const [cust2Errors, setCust2Errors] = useState({});

  const [own2, setOwn2] = useState({ ownerType:"individual", companyName:"", address:"", city:"", docs:[], payout:"" });
  const [own2Errors, setOwn2Errors] = useState({});

  const subtitle = useMemo(() => {
    if(tab === "login") return "Login to book tickets or manage rentals";
    return role === "customer" ? "Book bus tickets and rentals faster" : "List vehicles and start earning";
  }, [tab, role]);

  function switchTab(next){
    setTopError("");
    setTab(next);
    if(next === "register") setStep(1);
  }

  async function handleLoginSubmit(e){
    e.preventDefault();
    setTopError("");
    const e1 = validateLogin(login);
    setLoginErrors(e1);
    if(Object.keys(e1).length) return;

    setLoading(true);
    try{
      await login(login.identifier, login.password);
      // Redirect based on role
      // But role state here is just UI toggle, the real role is in user object
      // We can check the response or context user, but for now redirect to home or dashboard
      navigate('/');
    } catch(err) {
        setTopError(err.message || "Wrong credentials. Please try again.");
    } finally{
      setLoading(false);
    }
  }

  function handleRegisterContinue(e){
    e.preventDefault();
    setTopError("");
    const e1 = validateRegisterStep1(reg1);
    setReg1Errors(e1);
    if(Object.keys(e1).length) return;
    setStep(2);
  }

  async function handleCreateCustomer(e){
    e.preventDefault();
    setTopError("");
    const e2 = validateCustomerStep2(cust2);
    setCust2Errors(e2);
    if(Object.keys(e2).length) return;

    setLoading(true);
    try{
      await register({
        name: reg1.fullName,
        email: reg1.email,
        password: reg1.password,
        role: 'user', // force user role
        // phone: reg1.mobile, // backend expects phone
        // address: { city: cust2.city } // etc
        // passing everything might fail if backend strict, but we used spread ...otherDetails
        phone: reg1.mobile,
        address: {
            city: cust2.city
        }
      });
      navigate('/');
    } catch (err) {
        setTopError(err.message || "Registration failed.");
    } finally{
      setLoading(false);
    }
  }

  async function handleSubmitOwner(e){
    e.preventDefault();
    setTopError("");
    const e2 = validateOwnerStep2(own2);
    setOwn2Errors(e2);
    if(Object.keys(e2).length) return;

    setLoading(true);
    try{
      await register({
        name: reg1.fullName,
        email: reg1.email,
        password: reg1.password,
        role: 'fleet_owner',
        phone: reg1.mobile,
        companyName: own2.companyName,
        address: {
            street: own2.address,
            city: own2.city
        },
        verificationStatus: 'pending',
        documents: own2.docs // array of strings (URLs)
      });
      navigate('/'); // Or to a pending verification page
    } catch (err) {
        setTopError(err.message || "Registration failed.");
    } finally{
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title={tab === "login" ? "Welcome back" : "Create your account"}
      subtitle={subtitle}
      trustLine="Secure login - Encrypted payments later during booking"
    >
      <AuthTabs value={tab} onChange={switchTab} />

      <RoleSwitch value={role} onChange={setRole} label="Choose role" />

      {topError ? <div className="alert" role="alert">{topError}</div> : null}

      {tab === "login" && (
        <form className="form" onSubmit={handleLoginSubmit} noValidate>
          <PhoneOrEmailInput
            label="Email or mobile"
            value={login.identifier}
            onChange={(v)=>setLogin(s=>({ ...s, identifier:v }))}
            error={loginErrors.identifier}
            placeholder="name@email.com or 9876543210"
            autoComplete="username"
          />

          <PasswordInput
            label="Password"
            value={login.password}
            onChange={(v)=>setLogin(s=>({ ...s, password:v }))}
            error={loginErrors.password}
            autoComplete="current-password"
          />

          <div className="rowBetween">
            <label className="check">
              <input
                type="checkbox"
                checked={login.remember}
                onChange={(e)=>setLogin(s=>({ ...s, remember:e.target.checked }))}
              />
              Remember me
            </label>
            <a className="link" href="/forgot">Forgot password?</a>
          </div>

          <button className="btnPrimary" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>

          <div className="divider"><span>or</span></div>

          <button className="btnGhost" type="button" onClick={()=>alert("Google OAuth here")}>
            Continue with Google
          </button>

          <AuthFooterLinks
            mode="login"
            onCreate={() => switchTab("register")}
          />
        </form>
      )}

      {tab === "register" && (
        <>
          {step === 1 && (
            <form className="form" onSubmit={handleRegisterContinue} noValidate>
              <TextInput
                label="Full name"
                value={reg1.fullName}
                onChange={(v)=>setReg1(s=>({ ...s, fullName:v }))}
                error={reg1Errors.fullName}
                autoComplete="name"
              />
              <TextInput
                label="Email"
                value={reg1.email}
                onChange={(v)=>setReg1(s=>({ ...s, email:v }))}
                error={reg1Errors.email}
                autoComplete="email"
              />
              <TextInput
                label="Mobile number"
                value={reg1.mobile}
                onChange={(v)=>setReg1(s=>({ ...s, mobile:v }))}
                error={reg1Errors.mobile}
                inputMode="numeric"
                autoComplete="tel"
              />
              <PasswordInput
                label="Password"
                value={reg1.password}
                onChange={(v)=>setReg1(s=>({ ...s, password:v }))}
                error={reg1Errors.password}
                autoComplete="new-password"
              />
              <PasswordInput
                label="Confirm password"
                value={reg1.confirmPassword}
                onChange={(v)=>setReg1(s=>({ ...s, confirmPassword:v }))}
                error={reg1Errors.confirmPassword}
                autoComplete="new-password"
              />

              <label className="check">
                <input
                  type="checkbox"
                  checked={reg1.agree}
                  onChange={(e)=>setReg1(s=>({ ...s, agree:e.target.checked }))}
                />
                I agree to Terms
              </label>
              {reg1Errors.agree ? <div className="error">{reg1Errors.agree}</div> : null}

              <button className="btnPrimary" type="submit">
                Continue
              </button>

              <AuthFooterLinks
                mode="register"
                onLogin={() => switchTab("login")}
              />
            </form>
          )}

          {step === 2 && role === "customer" && (
            <form className="form" onSubmit={handleCreateCustomer} noValidate>
              <TextInput
                label="City (optional)"
                value={cust2.city}
                onChange={(v)=>setCust2(s=>({ ...s, city:v }))}
                error={cust2Errors.city}
                placeholder="Search city"
              />

              <div className="field">
                <label className="label">Preferred language</label>
                <select
                  className="select"
                  value={cust2.language}
                  onChange={(e)=>setCust2(s=>({ ...s, language: e.target.value }))}
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                </select>
              </div>

              <button className="btnPrimary" disabled={loading}>
                {loading ? "Creating…" : "Create account"}
              </button>

              <AuthFooterLinks mode="register" onLogin={() => switchTab("login")} />
            </form>
          )}

          {step === 2 && role === "owner" && (
            <form className="form" onSubmit={handleSubmitOwner} noValidate>
              <div className="field">
                <label className="label">Owner type</label>
                <div className="seg">
                  <button
                    type="button"
                    className={own2.ownerType === "individual" ? "segBtn on" : "segBtn"}
                    onClick={()=>setOwn2(s=>({ ...s, ownerType:"individual", companyName:"" }))}
                  >
                    Individual
                  </button>
                  <button
                    type="button"
                    className={own2.ownerType === "company" ? "segBtn on" : "segBtn"}
                    onClick={()=>setOwn2(s=>({ ...s, ownerType:"company" }))}
                  >
                    Company
                  </button>
                </div>
                {own2Errors.ownerType ? <div className="error">{own2Errors.ownerType}</div> : null}
              </div>

              {own2.ownerType === "company" && (
                <TextInput
                  label="Business/Company name"
                  value={own2.companyName}
                  onChange={(v)=>setOwn2(s=>({ ...s, companyName:v }))}
                  error={own2Errors.companyName}
                />
              )}

              <TextInput
                label="Operating city"
                value={own2.city}
                onChange={(v)=>setOwn2(s=>({ ...s, city:v }))}
                error={own2Errors.city}
              />

              <TextInput
                label="Address"
                value={own2.address}
                onChange={(v)=>setOwn2(s=>({ ...s, address:v }))}
                error={own2Errors.address}
              />

              <DocUploader
                label="Document upload"
                hint="Upload Driving license / Aadhaar / PAN (RC per vehicle later)."
                files={own2.docs}
                onFiles={(files)=>setOwn2(s=>({ ...s, docs: files }))}
                error={own2Errors.docs}
              />

              <TextInput
                label="Bank/UPI payout details (optional)"
                value={own2.payout}
                onChange={(v)=>setOwn2(s=>({ ...s, payout:v }))}
                placeholder="UPI ID or bank details"
              />

              <div className="note">
                Your account will be reviewed before your listings go live.
              </div>

              <button className="btnPrimary" disabled={loading}>
                {loading ? "Submitting…" : "Submit for verification"}
              </button>

              <AuthFooterLinks mode="register" onLogin={() => switchTab("login")} />
            </form>
          )}
        </>
      )}
    </AuthLayout>
  );
}
