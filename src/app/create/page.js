import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CreateExper from "@/components/createExper";
import Link from "next/link";

export default async function Create () {
    const session = await getServerSession(authOptions);

    console.log(session?.user)

    if(!session || session.user.role !== 'PROFESSOR'  || session.user.roleAccepted === false){
        return (
            <div>
                Please login with a creator account to access this page
                <Link href={'/'}>Home Page</Link>
            </div>
        )
    }

    return (
        <div>
            <CreateExper />
        </div>
    )
}