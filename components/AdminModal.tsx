"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../hooks/useStore';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  products: Product[];
  saveCategories: (c: string[]) => void;
  saveProducts: (p: Product[]) => void;
}

export default function AdminModal({ isOpen, onClose, categories, products, saveCategories, saveProducts }: AdminModalProps) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'manage-products' | 'manage-categories'>('manage-products');
  
  const [password, setPassword] = useState('');

  // Product Form State
  const [productId, setProductId] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productCat, setProductCat] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [currentImageBase64, setCurrentImageBase64] = useState('');

  // Category Form State
  const [newCatName, setNewCatName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clear states when closing
  useEffect(() => {
    if (!isOpen) {
      setPassword('');
      resetProductForm();
      setNewCatName('');
    }
  }, [isOpen]);

  // Set default category
  useEffect(() => {
    if (!productCat && categories.length > 0) {
      setProductCat(categories[0]);
    }
  }, [categories, productCat]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Baby@2426') {
      setIsAdminLoggedIn(true);
      setPassword('');
    } else {
      alert('Invalid Password!');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  function resetProductForm() {
    setProductId('');
    setProductTitle('');
    setProductCat(categories[0] || '');
    setProductDesc('');
    setCurrentImageBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentImageBase64(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProds = [...products];
    if (productId) {
      const index = newProds.findIndex(p => p.id === productId);
      if (index !== -1) {
        newProds[index].title = productTitle;
        newProds[index].category = productCat;
        newProds[index].description = productDesc;
        if (currentImageBase64 !== '') {
          newProds[index].image = currentImageBase64;
        }
      }
    } else {
      newProds.unshift({
        id: Date.now().toString(),
        title: productTitle,
        category: productCat,
        description: productDesc,
        image: currentImageBase64
      });
    }
    saveProducts(newProds);
    resetProductForm();
    alert('Product saved successfully!');
  };

  const editProduct = (p: Product) => {
    setProductId(p.id);
    setProductTitle(p.title);
    setProductCat(p.category);
    setProductDesc(p.description || '');
    setCurrentImageBase64(''); // Keep empty, we only update if they upload a new one
    setActiveTab('manage-products');
  };

  const deleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  const handleCatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (trimmed !== '') {
      if (!categories.includes(trimmed)) {
        saveCategories([...categories, trimmed]);
        setNewCatName('');
        alert('Category added successfully!');
      } else {
        alert('Category already exists!');
      }
    }
  };

  const deleteCategory = (cat: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${cat}"? Products in this category will still exist but lack a valid filter unless changed.`)) {
      saveCategories(categories.filter(c => c !== cat));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>

        {!isAdminLoggedIn ? (
          <div>
            <h2>Admin Login</h2>
            <form className="admin-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="admin-password">Password</label>
                <input
                  type="password"
                  id="admin-password"
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
            </form>
          </div>
        ) : (
          <div>
            <h2>Admin Dashboard</h2>
            <div className="dashboard-tabs">
              <button
                className={`tab-btn ${activeTab === 'manage-products' ? 'active' : ''}`}
                onClick={() => setActiveTab('manage-products')}
              >
                Products
              </button>
              <button
                className={`tab-btn ${activeTab === 'manage-categories' ? 'active' : ''}`}
                onClick={() => setActiveTab('manage-categories')}
              >
                Categories
              </button>
              <button className="btn btn-outline" style={{ padding: '5px 15px', fontSize: '0.9rem', marginLeft: 'auto' }} onClick={handleLogout}>
                Logout
              </button>
            </div>

            {activeTab === 'manage-products' && (
               <div>
                 <h3 style={{ marginTop: '15px', marginBottom: '15px', color: 'var(--dark-blue)' }}>Add / Edit Product</h3>
                 <form className="admin-form" onSubmit={handleProductSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" required value={productTitle} onChange={e => setProductTitle(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select required value={productCat} onChange={e => setProductCat(e.target.value)}>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea rows={3} required placeholder="Add product details here..." value={productDesc} onChange={e => setProductDesc(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Product Image</label>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />
                        {currentImageBase64 && (
                            <div style={{ marginTop: '10px' }}>
                                <img src={currentImageBase64} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                            </div>
                        )}
                    </div>
                    { productId && (
                        <button type="button" className="btn btn-outline" style={{ width: '100%', margin: '10px 0' }} onClick={resetProductForm}>Cancel Edit</button>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Product</button>
                 </form>

                 <div className="admin-product-list">
                    <h3 style={{ marginBottom: '10px' }}>Current Products</h3>
                    <div className="admin-grid">
                      {products.map(p => (
                         <div key={p.id} className="admin-item">
                           <img src={p.image && p.image !== '' ? p.image : 'https://source.unsplash.com/400x400/?baby,toys'} className="admin-item-img" alt={p.title} />
                           <div className="admin-item-info">
                               <strong>{p.title}</strong><br />
                               <small>{p.category}</small>
                           </div>
                           <div className="admin-item-actions">
                               <button type="button" className="edit-product-btn btn-outline" style={{ padding: '5px', marginRight: '5px' }} onClick={() => editProduct(p)}><i className='bx bx-pencil'></i></button>
                               <button type="button" className="delete-product-btn" onClick={() => deleteProduct(p.id)}><i className='bx bx-trash'></i></button>
                           </div>
                         </div>
                      ))}
                    </div>
                 </div>
               </div>
            )}

            {activeTab === 'manage-categories' && (
                <div>
                   <h3 style={{ marginTop: '15px', marginBottom: '15px', color: 'var(--dark-blue)' }}>Add New Category</h3>
                   <form className="admin-form" onSubmit={handleCatSubmit}>
                      <div className="form-group">
                         <label>Category Name</label>
                         <input type="text" required placeholder="e.g. Party Supplies" value={newCatName} onChange={e => setNewCatName(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Category</button>
                   </form>

                   <div className="admin-product-list">
                      <h3 style={{ marginBottom: '10px' }}>Current Categories</h3>
                      <div className="admin-grid">
                         {categories.map(cat => (
                            <div key={cat} className="admin-item">
                               <div className="admin-item-info" style={{ marginLeft: 0 }}>
                                  <strong>{cat}</strong>
                               </div>
                               <div className="admin-item-actions">
                                  <button type="button" onClick={() => deleteCategory(cat)}><i className='bx bx-trash'></i></button>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
