import React from "react";
import icons from "../icon";

const benefits = [
  {
    icon: <icons.Cable className="-rotate-45 w-6 h-6" />,
    title: "Thị trường lớn và nhánh chóng",
    desc: "Hàng ngàn người dùng có nhu cầu chụp ảnh chỉ với vài cú click.",
  },
  {
    icon: <icons.Earth className="w-6 h-6" />,
    title: "Linh hoạt công việc",
    desc: "Tự do chọn lịch và địa điểm chụp ảnh phù hợp.",
  },
  {
    icon: <icons.Wallet className="w-6 h-6" />,
    title: "Thu nhập minh bạch",
    desc: "Nhận thanh toán an toàn, rõ ràng sau mỗi phiên chụp.",
  },
  {
    icon: <icons.UserCheck className="w-6 h-6" />,
    title: "Nâng tầm thương hiệu cá nhân",
    desc: "Hồ sơ (portfolio) được hiển thị chuyên nghiệp trên nền tảng.",
  },
  {
    icon: <icons.TrendingUp className="w-6 h-6" />,
    title: "Hỗ trợ & phát triển",
    desc: " Tham gia cộng đồng Snapper, được cập nhật tài nguyên, workshop và ưu đãi đặc biệt.",
  },
];

const SnaperBenefit: React.FC = () => {
  return (
    <section className="flex flex-col">
      <h2 className="lg:text-[64px]! text-4xl flex py-12">
        Đặc quyền khi đăng ký làm Snapper
      </h2>
      <div className="border-1 border-gray-200 mb-20"></div>
      <div className="grid lg:gap-10 md:grid-cols-5 grid-cols-1 col-span-auto">
        {benefits.map((item, idx) => (
          <div key={idx} className="space-y-3 flex flex-col items-center lg:items-start min-h-[200px]">
            {item.icon}
            <h3 className="font-semibold mb-5">{item.title}</h3>
            <p className="flex text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SnaperBenefit;
