"use client";

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (category === 'all' || product.category === category)
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

    useEffect(() => {
      AOS.init({
        duration: 1200,
      });
    }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <Input
          type="search"
          placeholder="Search products..."
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-4">
          <select
            className="bg-background border rounded-md px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="weights">Weights</option>
            <option value="cardio">Cardio</option>
            <option value="accessories">Accessories</option>
          </select>
          <select
            className="bg-background border rounded-md px-3 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Dumbbells Set",
    description: "Professional grade rubber-coated dumbbells perfect for home workouts",
    price: 299.99,
    category: "weights",
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Smart Treadmill Pro",
    description: "Advanced treadmill with smart features and incline control",
    price: 1499.99,
    category: "cardio",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Olympic Barbell Set",
    description: "Competition-grade Olympic barbell with weight plates",
    price: 799.99,
    category: "weights",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];