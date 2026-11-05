import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <h1 className="font-display text-5xl text-brand-dark">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-brand underline">
        Go to the catalog
      </Link>
    </div>
  );
}