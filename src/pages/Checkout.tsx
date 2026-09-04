import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { communities, tiers, paymentMethods } from "../data/mock";
import Header from "../components/layout/Header";

type Step = "tier" | "payment" | "success";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const community = communities.find((c) => c.id === id) ?? communities[0];

  const [step, setStep] = useState<Step>("tier");
  const [selectedTier, setSelectedTier] = useState(tiers[1].id);
  const [method, setMethod] = useState("qris");

  const tier = tiers.find((t) => t.id === selectedTier)!;

  return (
    <>
      <Header title={`Checkout — ${community.name}`} subtitle={`${community.members} member · ${community.category}`} insetDivider={false} />
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 620 }}>
        {/* Step indicator */}
        {step !== "success" && (
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {["tier", "payment"].map((s, i) => (
              <div key={s} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700,
                    background: step === s || (s === "tier" && step === "payment") ? "var(--langit)" : "var(--ink-150)",
                    color: step === s || (s === "tier" && step === "payment") ? "#fff" : "var(--ink-500)",
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: step === s ? "var(--langit)" : "var(--ink-500)" }}>
                  {s === "tier" ? "Pilih tier" : "Pembayaran"}
                </span>
                {i === 0 && <div style={{ flex: 1, height: 1.5, background: "var(--ink-150)" }} />}
              </div>
            ))}
          </div>
        )}

        {/* STEP: tier */}
        {step === "tier" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              {tiers.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTier(t.id)}
                  className="card card-clickable"
                  style={{
                    padding: 20, position: "relative",
                    border: selectedTier === t.id ? "2px solid var(--sinyal)" : "1px solid var(--ink-150)",
                  }}
                >
                  {t.highlight && (
                    <span style={{ position: "absolute", top: -11, left: 20, background: "var(--sinyal)", color: "var(--ink-900)", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
                      Paling populer
                    </span>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{t.name}</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: "var(--langit)" }}>
                      {t.price}<span style={{ fontSize: 12.5, fontWeight: 400, color: "var(--ink-500)" }}>{t.billing}</span>
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {t.benefits.map((b, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--ink-700)" }}>
                        <span style={{ color: "var(--hijau-lepas)" }}><FontAwesomeIcon icon={faCheck} /></span>{b}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-block" onClick={() => setStep("payment")}>
              Lanjut ke pembayaran
            </button>
          </div>
        )}

        {/* STEP: payment */}
        {step === "payment" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {paymentMethods.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className="card card-clickable"
                  style={{
                    padding: 16, display: "flex", alignItems: "center", gap: 14,
                    border: method === m.id ? "2px solid var(--sinyal)" : "1px solid var(--ink-150)",
                  }}
                >
                  <div
                    style={{
                      width: 20, height: 20, borderRadius: "50%", border: `2px solid ${method === m.id ? "var(--sinyal)" : "var(--ink-300)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}
                  >
                    {method === m.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--sinyal)" }} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</p>
                    <p style={{ fontSize: 12.5, color: "var(--ink-500)" }}>{m.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: 18, marginBottom: 20, background: "var(--awan)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 8 }}>
                <span style={{ color: "var(--ink-500)" }}>Tier {tier.name}</span>
                <span style={{ fontWeight: 600 }}>{tier.price}{tier.billing}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, paddingTop: 10, borderTop: "1px solid var(--ink-150)" }}>
                <span>Total</span>
                <span style={{ color: "var(--langit)" }}>{tier.price}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setStep("tier")}>Kembali</button>
              <button className="btn btn-primary btn-block" onClick={() => setStep("success")}>
                Bayar {tier.price}
              </button>
            </div>
          </div>
        )}

        {/* STEP: success */}
        {step === "success" && (
          <div className="card" style={{ padding: 36, textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--success-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 26, color: "var(--hijau-lepas)" }}>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <h2 style={{ fontSize: 21, fontWeight: 600, marginBottom: 8 }}>Pembayaran berhasil</h2>
            <p style={{ fontSize: 14, color: "var(--ink-500)", marginBottom: 24, lineHeight: 1.55 }}>
              Kamu sudah terdaftar sebagai member tier <strong>{tier.name}</strong>. Link undangan grup WhatsApp akan segera dikirim otomatis.
            </p>
            <button className="btn btn-primary btn-block" onClick={() => navigate(`/community/${community.id}`)}>
              Masuk ke komunitas
            </button>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
