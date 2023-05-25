import React, { useEffect } from "react";
import ProductList from "@/components/product/ProductList";
import ProductFilter from "@/components/product/ProductFilter";
import useFetchCollection from "@/customHooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "@/redux/slice/productSlice";
import { Link } from "react-router-dom";
import { IoMdMore } from "react-icons/io";
import Section from "@/components/common/Section";

const Product = () => {
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
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((publication) => (
          <div
            key={publication.id}
            className="shadow-lg shadow-primary rounded-xl p-4 flex flex-col justify-between items-center gap-4"
          >
            <div className="flex justify-between w-full ">
              <h2 className="text-3xl capitalize ">{publication.name}</h2>
              <Link to={`/publication/${publication.id}`}>
                <IoMdMore className="text-4xl animate-pulse text-primary font-bold" />
              </Link>
            </div>

            <img
              src={publication.imageURL}
              alt=""
              className=" object-contain h-[300px] w-[300px] shadow-md shadow-black  rounded-xl "
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
