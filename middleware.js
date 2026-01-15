import { jwtDecrypt, jwtVerify } from "jose"
import { NextResponse } from "next/server"

export async function middleware(request){
    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTc2MzA4MzIzOX0.H3KEuXYm90g_C-nj91wcFWox9G7dH9jWLIHE077LBVk"
    
    const token = await request.headers.get("Authorization")?.split(" ")[1] //

    if(!token){
        return NextResponse.json({message: "トークンがありません"})
    }

    try{
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const decodeJwt = await jwtVerify(token, secretKey)
        // console.log("decodeJwt: ", decodeJwt)
        return NextResponse.next()
    }catch{
        return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
    }
    
}

export const config = {
    matcher: ["/api/item/create","/api/item/update/:path*","/api/item/delete/:path*"],
}