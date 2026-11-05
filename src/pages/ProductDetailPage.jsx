import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import formatPrice from '../utils/formatPrice';

export default function ProductDetailPage() {
  // Reads :id from the URL, e.g. /products/2 -> "2" (Module 9.1)
  const { id } = useParams();

  // Same fetch logic as the list page, reused through the custom hook
  const { data: products, loading, error } = useFetch('/products.json');

  if (loading) return <p>Loading product...</p>;

  if (error) {
    return (
      <p role="alert" className="text-red-600">
        Could not load product: {error.message}
      </p>
    );
  }

  // URL params are strings, product ids are numbers
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
        </div>
      </article>
    </div>
  );
}