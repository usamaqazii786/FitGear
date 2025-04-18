"use client";

import { useEffect } from "react";
import { ShoppingCart, Dumbbell, Users, Clock } from "lucide-react";
import Link from "next/link";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-50"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" data-aos="fade-right">Transform Your Body, Transform Your Life</h1>
            <p className="text-xl text-gray-200 mb-8" data-aos="fade-left">Premium fitness equipment for your home or gym</p>
            <Link href="/products" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors" data-aos="flip-right" >
              Shop Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg" data-aos="fade-right">
              <Dumbbell className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Equipment</h3>
              <p className="text-muted-foreground">Professional-grade fitness equipment for all your workout needs</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg" data-aos="flip-right">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-muted-foreground">Get guidance from certified fitness professionals</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-lg" data-aos="fade-left">
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and reliable shipping to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" data-aos="flip-left">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-lg" data-aos="flip-right">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const featuredProducts = [
  {
    id: 1,
    name: "Premium Dumbbells Set",
    description: "Professional grade rubber-coated dumbbells perfect for home workouts",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Smart Treadmill Pro",
    description: "Advanced treadmill with smart features and incline control",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Olympic Barbell Set",
    description: "Competition-grade Olympic barbell with weight plates",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];