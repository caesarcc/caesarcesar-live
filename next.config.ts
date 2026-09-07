import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Obrigatório: GitHub Pages não possui servidor Node para otimizar imagens dinamicamente
  },
  trailingSlash: true, // Garante que as rotas gerem pastas com index.html, facilitando navegação direta
};

export default nextConfig;
