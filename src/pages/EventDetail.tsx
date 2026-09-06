import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faVideo,
  faCalendarDay,
  faGraduationCap,
  faClock,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { communities, calendarSchedule } from "../data/mock";
import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";

const typeIcon: Record<string, IconDefinition> = { live: faVideo, event: faCalendarDay, materi: faGraduationCap };
const typeLabel: Record<string, string> = { live: "Live", event: "Event", materi: "Materi" };
const typeBadge: Record<string, string> = { live: "badge-churn", event: "badge-neutral", materi: "badge-pending" };
const typeDot: Record<string, string> = { live: "var(--merah-senja)", event: "var(--ink-300)", materi: "var(--sinyal)" };

export default function EventDetail() {
  const { id, eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const community = communities.find((c) => c.id === id) ?? communities[0];
  const event = calendarSchedule.find((e) => e.id === eventId) ?? calendarSchedule[0];

  return (
    <>
      <Header
        title="Detail Event"
        breadcrumb={[
          { label: community.name, to: `/community/${community.id}` },
          { label: "Detail Event" },
        ]}
        notificationCount={3}
      />
      <PageContainer>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 60 }}>
          <button
            onClick={() => navigate(`/community/${community.id}`)}
            style={{
              display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-start",
              background: "none", border: "none", color: "var(--ink-500)", fontSize: 13, fontWeight: 600,
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Kembali ke Kalender
          </button>

          {/* Banner tanggal + tipe */}
          <div
            className="card"
            style={{
              padding: 0, overflow: "hidden", border: "none",
              background: `linear-gradient(135deg, ${community.color}, var(--langit-dark))`,
            }}
          >
            <div style={{ padding: 28, display: "flex", alignItems: "center", gap: 20 }}>
              <div
                style={{
                  width: 64, textAlign: "center", flexShrink: 0, background: "rgba(255,255,255,0.16)",
                  borderRadius: 14, padding: "10px 0",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{event.month}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>{event.date}</div>
                <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.8)" }}>{event.day}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span className={`badge ${typeBadge[event.type]}`} style={{ marginBottom: 8 }}>
                  <FontAwesomeIcon icon={typeIcon[event.type]} /> {typeLabel[event.type]}
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginTop: 8 }}>{event.title}</h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>
                  <FontAwesomeIcon icon={faClock} /> {event.time}
                </p>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>Deskripsi</h3>
            <p style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.7 }}>{event.description}</p>
          </div>

          {/* Aksi: live room kalau ada, deskripsi-only kalau tidak */}
          {event.hasLiveRoom ? (
            <div className="card" style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Ruang live tersedia</p>
                <p style={{ fontSize: 12.5, color: "var(--ink-500)" }}>Gabung saat sesi dimulai untuk ikut langsung.</p>
              </div>
              <button className="btn btn-primary" onClick={() => navigate(`/live/${community.id}`)} style={{ flexShrink: 0 }}>
                <FontAwesomeIcon icon={faVideoCamera} /> Gabung Live Room
              </button>
            </div>
          ) : (
            <div className="card" style={{ padding: 20, background: "var(--awan)", border: "none" }}>
              <p style={{ fontSize: 13, color: "var(--ink-500)", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="dot" style={{ background: typeDot[event.type], width: 8, height: 8, borderRadius: "50%", display: "inline-block" }} />
                Event ini tidak memiliki live room — cukup catat jadwalnya, tanpa sesi streaming.
              </p>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}
