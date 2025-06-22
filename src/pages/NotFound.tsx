
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onAuthClick={handleAuthClick} />
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl font-bold text-emerald-600 mb-4">404</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <div className="space-y-4">
            <Link to="/">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold">
                Return to Home
              </Button>
            </Link>
            <div className="text-sm text-gray-500">
              Lost? <Link to="/help" className="text-emerald-600 hover:text-emerald-700 underline">Visit our Help Center</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
