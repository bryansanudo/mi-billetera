import React from "react";
import { Link } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { FaUserCircle, FaListOl } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <ul className="menu bg-gray-300 h-full  ">
        <li>
          <Link to="home">
            <FaUserCircle className="text-4xl text-primary" />
            Usuarios
          </Link>
        </li>
        <li>
          <Link to="all-products">
            <FaListOl className="text-4xl text-primary" />
            Publicaciónes
          </Link>
        </li>
        <li>
          <Link to="/admin/add-product/ADD">
            <AiFillFileAdd className="text-4xl text-primary" />
            Agregar
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
