import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useCartStore from '../store/cartStore';
import formatPrice from '../utils/formatPrice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: products, loading, error } = useFetch('/products.json');

  // Hooks must run on EVERY render, so they go BEFORE any early return (Module 4.1)
  const addItem = useCartStore((state) => state.addItem);
  const quantityInCart = useCartStore(
    (state) => state.items.find((item) => item.id === Number(id))?.quantity ?? 0
  );

  if (loading) return <p>Loading product...</p>;

  if (error) {
    return (
      <p role="alert" className="text-red-600">
        Could not load product: {error.message}
      </p>
    );
  }

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div>
        <h1 className="font-display text-5xl text-brand-dark">Product not found</h1>
        <Link to="/" className="mt-4 inline-block text-brand underline">
          Back to products
        </Link>
      </div>
    );
  }

  const { name, price, category, emoji, inStock, description } = product;

  return (
    <div>
      <Link to="/" className="text-brand underline">
        &larr; Back to products
      </Link>

      <article className="mt-6 grid gap-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-xl bg-brand-light text-9xl">
          <span aria-hidden="true">{emoji}</span>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">{category}</p>
          <h1 className="font-display text-5xl text-brand-dark">{name}</h1>
          <p className="mt-2 text-2xl font-semibold text-brand">{formatPrice(price)}</p>
          <p className={`mt-2 ${inStock ? 'text-green-700' : 'text-red-600'}`}>
            {inStock ? 'In stock' : 'Sold out'}
          </p>
          <p className="mt-4 text-gray-700">{description}</p>

          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={!inStock}
            className="mt-6 rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {inStock ? 'Add to cart' : 'Sold out'}
          </button>

          {/* "> 0" avoids rendering a stray 0 on the page (Module 5.2 pitfall) */}
          {quantityInCart > 0 && (
            <p className="mt-2 text-sm text-green-700">In your cart: {quantityInCart}</p>
          )}
        </div>
      </article>
    </div>
  );
}