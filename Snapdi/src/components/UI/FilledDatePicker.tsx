import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';

type FilledDatePickerProps = DatePickerProps & {
  label: string;
};

export const FilledDatePicker = ({ label, placeholder, ...props }: FilledDatePickerProps) => {
  return (
    <div className="bg-gray-100 rounded-lg px-4 pt-2.5 pb-2 w-full">
      <label className="block text-xs font-semibold text-gray-500">
        {label}
      </label>
      <DatePicker
        placeholder={placeholder}
        variant="borderless"
        className="!p-0 !w-full !leading-tight font-sf-pro!" // Thêm !w-full để nó lấp đầy
        {...props}
      />
    </div>
  );
};