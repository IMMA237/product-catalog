import { Link, Route, Routes } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="min-h-screen bg-brand-light">
      <header className="bg-brand-dark">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link to="/" className="font-display text-3xl text-white">
            CodersHub <span className="text-brand">Store</span>
          </Link>
          <Link to="/" className="text-white hover:text-brand">
            Products
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl p-6 md:p-10">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;