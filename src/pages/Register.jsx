import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configFirebase";
import { useNavigate } from "react-router-dom";
import Reset from "@/components/Reset";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [reset, setReset] = useState(false);

  const redirect = useNavigate();
  const registrarUsuarioBD = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== cPassword) {
      setIsLoading(false);
      toast.error("Las contraseñas no coiciden");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Usuario Creado exitosamente ");
        redirect("/spents");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section
        className={`flex flex-col w-full gap-8 lg:flex-row pt-28 md:px-20 px-4 ${
          reset ? "hidden" : ""
        }`}
      >
        <div className="flex items-center justify-center lg:w-1/2 ">
          <img src="/register.png" className="w-[300px] lg:w-[600px] " />
        </div>

        <div className="divider lg:divider-horizontal" />

        <div className="flex items-center justify-center lg:w-1/2">
          <div className="flex flex-col gap-4 w-[300px] lg:w-[500px] items-center shadow-lg shadow-gray-500 rounded-xl p-6 ">
            <h1 className="w-full text-center font-bold text-2xl ">
              Registrate
            </h1>
            <input
              type="text"
              placeholder="Correo"
              className="input  input-primary  w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="input input-primary  w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confrima Contraseña"
              className="input input-primary  w-full"
              onChange={(e) => setCPassword(e.target.value)}
            />
            <button
              className="btn btn-secondary capitalize w-full"
              onClick={registrarUsuarioBD}
            >
              Registrate
            </button>
          </div>
        </div>
      </section>
      {reset ? <Reset setReset={setReset} /> : ""}
    </>
  );
};

export default Register;
