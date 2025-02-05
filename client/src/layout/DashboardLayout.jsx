import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaShoppingBag,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Modal from "../components/Modal";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard></MdDashboard>
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping></FaCartShopping>
        Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow></FaLocationArrow>
        Order Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaQuestionCircle></FaQuestionCircle>
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin === false) {
      navigate("/login", { replace: true });
    }
  }, [isAdmin, isAdminLoading, navigate]);
  return (
    <div>
      {isAdmin ? (
        <div className="text-black">
          <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
              {/* Page content here */}
              <div className="flex items-center justify-between mx-4">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button sm:hidden">
                  <MdDashboardCustomize></MdDashboardCustomize>
                </label>
                <button className="btn rounded-full px-6 bg-green sm:hidden">
                  Logout
                </button>
              </div>
              <div className="mt-5 md:mt-2 mx-4">
                <Outlet></Outlet>
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li className="mb-2">
                  <Link to="/" className="flex justify-start">
                    <img src="/logo.png" className="w-20"></img>
                    <div className="badge badge-primary">Admin</div>
                  </Link>
                </li>
                <hr></hr>
                <li className="mt-3">
                  <Link to="/dashboard">
                    <MdDashboard></MdDashboard>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaShoppingBag></FaShoppingBag>
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaPlusCircle></FaPlusCircle>
                    Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaEdit></FaEdit>
                    Manage Items
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/users">
                    <FiUsers />
                    All Users
                  </Link>
                </li>
                <hr className="mt-2"></hr>
                {sharedLinks}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DashboardLayout;
