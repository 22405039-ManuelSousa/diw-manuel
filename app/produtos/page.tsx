'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Product } from '@/models/interface'
import ProdutoCard from '@/components/ProdutoCard/ProdutoCard'
import React from 'react'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductsPage() {

    const { data: produtos, error } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);
    
    const [cart, setCart] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [sortOrder, setSortOrder] = useState('');

    const [isStudent, setIsStudent] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0 || localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    function addToCart(produto: Product) {
        setCart((prevCart) => [...prevCart, produto]);
    }

    function removeFromCart(index: number) {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    }

    function buy() {
        setMessage("A processar...");

        fetch("https://deisishop.pythonanywhere.com/buy", {
            method: "POST",
            body: JSON.stringify({
                products: cart.map(product => product.id),
                name: name, 
                student: isStudent,
                coupon: coupon
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro desconhecido");
            }
            return response.json();
        })
        .then(response => {
            
            setMessage(`Compra com sucesso! Valor final: ${response.totalCost}€ (Referência: ${response.reference})`);
            setCart([]); 
            localStorage.removeItem('cart');
            setCoupon('');
            setIsStudent(false);
            setName(''); 
        })
        .catch(error => {
            console.error("Erro na compra:", error);
            setMessage(error.message);
        });
    }

    useEffect(() => {
        if (produtos) {
            let result = produtos.filter(produto => 
                produto.title.toLowerCase().includes(search.toLowerCase())
            );

            if (sortOrder === 'price-asc') {
                result.sort((a, b) => Number(a.price) - Number(b.price)); 
            } else if (sortOrder === 'price-desc') {
                result.sort((a, b) => Number(b.price) - Number(a.price));
            } else if (sortOrder === 'name-asc') {
                result.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'name-desc') {
                result.sort((a, b) => b.title.localeCompare(a.title));
            }
            
            setFilteredData(result);
        }
    }, [search, produtos, sortOrder]);

    if (error) return <div>Falha ao carregar os produtos.</div>;
    if (!produtos) return <div className="p-6 text-center">A carregar produtos...</div>;
    
    const totalCusto = cart.reduce((total, item) => total + Number(item.price), 0);

    return (
        <main className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-primary">
                DEISI Shop Produtos
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                
                <div className="w-full lg:w-3/4">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input 
                            type="text" 
                            placeholder="Pesquisar produto..." 
                            className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                        <select 
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="">Ordenar por...</option>
                            <option value="price-asc">Preço: Menor para Maior</option>
                            <option value="price-desc">Preço: Maior para Menor</option>
                            <option value="name-asc">Nome: A a Z</option>
                            <option value="name-desc">Nome: Z a A</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredData.map((produto) => (
                            <Link key={produto.id} href={`/produtos/${produto.id}`}>
                                <ProdutoCard 
                                    produto={produto} 
                                    adicionarAoCarrinho={addToCart} 
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/4">
                    <div className="bg-slate-50 p-4 rounded-xl shadow border sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Carrinho ({cart.length})</h2>
                        
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4">O carrinho está vazio.</p>
                        ) : (
                            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 mb-4">
                                {cart.map((item, index) => (
                                    <div key={index} className="scale-95 origin-left"> 
                                        <ProdutoCard 
                                            produto={item} 
                                            removerDoCarrinho={() => removeFromCart(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="border-t pt-4 space-y-4">
                            
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Nome</label>
                                <input 
                                    type="text"
                                    placeholder="Insira o seu nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isStudent}
                                    onChange={(e) => setIsStudent(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Sou estudante do DEISI</span>
                            </label>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Cupão</label>
                                <input 
                                    type="text"
                                    placeholder="Inserir cupão"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-between items-center text-lg font-bold pt-2 border-t mt-2">
                                <span>Total (Estimado)</span>
                                <span>{totalCusto.toFixed(2)} €</span>
                            </div>

                            <button 
                                onClick={buy}
                                disabled={cart.length === 0}
                                className={`w-full py-2 rounded-lg font-bold transition-colors ${
                                    cart.length === 0 
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                            >
                                Comprar
                            </button>

                            {message && (
                                <div className={`p-3 rounded-md text-sm font-medium border ${
                                    message.includes('Erro') || message.includes('falhou')
                                    ? 'bg-red-50 border-red-200 text-red-700' 
                                    : 'bg-green-50 border-green-200 text-green-700'
                                }`}>
                                    {message}
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}