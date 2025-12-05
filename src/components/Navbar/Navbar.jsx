import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-green-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        {/* Logo / Home */}
        <Link
          to="/home" 
          className="text-2xl font-bold tracking-wide hover:text-green-200 transition"
        >
          EcoLink
        </Link>

        {/* Menu */}
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
          </li>
          <li>
            <Link to="/coleta" className="hover:text-green-200">Registrar Coleta</Link>
          </li>
          <li>
            <Link to="/guiadareciclagem" className="hover:text-green-200">Guia de Reciclagem</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
