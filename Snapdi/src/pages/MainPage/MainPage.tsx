// MainPage.tsx
import SnaperBenefit from "../../components/SnaperBenefit/SnaperBenefit";
import "./MainPage.css";
import mascotPose1 from "../../assets/images/mascot-pose1.png";
import PersonImage from "../../assets/images/snaper-hero.png"; // <-- THAY ĐỔI 1
import BeSnapperCta from "../../components/BeSnaperCTA/BeSnapperCta";
import LearnMore from "../../components/LearnMore/Learnmore";
function MainPage() {
  return (
    <div className="  md:pt-[215px]"> {/* Padding responsive cho Navbar */}
    <div className="h-[60px] md:hidden bg-gradient-to-r from-[#00EA80] to-[#12C6A3]"/>

      {/* --- KHỐI BANNER --- */}
      {/*
        * GIẢI PHÁP:
        * 1. Giữ `relative` để làm gốc định vị cho các con.
        * 2. Thêm một chiều cao RESPONSIVE: min-height trên mobile, fixed trên desktop.
        * Chiều cao này phải đủ lớn để chứa tất cả nội dung `absolute` bên trong.
        * 3. Bỏ `z-20` đi. Chúng ta không cần nó nữa vì 2 khối đã
        * nằm trong luồng tài liệu bình thường.
        * 4. Thêm `overflow-hidden` để đảm bảo mascot không tràn ra ngoài.
        */}
      <div className="relative min-h-[300px] md:h-[1000px] w-full overflow-hidden"> {/* <--- Responsive height */}

        {/* Các phần tử con `absolute` này giờ sẽ
            được định vị so với cha (relative h-[1100px]) */}

        <div className="absolute top-0 right-0 h-[150px] md:h-[250px] z-30 w-full bg-gradient-to-r from-[#00EA80] to-[#12C6A3]">
          <span className="text-[40px] sm:text-[80px] md:text-[120px] lg:text-[180px] flex item-center font-extrabold text-white ml-4 md:ml-10">ẢNH ĐẸP</span>
        </div>
        <div className="absolute top-[150px] md:top-[250px] right-0 h-[20px] md:h-[30px] w-full bg-[#03624C] z-20" />
        <div className="absolute top-[120px] right-0 md:top-[200px] h-[380px] md:h-[580px] w-full font-sf-pro font-extrabold uppercase text-[#00C9A7] z-40 md:z-25">
          <h2 className="text-[60px] sm:text-[120px] md:text-[200px] lg:text-[300px] ml-[8px] md:ml-[34px] text-[#00EA80]">MỌI LÚC</h2>
          <h2 className="text-[60px] sm:text-[120px] md:text-[200px] lg:text-[300px] text-shadow-black drop-shadow-2xl text-[#00EA80] -mt-8 sm:-mt-16 md:-mt-32 lg:-mt-44 ml-[8px] sm:ml-[80px] md:ml-[180px] lg:ml-[310px]">MỌI NƠI</h2>
        </div>

        {/* Nền trắng responsive */}
        <div className="absolute top-[170px] md:top-[270px] right-0 h-[100px] md:h-[710px] w-full bg-white z-10" />

        <img
          src={mascotPose1}
          alt="Snapdi Mascot"
          className="absolute top-0 right-4 md:right-16 z-40 drop-shadow-xl scale-75 md:scale-150"
        />

        <div className="absolute top-[270px] md:top-[870px] z-30 flex items-baseline justify-end pr-4 md:pr-8 gap-2 md:gap-3 w-full">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
            ĐẾN VỚI
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#00C9A7] to-[#00EA80] bg-clip-text text-transparent">
            SNAPDI
          </span>
        </div>
      </div>

      {/* --- KHỐI LỢI ÍCH (BENEFIT) --- */}
      <div className="
        w-full rounded-2xl sm:rounded-3xl
        bg-[linear-gradient(to_bottom,#00EA80_11%,#01E683_43%,#07DB8D_70%,#0FCA9E_95%,#12C6A3_100%)]
        p-4 sm:p-6 md:p-8 lg:p-16
        overflow-x-hidden
      "> {/* <--- NỀN GRADIENT 5 MÀU ĐƯỢC ÁP DỤNG Ở ĐÂY */}
        <div className="w-full pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-32 pb-6 sm:pb-8 md:pb-10">
          <BeSnapperCta />
        </div>
        {/* --- KHỐI LỢI ÍCH (BENEFIT) --- */}
        {/* Xóa gradient và padding (vì cha đã có) */}
        <div className="w-full flex justify-center mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <div className="flex flex-col w-full sm:w-11/12 md:w-10/12 lg:w-8/12 lg:flex-row items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-screen">
            {/* Cột Mascot (Trái) */}
            <div className="hidden lg:flex w-full lg:w-1/2 items-end justify-end mb-10 lg:mb-0">
              <img
                src={PersonImage}
                alt="Snapper"
                className="scale-250 xl:max-w-lg w-full h-auto"
              />
            </div>
            {/* Cột Nội dung (Phải) */}
            <div className="w-full flex items-center px-4 sm:px-6 md:px-0">
              <SnaperBenefit />
            </div>
          </div>
        </div>
      </div> {/* <-- Đóng div cha có nền gradient */}
      <div className="lg:w-10/12 w-full mx-auto py-10">
        <LearnMore />
      </div>

    </div>
  );
}

export default MainPage;