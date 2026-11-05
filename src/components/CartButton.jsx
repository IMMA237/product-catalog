import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

export default function CartButton() {
  // Total number of items, recalculated whenever the cart changes
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <Link
      to="/cart"
      className="rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:opacity-90"
    >
      🛒 Cart ({count})
    </Link>
  );
}