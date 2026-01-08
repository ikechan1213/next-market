"use client";

import { useState } from "react";
import styles from "./page.module.css";

// 表示する質問文（ユーザー指定）
const questionText = {
	q1: "問題が起きたとき、最初にすることは？",
	q2: "何かを決めるときに重視するのは？",
	q3: "新しいことに挑戦するときは？",
};
// 選択肢（ユーザー指定）
const options = {
	q1: ["原因を分析する", "周囲の気持ちを考える", "とりあえず動く"],
	q2: ["データや根拠", "自分や他人の気持ち", "スピード感"],
	q3: ["しっかり準備してから", "ワクワクするかどうか", "まずやってみる"],
};



export default function Page() {
	const [answers, setAnswers] = useState({ q1: options.q1[0], q2: options.q2[0], q3: options.q3[0] });
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleChange = (key, value) => {
		setAnswers((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const res = await fetch("/api/Q2", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(answers),
			});
			if (!res.ok) throw new Error("サーバーエラーが発生しました");
			const data = await res.json();
			setResult(data);
		} catch (err) {
			setError(err.message || "送信に失敗しました");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<h1>性格診断（Q1-Q3）</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				{Object.entries(options).map(([key, opts]) => (
					<label key={key} className={styles.field}>
						<span className={styles.labelText}>{questionText[key]}</span>
						<select
							className={styles.select}
							value={answers[key]}
							onChange={(e) => handleChange(key, e.target.value)}
						>
							{opts.map((opt) => (
								<option key={opt} value={opt}>
									{opt}
								</option>
							))}
						</select>
					</label>
				))}
				<button type="submit" disabled={loading} className={styles.button}>
					{loading ? "診断中..." : "送信"}
				</button>
			</form>

			{error && <p style={{ color: "red" }}>{error}</p>}

			{result && (
				<div className={styles.resultBox}>
					<p>タイプ: {result.dominantLabel}</p>
					<p>説明: {result.description}</p>
					{result.image && (
						<img
							src={`/${result.image}`}
							alt={result.dominantLabel || "result image"}
							style={{ maxWidth: "100%", height: "auto" }}
						/>
					)}
				</div>
			)}
		</div>
	);
}
