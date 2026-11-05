// Shown by the Error Boundary instead of a blank white screen
export default function ErrorFallback() {
  return (
    <div role="alert" className="flex min-h-screen items-center justify-center bg-brand-light p-6">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
        <h1 className="font-display text-5xl text-brand-dark">Something went wrong</h1>
        <p className="mt-3 text-gray-700">
          Sorry, an unexpected error happened. Please go back to the catalog and try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.assign('/')}
          className="mt-6 rounded-lg bg-brand px-5 py-2 font-semibold text-white hover:opacity-90"
        >
          Back to catalog
        </button>
      </div>
    </div>
  );
}