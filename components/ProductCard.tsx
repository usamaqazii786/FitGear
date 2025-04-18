"use client";

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-lg"  data-aos="flip-right"data-aos-easing="ease-out-cubic"
    data-aos-duration="2000">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
            {product.category}
          </span>
        </div>
        <p className="text-muted-foreground mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">${product.price}</span>
          <Button onClick={handleAddToCart} className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}