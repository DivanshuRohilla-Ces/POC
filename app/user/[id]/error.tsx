'use client'
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {


  return (
    <div className="p-5 rounded border border-red-200 bg-red-50 text-red-700">
      <h2 className="text-lg font-semibold">We’re having server issues</h2>
      <p className="mt-1 text-sm">{error.message || 'Something went wrong while loading this user.'}</p>
      <div className="mt-3 flex gap-3">
        <button onClick={() => reset()} className="rounded bg-red-600 px-3 py-1.5 text-white">
          Try again
        </button>
        <Link href="/" className="rounded border border-red-600 px-3 py-1.5 text-red-600 hover:bg-red-100">
          ← Back
        </Link>
      </div>
    </div>
  );
}
