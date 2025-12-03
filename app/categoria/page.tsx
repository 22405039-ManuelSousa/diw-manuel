'use client'

import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CategoriesPage() {

    const { data: categorias, error, isLoading } = useSWR<string[]>('https://deisishop.pythonanywhere.com/categories/', fetcher);

    if (error) return <div>Erro.</div>;
    if (isLoading) return <div>A carregar categorias...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Categorias</h1>
            <ul>
                {categorias?.map((cat, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <Link href={`/categories/${cat}`} style={{ fontSize: '18px', textTransform: 'capitalize' }}>
                         
                           {cat === 'electronics' && '💻 '}
                           {cat === 'jewelery' && '💍 '}
                           {cat === "men's clothing" && '👕 '}
                           {cat === "women's clothing" && '👗 '}
                           {cat}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}