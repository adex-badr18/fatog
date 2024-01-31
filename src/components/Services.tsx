import React, { useState } from 'react';
import fatogLogo from '../assets/fatog-logo.png';
import { ServiceType, servicesData } from '../constants/data';
import Modal from './Modal';
import ContactForm from './ContactForm';

const Services: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <section className='flex flex-col justify-center items-center p-8 md:p-16 gap-5 relative min-h-screen bg-[url("/src/assets/lake-bg.jpg")] bg-cover bg-fixed'>
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>

            <div id='services' className='z-10 flex flex-col items-center'>
                <Logo />

                <h1 className='text-3xl md:text-4xl text-white text-center font-bold mb-16'>We Provide The Best Fish Farmers Aquarism Services</h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-16 gap-y-10 mb-16'>
                    {
                        servicesData.map((service: ServiceType, index: number) => (
                            <Service key={index} icon={service.icon} desc={service.desc} />
                        ))
                    }

                </div>

                <button
                    onClick={openModal}
                    className="rounded border-2 border-neutral-50 px-7 py-3 text-sm font-semibold uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out bg-transparent hover:border-[#13c5dd] hover:bg-[#13c5dd] hover:text-[#0e204d] dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
                    Contact Us
                </button>

                <Modal isOpen={isOpen} onClose={closeModal}>
                    <ContactForm />
                </Modal>

            </div>
        </section>
    )
}

export const Logo: React.FC = () => {
    return (
        <div className='flex flex-col items-center mb-8'>
            <img src={fatogLogo} className='w-[100px] invert' alt="FATOG Logo" />
            <h1 className='flex flex-col items-center text-white font-bold'>
                <span className="text-2xl">FATOG</span>
                <span className="text-[7px]">Fishery Enterprises</span>
            </h1>
        </div>
    )
}

export const Service: React.FC<ServiceType> = ({ icon, desc }) => {
    return (
        <div className='flex flex-col items-center gap-7'>
            <div className='w-32 h-32 text-6xl text-[#13c5dd] border-2 border-[#13c5dd] rounded-md'>
                <span className='flex justify-center items-center transition-transform transform hover:-rotate-90 w-full h-full'>
                    {icon}
                </span>
            </div>

            <div className='w-4 h-4 rounded-full bg-[#13c5dd]'></div>

            <h4 className='text-white text-center text-lg font-medium hover:text-[#13c5dd] cursor-pointer'>{desc}</h4>
        </div>
    )
}

export default Services;