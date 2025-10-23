import { Input } from 'antd';
import type { InputProps } from 'antd';

// Mở rộng InputProps và thêm 'label'
type FilledInputProps = InputProps & {
  label: string;
};

export const FilledInput = ({ label, placeholder, ...props }: FilledInputProps) => {
  return (
    // Đây là "vỏ bọc" màu xám, bo tròn
    <div className="bg-gray-100 rounded-lg px-4 pt-2.5 pb-2 w-full">
      {/* Đây là label tùy chỉnh */}
      <label className="block text-xs font-semibold text-gray-500 font-sf-pro!">
        {label}
      </label>
      {/* Đây là Input của AntD, đã loại bỏ viền và nền */}
      {label.includes("khẩu") ? (
        <Input.Password
          placeholder={placeholder}
          variant="borderless" // Rất quan trọng: Xóa style mặc định
          className="!p-0 !text-base !leading-tight font-sf-pro" // Reset padding và căn chỉnh text
          {...props}
        />
      ) : (
        <Input
          placeholder={placeholder}
          variant="borderless" // Rất quan trọng: Xóa style mặc định
          className="!p-0 !text-base !leading-tight font-sf-pro" // Reset padding và căn chỉnh text
          {...props}
        />
      )}
    </div>
  );
};