import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm: React.FC = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    function sendEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        emailjs.sendForm(serviceId, templateId, form.current!, publicKey)
            .then(function (response) {
                if (response.status === 200) {
                    console.log('SUCCESS!', response.status, response.text);

                    toast.success(`Message Sent!`, {
                        position: 'top-center',
                        autoClose: 3000,
                        transition: Slide
                    });

                    form.current!.reset();
                }
            }, function (error) {
                console.log('FAILED...', error);
                toast.error(`Error sending message!`, {
                    position: 'top-center',
                    autoClose: 3000,
                    transition: Slide
                });
            });
    }

    return (
        <section>
            <ToastContainer />
            <h3 className='font-bold uppercase text-base leading-4 text-[#13c5dd] mb-4'><span className='mr-2'>//</span>Get In Touch</h3>

            <h1 className='text-xl md:text-2xl text-[#0e204d] font-bold mb-4'>Have Questions, Drop us a Mail</h1>

            <form ref={form} onSubmit={sendEmail}>
                <div className='flex flex-col gap-4 bg-[#eff3ff] p-6 rounded-md'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-[#0e204d]' htmlFor='fullName'>Full Name</label>
                        <input type="text" id='fullName' name='fullName' className='p-2 text-[#0e204d] border-b-2 border-[#0e204d] focus:outline-none rounded-md' placeholder='Your Name' required />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email' className='text-[#0e204d]'>Email</label>
                        <input type="email" id='email' name='email' className='p-2 text-[#0e204d] border-b-2 border-[#0e204d] focus:outline-none rounded-md' placeholder='Email' required />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='message' className='text-[#0e204d]'>Message</label>
                        <textarea name="message" id="message" className='p-2 text-[#0e204d] border-b-2 border-[#0e204d] focus:outline-none rounded-md' placeholder='Your Message Here...' required></textarea>
                    </div>

                    <button
                        className="rounded-md border-2 border-[#0e204d] bg-[#0e204d] py-2 mt-4 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:text-[#0e204d] hover:border-[#13c5dd] hover:bg-[#13c5dd] focus:border-[#0e204d] focus:text-white focus:outline-none focus:ring-0 active:border-[#0e204d] active:text-white dark:hover:bg-opacity-10">
                        Send
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ContactForm