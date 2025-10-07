/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // penting untuk GitHub Pages
  images: {
    unoptimized: true, // biar gambar bisa muncul di GitHub Pages
  },
  eslint: {
    ignoreDuringBuilds: true, // lewati error linting saat build
  },
  typescript: {
    ignoreBuildErrors: true, // lewati error TypeScript saat build
  },
  basePath: '/Tipe-Klasifikasi-Karakter-Belajar', // Ganti sesuai nama repo kamu
  assetPrefix: '/Tipe-Klasifikasi-Karakter-Belajar/', // biar semua aset tampil di GitHub Pages
  trailingSlash: true, // 🔥 tambahan penting biar semua halaman bisa diakses (tanpa 404)
}

export default nextConfig
