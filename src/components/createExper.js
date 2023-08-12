'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateExper = () => {
    const router = new useRouter()
    const [experiment, setExperiment] = useState({
        title: '',
        theory: '',
        procedure: ''
    });


    const onClickHandler = async (e) => {
        e.preventDefault();
        await fetch(`/api/create`, {
            method: "POST",
            cache: "no-store",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(experiment),
        }).then(async()=>{
            router.push('/')
          }
        ).catch((e) => {
            console.log(e)
        }
        )
    }
    return (
        <form>
            <label>Title</label>
            <br />
            <input type="text" value={experiment.title} onChange={(e) => setExperiment({...experiment, title: e.target.value})}/>
            <br />
            <label>Theory</label>
            <br />
            <input type="text" value={experiment.theory} onChange={(e) => setExperiment({...experiment, theory: e.target.value})}/>
            <br />
            <label>Procedure</label>
            <br />
            <input type="text" value={experiment.procedure} onChange={(e) => setExperiment({...experiment, procedure: e.target.value})}/>
            <br /> 

            <button onClick={(e) => {onClickHandler(e)}}>Create new experiment</button>
        </form>
    )
}

export default CreateExper