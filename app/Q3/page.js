"use client"
import { useState } from "react"

export default function Page() {
	const [era, setEra] = useState("令和")
	const [year, setYear] = useState(1)
	const [month, setMonth] = useState(1)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError("")
		setMessage("")
		try {
			const res = await fetch("/api/Q3", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ era, year: Number(year), month: Number(month) }),
			})
			const data = await res.json()
			if (!res.ok) {
				throw new Error(data?.error || "サーバーエラーが発生しました")
			}
			setMessage(data.message)
		} catch (err) {
			setError(err.message || "送信に失敗しました")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div style={{ maxWidth: 600, margin: "0 auto", padding: 24, display: "grid", gap: 16 }}>
			<h1>年齢計算</h1>
			<form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
				<label style={{ display: "grid", gap: 6 }}>
					<span>元号</span>
					<select value={era} onChange={(e) => setEra(e.target.value)} style={{ padding: "10px 12px", minHeight: 40 }}>
						{['明治','大正','昭和','平成','令和'].map((g) => (
							<option key={g} value={g}>{g}</option>
						))}
					</select>
				</label>

				<label style={{ display: "grid", gap: 6 }}>
					<span>和暦の年</span>
					<input type="number" min={1} value={year} onChange={(e) => setYear(e.target.value)} style={{ padding: "10px 12px", minHeight: 40 }} />
				</label>

				<label style={{ display: "grid", gap: 6 }}>
					<span>生まれ月</span>
					<input type="number" min={1} max={12} value={month} onChange={(e) => setMonth(e.target.value)} style={{ padding: "10px 12px", minHeight: 40 }} />
				</label>

				<button type="submit" disabled={loading} style={{ backgroundColor: "#1e88e5", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 6, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
					{loading ? "計算中..." : "送信"}
				</button>
			</form>

			{error && <p style={{ color: "red" }}>{error}</p>}
			{message && (
				<div style={{ border: "1px solid #ccc", padding: 12, borderRadius: 8 }}>
					<p>{message}</p>
				</div>
			)}
		</div>
	)
}