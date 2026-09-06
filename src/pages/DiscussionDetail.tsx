import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart, faArrowLeft, faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { communities, forumPosts, forumComments, currentUser, trendingTags } from "../data/mock";
import Avatar from "../components/ui/Avatar";
import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";

function initialsOf(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("");
}

export default function DiscussionDetail() {
  const { id, postId } = useParams();
  const navigate = useNavigate();
  const [draft, setDraft] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const community = communities.find((c) => c.id === id) ?? communities[0];
  const post = forumPosts.find((p) => p.id === Number(postId)) ?? forumPosts[0];
  const comments = forumComments[post.id] ?? [];
  const relatedPosts = forumPosts.filter((p) => p.id !== post.id);

  return (
    <>
      <Header
        title="Diskusi"
        breadcrumb={[
          { label: community.name, to: `/community/${community.id}` },
          { label: "Diskusi" },
        ]}
        notificationCount={3}
      />
      <PageContainer>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 300px", gap: 20, paddingBottom: 60 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button
            onClick={() => navigate(`/community/${community.id}`)}
            style={{
              display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-start",
              background: "none", border: "none", color: "var(--ink-500)", fontSize: 13, fontWeight: 600,
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Kembali ke Feed
          </button>

          {/* Post utama */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <Avatar initials={initialsOf(post.author)} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{post.author}</span>
                    <span style={{ color: "var(--ink-300)", fontSize: 12.5 }}> · {post.time}</span>
                  </div>
                  {post.active && <span className="badge badge-active"><span className="dot"></span>Aktif</span>}
                </div>
                <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{post.title}</p>
                <p style={{ fontSize: 14.5, color: "var(--ink-700)", lineHeight: 1.65, marginBottom: 14 }}>{post.body}</p>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span className="badge badge-neutral">{post.tag}</span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-500)" }}>
                    <FontAwesomeIcon icon={faComment} /> {post.replies} balasan
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Form balasan baru */}
          <div className="card" style={{ padding: 16, display: "flex", gap: 12, alignItems: "center" }}>
            <Avatar initials={currentUser.initials} color={currentUser.avatarColor} />
            <input
              className="input"
              placeholder="Tulis balasan..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              style={{ flex: 1, background: "var(--awan)" }}
            />
            <button className="btn btn-primary btn-sm" disabled={!draft.trim()} style={{ flexShrink: 0 }}>
              Kirim
            </button>
          </div>

          {/* Daftar komentar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600 }}>
              {post.replies} balasan
            </h3>
            {comments.map((c, i) => (
              <div key={i} className="card" style={{ padding: 18 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <Avatar initials={initialsOf(c.author)} size={32} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 13.5 }}>{c.author}</span>
                      <span style={{ color: "var(--ink-300)", fontSize: 12 }}> · {c.time}</span>
                    </div>
                    <p style={{ fontSize: 13.5, color: "var(--ink-700)", lineHeight: 1.55, marginBottom: 8 }}>{c.body}</p>
                    <span style={{ fontSize: 12, color: "var(--ink-500)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                      <FontAwesomeIcon icon={faHeart} /> {c.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p style={{ fontSize: 13, color: "var(--ink-500)" }}>Belum ada balasan. Jadi yang pertama membalas!</p>
            )}
          </div>
        </div>

        {/* Sidebar rekomendasi */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card" style={{ padding: 18 }}>
            <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12, color: "var(--ink-700)" }}>Diskusi lainnya</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {relatedPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/community/${community.id}/discussion/${p.id}`)}
                  className="hover-bg"
                  style={{ padding: "10px 8px", borderRadius: 10, cursor: "pointer" }}
                >
                  <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>{p.title}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11.5, color: "var(--ink-500)" }}>{p.author}</span>
                    <span style={{ fontSize: 11.5, color: "var(--ink-500)" }}>
                      <FontAwesomeIcon icon={faComment} /> {p.replies}
                    </span>
                  </div>
                </div>
              ))}
              {relatedPosts.length === 0 && (
                <p style={{ fontSize: 12.5, color: "var(--ink-500)" }}>Belum ada diskusi lain.</p>
              )}
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 12, color: "var(--ink-700)" }}>
              <FontAwesomeIcon icon={faFireFlameCurved} style={{ color: "var(--sinyal)" }} /> Topik populer
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {trendingTags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => navigate(`/community/${community.id}?tab=Feed&topic=${encodeURIComponent(tag.replace(/^#/, ""))}`)}
                  className="badge badge-neutral"
                  style={{ cursor: "pointer" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        </div>
      </PageContainer>
    </>
  );
}
