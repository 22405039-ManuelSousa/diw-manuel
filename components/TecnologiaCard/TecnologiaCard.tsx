import ContadorPersonalizado from "@/app/contadorPersonalizado/contadorPersonalizado";

interface TecnologiaProps {
    title: string;
    image: string;
}

export default function TecnologiaCard({ title, image}: TecnologiaProps) {

    return (
            <div className="w-44 h-44 bg-green-700 text-white rounded-xl p-4 m-3 flex flex-col items-center justify-center">
                <img
                 src={image}  
                    alt={title}
                    className="w-16 h-16"
                />
                <h2 className="text-center">{title}</h2>
                <ContadorPersonalizado title={title} />
            </div>
    );
}
