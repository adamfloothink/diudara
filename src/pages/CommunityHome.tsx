import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  communities,
  forumPosts,
  contentLibrary,
  members,
  upcomingEvents,
} from "../data/mock";
import Avatar from "../components/ui/Avatar";

const tabs = ["Feed", "Content", "Members"] as const;
type Tab = (typeof tabs)[number];

const typeIcon: Record<string, string> = { video: "🎬", ebook: "📄", audio: "🎧", quiz: "📝" };
const statusBadge: Record<string, string> = { active: "badge-active", pending: "badge-pending", churned: "badge-churn" };
const statusLabel: Record<string, string> = { active: "Aktif", pending: "Menunggu", churned: "Churned" };

export default function CommunityHome() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Feed");
  const community = communities.find((c) => c.id === id) ?? communities[0];

  return (
    <div>
      {/* Cover */}
      <div style={{ height: 140, background: `linear-gradient(120deg, ${community.color}, var(--langit-dark))`, position: "relative" }}>
        {community.isLive && (
          <button
            onClick={() => navigate(`/live/${community.id}`)}
            className="live-badge"
            style={{ position: "absolute", top: 18, right: 32, border: "none", cursor: "pointer" }}
          >
            <span className="dot"></span>SEDANG LIVE — Gabung
          </button>
        )}
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: -34, marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            <div
              style={{
                width: 84, height: 84, borderRadius: 20, background: community.color,
                border: "4px solid var(--awan)", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700,
              }}
            >
              {community.name.charAt(0)}
            </div>
            <div style={{ paddingBottom: 6 }}>
              <h1 style={{ fontSize: 24, fontWeight: 600 }}>{community.name}</h1>
              <p style={{ fontSize: 13.5, color: "var(--ink-500)" }}>{community.members} member · {community.category}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, paddingBottom: 6 }}>
            <button className="btn btn-ghost">Undang member</button>
            <button className="btn btn-primary" onClick={() => navigate(`/checkout/${community.id}`)}>
              {community.price === "Gratis" ? "Gabung gratis" : `Gabung — ${community.price}${community.billing}`}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--ink-150)", marginBottom: 28 }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none", border: "none", padding: "12px 18px",
                fontSize: 14, fontWeight: 600,
                color: tab === t ? "var(--langit)" : "var(--ink-500)",
                borderBottom: tab === t ? "2.5px solid var(--sinyal)" : "2.5px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 28, paddingBottom: 60 }}>
          {/* Main column */}
          <div>
            {tab === "Feed" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="card" style={{ padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar initials="RP" color="var(--sinyal)" />
                  <input className="input" placeholder="Mulai diskusi baru..." style={{ background: "var(--awan)" }} />
                </div>
                {forumPosts.map((p) => (
                  <div key={p.id} className="card" style={{ padding: 20 }}>
                    <div style={{ display: "flex", gap: 12 }}>
                      <Avatar initials={p.author.split(" ").map((w) => w[0]).slice(0, 2).join("")} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>{p.author}</span>
                            <span style={{ color: "var(--ink-300)", fontSize: 12.5 }}> · {p.time}</span>
                          </div>
                          {p.active && <span className="badge badge-active"><span className="dot"></span>Aktif</span>}
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.title}</p>
                        <p style={{ fontSize: 13.5, color: "var(--ink-700)", lineHeight: 1.55, marginBottom: 10 }}>{p.body}</p>
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <span className="badge badge-neutral">{p.tag}</span>
                          <span style={{ fontSize: 12.5, color: "var(--ink-500)" }}>💬 {p.replies} balasan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Content" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {contentLibrary.map((week) => (
                  <div key={week.id} className="card" style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                      <h4 style={{ fontSize: 15.5, fontWeight: 600 }}>{week.title}</h4>
                      <span style={{ fontSize: 12.5, color: "var(--ink-500)" }}>{week.lessons} materi</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {week.items.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "10px 12px", borderRadius: 10, background: "var(--awan)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16 }}>{typeIcon[item.type]}</span>
                            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{item.title}</span>
                          </div>
                          <span style={{ fontSize: 12, color: "var(--ink-500)" }}>{item.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Members" && (
              <div className="card" style={{ padding: 8 }}>
                {members.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 14px", borderBottom: i < members.length - 1 ? "1px solid var(--ink-100)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar initials={m.name.split(" ").map((w) => w[0]).slice(0, 2).join("")} />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</p>
                        <p style={{ fontSize: 12.5, color: "var(--ink-500)" }}>{m.role} · {m.joined}</p>
                      </div>
                    </div>
                    <span className={`badge ${statusBadge[m.status]}`}>
                      <span className="dot"></span>{statusLabel[m.status]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="card" style={{ padding: 18 }}>
              <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 6, color: "var(--ink-700)" }}>Tentang komunitas</h4>
              <p style={{ fontSize: 13, color: "var(--ink-500)", lineHeight: 1.55 }}>{community.description}</p>
            </div>

            <div className="card" style={{ padding: 18 }}>
              <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12, color: "var(--ink-700)" }}>Event mendatang</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {upcomingEvents.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 40, textAlign: "center", flexShrink: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sinyal)" }}>{e.date.split(" ")[1]}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--langit)" }}>{e.date.split(" ")[0]}</div>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>{e.title}</p>
                      <p style={{ fontSize: 12, color: "var(--ink-500)" }}>{e.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
