import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({msg: "Reached"}, {status: 200});
}