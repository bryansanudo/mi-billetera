import { Link, NavLink, useNavigate } from "react-router-dom";
import { TbDoorExit } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut } from "firebase/auth";
import { auth } from "@/configFirebase";
import { toast } from "react-toastify";
import { ShowOnLogin, ShowOnLogout } from "@/components/HiddenLink";

import { AdminOnlyLink } from "@/components/AdminOnlyRoute";
import { useState } from "react";

const HeaderMobile = ({ displayName, activeLink }) => {
  const [showMenu, setShowMenu] = useState(false);

  const mostarMenu = () => {
    setShowMenu(!showMenu);
  };

  const redirect = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully.");
        redirect("/");
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  return (
    <>
      <div className="absolute right-6 top-6 md:hidden ">
        {showMenu ? (
          <MdClose className="text-5xl cursor-pointer " onClick={mostarMenu} />
        ) : (
          <HiOutlineMenuAlt3
            className="text-5xl cursor-pointer "
            onClick={mostarMenu}
          />
        )}
      </div>
      <div
        onClick={mostarMenu}
        className={
          showMenu
            ? "z-40 flex flex-col p-3 fixed inset-0 right-1/3 bg-black/40 backdrop-blur-xl gap-20 "
            : "hidden"
        }
      >
        <ul className="flex flex-col gap-4   justify-center">
          <Link to="/">
            <h2>
              Mi<span className="text-primary"> Billetera</span>
            </h2>
          </Link>

          <AdminOnlyLink>
            <li>
              <Link to="admin/home">Admin</Link>
            </li>
          </AdminOnlyLink>

          <li className="hover:text-primaryduration-400">
            <NavLink className={activeLink} to="/">
              Inicio
            </NavLink>
          </li>
          <li className="hover:text-primary  duration-400">
            <NavLink className={activeLink} to="/contact">
              Contacto
            </NavLink>
          </li>
          <ShowOnLogin>
            <li className="hover:text-primary  duration-400">
              <NavLink className={activeLink} to="/spends">
                Gastos
              </NavLink>
            </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li className="hover:text-primary duration-400">
              <NavLink className={activeLink} to="/incomes">
                Ingresos
              </NavLink>
            </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li className="hover:text-primary  duration-400">
              <NavLink className={activeLink} to="/balance">
                Balance
              </NavLink>
            </li>
          </ShowOnLogin>
        </ul>
        <ul className="flex flex-col gap-4  justify-center ">
          <ShowOnLogout>
            <li className="hover:text-primary duration-400">
              <NavLink className={activeLink} to="/login">
                Iniciar Sesion
              </NavLink>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li className="hover:text-primary  duration-400">
              <NavLink className={activeLink} to="/register">
                Registrate
              </NavLink>
            </li>
          </ShowOnLogout>

          <ShowOnLogin>
            <li>
              <div className="flex items-center justify-start gap-1  capitalize">
                Hola,{displayName}
                <FaUserCircle className="text-3xl text-primary" />
              </div>
            </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li className="hover:text-primary  duration-400">
              <NavLink onClick={logout}>
                <div className="flex items-center justify-start gap-1">
                  Salir
                  <TbDoorExit className="text-3xl" />
                </div>
              </NavLink>
            </li>
          </ShowOnLogin>
        </ul>
      </div>
    </>
  );
};

export default HeaderMobile;
