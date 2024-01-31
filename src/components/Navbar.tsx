import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import fatogLogo from '../assets/fatog-logo.png';
import { menuLinks } from "../constants/data";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import Modal from "./Modal";
import ContactForm from "./ContactForm";

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white px-4 py-2">
            <div className="container flex justify-between items-center">
                <div className="flex items-center">
                    <img src={fatogLogo} className='w-16' alt="FATOG Logo" />
                    <Link to="/" className="flex flex-col items-center text-[#1d2a4d] font-bold">
                        <span className="text-2xl">FATOG</span>
                        <span className="text-[7px]">Fishery Enterprises</span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    {menuLinks.map(menu => (
                        <NavLink key={menu.id} to={menu.link}>{menu.name}</NavLink>
                    ))}

                    <button
                        onClick={openModal}
                        className="hidden md:block rounded-md border-2 border-[#0e204d] px-6 ml-4 py-[10px] text-sm font-medium uppercase leading-normal text-[#1f3374] hover:text-white transition duration-150 ease-in-out bg-transparent hover:border-[#0e204d] hover:bg-[#0e204d] focus:outline-none dark:hover:bg-opacity-10">
                        Contact Us
                    </button>

                    <Modal isOpen={isOpen} onClose={closeModal}>
                        <ContactForm />
                    </Modal>
                </div>

                {/* Responsive Menu */}
                <div className="md:hidden">
                    <button className="text-[#1d2a4d]" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <IoCloseSharp size={30} className="" /> : <HiMenuAlt3 size={30} className="" />}
                    </button>
                </div>
            </div>

            {/* Responsive Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t-4 border-blue-400 absolute top-[5rem] left-0 right-0 z-10 shadow-md">
                    <div className="flex flex-col divide-solid divide-y-2 divide-gray-200">
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
        <a href={to} className={clsx("text-[#1d2a4d] hover:text-blue-400 font-bold uppercase text-base py-1 hover:border-b-2 border-blue-400", { 'text-blue-400 border-b-2 border-blue-400 transition-all duration-300': hash.includes(to) })}>
            {children}
        </a>
    );
};

const MobileNavLink: React.FC<NavLinkProps & { handleClick: () => void }> = ({ to, children, handleClick }) => {
    const { hash } = useLocation();

    return (
        <a
            href={to}
            className={clsx("text-[#1d2a4d] text-sm font-bold uppercase mx-4 py-3 transition duration-300", { 'text-blue-400': hash.includes(to) })}
            onClick={handleClick}
        >
            {children}
        </a>
    );
};

export default Navbar;

