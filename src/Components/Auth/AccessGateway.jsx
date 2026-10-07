import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import coverImg from "../../assets/cover-transparent.png";
import logoImg from "../../assets/AAFI-Logo.png";
import "./AccessGateway.css";

function AccessGateway({ mode }) {
  const isSignup = mode === "signup";
  const isChoice = mode === "choice";
  const adminMode = mode === "admin";
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, signup, continueAsGuest, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (isSignup && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await (isSignup
        ? signup(form.name, form.email, form.password)
        : login(form.email, form.password, adminMode ? "admin" : undefined));
      navigate("/admin", { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return <main className="gateway-shell">
    <div className="gateway-art">
      <div className="gateway-book-stage"><div className="gateway-book"><img src={coverImg} alt="AAFI Designs book cover" /><img className="gateway-book-logo" src={logoImg} alt="" /></div></div>
    </div>
    <section className="gateway-panel"><div className="gateway-panel-inner">
      <div className="gateway-mobile-logo"><ShieldCheck size={18} /> AAFI Designs</div>
      <div className="gateway-heading">
        <p className="gateway-kicker">{isSignup ? "Create your account" : adminMode ? "Administrator access" : isChoice ? "Welcome to AAFI Designs" : "Welcome to AAFI Designs"}</p>
        <h1>{isSignup ? "Join us." : adminMode ? "Admin sign in." : isChoice ? "Choose how to continue." : "Welcome back."}</h1>
        <p>{isSignup ? "Create an account to start your book cover project." : adminMode ? "Sign in with your administrator account to manage orders." : isChoice ? "Browse as a guest or sign in to the admin workspace." : "Sign in to continue to your workspace."}</p>
      </div>
      {isChoice ? <div className="gateway-entry-options">
        <button type="button" className="gateway-submit" onClick={() => { continueAsGuest(); navigate("/book", { replace: true }); }}>Continue as guest<ArrowRight size={17} /></button>
        <button type="button" className="gateway-admin-button" onClick={() => navigate("/admin/login")}>Login as admin</button>
      </div> : <form className="gateway-form" onSubmit={submit}>
        {isSignup && <label>Your name<div className="input-wrap"><UserRound size={17} /><input autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" minLength={2} maxLength={100} required /></div></label>}
        <label>Email address<div className="input-wrap"><UserRound size={17} /><input type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" required /></div></label>
        <label>Password<div className="input-wrap"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder={isSignup ? "At least 8 characters" : "Your password"} minLength={isSignup ? 8 : undefined} maxLength={72} required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
        {isSignup && <label>Confirm password<div className="input-wrap"><LockKeyhole size={17} /><input type="password" autoComplete="new-password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} placeholder="Repeat password" minLength={8} maxLength={72} required /></div></label>}
        {error && <p className="gateway-alert error" role="alert">{error}</p>}
        <button className="gateway-submit" disabled={loading}>{loading ? "Please wait..." : isSignup ? "Create account" : "Sign in"}<ArrowRight size={17} /></button>
      </form>}
      {!isChoice && !adminMode && <div className="gateway-options">
        <p className="gateway-switch">{isSignup ? "Already have an account?" : "New to AAFI Designs?"}{" "}
          <Link to="/login">{isSignup ? "Back to continue options" : "Continue options"}</Link>
        </p>
      </div>}
      {adminMode && <div className="gateway-options">
        <p className="gateway-switch"><Link to="/login">Back to continue options</Link></p>
        <p className="gateway-switch">Need a customer account? <Link to="/signup">Create an account</Link></p>
      </div>}
      {!isChoice && <p className="gateway-note"><ShieldCheck size={14} /> Your account is securely managed by AAFI Designs.</p>}
    </div></section>
  </main>;
}

export default AccessGateway;
