import React from 'react';

// 1. Import các hình ảnh của bạn
import mascotHoldingCamera from '../../../assets/images/pose2.svg';
import snapdiLogoFull from '../../../assets/images/logo_withLine.svg';
import mascotWaving from '../../../assets/images/pose3.svg';
import aboutUsBanner from '../../../assets/images/AboutUs-banner.svg';
import lightningIcon from '../../../assets/icons/lightning.svg';
import wizard from '../../../assets/icons/mdi_magic.svg';
import eye from '../../../assets/icons/eye.svg';
import heart from '../../../assets/icons/iconoir_heart-solid.svg';

// Icons cho Thẻ Giá Trị (Phần 3)

// 3. Dữ liệu cho các thẻ giá trị (Phần 3)
const valuesItems = [
    {
        icon: eye,
        title: 'Kết Nối Tức Thì',
        style: 'rounded-tl-[70px]',
        description: 'Chỉ một chạm - Kết nối ngay. Hàng ngàn người dùng có nhu cầu và đáp ứng ngay.',
    },
    {
        icon: wizard,
        title: 'Sáng Tạo Không Giới Hạn',
        style: 'rounded-tr-[70px]',
        description: 'Snapdi là sân chơi ảnh toàn diện, biến mọi khoảnh khắc thành tác phẩm và nâng tầm dấu ấn cá nhân.',
    },
    {
        icon: lightningIcon,
        title: 'Linh Hoạt Và Thích Ứng',
        style: 'rounded-bl-[70px]',
        description: 'Linh hoạt mọi địa điểm - Snapdi thích ứng mọi nhu cầu, từ ảnh đơn giản đến mạng lưới nhiếp ảnh gia chuyên.',
    },
    {
        icon: heart,
        title: 'Niềm Tin Và Cộng Đồng',
        style: 'rounded-br-[70px]',
        description: 'Xây dựng dựa trên minh bạch và an toàn. Một cộng đồng đam mê, chia sẻ, kết nối, yêu nhiếp ảnh và đắm chìm.',
    },
];

// 4. Component Trang About Us
const AboutUsPage: React.FC = () => {
    return (
        // Container chính của trang, giả sử có padding top cho Navbar
        <div className="">
            {/* --- PHẦN 1: VỀ SNAPDI --- */}
            <section className="relative w-full min-h-[600px] md:h-[925px]">

                {/* 2. Lớp Nền (Background Layer):
      - `absolute` và `inset-0` (top/left/right/bottom = 0) để lấp đầy cha.
      - Đây là nơi chúng ta áp dụng gradient và `shape-cut-top-right`.
      - `div` này KHÔNG chứa bất kỳ nội dung nào.
    */}
                <div
                    className="absolute inset-0 bg-gradient-to-tr from-[#12C6A3] to-[#00EA80] shape-cut-top-right"
                >
                    {/* Lớp này chỉ dành cho nền và hình dạng cắt */}
                </div>
                <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24 pt-[120px] md:pt-[215px]">

                    {/* Cột Trái: Hình ảnh Mascot */}
                    <div className="w-full md:w-1/3 mb-8 md:mb-0">
                        <div className="w-full h-auto flex items-center justify-center pl-4 md:pl-20">
                            <img
                                src={mascotHoldingCamera}
                                alt="Snapdi Mascot"
                                className="scale-75 sm:scale-100 md:scale-150 lg:scale-180 drop-shadow-2xl"
                            />
                        </div>

                    </div>

                    {/* Cột Phải: Khối văn bản */}
                    <div className="w-full md:w-2/3">
                        {/* Bây giờ, khối văn bản này sẽ KHÔNG bị cắt
              vì nó nằm trong `div` (z-10) riêng biệt với `div` bị cắt.
            */}
                        <div className='w-full max-w-[1000px] md:w-[1000px] min-h-[400px] md:h-[520px] bg-gradient-to-r from-[#00EA80] to-[#12C6A3] p-6 sm:p-12 md:p-24 rounded-[30px] md:rounded-[50px]'>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6">
                                VỀ <span className='font-bold text-white'>SNAPDI</span>
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                                Snapdi được sinh ra từ một ý tưởng đơn giản: gắn kết mọi người
                                lại với nhau. Nhiệm vụ của chúng tôi là cách mạng hóa cách bạn
                                chụp ảnh, biến nó thành một trải nghiệm dễ dàng và thú vị.
                                Chúng tôi tạo ra cầu nối giữa người chụp ảnh và người có
                                nhu cầu, tất cả chỉ trong vài cú nhấp chuột đơn giản.
                                <br /><br />
                                Với Snapdi, bạn có thể đặt lịch chụp ảnh chỉ trong vài phút, bất
                                kể bạn ở đâu hay cần gì. Từ ảnh chân dung, sự kiện hay sản phẩm,
                                đây là cơ hội để biến đam mê thành thu nhập và để mỗi bức
                                ảnh bạn chụp có thêm một câu chuyện.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PHẦN 2: LOGO & TÍNH NĂNG (Block ở giữa) --- */}
            < section className="relative w-full min-h-[800px] md:h-[1440px]" >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#12C6A3] to-[#00EA80] shape-cut-top-left">
                </div>
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 ">
                    <div
                        className="
              relative w-full
              flex items-center justify-center "
                    >
                        <img
                            src={snapdiLogoFull}
                            alt="Snapdi Logo Full"
                            className="w-full z-10"
                        />
                    </div>

                    {/* 2b. Hộp 3 Tính Năng */}
                    <div className="pt-4">
                        <div
                            className="
              relative w-full p-4 sm:p-8 md:p-12
              flex items-center justify-center">
                            <img
                                src={aboutUsBanner}
                                alt="Snapdi Logo Full"
                                className="w-full max-w-full scale-75 sm:scale-100 md:scale-120 z-10"
                            />
                        </div>
                    </div>
                </div>
            </section >

            {/* --- PHẦN 3: GIÁ TRỊ CỐT LÕI --- */}
            < section className="relative w-full min-h-[800px] md:h-[1080px]" >
                <div
                    className="absolute inset-0 bg-gradient-to-tr from-[#12C6A3] to-[#00EA80] shape-cut-top-right2"
                >
                    {/* Lớp này chỉ dành cho nền và hình dạng cắt */}
                </div>
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
                    {/* Cột Trái: Hình ảnh Mascot */}
                    <div className='w-full md:w-10/12 flex flex-col md:flex-row items-center gap-6 md:gap-0'>

                        <div className="flex justify-center md:justify-end w-full md:w-auto">
                            <img
                                src={mascotWaving}
                                alt="Snapdi Mascot Waving"
                                className="scale-75 md:scale-100"
                            />
                        </div>

                        {/* Cột Phải: 4 Thẻ Giá Trị */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-auto">
                            {valuesItems.map((item) => (
                                <div
                                    key={item.title}
                                    /*
                                     THAY ĐỔI:
                                     - Bỏ: bg-white, rounded-3xl, shadow-lg
                                     - Thêm: Gradient, padding lớn hơn (p-8), và class `shape-value-card`
                                    */
                                    className={`w-full max-w-[400px] md:w-[400px] min-h-[300px] md:h-[400px] ${item.style} border-r-4 md:border-r-6 border-b-4 md:border-b-6 drop-shadow-2xl bg-gradient-to-r from-[#00EA80] to-[#5CF621] p-6 sm:p-8 md:p-11 flex flex-col gap-3 md:gap-4`}
                                >
                                    <img src={item.icon} alt={item.title} className="w-[60px] h-[60px] md:w-[90px] md:h-[90px]" />

                                    <h3

                                        className="text-lg sm:text-xl md:text-2xl font-bold mt-4 md:mt-10"
                                    >
                                        {item.title}
                                    </h3>

                                    <p

                                        className="text-sm sm:text-base md:text-lg"
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >
            {/*
  Phần "Call to Action" (Kêu gọi hành động)
  - `py-20 lg:py-32`: Tạo khoảng đệm (padding) lớn ở trên và dưới.
  - `bg-white`: Nền trắng.
*/}
            <section className="bg-white w-full py-20 lg:py-32">

                {/* Container
      - `flex flex-col`: Sắp xếp các mục theo chiều dọc.
      - `items-center`: Căn giữa các mục theo chiều ngang.
      - `gap-6`: Tạo khoảng cách 24px giữa các mục (tiêu đề, phụ đề, nút).
    */}
                <div className="container mx-auto flex flex-col items-center justify-center text-center gap-6">

                    {/* Tiêu đề chính */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-extrabold tracking-tight">
                        {/* Phần chữ màu đen */}
                        <span className="text-black">CÙNG </span>

                        {/* Phần chữ màu xanh lá */}
                        <span className="text-[#00EA80]">SNAPDI</span>
                    </h2>

                    {/* Tiêu đề phụ */}
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                        Tạo Nên Những Khoảnh Khắc Đáng Nhớ
                    </p>

                    <div className="mt-6 md:mt-8">
                        <a
                            href="/signup" // Bạn có thể thay đổi liên kết (link) ở đây
                            className="
                    inline-block
                    bg-[#FFFF00]
                    text-black
                    text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl
                    font-extrabold
                    uppercase
                    px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5
                    rounded-2xl md:rounded-3xl
                    border-4 md:border-6
                    border-[#0A4D3B]
                    shadow-lg
                    transition-transform duration-200 
                    hover:scale-105
                "
                        >
                            Đăng Ký Ngay
                        </a>
                    </div>
                </div>
            </section>

        </div >
    );
};

export default AboutUsPage;