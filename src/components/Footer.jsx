import { AiOutlineArrowUp } from "react-icons/ai";

const Footer = () => {
  const useScroll = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 relative">
      <div className=" mx-auto flex flex-col gap-8">
        <div className="flex flex-col ">
          <div className="mb-[50px] h-[2px] bg-white opacity-10" />
          <div className="flex items-center justify-center lg:justify-between flex-wrap gap-4 ">
            <p className="font-bold text-4xl my-8 text-center text-transparent bg-clip-text  bg-gradient-to-r from-[#e67c04] to-[#5C24B3] hover:from-[#5C24B3] hover:to-[#e67c04] transition duration-500 ease-in-out transform   md:text-5xl">
              My Money
            </p>
            <div className="flex items-center justify-center flex-wrap gap-5">
              <button type="button" onClick={useScroll}>
                <AiOutlineArrowUp
                  className="text-gray-400 text-2xl animate-bounce"
                  size={40}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
