'use client'

import { useRouter } from "next/navigation"

export default function User({profile}){
    const router = useRouter();
    const onClickDelete = async () => {
        const uncertifiedProfessorCount = await fetch('http://localhost:3000/api/uncertifiedProfessor', {
            method: 'DELETE',
            headers: {
                userId: profile.id
            }
        })
    }

    const onClickGrant = async () => {
        const uncertifiedProfessorCount = await fetch('http://localhost:3000/api/uncertifiedProfessor', {
            method: 'PUT',
            headers: {
                userId: profile.id
            }
        })
    }

    return <div>
        <label>{profile.name}</label>
        <label>{profile.email}</label>
        <button onClick={onClickDelete}>Delete</button>
        <button onClick={onClickGrant}>Grant Access</button>
    </div>
}