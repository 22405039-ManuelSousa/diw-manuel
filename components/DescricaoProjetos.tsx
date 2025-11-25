import React from 'react';
import Projeto from '@/components/Projeto';

export default function DescricaoProjetos() {
    const projetos = [
        { nome: 'Lab7', link: 'https://22405039-manuelsousa.github.io/lab7/index.html' },
        { nome: 'Lab5', link: 'https://22405039-manuelsousa.github.io/lab5/index.html' },
        { nome: 'Projeto C', link: 'https://projeto-c.com' },
    ];
    
    return (
        
        <div className="space-y-4 p-4">
            {projetos.map((projeto, index) => (
                <Projeto key={index} nome={projeto.nome} link={projeto.link} />
            ))}
        </div>
    );
}
