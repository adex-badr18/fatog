import React from 'react';
import { ProductsType, productsData } from '../constants/data';

const Products: React.FC = () => {
    return (
        <section id='products' className='flex flex-col px-16 pb-16 gap-8 bg-[#eff3ff] relative min-h-screen'>
            <div className="flex -mx-16">
                <div className="flex flex-col bg-[#0e204d] p-12 w-full md:w-1/2">
                    <h3 className='font-bold uppercase text-base leading-4 text-[#13c5dd] mb-4'><span className='mr-2'>//</span>Our Products</h3>

                    <h1 className='text-3xl md:text-4xl text-white font-bold'>Our Products are Tailored to serve your needs</h1>
                </div>
                <div className="hidden md:flex justify-center items-center p-12 w-full md:w-1/2">
                    <h1 className='text-base text-gray-500 font-medium'>At FATOG, we offer quality aqua products that meets our customer's needs, ranging from fingerlings, post-fingerlins, and jumbo to processed oven-dried fish.</h1>
                </div>
            </div>

            <div className="grid-cols-1 sm:grid md:grid-cols-2 lg:grid-cols-4">
                {
                    productsData.map((product: ProductsType, index: number) => (
                        <div
                            key={index}
                            className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                            <img
                                className="rounded-t-lg"
                                src={product.img}
                                alt="FATOG Aqua Product" />

                            <div className="p-6">
                                <h5
                                    className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    {product.title}
                                </h5>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    {product.desc}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Products;