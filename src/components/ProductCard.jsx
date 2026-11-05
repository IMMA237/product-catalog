import formatPrice from '../utils/formatPrice';

export default function ProductCard({ product }) {
  const { name, price, category, emoji, inStock } = product;

  return (
    <article className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-brand-light text-6xl">
        <span aria-hidden="true">{emoji}</span>
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{category}</p>
      <h2 className="font-display text-2xl text-brand-dark">{name}</h2>
      <p className="mt-1 font-semibold text-brand">{formatPrice(price)}</p>
      <p className={`mt-2 text-sm ${inStock ? 'text-green-700' : 'text-red-600'}`}>
        {inStock ? 'In stock' : 'Sold out'}
      </p>
    </article>
  );
}