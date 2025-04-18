"use client";

import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" data-aos="fade-right">About FitGear</h1>
        
        <div className="prose prose-lg">
          <p className="text-lg mb-6" data-aos="fade-left">
            FitGear is your premier destination for high-quality fitness equipment. 
            Founded in 2024, we've been committed to helping people achieve their fitness 
            goals with professional-grade equipment and expert guidance.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4" data-aos="fade-right">Our Mission</h2>
          <p className="mb-6" data-aos="fade-left">
            To provide accessible, professional-grade fitness equipment that empowers 
            people to transform their lives through physical fitness and well-being.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4" data-aos="fade-right">Quality Promise</h2>
          <p className="mb-6" data-aos="fade-left">
            Every piece of equipment we sell undergoes rigorous quality testing to ensure 
            it meets our high standards for durability, safety, and performance.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4" data-aos="fade-right">Expert Support</h2>
          <p className="mb-6" data-aos="fade-left">
            Our team of fitness professionals is always ready to help you choose the 
            right equipment for your needs and provide guidance on proper usage and maintenance.
          </p>
        </div>
      </div>
    </div>
  );
}