import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
const Cards = ({ item }) => {
  const [isHeartFilled, SetHeartFilled] = useState(false);
  const { name, image, price, recipe, _id } = item;
  const handleHEartClick = () => {
    SetHeartFilled(!isHeartFilled);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const handleCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quatity: 1,
        image,
        price,
        email: user.email,
      };
      fetch("http://localhost:7781/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.menuItemId) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item added to cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Without an account can't add products",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Up",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
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
            <button
              className="btn bg-green text-white"
              onClick={() => handleCart(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
