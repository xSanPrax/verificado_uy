"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-extrabold mb-6">Verificado Uy</h1>
          <p className="text-lg md:text-xl font-light">
            Combatiendo la desinformación. Descubre la verdad detrás de las noticias.
          </p>
          <a
            href="/login"
            className="mt-8 inline-block px-10 py-4 bg-white text-green-700 font-bold rounded-lg shadow-lg hover:bg-green-100 transition-transform transform hover:scale-105"
          >
            Verificar ahora
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-20 px-6">
        <section className="max-w-7xl mx-auto space-y-24">
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <Image
                src="/images/diario.png"
                alt="Detección de noticias falsas"
                width={700}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-extrabold text-green-700 mb-6">
                Detecta noticias falsas rápidamente
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Nuestro sistema avanzado te permite verificar noticias en tiempo real, ayudándote a identificar
                desinformación antes de que se propague. Confía en nuestra tecnología para estar siempre informado.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <Image
                src="/images/macaco.png"
                alt="Análisis seguro"
                width={700}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-extrabold text-green-700 mb-6">
                Análisis respaldado por expertos
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Confía en nuestro equipo de especialistas y tecnología avanzada para validar la autenticidad
                de cualquier información. Nos aseguramos de ofrecerte resultados confiables y precisos.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <Image
                src="/images/macaco23.png"
                alt="Resultados claros"
                width={700}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-extrabold text-green-700 mb-6">
                Resultados claros y confiables
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Recibe un informe detallado con resultados transparentes: verdadero, falso o engañoso.
                Nuestra plataforma está diseñada para brindarte información clara y útil.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold">Verificado Uy</h3>
            <p className="text-sm">La verdad importa. Combatimos la desinformación todos los días.</p>
          </div>
          <div className="flex space-x-6">
            <a className="hover:underline" href="/about">Sobre Nosotros</a>
            <a className="hover:underline" href="/contact">Contacto</a>
            <a className="hover:underline" href="/faq">Preguntas Frecuentes</a>
          </div>
        </div>
        <p className="text-center text-sm mt-4">© 2024 Verificado Uy. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
