import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const calculatePrice = (item) => {
    return item.price * item.quatity;
  };

  const subTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);
  const handleDecrease = (item) => {
    if (item.quatity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ quatity: item.quatity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quatity: cartItem.quatity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          //setCartItems(updatedCart);
        });
    } else {
      alert("items cant be zero");
    }
  };
  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ quatity: item.quatity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quatity: cartItem.quatity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        //setCartItems(updatedCart);
      });
    refetch();
  };
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(item._id);
        fetch(`http://localhost:6001/carts/${item._id}`, {
          // Ensure correct API URL
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.error("Error:", err));
      }
    });
  };
  return (
    <div className="section-container">
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col items-center justify-center gap-8">
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold text-black md:leading-snug leading-snug">
              Items Added to the <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-black rounded-sm">
              <tr className="bg-green">
                <th className="">#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => {
                return (
                  <tr className="text-black" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-black font-medium">{item.name}</td>
                    <td className="text-black bg-white">
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}>
                        -
                      </button>
                      <input
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                        type="number"
                        value={item.quatity}></input>
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}>
                        +
                      </button>
                    </td>
                    <td className="text-black">
                      {calculatePrice(item).toFixed(2)}
                    </td>
                    <th>
                      <button
                        className="btn btn-ghost text-red btn-xs"
                        onClick={() => handleDelete(item)}>
                        <FaTrash></FaTrash>
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-black">Customer Details</h3>
          <p className="text-black">Name: {user?.displayName}</p>
          <p className="text-black">Email: {user?.email}</p>
          <p className="text-black">User_id: {user?.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-black">Shopping Details</h3>
          <p className="text-black">Total Items: {cart.length}</p>
          <p className="text-black">Total Price {subTotal.toFixed(2)}</p>
          <button className="btn bg-green text-white">Proceed Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
