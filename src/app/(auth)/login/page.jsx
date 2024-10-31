"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { externalLogin } from '@/context/auth/auth_state.jsx'; 

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

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
            await externalLogin();
            router.push('/');
        } catch (error) {
            setError("Error al autenticarse con el método externo");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-6">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Iniciar Sesión</h2>
                    <p className="text-gray-600 mb-6 text-center">Bienvenido de nuevo, por favor ingresa a tu cuenta</p>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
                            placeholder="********"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Iniciar sesión
                    </button>
                </form>
                <div className="flex items-center justify-center my-4">
                    <span className="w-full h-px bg-gray-300"></span>
                    <span className="px-4 text-gray-600">O</span>
                    <span className="w-full h-px bg-gray-300"></span>
                </div>
                <button
                    onClick={handleExternalLogin}
                    className="w-full py-3 text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    Iniciar sesión con usuario gub.uy
                </button>
                <p className="text-sm text-center text-gray-600 mt-6">
                    ¿No tienes cuenta?{' '}
                    <a href="#" className="font-medium text-blue-700 hover:underline">
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
}
