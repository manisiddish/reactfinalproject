import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import NotFound from './components/NotFound.jsx';

// Lazy-loaded components
const App = lazy(() => import('./App.jsx'));
const ProductList = lazy(() => import('./components/ProductList.jsx'));
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'));
const Cart = lazy(() => import('./components/Cart.jsx'));
const SignUp = lazy(() => import('./components/singup.jsx'));
const Login = lazy(() => import('./components/login.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
       { path: '/', element: <ProductList /> },
       { path: '/ProductDetail/:id', element: <ProductDetail /> },
       { path: '/Menu', element: <ProductList /> },
      { path: '/Cart', element: <Cart /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const rootElement = document.getElementById('root');

// ✅ prevent duplicate root creation (especially if using hot module replacement)
if (!rootElement._rootCreated) {
  createRoot(rootElement).render(
    <StrictMode>
      
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
    </StrictMode>
  );
  rootElement._rootCreated = true;
}
