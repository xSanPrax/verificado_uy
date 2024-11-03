"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/auth/auth_context.jsx";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nombre, setNombre] = useState(''); 
    const [error, setError] = useState(null);
    const router = useRouter();
    const { internalRegister, mensaje, cargando } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            // Llamar a la función de registro interno
            await internalRegister(nombre, email, password);

            // Redirige al usuario después del registro
            router.push('login');
        } catch (error) {
            setError('Error al registrar la cuenta');
        }
    };

    const handleExternalRegister = async () => {
        try {
            await externalLogin();
            router.push('/login');
        } catch (error) {
            setError("Error al registrarse con el método externo");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-6">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Registrarse</h2>
                    <p className="text-gray-600 mb-6 text-center">Crea tu cuenta para empezar</p>
                </div>
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
                            placeholder="Tu nombre"
                        />
                    </div>
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
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
                            placeholder="********"
                        />
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    {mensaje && <p className="text-sm text-green-600 text-center">{mensaje}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                        disabled={cargando}
                    >
                        {cargando ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
                <div className="flex items-center justify-center my-4">
                    <span className="w-full h-px bg-gray-300"></span>
                    <span className="px-4 text-gray-600">O</span>
                    <span className="w-full h-px bg-gray-300"></span>
                </div>
                <button
                    onClick={handleExternalRegister}
                    className="w-full py-3 text-white bg-green-600 hover:bg-green-700 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    Registrarse con usuario gub.uy
                </button>
                <p className="text-sm text-center text-gray-600 mt-6">
                    ¿Ya tienes cuenta?{' '}
                    <a href="login" className="font-medium text-blue-700 hover:underline">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
}
