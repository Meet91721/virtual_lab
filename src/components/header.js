import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { LoginButton, LogoutButton, RegisterButton, CreateExperimentButton } from './buttons.component';
import Link from 'next/link';

const Header = async() => {
    const session = await getServerSession(authOptions);

    if(!session){
        return (
            <>
                <RegisterButton />
                <LoginButton />
                <hr />
            </>
        )
    }
    return (
        <div>
            This is header
            {session.user.role === 'PROFESSOR' && <CreateExperimentButton />}
            {session.user.role === 'ADMIN' && <GetUncertifiedProfessor />}
            
            <LogoutButton />

            <hr />
        </div>
    )
}

const GetUncertifiedProfessor = async () => {
    const uncertifiedProfessorCount = await fetch('http://localhost:3000/api/uncertifiedProfessor', {
        method: 'GET',
        headers: {
            iAmList: false
        }
    })
    const cnt = await uncertifiedProfessorCount.json()
    if(cnt.ucp === undefined || cnt.ucp === 0){
        return(
            <></>
        )
    }
    return (
        <Link href={'/grantAccess'}> 🔔<sup>{cnt.ucp}</sup></Link>
    )
}

export default Header