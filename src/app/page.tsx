"use client"

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="bg-green-700 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logotipo */}
          <div className="flex items-center">
            <Image
              src="/logo.png" // Asegúrate de tener un logotipo en la carpeta public
              alt="Verificado Uy Logo"
              width={50}
              height={50}
              className="mr-3"
            />
            <h1 className="text-2xl font-bold">Verificado Uy</h1>
          </div>
          {/* Navegación (Opcional) */}
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:text-gray-300">Inicio</a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-300">Acerca de</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Contacto</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {/* Intro Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold">¡No te dejes engañar!</h2>
          <p className="mt-4 text-lg">
            En Verificado Uy te ayudamos a diferenciar entre los hechos reales y la desinformación. Nuestra misión es brindar información verificada y ayudar a la comunidad a mantenerse informada.
          </p>
          <a
            href="/login"
            className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Verificar un hecho ahora
          </a>
        </section>

        {/* Recent Verifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Verificaciones Recientes</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <Image
                  src={`/facts_verified_${id}.jpg`} // Asegúrate de tener las imágenes en public
                  alt={`Verificación hecho ${id}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Verificación: Hecho {id}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Un breve resumen del hecho verificado y el resultado: verdadero, falso o engañoso. Haz clic para más detalles.
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                  >
                    Leer verificación completa →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Fact for Verification */}
        <section id="verify-now" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Envía un Hecho para Verificación</h2>
          <p className="mb-6 text-lg">
            ¿Tienes dudas sobre un hecho? Envíalo a nuestro equipo y te ayudaremos a verificar su veracidad.
          </p>
          <form className="space-y-6 max-w-md mx-auto">
            <div>
              <label htmlFor="factLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Enlace del hecho
              </label>
              <input
                type="url"
                id="factLink"
                required
                className="w-full mt-1 p-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://ejemplo.com/hecho"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors"
            >
              Enviar para Verificación
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              className="hover:underline"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Aprende más sobre verificación
            </a>
            <a
              className="hover:underline"
              href="https://vercel.com/templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ejemplos
            </a>
            <a
              className="hover:underline"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visita Next.js →
            </a>
          </div>
          <p className="text-xs">
            © 2024 Verificado Uy. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
