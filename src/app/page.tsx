import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="bg-green-700 text-white py-8 shadow-lg text-center">
        <h1 className="text-4xl font-bold">Verificado Uy</h1>
        <p className="text-lg mt-2">Desenmascarando la desinformación y verificando la verdad</p>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-6 space-y-12">
        {/* Intro Section */}
        <section className="text-center mt-8">
          <h2 className="text-3xl font-semibold">¡No te dejes engañar!</h2>
          <p className="mt-4 text-lg">
            En Verificado Uy te ayudamos a diferenciar entre las noticias reales y los bulos. Nuestra misión es brindar información verificada y ayudar a la comunidad a mantenerse informada.
          </p>
          <a
            href="#verify-now"
            className="inline-block mt-6 px-8 py-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors"
          >
            Verificar una noticia ahora
          </a>
        </section>

        {/* Recent Verifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">Verificaciones Recientes</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <Image
                  src={`/news_verified_${id}.jpg`}
                  alt={`Verificación noticia ${id}`}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">
                    Verificación: Noticia {id}
                  </h3>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                    Un breve resumen de la noticia verificada y el resultado: verdadera, falsa o engañosa. Haz clic para más detalles.
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 text-sm mt-4 inline-block hover:underline"
                  >
                    Leer verificación completa →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit News for Verification */}
        <section id="verify-now" className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Envía una Noticia para Verificación</h2>
          <p className="mb-6 text-lg">
            ¿Tienes dudas sobre una noticia? Envíala a nuestro equipo y te ayudaremos a verificar su veracidad.
          </p>
          <form className="space-y-4 max-w-md mx-auto">
            <div>
              <label htmlFor="newsLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Enlace de la noticia
              </label>
              <input
                type="url"
                id="newsLink"
                required
                className="w-full mt-1 p-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://ejemplo.com/noticia"
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
      <footer className="bg-green-700 text-white py-6 mt-12 text-center">
        <div className="flex justify-center gap-6 mb-4">
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
      </footer>
    </div>
  );
}
