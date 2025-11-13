
'use client';
import React from "react";

export default function Caracteristicas() {
  const caracteristicas = [
    'JSX, sintaxe que mistura HTML e JS.',
    'Componentes, funções que retornam JSX.',
    'Componentes Reutilizáveis e Modulares.',
    'Roteamento Automático e APIs.',
    'Hooks: useState, useEffect e useSWR.',
    'Renderização Rápida e SEO Friendly.',
    'TypeScript Seguro e Escalável.',
    'Comunidade Ativa e Popularidade.'
  ];
function handleClick() {
    alert("Clicaste no botão!");
} 
  return (
    <main className="flex flex-col items-center">
      <h2>
        Características do React e Next.js
      </h2>

      <ul className="p-20 m-3">
        {caracteristicas.map((caracteristica, index) => (
          <li key={index}>{caracteristica}</li>
        ))}
      </ul>
        <button onClick={handleClick} className="p-5 bg-blue-600 rounded hover:bg-black px-10"> click!!</button>
    </main>
  );
}