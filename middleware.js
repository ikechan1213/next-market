import { NextResponse } from "next/server"

export async function middleware(){
    console.log("ミドルウェア")
    return NextResponse.next()
}

export const config = {
    matcher: ["/api/item/create","/api/item/update/:path*","/api/item/delete/:path*"],
}