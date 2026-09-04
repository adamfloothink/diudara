import { salesSummary, revenueByMonth, activityLog, members } from "../data/mock";

const activityIcon: Record<string, string> = {
  join: "👋", upgrade: "⬆️", failed: "⚠️", churn: "👋", purchase: "🛒",
};

export default function CreatorDashboard() {
  const maxRevenue = Math.max(...revenueByMonth.map((r) => r.value));

  return (
    <div style={{ padding: "32px 40px 60px", maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Dashboard Creator</h1>
        <p style={{ color: "var(--ink-500)", fontSize: 15 }}>Ringkasan performa Bimbel Matematika Pak Andi</p>
      </div>

      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total revenue", value: salesSummary.totalRevenue, change: "+12% bulan ini", positive: true },
          { label: "Total member", value: salesSummary.totalMembers.toLocaleString("id-ID"), change: `+${salesSummary.newMembersThisMonth} baru`, positive: true },
          { label: "Churn rate", value: salesSummary.churnRate, change: "-0,4% dari bulan lalu", positive: true },
          { label: "Success rate bayar", value: salesSummary.successRate, change: "stabil", positive: true },
        ].map((m, i) => (
          <div key={i} className="card" style={{ padding: 18 }}>
            <p style={{ fontSize: 12.5, color: "var(--ink-500)", marginBottom: 8 }}>{m.label}</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: "var(--langit)", marginBottom: 4 }}>{m.value}</p>
            <p style={{ fontSize: 12, color: "var(--hijau-lepas)", fontWeight: 600 }}>{m.change}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Revenue chart */}
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Revenue 6 bulan terakhir</h3>
            <span style={{ fontSize: 12.5, color: "var(--ink-500)" }}>dalam juta Rupiah</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 160 }}>
            {revenueByMonth.map((r, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11.5, color: "var(--ink-500)", fontWeight: 600 }}>{r.value}jt</span>
                <div
                  style={{
                    width: "100%", borderRadius: "6px 6px 0 0",
                    height: `${(r.value / maxRevenue) * 120}px`,
                    background: i === revenueByMonth.length - 1 ? "var(--sinyal)" : "var(--langit)",
                    opacity: i === revenueByMonth.length - 1 ? 1 : 0.85,
                  }}
                />
                <span style={{ fontSize: 12, color: "var(--ink-500)" }}>{r.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Member distribution */}
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 18 }}>Distribusi tier</h3>
          {[
            { name: "Basic", pct: 28, color: "var(--kabut)" },
            { name: "Pro", pct: 52, color: "var(--langit)" },
            { name: "VIP", pct: 20, color: "var(--sinyal)" },
          ].map((t, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>{t.name}</span>
                <span style={{ color: "var(--ink-500)" }}>{t.pct}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: "var(--ink-100)", overflow: "hidden" }}>
                <div style={{ width: `${t.pct}%`, height: "100%", background: t.color, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Activity log */}
        <div className="card" style={{ padding: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, padding: "14px 16px 6px" }}>Log aktivitas</h3>
          {activityLog.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex", gap: 12, alignItems: "center", padding: "12px 16px",
                borderTop: "1px solid var(--ink-100)",
              }}
            >
              <span style={{ fontSize: 18 }}>{activityIcon[a.type]}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500 }}>
                  <strong>{a.name}</strong> {a.action}
                </p>
              </div>
              <span style={{ fontSize: 11.5, color: "var(--ink-300)", flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </div>

        {/* Recent members */}
        <div className="card" style={{ padding: 8 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, padding: "14px 16px 6px" }}>Member terbaru</h3>
          {members.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 16px", borderTop: "1px solid var(--ink-100)",
              }}
            >
              <div>
                <p style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name}</p>
                <p style={{ fontSize: 12, color: "var(--ink-500)" }}>{m.joined}</p>
              </div>
              <span
                className={`badge ${m.status === "active" ? "badge-active" : m.status === "pending" ? "badge-pending" : "badge-churn"}`}
              >
                <span className="dot"></span>
                {m.status === "active" ? "Aktif" : m.status === "pending" ? "Menunggu" : "Churned"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
