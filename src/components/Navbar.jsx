import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { TbShoppingCartCog } from "react-icons/tb";
import fatogLogo from '../assets/fatog-logo.png';
// import { menuLinks } from "../constants/data";
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import Modal from "./Modal";
import ContactForm from "./ContactForm";
import { Button, Stack, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar, Link } from '@chakra-ui/react';
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user')) || false;
    const { logout } = useAuth();
    const { pathname } = useLocation();

    const menuLinks = [
        { id: 1, name: user ? 'Dashboard' : 'Home', link: user ? '/dashboard' : '/' },
        { id: 2, name: 'About', link: '/#about', linkType: 'anchor' },
        { id: 3, name: 'Products', link: user ? '/products' : '/#products' },
        { id: 4, name: 'Services', link: '/#services' },
    ];

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
            <div className="flex justify-between items-center">
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

                    <Stack direction='row' spacing='3'>
                        {
                            !user &&
                            <>
                                <Button as={RouterLink} to='login' colorScheme='blue' size='sm' textTransform='uppercase'>Login</Button>
                                <Button
                                    colorScheme='blue'
                                    textTransform='uppercase'
                                    variant='outline'
                                    onClick={openModal}
                                    size='sm'
                                >
                                    Contact Us
                                </Button>
                            </>
                        }

                        {
                            user &&
                            <Menu>
                                <MenuButton>
                                    <Avatar size="sm" />
                                </MenuButton>
                                <MenuList py='0'>
                                    <MenuItem as={RouterLink} icon={<RxAvatar />} to='/profile'>Profile</MenuItem>
                                    {/* <MenuDivider my='0' /> */}
                                    <MenuItem as={RouterLink} icon={<TbShoppingCartCog />} to='/orders'>My Orders</MenuItem>
                                    <MenuDivider my='0' />
                                    <MenuItem as={RouterLink} icon={<RiLogoutCircleRLine />} onClick={() => logout()}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        }

                    </Stack>

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

                        {
                            !user &&
                            <Link as={RouterLink}
                                to='/login'
                                color='#1d2a4d'
                                mx='4'
                                py='3'
                                fontSize='sm'
                                fontWeight='bold'
                                textTransform='uppercase'
                            >
                                Login
                            </Link>
                        }

                        {
                            user &&
                            <>
                                <Link
                                    as={RouterLink}
                                    to='/login'
                                    color='#1d2a4d'
                                    mx='4'
                                    py='3'
                                    fontSize='sm'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                >
                                    Profile
                                </Link>
                                <Link
                                    as={RouterLink}
                                    to='/orders'
                                    color='#1d2a4d'
                                    mx='4'
                                    py='3'
                                    fontSize='sm'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                >
                                    My Orders
                                </Link>
                                <Link
                                    as={RouterLink}
                                    onClick={() => logout()}
                                    color='#1d2a4d'
                                    mx='4'
                                    py='3'
                                    fontSize='sm'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                >
                                    Logout
                                </Link>
                            </>
                        }

                    </div>
                </div>
            )}
        </nav>
    );
};

const NavLink = ({ to, children }) => {
    const { hash, pathname } = useLocation();
    const active = hash.includes(to);

    // console.log(hash, to, pathname, active)

    return (
        <Link
            as={RouterNavLink}
            to={to}
            color={active ? 'blue.400' : '#1d2a4d'}
            borderBottom={active && '2px'}
            borderBottomColor={active && 'blue.400'}
            fontSize='sm'
            fontWeight='bold'
            textTransform='uppercase'
            py='1'
            _hover={{ borderBottomWidth: '2px', borderBottomColor: 'blue.400', color: 'blue.400' }}
            style={({isActive}) => ({
                color: isActive ? 'blue.400' : '#1d2a4d',
                borderBottom: isActive ? '2px' : '0',
                borderBottomColor: isActive && 'blue.400',
            })}
        >
            {children}
        </Link>
    );
};

const MobileNavLink = ({ to, children, handleClick }) => {
    const { hash, pathname } = useLocation();
    const active = pathname.includes(to) || hash.includes(to);

    return (
        <Link
            as={RouterLink}
            to={to}
            color={active ? 'blue.400' : '#1d2a4d'}
            fontSize='sm'
            fontWeight='bold'
            textTransform='uppercase'
            py='3'
            mx='4'
            onClick={handleClick}
            _hover={{ borderBottomWidth: '2px', borderBottomColor: 'blue.400', color: 'blue.400' }}
        >
            {children}
        </Link>
    );
};

export default Navbar;

