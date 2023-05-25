import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "@/components/admin/AddProduct";
import Home from "@/components/admin/Home";
import Navbar from "@/components/admin/Navbar";
import Orders from "@/components/admin/Orders";
import ViewProducts from "@/components/admin/ViewProducts";

const Admin = () => {
  return (
    <>
      <div className="pt-24 md:pt-0 md:grid md:grid-cols-5 h-screen">
        <div className="md:mt-24 bg-red-500 cols-span-1 ">
          <Navbar />
        </div>
        <div className="col-span-4">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="all-products" element={<ViewProducts />} />
            <Route path="add-product/:id" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
