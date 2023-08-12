import { prisma } from "./prisma";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Sign In',
            credentials: {
                email: {
                label: "Email",
                type: "email",
                placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials){
                if(!credentials.email || !credentials.password){
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if(!user || !compare(credentials.password, user.hashedPassword)){
                    return null;
                }
                return user;
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            // console.log("I am here: \n\n\n\n--=============================================\n", token)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                    roleAccepted: token.roleAccepted,
                    randomKey: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user;
                return {
                    ...token,
                    id: u.id,
                    role: u.role,
                    roleAccepted: u.roleAccepted,
                    randomKey: u.randomKey,
                };
            }
            return token;
        }
    }
}