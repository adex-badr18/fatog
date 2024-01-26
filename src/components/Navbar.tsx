import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import fatogLogo from '../assets/fatog-logo.png';

import { menuLinks } from "../constants/data";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white p-4 relative">
            <div className="container flex justify-between items-center">
                <div className="flex items-center">
                    <img src={fatogLogo} className='w-20' alt="FATOG Logo" />
                    <Link to="/" className="text-[#1d2a4d] text-2xl font-bold">
                        FATOG
                    </Link>
                </div>
                <div className="hidden md:flex gap-4">
                    {menuLinks.map(menu => (
                        <NavLink key={menu.id} to={menu.link}>{menu.name}</NavLink>
                    ))}
                </div>

                {/* Responsive Menu */}
                <div className="md:hidden">
                    <button className="text-[#1d2a4d]" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <FaTimes size={30} className="" /> : <HiMenuAlt3 size={30} className="" />}
                    </button>
                </div>
            </div>

            {/* Responsive Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t-4 border-blue-400 absolute top-[7rem] left-0 right-0">
                    <div className="flex flex-col">
                        {
                            menuLinks.map(menu => (
                                <MobileNavLink key={menu.id} to={menu.link} handleClick={closeMobileMenu}>
                                    {menu.name}
                                </MobileNavLink>

                            ))
                        }
                    </div>
                </div>
            )}
        </nav>
    );
};

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
    const { hash } = useLocation();

    return (
        <Link to={to} className={clsx("text-[#1d2a4d] hover:text-blue-400 font-bold uppercase text-base py-1 hover:border-b-2 border-blue-400", { 'text-blue-400 border-b-2 border-blue-400 transition-all duration-300': hash.includes(to) })}>
            {children}
        </Link>
    );
};

const MobileNavLink: React.FC<NavLinkProps & { handleClick: () => void }> = ({ to, children, handleClick }) => {
    const { hash } = useLocation();

    return (
        <Link
            to={to}
            className={clsx("text-[#1d2a4d] text-sm font-bold uppercase mx-4 py-3 border-b-2 border-gray-200 transition duration-300", { 'text-blue-400': hash.includes(to) })}
            onClick={handleClick}
        >
            {children}
        </Link>
    );
};

export default Navbar;

