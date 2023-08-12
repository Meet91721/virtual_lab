import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
    const body= await request.json();
    const { username, email, password, creator } = body
    if (!username || !email || !password || creator === undefined) {
        return new NextResponse.badRequest('Missing fields', { status: 400 });
    }
    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!!exist) {
        return new NextResponse('user already exists', { status: 400 });
    }
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name: username,
            email: email,
            hashedPassword: hashedPassword,
            role: creator?"PROFESSOR": "USER"
        }
    })
    return new NextResponse({
        status: 'ok',
        data: user
    })
}