import { useContext, useEffect, useState } from "react";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const RegisterLogin = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [modal, setModal] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setModal(true);
    }
  }, [isLoggedIn, navigate]);

  const handleNavigation = () => {
    setModal(false);
    navigate("/");
  };

  return (
    <main className="bg-sky-800  h-screen flex justify-center items-center relative -mt-10">
      <section className=" bg-white mt-10 rounded-md w-3/4 md:w-3/5 lg:w-1/4 ">
        {showRegistrationForm ? (
          <Register setShowRegistrationForm={setShowRegistrationForm} />
        ) : (
          <Login setShowRegistrationForm={setShowRegistrationForm} />
        )}
      </section>
      {modal && (
        <div className="bg-white  h-5/6 w-full md:w-5/6 sm:w-5/6 opacity-90 text-white p-20 rounded-md flex justify-center items-center absolute z-99">
          <p className="text-red-500 text-7xl">You are already Logged In</p>
          <button
            onClick={handleNavigation}
            className="absolute top-5 right-5 cursor-pointer text-red-500 text-lg"
          >
            Close
          </button>
        </div>
      )}
    </main>
  );
};

export default RegisterLogin;
