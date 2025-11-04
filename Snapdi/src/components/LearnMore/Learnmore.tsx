import React from "react";
import { Button } from "antd";
import { icons } from "lucide-react";

const LearnMore: React.FC = () => {
  return (
    <section className="text-center min-h-[300px] sm:min-h-[400px] md:min-h-[450px] border-gray-200 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
      <p className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-pro-sf mb-4 sm:mb-5 md:mb-6 text-[#03624C]">
        Liên Hệ <span className="text-[#00EA80]">Chúng Tôi</span>
      </p>
      <p className="mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl xl:text-[27px]">
        Trở thành Snapper của Snapdi và mở rộng cơ hội nghề nghiệp trong cộng
        đồng nhiếp ảnh năng động.
      </p>
      <Button
        type="primary"
        className="bg-gradient-to-r from-[#00EA80] to-[#12C6A3] text-sm sm:text-base md:text-lg lg:text-xl xl:text-3xl py-3 sm:py-4 md:py-6 lg:py-8 font-black w-full sm:w-4/6 md:w-3/6 lg:w-[600px] hover:scale-105 border-none rounded-2xl sm:rounded-3xl"
      >
        Tìm hiểu thêm <icons.MoveUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 font-black items-center inline-block ml-2" />
      </Button>
    </section>
  );
};

export default LearnMore;
