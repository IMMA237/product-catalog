import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
  const { data: products, loading, error } = useFetch('/products.json');

  // Controlled input: React state is the single source of truth (Module 7.1)
  const [query, setQuery] = useState('');

  // Derived during render, NOT stored in extra state (Module 6.4)
  const search = query.trim().toLowerCase();
  const filtered = (products ?? []).filter(
    (p) => p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search)
  );

  return (
    <>
      <h1 className="font-display text-5xl text-brand-dark md:text-6xl">Our Products</h1>

      <label htmlFor="search" className="sr-only">
        Search products
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or category..."
        className="mt-6 w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />

      {loading && <p className="mt-6">Loading products...</p>}

      {error && (
        <p role="alert" className="mt-6 text-red-600">
          Could not load products: {error.message}
        </p>
      )}

      {products && (
        <p className="mt-3 text-sm text-gray-600">
          Showing {filtered.length} of {products.length} products
        </p>
      )}

      {products && filtered.length === 0 && (
        <p className="mt-6 text-brand-dark">No products match "{query}".</p>
      )}

      <section className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}