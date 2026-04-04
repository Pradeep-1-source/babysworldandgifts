"use client";
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; <span>{year}</span> BABY'S WORLD AND GIFTS. All rights reserved.</p>
      </div>
    </footer>
  );
}
