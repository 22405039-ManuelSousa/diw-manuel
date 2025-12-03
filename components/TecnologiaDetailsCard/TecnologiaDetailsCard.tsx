import ContadorPersonalizado from "@/app/contadorPersonalizado/contadorPersonalizado";
interface TecnologiaDetailsProps {
    title: string;
    image: string;
    description: string;
    rating: number;
}

export default function TecnologiaDetailsCard({ title, image, description, rating }: TecnologiaDetailsProps) {
    
    return (

        <div className="w-64 h-80 bg-blue-700 text-white rounded-xl p-4 m-3 flex flex-col items-center">
            <img
                src={image}
                alt={title}
                className="w-20 h-20"
            />
            <h2 className="text-center mt-2">{title}</h2>
            <p className="text-sm mt-2">{description}</p>
            <p className="mt-2 text-yellow-300">Rating: {rating}</p>
            
            <ContadorPersonalizado title={title} />
        </div>
    );
}
    