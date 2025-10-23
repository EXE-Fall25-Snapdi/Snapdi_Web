import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Định nghĩa schema validation khớp với các bước và API
const signUpSchema = z.object({
  // --- Dữ liệu chung ---
  role: z.enum(['client', 'photographer']), // Để biết rẽ nhánh

  // --- Step 1: Account (Khớp API) ---
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z.string(),

  // --- Step 2: OTP ---
  otp: z.string().length(6, "OTP phải có 6 chữ số"),

  // --- Step 3: Photographer Profile (Khớp API) ---
  locationCity: z.string().min(1, "Vui lòng nhập Tỉnh/Thành phố"),
  locationAddress: z.string().optional(), // API là optional
  yearsOfExperience: z.string().min(1, "Vui lòng nhập số năm kinh nghiệm"),
  description: z.string().optional(), // API là optional

  // --- Step 4: Photographer Portfolio (Khớp API) ---
  equipment: z.array(z.string()).min(1, "Vui lòng chọn ít nhất 1 thiết bị"), // Dùng để tạo equipmentDescription
  portfolioImages: z.custom<FileList>().optional(), // Dùng để upload

}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu nhập lại không khớp",
  path: ["confirmPassword"], // Hiển thị lỗi ở ô confirmPassword
});

// Tạo type FormData từ schema
export type SignUpFormData = z.infer<typeof signUpSchema>;

// Custom hook để cung cấp form
export const useSignUpForm = () => {
  return useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: 'client',
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      otp: '',
      locationCity: '',
      locationAddress: '',
      yearsOfExperience: '',
      description: '',
      equipment: [],
    },
  });
};