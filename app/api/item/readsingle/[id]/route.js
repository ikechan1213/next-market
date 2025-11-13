import { NextResponse } from "next/server";
import connectDB from "../../../../utils/database";
import { ItemModel } from "../../../../utils/schemaModels";

export async function GET(request, context) {
    
    try{
        
        await connectDB()
        const params = await context.params
        const singleitem = await ItemModel.findById(params.id)
        return NextResponse.json({message: "アイテムの読み取り成功(シングル)",singleitem: singleitem})
    }catch{
        
        return NextResponse.json({message: "アイテムの読み取り失敗(シングル)"})
    }
}