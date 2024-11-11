"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 dark:bg-gray-900 text-center py-20 px-6">
        <section className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            ¡No te dejes engañar!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            En Verificado Uy te ayudamos a diferenciar entre los hechos reales y la desinformación. 
            Nuestra misión es brindar información verificada y ayudar a la comunidad a mantenerse informada.
          </p>
          <a
            href="/login"
            className="inline-block px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Verificar un hecho ahora
          </a>
        </section>
      </main>

      {/* Recent Verifications */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Verificaciones Recientes</h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <Image
                  src={`/facts_verified_${id}.jpg`}
                  alt={`Verificación hecho ${id}`}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">Verificación: Hecho {id}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Resumen breve sobre el hecho verificado y el resultado: verdadero, falso o engañoso.
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 mt-4 inline-block font-medium hover:underline"
                  >
                    Leer verificación completa →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
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
          <p className="text-sm">© 2024 Verificado Uy. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
