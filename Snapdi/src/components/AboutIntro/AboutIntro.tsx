

// Giả sử bạn có hình banner tại đường dẫn này
import AboutUsBanner from '../../assets/images/AboutUs-banner.svg';

// ============================================================================
// Introduction Section
// ============================================================================
const Introduction = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-6xl font-bold text-gray-800 mb-8"><span className='text-[#57A192]'>Về</span> <span className="text-[#69CF79]">Snapdi</span></h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <p className="text-gray-600 leading-relaxed mb-4">
            Snapdi được sinh ra từ một ý tưởng đơn giản: giúp mọi người lưu giữ khoảnh khắc. Chúng tôi tin rằng mỗi khoảnh khắc đều có giá trị, và sứ mệnh của chúng tôi là tạo ra một nền tảng đơn giản, mạnh mẽ để bạn có thể chụp, biến tấu và người kể nghe kết nối qua gian thực.
          </p>
        </div>
        <div className="text-left">
          <p className="text-gray-600 leading-relaxed">
            Với Snapdi bạn có thể đặt lịch chụp ảnh chỉ trong vài phút, bất cứ khi nào và ở bất cứ đâu. Mỗi phiên chụp sẽ kết nối bạn với một đối tác có cặp đôi diễn đàn nhiếp ảnh chuyên nghiệp, và để họ biến ý tưởng bạn chụp có thêm một câu chuyện.
          </p>
        </div>
      </div>
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-700">
        <img src={AboutUsBanner} alt="About Us Banner" className="w-full max-w-4xl" />
      </div>
    </div>
  );
};
export default Introduction;