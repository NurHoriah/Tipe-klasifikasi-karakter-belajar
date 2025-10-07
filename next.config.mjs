/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // penting untuk GitHub Pages
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: '/Tipe-Klasifikasi-Karakter-Belajar', // Ganti sesuai nama repo kamu
  assetPrefix: '/Tipe-Klasifikasi-Karakter-Belajar/', // biar gambar & CSS tampil di GitHub Pages
}

export default nextConfig
