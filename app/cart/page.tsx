"use client";

import { Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {loadStripe} from '@stripe/stripe-js';

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();
  const shipping = 9.99;
  const total = state.total + shipping;


  // payment integration

  const maskpayment = async() => {
    const stripe = await loadStripe("pk_test_51REYVQPejD47AnpHRSC2uWx6pYx6frQlrfHUQ9fKgzwR2Qwng81ZkI3L9Q9J1Buw2b633R2tU8DYbLZdsazCeN2w003hKhTd6R")
    const body = {
      product : state.items
    }
    const header = {
      "Content-Type":"application/json"
    }
    
    const reponse = await fetch("http://localhost:5001/api/create-checkout-session", {
      method:"POST",
      headers:header,
      body:JSON.stringify(body)
    });

    const session = await reponse.json();
    const result = stripe?.redirectToCheckout({
      sessionId:session.id
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {state.items.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-muted-foreground">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-destructive"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={maskpayment}>Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}