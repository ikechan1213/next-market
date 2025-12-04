"use client"
import { useState } from "react"

const ReadAllItems = () => {
  const [yen, setYen] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/Q1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: yen }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      alert(data.message)
    } catch (err) {
      alert("エラーが発生しました: " + err.message)
    }
  }

  return (
    <div>
      <h1 className="h1-style">通貨換算</h1>
      <h3>日本円を米ドルにできるよ</h3>

      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <label style={{ display: "block", marginBottom: 8 }}>
          日本円:
          <input
            type="text"
            value={yen}
            onChange={(e) => setYen(e.target.value)}
            placeholder="例: 1000"
            style={{ marginLeft: 8 }}
          />
        </label>
        <button type="submit">送信</button>
      </form>
    </div>
  )
}

export default ReadAllItems