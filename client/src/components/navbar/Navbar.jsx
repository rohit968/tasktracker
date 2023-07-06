import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";

const Navbar = () => {
  const { userData, setUserData, setIsLoggedIn, isLoggedIn } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("/logout");
    setUserData(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  console.log(userData);

  const image = `http://localhost:4001/uploads/${userData?.photo}`;
  const profileLetter = userData?.name.split("")[0].toUpperCase();
  console.log(profileLetter);

  return (
    <div className="flex justify-between px-2 md:px-8 lg:px-4 items-center bg-sky-900 text-white py-2 z-10 sticky top-0 w-full lg:py-0">
      <div className="text-xl md:text-2xl">Task</div>
      <div className="flex gap-2 md:gap-4 items-center">
        <Link to={`${isLoggedIn ? "/profile" : "/"}`} />
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="text-sm md:text-base">
              Profile
            </Link>
            <p
              onClick={handleLogout}
              className="cursor-pointer text-sm md:text-base"
            >
              Logout
            </p>
            <Link
              to="/taskform"
              className="bg-red-500 py-1 px-1.5 md:px-2 rounded-md text-sm"
            >
              + Add New Task
            </Link>
            {image === undefined ? (
              <div className="h-10 w-10">
                <img
                  src={image}
                  className="h-full w-full object-cover rounded-full"
                  alt="user profile pic"
                />
              </div>
            ) : (
              <div className="border-2 border-black py-2 px-3.5 bg-white text-black border-none rounded-full">
                {profileLetter}
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
