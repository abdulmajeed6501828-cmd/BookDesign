import React from "react";
import Book from "./Components/Book/Book";
import "./App.css";
import AdminPanel from "./Components/Admin/AdminPanel";
import AccessGateway from "./Components/Auth/AccessGateway";

function App() {
  if (window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/")) {
    return <AdminPanel />;
  }

  return (
    <main>
      <Book />
    </main>
  );
}

export default App;
