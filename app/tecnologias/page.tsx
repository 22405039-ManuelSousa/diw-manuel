'use client'
import React from 'react'
import Image from "next/image";
import tecnologiasData from '@/app/data/tecnologias.json';

export default function Page() {
    const tecnologias = JSON.parse(JSON.stringify(tecnologiasData));

  return (
    <>
    <main className='flex flex-col items-center' >
<h2 >Tecnologias</h2>
<div>{tecnologias.map((tec: any, i: number) => (

          <div key={i}>
            <h3>{tec.title}</h3>
            <p className=" text-pink-400">
              {tec.description}
            </p>
            <Image src={tec.image} 
            alt={tec.title} 
            width={100}
             height={100}>
            </Image>
 
            <p className=" mt-2 text-orange-500"> {tec.rating}</p>
          </div>
        ))}
        
      </div>
    </main>

    </>
  )
}
