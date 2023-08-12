export default async function Experiment({params}){
    const experiment = await getPost(params.id);
    
    if(experiment === undefined){
        return <>Loading</>
    }
    return(
        <>
            My Post: {params.id}
        </>
    )
}

async function getPost(id){
  const res = await fetch(
    `http://localhost:3000/api/e/${id}`,
    {
      method: 'GET',
      cache: "no-store",
    }
  )
  if(!res?.ok){
    return undefined
  }
  return res.json();
}