import { Outlet } from "react-router-dom";
import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <div className="mt-[89px] min-h-[435px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
