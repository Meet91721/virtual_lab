import { NextResponse } from "next/server";
export async function GET(request){
    const id = request.nextUrl.pathname.split('/')[3]
    const experiment = await prisma.experiments.findUnique({
        where: {
            id: id
        }
    })
    if(experiment){
        return NextResponse.json({exper: experiment}, {status: 200})
    }
    return NextResponse.json({Error:"Experiment not found"}, {status: 404})
}