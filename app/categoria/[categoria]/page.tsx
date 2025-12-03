'use client'

import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { Product } from '@/models/interface'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoryProductsPage() {
    const params = useParams();
    const categoria = params.category; 

    const { data: produtos, error, isLoading } = useSWR<Product[]>(
        `https://deisishop.pythonanywhere.com/products?category=${categoria}`, 
        fetcher
    );

    if (error) return <div>Erro ao carregar.</div>;
    if (isLoading) return <div>A carregar produtos...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textTransform: 'capitalize' }}>Categoria: {categoria}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {produtos?.map((produto) => (
                    <div key={produto.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <h4>{produto.title}</h4>
                        <img src={produto.image} alt={produto.title} width={80} />
                        <p>{produto.price} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
}