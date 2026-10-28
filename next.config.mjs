const OCR_TRACE = [
  './node_modules/pdfjs-dist/legacy/build/**',
  './node_modules/pdfjs-dist/standard_fonts/**',
  './node_modules/tesseract.js/**',
  './node_modules/tesseract.js-core/**',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Loaded from node_modules at runtime (native canvas, OCR worker threads, pdf.js worker).
  serverExternalPackages: ['pdfjs-dist', 'tesseract.js', '@napi-rs/canvas'],
  outputFileTracingIncludes: {
    '/api/analyze': OCR_TRACE,
    '/api/panel/files': OCR_TRACE,
    '/api/cifsat/constancia': ['./assets/cifsat/templates/**'],
    '/api/cifsat/datos-fiscales': ['./assets/cifsat/templates/**', './assets/cifsat/fonts/**'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/panel',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },
}

export default nextConfig
