import React from "react";
import images from "../images"

const Landing: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row justify-center md:px-20 mt-10 bg-white">
      {/* Image */} 
      <div className="hidden md:flex justify-center md:w-1/2">
        <img
          src={images.hero}
          alt="Snaper"
          className="max-w-full h-auto md:max-w-sm lg:max-w-2xl xl:max-w-4xl"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col lg:items-start lg:mt-10 items-center h-screen lg:h-full justify-center">
        <h1 className="text-6xl! font-bold whitespace-nowrap lg:text-[96px]! font-heavy mb-6 leading-tight">
          Be <span className="text-teal-500">SNAPER</span>
        </h1>
        <p className="text-gray-600 text-2xl">
          Mở rộng cơ hội nghề nghiệp 
        </p>
        <p className="text-gray-600 text-2xl mb-6">
          trong cộng đồng nhiếp ảnh năng động.
        </p>
        <button
          className="bg-gray-700! font-sf-pro! lg:text-[64px]! px-4! py-1! text-orange-500! border-none rounded-2xl! font-heavy whitespace-nowrap text-3xl!"
        >
          ĐĂNG KÝ NGAY
        </button>
      </div>
    </section>
  );
};

export default Landing;
