import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faVideo,
  faFileLines,
  faHeadphones,
  faClipboardQuestion,
  faComment,
  faUserPlus,
  faCalendarDay,
  faGraduationCap,
  faBullhorn,
  faFile,
  faDownload,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import {
  communities,
  forumPosts,
  contentLibrary,
  members,
  upcomingEvents,
  calendarSchedule,
  announcements,
  libraryFiles,
} from "../data/mock";
import Avatar from "../components/ui/Avatar";
import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";

const tabs = ["Feed", "Konten", "Anggota", "Kalender", "Pengumuman", "Dokumen"] as const;
type Tab = (typeof tabs)[number];

const typeIcon: Record<string, IconDefinition> = { video: faVideo, ebook: faFileLines, audio: faHeadphones, quiz: faClipboardQuestion };
const statusBadge: Record<string, string> = { active: "badge-active", pending: "badge-pending", churned: "badge-churn" };
const statusLabel: Record<string, string> = { active: "Aktif", pending: "Menunggu", churned: "Churned" };

const calendarTypeIcon: Record<string, IconDefinition> = { live: faVideo, event: faCalendarDay, materi: faGraduationCap };
const calendarTypeLabel: Record<string, string> = { live: "Live", event: "Event", materi: "Materi" };
const calendarTypeBadge: Record<string, string> = { live: "badge-churn", event: "badge-neutral", materi: "badge-pending" };

const libraryTypeIcon: Record<string, IconDefinition> = { document: faFileLines, video: faVideo, file: faFile };

const calendarTypeDot: Record<string, string> = { live: "var(--merah-senja)", event: "var(--ink-300)", materi: "var(--sinyal)" };

// Grid kalender bulan September 2026 (bulan yang sama dengan data calendarSchedule)
const weekdayLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
function buildMonthCells(year: number, month: number) {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Senin = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
const calendarCells = buildMonthCells(2026, 8);
const todayDate = 4; // 2026-09-04
const scheduleByDay: Record<number, (typeof calendarSchedule)[number][]> = {};
calendarSchedule.forEach((item) => {
  const day = Number(item.date);
  (scheduleByDay[day] ??= []).push(item);
});

// Warna komunitas yang cukup terang untuk butuh teks gelap di atasnya
const lightBrandColors = ["var(--sinyal)", "var(--sinyal-light)", "var(--kabut)"];

export default function CommunityHome() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("Feed");
  const community = communities.find((c) => c.id === id) ?? communities[0];
  const isLightBanner = lightBrandColors.includes(community.color);
  const bannerText = isLightBanner ? "var(--ink-900)" : "var(--awan)";
  const bannerOverlay = isLightBanner ? "rgba(22,40,58,0.12)" : "rgba(255,255,255,0.18)";
  const bannerOverlayBorder = isLightBanner ? "rgba(22,40,58,0.25)" : "rgba(255,255,255,0.4)";
  const hasNewAnnouncement = announcements.some((a) => a.isNew);
  const [selectedContent, setSelectedContent] = useState({ weekId: contentLibrary[0].id, itemIndex: 0 });
  const selectedWeek = contentLibrary.find((w) => w.id === selectedContent.weekId) ?? contentLibrary[0];
  const selectedItem = selectedWeek.items[selectedContent.itemIndex] ?? selectedWeek.items[0];

  return (
    <>
      <Header
        title="Komunitas"
        breadcrumb={[{ label: "Komunitas", to: "/discover" }, { label: community.name }]}
        notificationCount={3}
      />

      <PageContainer>
        {/* Banner */}
        <div
          className="card"
          style={{
            border: "none",
            borderRadius: 20,
            marginBottom: 9,
            padding: 24,
            overflow: "hidden",
            background: `linear-gradient(120deg, ${community.color}, var(--langit-dark))`,
            color: bannerText,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div
              style={{
                width: 72, height: 72, borderRadius: 18, background: bannerOverlay,
                border: `3px solid ${bannerOverlayBorder}`, display: "flex", alignItems: "center", justifyContent: "center",
                color: bannerText, fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, flexShrink: 0,
              }}
            >
              {community.name.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: bannerText }}>{community.name}</h2>
                {community.isLive && (
                  <button
                    onClick={() => navigate(`/live/${community.id}`)}
                    className="live-badge"
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    <span className="dot"></span>SEDANG LIVE — Gabung
                  </button>
                )}
              </div>
              <p style={{ fontSize: 13.5, opacity: 0.85, marginTop: 2 }}>{community.members} member · {community.category}</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                aria-label="Undang member"
                title="Undang member"
                className="btn btn-ghost btn-icon"
                style={{ color: bannerText, border: `1px solid ${bannerOverlayBorder}` }}
              >
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
              <button className="btn btn-primary" onClick={() => navigate(`/checkout/${community.id}`)}>
                {community.price === "Gratis" ? "Gabung gratis" : `Gabung — ${community.price}${community.billing}`}
              </button>
            </div>
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
                fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
                color: tab === t ? "var(--langit)" : "var(--ink-500)",
                borderBottom: tab === t ? "2px solid var(--sinyal)" : "2px solid transparent",
              }}
            >
              {t}
              {t === "Pengumuman" && hasNewAnnouncement && (
                <span
                  style={{
                    fontSize: 10, fontWeight: 700, color: "#fff", background: "var(--merah-senja)",
                    borderRadius: 999, padding: "1px 6px",
                  }}
                >
                  Baru
                </span>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: tab === "Feed" ? "1fr 300px" : "1fr", gap: 20, paddingBottom: 60 }}>
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
                          <span style={{ fontSize: 12.5, color: "var(--ink-500)" }}>
                            <FontAwesomeIcon icon={faComment} /> {p.replies} balasan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "Konten" && (
              <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>
                {/* Menu konten */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {contentLibrary.map((week) => (
                    <div key={week.id} className="card" style={{ padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 600 }}>{week.title}</h4>
                        <span style={{ fontSize: 12, color: "var(--ink-500)" }}>{week.lessons} materi</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {week.items.map((item, i) => {
                          const isSelected = selectedContent.weekId === week.id && selectedContent.itemIndex === i;
                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedContent({ weekId: week.id, itemIndex: i })}
                              style={{
                                display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                                padding: "9px 10px", borderRadius: 10, border: "none",
                                background: isSelected ? "var(--awan)" : "transparent",
                                color: isSelected ? "var(--langit)" : "var(--ink-700)",
                              }}
                            >
                              <span style={{ fontSize: 13, flexShrink: 0 }}>
                                <FontAwesomeIcon icon={typeIcon[item.type]} />
                              </span>
                              <span style={{ flex: 1, fontSize: 13, fontWeight: isSelected ? 700 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {item.title}
                              </span>
                              <span style={{ fontSize: 11, color: "var(--ink-500)", flexShrink: 0 }}>{item.duration}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detail isi konten */}
                <div className="card" style={{ padding: 24 }}>
                  {selectedItem.type === "video" && (
                    <div
                      style={{
                        aspectRatio: "16/9", borderRadius: 14, marginBottom: 18,
                        background: "linear-gradient(135deg, var(--langit), var(--langit-dark))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
                          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20,
                        }}
                      >
                        <FontAwesomeIcon icon={faPlay} />
                      </span>
                    </div>
                  )}
                  {selectedItem.type === "audio" && (
                    <div
                      style={{
                        borderRadius: 14, marginBottom: 18, padding: 24, background: "var(--awan)",
                        display: "flex", alignItems: "center", gap: 16,
                      }}
                    >
                      <span
                        style={{
                          width: 48, height: 48, borderRadius: "50%", background: "var(--langit)", color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0,
                        }}
                      >
                        <FontAwesomeIcon icon={faHeadphones} />
                      </span>
                      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3, height: 32 }}>
                        {Array.from({ length: 28 }).map((_, i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1, borderRadius: 2,
                              height: `${20 + Math.abs(Math.sin(i * 1.3)) * 80}%`,
                              background: i < 10 ? "var(--sinyal)" : "var(--ink-150)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {(selectedItem.type === "ebook" || selectedItem.type === "quiz") && (
                    <div
                      style={{
                        borderRadius: 14, marginBottom: 18, padding: 36, background: "var(--awan)",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center",
                      }}
                    >
                      <span style={{ fontSize: 34, color: "var(--langit)" }}>
                        <FontAwesomeIcon icon={typeIcon[selectedItem.type]} />
                      </span>
                      <button className="btn btn-secondary btn-sm">
                        {selectedItem.type === "quiz" ? "Mulai kuis" : "Buka dokumen"}
                      </button>
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span className="badge badge-neutral">{selectedWeek.title}</span>
                    <span style={{ fontSize: 12, color: "var(--ink-500)" }}>{selectedItem.duration}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{selectedItem.title}</h3>
                </div>
              </div>
            )}

            {tab === "Kalender" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Grid kalender bulanan */}
                <div className="card" style={{ padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 600 }}>September 2026</h4>
                    <div style={{ display: "flex", gap: 14 }}>
                      {(["live", "event", "materi"] as const).map((t) => (
                        <span key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--ink-500)" }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: calendarTypeDot[t], flexShrink: 0 }} />
                          {calendarTypeLabel[t]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(7, 1fr)",
                      gap: 1,
                      background: "var(--border)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {weekdayLabels.map((d) => (
                      <div
                        key={d}
                        style={{
                          textAlign: "center", fontSize: 11.5, fontWeight: 600, color: "var(--ink-500)",
                          padding: "6px 0", background: "var(--awan)",
                        }}
                      >
                        {d}
                      </div>
                    ))}
                    {calendarCells.map((day, i) => {
                      const items = day ? scheduleByDay[day] ?? [] : [];
                      const isToday = day === todayDate;
                      return (
                        <div
                          key={i}
                          style={{
                            minHeight: 78, minWidth: 0, padding: 6,
                            background: isToday ? "var(--awan)" : "var(--surface)",
                            boxShadow: isToday ? "inset 0 0 0 1.5px var(--sinyal)" : "none",
                          }}
                        >
                          {day && (
                            <>
                              <div style={{ fontSize: 12, fontWeight: isToday ? 700 : 500, color: isToday ? "var(--sinyal)" : "var(--ink-700)", marginBottom: 4 }}>
                                {day}
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {items.slice(0, 2).map((it, idx) => (
                                  <div
                                    key={idx}
                                    title={it.title}
                                    style={{
                                      fontSize: 9.5, fontWeight: 600, color: "#fff", background: calendarTypeDot[it.type],
                                      borderRadius: 4, padding: "1px 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                    }}
                                  >
                                    {it.title}
                                  </div>
                                ))}
                                {items.length > 2 && (
                                  <div style={{ fontSize: 9.5, color: "var(--ink-500)" }}>+{items.length - 2} lagi</div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Agenda mendatang */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {calendarSchedule.map((item, i) => (
                    <div key={i} className="card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 52, textAlign: "center", flexShrink: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sinyal)" }}>{item.month}</div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--langit)" }}>{item.date}</div>
                        <div style={{ fontSize: 10.5, color: "var(--ink-500)" }}>{item.day}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.title}</p>
                        <p style={{ fontSize: 12.5, color: "var(--ink-500)" }}>{item.time}</p>
                      </div>
                      <span className={`badge ${calendarTypeBadge[item.type]}`}>
                        <FontAwesomeIcon icon={calendarTypeIcon[item.type]} /> {calendarTypeLabel[item.type]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "Pengumuman" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {announcements.map((a) => (
                  <div key={a.id} className="card" style={{ padding: 20, position: "relative" }}>
                    {a.isNew && (
                      <span
                        className="badge badge-pending"
                        style={{ position: "absolute", top: 14, right: 14 }}
                      >
                        Baru
                      </span>
                    )}
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, paddingRight: 60 }}>
                      <span style={{ color: "var(--sinyal)" }}>
                        <FontAwesomeIcon icon={faBullhorn} />
                      </span>
                      <p style={{ fontSize: 15, fontWeight: 600 }}>{a.title}</p>
                    </div>
                    <p style={{ fontSize: 13.5, color: "var(--ink-700)", lineHeight: 1.55, marginBottom: 10 }}>{a.body}</p>
                    <p style={{ fontSize: 12, color: "var(--ink-500)" }}>{a.author} · {a.date}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "Dokumen" && (
              <div className="card" style={{ padding: 8 }}>
                {libraryFiles.map((f, i) => (
                  <div
                    key={f.id}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 14px", borderBottom: i < libraryFiles.length - 1 ? "1px solid var(--ink-100)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 18, color: "var(--ink-500)", flexShrink: 0 }}>
                      <FontAwesomeIcon icon={libraryTypeIcon[f.type]} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
                      <p style={{ fontSize: 12, color: "var(--ink-500)" }}>{f.size} · {f.date}</p>
                    </div>
                    <button aria-label="Unduh" title="Unduh" className="btn btn-ghost btn-icon">
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tab === "Anggota" && (
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

          {/* Sidebar — cuma tampil di tab Feed */}
          {tab === "Feed" && (
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
          )}
        </div>
      </PageContainer>
    </>
  );
}
