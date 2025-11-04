import React from 'react';
// 1. IMPORT HÌNH ẢNH MASCOT CỦA BẠN
// Đảm bảo bạn cập nhật đúng đường dẫn và tên file!
import MascotImage from '../../assets/images/mascot_withcamera.svg';

/**
 * Component "Be Snapper" Call-to-Action (CTA).
 * Hiển thị lời kêu gọi đăng ký và hình ảnh mascot.
 */
const BeSnapperCta: React.FC = () => {
  return (
    // A. Container Chính
    // - `relative`: Làm gốc cho vòng tròn trang trí.
    // - `bg-emerald-500`: Nền xanh lá cây (giống khối benefit).
    // - `rounded-3xl`: Bo góc lớn như trong thiết kế.
    // - `overflow-hidden`: Đảm bảo vòng tròn trang trí không tràn ra ngoài.
    <div className="w-full overflow-x-hidden">
      <div className='relative w-full sm:w-11/12 md:w-10/12 mx-auto p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20'>

        {/* B. Vòng Tròn Trang Trí (Phía sau) */}
        {/* Đây là vòng tròn màu xanh lá cây nhạt hơn ở nền */}
        <div className="absolute top-1/4 -right-1/12 opacity-20 w-2/6 h-4/6 bg-radial bg-linear-gradient from-[#D0FB18] to-[#ECFDA4] mask-r-to-white rounded-full z-0 hidden md:block" />

        {/* C. Container Nội Dung (Flexbox) */}
        {/* - `relative z-10`: Nằm trên vòng tròn trang trí.
          - `flex-col lg:flex-row`: Xếp chồng trên di động, cạnh nhau trên desktop.
          */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12">

          {/* Cột 1: Văn bản & Nút Bấm (Bên trái) */}
          <div className="flex-1 flex flex-col items-start sm:items-start text-left w-full lg:w-auto">

            {/* Tiêu đề "BE" */}
            <span className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-2 sm:mb-3 md:mb-4 font-extrabold leading-tight">
              BE
            </span>

            {/* Tiêu đề "SNAPPER" */}
            {/* -mt-12: Margin âm để kéo chữ "SNAPPER" chồng lên chữ "BE" */}
            <span className="text-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-12 leading-tight">
              SNAPPER
            </span>

            {/* Mô tả ngắn */}
            <p className="text-black text-sm sm:text-base md:text-lg lg:text-xl font-semibold mt-4 sm:mt-5 md:mt-6 max-w-md">
              MỞ RỘNG CƠ HỘI NGHỀ NGHIỆP
              TRONG CỘNG ĐỒNG NHIẾP ẢNH NĂNG ĐỘNG.
            </p>

            {/* Nút Đăng Ký Ngay */}
            <a
              className="
            mt-6 sm:mt-8 md:mt-10
            bg-yellow-300 
            text-black
            font-extrabold
            text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
            py-3 sm:py-4 md:py-5
            px-6 sm:px-8 md:px-10 lg:px-12
            rounded-xl sm:rounded-2xl
            border-2 sm:border-[3px] md:border-4 border-black
            shadow-lg
            hover:bg-yellow-400
            transition-all
            duration-200
            ease-in-out
            active:translate-y-1
            w-full sm:w-auto
            text-center
            "
              href="/signup"
            >
              ĐĂNG KÝ NGAY
            </a>
          </div>

          {/* Cột 2: Hình ảnh Mascot (Bên phải) */}
          {/* - `flex-1`: Chiếm không gian còn lại
            - `self-end`: Đẩy mascot xuống dưới 1 chút trên mobile
            - `lg:self-center`: Căn giữa lại trên desktop
        */}
          <div className="flex-1 flex items-center justify-center self-end lg:self-center w-full lg:w-auto">
            <img
              src={MascotImage}
              alt="Snapdi Mascot holding camera"
              className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-md drop-shadow-2xl scale-75 sm:scale-100 md:scale-125 lg:scale-150 xl:scale-200"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default BeSnapperCta;