"use client";
import React, { useState } from 'react';
import { Product } from '../hooks/useStore';

interface ProductsProps {
  categories: string[];
  products: Product[];
}

export default function Products({ categories, products }: ProductsProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  const getPlaceholderImage = (category: string) => {
    let keyword = 'baby,toys';
    if (category === 'Newborn Essentials') keyword = 'newborn,baby';
    if (category === 'Gift Items') keyword = 'gift,box';
    if (category === 'Accessories') keyword = 'baby,care';
    return `https://source.unsplash.com/400x400/?${keyword}`;
  };

  const getProductImage = (img: string, cat: string) => {
    if (img && img !== '') return img;
    return getPlaceholderImage(cat);
  };

  const generateWaLink = (title: string) => {
    const message = `Hi, I'm interested in this product from BABY'S WORLD AND GIFTS: ${title}`;
    return `https://wa.me/919994400124?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <section id="products" className="section products-section">
        <div className="container">
          <h2 className="section-title">Our Collection</h2>

          <div className="category-filters">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                  <div className="product-img-wrapper">
                    <span className="product-category-tag">{product.category}</span>
                    <img
                      src={getProductImage(product.image, product.category)}
                      alt={product.title}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/400x400?text=Baby+Product';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <span className="btn btn-primary btn-enquire-wa" style={{ pointerEvents: 'none' }}>
                      Click to view Details
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-details-content" onClick={e => e.stopPropagation()}>
            <span className="close-details-modal close-modal" onClick={() => setSelectedProduct(null)}>&times;</span>
            <img
              src={getProductImage(selectedProduct.image, selectedProduct.category)}
              alt="Product Image"
              style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '12px', marginBottom: '15px', background: 'var(--bg-light)' }}
            />
            <div style={{ marginBottom: '10px' }}>
              <span className="product-category-tag" style={{ position: 'static', display: 'inline-block' }}>
                {selectedProduct.category}
              </span>
            </div>
            <h2 style={{ marginBottom: '15px', color: 'var(--dark-blue)', fontFamily: 'Outfit' }}>
              {selectedProduct.title}
            </h2>
            <p style={{
              marginBottom: '25px', lineHeight: '1.6', color: 'var(--text-main)', fontSize: '1.1rem',
              padding: '15px', background: 'var(--bg-light)', borderRadius: '8px', textAlign: 'left'
            }}>
              {selectedProduct.description || 'No detailed description available for this product.'}
            </p>
            <a href={generateWaLink(selectedProduct.title)} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
              <i className='bx bxl-whatsapp'></i> Enquire on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
