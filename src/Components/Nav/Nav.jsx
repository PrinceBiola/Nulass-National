import React, { useState } from "react";
import Logo from "../../assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-3 md:py-4 flex items-center justify-between shadow-md z-50">
      <Link to="/">
        <div className="flex items-center gap-2 md:gap-4">
          <img 
            src={Logo} 
            alt="Logo" 
            className="w-12 sm:w-14 md:w-16 lg:w-20 transition-all" 
          />
          <div className="flex flex-col">
            <h4 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg">
              NULASS
            </h4>
            <span className="text-[10px] sm:text-xs md:text-sm text-slate-600">
              National
            </span>
          </div>
        </div>
      </Link>

      <button
        className="lg:hidden text-xl sm:text-2xl"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      <ul className="hidden lg:flex items-center gap-4 xl:gap-7 font-semibold text-[15px]">
        <Link to="/">
          <li className="hover:text-customGreen transition-colors">Home</li>
        </Link>
        <Link to="/about">
          <li className="hover:text-customGreen transition-colors">About Us</li>
        </Link>
        <Link to="/blog">
          <li className="hover:text-customGreen transition-colors">Blog</li>
        </Link>
        <Link to="/events">
          <li className="hover:text-customGreen transition-colors">Events</li>
        </Link>
        <Link to="/contact">
          <li className="hover:text-customGreen transition-colors">Contact</li>
        </Link>
        <Link to="/apply">
          <li className="hover:text-customGreen transition-colors">Applications</li>
        </Link>
        <div className="flex items-center gap-2 xl:gap-4">
          <Link to="/login">
            <button className="text-customGreen border-2 border-customGreen px-4 xl:px-6 py-1.5 xl:py-2 rounded-lg hover:bg-customGreen hover:text-white transition-all text-sm xl:text-base">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-customGreen text-white px-4 xl:px-6 py-1.5 xl:py-2 rounded-lg hover:bg-opacity-90 transition-all text-sm xl:text-base">
              Sign Up
            </button>
          </Link>
        </div>
      </ul>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg animate-slideIn">
          <ul className="flex flex-col items-start gap-1 py-3 font-semibold text-sm sm:text-base">
            <Link to="/" onClick={toggleMenu} className="w-full">
              <li className="px-4 py-2 hover:bg-gray-100 hover:text-customGreen transition-all">
                Home
              </li>
            </Link>
            <Link to="/about" onClick={toggleMenu} className="w-full">
              <li className="px-4 py-2 hover:bg-gray-100 hover:text-customGreen transition-all">
                About Us
              </li>
            </Link>
            <Link to="/blog" onClick={toggleMenu} className="w-full">
              <li className="px-4 py-2 hover:bg-gray-100 hover:text-customGreen transition-all">
                Blog
              </li>
            </Link>
            <Link to="/events" onClick={toggleMenu} className="w-full">
              <li className="px-4 py-2 hover:bg-gray-100 hover:text-customGreen transition-all">
                Events
              </li>
            </Link>
            
            <Link to="/contact" onClick={toggleMenu} className="w-full">
              <li className="px-4 py-2 hover:bg-gray-100 hover:text-customGreen transition-all">
                Contact
              </li>
            </Link>
            <Link to="/apply" onClick={toggleMenu} className="w-full">
              <li className="px-4 py-2 hover:bg-gray-100 hover:text-customGreen transition-all">
                Applications
              </li>
            </Link>
            <div className="flex flex-col gap-2 w-full p-4 pt-2 border-t mt-1">
              <Link to="/login" onClick={toggleMenu} className="w-full">
                <button className="w-full text-customGreen border-2 border-customGreen py-2 rounded-lg hover:bg-customGreen hover:text-white transition-all text-sm sm:text-base">
                  Login
                </button>
              </Link>
              <Link to="/signup" onClick={toggleMenu} className="w-full">
                <button className="w-full bg-customGreen text-white py-2 rounded-lg hover:bg-opacity-90 transition-all text-sm sm:text-base">
                  Sign Up
                </button>
              </Link>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nav;
