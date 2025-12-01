"use client"

import Link from 'next/link'
import { useParams } from "next/navigation"
import tecnologias from '@/app/data/tecnologias.json'
import TecnologiaDetailsCard from '@/components/TecnologiaDetailsCard/TecnologiaDetailsCard'

export default function TecnologiaPage() {

    const params = useParams()
    const index = Number(params.tecnologia)
    
    const tecnologia = tecnologias[index];


    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-10">
            
            <TecnologiaDetailsCard 
                title={tecnologia.title}
                image={tecnologia.image}
                description={tecnologia.description}
                rating={tecnologia.rating}
            />

            <Link 
                href="/tecnologias" 
                className="mt-5 px-4 py-2 bg-blue-300 rounded hover:bg-blue-600 transition"
            >
                Voltar
            </Link>
        </div>
    )
}