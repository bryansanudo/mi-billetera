import Header from "@/components/header/Header";

import { Home, Contact, Login, Register } from "@/pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "@/components/AdminOnlyRoute";
import Admin from "@/pages/Admin";
import Incomes from "@/components/Incomes";
import Spends from "@/components/Spends";
import Balance from "@/components/Balance";
import ProductDetails from "@/components/product/ProductDetails";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="bottom-center" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/publication/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/spends" element={<Spends />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/balance" element={<Balance />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
