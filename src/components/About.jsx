import React, { useState } from 'react';
import aboutImage from '../assets/fish-red.jpg';
import { stats } from '../constants/data';
import Modal from './Modal';
import ContactForm from './ContactForm';

const About = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <section id='about' className='flex flex-col md:flex-row items-start md:justify-between lg:items-center p-8 md:p-16 gap-6 md:gap-8 min-h-screen'>
            <div className="w-full md:w-[45%] md:min-w-[520px] mb-4 md:mb-0 border-l-[16px] border-[#b7dde2] pl-3">
                <img src={aboutImage} className='w-full md:w-[90%]' alt="Catfish Hatchery" />
            </div>

            <div className="flex flex-col">
                <h3 className='font-bold uppercase text-base leading-4 text-[#13c5dd] mb-4'><span className='mr-1'>//</span>About Us</h3>

                <h1 className='text-3xl md:text-4xl text-[#0e204d] font-bold mb-4'>Delivery of Fish Farming Products and Aqua Services</h1>

                <p className='text-base text-gray-700 mb-7'>At FATOG Fishery Enterprises, we specialize in providing a diverse range of high-quality aqua products and services - from our carefully bred fingerlings to the processed and packaged oven-dried fishes. With a passion for excellence, we also offer specialized services such as feed mill production, hatchery management, and consultancy.</p>

                <button
                    onClick={openModal}
                    className="self-start rounded-md border-2 border-[#0e204d] px-7 py-[10px] mb-7 text-sm font-medium uppercase leading-normal text-[#1f3374] hover:text-white transition duration-150 ease-in-out bg-transparent hover:border-[#0e204d] hover:bg-[#0e204d] focus:outline-none dark:hover:bg-opacity-10">
                    Contact Us
                </button>

                <Modal isOpen={isOpen} onClose={closeModal}>
                    <ContactForm />
                </Modal>

                <hr className='mb-7' />

                <Stats />
            </div>
        </section>
    )
}

const Stats = () => {
    return (
        <div className='flex flex-wrap gap-10'>
            {
                stats.map((stat, index) => (
                    <div key={index} className='flex gap-4 flex-1'>
                        <span className='text-[#13c5dd]'>{stat.icon}</span>
                        <div className='flex flex-col'>
                            <h1 className='text-4xl font-semibold text-[#0e204d]'>{stat.count}</h1>
                            <p className='text-base text-gray-700 w-[80%]'>{stat.desc}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default About;