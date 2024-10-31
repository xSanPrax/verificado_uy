"use client"
import { useState } from 'react';
import { useRouter } from 'next/router';
import { externalLogin } from '@/context/auth/auth_state.jsx'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email === 'usuario@example.com' && password === 'password123') {
            router.push('/');
        } else {
            setError('Correo o contraseña incorrectos');
        }
    };

    const handleExternalLogin = async () => {
        try {
            await externalLogin(); // Llama a la función de autenticación externa
            // Aquí puedes redirigir o manejar el éxito de la autenticación
            router.push('/');
        } catch (error) {
            setError("Error al autenticarse con el método externo");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="********"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <button
                    onClick={handleExternalLogin}
                    className="w-full px-4 py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Iniciar sesión con usuario gub.uy
                </button>
                <p className="text-sm text-center text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <a href="#" className="font-medium text-blue-600 hover:underline">
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
}
