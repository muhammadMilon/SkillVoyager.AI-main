import React, { useEffect, useState } from "react";
import useAxiosSecure from "../api/axios";

const T = {
  bg:        "linear-gradient(150deg, #071320 0%, #0b1d2e 55%, #060f1a 100%)",
  card:      "#0a1828",
  border:    "rgba(23,182,168,0.14)",
  teal:      "#17B6A8",
  tealDim:   "rgba(23,182,168,0.08)",
  tealMid:   "rgba(23,182,168,0.18)",
  cyan:      "#0fd4c4",
  text:      "rgba(255,255,255,0.72)",
  textDim:   "rgba(255,255,255,0.38)",
};

const ITEMS_PER_PAGE = 10;

const Icon = ({ name, size = 16 }) => {
  const icons = {
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    chevLeft:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>,
    chevRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>,
    dblLeft:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/></svg>,
    dblRight:  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/></svg>,
  };
  return <span style={{ display: "inline-flex" }}>{icons[name] || null}</span>;
};

// ── Mobile transaction card ──────────────────────────────────────────────────
const MobileCard = ({ t }) => (
  <div style={{
    background: T.card,
    border: `1px solid ${T.border}`,
    borderRadius: 14,
    padding: "16px 18px",
    display: "flex", flexDirection: "column", gap: 10,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
      <span style={{ color: "#fff", fontWeight: 600, fontSize: 14, wordBreak: "break-all", flex: 1 }}>
        {t.courseTitle}
      </span>
      <span style={{
        padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700,
        background: t.paymentStatus === "paid" ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)",
        color: t.paymentStatus === "paid" ? "#4ade80" : "#fde047",
        border: t.paymentStatus === "paid" ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(253,224,71,0.3)",
        whiteSpace: "nowrap", flexShrink: 0,
      }}>
        {t.paymentStatus?.toUpperCase() || "UNKNOWN"}
      </span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={{ color: T.textDim, fontSize: 12.5, wordBreak: "break-all" }}>{t.userEmail}</span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: T.teal, fontWeight: 700, fontSize: 15 }}>৳{t.amountPaid}</span>
        <span style={{ color: T.textDim, fontSize: 12 }}>
          {new Date(t.enrolledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  </div>
);

// ── Pagination ───────────────────────────────────────────────────────────────
const Pagination = ({ current, total, onChange }) => {
  if (total <= 1) return null;

  const getPages = () => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
    if (current >= total - 3) return [1, "…", total-4, total-3, total-2, total-1, total];
    return [1, "…", current - 1, current, current + 1, "…", total];
  };

  const pages = getPages();

  const btnBase = {
    width: 38, height: 38, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "1px solid", cursor: "pointer",
    fontSize: 14, fontWeight: 600,
    transition: "all 0.2s ease",
    fontFamily: "system-ui, sans-serif",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
      {/* First + Prev */}
      <button onClick={() => onChange(1)} disabled={current === 1}
        style={{ ...btnBase, background: current === 1 ? "transparent" : T.tealDim, borderColor: current === 1 ? "rgba(255,255,255,0.08)" : T.tealMid, color: current === 1 ? T.textDim : T.teal, opacity: current === 1 ? 0.4 : 1 }}>
        <Icon name="dblLeft" size={14} />
      </button>
      <button onClick={() => onChange(current - 1)} disabled={current === 1}
        style={{ ...btnBase, background: current === 1 ? "transparent" : T.tealDim, borderColor: current === 1 ? "rgba(255,255,255,0.08)" : T.tealMid, color: current === 1 ? T.textDim : T.teal, opacity: current === 1 ? 0.4 : 1 }}>
        <Icon name="chevLeft" size={14} />
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} style={{ width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", color: T.textDim, fontSize: 16, userSelect: "none" }}>
            ···
          </span>
        ) : (
          <button key={p} onClick={() => onChange(p)}
            style={{
              ...btnBase,
              background: current === p
                ? "linear-gradient(135deg, #17B6A8, #0d9e92)"
                : "transparent",
              borderColor: current === p ? "#17B6A8" : "rgba(255,255,255,0.10)",
              color: current === p ? "#fff" : T.text,
              boxShadow: current === p ? "0 4px 18px rgba(23,182,168,0.35)" : "none",
              transform: current === p ? "scale(1.08)" : "scale(1)",
            }}>
            {p}
          </button>
        )
      )}

      {/* Next + Last */}
      <button onClick={() => onChange(current + 1)} disabled={current === total}
        style={{ ...btnBase, background: current === total ? "transparent" : T.tealDim, borderColor: current === total ? "rgba(255,255,255,0.08)" : T.tealMid, color: current === total ? T.textDim : T.teal, opacity: current === total ? 0.4 : 1 }}>
        <Icon name="chevRight" size={14} />
      </button>
      <button onClick={() => onChange(total)} disabled={current === total}
        style={{ ...btnBase, background: current === total ? "transparent" : T.tealDim, borderColor: current === total ? "rgba(255,255,255,0.08)" : T.tealMid, color: current === total ? T.textDim : T.teal, opacity: current === total ? 0.4 : 1 }}>
        <Icon name="dblRight" size={14} />
      </button>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
const AllTransactions = () => {
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axiosSecure.get("/api/transactions")
      .then(res => setTransactions(res.data))
      .catch(err => console.log(err));
  }, [axiosSecure]);

  // Reset to page 1 when search changes
  useEffect(() => { setPage(1); }, [search]);

  const filtered = transactions.filter(t =>
    t.userEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.amountPaid || 0), 0);
  const successfulPayments = transactions.filter(t => t.paymentStatus === "paid").length;

  return (
    <div style={{ minHeight: "100vh", color: "#fff", background: T.bg, fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        /* ── BG grid ── */
        .txn-bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(23,182,168,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23,182,168,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* ── Outer padding ── */
        .txn-outer {
          position: relative; max-width: 1400px; margin: 0 auto;
          padding: 56px 32px 72px;
        }
        @media (max-width: 1024px) { .txn-outer { padding: 44px 24px 60px; } }
        @media (max-width: 640px)  { .txn-outer { padding: 36px 16px 52px; } }

        /* ── Stats grid ── */
        .txn-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px; margin-bottom: 36px;
        }
        @media (max-width: 900px) {
          .txn-stats-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .txn-stats-grid { grid-template-columns: 1fr; gap: 14px; margin-bottom: 28px; }
        }

        /* ── Stat card ── */
        .txn-stat-card {
          padding: 24px 28px; border-radius: 20px;
          background: #0a1828; border: 1px solid rgba(23,182,168,0.14);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        @media (max-width: 640px) {
          .txn-stat-card { padding: 18px 20px; border-radius: 16px; }
        }
        .txn-stat-num { font-size: 40px; font-weight: 800; margin: 0; line-height: 1; }
        @media (max-width: 640px) { .txn-stat-num { font-size: 32px; } }

        /* ── Search bar ── */
        .txn-search-wrap { max-width: 420px; margin-bottom: 28px; }
        @media (max-width: 640px) { .txn-search-wrap { max-width: 100%; } }

        /* ── Table container ── */
        .txn-table-wrap {
          border-radius: 20px; overflow: hidden;
          background: #0a1828; border: 1px solid rgba(23,182,168,0.14);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        /* ── Desktop table ── */
        .txn-table { width: 100%; border-collapse: collapse; }
        .txn-table th {
          padding: 16px 22px; text-align: left;
          color: rgba(255,255,255,0.38); font-weight: 600; font-size: 12.5px;
          letter-spacing: 0.06em; text-transform: uppercase;
          background: #071320; border-bottom: 1px solid rgba(23,182,168,0.14);
          white-space: nowrap;
        }
        .txn-table td {
          padding: 16px 22px;
          border-top: 1px solid rgba(23,182,168,0.10);
          font-size: 14px;
          vertical-align: middle;
        }
        .txn-table tr:hover td { background: rgba(23,182,168,0.03); }
        @media (max-width: 640px) {
          .txn-table th, .txn-table td { padding: 14px 16px; font-size: 13px; }
        }

        /* Hide/show table vs cards based on screen */
        .txn-desktop { display: block; }
        .txn-mobile  { display: none; }
        @media (max-width: 700px) {
          .txn-desktop { display: none; }
          .txn-mobile  { display: flex; flex-direction: column; gap: 12px; }
          .txn-table-wrap { background: transparent; border: none; box-shadow: none; overflow: visible; }
        }

        /* ── Pagination section ── */
        .txn-pagination-section {
          margin-top: 28px;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }

        /* ── Page jump ── */
        .txn-jump-wrap {
          display: flex; align-items: center; gap: 10px;
          color: rgba(255,255,255,0.40); font-size: 13px;
        }
        .txn-jump-input {
          width: 52px; height: 36px; border-radius: 9px;
          background: rgba(23,182,168,0.08);
          border: 1px solid rgba(23,182,168,0.22);
          color: #fff; font-size: 14px; font-weight: 600;
          text-align: center; outline: none;
          font-family: system-ui, sans-serif;
        }
        .txn-jump-input:focus { border-color: #17B6A8; }

        /* ── Per-page info ── */
        .txn-info-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .txn-info-text { color: rgba(255,255,255,0.38); font-size: 13px; }
      `}</style>

      {/* BG */}
      <div className="txn-bg-grid" />
      <div style={{ position: "fixed", top: "-80px", left: "-60px", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(23,182,168,0.10) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "5%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,212,196,0.07) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      <div className="txn-outer">

        {/* ── Header ── */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 28, height: 2, background: T.teal }} />
            <span style={{ color: T.teal, fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }}>ADMIN</span>
            <div style={{ width: 28, height: 2, background: T.teal }} />
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.1, color: "#fff", margin: "0 0 10px" }}>
            All <span style={{ color: T.teal }}>Transactions</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.50)", fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Monitor all course purchases and revenue
          </p>
        </div>

        {/* ── Stats ── */}
        <div className="txn-stats-grid">
          {[
            { icon: <Icon name="shield" size={22} />, label: "TOTAL TRANSACTIONS", value: transactions.length, color: T.teal },
            { icon: <span style={{ color: T.teal, fontSize: 22, lineHeight: 1 }}>৳</span>, label: "TOTAL REVENUE", value: `৳${totalRevenue}`, color: T.teal },
            { icon: <span style={{ color: "#22c55e", fontSize: 20, lineHeight: 1 }}>✓</span>, label: "SUCCESSFUL PAYMENTS", value: successfulPayments, color: "#22c55e" },
          ].map((s, i) => (
            <div key={i} className="txn-stat-card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: T.tealDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <p style={{ fontSize: 12, color: T.textDim, fontWeight: 700, letterSpacing: "0.06em", margin: 0 }}>{s.label}</p>
              </div>
              <p className="txn-stat-num" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Search ── */}
        <div className="txn-search-wrap" style={{ filter: "drop-shadow(0 8px 32px rgba(23,182,168,0.15))" }}>
          <div style={{ borderRadius: 18, padding: 1.5, background: "linear-gradient(135deg, rgba(23,182,168,0.35), rgba(15,212,196,0.2), rgba(23,182,168,0.35))" }}>
            <div style={{ borderRadius: 17, background: "linear-gradient(135deg, #071320 0%, #0a1828 50%, #071320 100%)", display: "flex", alignItems: "center", padding: "4px 8px" }}>
              <div style={{ padding: "0 14px", color: search ? T.teal : "rgba(255,255,255,0.3)" }}>
                <Icon name="search" size={17} />
              </div>
              <input
                type="text"
                placeholder="Search by user email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "13px 8px", fontSize: "0.92rem", color: "#fff", fontFamily: "system-ui, sans-serif" }}
              />
            </div>
          </div>
        </div>

        {/* ── Info row ── */}
        {filtered.length > 0 && (
          <div className="txn-info-row">
            <span className="txn-info-text">
              Showing <strong style={{ color: T.teal }}>{(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</strong> of <strong style={{ color: "#fff" }}>{filtered.length}</strong> transactions
            </span>
            <span className="txn-info-text">Page {page} of {totalPages}</span>
          </div>
        )}

        {/* ── Table / Cards ── */}
        <div className="txn-table-wrap">

          {/* Desktop table */}
          <div className="txn-desktop">
            <table className="txn-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>USER EMAIL</th>
                  <th>COURSE</th>
                  <th>AMOUNT</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: "60px 20px", textAlign: "center", color: T.textDim }}>
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  paginated.map((t, idx) => (
                    <tr key={t._id}>
                      <td style={{ color: T.textDim, fontWeight: 600 }}>
                        {(page - 1) * ITEMS_PER_PAGE + idx + 1}
                      </td>
                      <td style={{ color: T.text, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.userEmail}
                      </td>
                      <td style={{ color: "#fff", fontWeight: 500, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {t.courseTitle}
                      </td>
                      <td style={{ color: T.teal, fontWeight: 700 }}>৳{t.amountPaid}</td>
                      <td style={{ color: T.textDim, whiteSpace: "nowrap" }}>
                        {new Date(t.enrolledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td>
                        <span style={{
                          padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                          background: t.paymentStatus === "paid" ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)",
                          color: t.paymentStatus === "paid" ? "#4ade80" : "#fde047",
                          border: t.paymentStatus === "paid" ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(253,224,71,0.3)",
                          whiteSpace: "nowrap",
                        }}>
                          {t.paymentStatus?.toUpperCase() || "UNKNOWN"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="txn-mobile">
            {paginated.length === 0 ? (
              <div style={{ padding: "48px 0", textAlign: "center", color: T.textDim }}>No transactions found</div>
            ) : (
              paginated.map(t => <MobileCard key={t._id} t={t} />)
            )}
          </div>
        </div>

        {/* ── Pagination ── */}
        {filtered.length > 0 && (
          <div className="txn-pagination-section">
            <Pagination current={page} total={totalPages} onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />

            {/* Jump to page */}
            {totalPages > 5 && (
              <div className="txn-jump-wrap">
                <span>Go to page</span>
                <input
                  className="txn-jump-input"
                  type="number"
                  min={1}
                  max={totalPages}
                  placeholder={page}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      const v = parseInt(e.target.value);
                      if (v >= 1 && v <= totalPages) { setPage(v); e.target.value = ""; window.scrollTo({ top: 0, behavior: "smooth" }); }
                    }
                  }}
                />
                <span>of {totalPages}</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllTransactions;