import AboutFeature from "../../../components/AboutFeature/AboutFeature"
import AboutIntro from "../../../components/AboutIntro/AboutIntro"
import AboutVision from "../../../components/AboutVision/AboutVision"

const AboutUs = () => {
  return (
    <div className="flex justify-center">
      <div className="lg:w-10/12 w-full">
        <AboutIntro />
        <div className="border-b-1 border-gray-200 my-8"></div>
        <AboutFeature />
        <div className="border-b-1 border-gray-200 my-8"></div>
        <AboutVision />
      </div>
    </div>
  )
}

export default AboutUs