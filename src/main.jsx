import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import NotFound from './components/NotFound.jsx';
// Lazy-loaded components
const App = lazy(() => import('./App.jsx'));
const ProductList = lazy(() => import('./components/ProductList.jsx'));
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'));
const Cart = lazy(() => import('./components/Cart.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      {
        path: '/ProductDetail/:id',
        element: <ProductDetail />,
      },
      {
        path: '/Menu',
        element: <ProductList />,
      },
      {
        path: '/Cart',
        element: <Cart />,
      },
      {
        path :"*",
        element:<NotFound/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
