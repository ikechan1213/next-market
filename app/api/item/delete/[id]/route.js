import connectDB from "@/app/utils/database"
import { NextResponse } from "next/server"
import { ItemModel } from "@/app/utils/schemaModels"
export async function DELETE(request,context) {
    try{
        await connectDB
        const params = await context.params
        await ItemModel.deleteOne({_id: params.id})
        return NextResponse.json({message: "アイテム削除成功"})
    }catch{
        return NextResponse.json({message: "アイテム削除失敗"})
    }
}