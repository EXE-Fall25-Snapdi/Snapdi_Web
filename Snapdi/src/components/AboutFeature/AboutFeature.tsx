import heartIcon from '../../assets/icons/iconoir_heart-solid.svg';
import lightning from '../../assets/icons/lightning.svg';
import eye from '../../assets/icons/eye.svg';
import magic from '../../assets/icons/mdi_magic.svg';

const CoreValues = () => {
  const values = [
    {
      icon: eye,
      title: 'Kết Nối Tức Thì',
      backgroundColor: 'bg-[#69CF79]',
      description: 'Nền tảng của chúng tôi giúp kết nối người dùng và nhiếp ảnh gia một cách nhanh chóng, hiệu quả.'
    },
    {
      icon: magic,
      title: 'Sáng Tạo Không Giới Hạn',
      backgroundColor: 'bg-[#57A192]',
      description: 'Chúng tôi cung cấp các công cụ và nguồn cảm hứng để bạn tự do sáng tạo, biến ý tưởng thành hiện thực.'
    },
    {
      icon: lightning,
      title: 'Minh Bạch và Thích Ứng',
      backgroundColor: 'bg-[#57A192]',
      description: 'Mọi quy trình đều rõ ràng. Chúng tôi luôn lắng nghe và cải tiến để đáp ứng tốt nhất nhu cầu của bạn.'
    },
    {
      icon: heartIcon,
      title: 'Niềm Tin Và Cộng Đồng',
      backgroundColor: 'bg-[#69CF79]',
      description: 'Xây dựng một cộng đồng nhiếp ảnh vững mạnh dựa trên sự tin tưởng và đam mê chia sẻ khoảnh khắc.'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 w-full h-[800px] flex justify-center" style={{
      background: 'radial-gradient(circle at top, #57A192, #69CF79)'
    }} >
      <div className='w-10/12'>
        <div className="text-center grid grid-cols-2 justify-center gap-12">
          <div className='flex justify-center items-center'>
            <h2 className="text-xl md:text-6xl text-white font-extrabold leading-20">Giá Trị <br /> Cốt Lõi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className={` backdrop-blur-sm p-8 rounded-2xl flex flex-col items-start justify-end text-white text-center shadow-lg ${value.backgroundColor}`}>
                <div className="mb-4">
                  <img src={value.icon} alt={value.title} className="w-[90px] h-[90px] text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
                <p className="text-lg opacity-90 text-left  ">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoreValues;