import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrash, FaUser, FaUsers } from "react-icons/fa";

const Users = () => {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:6001/users`);
      return res.json();
    },
  });
  const isAdmin = false;
  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users:{users.length}</h5>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rouded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, id) => {
                return (
                  <tr>
                    <th>{id + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button className="btn btn-xs btn-circle bg-indigo-500 text-white bg-white">
                          <FaUsers></FaUsers>
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-xs bg-red text-white"
                        onClick={() => handleDelete(user)}>
                        <FaTrash></FaTrash>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
