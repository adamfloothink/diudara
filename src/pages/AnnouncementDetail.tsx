import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { communities, announcements } from "../data/mock";
import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";

export default function AnnouncementDetail() {
  const { id, announcementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const community = communities.find((c) => c.id === id) ?? communities[0];
  const announcement = announcements.find((a) => a.id === Number(announcementId)) ?? announcements[0];
  const otherAnnouncements = announcements.filter((a) => a.id !== announcement.id);

  return (
    <>
      <Header
        title="Pengumuman"
        breadcrumb={[
          { label: community.name, to: `/community/${community.id}` },
          { label: "Pengumuman" },
        ]}
        notificationCount={3}
      />
      <PageContainer>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: 20, paddingBottom: 60 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <button
              onClick={() => navigate(`/community/${community.id}?tab=Pengumuman`)}
              style={{
                display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-start",
                background: "none", border: "none", color: "var(--ink-500)", fontSize: 13, fontWeight: 600,
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Kembali ke Pengumuman
            </button>

            <div className="card" style={{ padding: 24, position: "relative" }}>
              {announcement.isNew && (
                <span className="badge badge-pending" style={{ position: "absolute", top: 20, right: 20 }}>
                  Baru
                </span>
              )}
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, paddingRight: 60 }}>
                <span style={{ color: "var(--sinyal)", fontSize: 18 }}>
                  <FontAwesomeIcon icon={faBullhorn} />
                </span>
                <p style={{ fontSize: 19, fontWeight: 700 }}>{announcement.title}</p>
              </div>
              <p style={{ fontSize: 14.5, color: "var(--ink-700)", lineHeight: 1.7, marginBottom: 14 }}>{announcement.body}</p>
              <p style={{ fontSize: 12.5, color: "var(--ink-500)" }}>{announcement.author} · {announcement.date}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="card" style={{ padding: 18 }}>
              <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12, color: "var(--ink-700)" }}>Pengumuman lainnya</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {otherAnnouncements.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => navigate(`/community/${community.id}/announcement/${a.id}`)}
                    className="hover-bg"
                    style={{ padding: "10px 8px", borderRadius: 10, cursor: "pointer" }}
                  >
                    <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>{a.title}</p>
                    <p style={{ fontSize: 11.5, color: "var(--ink-500)" }}>{a.author} · {a.date}</p>
                  </div>
                ))}
                {otherAnnouncements.length === 0 && (
                  <p style={{ fontSize: 12.5, color: "var(--ink-500)" }}>Belum ada pengumuman lain.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
