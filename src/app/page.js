import Link from "next/link";

export default async function Home() {
  const data = await getPosts();
  console.log(data)
  return (
    <>
      {data.exper.map((da, index) => {
        return (
          <div key={index}>
            <Link href={`/e/${da.id}`}>{da.title}</Link>
            <h4>{da.theory}</h4>
            <hr/>
          </div>
        )
      })} 
    </>
  )
}

const getPosts = async() =>{
  const res = await fetch(
    'http://localhost:3000/api/home', 
    {method:'GET', cache: 'no-store'},
  )
  console.log(res);
  // if(!res?.ok){
  //   throw new Error('Data fetching error')
  // }
  return res.json();
}