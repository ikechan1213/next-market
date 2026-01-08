import { NextResponse } from "next/server";

// Mapping from answers to personality types
const answerToType = {
	"原因を分析する": "analysis",
	"周囲の気持ちを考える": "sensing",
	"とりあえず動く": "action",
	"データや根拠": "analysis",
	"自分や他人の気持ち": "sensing",
	"スピード感": "action",
	"しっかり準備してから": "analysis",
	"ワクワクするかどうか": "sensing",
	"まずやってみる": "action",
};

const typeMeta = {
	analysis: {
		label: "分析型",
		description:
			"論理的に考え、計画的に物事を進めるタイプです。",
		image: "type_a.png",
	},
	sensing: {
		label: "感覚型",
		description:
			"気持ちや共感を大切にし、人間関係を重視するタイプです。",
		image: "type_b.png",
	},
	action: {
		label: "行動型",
		description:
			"考えるよりも先に行動し、経験から学ぶタイプです。",
		image: "type_c.png",
	},
};

function tallyScores(answers) {
	const scores = { analysis: 0, sensing: 0, action: 0 };
	answers.forEach((answer) => {
		const type = answerToType[answer];
		if (type) scores[type] += 1;
	});
	return scores;
}

function pickDominant(scores) {
	return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export async function POST(request) {
	const { q1, q2, q3 } = await request.json();

	const answers = [q1, q2, q3];
	if (answers.some((a) => typeof a !== "string")) {
		return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
	}

	const scores = tallyScores(answers);
	const dominantType = pickDominant(scores);
	const meta = typeMeta[dominantType];

	return NextResponse.json({
		scores,
		dominantType,
		dominantLabel: meta?.label,
		description: meta?.description,
		image: meta?.image,
	});
}
