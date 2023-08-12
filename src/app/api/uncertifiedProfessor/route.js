import { prisma } from "@/lib/prisma";
import { NextResponse} from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request){

    const session = await getServerSession(authOptions)
    if(!session || session.user.role !== 'ADMIN'){
        return (
            NextResponse.json({error: "Unauthorized"}, {status: 401})
        )
    }

    var wantList = request.headers.get('iamlist')
    if(wantList === 'true'){
        const uncertifiedProfessorsList = await prisma.user.findMany({
            where: {
                role: "PROFESSOR",
                roleAccepted: false
            },
            select: {
                name: true,
                email: true,
                id: true
            }
        })
        return NextResponse.json({ucp: uncertifiedProfessorsList}, {status: 200})
    }
    const uncertifiedProfessorsCount = await prisma.user.count({
        where: {
            role: "PROFESSOR",
            roleAccepted: false
        }
    })
    return NextResponse.json({ucp: uncertifiedProfessorsCount}, {status: 200})
}



export async function DELETE(request) {


    const session = await getServerSession(authOptions)
    if(!session || session.user.role !== 'ADMIN'){
        return (
            NextResponse.json({error: "Unauthorized"}, {status: 401})
        )
    }


    var userId = request.headers.get('userId')
    try{
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        })
        return NextResponse.json({dltUsr: deletedUser}, {status: 200})
    }
    catch(error){
        return NextResponse.json({error: "User not deleted"}, {status: 400})
    }
}



export async function PUT(request) {

    const session = await getServerSession(authOptions)
    if(!session || session.user.role !== 'ADMIN'){
        return (
            NextResponse.json({error: "Unauthorized"}, {status: 401})
        )
    }

    var userId = request.headers.get('userId')
    try{

        const deletedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                roleAccepted: true
            }
        })
        return NextResponse.json({dltUsr: deletedUser}, {status: 200})
    }
    catch(error){
        return NextResponse.json({error: "User not deleted"}, {status: 400})
    }
}

