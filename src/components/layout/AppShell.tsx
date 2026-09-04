import { NavLink, useNavigate } from "react-router-dom";
import { currentUser } from "../../data/mock";
import Avatar from "../ui/Avatar";

const nav = [
  { to: "/discover", label: "Discover", icon: "🧭" },
  { to: "/community/bimbel-sbmptn", label: "Komunitas Saya", icon: "👥" },
  { to: "/creator/dashboard", label: "Dashboard Creator", icon: "📊" },
  { to: "/onboarding", label: "Pulse-ID", icon: "✨" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 236,
          flexShrink: 0,
          background: "var(--langit)",
          color: "var(--awan)",
          padding: "22px 16px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div
          onClick={() => navigate("/discover")}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 26px", cursor: "pointer" }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: "var(--sinyal)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              color: "var(--ink-900)",
              fontSize: 14,
            }}
          >
            D
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>
            diudara
          </span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? "var(--langit)" : "#D9E2EA",
                background: isActive ? "var(--awan)" : "transparent",
              })}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(244,247,250,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px" }}>
            <Avatar initials="RP" color="var(--sinyal)" size={34} />
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--awan)" }}>{currentUser.name}</p>
              <p style={{ fontSize: 12, color: "#AEC0D2" }}>{currentUser.handle}</p>
            </div>
          </div>
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>{children}</main>
    </div>
  );
}
