import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const exper = await prisma.experiment.findMany(
        {   
            take: 5,
            select: {
                title: true,
                theory: true,
                id: true
            }
        },
    );
    return NextResponse.json({"exper":exper} , { status: 200 });
}