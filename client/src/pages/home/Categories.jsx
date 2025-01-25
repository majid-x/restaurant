import React from 'react'
const categoryItems = [
    {id:1, title:"Main Dish",des:"(86 dishes)", img:"/images/home/category/img1.png"},
    {id:2, title:"Break Fast",des:"(12 break fast)", img:"/images/home/category/img2.png"},
    {id:3, title:"Dessert",des:"(48 desserts)", img:"/images/home/category/img3.png"},
    {id:4, title:"Browse All",des:"(255 Items)", img:"/images/home/category/img4.png"},
]
const Categories = () => {
  return (
    <div className='section-container py-16 bg-white'>
        <div className='text-center'>
            <p className='subtitle'>Customer Favorites</p>
            <h2 className='title'>Popular Categories</h2>
        </div>
        <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center'>
            {
                categoryItems.map((item,i)=>{
                    return <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all'>
                        <div className='flex w-full justify-center'>
                            <img src={item.img} className='bg-[#C1F1F6] rounded-full p-5 w-28 h-28'></img>
                        </div>
                        <div className='mt-5 space-y-1 text-black'>
                            <h5 className='text-black'>{item.title}</h5>
                            <p className='text-black'>{item.des}</p>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Categories