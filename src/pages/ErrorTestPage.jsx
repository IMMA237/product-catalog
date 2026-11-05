// Development-only page that throws on purpose to demonstrate the Error Boundary
export default function ErrorTestPage() {
  throw new Error('Test error: this page crashes on purpose');
}