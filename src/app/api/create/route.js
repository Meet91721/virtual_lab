import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
    const body= await request.json();
    const session = await getServerSession(authOptions)
    if(!session || !session.user || session.user.role !== 'PROFESSOR' || session.user.roleAccepted === false){
        return (
            NextResponse.json({error: "Unauthorized"}, {status: 401})
        )
    }
    const {title, theory, procedure} = body
    if (!title || !theory || !procedure) {
        return new NextResponse.badRequest('Missing fields', { status: 400 });
    }
    
    const experiment = await prisma.experiment.create({
        data: {
            title,
            theory,
            procedure,
            authorId: session.user.id
        }
    })
    return new NextResponse({
        status: 'ok',
        data: session.user
    })
}