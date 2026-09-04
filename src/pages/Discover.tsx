import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { communities, categories, trendingTags } from "../data/mock";

export default function Discover() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = communities.filter((c) => {
    const matchCategory = activeCategory === "Semua" || c.category === activeCategory;
    const matchQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.niche.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });

  const liveNow = communities.filter((c) => c.isLive);

  return (
    <div style={{ padding: "32px 40px 60px", maxWidth: 1180, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 600, marginBottom: 6 }}>Temukan komunitas</h1>
          <p style={{ color: "var(--ink-500)", fontSize: 15 }}>Gabung komunitas yang cocok dengan minatmu, langsung dari WhatsApp atau Telegram.</p>
        </div>
        <input
          className="input"
          placeholder="Cari komunitas, topik, atau mentor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: 300, background: "var(--surface)" }}
        />
      </div>

      {/* Category filters */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 28 }} className="scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn btn-sm"
            style={{
              background: activeCategory === cat ? "var(--langit)" : "var(--surface)",
              color: activeCategory === cat ? "var(--awan)" : "var(--ink-700)",
              border: activeCategory === cat ? "none" : "1.5px solid var(--ink-150)",
              flexShrink: 0,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28 }}>
        <div>
          {/* Live now strip */}
          {liveNow.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span className="live-badge"><span className="dot"></span>LIVE</span>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>Sedang berlangsung</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                {liveNow.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/live/${c.id}`)}
                    className="card"
                    style={{ cursor: "pointer", overflow: "hidden" }}
                  >
                    <div style={{ height: 100, background: `linear-gradient(135deg, ${c.color}, var(--langit-dark))`, position: "relative", padding: 12 }}>
                      <span className="live-badge"><span className="dot"></span>LIVE</span>
                      <span style={{ position: "absolute", bottom: 10, right: 12, fontSize: 12, color: "#fff", fontWeight: 600, background: "rgba(0,0,0,0.35)", padding: "3px 8px", borderRadius: 999 }}>
                        {c.liveViewers} nonton
                      </span>
                    </div>
                    <div style={{ padding: 14 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{c.name}</p>
                      <p style={{ fontSize: 12.5, color: "var(--ink-500)" }}>{c.niche}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community grid */}
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>
            {activeCategory === "Semua" ? "Semua komunitas" : activeCategory}
            <span style={{ color: "var(--ink-500)", fontWeight: 400 }}> · {filtered.length} hasil</span>
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 18 }}>
            {filtered.map((c) => (
              <div key={c.id} className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: 11, background: c.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 16,
                    }}
                  >
                    {c.name.charAt(0)}
                  </div>
                  {c.trending && <span className="badge badge-pending">🔥 Trending</span>}
                </div>
                <div>
                  <p style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{c.name}</p>
                  <p style={{ fontSize: 13, color: "var(--ink-500)", lineHeight: 1.5 }}>{c.description}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 6 }}>
                  <span style={{ fontSize: 12.5, color: "var(--ink-500)" }}>{c.members} member</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--langit)" }}>
                    {c.price}
                    <span style={{ fontWeight: 400, color: "var(--ink-500)" }}>{c.billing}</span>
                  </span>
                </div>
                <button className="btn btn-secondary btn-sm btn-block" onClick={() => navigate(`/community/${c.id}`)}>
                  Lihat komunitas
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card" style={{ padding: 18 }}>
            <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12, color: "var(--ink-700)" }}>Tag populer</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {trendingTags.map((tag) => (
                <span key={tag} className="badge badge-neutral">{tag}</span>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 18, background: "var(--langit)", color: "var(--awan)", border: "none" }}>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: "var(--sinyal-light)", marginBottom: 8, letterSpacing: 0.3 }}>
              PUNYA KOMUNITAS SENDIRI?
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 14, color: "#D9E2EA" }}>
              Setup komunitas berbayar kamu dalam 15 menit bareng Pulse-ID.
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => navigate("/onboarding")}>Mulai sekarang →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
