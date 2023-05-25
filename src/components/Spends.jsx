import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configFirebase";
import { useSelector } from "react-redux";
import { selectEmail } from "@/redux/slice/authSlice";
import Section from "@/components/common/Section";
import { MdDeleteForever } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";

const Spends = () => {
  const userEmail = useSelector(selectEmail);
  const [spend, setSpend] = useState({
    id: "",
    titulo: "",
    valor: "",
  });
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setSpend({ ...spend, [e.target.name]: e.target.value, id: +new Date() });
  };

  async function eliminarTarea(idTareaAeliminar) {
    //crear nuevo array de tareas
    const nvoArrayTareas = data.moves.spends.filter(
      (objetoTarea) => objetoTarea.id !== idTareaAeliminar
    );

    console.log(nvoArrayTareas);

    const x = data;
    delete x.moves.spends;
    console.log(x);
    x.moves.spends = nvoArrayTareas;
    console.log(data);

    // actualizar bd

    const docRef = doc(db, "users", userEmail);
    updateDoc(docRef, data);
  }

  const addDb = async (e) => {
    e.preventDefault();

    const x = data.moves.spends;
    x.push(spend);

    await setDoc(doc(db, "users", userEmail), data);
    setSpend({ titulo: "", valor: "" });
  };

  const getData = async () => {
    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getData();
  }, [data]);
  return (
    <>
      <Section title="Mis Gastos">
        <div className="container px-5  mx-auto flex flex-col items-center justify-between">
          <form className="mb-10 flex flex-col md:flex-row items-center gap-2">
            <input
              type="text"
              className="input input-primary input-sm"
              placeholder="Titulo"
              name="titulo"
              onChange={handleChange}
              value={spend.titulo}
            />
            <input
              type="text"
              className="input input-primary input-sm"
              placeholder="Valor"
              name="valor"
              onChange={handleChange}
              value={spend.valor}
            />
            <button className="" onClick={addDb}>
              <AiFillFileAdd className="text-4xl hover:scale-110 duration-300" />
            </button>
          </form>
          {data ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
              {data.moves.spends?.map((r, index) => (
                <div
                  key={index}
                  className="stat shadow-lg shadow-black rounded-xl "
                >
                  <div className="stat-title capitalize ">{r.titulo}</div>
                  <div className="stat-value text-red-500">${r.valor}</div>
                  <button onClick={() => eliminarTarea(r.id)}>
                    <MdDeleteForever className="text-4xl hover:scale-110 duration-300 mx-auto mt-2" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </Section>
    </>
  );
};

export default Spends;
