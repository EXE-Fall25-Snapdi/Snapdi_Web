/**
 * Download Configuration
 * 
 * Cấu hình URL download cho APK file
 * 
 * QUAN TRỌNG:
 * - Nếu deploy trên Vercel và file APK trong public/ không work
 * - Hoặc file APK > 100MB (giới hạn của Vercel)
 * - Hãy upload lên external storage và dùng EXTERNAL_APK_URL
 */

// Cấu hình
export const DOWNLOAD_CONFIG = {
  // Đặt USE_EXTERNAL_URL = true nếu muốn dùng link external
  USE_EXTERNAL_URL: true,

  // URL local (file trong public/downloads/)
  LOCAL_APK_URL: '/downloads/snapdi-app.apk',

  // URL external (Google Drive, Cloudinary, AWS S3, Firebase Storage, etc.)
  // Google Drive direct download link (từ File ID: 1_A0eIoy5_-lFvUbC-bYBfqMcd86q4LCZ)
  EXTERNAL_APK_URL: 'https://drive.google.com/file/d/1GGb57TLDZEQDdN6kuMqctqoSMUtM78P4/view?usp=sharing',

  // App info
  APP_VERSION: '1.0.0',
  APP_SIZE: '~25 MB',
  MIN_ANDROID_VERSION: 'Android 8.0+',
  LAST_UPDATE: '04/11/2025',
};

/**
 * Get download URL based on configuration
 */
export const getDownloadUrl = (): string => {
  return DOWNLOAD_CONFIG.USE_EXTERNAL_URL
    ? DOWNLOAD_CONFIG.EXTERNAL_APK_URL
    : DOWNLOAD_CONFIG.LOCAL_APK_URL;
};

/**
 * HƯỚNG DẪN UPLOAD LÊN EXTERNAL STORAGE:
 * 
 * === GOOGLE DRIVE ===
 * 1. Upload APK lên Google Drive
 * 2. Click chuột phải → Get link → Anyone with the link can view
 * 3. Copy File ID từ link (https://drive.google.com/file/d/FILE_ID_HERE/view)
 * 4. Tạo direct download link: https://drive.google.com/uc?export=download&id=FILE_ID_HERE
 * 5. Paste vào EXTERNAL_APK_URL và set USE_EXTERNAL_URL = true
 * 
 * === CLOUDINARY ===
 * 1. Đăng ký tài khoản Cloudinary (free tier: 10GB)
 * 2. Upload APK as "raw" file (không phải image)
 * 3. Copy URL từ Cloudinary dashboard
 * 4. Paste vào EXTERNAL_APK_URL và set USE_EXTERNAL_URL = true
 * 
 * === FIREBASE STORAGE ===
 * 1. Tạo Firebase project
 * 2. Enable Firebase Storage
 * 3. Upload APK file
 * 4. Get download URL
 * 5. Paste vào EXTERNAL_APK_URL và set USE_EXTERNAL_URL = true
 * 
 * === AWS S3 ===
 * 1. Tạo S3 bucket (public access)
 * 2. Upload APK file
 * 3. Get object URL
 * 4. Paste vào EXTERNAL_APK_URL và set USE_EXTERNAL_URL = true
 */
