import React from "react";
import { Button } from "antd";
import { icons } from "lucide-react";

const LearnMore: React.FC = () => {
  return (
    <section className="text-center min-h-[450px] border-t-1 border-gray-200 flex flex-col justify-center items-center">
      <p className="text-3xl! font-pro-sf! md:text-6xl! mb-6">
        Liên hệ chúng tôi
      </p>
      <p className="text-gray-500 mb-8 max-w-xl mx-auto">
        Trở thành Snapper của Snapdi và mở rộng cơ hội nghề nghiệp trong cộng
        đồng nhiếp ảnh năng động.
      </p>
      <Button
        type="primary"
        className="bg-[#34D399]! text-xl! h-12! w-3/6 lg:w-[600px]! hover:bg-teal-600 border-none rounded-2xl!"
      >
        Tìm hiểu thêm <icons.MoveUpRight className="w-3 h-3 items-center" />
      </Button>
    </section>
  );
};

export default LearnMore;
