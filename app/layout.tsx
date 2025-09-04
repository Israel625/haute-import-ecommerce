import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Haute Import - Produtos Exclusivos Importados",
  description: "Descubra produtos exclusivos importados com qualidade premium. Tênis, bolsas e acessórios únicos com frete grátis para todo o Brasil.",
  keywords: "produtos importados, tênis exclusivos, bolsas importadas, acessórios premium, frete grátis",
  authors: [{ name: "Haute Import" }],
  creator: "Haute Import",
  publisher: "Haute Import",
  robots: "index, follow",
  openGraph: {
    title: "Haute Import - Produtos Exclusivos Importados",
    description: "Descubra produtos exclusivos importados com qualidade premium. Frete grátis para todo o Brasil.",
    type: "website",
    locale: "pt_BR",
    siteName: "Haute Import"
  },
  twitter: {
    card: "summary_large_image",
    title: "Haute Import - Produtos Exclusivos Importados",
    description: "Descubra produtos exclusivos importados com qualidade premium."
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://hauteimport.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}