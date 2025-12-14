'use client'

import React, { use } from 'react'
import useSWR from 'swr'
import { Product } from '@/models/interface'
import Image from 'next/image'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProdutoDetalhePage({ params }: PageProps) {
   
    const { id } = use(params);

    const { data: produto, error, isLoading } = useSWR<Product>(
        id ? `https://deisishop.pythonanywhere.com/products/${id}` : null,
        fetcher
    );

    if (isLoading) {
        return <div className="p-12 text-center text-xl">A carregar detalhes do produto...</div>;
    }

    if (error || !produto) {
        return <div className="p-12 text-center text-red-600">Erro: Produto não encontrado.</div>;
    }

    const imageSrc = produto.image.startsWith('http') 
        ? produto.image 
        : `https://deisishop.pythonanywhere.com${produto.image}`;

    return (
        <main className="container mx-auto p-6 min-h-screen flex flex-col items-center">
            
            <div className="w-full max-w-4xl mb-6">
                <Link 
                    href="/produtos" 
                    className="text-green-600 hover:text-blue-600 font-medium flex items-center gap-2"
                >
                     Voltar à Loja
                </Link>
            </div>

            <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
                
                <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center relative min-h-[400px]">
                    <Image 
                        src={imageSrc}
                        alt={produto.title}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <span className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">
                        {produto.category}
                    </span>
                    
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {produto.title}
                    </h1>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {produto.description}
                    </p>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-4xl font-bold text-slate-900">
                                {Number(produto.price).toFixed(2)} €
                            </span>
                            
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                <span className="text-yellow-500 text-xl mr-1">★</span>
                                <span className="font-bold text-yellow-700">{produto.rating.rate}</span>
                                <span className="text-yellow-600 text-xs ml-1">({produto.rating.count})</span>
                            </div>
                        </div>

                        <button 
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95"
                            onClick={() => alert('Para adicionar ao carrinho, use a página principal (por enquanto)!')}
                        >
                            Comprar Agora
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}