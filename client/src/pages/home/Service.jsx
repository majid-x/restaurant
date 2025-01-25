import React from 'react'

const serviseList = [
    {id: 1,title:"Catering", des:"Delight your guests with our flavors and presentation",image:"/images/home/services/icon1.png"},
    {id: 2,title:"Fast Delivery", des:"We deliver your order promptly to your door",image:"/images/home/services/icon2.png"},
    {id: 3,title:"Online Ordering", des:"Explore menu and order with ease using our Online Ordering",image:"/images/home/services/icon3.png"},
    {id: 4,title:"Gift Cards", des:"Give the gift of exceptional dining with Foodi gift cards",image:"/images/home/services/icon4.png"}
]
const Service = () => {
  return (
    <div className='section-container my-16'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
                    <div className='md:w-1/2'>
                    <div className='text-left md:w-4/5'>
                        <p className='subtitle'>Our Story and Services</p>
                        <h2 className='title'>Our Culinary Journey And Services</h2>
                        <p className='my-5 text-secondary leading-[30px]'>
                            "Rooted in passion, we curate unforgettable dining experience and offer exceptional services, blending culinary aritistry with warm hospitality"
                        </p>
                        <button className='btn bg-green text-white px-8 rounded-full py-3'>Explore</button>
                    </div>
                    </div>
                    <div className='md:w-1/2'>
                    <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
                        {serviseList.map((service)=>{
                            return <div key={service.id} className='shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border-indigo-600 transition-all duration-200 hover:border'>
                                <img src={service.image}></img>
                                <h5 className='pt-3 font-semibold'>{service.title}</h5>
                                <p className='text-[#90BD95]'>{service.des}</p>
                            </div>
                        })}
                    </div>
                    </div>
                </div>
    </div>
  )
}

export default Service