"use client";

import { Dumbbell, Heart, Bike } from 'lucide-react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function CategoriesPage() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Product Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group bg-card hover:bg-card/90 rounded-lg p-8 text-center transition-colors"
            data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000"
          >
            <div className="mb-4 flex justify-center">
              {category.icon}
            </div>
            <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
            <p className="text-muted-foreground">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const categories = [
  {
    id: 1,
    name: "Weights & Strength",
    slug: "weights",
    description: "Free weights, weight machines, and strength training equipment",
    icon: <Dumbbell className="w-12 h-12 text-primary" />
  },
  {
    id: 2,
    name: "Cardio Equipment",
    slug: "cardio",
    description: "Treadmills, bikes, ellipticals, and rowing machines",
    icon: <Bike className="w-12 h-12 text-primary" />
  },
  {
    id: 3,
    name: "Accessories",
    slug: "accessories",
    description: "Mats, resistance bands, foam rollers, and more",
    icon: <Heart className="w-12 h-12 text-primary" />
  }
];