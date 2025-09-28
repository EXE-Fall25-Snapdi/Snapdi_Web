import React from "react";
import images from "../images"

const AboutIntro: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center md:px-24 pt-12 ">
      {/* Image */}
      <div className="flex justify-center md:w-2/5">
        <div className="w-full flex items-center">
          <img
            src={images.camera}
            alt="Camera"
            className="max-w-xs md:max-w-md lg:max-w-7xl! "
          />
        </div>
      </div>

      {/* Text */}
      <div className="md:w-3/5 space-y-4 flex flex-col items-center md:items-start">
        <div className="md:w-full flex w-11/12">
          <p className="md:text-[40px] text-lg font-sf-pro! text-gray-700">
            Snapdi là nền tảng kết nối người dùng và photographer tại Việt Nam một
            cách nhanh chóng và tiện lợi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
