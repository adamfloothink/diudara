import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { currentUser } from "../../data/mock";
import Avatar from "../ui/Avatar";

type Crumb = { label: string; to?: string };

type Props = {
  title: string;
  subtitle?: string;
  /** Trail rendered below the title, e.g. Komunitas / Bimbel Matematika Pak Andi */
  breadcrumb?: Crumb[];
  notificationCount?: number;
  /** Page-specific controls (search, filter, tabs, dsb.) rendered before notifikasi/avatar */
  actions?: ReactNode;
  /** false untuk halaman tanpa sidebar — divider jadi full-bleed sampai ujung */
  insetDivider?: boolean;
};

export default function Header({ title, subtitle, breadcrumb, notificationCount = 0, actions, insetDivider = true }: Props) {
  return (
    <header
      style={{
        flexShrink: 0,
        background: "var(--header-bg)",
        padding: 20,
        paddingTop: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Divider inset to match the header's own left/right padding (full-bleed when there's no sidebar) */}
      <div style={{ position: "absolute", left: insetDivider ? 20 : 0, right: insetDivider ? 20 : 0, bottom: 0, height: 1, background: "var(--border)" }} />
      <div style={{ minWidth: 0 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 2 }}>{subtitle}</p>
        )}
        {breadcrumb && breadcrumb.length > 0 && (
          <p style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 2 }}>
            {breadcrumb.map((c, i) => (
              <span key={i}>
                {c.to ? (
                  <Link to={c.to} style={{ color: "var(--ink-500)" }}>{c.label}</Link>
                ) : (
                  c.label
                )}
                {i < breadcrumb.length - 1 && <span style={{ margin: "0 6px" }}>/</span>}
              </span>
            ))}
          </p>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
        {actions}

        <button
          aria-label="Notifikasi"
          style={{
            position: "relative",
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "1px solid var(--ink-150)",
            background: "var(--awan)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            color: "var(--ink-700)",
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon icon={faBell} />
          {notificationCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 17,
                height: 17,
                padding: "0 4px",
                borderRadius: 999,
                background: "var(--merah-senja)",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", flexShrink: 0 }}>
          <Avatar initials={currentUser.initials} color={currentUser.avatarColor} size={36} />
          <div style={{ lineHeight: 1.3 }}>
            <p style={{ fontSize: 13, fontWeight: 600 }}>{currentUser.name}</p>
            <p style={{ fontSize: 11.5, color: "var(--ink-500)" }}>{currentUser.handle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
