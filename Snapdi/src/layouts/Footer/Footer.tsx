import { FaFacebook, FaTiktok } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-black px-6 md:px-12 lg:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Left Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-4xl font-bold">SNAPDI</h2>
          <p className="text-lg md:text-xl mt-1">Snapdi Company</p>
          <p className="text-lg md:text-xl mb-4">Founded in 2025</p>

          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <MdEmail /> snapdi.co@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone /> 012345678
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn /> Thu Duc City
            </li>
          </ul>

          <p className="text-xs mt-4">
            © 2025 Snapdi. All rights reserved.
          </p>

          <div className="mt-4">
            <p className="text-sm mb-2">Get more information about us.</p>
            <div className="flex gap-4 text-xl">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Language Selector */}
          <div className="mt-4">
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>🇻🇳 Viet Nam</option>
              <option>🇺🇸 English</option>
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
          <div>
            <h3 className="font-bold mb-3">SNAPDI</h3>
            <ul className="space-y-2">
              <li><a className="text-black! hover:underline!" href="#">Home</a></li>
              <li><a className="text-black! hover:underline!" href="#">About Snapdi</a></li>
              <li><a className="text-black! hover:underline!" href="#">How it Works</a></li>
              <li><a className="text-black! hover:underline!" href="#">Download App</a></li>
              <li><a className="text-black! hover:underline!" href="/admin-login">Admin Login</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">CLIENT</h3>
            <ul className="space-y-2">
              <li><a className="text-black! hover:underline!" href="#">Book</a></li>
              <li><a className="text-black! hover:underline!" href="#">Snapdi Premium</a></li>
              <li><a className="text-black! hover:underline!" href="#">Event Photography</a></li>
              <li><a className="text-black! hover:underline!" href="#">Portrait & Studio</a></li>
              <li><a className="text-black! hover:underline!" href="#">Booking Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">SNAPER</h3>
            <ul className="space-y-2">
              <li><a className="text-black! hover:underline!" href="#">Join as Photographer</a></li>
              <li><a className="text-black! hover:underline!" href="#">Snapdi Pro Tools</a></li>
              <li><a className="text-black! hover:underline!" href="#">Pricing & Commission</a></li>
              <li><a className="text-black! hover:underline!" href="#">Resources & Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">DISCOVER</h3>
            <ul className="space-y-2">
              <li><a className="text-black! hover:underline!" href="#">Photography Styles</a></li>
              <li><a className="text-black! hover:underline!" href="#">Trending Photographers</a></li>
              <li><a className="text-black! hover:underline!" href="#">Client Stories</a></li>
              <li><a className="text-black! hover:underline!" href="#">Blog & Tips</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-3">SUPPORT</h3>
            <ul className="space-y-2">
              <li><a className="text-black! hover:underline!" href="#">Help Center</a></li>
              <li><a className="text-black! hover:underline!" href="#">FAQ</a></li>
              <li><a className="text-black! hover:underline!" href="#">Contact Us</a></li>
              <li><a className="text-black! hover:underline!" href="#">Terms of Service</a></li>
              <li><a className="text-black! hover:underline!" href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
