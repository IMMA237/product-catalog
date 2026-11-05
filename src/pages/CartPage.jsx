import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import formatPrice from '../utils/formatPrice';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  // Derived during render, not stored in extra state (Module 6.4)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <h1 className="font-display text-5xl text-brand-dark">Your Cart</h1>
        <p className="mt-4 text-brand-dark">Your cart is empty.</p>
        <Link to="/" className="mt-4 inline-block text-brand underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-5xl text-brand-dark">Your Cart</h1>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
          >
            <span className="text-4xl" aria-hidden="true">
              {item.emoji}
            </span>
            <div className="flex-1">
              <p className="font-display text-2xl text-brand-dark">{item.name}</p>
              <p className="text-sm text-gray-600">
                {formatPrice(item.price)} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold text-brand">{formatPrice(item.price * item.quantity)}</p>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name}`}
              className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xl text-brand-dark">
          Total: <span className="font-semibold text-brand">{formatPrice(total)}</span>
        </p>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-lg bg-brand-dark px-5 py-2 font-semibold text-white hover:opacity-90"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}