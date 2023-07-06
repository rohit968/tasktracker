import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { userData } = useContext(UserContext);
  return (
    <div className="text-center bg-sky-800 h-screen text-white py-10">
      <h1 className="text-2xl">Welcome {userData?.name} </h1>
      <Link
        to="/taskform"
        className="bg-red-500 px-2 py-1.5 rounded-lg block w-fit mx-auto my-4"
      >
        + ADD new task
      </Link>
    </div>
  );
};

export default UserPage;
