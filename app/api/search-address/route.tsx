import { NextResponse } from "next/server";

export async function GET(request:any){
    
    
    return NextResponse.json({data:'Test'})
}