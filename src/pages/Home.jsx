import React from "react";
import Section from "@/components/common/Section";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import Product from "@/components/product/Product";
const Home = () => {
  return (
    <>
      <Section
        name="seccion 1"
        title="seccion 1"
        subtitle=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat molestiae dolore dolor nam aliquam cumque repellendus necessitatibus maiores minima repellat quam reiciendis facere voluptates sed beatae, et omnis consectetur deserunt."
      >
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
