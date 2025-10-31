import React from 'react';
// Import các icons từ thư viện react-icons/bi (BoxIcons)
import {
  BiWorld,
  BiLinkAlt,
  BiCreditCard,
  BiTrendingUp,
} from 'react-icons/bi';
// Import icon cho thẻ số 4 (Nâng tầm thương hiệu)
import { BiUserVoice } from 'react-icons/bi';

// 1. Định nghĩa kiểu dữ liệu (Không đổi)
interface BenefitItem {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

// 2. Mảng dữ liệu (Cập nhật icons để khớp hình ảnh)
const benefitItems: BenefitItem[] = [
  {
    id: 1,
    icon: BiWorld, // Thị trường
    title: 'THỊ TRƯỜNG LỚN VÀ NHANH CHÓNG', // Tên trong code cũ
    description: 'Hàng ngàn người dùng có nhu cầu chụp ảnh chỉ với vài cú click.',
  },
  {
    id: 2,
    icon: BiLinkAlt, // Linh hoạt
    title: 'LINH HOẠT CÔNG VIỆC',
    description: 'Hàng ngàn người dùng có nhu cầu chụp ảnh chỉ với vài cú click.',
  },
  {
    id: 3,
    icon: BiCreditCard, // Thu nhập
    title: 'THU NHẬP MINH BẠCH',
    description: 'Hàng ngàn người dùng có nhu cầu chụp ảnh chỉ với vài cú click.',
  },
  {
    id: 4,
    icon: BiUserVoice, // Nâng tầm thương hiệu (icon người nói)
    title: 'NÂNG TẦM THƯƠNG HIỆU CÁ NHÂN',
    description: 'Hàng ngàn người dùng có nhu cầu chụp ảnh chỉ với vài cú click.',
  },
  {
    id: 5,
    icon: BiTrendingUp, // Hỗ trợ & phát triển (icon biểu đồ)
    title: 'HỖ TRỢ & PHÁT TRIỂN',
    description: 'Hàng ngàn người dùng có nhu cầu chụp ảnh chỉ với vài cú click.',
  },
];

// 3. Component con BenefitCard (Tách riêng để code sạch)
const BenefitCard: React.FC<{ item: BenefitItem }> = ({ item }) => {
  return (
    <div
      key={item.id}
      className="bg-white rounded-4xl p-6 flex flex-col gap-3 shadow-soft-green-edge h-full border-r-6 border-b-6"
    >
      {/* Icon */}
      <item.icon className="text-4xl text-black" /> {/* Đổi màu icon thành đen */}

      {/* Tiêu đề thẻ */}
      <h3 className="font-bold text-lg uppercase text-[#00C9A7]"> {/* Đổi màu tiêu đề */}
        {item.title}
      </h3>

      {/* Mô tả thẻ */}
      <p className="text-sm text-gray-600">
        {item.description}
      </p>
    </div>
  );
};

/**
 * Component hiển thị các đặc quyền khi đăng ký Snapper.
 * ĐÃ CẬP NHẬT: Sử dụng MỘT lưới 3 cột để đảm bảo các thẻ bằng nhau.
 */
const SnaperBenefit: React.FC = () => {
  return (
    <div className="w-full">
      {/* 4. Tiêu đề chính (Không đổi) */}
      <div className='w-full flex justify-end'>
        <p className=" text-5xl font-extrabold uppercase mb-8 leading-snug ">
          Đặc quyền khi
          <br />
          đăng ký snapper
        </p>
      </div>

      {/* 5. GIẢI PHÁP MỚI: Dùng MỘT lưới 3 cột
        - `md:grid-cols-3`: Áp dụng lưới 3 cột trên desktop.
        - Điều này đảm bảo CẢ 5 THẺ đều có chiều rộng bằng nhau (1/3 container).
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="hidden md:block"></div>
        {/* HÀNG 1 - Thẻ 1 */}
        <BenefitCard item={benefitItems[0]} />

        {/* HÀNG 1 - Thẻ 2 */}
        <BenefitCard item={benefitItems[1]} />

        {/* THẺ GIỮ CHỖ (PLACEHOLDER):
          - Thẻ này sẽ nằm ở cột 3, hàng 1.
          - Nó sẽ `ẩn` (`hidden`) trên mobile.
          - Trên desktop (`md:block`), nó sẽ hiện ra, đẩy 3 thẻ
            còn lại xuống hàng 2 một cách hoàn hảo.
        */}

        {/* HÀNG 2 - Thẻ 3 */}
        <BenefitCard item={benefitItems[2]} />

        {/* HÀNG 2 - Thẻ 4 */}
        <BenefitCard item={benefitItems[3]} />

        {/* HÀNG 2 - Thẻ 5 */}
        <BenefitCard item={benefitItems[4]} />

      </div>
    </div>
  );
};

export default SnaperBenefit;