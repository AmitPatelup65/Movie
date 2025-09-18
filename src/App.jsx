import React, { useEffect, useState } from 'react'

function App() {
  const [data, setdata] = useState([])
  const [search, setsearch] = useState("")
  const apiKey='dd4ad9fd'
  const searchItem=data.filter((item)=>{
    const fetchItem=search.toLowerCase();
    if(fetchItem==" "){
      return true;
    }
    return item.Title.toLowerCase().includes(fetchItem);
  })
   const getdata=async()=>{
    const fetchdata=await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search || "marvel"}`)
    const result =await fetchdata.json()
    setdata(result.Search || [])
     
    
   }
   console.log(data)
  
   useEffect(()=>{
    getdata()
   },[search])
   console.log(search)
  return (
    <div className=''> 
     <nav className='bg-zinc-800 h-25 flex justify-center items-center'>
       <input className='border-3 rounded-md p-2 bg-white' value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Search  Movie' />
    <button type='submit' className='border-3 rounded-md p-2 active:scale-90 ml-3 bg-amber-600'> 
      Search</button>
     </nav>
    <div className='p-10 '>
      {searchItem.length ? (
       <div className='bg-cover bg-center bg-[url("https://imgs.search.brave.com/Qmg84udBI91P4e7mYf1MEoKIdcXDb4VVIkVRPds9T9g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zY2kt/ZmktaW5kdXN0cmlh/bC1wYW5lbC1mdXR1/cmlzdGljLWNvbmNl/cHQtZGVzaWduLTE2/OTg1NzU1NC5qcGc")] grid grid-flow-col grid-rows-3 gap-16 scroll-auto ransition-transform duration-300'>
       { searchItem.map((item,idx)=>{
          return <div className='w-auto bg-amber-400 bg-opacity-10 h-auto items-center rounded-md'>
             <img className='h-95 w-auto border-1 rounded hover:scale-95 shadow-lg shadow-amber-50 object-cover items-center' src={item.Poster} alt="" />
            <div className='p-2 '>
            <h1 className='font-semibold mb-2'>🎬{item.Title}</h1>
            <h1 className='font-semibold mb-2'>📅{item.Year}</h1>
            <h1 className='font-semibold'>⭐{item.imdbID}</h1>
          </div>
          </div>
       })}
       </div>
       ) :(
        <p className='flex justify-center text-2xl font-semibold h-80 items-center'>No Result Found</p>
       )
      }
    </div>
    </div>
  )
}

export default App