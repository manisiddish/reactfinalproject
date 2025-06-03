import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center text-center bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-800 mb-4">Oops! Page not found</p>
      <p className="text-gray-600 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
