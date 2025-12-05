import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
            </p>
            <Link
                href="/"
                className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
                Go Back Home
            </Link>
        </div>
    );
}
