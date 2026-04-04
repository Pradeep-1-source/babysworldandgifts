import { useState, useEffect } from 'react';

export type Product = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
};

const defaultCategories = ['Baby Toys', 'Newborn Essentials', 'Gift Items', 'Accessories'];

const defaultProducts: Product[] = [
    {
        id: '1',
        title: 'Soft Plush Teddy Bear',
        category: 'Baby Toys',
        image: '/assets/teddy_bear.png',
        description: 'A beautiful, extremely soft plush teddy bear. Highly durable and baby safe. Perfect companion for your little one!'
    },
    {
        id: '2',
        title: 'Newborn Cotton Onesie Set',
        category: 'Newborn Essentials',
        image: '',
        description: '100% pure organic cotton onesie set. Breathable fabric keeping your newborn comfortable all day long.'
    },
    {
        id: '3',
        title: 'Wooden Educational Blocks',
        category: 'Baby Toys',
        image: '/assets/wooden_blocks.png',
        description: 'High-quality wooden educational alphabet blocks in aesthetic pastel colors. Great for early learning and safe to chew.'
    },
    {
        id: '4',
        title: 'Premium Baby Shower Gift Basket',
        category: 'Gift Items',
        image: '/assets/gift_basket.png',
        description: 'A stunning, elegant baby shower gift basket filled with the best newborn essentials and beautifully wrapped.'
    },
    {
        id: '5',
        title: 'Baby Feeding Bottle Set',
        category: 'Accessories',
        image: '',
        description: 'Anti-colic high grade feeding bottles. Easy to clean and durable for daily use.'
    },
    {
        id: '6',
        title: 'Musical Cot Mobile',
        category: 'Baby Toys',
        image: '',
        description: 'Soothing musical cot mobile with soft hanging toys to help your baby sleep peacefully.'
    }
];

export function useStore() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const catsStr = localStorage.getItem('babyWorldCategories');
    if (catsStr) {
      setCategories(JSON.parse(catsStr));
    } else {
      localStorage.setItem('babyWorldCategories', JSON.stringify(defaultCategories));
      setCategories(defaultCategories);
    }

    const prodsStr = localStorage.getItem('babyWorldProducts');
    if (prodsStr) {
      // NOTE: Original images started with 'assets/', need to adjust to '/assets/' if they are default strings.
      let parsedProds = JSON.parse(prodsStr);
      parsedProds = parsedProds.map((p: any) => ({
        ...p,
        image: p.image?.startsWith('assets/') ? '/' + p.image : p.image
      }));
      setProducts(parsedProds);
    } else {
      localStorage.setItem('babyWorldProducts', JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    }
    
    setIsReady(true);
  }, []);

  const saveCategories = (newCats: string[]) => {
    localStorage.setItem('babyWorldCategories', JSON.stringify(newCats));
    setCategories(newCats);
  };

  const saveProducts = (newProds: Product[]) => {
    localStorage.setItem('babyWorldProducts', JSON.stringify(newProds));
    setProducts(newProds);
  };

  return {
    categories,
    products,
    saveCategories,
    saveProducts,
    isReady
  };
}
