import React from 'react';
import { Product } from '@/models/interface';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

interface ProdutoCardProps {
  produto: Product;
  adicionarAoCarrinho?: (p: Product) => void;
  removerDoCarrinho?: () => void;
}

export default function ProdutoCard({ produto, adicionarAoCarrinho, removerDoCarrinho }: ProdutoCardProps) {
  
  const imageSrc = produto.image.startsWith('http') 
    ? produto.image 
    : `https://deisishop.pythonanywhere.com${produto.image}`;

  return (
    <Card className="flex flex-col justify-between bg-white h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle title={produto.title} className="line-clamp-1 text-base">
          {produto.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex justify-center p-2 bg-white rounded-md mx-4 overflow-hidden relative h-32">
        <div className="relative w-full h-full">
            <Image 
                src={imageSrc}
                alt={produto.title} 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 mt-2 p-4 pt-0">
        <span className="text-lg font-bold text-gray-800 self-start">
            {Number(produto.price).toFixed(2)} €
        </span>
        
        {removerDoCarrinho ? (
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    removerDoCarrinho();
                }}
                className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-bold"
            >
                Remover
            </button>
        ) : (
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    if (adicionarAoCarrinho) adicionarAoCarrinho(produto);
                }}
                className="w-full bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors text-sm font-bold"
            >
                Adicionar
            </button>
        )}
      </CardFooter>
    </Card>
  );
}