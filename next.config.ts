// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, // Activar modo estricto de React para detectar posibles problemas
  // swcMinify: true, // Habilitar la minificación usando SWC para mejorar el rendimiento y seguridad

  // // Configuración de Encabezados de Seguridad
  // async headers() {
  //   return [
  //     {
  //       // Aplicar a todas las rutas
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           // Content Security Policy (CSP) para prevenir ataques de XSS y otros
  //           key: "Content-Security-Policy",
  //           value: `
  //             default-src 'self' http://localhost:8080;
  //             script-src 'self' 'unsafe-inline' 'unsafe-eval';
  //             style-src 'self' 'unsafe-inline';
  //             img-src 'self' data:;
  //             connect-src 'self';
  //             font-src 'self';
  //             object-src 'none';
  //             frame-ancestors 'none';
  //             base-uri 'self';
  //             form-action 'self';
  //           `.replace(/\s{2,}/g, ' ').trim(),
  //         },
  //         {
  //           // Strict-Transport-Security (HSTS) para forzar HTTPS
  //           key: "Strict-Transport-Security",
  //           value: "max-age=63072000; includeSubDomains; preload",
  //         },
  //         {
  //           // Evitar que el navegador infiera el tipo MIME
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           // Previene que la página sea embebida en frames/iframes
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //         {
  //           // Protección contra Cross-Site Scripting (XSS) en navegadores antiguos
  //           key: "X-XSS-Protection",
  //           value: "1; mode=block",
  //         },
  //         {
  //           // Política de Referencia para controlar la información enviada en encabezados Referer
  //           key: "Referrer-Policy",
  //           value: "no-referrer",
  //         },
  //         {
  //           // Enable Cross-Origin Opener Policy
  //           key: "Cross-Origin-Opener-Policy",
  //           value: "same-origin",
  //         },
  //         {
  //           // Enable Cross-Origin Embedder Policy
  //           key: "Cross-Origin-Embedder-Policy",
  //           value: "require-corp",
  //         },
  //         {
  //           // Permitir solo contenido seguro en las solicitudes de medios
  //           key: "Permissions-Policy",
  //           value: "geolocation=(), microphone=(), camera=(), fullscreen=(self)",
  //         },
  //       ],
  //     },
  //   ];
  // },

  // // Configuración de Optimización de Imágenes
  // images: {
  //   domains: ["localhost"], // Añade aquí los dominios desde los cuales se cargarán imágenes externas
  //   formats: ["image/avif", "image/webp"], // Soporte para formatos de imagen modernos
  // },


  // // i18n: {
  // //   locales: ["en", "es"], 
  // //   defaultLocale: "es",
  // // },

  
};

module.exports = nextConfig;
