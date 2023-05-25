import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "@/configFirebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "@/components/Loader";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "@/redux/slice/productSlice";
import useFetchCollection from "@/customHooks/useFetchCollection";

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("publications");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  /*  useEffect(() => {
    getProducts();
  }, []); */

  /* const getProducts = () => {
    setIsLoading(true);

    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allProducts);
        setProducts(allProducts);
        setIsLoading(false);
        dispatch(
          STORE_PRODUCTS({
            products: allProducts,
          })
        );
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  }; */

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceleded");
      },
      {
        width: "320px",
        borderRadius: "4px",
        titleColor: "orangered",
        okButtonBackground: "orangeRed",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      deleteObject(storageRef);
      toast.success("product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {products.length === 0 ? (
        <p>No product found.</p>
      ) : (
        <table className="w-full md:mt-[90px] text-sm ">
          <thead className="">
            <tr className="h-20">
              <th className="shadow-md shadow-primary rounded-xl">s/n</th>
              <th className="shadow-md shadow-primary rounded-xl">Image</th>
              <th className="shadow-md shadow-primary rounded-xl">Name</th>
              <th className="shadow-md shadow-primary rounded-xl">Category</th>
              <th className="shadow-md shadow-primary rounded-xl">Price</th>
              <th className="shadow-md shadow-primary rounded-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {products.map((product, index) => {
              const { id, name, price, imageURL, category } = product;
              return (
                <tr key={id} className="text-center  border-b-2">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={imageURL}
                      alt={name}
                      className="h-[100px] w-full object-contain pt-4"
                    />
                  </td>
                  <td className="text-center">{name}</td>
                  <td className="text-center">{category}</td>
                  <td className="text-center">{`$${price}`}</td>
                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit className="text-2xl text-green-500" />
                      </Link>
                      <FaTrashAlt
                        onClick={() => confirmDelete(id, imageURL)}
                        className="cursor-pointer text-2xl text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ViewProducts;
