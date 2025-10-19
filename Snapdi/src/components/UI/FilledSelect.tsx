import { Select } from 'antd';
import type { SelectProps } from 'antd';

type FilledSelectProps = SelectProps & {
  label: string;
};

export const FilledSelect = ({ label, placeholder, options, ...props }: FilledSelectProps) => {
  return (
    <div className="bg-gray-100 rounded-lg px-4 pt-2.5 pb-2 w-full">
      <label className="block text-xs font-semibold text-gray-500 font-sf-pro!">
        {label}
      </label>
      <Select
        placeholder={placeholder}
        variant="borderless"
        options={options}
        className="!p-0 !w-full !leading-tight font-sf-pro!" // Thêm !w-full
        {...props}
      />
    </div>
  );
};