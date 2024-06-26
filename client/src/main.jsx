import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import ProductPage from './components/ProductPage';
import CategoryPage from './components/CategoryPage';
import Homepage from './components/Homepage';
import Layout from './components/Layout';
import Checkout from './components/Checkout';
import Blur from './components/Blur';
import ScrollToTop from './components/ScrollToTop';
import CategoryPageAdmin from './components/CategoryPageAdmin';
import Admin from './components/Admin';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AdminPage from './components/AdminPage';
import ProductPageAdmin from './components/ProductPageAdmin';
import OrderPageAdmin from './components/OrderPageAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import DesignPageAdmin from './components/DesignPageAdmin';

const stripePromise = loadStripe('pk_test_51PPfNkP7UvQT87QE68NIZvrMqWqZleH2fi2zG5y1Sh5sTz24MhhC3ULZitXA6sqdN9e6JpDpsQObBsr26iyH9rhx00Evd4LB0n');

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <ScrollToTop />
        <Blur>
          <Homepage />
        </Blur>
      </Layout>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <Layout>
        <ScrollToTop />
        <Blur>
          <ProductPage />
        </Blur>
      </Layout>
    ),
  },
  {
    path: '/:id',
    element: (
      <Layout>
        <ScrollToTop />
        <Blur>
          <CategoryPage />
        </Blur>
      </Layout>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Layout>
        <ScrollToTop />
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </Layout>
    ),
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/adminpage',
    element: <ProtectedRoute element={<AdminPage />} />,
  },
  {
    path: '/admin/products',
    element: <ProtectedRoute element={<ProductPageAdmin />} />,
  },
  {
    path: '/admin/categories',
    element: <ProtectedRoute element={<CategoryPageAdmin />} />,
  },
  {
    path: '/admin/orders',
    element: <ProtectedRoute element={<OrderPageAdmin />} />,
  },
  {
    path: '/admin/design',
    element: <ProtectedRoute element={<DesignPageAdmin />} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);