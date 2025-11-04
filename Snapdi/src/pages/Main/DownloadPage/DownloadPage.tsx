import React, { useState } from 'react';
import { Download, AlertCircle, Calendar, CreditCard, Eye, MessageCircle } from 'lucide-react';
import './DownloadPage.css';
import mascotPhone from '../../../assets/images/pose2.svg';
import appStoreBadge from '../../../assets/icons/Appstore.svg';
import googlePlayBadge from '../../../assets/icons/googlePlay.svg';
import { getDownloadUrl } from '../../../config/downloadConfig';

const DownloadPage: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const downloadUrl = getDownloadUrl();

  const handleDownload = () => {
    setDownloading(true);

    // Simulate download process
    setTimeout(() => {
      setDownloading(false);
      // Trigger actual download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'snapdi-app.apk';
      link.target = '_blank'; // Mở tab mới nếu là external URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <div className="w-full bg-white pt-[215px]">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#12C6A3] to-[#00EA80]"></div>

        <div className="relative z-10 w-full h-full flex items-center justify-center p-8 md:p-16 lg:p-24">
          <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

            {/* Left: Mascot */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <img
                src={mascotPhone}
                alt="Snapdi Mascot"
                className="scale-150 lg:scale-180 drop-shadow-2xl"
              />
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gradient-to-r from-[#00EA80] to-[#12C6A3] p-12 lg:p-16 rounded-[50px] shadow-2xl">
                <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 font-sf-pro">
                  TẢI <span className="text-white">SNAPDI</span>
                </h1>
                <p className="text-xl lg:text-2xl leading-relaxed mb-8 font-sf-pro">
                  Trải nghiệm dịch vụ chụp ảnh chuyên nghiệp ngay trên điện thoại của bạn.
                  Đặt lịch dễ dàng, thanh toán an toàn, kết nối photographer mọi lúc mọi nơi.
                </p>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="inline-flex items-center justify-center gap-3 bg-white text-black font-sf-pro font-bold text-lg px-8 py-4 rounded-3xl shadow-lg hover:scale-105 transition-transform duration-200 border-4 border-[#0A4D3B] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download size={24} />
                    {downloading ? 'Đang tải...' : 'Tải APK (Android)'}
                  </button>
                </div>

                {/* Store Badges */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="relative">
                    <a href="#" className="hover:scale-105 transition-transform block opacity-50 cursor-not-allowed">
                      <img src={appStoreBadge} alt="App Store" className="h-12" />
                    </a>
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-black">
                      Coming Soon
                    </div>
                  </div>
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    <img src={googlePlayBadge} alt="Google Play" className="h-12" />
                  </button>
                </div>
                <div className='flex gap-10'>
                  <p className="flex items-center gap-2 text-sm mt-4 opacity-90">
                    <AlertCircle size={16} />
                    IOS Comming soon
                  </p>
                  <p className="flex items-center gap-2 text-sm mt-4 opacity-90">
                    <AlertCircle size={16} />
                    Hỗ trợ Android 8.0 trở lên
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-20 lg:py-32">
        <div className="w-full max-w-7xl mx-auto px-8">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-center mb-16 font-sf-pro">
            TÍNH NĂNG <span className="text-[#00EA80]">NỔI BẬT</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-r from-[#00EA80] to-[#12C6A3] p-10 rounded-[40px] shadow-xl">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Calendar className="text-[#00EA80]" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-sf-pro">Đặt lịch dễ dàng</h3>
              <p className="text-lg font-sf-pro">
                Đặt lịch chụp ảnh chỉ trong vài bước đơn giản. Tìm photographer phù hợp với nhu cầu của bạn.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-r from-[#12C6A3] to-[#00EA80] p-10 rounded-[40px] shadow-xl">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="text-[#00EA80]" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-sf-pro">Thanh toán an toàn</h3>
              <p className="text-lg font-sf-pro">
                Hỗ trợ nhiều phương thức thanh toán bảo mật. Giao dịch an toàn, minh bạch.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-r from-[#00EA80] to-[#5CF621] p-10 rounded-[40px] shadow-xl">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="text-[#00EA80]" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-sf-pro">Theo dõi đơn hàng</h3>
              <p className="text-lg font-sf-pro">
                Cập nhật trạng thái đơn hàng realtime. Luôn biết tiến độ của dịch vụ.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-r from-[#5CF621] to-[#00EA80] p-10 rounded-[40px] shadow-xl">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="text-[#00EA80]" size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-sf-pro">Chat trực tiếp</h3>
              <p className="text-lg font-sf-pro">
                Liên hệ photographer mọi lúc mọi nơi. Trao đổi ý tưởng và yêu cầu dễ dàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="relative w-full py-20 lg:py-32 bg-gradient-to-tr from-[#12C6A3] to-[#00EA80]">
        <div className="w-full max-w-5xl mx-auto px-8">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-center mb-16 font-sf-pro text-white">
            HƯỚNG DẪN CÀI ĐẶT
          </h2>

          <div className="bg-white rounded-[50px] p-12 shadow-2xl">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#00EA80] to-[#12C6A3] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 font-sf-pro">Tải xuống file APK</h3>
                  <p className="text-lg text-gray-700 font-sf-pro">Nhấn vào nút "Tải xuống APK" ở trên để tải file về máy</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#00EA80] to-[#12C6A3] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 font-sf-pro">Cho phép cài đặt từ nguồn không xác định</h3>
                  <p className="text-lg text-gray-700 font-sf-pro">Vào Cài đặt → Bảo mật → Bật "Nguồn không xác định"</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#00EA80] to-[#12C6A3] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 font-sf-pro">Mở file APK</h3>
                  <p className="text-lg text-gray-700 font-sf-pro">Mở file vừa tải về và nhấn "Cài đặt"</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#00EA80] to-[#12C6A3] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 font-sf-pro">Hoàn tất</h3>
                  <p className="text-lg text-gray-700 font-sf-pro">Đợi quá trình cài đặt hoàn tất và bắt đầu sử dụng Snapdi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Info */}
      <section className="w-full py-20 lg:py-32 bg-white">
        <div className="w-full max-w-5xl mx-auto px-8">
          <h2 className="text-5xl lg:text-6xl font-extrabold text-center mb-16 font-sf-pro">
            THÔNG TIN <span className="text-[#00EA80]">ỨNG DỤNG</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-r from-[#00EA80] to-[#12C6A3] p-8 rounded-3xl text-center shadow-lg">
              <p className="text-sm uppercase tracking-wider mb-2 opacity-90">Version</p>
              <p className="text-3xl font-bold font-sf-pro">1.0.0</p>
            </div>
            <div className="bg-gradient-to-r from-[#12C6A3] to-[#00EA80] p-8 rounded-3xl text-center shadow-lg">
              <p className="text-sm uppercase tracking-wider mb-2 opacity-90">Kích thước</p>
              <p className="text-3xl font-bold font-sf-pro">~25 MB</p>
            </div>
            <div className="bg-gradient-to-r from-[#00EA80] to-[#5CF621] p-8 rounded-3xl text-center shadow-lg">
              <p className="text-sm uppercase tracking-wider mb-2 opacity-90">Yêu cầu</p>
              <p className="text-3xl font-bold font-sf-pro">Android 8.0+</p>
            </div>
            <div className="bg-gradient-to-r from-[#5CF621] to-[#00EA80] p-8 rounded-3xl text-center shadow-lg">
              <p className="text-sm uppercase tracking-wider mb-2 opacity-90">Cập nhật</p>
              <p className="text-3xl font-bold font-sf-pro">04/11/2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 lg:py-32 bg-white">
        <div className="container mx-auto flex flex-col items-center justify-center text-center gap-6 px-8">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight font-sf-pro">
            <span className="text-black">CÙNG </span>
            <span className="text-[#00EA80]">SNAPDI</span>
          </h2>
          <p className="text-3xl md:text-4xl font-bold font-sf-pro">
            Tạo Nên Những Khoảnh Khắc Đáng Nhớ
          </p>
          <div className="mt-8">
            <a
              href="/signup"
              className="inline-block bg-[#FFFF00] text-black text-4xl md:text-6xl font-extrabold uppercase px-12 py-5 rounded-3xl border-6 border-[#0A4D3B] shadow-lg transition-transform duration-200 hover:scale-105 font-sf-pro"
            >
              Đăng Ký Ngay
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadPage;
