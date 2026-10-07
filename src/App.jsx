import React from "react";
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import AccessGateway from "./Components/Auth/AccessGateway";
import AdminPanel from "./Components/Admin/AdminPanel";
import Book from "./Components/Book/Book";
import "./App.css";

const landingFor = (user) => user?.role === "guest" ? "/book" : "/admin";

function AuthenticationLoading() {
  return <main className="auth-loading" role="status">Checking authentication...</main>;
}

function PublicOnly({ mode }) {
  const { user, status } = useAuth();
  if (status !== "ready") return <AuthenticationLoading />;
  if (user) return <Navigate to={landingFor(user)} replace />;
  return <AccessGateway mode={mode} />;
}

function UserRoute() {
  const { user, status } = useAuth();
  const location = useLocation();
  if (status !== "ready") return <AuthenticationLoading />;
  if (!user) return <Navigate to="/login" state={{ from: `${location.pathname}${location.search}` }} replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "guest" && location.pathname !== "/book") return <Navigate to="/book" replace />;
  return <Outlet />;
}

function AdminRoute() {
  const { user, status } = useAuth();
  if (status !== "ready") return <AuthenticationLoading />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "guest") return <Navigate to="/book" replace />;
  return <AdminPanel />;
}

function UserNavigation() {
  const { user, logout, exitGuest } = useAuth();
  const navigate = useNavigate();
  if (user.role === "guest") {
    return <button className="guest-back-login" onClick={() => { exitGuest(); navigate("/login", { replace: true }); }}>
      Back to login
    </button>;
  }

  const signOut = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return <nav className="user-navigation" aria-label="Account navigation">
    <Link to="/book">AAFI Designs</Link>
    <span>{user.name}</span>
    <Link to="/profile">Profile</Link>
    <button onClick={signOut}>Log out</button>
  </nav>;
}

function BookPage() {
  return <><UserNavigation /><Book /></>;
}

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    navigate("/login", { replace: true });
  };
  return <main className="profile-page">
    <header><Link to="/book">AAFI Designs</Link><button onClick={signOut}>Log out</button></header>
    <section><p className="gateway-kicker">Your account</p><h1>Profile</h1><dl><dt>Name</dt><dd>{user.name}</dd><dt>Email</dt><dd>{user.email}</dd><dt>Role</dt><dd>{user.role}</dd></dl><Link className="profile-return" to="/book">Continue to your book project</Link></section>
  </main>;
}

function NotFound() {
  const { user } = useAuth();
  return <main className="not-found">
    <p className="gateway-kicker">AAFI Designs</p>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to={user ? landingFor(user) : "/login"}>{user ? "Go to your workspace" : "Go to login"}</Link>
  </main>;
}

function App() {
  const { status } = useAuth();
  if (status !== "ready") return <AuthenticationLoading />;

  return <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<PublicOnly mode="choice" />} />
    <Route path="/admin/login" element={<PublicOnly mode="admin" />} />
    <Route path="/signup" element={<PublicOnly mode="signup" />} />
    <Route path="/admin" element={<AdminRoute />} />
    <Route element={<UserRoute />}>
      <Route path="/book" element={<BookPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>;
}

export default App;
