import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { replace, useLocation, useNavigate } from "react-router-dom";

const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate;
  const from = location.state?.from?.pathname || "/S";
  const handleLogout = () => {
    logout()
      .then(() => {
        alert("logout successful");
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };
  return (
    <div>
      <div className="drawer drawer-end flex space-x-2">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {user.photoURL ? (
              <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
            ) : (
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            )}
          </div>
        </div>
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="btn btn-primary"
            onClick={handleLogout}>
            Logout
          </label>
        </div>
      </div>
    </div>
  );
};

export default Profile;
