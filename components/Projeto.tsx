import Link from "next/link";
interface ProjetosProps {
    nome: string;
    link: string;
}
export default function Projeto({ nome, link }: ProjetosProps) {
return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">

        <h3>{nome}</h3>
        <p> Visite o projeto {nome} aqui <span> </span> 
        <Link href={link}
                    className="text-blue-300 underline"
                    target="_blank">
                    link
                </Link>
        </p>
           
    
    </div>
);
}
