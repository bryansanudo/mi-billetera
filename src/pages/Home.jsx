import React from "react";
import Section from "@/components/common/Section";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import Product from "@/components/product/Product";
const Home = () => {
  return (
    <>
      <Section>
        <Slider />
      </Section>

      <Section title="Publicaciones">
        <Product />
        <Footer />
      </Section>
    </>
  );
};

export default Home;
