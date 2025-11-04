import contact1 from '../../../assets/images/contact1.svg'; // Đường dẫn hình ảnh 1
import contact2 from '../../../assets/images/contact2.svg'; // Đường dẫn hình ảnh 2

// (Nếu bạn dùng thư viện icon, hãy import chúng ở đây)
// ví dụ: import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
// import { FaFacebookF, FaTiktok } from 'react-icons/fa';


// Component Trang Liên Hệ
function Contact() {
  return (
    // Container tổng của trang, nền trắng
    <div className="bg-white w-full min-h-screen text-black overflow-hidden pt-[120px] md:pt-[215px]">
      {/* ===== PHẦN 1: BANNER ĐẦU TRANG ===== */}
      {/* - Sử dụng gradient xanh lá và bo góc lớn ở dưới (`rounded-b-[...])
        - `overflow-hidden` để hình ảnh mascot có thể "tràn" ra ngoài
      */}
      <section className="relative w-full flex items-center overflow-hidden">
        <div className="w-full md:w-10/12 lg:w-8/12 pt-4 sm:pt-6 md:pt-8 bg-gradient-to-r from-[#00EA80] to-[#12C6A3] lg:rounded-b-[6rem] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center p-4 sm:p-6 md:p-8">
            {/* Cột trái: Hình ảnh Mascot 1 */}
            <div className="flex justify-center md:justify-start">
              <img
                src={contact1}
                alt="Snapdi Mascot"
                className="scale-75 sm:scale-90 md:scale-100"
              />
            </div>

            {/* Cột phải: Tiêu đề */}
            <div className="z-10 text-left flex flex-col items-start justify-start">
              <p className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[150px] text-white font-extrabold mb-2 sm:mb-3 md:mb-4">
                LIÊN HỆ
              </p>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                Nếu bạn có bất kỳ thắc mắc nào hãy liên hệ chúng tôi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHẦN 2: FORM LIÊN HỆ ===== */}
      <section className="w-full flex justify-center my-10 sm:my-16 md:my-20 px-4 sm:px-6 md:px-8">
        <div className="w-full md:w-10/12 lg:w-8/12 pt-4 sm:pt-6 md:pt-8">
          {/* Form được chia thành 2 cột trên desktop */}
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">

            {/* Cột trái: Các ô input */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <input
                type="text"
                placeholder="Họ và tên của bạn"
                className="w-full p-3 sm:p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#00E075] text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full p-3 sm:p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#00E075] text-sm sm:text-base"
              />
              <input
                type="tel"
                placeholder="Số điện thoại của bạn"
                className="w-full p-3 sm:p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#00E075] text-sm sm:text-base"
              />
            </div>

            {/* Cột phải: Textarea và Nút Gửi */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <textarea
                placeholder="Nội dung"
                rows={6}
                className="w-full p-3 sm:p-4 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-[#00E075] text-sm sm:text-base"
              ></textarea>

              {/* Căn lề nút gửi sang phải trên desktop */}
              <div className="flex justify-start lg:justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#00EA80] to-[#12C6A3] text-white text-sm sm:text-base md:text-lg font-bold py-2 sm:py-3 px-6 sm:px-8 md:px-10 rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto"
                >
                  GỬI PHẢN HỒI
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ===== PHẦN 3: THÔNG TIN LIÊN HỆ ===== */}
      <section className="pb-10 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="w-full md:w-10/12 lg:w-8/12 mx-auto">

          {/* Đường kẻ ngang */}
          <hr className="border-gray-300" />

          {/* Grid 2 cột cho thông tin và hình ảnh mascot 2 */}
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 md:gap-12 mt-8 md:mt-12">

            {/* Cột trái: Thông tin chi tiết (Địa chỉ, SĐT, Email, Mạng xã hội) */}
            <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-auto">
              <div className="flex items-start">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">
                  THÔNG TIN LIÊN HỆ
                </h2>
              </div>

              {/* Mục Địa chỉ */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="bg-black text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center">
                  {/* SVG Icon Địa chỉ (Placeholder) */}
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-black mb-1">Địa chỉ</h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    Trường Đại học FPT TP.HCM, Đường số D2, Quận 9, Tp. Thủ Đức
                  </p>
                </div>
              </div>

              {/* Mục Số điện thoại */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="bg-black text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center">
                  {/* SVG Icon Điện thoại (Placeholder) */}
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-black mb-1">Số điện thoại</h3>
                  <p className="text-sm sm:text-base text-gray-700">012345678</p>
                </div>
              </div>

              {/* Mục Email */}
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="bg-black text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center">
                  {/* SVG Icon Email (Placeholder) */}
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 10.417l7.997-4.533A2 2 0 0018 4H2a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4.533L2 8.118V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-black mb-1">Email</h3>
                  <p className="text-sm sm:text-base text-gray-700">snapdi.co@gmail.com</p>
                </div>
              </div>

              {/* Mạng xã hội */}
              <div className="flex gap-4 mt-2 sm:mt-4">
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="bg-black text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition-opacity">
                  {/* SVG Icon Facebook (Placeholder) */}
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                {/* TikTok */}
                <a href="#" aria-label="TikTok" className="bg-black text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition-opacity">
                  {/* SVG Icon TikTok (Placeholder) */}
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-1.06-.63-1.9-1.47-2.51-2.5-1.1-1.88-1.3-4.11-.7-6.04.57-1.84 1.88-3.3 3.8-4.04 2.27-.88 4.79-.68 6.77.48v-4.02c-1.57-.45-3.1-.82-4.6-.98-.05 1.79-.38 3.59-1.07 5.29-.01-1.74-.01-3.48-.01-5.23 0-1.66.03-3.32.09-4.97.02-.48.01-.96-.04-1.44z" /></svg>
                </a>
              </div>
            </div>

            {/* Cột phải: Hình ảnh Mascot 2 */}
            <div className="flex items-center lg:items-end justify-center lg:justify-end w-full lg:w-auto">
              <img
                src={contact2}
                alt="Snapdi Mascot with Camera"
                className="scale-75 sm:scale-90 md:scale-100 lg:scale-120"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;