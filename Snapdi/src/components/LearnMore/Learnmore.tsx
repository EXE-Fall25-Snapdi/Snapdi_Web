import React from "react";
import { Button } from "antd";
import { icons } from "lucide-react";

const LearnMore: React.FC = () => {
  return (
    <section className="text-center min-h-[450px] border-gray-200 flex flex-col justify-center items-center">
      <p className="text-3xl! font-pro-sf! md:text-8xl! mb-6 text-[#03624C]">
        Liên Hệ <span className="text-[#00EA80]">Chúng Tôi</span>
      </p>
      <p className="mb-8 max-w-2xl mx-auto text-[27px]">
        Trở thành Snapper của Snapdi và mở rộng cơ hội nghề nghiệp trong cộng
        đồng nhiếp ảnh năng động.
      </p>
      <Button
        type="primary"
        className="bg-linear-to-r! from-[#00EA80] to-[#12C6A3] text-3xl! py-8! font-black  w-3/6 lg:w-[600px]! hover:scale-105 border-none rounded-3xl!"
      >
        Tìm hiểu thêm <icons.MoveUpRight className="w-8 h-8 font-black! items-center" />
      </Button>
    </section>
  );
};

export default LearnMore;
