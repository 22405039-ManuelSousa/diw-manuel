'use client'
import { useEffect, useState } from "react"

export default function Contador() {

    const [count, setCount] = useState(0);

    useEffect( () => {
	localStorage.setItem('count', `${count}`);
}, [count]);


    useEffect(() => {
        document.title = `${count}`
    }, [count])
    const getColor = () => { 
        if (count <= 3) return "text-red-500";
        if (count <= 7) return "text-yellow-300";
        return "text-green-500";
    }
    return <>
    <section className = "bg-blue-300 p-2 pb-4 mt-6 rounded-xl">
     
 <h2>Contador</h2>
        <p className={`text-2xl font-bold ${getColor()}`}>O Contador vai em: {count}</p>
        <button className="bg-green-500 hover:bg-green-600 active:bg-purple-700 hover:pointer text-white font-bold py-2 px-4 mx-2 border border-green-700 rounded"
            onClick={() => setCount(count < 10 ? count + 1 : 10)}>
                Incrementar
        </button>
       <button className="bg-green-500 hover:bg-green-600 active:bg-purple-700 hover:pointer text-white font-bold py-2 px-4 mx-2 border border-green-700 rounded"
            onClick={() => setCount(count > 0 ? count - 1 : 0)}>
                      Decrementar
        </button>
      <button className="bg-green-500 hover:bg-red-600 active:bg-black hover:pointer text-white font-bold py-2 px-4 mx-2 border border-green-700 rounded"
            onClick={() => setCount(0)}>
            Reset
        </button>
    </section>
       
    </>
}