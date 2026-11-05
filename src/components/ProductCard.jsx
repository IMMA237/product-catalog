import { Link } from 'react-router-dom';
import formatPrice from '../utils/formatPrice';

export default function ProductCard({ product }) {
  const { id, name, price, category, emoji, inStock } = product;

  return (
    <Link
      to={`/products/${id}`}
      className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand"
    >
      <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-brand-light text-6xl">
        <span aria-hidden="true">{emoji}</span>
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{category}</p>
      <h2 className="font-display text-2xl text-brand-dark">{name}</h2>
      <p className="mt-1 font-semibold text-brand">{formatPrice(price)}</p>
      <p className={`mt-2 text-sm ${inStock ? 'text-green-700' : 'text-red-600'}`}>
        {inStock ? 'In stock' : 'Sold out'}
      </p>
    </Link>
  );
}