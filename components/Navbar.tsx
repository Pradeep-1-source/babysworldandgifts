"use client";
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onAdminClick: () => void;
}

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuActive(false);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">
          <img src="/assets/logo.png" alt="Baby's World Logo" className="logo-img"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '';
              target.alt = "Baby's World (No Logo File)";
            }} />
        </a>
        <div className="mobile-menu" id="mobile-menu" onClick={() => setMenuActive(!menuActive)}>
          <i className={menuActive ? 'bx bx-x' : 'bx bx-menu'}></i>
        </div>
        <ul className={`nav-menu ${menuActive ? 'active' : ''}`} id="nav-menu">
          <li><a href="#home" className="nav-link" onClick={closeMenu}>Home</a></li>
          <li><a href="#products" className="nav-link" onClick={closeMenu}>Products</a></li>
          <li><a href="#about" className="nav-link" onClick={closeMenu}>About Us</a></li>
          <li><a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>
          <li>
            <button
                className="nav-link"
                id="admin-trigger"
                onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    onAdminClick();
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
             >
                <i className='bx bx-cog'></i>
             </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
