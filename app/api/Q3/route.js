import {NextResponse} from 'next/server'

// 元号→西暦変換の加算値（指定どおり）
const ERA_OFFSETS = {
	'明治': 1867,
	'大正': 1911,
	'昭和': 1925,
	'平成': 1988,
	'令和': 2018,
};

function toGregorianYear(era, warekiYear) {
	const offset = ERA_OFFSETS[era];
	if (offset == null) return null;
	return offset + warekiYear;
}

function calcAge(birthYear, birthMonth, nowYear, nowMonth) {
	let age = nowYear - birthYear;
	if (nowMonth < birthMonth) age -= 1;
	if (age < 0) age = 0;
	return age;
}

export async function POST(request) {
	const body = await request.json();
	const era = body.era;           // 例: "令和"
	const year = Number(body.year); // 和暦年（整数）例: 7
	const month = Number(body.month); // 生まれ月（1-12）例: 1

	// 入力バリデーション
	if (typeof era !== 'string' || !ERA_OFFSETS[era]) {
		return NextResponse.json({ error: '元号が不正です' }, { status: 400 });
	}
	if (!Number.isFinite(year) || year <= 0) {
		return NextResponse.json({ error: '和暦の年が不正です' }, { status: 400 });
	}
	if (!Number.isFinite(month) || month < 1 || month > 12) {
		return NextResponse.json({ error: '月が不正です' }, { status: 400 });
	}

	const gregorianYear = toGregorianYear(era, year);
	if (gregorianYear == null) {
		return NextResponse.json({ error: '変換に失敗しました' }, { status: 400 });
	}

	const now = new Date();
	const nowYear = now.getFullYear();
	const nowMonth = now.getMonth() + 1; // 1-12

	const age = calcAge(gregorianYear, month, nowYear, nowMonth);

	const message = `${era} ${year} 年（西暦 ${gregorianYear} 年）${month} 月生まれの人は現在 ${age} 歳です`;

	return NextResponse.json({
		era,
		warekiYear: year,
		month,
		gregorianYear,
		now: { year: nowYear, month: nowMonth },
		age,
		message,
	});
}
