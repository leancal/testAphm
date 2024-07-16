import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';

export default function Discontinuous() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchDiscontinuos() {
      try {
        const res = await fetch('/api/discontinuos');
        if (!res.ok) {
          throw new Error('Failed to fetch discontinuos');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching discontinuos:', error);
      }
    }

    fetchDiscontinuos();
  }, []);

  return (
    <section className="discontinuos">
      <div className="title">
        <h1>Discontinuos</h1>
        <h2>Productos que ya no se distribuyen comercialmente</h2>
      </div>
      <div className="wrapper">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            sku={product.sku}
            products={products}  // Pasamos la lista de productos aquí
            showName
            showSku
            showDownload
          />
        ))}
      </div>
    </section>
  );
}
