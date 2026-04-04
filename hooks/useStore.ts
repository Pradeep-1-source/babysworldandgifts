import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';

export type Product = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  created_at?: string;
};

export function useStore() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isReady, setIsReady] = useState(false);
  const supabase = createClient();

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }
    
    if (data && data.length > 0) {
      setCategories(data.map(c => c.name));
    }
  }, [supabase]);

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      return;
    }
    
    if (data) {
      setProducts(data.map(p => ({
        id: p.id.toString(),
        title: p.title,
        category: p.category,
        image: p.image_url,
        description: p.description
      })));
    }
  }, [supabase]);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchCategories(), fetchProducts()]);
      setIsReady(true);
    };
    loadData();
  }, [fetchCategories, fetchProducts]);

  const saveCategories = async (newCats: string[]) => {
    // This is called from AdminModal when adding/deleting
    // We just refresh categories since AdminModal will handle the DB update
    await fetchCategories();
  };

  const saveProducts = async (newProds: Product[]) => {
    // This is called from AdminModal when adding/deleting
    // We just refresh products since AdminModal will handle the DB update
    await fetchProducts();
  };

  return {
    categories,
    products,
    saveCategories,
    saveProducts,
    isReady,
    refreshCategories: fetchCategories,
    refreshProducts: fetchProducts
  };
}
