import { Link, NavLink } from "react-router-dom";
import { TbDoorExit } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "@/configFirebase";
import { toast } from "react-toastify";
import { ShowOnLogin, ShowOnLogout } from "@/components/HiddenLink";
import AdminOnlyRoute from "@/components/AdminOnlyRoute";
import { AdminOnlyLink } from "@/components/AdminOnlyRoute";

const HeaderDesktop = ({ activeLink, displayName }) => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully.");
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  return (
    <>
      <div className="hidden md:flex justify-between mx- gap-8">
        <ul className="flex gap-6  items-center justify-center">
          <AdminOnlyLink>
            <li>
              <Link to="admin/home">Admin</Link>
            </li>
          </AdminOnlyLink>

          <li className="hover:text-primary hover:scale-105 duration-400">
            <NavLink className={activeLink} to="/">
              Inicio
            </NavLink>
          </li>
          <li className="hover:text-primary hover:scale-105 duration-400">
            <NavLink className={activeLink} to="/contact">
              Contacto
            </NavLink>
          </li>
          <ShowOnLogin>
            <li className="hover:text-primary hover:scale-105 duration-400">
              <NavLink className={activeLink} to="/spends">
                Gastos
              </NavLink>
            </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li className="hover:text-primary hover:scale-105 duration-400">
              <NavLink className={activeLink} to="/incomes">
                Ingresos
              </NavLink>
            </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li className="hover:text-primary hover:scale-105 duration-400">
              <NavLink className={activeLink} to="/balance">
                Balance
              </NavLink>
            </li>
          </ShowOnLogin>
        </ul>
        <ul className="flex gap-6 items-center justify-center">
          <ShowOnLogout>
            <li className="hover:text-primary hover:scale-105 duration-400">
              <NavLink className={activeLink} to="/login">
                Iniciar Sesion
              </NavLink>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li className="hover:text-primary hover:scale-105 duration-400">
              <NavLink className={activeLink} to="/register">
                Registrate
              </NavLink>
            </li>
          </ShowOnLogout>

          <ShowOnLogin>
            <li>
              <div className="flex items-center justify-center gap-1  capitalize">
                Hola,{displayName}
                <FaUserCircle className="text-3xl text-primary" />
              </div>
            </li>
          </ShowOnLogin>
          <ShowOnLogin>
            <li className="hover:text-primary hover:scale-105 duration-400">
              <NavLink onClick={logout}>
                <div className="flex items-center justify-center gap-1">
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

export default HeaderDesktop;
