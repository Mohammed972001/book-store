import { useState } from "react";

import Navbar from "./Navbar";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header >
      <Navbar setToggle={setToggle} toggle={toggle} />
    </header>
  );
};

export default Header;
