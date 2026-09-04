import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { communities, liveParticipants } from "../data/mock";
import Avatar from "../components/ui/Avatar";

const chatSeed = [
  { name: "Sari W.", msg: "izin nanya pak, soal nomor 4 gimana ya?" },
  { name: "Budi P.", msg: "sama, aku juga bingung di situ 🙏" },
  { name: "Pak Andi", msg: "oke nanti kita bahas ya setelah ini" },
];

export default function LiveRoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const community = communities.find((c) => c.id === id) ?? communities[0];
  const [chat, setChat] = useState(chatSeed);
  const [draft, setDraft] = useState("");
  const [muted, setMuted] = useState(true);
  const [camOn, setCamOn] = useState(false);

  const send = () => {
    if (!draft.trim()) return;
    setChat([...chat, { name: "Kamu", msg: draft }]);
    setDraft("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink-900)", color: "#fff", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate(`/community/${community.id}`)}
            className="btn btn-ghost btn-sm"
            style={{ color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)" }}
          >
            ← Keluar
          </button>
          <span className="live-badge"><span className="dot"></span>LIVE</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{community.name} — Sesi Q&amp;A Malam</span>
        </div>
        <span style={{ fontSize: 13, color: "#9CACC0" }}>👁 {community.liveViewers ?? 84} menonton</span>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 320px", minHeight: 0 }}>
        {/* Video area */}
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>
          <div
            style={{
              flex: 1, borderRadius: 16, overflow: "hidden",
              background: "linear-gradient(135deg, var(--langit), var(--langit-dark))",
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
            }}
          >
            <Avatar initials="PA" color="var(--sinyal)" size={96} />
            <span style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(0,0,0,0.4)", padding: "5px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              Pak Andi (Host)
            </span>
          </div>

          {/* Participant strip */}
          <div style={{ display: "flex", gap: 10, overflowX: "auto" }} className="scrollbar-none">
            {liveParticipants.map((p, i) => (
              <div
                key={i}
                style={{
                  width: 130, height: 84, borderRadius: 12, flexShrink: 0,
                  background: "rgba(255,255,255,0.06)",
                  border: p.speaking ? "2px solid var(--sinyal)" : "1px solid rgba(255,255,255,0.1)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, position: "relative",
                }}
              >
                <Avatar initials={p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")} size={34} />
                <span style={{ fontSize: 11.5, fontWeight: 500 }}>{p.name}</span>
                {p.muted && <span style={{ position: "absolute", top: 6, right: 8, fontSize: 12 }}>🔇</span>}
              </div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, paddingTop: 4 }}>
            <button
              onClick={() => setMuted(!muted)}
              className="btn"
              style={{ background: muted ? "rgba(255,255,255,0.1)" : "var(--hijau-lepas)", color: "#fff", borderRadius: 999, width: 48, height: 48, padding: 0 }}
            >
              {muted ? "🔇" : "🎤"}
            </button>
            <button
              onClick={() => setCamOn(!camOn)}
              className="btn"
              style={{ background: camOn ? "var(--hijau-lepas)" : "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 999, width: 48, height: 48, padding: 0 }}
            >
              {camOn ? "🎥" : "📷"}
            </button>
            <button
              onClick={() => navigate(`/community/${community.id}`)}
              className="btn"
              style={{ background: "var(--merah-senja)", color: "#fff", borderRadius: 999, width: 48, height: 48, padding: 0 }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Chat panel */}
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 13.5, fontWeight: 600 }}>
            Live Chat
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            {chat.map((c, i) => (
              <div key={i} style={{ fontSize: 13 }}>
                <span style={{ fontWeight: 700, color: "var(--sinyal-light)" }}>{c.name}: </span>
                <span style={{ color: "#D9E2EA" }}>{c.msg}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
            <input
              className="input"
              placeholder="Tulis komentar..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff" }}
            />
            <button className="btn btn-primary btn-sm" onClick={send}>Kirim</button>
          </div>
        </div>
      </div>
    </div>
  );
}
