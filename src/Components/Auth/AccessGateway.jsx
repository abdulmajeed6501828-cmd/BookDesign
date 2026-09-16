 import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound, X } from "lucide-react";
import { adminLogin, adminSignup } from "../../context/apiClient";
import coverImg from "../../assets/cover.jpeg";
import logoImg from "../../assets/AAFI-Logo.png";
import "./AccessGateway.css";

function AccessGateway() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setMessage("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (mode === "signup" && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        await adminSignup(form.email, form.password);
        setMessage("Account created. Sign in to open the admin dashboard.");
        setMode("login");
        setForm({ ...form, confirmPassword: "" });
      } else {
        await adminLogin(form.email, form.password);
        window.location.assign("/admin");
      }
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return <main className="gateway-shell">
    <div className="gateway-art"><div className="gateway-book-stage"><div className="gateway-book"><img src={coverImg} alt="AAFI Designs book cover" /><img className="gateway-book-logo" src={logoImg} alt="" /></div></div></div>
    <section className="gateway-panel"><div className="gateway-panel-inner"><div className="gateway-mobile-logo"><ShieldCheck size={18} /> AAFI Designs</div><div className="gateway-heading"><p className="gateway-kicker">Private workspace</p><h1>{mode === "login" ? "Welcome back." : "Create admin access."}</h1><p>{mode === "login" ? "Sign in to manage customer orders and projects." : "Register an administrator account for your team."}</p></div><div className="auth-tabs"><button className={mode === "login" ? "selected" : ""} onClick={() => switchMode("login")}>Admin login</button><button className={mode === "signup" ? "selected" : ""} onClick={() => switchMode("signup")}>Admin signup</button></div><form className="gateway-form" onSubmit={submit}><label>Email address<div className="input-wrap"><UserRound size={17} /><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="admin@aafidesigns.com" required /></div></label><label>Password<div className="input-wrap"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={mode === "signup" ? "At least 8 characters" : "Your password"} minLength={mode === "signup" ? 8 : undefined} required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>{mode === "signup" && <label>Confirm password<div className="input-wrap"><LockKeyhole size={17} /><input type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} placeholder="Repeat password" minLength={8} required /></div></label>}{error && <p className="gateway-alert error"><X size={15} />{error}</p>}{message && <p className="gateway-alert success"><CheckCircle2 size={15} />{message}</p>}<button className="gateway-submit" disabled={loading}>{loading ? "Please wait..." : mode === "login" ? "Open dashboard" : "Create admin account"}<ArrowRight size={17} /></button></form><div className="guest-divider"><span>or</span></div><button className="guest-button" onClick={() => window.location.assign("/landing")}><span><Eye size={17} /> Continue as guest</span><ArrowRight size={16} /></button><p className="gateway-note"><ShieldCheck size={14} /> Admin credentials are required for order management.</p></div></section>
  </main>;
}

export default AccessGateway;