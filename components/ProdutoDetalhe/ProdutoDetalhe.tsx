import React from 'react';
import { Product } from '@/models/interface';
import Image from 'next/image';

interface ProdutoDetalheProps {
  produto: Product;
}

export default function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {
  const imageSrc = produto.image.startsWith('http') 
    ? produto.image 
    : `https://deisishop.pythonanywhere.com${produto.image}`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="md:flex">
  
        <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
          <div className="relative w-full h-96">
            <Image 
              src={imageSrc} 
              alt={produto.title} 
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="uppercase tracking-wide text-sm text-blue-600 font-bold mb-2">
            {produto.category}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {produto.title}
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {produto.description}
          </p>

          <div className="flex items-center mb-6">
            <span className="text-yellow-500 text-xl mr-2">★</span>
            <span className="font-medium text-gray-700">
              {produto.rating.rate}
            </span>
            <span className="text-gray-400 text-sm ml-2">
              ({produto.rating.count} avaliações)
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-3xl font-bold text-gray-900">
              {Number(produto.price).toFixed(2)} €
            </span>
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}