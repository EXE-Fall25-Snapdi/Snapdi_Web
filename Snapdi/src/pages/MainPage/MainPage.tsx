// MainPage.tsx
import SnaperBenefit from "../../components/SnaperBenefit/SnaperBenefit";
import "./MainPage.css";
import mascotPose1 from "../../assets/images/mascot-pose1.png";
import PersonImage from "../../assets/images/snaper-hero.png"; // <-- THAY ĐỔI 1
import BeSnapperCta from "../../components/BeSnaperCTA/BeSnapperCta";
import LearnMore from "../../components/LearnMore/Learnmore";
function MainPage() {
  return (
    <div className="pt-[215px]"> {/* Padding này có thể là cho Navbar cố định, giữ nguyên */}

      {/* --- KHỐI BANNER --- */}
      {/*
        * GIẢI PHÁP:
        * 1. Giữ `relative` để làm gốc định vị cho các con.
        * 2. Thêm một chiều cao CỐ ĐỊNH (ví dụ: `h-[1000px]`).
        * Chiều cao này phải đủ lớn để chứa tất cả nội dung `absolute` bên trong.
        * (Nền trắng của bạn kết thúc ở 980px, nên 1000px là an toàn).
        * 3. Bỏ `z-20` đi. Chúng ta không cần nó nữa vì 2 khối đã
        * nằm trong luồng tài liệu bình thường.
        * 4. Thêm `overflow-hidden` để đảm bảo mascot không tràn ra ngoài.
        */}
      <div className="relative h-[1000px] w-full overflow-x-hidden"> {/* <--- THAY ĐỔI CHÍNH Ở ĐÂY */}

        {/* Các phần tử con `absolute` này giờ sẽ
            được định vị so với cha (relative h-[1100px]) */}

        <div className="absolute top-0 right-0 h-[250px] z-30 w-full bg-gradient-to-r from-[#00EA80] to-[#12C6A3]">
          <span className="text-[180px] flex item-center font-extrabold text-white ml-10">ẢNH ĐẸP</span>
        </div>
        <div className="absolute top-[250px] right-0 h-[30px] w-full bg-[#03624C] z-20" />
        <div className="absolute top-[200px] h-[580px] w-full font-sf-pro font-extrabold uppercase text-[#00C9A7] z-25">
          <h2 className="text-[300px] ml-[34px] text-[#00EA80]">MỌI LÚC</h2>
          <h2 className="text-[300px] text-shadow-black drop-shadow-2xl text-[#00EA80] -mt-44 ml-[310px]">MỌI NƠI</h2>
        </div>

        {/* Nền trắng này kết thúc ở 270 + 710 = 980px */}
        <div className="absolute top-[270px] right-0 h-[710px] w-full bg-white z-10" />

        <img
          src={mascotPose1}
          alt="Snapdi Mascot"
          className="absolute top-0 right-16 z-40 drop-shadow-xl scale-150"
        />

        <div className="absolute top-[870px] z-30 flex items-baseline justify-end pr-8 gap-3 w-full ">
          <span className="text-5xl font-semibold text-gray-900">
            ĐẾN VỚI
          </span>
          <span className="text-6xl font-extrabold bg-gradient-to-r from-[#00C9A7] to-[#00EA80] bg-clip-text text-transparent">
            SNAPDI
          </span>
        </div>
      </div>

      {/* --- KHỐI LỢI ÍCH (BENEFIT) --- */}
      {/*
        * GIẢI PHÁP:
        * 1. Bỏ `relative` và `z-10`.
        * 2. Khối này bây giờ sẽ là một khối bình thường, nằm TRONG LUỒNG (in flow).
        * 3. Nó sẽ tự động được đẩy xuống dưới khối banner
        * vì khối banner giờ đã có chiều cao là `h-[1000px]`.
        */}
      <div className="
        w-full rounded-3xl 
        bg-[linear-gradient(to_bottom,#00EA80_11%,#01E683_43%,#07DB8D_70%,#0FCA9E_95%,#12C6A3_100%)]
        p-8 lg:p-16
      "> {/* <--- NỀN GRADIENT 5 MÀU ĐƯỢC ÁP DỤNG Ở ĐÂY */}
        <div className="w-full pt-20 lg:pt-32 pb-10">
          <BeSnapperCta />
        </div>
        {/* --- KHỐI LỢI ÍCH (BENEFIT) --- */}
        {/* Xóa gradient và padding (vì cha đã có) */}
        <div className="w-full flex justify-center mt-24">
          <div className="flex flex-col w-8/12 lg:flex-row items-center justify-center min-h-screen">
            {/* Cột Mascot (Trái) */}
            <div className="hidden lg:flex w-full lg:w-1/2 items-end justify-end mb-10 lg:mb-0">
              <img
                src={PersonImage}
                alt="Snapper"
                className="scale-250 xl:max-w-lg w-full h-auto "
              />
            </div>
            {/* Cột Nội dung (Phải) */}
            <div className="w-full flex items-center">
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