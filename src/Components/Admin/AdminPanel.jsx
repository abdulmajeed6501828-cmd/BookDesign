import React, { useEffect, useMemo, useState } from "react";
import logoImg from "../../assets/AAFI-Logo.png";
import {
  AlertCircle,
  ArrowDownUp,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  FileDown,
  ExternalLink,
  LayoutDashboard,
  Mail,
  LogOut,
  Menu,
  Package,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Truck,
  UserRound,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { adminLogin, getAdminOrders, getDownloadUrl, getUploadUrl, updateAdminOrder } from "../../context/apiClient";
import "./AdminPanel.css";
import "./AdminAttachments.css";

const STATUS_LABELS = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
};

const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;
const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-";

const fileNameFromPath = (filePath) => String(filePath || "").split(/[\\/]/).pop();
const getOrderFiles = (order) => {
  const files = [];
  const addPath = (path, label, type = "application/octet-stream") => {
    const filename = fileNameFromPath(path);
    if (filename) files.push({ filename, label, type });
  };
  addPath(order.print_cover_template, "Print cover template", "application/pdf");
  addPath(order.author_photo, "Author photo", "image/*");
  addPath(order.additional_document, "Additional document");
  const inspiration = Array.isArray(order.design_inspiration) ? order.design_inspiration : [];
  inspiration.forEach((path, index) => addPath(path, `Design inspiration ${index + 1}`, "image/*"));
  let attachments = order.attachments || [];
  if (typeof attachments === "string") {
    try { attachments = JSON.parse(attachments || "[]"); } catch { attachments = []; }
  }
  attachments.forEach((file) => files.push({ filename: file.originalName || file.filename, urlFilename: file.filename, label: "Additional file", type: file.mimeType || "application/octet-stream" }));
  return files;
};

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(form.email, form.password);
      onLogin();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-auth">
      <section className="auth-card">
        <div className="brand-mark"><ShieldCheck size={24} /></div>
        <p className="eyebrow">AAFI Designs</p>
        <h1>Admin workspace</h1>
        <p className="auth-copy">Sign in to review incoming orders and keep every project moving.</p>
        <form onSubmit={submit}>
          <label>Email address<input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label>Password<input type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          {error && <p className="form-error"><AlertCircle size={15} />{error}</p>}
          <button className="primary-button" disabled={loading}>{loading ? "Signing in..." : "Sign in"}<ChevronDown size={16} className="rotate-minus-90" /></button>
        </form>
      </section>
    </main>
  );
}

function StatCard({ label, value, icon, tone }) {
  const StatIcon = icon;
  return <article className={`stat-card ${tone}`}><div className="stat-icon"><StatIcon size={20} /></div><div><span>{label}</span><strong>{value}</strong></div></article>;
}

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}><span />{STATUS_LABELS[status] || status}</span>;
}

function DetailModal({ order, onClose, onStatus }) {
  if (!order) return null;
  const files = getOrderFiles(order);
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="detail-modal" role="dialog" aria-modal="true" aria-label="Order details">
      <header className="modal-header"><div><p className="eyebrow">Order #{order.id}</p><h2>{order.book_title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close details"><X size={20} /></button></header>
      <div className="detail-status"><StatusBadge status={order.order_status} /><span>Placed {formatDate(order.created_at)}</span></div>
      <div className="detail-grid">
        <div className="detail-section"><h3><UserRound size={16} /> Customer</h3><p>{order.client_name}</p><a href={`mailto:${order.email}`}>{order.email}</a><p>{order.phone || "Phone not provided"}</p></div>
        <div className="detail-section"><h3><Package size={16} /> Order</h3><p>{order.book_title}</p><p>{order.cover_type} cover · Qty 1</p><p>Author: {order.author_name}</p></div>
        <div className="detail-section"><h3><FileText size={16} /> Pricing</h3><div className="price-row"><span>Design package</span><strong>{formatMoney(order.cover_price)}</strong></div><div className="price-row total"><span>Total</span><strong>{formatMoney(order.cover_price)}</strong></div></div>
        <div className="detail-section"><h3><Truck size={16} /> Payment & delivery</h3><p>Payment: <b>{order.payment_status || "pending"}</b></p><p>Digital delivery</p></div>
      </div>
      <div className="attachments-section"><h3><FileText size={16} /> Attached files ({files.length})</h3>{files.length ? <div className="attachment-list">{files.map((file, index) => <div className="attachment-item" key={`${file.filename}-${index}`}><div className="attachment-info"><FileText size={17} /><div><b>{file.filename}</b><span>{file.label} · {file.type}</span></div></div><div className="attachment-actions"><a href={getUploadUrl(file.urlFilename || file.filename)} target="_blank" rel="noreferrer" aria-label={`View ${file.filename}`} title="View file"><ExternalLink size={16} /></a><a href={getDownloadUrl(file.urlFilename || file.filename)} aria-label={`Download ${file.filename}`} title="Download file"><FileDown size={16} /></a></div></div>)}</div> : <p className="no-attachments">No uploaded files for this order.</p>}</div>
      <div className="timeline"><h3>Order timeline</h3><div className="timeline-item"><CheckCircle2 size={17} /><div><b>Order received</b><span>{formatDate(order.created_at)}</span></div></div><div className={`timeline-item ${order.order_status !== "pending" ? "complete" : "muted"}`}><Clock3 size={17} /><div><b>{STATUS_LABELS[order.order_status]}</b><span>{formatDate(order.updated_at)}</span></div></div></div>
      {order.rejection_reason && <div className="reason-note"><b>Rejection reason</b><p>{order.rejection_reason}</p></div>}
      {order.order_status === "pending" && <footer className="modal-actions"><button className="secondary-button danger" onClick={() => onStatus("rejected")}>Reject</button><button className="primary-button compact" onClick={() => onStatus("accepted")}>Accept order <Check size={16} /></button></footer>}
    </section>
  </div>;
}

function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(Boolean(window.localStorage.getItem("aafi_admin_token")));
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    setError("");
    try { const response = await getAdminOrders(); setOrders(response.data || []); } catch (loadError) { setError(loadError.message); if (loadError.message.toLowerCase().includes("session")) setAuthenticated(false); } finally { setLoading(false); }
  };

  useEffect(() => { if (authenticated) loadOrders(); }, [authenticated]);
  useEffect(() => { if (!notice) return undefined; const timer = window.setTimeout(() => setNotice(""), 3500); return () => window.clearTimeout(timer); }, [notice]);

  const counts = useMemo(() => orders.reduce((result, order) => { result.total += 1; result[order.order_status] = (result[order.order_status] || 0) + 1; return result; }, { total: 0 }), [orders]);
  const filteredOrders = useMemo(() => orders.filter((order) => {
    const query = search.toLowerCase();
    const matchesSearch = !query || [order.id, order.client_name, order.email, order.book_title].some((value) => String(value || "").toLowerCase().includes(query));
    const age = dateFilter === "all" ? true : Date.now() - new Date(order.created_at).getTime() <= Number(dateFilter) * 86400000;
    return matchesSearch && (status === "all" || order.order_status === status) && age;
  }).sort((a, b) => sort === "newest" ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at)), [orders, search, status, dateFilter, sort]);
  const customers = useMemo(() => {
    const customerMap = new Map();
    orders.forEach((order) => {
      const key = String(order.email || order.client_name || "unknown").toLowerCase();
      const current = customerMap.get(key) || { name: order.client_name || "Unknown customer", email: order.email || "No email", phone: order.phone || "", orders: 0, latestOrder: order };
      current.orders += 1;
      if (new Date(order.created_at) > new Date(current.latestOrder.created_at)) current.latestOrder = order;
      if (!current.phone && order.phone) current.phone = order.phone;
      customerMap.set(key, current);
    });
    return Array.from(customerMap.values()).sort((a, b) => new Date(b.latestOrder.created_at) - new Date(a.latestOrder.created_at));
  }, [orders]);

  const changeStatus = async (order, nextStatus) => {
    const message = nextStatus === "accepted" ? "Are you sure you want to accept this order?" : "Are you sure you want to reject this order?";
    if (!window.confirm(message)) return;
    const reason = nextStatus === "rejected" ? window.prompt("Optional rejection reason:", "") : "";
    try { const response = await updateAdminOrder(order.id, nextStatus, reason || ""); setOrders((current) => current.map((item) => item.id === order.id ? response.data : item)); setSelected(null); setNotice(response.emailSent === false ? `Order #${order.id} marked ${STATUS_LABELS[nextStatus].toLowerCase()}, but the customer email was not sent.` : `Order #${order.id} marked ${STATUS_LABELS[nextStatus].toLowerCase()} and the customer was emailed.`); } catch (statusError) { setError(statusError.message); }
  };

  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;

  return <div className="admin-shell">
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}><div className="sidebar-brand"><img className="sidebar-logo" src={logoImg} alt="AAFI Designs" /><div className="sidebar-brand-copy"><b>AAFI DESIGNS</b><small>ADMIN CONSOLE</small></div><button className="icon-button sidebar-close" onClick={() => setSidebarOpen(false)}><PanelLeftClose size={18} /></button></div><nav><button className={view === "dashboard" ? "active" : ""} onClick={() => { setView("dashboard"); setSidebarOpen(false); }}><LayoutDashboard size={18} /> Dashboard</button><button className={view === "orders" ? "active" : ""} onClick={() => { setView("orders"); setSidebarOpen(false); }}><Package size={18} /> Orders <span className="nav-count">{counts.pending || 0}</span></button><button className={view === "customers" ? "active" : ""} onClick={() => { setView("customers"); setSidebarOpen(false); }}><Users size={18} /> Customers <span className="nav-count">{customers.length}</span></button></nav><button className="logout-button" onClick={() => { window.localStorage.removeItem("aafi_admin_token"); setAuthenticated(false); }}><LogOut size={18} /> Log out</button></aside>
    {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
    <main className="admin-main"><header className="admin-topbar"><button className="mobile-menu icon-button" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button><div><p className="eyebrow">Operations / {view}</p><h1>{view === "dashboard" ? "Good morning, admin" : view === "customers" ? "Customer directory" : "Orders management"}</h1></div><div className="topbar-meta"><span className="live-dot" /> Live data <button className="avatar">A</button></div></header>
      {error && <div className="alert error"><AlertCircle size={17} />{error}<button onClick={() => setError("")}><X size={15} /></button></div>}{notice && <div className="alert success"><CheckCircle2 size={17} />{notice}</div>}
      {view === "dashboard" ? <Dashboard counts={counts} orders={orders} onViewOrders={() => setView("orders")} onSelect={setSelected} /> : view === "customers" ? <CustomersView customers={customers} /> : <OrdersView orders={filteredOrders} loading={loading} search={search} setSearch={setSearch} status={status} setStatus={setStatus} dateFilter={dateFilter} setDateFilter={setDateFilter} sort={sort} setSort={setSort} onSelect={setSelected} onStatus={changeStatus} />}
    </main><DetailModal order={selected} onClose={() => setSelected(null)} onStatus={(nextStatus) => changeStatus(selected, nextStatus)} />
  </div>;
}

function Dashboard({ counts, orders, onViewOrders, onSelect }) {
  return <div className="dashboard-content"><div className="section-heading"><div><p className="eyebrow">Overview</p><h2>Order health at a glance</h2></div><button className="secondary-button" onClick={onViewOrders}>View all orders <ArrowDownUp size={16} /></button></div><div className="stats-grid"><StatCard label="Total orders" value={counts.total} icon={BarChart3} tone="blue" /><StatCard label="Pending review" value={counts.pending || 0} icon={Clock3} tone="amber" /><StatCard label="Accepted" value={counts.accepted || 0} icon={CheckCircle2} tone="green" /><StatCard label="Rejected" value={counts.rejected || 0} icon={XCircle} tone="red" /><StatCard label="Processing" value={counts.processing || 0} icon={Package} tone="violet" /><StatCard label="Completed" value={counts.completed || 0} icon={Check} tone="teal" /></div><section className="dashboard-panel"><div className="panel-heading"><div><h3>Latest orders</h3><p>Most recent customer requests</p></div><button className="text-button" onClick={onViewOrders}>Manage orders <ArrowDownUp size={15} /></button></div>{orders.slice(0, 5).map((order) => <OrderRow key={order.id} order={order} onSelect={onSelect} />)}{!orders.length && <EmptyState />}</section></div>;
}

function CustomersView({ customers }) {
  const [search, setSearch] = useState("");
  const filteredCustomers = customers.filter((customer) => [customer.name, customer.email, customer.phone].some((value) => String(value || "").toLowerCase().includes(search.toLowerCase())));

  return <div className="customers-content"><div className="section-heading"><div><p className="eyebrow">Relationship management</p><h2>Customer directory</h2><p className="section-subtitle">A clear view of everyone who has placed an order.</p></div><div className="customer-total"><strong>{customers.length}</strong><span>customers</span></div></div><div className="customer-toolbar"><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customers or email..." /></div></div><section className="customer-grid">{filteredCustomers.length ? filteredCustomers.map((customer) => <article className="customer-card" key={customer.email}><div className="customer-card-header"><span className="customer-avatar">{customer.name.charAt(0).toUpperCase()}</span><div><h3>{customer.name}</h3><span>{customer.orders} {customer.orders === 1 ? "order" : "orders"}</span></div></div><a href={`mailto:${customer.email}`}><Mail size={15} />{customer.email}</a>{customer.phone && <p>{customer.phone}</p>}<div className="customer-card-footer"><span>Latest order</span><strong>#{customer.latestOrder.id}</strong><span>{formatDate(customer.latestOrder.created_at)}</span></div></article>) : <div className="customer-empty"><Users size={30} /><h3>No customers found</h3><p>Try a different name or email search.</p></div>}</section></div>;
}

function OrdersView({ orders, loading, search, setSearch, status, setStatus, dateFilter, setDateFilter, sort, setSort, onSelect, onStatus }) {
  return <div className="orders-content"><div className="section-heading"><div><p className="eyebrow">Workspace</p><h2>All orders</h2><p className="section-subtitle">Review, approve, and track every customer request.</p></div></div><div className="filter-bar"><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search ID, customer, email..." /></div><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All statuses</option>{Object.entries(STATUS_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}><option value="all">Any date</option><option value="1">Last 24 hours</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></div><div className="orders-panel"><div className="order-table-head"><span>Order</span><span>Customer</span><span>Package</span><span>Amount</span><span>Status</span><span>Actions</span></div>{loading ? <div className="table-state">Loading orders...</div> : orders.length ? orders.map((order) => <OrderRow key={order.id} order={order} onSelect={onSelect} onStatus={onStatus} detailed />) : <EmptyState />}</div></div>;
}

function OrderRow({ order, onSelect, onStatus, detailed = false }) {
  return <article className={`order-row ${detailed ? "detailed" : ""}`}><div className="order-id"><b>#{order.id}</b><span>{formatDate(order.created_at)}</span></div><div className="customer-cell"><span className="customer-avatar">{order.client_name?.charAt(0).toUpperCase()}</span><div><b>{order.client_name}</b><span>{order.email}</span></div></div><div className="package-cell"><b>{order.book_title}</b><span>{order.cover_type} cover · 1 item</span></div><div className="amount-cell"><b>{formatMoney(order.cover_price)}</b><span>{order.payment_status || "Payment pending"}</span></div><div><StatusBadge status={order.order_status} /></div><div className="row-actions"><button className="view-button" onClick={() => onSelect(order)}>View details</button>{detailed && order.order_status === "pending" && <><button className="accept-icon" onClick={() => onStatus(order, "accepted")} aria-label="Accept order"><Check size={16} /></button><button className="reject-icon" onClick={() => onStatus(order, "rejected")} aria-label="Reject order"><X size={16} /></button></>}</div></article>;
}

function EmptyState() { return <div className="empty-state"><Package size={30} /><h3>No orders found</h3><p>New customer orders will appear here automatically.</p></div>; }

export default AdminPanel;