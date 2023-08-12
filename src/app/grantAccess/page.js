import User from "@/components/user.component";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function GrantAccess () {

    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== 'ADMIN'){
        return (
            <div>
                You do not have admin access
                <Link href={'/'}>Home Page</Link>
            </div>
        )
    }

    const uncertifiedProfessorCount = await fetch('http://localhost:3000/api/uncertifiedProfessor', {
        method: 'GET',
        headers: {
            iAmList: true
        }
    })

    var professorList = await uncertifiedProfessorCount.json()
    professorList = professorList.ucp

    return (
        <form>
            {
                professorList.map((professor, index1) => (
                    <User profile={professor} key={index1}/>
                ))
            }
        </form>
    )
}
