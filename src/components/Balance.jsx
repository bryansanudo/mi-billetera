import React, { useEffect, useState } from "react";
import { db } from "@/configFirebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectEmail } from "@/redux/slice/authSlice";
import Section from "@/components/common/Section";

const Balance = () => {
  const [userData, setUserData] = useState({});
  const [userIncomes, setUserIncomes] = useState(0);
  const [userSpends, setUserSpends] = useState(0);
  const [balance, setBalance] = useState(0);
  const [stateBalance, setStateBalance] = useState(true);

  const userEmail = useSelector(selectEmail);
  const fakeData = {
    spends: [],
    incomes: [],
  };
  const buscarDocumentoOCrearDocumento = async (idDocumento) => {
    //crear referencia al documento
    const docRef = doc(db, "users", idDocumento);
    //buscar documento

    const consulta = await getDoc(docRef);
    //revissar si existe
    if (consulta.exists()) {
      //si si existe
      const infoDocu = consulta.data();

      return infoDocu.moves;
    } else {
      //si no existe
      await setDoc(docRef, { moves: { ...fakeData } });
      const consulta = await getDoc(docRef);
      const infoDocu = consulta.data();

      return infoDocu.moves;
    }
  };

  useEffect(() => {
    async function fetch() {
      const response = await buscarDocumentoOCrearDocumento(userEmail);
      setUserData(response);
    }

    fetch();
  }, []);

  const handleBalance = () => {
    let totalIncomes = 0;
    let totalSpends = 0;
    const { incomes, spends } = userData;

    incomes.map((income) => {
      console.log(income);
      totalIncomes = totalIncomes + parseInt(income.valor);
    });
    spends.map((spend) => {
      console.log(spend);
      totalSpends = totalSpends + parseInt(spend.valor);
    });

    if (totalIncomes - totalSpends > 0) {
      setStateBalance(true);
    } else {
      setStateBalance(false);
    }

    setUserIncomes(totalIncomes);
    setUserSpends(totalSpends);
    setBalance(totalIncomes - totalSpends);
  };

  return (
    <>
      <Section title="Balance Actual">
        {/* The button to open modal */}
        <label
          htmlFor="my-modal-3"
          className="btn flex gap-4 mt-40  "
          onClick={handleBalance}
        >
          <img src="/favicon.svg" className="h-10 animate-bounce" />
          <p className="capitalize">Mi Billetera</p>
        </label>

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative shadow-xl shadow-primary ">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <div className="flex flex-col lg:flex-row lg:gap-14 items-center justify-center mb-10 ">
              <p className="py-4 flex flex-col">
                <span className="stat-title">Gastos</span>
                <span className="stat-value">{userSpends}</span>
              </p>
              <p className="py-4 flex flex-col">
                <span className="stat-title">Ingresos</span>
                <span className="stat-value">{userIncomes}</span>
              </p>
            </div>

            {stateBalance ? (
              <>
                <p className="py-4 flex flex-col">
                  <span className="stat-title text-green-500">
                    Balance Actual
                  </span>
                  <span className="stat-value">{balance}</span>
                </p>
              </>
            ) : (
              <>
                <p className="py-4 flex flex-col">
                  <span className="stat-title text-red-500">
                    Balance Actual
                  </span>
                  <span className="stat-value">{balance}</span>
                </p>
              </>
            )}
            <img src="/balance.jpg" alt="" />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Balance;
