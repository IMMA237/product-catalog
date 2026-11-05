import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from '../App';
import ErrorFallback from '../components/ErrorFallback';
import useCartStore from '../store/cartStore';

// Fake data so tests don't depend on the real products.json file
const mockProducts = [
  { id: 1, name: 'CodersHub T-Shirt', price: 5000, category: 'Clothing', emoji: '👕', inStock: true, description: 'Soft cotton.' },
  { id: 2, name: 'Developer Sneakers', price: 25000, category: 'Shoes', emoji: '👟', inStock: true, description: 'Comfortable.' },
  { id: 3, name: 'Laptop Backpack', price: 18000, category: 'Accessories', emoji: '🎒', inStock: false, description: 'Water-resistant.' },
];

// Replace the browser's fetch() with a fake that returns our mock data
function mockFetchSuccess() {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(mockProducts) }))
  );
}

// Render the whole app at a given URL (MemoryRouter = router for tests)
function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  useCartStore.setState({ items: [] }); // start every test with an empty cart
  mockFetchSuccess();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Product list (useFetch + controlled search)', () => {
  it('shows a loading message, then the products', async () => {
    renderAt('/');
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
    expect(await screen.findByText('Developer Sneakers')).toBeInTheDocument();
    expect(screen.getByText('Showing 3 of 3 products')).toBeInTheDocument();
  });

  it('filters products as the user types in the search box', async () => {
    const user = userEvent.setup();
    renderAt('/');
    await screen.findByText('Developer Sneakers');

    await user.type(screen.getByLabelText('Search products'), 'shoe');

    expect(screen.getByText('Showing 1 of 3 products')).toBeInTheDocument();
    expect(screen.queryByText('CodersHub T-Shirt')).not.toBeInTheDocument();
  });

  it('shows an error message when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) }))
    );
    renderAt('/');
    expect(await screen.findByRole('alert')).toHaveTextContent('Request failed with status 500');
  });
});

describe('Product detail page and Zustand cart', () => {
  it('adds a product to the cart and removes it again', async () => {
    const user = userEvent.setup();
    renderAt('/products/2');

    expect(await screen.findByRole('heading', { name: 'Developer Sneakers' })).toBeInTheDocument();

    const addButton = screen.getByRole('button', { name: 'Add to cart' });
    await user.click(addButton);
    await user.click(addButton);

    expect(screen.getByText('In your cart: 2')).toBeInTheDocument();

    // The header button reads the SAME global store
    await user.click(screen.getByRole('link', { name: /cart \(2\)/i }));
    expect(screen.getByText(/× 2/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Remove Developer Sneakers' }));
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('clears the whole cart', async () => {
    const user = userEvent.setup();
    useCartStore.setState({
      items: [{ id: 1, name: 'CodersHub T-Shirt', price: 5000, emoji: '👕', quantity: 3 }],
    });
    renderAt('/cart');

    expect(screen.getByRole('link', { name: /cart \(3\)/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Clear cart' }));

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cart \(0\)/i })).toBeInTheDocument();
  });

  it('disables the button for a sold-out product', async () => {
    renderAt('/products/3');
    expect(await screen.findByRole('button', { name: 'Sold out' })).toBeDisabled();
  });
});

describe('Routing and error handling', () => {
  it('shows a not-found page for unknown URLs', () => {
    renderAt('/abc');
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });

  it('shows the Error Boundary fallback instead of a blank page', () => {
    // Hide the expected error logs so the test output stays readable
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <MemoryRouter initialEntries={['/error-test']}>
          <App />
        </MemoryRouter>
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
  });
});