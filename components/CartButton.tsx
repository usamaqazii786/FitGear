"use client";

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </Link>
  );
}