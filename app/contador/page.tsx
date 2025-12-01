import React from 'react';
import '@/components/Contador/Contador';
import Contador from '@/components/Contador/Contador';

export default function ContadorPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">
                Página do Contador
            </h1>
            <Contador />
        </div>
    );
}
