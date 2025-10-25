import React from 'react';
// 1. Import các hình ảnh của bạn
import snapdiLogo from '../../assets/images/logo-withBG.svg';
import appStoreBadge from '../../assets/icons/Appstore.svg';
import googlePlayBadge from '../../assets/icons/googlePlay.svg';

// 2. Import icons
import { BiRegistered, BiEnvelope } from 'react-icons/bi';

/**
 * Component Footer chính cho trang web Snapdi
 */
const Footer: React.FC = () => {
  return (
    // A. Container Chính
    // - `bg-[#00FA9A]`: Mã màu xanh lá mạ siêu sáng (bạn có thể
    //   thay bằng màu gradient 5 màu của mình nếu muốn).
    // - `rounded-t-3xl`: Bo góc lớn ở phía trên.
    // - `text-black`: Màu chữ mặc định là đen.
    <footer className="w-full bg-[#00FA9A] rounded-t-3xl p-12 md:p-16 text-black">
      <div className="container mx-auto flex flex-col items-center gap-16">

        {/* B. Hàng Trên: Logo & Tên Thương Hiệu */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <img
            src={snapdiLogo}
            alt="Snapdi Logo"
            className="h-24 w-24" // Kích thước logo
          />
          <span className="text-8xl lg:text-9xl font-extrabold text-black tracking-tighter">
            SNAPDI
          </span>
        </div>

        {/* C. Hàng Dưới: Links, Copyright, Icons */}
        {/* - `flex-col lg:flex-row`: Xếp chồng trên mobile, xếp ngang trên desktop.
            - `justify-between`: Đẩy các item ra xa nhau.
        */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10">

          {/* C1. Nút Tải Ứng Dụng (Bên trái) */}
          <div className="flex items-center gap-4 order-2 lg:order-1">
            <a href="#" aria-label="Download on the App Store">
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="h-12 lg:h-14"
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="h-12 lg:h-14"
              />
            </a>
          </div>

          {/* C2. Copyright (Ở giữa) */}
          {/* - `order-3`: Đẩy xuống cuối trên mobile.
              - `lg:order-2`: Đưa về giữa trên desktop.
          */}
          <p className="text-base font-medium text-black text-center order-3 lg:order-2">
            &copy; 2025 Snapdi Media. All Rights Reserved.
          </p>

          {/* C3. Icons (Bên phải) */}
          {/* - `order-1`: Đẩy lên đầu trên mobile.
              - `lg:order-3`: Đưa về cuối bên phải trên desktop.
          */}
          <div className="flex items-center gap-5 order-1 lg:order-3">
            <BiRegistered className="text-3xl text-black" />
            <BiEnvelope className="text-3xl text-black" />
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;