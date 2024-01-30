import { Link } from "react-router-dom";
import fatogLogo from '../assets/fatog-logo.png';
import { RxDash } from "react-icons/rx";
import { LuPhoneCall } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { menuLinks } from "../constants/data";

const Footer = () => {
    return (
        <footer className='flex flex-col gap-4 bg-[#eff3ff] text-[#1d2a4d]'>
            <div className='flex flex-col md:flex-row gap-8 md:gap-20 p-16'>
                <div className='flex flex-col gap-2 flex-1'>
                    <div className="flex items-center">
                        <img src={fatogLogo} className='w-20' alt="FATOG Logo" />
                        <Link to="/" className="text-[#1d2a4d] text-3xl font-bold -ml-1">
                            FATOG
                        </Link>
                    </div>

                    <p className='text-'>At FATOG, our mission is to promote aquaculture practices in Nigeria. For over 10 years, FATOG have demonstrated commitment to responsible aquaculture.</p>
                </div>

                <div className='flex-1 flex flex-col md:items-center gap-3 md:pt-6'>
                    <h1 className='text-xl font-semibold'>Useful Links</h1>
                    <ul className='md:-ml-8'>
                        {
                            menuLinks.map((menu, index) => (
                                <li key={index}>
                                    <Link to={menu.link} className='flex items-center gap-1 mb-1'>
                                        <RxDash size={20} className="text-blue-600" />
                                        <h4 className='hover:text-blue-600'>{menu.name}</h4>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className='flex-1 bg-[#d0daf8] py-6'>
                    <div className='border-l-4 border-[#1d2a4d] px-5'>
                        <h1 className='text-xl font-semibold mb-4'>Quick Contacts</h1>
                        <p className='mb-4'>If you have any questions or need help</p>

                        <div className="flex items-center gap-4 mb-4">
                            <LuPhoneCall size={26} className="text-blue-600" />
                            <h3 className='flex flex-col'>
                                <span>+234 813 417 1720</span>
                                <span>+234 814 686 8912</span>
                            </h3>
                        </div>

                        <div className="flex items-center gap-4">
                            <IoLocationOutline size={38} className="text-blue-600" />
                            <p className=''>
                                Behind Road Safety Office, Olobeere Area, Iwo <br /> Osun State.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-[#a9bdfa] px-16 py-5 text-center'>
                <p>
                    Copyright &copy; {new Date().getFullYear()} <span className="text-blue-600 font-bold">FATOG</span>. All rights reserved
                </p>
            </div>

        </footer>
    )
}

export default Footer;