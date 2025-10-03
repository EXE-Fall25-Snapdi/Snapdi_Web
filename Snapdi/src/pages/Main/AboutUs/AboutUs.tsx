
const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative text-4xl md:text-6xl font-bold text-white text-center">
          Về Chúng Tôi
        </h1>
      </div>

      {/* Nội dung */}
      <div className="px-6 py-12 md:px-16 lg:px-24 max-w-[1200px] mx-auto">
        {/* Tầm nhìn */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Tầm nhìn
          </h2>
          <p className="text-lg leading-relaxed">
            <strong>Lưu giữ mọi khoảnh khắc, ngay tức thì.</strong> Chúng tôi
            mong muốn trở thành cầu nối đáng tin cậy, giúp khách hàng có thể dễ
            dàng lưu giữ những kỷ niệm quý giá trong từng khoảnh khắc cuộc sống.
          </p>
        </section>

        {/* Sứ mệnh */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Sứ mệnh
          </h2>
          <p className="text-lg leading-relaxed">
            <strong>
              Kết nối khách hàng với nhiếp ảnh gia phù hợp một cách nhanh chóng,
              tiện lợi và minh bạch.
            </strong>{" "}
            Thông qua nền tảng của chúng tôi, mỗi khách hàng đều có thể tìm thấy
            nhiếp ảnh gia đáp ứng nhu cầu, với trải nghiệm đặt lịch và hợp tác
            liền mạch, minh bạch.
          </p>
        </section>

        {/* Giá trị cốt lõi */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
            Giá trị cốt lõi
          </h2>
          <ul className="space-y-4 text-lg">
            <li>
              <span className="font-bold text-gray-900">1. Tốc độ:</span> Nhanh
              và tiện là ưu tiên số một.
            </li>
            <li>
              <span className="font-bold text-gray-900">2. Minh bạch:</span> Giá
              cả, thông tin luôn rõ ràng.
            </li>
            <li>
              <span className="font-bold text-gray-900">3. Tận tâm:</span> Luôn
              đặt trải nghiệm khách hàng làm trung tâm.
            </li>
            <li>
              <span className="font-bold text-gray-900">4. Trao quyền:</span>{" "}
              Tạo cơ hội phát triển cho cộng đồng nhiếp ảnh gia.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
