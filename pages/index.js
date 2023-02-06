import styles from '../styles/Home.module.css';
import Products from '../components/Products';
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/products');
      const newProducts = await res.json();
      setProducts(newProducts);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }

  if (error) {
    return <div>Failed to load</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className={styles.main}>
        <Products data={products} />
      </main>
    </>
  );
}
