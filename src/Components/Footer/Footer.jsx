import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

function Footer() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4 bg-customGreen p-4 md:p-10 text-white">
      <div className="w-full md:w-1/3">
        <Link to="/">
          <h2 className="font-bold text-xl md:text-2xl mb-3 hover:text-slate-200 transition-colors">
            About National Union Of Lagos State Students
          </h2>
        </Link>

        <p className="text-base md:text-lg">
          The National Union of Lagos State Students(NULASS) is the Apex Body
          for all Lagos Students with the mandate to represent the interest of
          its students.
        </p>
      </div>

      <div className="flex flex-col items-start md:items-center justify-center gap-4 md:gap-6 w-full md:w-1/3">
        <ul className="flex flex-col text-base md:text-lg gap-2">
          <h2 className="text-xl md:text-2xl font-bold mb-1">Quick Links</h2>
          <Link to="/">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">Home</li>
          </Link>
          <Link to="/about">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">About Us</li>
          </Link>
          <Link to="/blog">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">Blog/Events</li>
          </Link>
          <Link to="/contact">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">Contact</li>
          </Link>
          <Link to="/apply">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">Applications</li>
          </Link>
        </ul>

        

        <ul className="flex items-center gap-4 text-xl md:text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">
              <FaFacebook />
            </li>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">
              <FaTwitter />
            </li>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">
              <FaInstagram />
            </li>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <li className="cursor-pointer hover:text-slate-200 transition-colors">
              <FaLinkedin />
            </li>
          </a>
        </ul>
      </div>

      <div className="w-full md:w-1/4 text-base md:text-xl font-semibold flex flex-col gap-3 md:gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Contact Us</h2>
        <Link to="/contact">
          <div className="space-y-3  transition-colors">
            <p className="text-sm md:text-base hover:text-slate-200">
              Phone: <br className="md:hidden" />
              08155248427, 08112127083, 08021132450
            </p>
            <p className="text-sm md:text-base break-words hover:text-slate-200">
              Email: info@nulass.org.ng
            </p>
            <p className="text-sm md:text-base hover:text-slate-200">
              Address: Lagos State, Nigeria
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
