import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const value = body?.value ?? ''

    const raw = String(value)
    const normalized = raw.trim().replace(/,/g, '')

    // 非数値チェック
    if (normalized === '' || isNaN(Number(normalized))) {
      return NextResponse.json({ message: '数値以外が入力されています' })
    }

    const yen = Number(normalized)

    // 為替レート: 1ドル = 155円
    const rate = 155
    const totalDollars = yen / rate

    // セント単位で切り捨て（小数第3位以下切り捨て）
    const totalCents = Math.floor(totalDollars * 100)

    let message

    if (totalCents < 1) {
      // 1セント未満
      message = `${yen}円は 1 セント未満です。`
    } else {
      const dollars = Math.floor(totalCents / 100)
      const cents = totalCents % 100

      if (dollars === 0 && cents > 0) {
        // 1ドル未満
        message = `${yen}円は${cents}セントです。`
      } else if (cents === 0) {
        // セントが0
        message = `${yen}円は${dollars}ドルです。`
      } else {
        message = `${yen}円は${dollars}ドル${cents}セントです。`
      }
    }

    return NextResponse.json({ message })
  } catch (err) {
    return NextResponse.json({ message: 'サーバーでエラーが発生しました' }, { status: 500 })
  }
}
