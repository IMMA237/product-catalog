import useFetch from './hooks/useFetch';
import ProductCard from './components/ProductCard';

function App() {
  const { data: products, loading, error } = useFetch('/products.json');

  return (
    <main className="min-h-screen bg-brand-light p-6 md:p-10">
      <h1 className="font-display text-5xl text-brand-dark md:text-6xl">CodersHub Product Catalog</h1>

      {loading && <p className="mt-6 text-brand-dark">Loading products...</p>}

      {error && (
        <p role="alert" className="mt-6 text-red-600">
          Could not load products: {error.message}
        </p>
      )}

      {products && (
        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            // Stable id as key, never the array index (React PDF, Module 2.2)
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;