import React from "react";
import Section from "@/components/common/Section";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const SOCIAL = [
    {
      id: 1,
      link: "https://instagram.com",
      icon: <FaInstagram />,
    },
    {
      id: 2,
      link: "https://wa.me/579999999999 ",
      icon: <FaWhatsapp />,
    },
    {
      id: 3,
      link: "https://www.facebook.com",
      icon: <FaFacebook />,
    },
  ];

  return (
    <>
      <Section
        name="contacto"
        title="Contacto"
        subtitle=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat molestiae dolore dolor nam aliquam cumque repellendus necessitatibus maiores minima repellat quam reiciendis facere voluptates sed beatae, et omnis consectetur deserunt."
      >
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <div className="flex w-full items-center justify-evenly text-3xl">
            {SOCIAL.map(({ id, link, icon }) => (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrerr"
                className="duration-500 hover:scale-150 "
              >
                {icon}
              </a>
            ))}
          </div>

          <div className="p-8 text-left md:w-[500px] w-[300px]">
            <form action="" method="POST">
              <div className="flex flex-col gap-4 w-full ">
                <input
                  type="text"
                  name="name"
                  className="input input-primary"
                  placeholder="Nombre"
                />

                <input
                  type="text"
                  name="phone"
                  className="input input-primary"
                  placeholder="Telefono"
                />

                <input
                  type="text"
                  name="email"
                  className="input input-primary"
                  placeholder="Correo"
                />

                <textarea
                  name="message"
                  rows="4"
                  className="textarea textarea-primary"
                  placeholder="Mensaje"
                />
              </div>

              <div className="flex items-center justify-center">
                <button className="my-8 bg-gradient-to-r from-[#e67c04] to-[#5C24B3] text-white px-6 py-3  rounded-md tracking-wider cursor-pointer hover:scale-105 duration-200 capitalize">
                  Enviar Mensaje
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;
