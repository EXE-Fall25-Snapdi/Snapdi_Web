import Icons from "../../../components/icon"


const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 flex flex-col items-center text-center">
      <div className="md:col-span-2">
        <p className="text-2xl font-bold md:text-6xl mt-1">Snapdi Company</p>
        <p className="text-lg md:text-4xl mb-4 py-4">Founded in 2025</p>

        <ul className="text-sm space-y-2">
          <li className="flex items-center gap-2">
            <Icons.Email className="w-6 h-6 md:w-12 md:h-12" /> <p className="md:text-xl">snapdi.co@gmail.com</p>
          </li>
          <li className="flex items-center gap-2">
            <Icons.Phone className="w-6 h-6 md:w-12 md:h-12" /> <p className="md:text-xl">012345678</p>
          </li>
          <li className="flex items-center gap-2">
            <Icons.MdLocation className="w-6 h-6 md:w-12 md:h-12" /> <p className="md:text-xl">Thu Duc City</p>
          </li>
        </ul>

        <p className="text-xs md:text-sm mt-4">
          © 2025 Snapdi. All rights reserved.
        </p>

        <div className="mt-4">
          <p className="md:text-xl mb-2">Get more information about us.</p>
          <div className="flex gap-4 text-xl">
            <a href="#">
              <Icons.Facebook className="w-6 h-6 md:w-12 md:h-12" />
            </a>
            <a href="#">
              <Icons.Tiktok className="w-6 h-6 md:w-12 md:h-12" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact