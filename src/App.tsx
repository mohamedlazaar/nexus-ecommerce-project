import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "../store";

import Header from "..//components/layout/Header";
import Footer from "../components/layout/Footer";
import HomePage from "./Home";
import ProductPage from "./product/[id]";
import CategoryPage from './categories/[category]';
import Cart from './cart';
import CheckoutPage from './checkout';
import About from './about';
import Contact from './contact';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(true); // <- start as loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // <- stop loading after 3s
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className='w-full overflow-x-hidden'>
          {loading ? (
        <div className="flex justify-center items-center w-full h-[100vh]">
          <CircularProgress />
        </div>
      ) : (
        <>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Add more routes as needed */}
          </Routes>
          <Footer />
        </>
      )}
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;