import Raect, { useEffect, useState } from 'react'

const Home = () =>{
    const [data, setData]  =useState([])
    const [text, setText]  = useState("")
    // const [addText, setAddText]  = useState()
    const [page,setPage]  =  useState(1);
    const [limit, setLimit] = useState(1)
 
    const getData = async(page, limit) =>{

                   let res = await fetch(`http://localhost:4000/data?_page=${page}&_limit=${limit}`)
                   let result = await res.json();
                //    console.log(result)
                   setData(result)
    }

    const handleAdd = async()=>{
        const postData = {
               method: "POST",
               headers : {'Content-Type': 'application/json'},
               body :JSON.stringify({id:Date.now(),value:text})
        }
              let res = await fetch("http://localhost:4000/data", postData)
              let result = await res.json()
              console.log(result);
              getData(page, limit)
    }

    const handleDelete = async(id) =>{
                 let res= await fetch(`http://localhost:4000/data/${id}`, {method:'DELETE'})
                 let result = await res.json()
                 console.log(result);

                 getData(page, limit)

    }

    useEffect(()=>{
             getData(page,limit)
    },[page, limit])

    return (
        <div>
            Home
            <div>
                <input type='text' placeholder='type something' onChange= {(e)=>setText(e.target.value)} />
                <button onClick={handleAdd}>Add</button>
            </div>
            {data.map((e)=>{
                  
                  return (
                    <table border='1' key={e.id}>
                          <thead>
                            <tr>
                                <th>{e.id}</th>
                                <th>{e.value}</th>
                                <th onClick={()=>handleDelete(e.id)}>Delete</th>
                            </tr>
                          </thead>
                    </table>
                  )
            })}

            <div>
                <button disabled={page<=1} onClick={()=>setPage(page-1)}>{"<"}</button>
                <button>{page}</button>
                <button onClick={()=>setPage(page+1)}>{">"}</button>
            </div>
            <span>Select per _page</span>
            <select defaultValue={"1"} onChange={(e)=>setLimit(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    )
}

export default Home