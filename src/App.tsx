import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "../store";

import Header from "..//components/layout/Header";
import Footer from "../components/layout/Footer";
import HomePage from "./Home";
import ProductPage from "./product/[id]";
import CategoryPage from './categories/[id]';
import Cart from './cart';
import CheckoutPage from './checkout';
import About from './about';
import Contact from './contact';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className='w-full overflow-x-hidden'>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/categories/:id" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Add more routes as needed */}
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;