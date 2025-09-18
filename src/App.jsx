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
    
     <nav className='bg-zinc-800 h-25 flex justify-start  items-center fixed z-10 top-0 left-0 w-full'>
      <h1 className='text-2xl ml-3 text-white font-bold'>☰ HD-Hub-Movie</h1>
       <input className='border-3 rounded-md p-2 bg-white ml-80' value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Search  Movie' />

      <button type='submit' className='border-3 rounded-md p-2 active:scale-90 ml-3 bg-amber-600'> 
      Search</button>
   
     </nav>
    <div className='pt-25'>
      {searchItem.length ? (
       <div className='bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1533637041618-f0e4c869801e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] grid grid-flow-col grid-rows-4 gap-10 scroll-auto ransition-transform duration-300 p-4'>
       { searchItem.map((item,idx)=>{
          return <div className='w-80 bg-zinc-300/20 text-black h-auto items-center rounded-md hover:scale-95  '>
         <div className='flex justify-between '>
              <img className='h-95 w-75  rounded-md opacity-90  shadow-lg shadow-amber-50 object-cover items-center ml-4 p-2' src={item.Poster} alt="" />
         </div>
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