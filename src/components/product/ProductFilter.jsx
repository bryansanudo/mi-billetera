import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";

const ProductFilter = () => {
  return (
    <>
      <ul className="menu bg-gray-300 h-full  ">
        <li>
          <Link to="home">
            <FaFacebook className="text-4xl text-primary" />
            Inicio
          </Link>
        </li>
        <li>
          <Link to="all-products">
            <FaFacebook className="text-4xl text-primary" />
            Productos
          </Link>
        </li>
        <li>
          <Link to="/admin/add-product/ADD">
            <FaFacebook className="text-4xl text-primary" />
            Agregar
          </Link>
        </li>
        <li>
          <Link to="orders">
            <FaFacebook className="text-4xl text-primary" />
            Pedidos
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ProductFilter;
