import { Link } from "react-router-dom";

import HeaderDesktop from "@/components/header/HeaderDesktop";
import HeaderMobile from "@/components/header/HeaderMobile";

import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "@/redux/slice/authSlice";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configFirebase";

const activeLink = ({ isActive }) =>
  isActive
    ? " relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-[2px] after:bg-white"
    : ``;

const Header = () => {
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  return (
    <>
      <header className="bg-black w-full text-white overflow-hidden fixed z-40">
        <div className="w-full h-24 max-w-[1200px] mx-auto p-4 flex justify-between items-center ">
          <div className="text-white w-[20%] text-lg">
            <Link to="/">
              <h2>
                MyMoney<span className="text-primary">App</span>
              </h2>
            </Link>
          </div>

          <nav className="w-[80%] text-lg ">
            {/* desktop */}

            <HeaderDesktop activeLink={activeLink} displayName={displayName} />
            <HeaderMobile activeLink={activeLink} />

            {/* mobile */}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
