import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
const Cards = ({ item }) => {
  const [isHeartFilled, SetHeartFilled] = useState(false);

  const handleHEartClick = () => {
    SetHeartFilled(!isHeartFilled);
  };
  return (
    <div className="text-black">
      <div className="card bg-base-100 w-96 shadow-xl relative rounded-lg">
        <div
          className={`rating gap-1 absolute right-2 top-2 p-4 heartStart bg-green ${
            isHeartFilled ? "text-rose-500" : "text-white"
          }`}
          onClick={handleHEartClick}>
          <FaHeart className="h-5 w-5 bg-green cursor-pointer"></FaHeart>
        </div>
        <Link to={`/menu/${item._id}`}>
          <figure>
            <img
              src={item.image}
              alt="Shoes"
              className="hover:scale-105 transition-all duration-200 md:h-72"
            />
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/menu/${item._id}`}>
            <h2 className="card-title text-black">{item.name}</h2>
          </Link>
          <p>Description of the food</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">
              <span className="text-sm text-red">$</span>
              {item.price}
            </h5>
            <button className="btn bg-green text-white">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
