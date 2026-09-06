import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faImage,
  faPaperclip,
  faFaceSmile,
  faFile,
  faVideo,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import type { ChatAttachment, FeedPost, FeedPostType } from "../../data/mock";

const EMOJIS = [
  "😀", "😂", "😍", "👍", "🙏", "🎉", "😢", "😮",
  "🔥", "❤️", "👏", "😅", "🤔", "😴", "💯", "✅",
  "🎯", "📌", "🙌", "😎", "🤝", "👀", "💡", "🚀",
];

const typeLabel: Record<FeedPostType, string> = {
  diskusi: "Diskusi",
  konten: "Materi",
  anggota: "Anggota",
  event: "Kegiatan",
  pengumuman: "Pengumuman",
};

type Props = {
  mode: "create" | "edit";
  isAdmin: boolean;
  initial?: FeedPost;
  defaultType?: FeedPostType;
  topicOptions: string[];
  onAddTopic: (topic: string) => void;
  syllabusOptions: string[];
  onAddSyllabus: (syllabus: string) => void;
  onClose: () => void;
  onSave: (post: FeedPost) => void;
};

export default function PostEditorModal({ mode, isAdmin, initial, defaultType = "diskusi", topicOptions, onAddTopic, syllabusOptions, onAddSyllabus, onClose, onSave }: Props) {
  const [type, setType] = useState<FeedPostType>(initial?.type ?? defaultType);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [tag, setTag] = useState(initial?.tag ?? topicOptions[0] ?? "Diskusi");
  const [addingTopic, setAddingTopic] = useState(false);
  const [customTopic, setCustomTopic] = useState("");
  const [attachments, setAttachments] = useState<ChatAttachment[]>(initial?.attachments ?? []);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const [eventDate, setEventDate] = useState(initial?.eventDate ?? "");
  const [eventTime, setEventTime] = useState(initial?.eventTime ?? "");
  const [eventLocation, setEventLocation] = useState(initial?.eventLocation ?? "");
  const [hasLiveRoom, setHasLiveRoom] = useState(initial?.hasLiveRoom ?? false);

  const [syllabus, setSyllabus] = useState(initial?.syllabus ?? syllabusOptions[0] ?? "");
  const [addingSyllabus, setAddingSyllabus] = useState(false);
  const [customSyllabus, setCustomSyllabus] = useState("");

  const availableTypes: FeedPostType[] = isAdmin
    ? ["diskusi", "konten", "event", "pengumuman"]
    : ["diskusi"];

  const confirmNewTopic = () => {
    const value = customTopic.trim();
    if (!value) return;
    onAddTopic(value);
    setTag(value);
    setAddingTopic(false);
    setCustomTopic("");
  };

  const confirmNewSyllabus = () => {
    const value = customSyllabus.trim();
    if (!value) return;
    onAddSyllabus(value);
    setSyllabus(value);
    setAddingSyllabus(false);
    setCustomSyllabus("");
  };

  const addFiles = (files: FileList | null, kind: "image" | "video" | "audio" | "file") => {
    if (!files || files.length === 0) return;
    const items: ChatAttachment[] = Array.from(files).map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      kind,
      url: kind === "image" ? URL.createObjectURL(f) : undefined,
    }));
    setAttachments((prev) => [...prev, ...items]);
  };

  const removeAttachment = (attachmentId: string) => setAttachments((prev) => prev.filter((a) => a.id !== attachmentId));

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const post: FeedPost = {
      id: initial?.id ?? `${type}-${Date.now()}`,
      type,
      author: initial?.author ?? "Rangga Putra",
      time: initial?.time ?? "Baru saja",
      tag,
      title: title.trim() || body.trim().slice(0, 60),
      body: body.trim(),
      replies: initial?.replies ?? 0,
      active: initial?.active,
      attachments: attachments.length ? attachments : undefined,
      linkTo: initial?.linkTo,
      eventDate: type === "event" ? eventDate : undefined,
      eventTime: type === "event" ? eventTime : undefined,
      eventLocation: type === "event" ? eventLocation : undefined,
      hasLiveRoom: type === "event" ? hasLiveRoom : undefined,
      syllabus: type === "konten" ? syllabus : undefined,
    };
    onSave(post);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(22,40,58,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20,
      }}
    >
      <div
        className="card"
        style={{ width: 460, maxHeight: "88vh", overflowY: "auto", padding: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>
            {mode === "create" ? "Buat post baru" : `Edit ${typeLabel[type]}`}
          </h3>
          <button aria-label="Tutup" onClick={onClose} className="btn btn-ghost btn-icon" style={{ width: 28, height: 28, fontSize: 12 }}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {mode === "create" && availableTypes.length > 1 && (
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {availableTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className="btn btn-sm"
                style={{
                  background: type === t ? "var(--langit)" : "var(--surface)",
                  color: type === t ? "var(--awan)" : "var(--ink-700)",
                  border: type === t ? "none" : "1px solid var(--ink-150)",
                }}
              >
                {typeLabel[t]}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-500)", display: "block", marginBottom: 6 }}>
              {type === "event" ? "Nama event" : "Judul"}
            </label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === "event" ? "Nama event..." : "Judul post..."}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-500)", display: "block", marginBottom: 6 }}>
              Deskripsi
            </label>
            <textarea
              className="input"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tulis deskripsinya..."
              style={{ resize: "none", fontFamily: "inherit", lineHeight: 1.5 }}
            />
          </div>

          {type === "event" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 14, borderRadius: 12, background: "var(--awan)" }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-500)", display: "block", marginBottom: 6 }}>Tanggal</label>
                  <input type="date" className="input" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-500)", display: "block", marginBottom: 6 }}>Jam</label>
                  <input type="time" className="input" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-500)", display: "block", marginBottom: 6 }}>Lokasi</label>
                <input
                  className="input"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Online via Zoom, atau alamat lokasi..."
                />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                <input type="checkbox" checked={hasLiveRoom} onChange={(e) => setHasLiveRoom(e.target.checked)} />
                Tambahkan live room untuk event ini
              </label>
            </div>
          )}

          {type === "konten" && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-500)", display: "block", marginBottom: 6 }}>
                Silabus
              </label>
              {addingSyllabus ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    autoFocus
                    className="input"
                    placeholder="Nama silabus baru..."
                    value={customSyllabus}
                    onChange={(e) => setCustomSyllabus(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && confirmNewSyllabus()}
                    style={{ flex: 1 }}
                  />
                  <button className="btn btn-secondary btn-sm" onClick={confirmNewSyllabus}>Tambah</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => { setAddingSyllabus(false); setCustomSyllabus(""); }}>Batal</button>
                </div>
              ) : (
                <select
                  className="input"
                  value={syllabus}
                  onChange={(e) => (e.target.value === "__new__" ? setAddingSyllabus(true) : setSyllabus(e.target.value))}
                >
                  {syllabusOptions.length === 0 && <option value="">Belum ada silabus</option>}
                  {syllabusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="__new__">+ Tambah silabus baru...</option>
                </select>
              )}
            </div>
          )}

          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-500)", display: "block", marginBottom: 6 }}>
              Tag / topik
            </label>
            {addingTopic ? (
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  autoFocus
                  className="input"
                  placeholder="Nama topik baru..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && confirmNewTopic()}
                  style={{ flex: 1 }}
                />
                <button className="btn btn-secondary btn-sm" onClick={confirmNewTopic}>Tambah</button>
                <button className="btn btn-ghost btn-sm" onClick={() => { setAddingTopic(false); setCustomTopic(""); }}>Batal</button>
              </div>
            ) : (
              <select
                className="input"
                value={tag}
                onChange={(e) => (e.target.value === "__new__" ? setAddingTopic(true) : setTag(e.target.value))}
              >
                {topicOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
                <option value="__new__">+ Topik baru...</option>
              </select>
            )}
          </div>

          {/* Lampiran */}
          {attachments.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {attachments.map((a) => (
                <div
                  key={a.id}
                  style={{
                    position: "relative", display: "flex", alignItems: "center", gap: 6,
                    padding: a.kind === "image" ? 0 : "5px 8px", borderRadius: 8,
                    background: "var(--awan)", fontSize: 11, color: "var(--ink-700)", overflow: "hidden",
                  }}
                >
                  {a.kind === "image" ? (
                    <img src={a.url} alt={a.name} style={{ width: 48, height: 48, objectFit: "cover", display: "block" }} />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={a.kind === "video" ? faVideo : a.kind === "audio" ? faMusic : faFile} />
                      <span style={{ maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</span>
                    </>
                  )}
                  <button
                    aria-label="Hapus lampiran"
                    onClick={() => removeAttachment(a.id)}
                    style={{
                      position: "absolute", top: 2, right: 2, width: 16, height: 16, borderRadius: "50%",
                      background: "rgba(22,40,58,0.65)", color: "#fff", border: "none", fontSize: 9,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Emoji picker */}
          {emojiOpen && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 2, padding: 8, borderRadius: 10, background: "var(--awan)" }}>
              {EMOJIS.map((emo) => (
                <button
                  key={emo}
                  onClick={() => setBody((prev) => prev + emo)}
                  style={{ background: "none", border: "none", fontSize: 16, padding: 3, cursor: "pointer" }}
                >
                  {emo}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <label
              aria-label="Kirim gambar"
              title="Kirim gambar"
              className="btn btn-ghost btn-icon"
              style={{ width: 32, height: 32, fontSize: 13, color: "var(--ink-500)", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faImage} />
              <input type="file" accept="image/*" multiple hidden onChange={(e) => addFiles(e.target.files, "image")} />
            </label>
            <label
              aria-label="Kirim video"
              title="Kirim video"
              className="btn btn-ghost btn-icon"
              style={{ width: 32, height: 32, fontSize: 13, color: "var(--ink-500)", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faVideo} />
              <input type="file" accept="video/*" multiple hidden onChange={(e) => addFiles(e.target.files, "video")} />
            </label>
            <label
              aria-label="Kirim audio"
              title="Kirim audio"
              className="btn btn-ghost btn-icon"
              style={{ width: 32, height: 32, fontSize: 13, color: "var(--ink-500)", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faMusic} />
              <input type="file" accept="audio/*" multiple hidden onChange={(e) => addFiles(e.target.files, "audio")} />
            </label>
            <label
              aria-label="Lampirkan file"
              title="Lampirkan file"
              className="btn btn-ghost btn-icon"
              style={{ width: 32, height: 32, fontSize: 13, color: "var(--ink-500)", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faPaperclip} />
              <input type="file" multiple hidden onChange={(e) => addFiles(e.target.files, "file")} />
            </label>
            <button
              aria-label="Emoji"
              title="Emoji"
              onClick={() => setEmojiOpen((v) => !v)}
              className="btn btn-ghost btn-icon"
              style={{ width: 32, height: 32, fontSize: 13, color: emojiOpen ? "var(--sinyal)" : "var(--ink-500)" }}
            >
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            <span style={{ flex: 1 }} />
            <button className="btn btn-ghost" onClick={onClose} style={{ height: 38 }}>Batal</button>
            <button
              className="btn"
              disabled={!canSave}
              onClick={handleSave}
              style={{ height: 38, background: "var(--hijau-lepas)", color: "var(--awan)" }}
            >
              {mode === "create" ? "Posting" : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
