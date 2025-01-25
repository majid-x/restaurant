import React from 'react'
const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-24 flex flex-col md:flex-row-reverse items-center gap-8'>
            <div className='w-1/2'>
            <img src='images/home/banner.png'></img>
            <div>
                <div className='flex flex-col lg:flex-row gap-y-2 lg:gap-y-0 items-center justify-around -mt-14 gap-4'>
                    <div className='flex rounded-2xl shadow-md w-64 bg-white'>
                    <img src='images/home/b-food1.png' className='rounded-2xl p-2'></img>
                    <div className='space-y-1 py-2 px-3 rounded-2xl items-center bg-white'>
                        <div className='text-black'>Spicy Nooddles</div>
                        <div className="rating bg-white">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                            defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <p className='text-red'>18$</p>
                    </div>
                </div>
                <div className='md:flex hidden  rounded-2xl shadow-md w-64 bg-white'>
                    <img src='images/home/b-food1.png' className='rounded-2xl p-2'></img>
                    <div className='space-y-1 py-2 px-3 rounded-2xl items-center'>
                        <div className='text-black'>Spicy Nooddles</div>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                            defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <p className='text-red'>18$</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className='w-1/2 space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold text-black md:leading-snug leading-snug'>
                Dive into Delights of Delectable <span className='text-green'>Food</span></h2>
                <p className='text-xl text-[#4A4A4A]'>Where Each Place Weaves a Story of Culinary Mastery and Passionate Craftsmanship</p>
                <button className='btn bg-green text-white px-8 py-3 rounded-full border-white'>Order Now</button>
                </div>
            
        </div>
    </div>
  )
}

export default Banner