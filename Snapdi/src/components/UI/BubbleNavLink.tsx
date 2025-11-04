import React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';
// Định nghĩa các props mà component của bạn sẽ nhận
// Chúng ta kế thừa NavLinkProps để nhận tất cả các props tiêu chuẩn của NavLink (như 'to', 'end', v.v.)
interface BubbleNavLinkProps extends NavLinkProps {
  children: React.ReactNode;
  // Bạn có thể thêm các props tùy chỉnh khác ở đây nếu cần
}

const BubbleNavLink: React.FC<BubbleNavLinkProps> = ({
  children,
  className, // Nhận className từ props (nếu có)
  ...props // Truyền tất cả các props còn lại (quan trọng nhất là 'to' và 'end')
}) => {
  // --- Định nghĩa Style bằng Tailwind (Theme Snapdi) ---

  // Style CƠ BẢN: Áp dụng cho cả trạng thái active và inactive
  // 'rounded-full': Tạo hình dạng "bubble" bo tròn hoàn toàn
  // 'px-6 py-2.5': Padding bên trong (tăng lên cho đẹp hơn)
  // 'font-sf-pro font-bold': Font chữ và độ đậm theo theme Snapdi
  // 'transition-all duration-300': Hiệu ứng chuyển động mượt mà
  // 'shadow-lg': Bóng mờ lớn hơn
  const baseStyles =
    'rounded-full px-6 py-2.5 font-sf-pro font-bold text-sm transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95';

  // Style INACTIVE: Khi link không được kích hoạt
  // 'bg-white text-gray-700': Nền trắng, chữ xám
  // 'hover:bg-gray-50': Hiệu ứng khi di chuột (nền xám nhạt)
  // 'border-2 border-gray-200': Viền xám nhạt
  const inactiveStyles = 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-xl border-2 border-gray-200';

  // Style ACTIVE: Khi link đang khớp với URL hiện tại
  // 'bg-gradient-to-r from-[#34D399] to-[#10B981]': Gradient xanh lá Snapdi
  // 'text-white': Chữ trắng
  // 'shadow-emerald-500/30': Bóng màu xanh lá
  // 'ring-2 ring-emerald-500/50': Viền xanh lá
  const activeStyles = 'bg-gradient-to-r from-[#34D399] to-[#10B981] text-white shadow-emerald-500/30 ring-2 ring-emerald-500/50';

  return (
    <NavLink
      {...props} // Truyền 'to', 'end', v.v.
      // Đây là phần quan trọng nhất:
      // NavLink cho phép 'className' là một hàm trả về class dựa trên trạng thái 'isActive'
      className={(navData) =>
        [
          baseStyles, // 1. Luôn áp dụng style cơ bản
          navData.isActive ? activeStyles : inactiveStyles, // 2. Áp dụng style active hoặc inactive
          typeof className === 'function' // 3. Xử lý nếu className truyền vào cũng là 1 hàm (hiếm gặp)
            ? className(navData)
            : className, // 4. Hoặc áp dụng className tĩnh truyền vào (phổ biến)
        ]
          .filter(Boolean) // Lọc bỏ các giá trị null/undefined
          .join(' ') // Nối tất cả các class lại
      }
    >
      {/* Hiển thị nội dung bên trong button (văn bản, icon, v.v.) */}
      {children}
    </NavLink>
  );
};

export default BubbleNavLink;