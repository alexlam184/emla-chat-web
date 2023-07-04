import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <Link to="/">
        <h1 className="w-full text-3xl font-bold text-themeturnede">
          TURNED-E!
        </h1>
      </Link>
      <ul className="hidden md:flex">
        <Link to="/">
          <li className="p-4">Home</li>
        </Link>
        <Link to="/category">
          <li className="p-4">Course</li>
        </Link>
        <Link to="https://stemturnede.sharepoint.com/sites/info.public.turned-e/SitePages/Home.aspx">
          <li className="p-4">Resources</li>
        </Link>
        <Link to="https://www.turned-e.com/about-us">
          <li className="p-4">About Us</li>
        </Link>
        <Link to="https://api.whatsapp.com/message/TEG254CZMTKND1?autoload=1&app_absent=0">
          <li className="p-4">Contact</li>
        </Link>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-10"
            : "ease-in-out duration-500 fixed left-[-100%] z-10"
        }
      >
        <Link to="/">
          <h1 className="w-full text-3xl font-bold text-themeturnede m-4">
            TURNED-E!
          </h1>
        </Link>

        <Link to="/" onClick={handleNav}>
          <div>
            <li className="p-4 border-b border-gray-600">Home</li>
          </div>
        </Link>
        <Link to="/category" onClick={handleNav}>
          <li className="p-4 border-b border-gray-600">Course</li>
        </Link>
        <Link to="https://stemturnede.sharepoint.com/sites/info.public.turned-e/SitePages/Home.aspx">
          <li className="p-4 border-b border-gray-600">Resources</li>
        </Link>
        <Link to="https://www.turned-e.com/about-us">
          <div>
            <li className="p-4 border-b border-gray-600">About Us</li>
          </div>
        </Link>
        <Link to="https://api.whatsapp.com/message/TEG254CZMTKND1?autoload=1&app_absent=0">
          <li className="p-4">Contact</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
