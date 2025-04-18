import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ShoppingCart, Menu } from 'lucide-react';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import CartButton from '@/components/CartButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FitGear - Premium Fitness Equipment',
  description: 'Shop premium fitness equipment for your home or gym',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold">
                FitGear
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link href="/products" className="hover:text-primary transition-colors">
                  Products
                </Link>
                <Link href="/categories" className="hover:text-primary transition-colors">
                  Categories
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
                <CartButton />
              </div>
            </nav>
          </header>
          <div className="pt-16">
            {children}
          </div>
          <footer className="bg-card mt-20">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About FitGear</h3>
                  <p className="text-muted-foreground">Premium fitness equipment for your home or commercial gym. Quality products, expert support.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
                    <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</Link></li>
                    <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                    <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                  <ul className="space-y-2">
                    <li><Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
                    <li><Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns</Link></li>
                    <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                  <address className="text-muted-foreground not-italic">
                    <p>1234 Fitness Street</p>
                    <p>Workout City, WC 12345</p>
                    <p className="mt-2">Phone: (123) 456-7890</p>
                    <p>Email: info@fitgear.com</p>
                  </address>
                </div>
              </div>
              <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} FitGear. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}