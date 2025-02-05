import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      if (!user?.email) return false; // Prevents unnecessary API calls
      try {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data?.admin;
      } catch (error) {
        console.error("Error fetching admin status:", error);
        return false;
      }
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
