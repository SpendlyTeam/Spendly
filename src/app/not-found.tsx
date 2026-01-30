import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-content-center gap-6 bg-slate-800 text-white px-6">
      <div className="text-center space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          404
        </p>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="text-slate-300">
          The link might be outdated or the address may have a typo.
        </p>
      </div>
      <Link
        href="/"
        className="mx-auto inline-flex items-center gap-2 rounded-full bg-logoGreen px-5 py-3 text-slate-900 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        Back to home
      </Link>
    </main>
  );
}
