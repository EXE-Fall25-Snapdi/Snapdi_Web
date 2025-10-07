import Landing from "../../components/Landing/Landing";
import SnaperBenefit from "../../components/SnaperBenefit/SnaperBenefit";
import "./MainPage.css";

function MainPage() {
  return (
    <div className="flex justify-center">
    <div className="lg:w-3/5 w-full">
      <Landing />
      <SnaperBenefit />
    </div>
    </div>
  );
}

export default MainPage;
