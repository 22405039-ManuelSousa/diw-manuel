"use client";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard/TecnologiaDetailsCard";
import tecnologias from "@/app/data/tecnologias.json";
import Link from "next/link";


export default function TecnologiaPage({ params }: { params: { id: string } }) {
const index = parseInt(params.id);
const tecnologia = tecnologias[index];

return (
<div className="p-6 space-y-4">
<TecnologiaDetailsCard
title={tecnologia.title}
image={tecnologia.image}
description={tecnologia.description}
rating={tecnologia.rating}
/>  


<Link href="/tecnologia">
<button className="px-4 py-2 bg-gray-200 rounded-xl">Voltar</button>
</Link>
</div>
);
}