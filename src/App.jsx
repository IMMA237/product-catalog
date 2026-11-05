import { Link, Route, Routes } from 'react-router-dom';
import CartButton from './components/CartButton';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorTestPage from './pages/ErrorTestPage';

function App() {
  return (
    <div className="min-h-screen bg-brand-light">
      <header className="bg-brand-dark">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
          <Link to="/" className="font-display text-3xl text-white">
            CodersHub <span className="text-brand">Store</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white hover:text-brand">
              Products
            </Link>
            <CartButton />
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl p-6 md:p-10">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Only exists while developing (npm run dev), never in a production build */}
          {import.meta.env.DEV && <Route path="/error-test" element={<ErrorTestPage />} />}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;