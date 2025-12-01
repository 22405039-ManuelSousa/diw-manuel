'use client';

import React from 'react';
import Link from 'next/link';
import tecnologiasData from '@/app/data/tecnologias.json';
import TecnologiaCard from '@/components/TecnologiaCard/TecnologiaCard';

export default function Page() {
  const tecnologias = tecnologiasData;

  return (
    <main className="flex flex-col items-center px-6 py-10">

      <h2 className="text-3xl font-bold mb-10">Tecnologias</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">

        {tecnologias.map((tec, index) => (
          
          <Link href={`/tecnologias/${index}`} key={index}>
            <TecnologiaCard
              title={tec.title}
              image={tec.image}
            />
          </Link>

        ))}

      </div>

    </main>
  );
}
