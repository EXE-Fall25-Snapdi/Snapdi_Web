import React from "react";
import images from "../images"

const AboutFeature: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row-reverse items-center justify-center md:px-24 py-16 ">
      {/* Image */}
      <div className="flex justify-center md:w-2/5">
        <div className="w-full flex items-center">        
          <img
          src={images.map}
          alt="Map"
          className="max-w-xs md:max-w-md lg:max-w-lg"
        />
        </div>
      </div>

      {/* Text */}
      <div className="md:w-3/5 space-y-4 flex flex-col items-center md:items-start">
        <div className="md:w-full flex w-11/12">
          <p className="md:text-[40px] text-lg font-sf-pro! text-gray-700">
            Với tính năng đặt lịch tức thì, bạn có thể dễ dàng tìm, chọn và book
            photographer gần mình trong thời gian thực, hoặc lên lịch trước theo
            nhu cầu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutFeature;
