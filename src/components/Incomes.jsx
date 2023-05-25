import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/configFirebase";
import { useSelector } from "react-redux";
import { selectEmail } from "@/redux/slice/authSlice";
import Section from "@/components/common/Section";
import { MdDeleteForever } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";

const Incomes = () => {
  const userEmail = useSelector(selectEmail);
  const [income, setIncome] = useState({
    id: "",
    titulo: "",
    valor: "",
  });
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value, id: +new Date() });
  };
  async function eliminarTarea(idTareaAeliminar) {
    //crear nuevo array de tareas
    const nvoArrayTareas = data.moves.incomes.filter(
      (objetoTarea) => objetoTarea.id !== idTareaAeliminar
    );

    console.log(nvoArrayTareas);

    const x = data;
    delete x.moves.incomes;
    console.log(x);
    x.moves.incomes = nvoArrayTareas;
    console.log(data);

    // actualizar bd

    const docRef = doc(db, "users", userEmail);
    updateDoc(docRef, data);
  }

  const addDb = async (e) => {
    e.preventDefault();
    const x = data.moves.incomes;
    x.push(income);

    await setDoc(doc(db, "users", userEmail), data);
    setIncome({ titulo: "", valor: "" });
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
  }, []);
  return (
    <>
      <Section title="Mis Ingresos">
        <div className="container px-5  mx-auto flex flex-col items-center justify-between">
          <form className="mb-10 flex flex-col md:flex-row items-center gap-2">
            <input
              type="text"
              className="input input-primary input-sm"
              placeholder="Titulo"
              name="titulo"
              onChange={handleChange}
              value={income.titulo}
            />
            <input
              type="text"
              className="input input-primary input-sm"
              placeholder="Valor"
              name="valor"
              onChange={handleChange}
              value={income.valor}
            />
            <button onClick={addDb}>
              <AiFillFileAdd className="text-4xl hover:scale-110 duration-300" />
            </button>
          </form>
          {data ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
              {data.moves.incomes?.map((r, index) => (
                <div
                  key={index}
                  className="stat shadow-lg shadow-black rounded-xl "
                >
                  <div className="stat-title capitalize ">{r.titulo}</div>
                  <div className="stat-value text-green-500">${r.valor}</div>
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

export default Incomes;
