"use client";

export const externalLogin = async () => {
    try {
        // Redirige al usuario a la URL del flujo OAuth
        window.location.href = 'http://localhost:8080/login';
    } catch (error) {
        console.error("Error iniciando el flujo de autenticación:", error);
        throw error;
    }
};
