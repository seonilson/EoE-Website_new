"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin/blog/new");
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f9fafb",
    }}>
      <div style={{
        background: "#fff", borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "48px 40px", width: "100%", maxWidth: "400px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "52px", height: "52px", borderRadius: "14px",
            background: "#022C45", display: "inline-flex",
            alignItems: "center", justifyContent: "center", marginBottom: "16px",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#022C45", margin: "0 0 6px" }}>
            Admin Panel
          </h1>
          <p style={{ fontSize: "13px", color: "#9CA3AF", margin: 0 }}>
            Edification Overseas Education
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            autoFocus
            style={{
              width: "100%", padding: "12px 14px", fontSize: "15px",
              border: error ? "1.5px solid #ef4444" : "1.5px solid #e5e7eb",
              borderRadius: "10px", outline: "none", boxSizing: "border-box",
              fontFamily: "inherit", color: "#111827",
            }}
          />

          {error && (
            <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px", fontWeight: 500 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "20px", width: "100%", padding: "13px",
              background: loading ? "#9CA3AF" : "#F16101",
              color: "#fff", fontWeight: 800, fontSize: "14px",
              border: "none", borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit", textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            {loading ? "Verifying..." : "Login →"}
          </button>
        </form>
      </div>
    </main>
  );
}