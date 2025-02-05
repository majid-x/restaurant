import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:7781",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      console.log(token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response, // ✅ Fixed: Changed from `request.use` to `response.use`
    async (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        console.error("Unauthorized! Logging out...");
        await logout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
