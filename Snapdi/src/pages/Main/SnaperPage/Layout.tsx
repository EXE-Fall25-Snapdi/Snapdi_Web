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
    <div className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[720px]">
      {/* === CỘT BÊN TRÁI (FORM) === */}
      <div className="w-1/2 p-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className=" flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold">
              <img src={logo} alt="snapdi-logo" />
            </div>
          </div>
          <div className='w-full flex items-center justify-center'>
            {/* Role Toggle Buttons */}
            <div className='w-4/6 flex justify-between'>
              <button
                onClick={() => onRoleChange('photographer')}
                className={`font-bold text-xl transition-colors ${currentRole === 'photographer'
                  ? 'text-green-500'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                SNAPER
              </button>
              <button
                onClick={() => onRoleChange('client')}
                className={`font-semibold text-xl transition-colors ${currentRole === 'client'
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
      <div className="w-1/2 bg-gradient-to-br from-green-300 to-cyan-400 p-10 relative flex items-center justify-center overflow-hidden">
        <a href="/" className='absolute z-50 top-6 right-6 hover:scale-110 text-[#0A9276]! rounded-full bg-white p-2'>
          <Icons.ArrowLeft className='w-10 h-10' />
        </a>
        {/* <p className="text-white opacity-50 text-2xl">[Placeholder cho ảnh photographer]</p> */}
        <img src={RightImage} alt="Photographer" className="absolute scale-110 -bottom-10 h-auto object-contain" />
      </div>
    </div>
  );
}