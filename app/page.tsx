"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Products from '../components/Products';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AdminModal from '../components/AdminModal';
import { useStore } from '../hooks/useStore';

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { categories, products, saveCategories, saveProducts, isReady } = useStore();

  if (!isReady) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-light)', color: 'var(--dark-pink)', fontSize: '2rem', fontFamily: 'Outfit' }}>Loading...</div>;
  }

  return (
    <>
      <a href="https://wa.me/919994400124" target="_blank" className="floating-whatsapp" aria-label="Chat on WhatsApp" rel="noreferrer">
          <i className='bx bxl-whatsapp'></i>
      </a>

      <Navbar onAdminClick={() => setIsAdminOpen(true)} />
      
      <Hero />
      <Products categories={categories} products={products} />
      <About />
      <Contact />
      <Footer />

      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        categories={categories}
        products={products}
        saveCategories={saveCategories}
        saveProducts={saveProducts}
      />
    </>
  );
}
