import Link from "next/link";
export default function CaracteristicaPage({ params }: { params: { caracteristica: string } }) {
    const { caracteristica } = params;
    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Característica: {caracteristica}</h1>
            <p className="text-gray-700">Detalhes sobre a característica {caracteristica} serão exibidos aqui.</p>
            <Link href="/caracteristicas">
<button className="px-4 py-2 bg-gray-200 rounded-xl">Voltar</button>
</Link>
        </div>
    );
}
