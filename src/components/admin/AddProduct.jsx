import React, { useState } from "react";
import Section from "@/components/common/Section";
import { AiFillFileAdd } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { storage, db } from "@/configFirebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "@/redux/slice/productSlice";
const categories = [
  {
    id: 1,
    name: "categoria1",
  },
  {
    id: 2,
    name: "categoria2",
  },
  {
    id: 3,
    name: "categoria3",
  },
  {
    id: 4,
    name: "categoria4",
  },
];
const initialState = {
  name: "",
  imageURL: "",
  category: "",
  link: "",
  desc: "",
};

const AddProduct = () => {
  const { id } = useParams();

  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `pif/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Imagen Subida Con Exito");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(product);

    try {
      const docRef = addDoc(collection(db, "publications"), {
        name: product.name,
        imageURL: product.imageURL,
        category: product.category,
        link: product.link,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      navigate("/admin/all-products");
      toast.success("Product uploaded sucessfully.");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault;
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "publications", id), {
        name: product.name,
        imageURL: product.imageURL,
        category: product.category,
        link: product.link,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product edited successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Section title={detectForm(id, "Agregar Producto", "Editar Producto")}>
        <form
          onSubmit={detectForm(id, addProduct, editProduct)}
          className="shadow-md shadow-black rounded-xl p-6 w-full max-w-[800px] flex flex-col gap-4 items-center justify-center"
        >
          <label className="w-full text-left">Nombre Del Producto</label>
          <input
            required
            type="text"
            className="input input-primary text-lg input-md w-full"
            name="name"
            value={product.name}
            onChange={(e) => handleInputChange(e)}
          />
          <label className="w-full text-left">Imagen Del Producto</label>
          {uploadProgress === 0 ? null : (
            <div className="bg-[#aaa] border-[1px] border-[solid] rounded-[10px] w-full">
              <div
                className="bg-primary border-[1px] border-[solid] rounded-[10px] text-white text-sm font-semibold py-0 px-[1rem] "
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress < 100
                  ? `Subiendo ${uploadProgress}%`
                  : `Subida Completada ${uploadProgress}%`}
              </div>
            </div>
          )}
          <input
            type="file"
            className="file-input file-input-primary w-full"
            name="image"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          {product.imageURL === "" ? null : (
            <input
              className="file-input file-input-primary w-full"
              type="text"
              //required

              name="imageURL"
              value={product.imageURL}
              disabled
            />
          )}

          <label className="w-full text-left">Categoria Del Producto</label>
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
            className="input input-primary text-lg input-md w-full"
          >
            <option value="" disabled>
              -- Selecciona Categoria Del Producto --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>
          <label className="w-full text-left">Enlace Del Producto</label>
          <input
            required
            type="text"
            className="input input-primary text-lg input-md w-full"
            name="link"
            value={product.link}
            onChange={(e) => handleInputChange(e)}
          />
          <label className="w-full text-left">Descripcion Del Producto</label>
          <textarea
            required
            className="textarea textarea-primary w-full"
            name="desc"
            value={product.desc}
            onChange={(e) => handleInputChange(e)}
          />

          <button type="submit">
            {detectForm(
              id,
              <AiFillFileAdd className="text-primary text-5xl mt-2 hover:scale-150 duration-300" />,
              <FaEdit className="text-primary text-5xl mt-2 hover:scale-150 duration-300" />
            )}
          </button>
        </form>
      </Section>
    </>
  );
};

export default AddProduct;
