import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-6 rounded border border-amber-200 bg-amber-50 text-amber-800">
      <h2 className="text-lg font-semibold">User not found</h2>
      <p className="mt-1 text-sm">The user you’re looking for doesn’t exist or was removed.</p>
      <Link
        href="/"
        className="inline-block mt-4 rounded bg-amber-700 px-3 py-1.5 text-white"
      >
        Back to Users
      </Link>
    </div>
  );
}