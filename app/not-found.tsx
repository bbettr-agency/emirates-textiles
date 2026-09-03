import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-canvas px-6">
      <div className="text-center">
        <p className="eyebrow">
          <span className="eyebrow-mark" aria-hidden="true" />
          404
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
          This page has come unthreaded.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-2">
          The page you were looking for isn’t here. Let’s get you back to the fabrics.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[48px] items-center rounded-btn bg-navy px-6 font-semibold text-white shadow-cta transition-transform duration-200 ease-emirates hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
