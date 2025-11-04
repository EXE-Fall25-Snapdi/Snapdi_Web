import React from 'react';
// import Logo from '../../assets/logo.png'; // Thêm logo của bạn
import RightImage from '../../../assets/images/signup_banner.svg'; // Thêm ảnh bên phải
import logo from '../../../assets/images/logo.png'
import Icons from '../../../components/icon';

type Props = {
  children: React.ReactNode;
  currentRole: 'client' | 'photographer';
  onRoleChange: (role: 'client' | 'photographer') => void;
};

export default function SignUpLayout({ children, currentRole, onRoleChange }: Props) {
  return (
    <div className="max-w-6xl w-full mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px] lg:min-h-[720px] relative">
      {/* Back button cho mobile */}
      <a href="/" className='lg:hidden absolute top-3 right-3 z-50 hover:scale-110 text-[#0A9276]! rounded-full bg-white p-2 shadow-lg'>
        <Icons.ArrowLeft className='w-6 h-6 sm:w-8 sm:h-8' />
      </a>
      
      {/* === CỘT BÊN TRÁI (FORM) === */}
      <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center  justify-between mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold">
              <img src={logo} alt="snapdi-logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className='w-full flex items-center justify-center'>
            {/* Role Toggle Buttons */}
            <div className='w-full px-14 sm:w-4/6 flex justify-between'>
              <button
                onClick={() => onRoleChange('photographer')}
                className={`font-bold text-base sm:text-lg md:text-xl transition-colors ${currentRole === 'photographer'
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                SNAPER
              </button>
              <button
                onClick={() => onRoleChange('client')}
                className={`font-semibold text-base sm:text-lg md:text-xl transition-colors ${currentRole === 'client'
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                CLIENT
              </button>
            </div>
          </div>
        </div>

        {/* Nội dung form (các step) sẽ được render ở đây */}
        <div className="flex flex-col flex-grow h-full">
          {children}
        </div>
      </div>

      {/* === CỘT BÊN PHẢI (ẢNH) === */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-300 to-cyan-400 p-10 relative items-center justify-center overflow-hidden">
        <a href="/" className='absolute z-50 top-6 right-6 hover:scale-110 text-[#0A9276]! rounded-full bg-white p-2'>
          <Icons.ArrowLeft className='w-10 h-10' />
        </a>
        {/* <p className="text-white opacity-50 text-2xl">[Placeholder cho ảnh photographer]</p> */}
        <img src={RightImage} alt="Photographer" className="absolute scale-110 -bottom-10 h-auto object-contain" />
      </div>
    </div>
  );
}