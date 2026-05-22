import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import LayoutFooter from '@/components/layout/LayoutFooter';

export const metadata = {
  title: {
    default: 'SneakerVault — Premium Sneaker Store',
    template: '%s | SneakerVault',
  },
  description: 'Discover the latest sneakers from Nike, Adidas, Jordan and more. Premium authenticated kicks with free shipping on orders over $100.',
  keywords: ['sneakers', 'shoes', 'nike', 'adidas', 'jordan', 'new balance', 'limited edition', 'premium sneakers', 'india'],
  authors: [{ name: 'Aditya', url: 'https://github.com/Aditya-dxt' }],
  creator: 'Aditya',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sneakervault.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SneakerVault',
    title: 'SneakerVault — Premium Sneaker Store',
    description: 'Shop the latest sneakers from Nike, Adidas, Jordan, New Balance & more. Authentic kicks, free shipping over $100, and easy returns.',
    images: [
      {
        url: '/images/sneakers/nike-dunk-low.png',
        width: 1200,
        height: 630,
        alt: 'SneakerVault — Premium Sneaker Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SneakerVault — Premium Sneaker Store',
    description: 'Shop the latest sneakers from Nike, Adidas, Jordan, New Balance & more. Authentic kicks, free shipping over $100.',
    images: ['/images/sneakers/nike-dunk-low.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main style={{ flex: 1 }}>
                {children}
              </main>
              <LayoutFooter />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'var(--surface)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    fontSize: '14px',
                  },
                }}
              />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
