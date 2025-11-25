import Link from "next/link";
interface CaracterísticasProps {
    caracteristica: string;
}
export default function Caracteristica({ caracteristica }: CaracterísticasProps) {
    return (
       
        <Link href={`/caracteristicas/${caracteristica}`}>
        <li className="text-sm text-gray-600"> {caracteristica} </li>
        </Link>
       
    );
}
