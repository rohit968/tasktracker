import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUpload } from "react-icons/hi";
import { UserContext } from "../../UserContext";
import axios from "axios";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [mainError, setMainError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [logging, setLogging] = useState(false);
  const [imageData, setImageData] = useState(null);

  const { setUserData, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name
    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // If all validations pass, submit the form
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("filename", photo);
    formData.append("password", password);

    //Sending the data to the backend
    await axios
      .post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUserData(res.data);
        setLogging(true);
        setTimeout(() => {
          navigate("/profile");
          setIsLoggedIn(true);
        }, 4000);
      })
      .catch((error) => {
        setMainError(error.response?.data?.message);
      });

    //Setting all the fields to blank
    setName("");
    setEmail("");
    setPhoto(null);
    setPassword("");
    setConfirmPassword("");
  };

  const handleError = () => {
    setMainError("");
  };

  const handlePhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <form className="p-5 " onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl">Register for your account</h1>
        {mainError && (
          <p
            className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5  py-1 rounded-md text-sm"
            onClick={handleError}
          >
            {mainError}
          </p>
        )}
        {logging && (
          <p className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5  py-1 rounded-md text-sm">
            {logging} Registering...
          </p>
        )}
        <div className="my-5">
          <label htmlFor="name" className="block text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
              setMainError("");
            }}
          />
          {nameError && <p className="text-red-500 mb-3 mt-1">{nameError}</p>}
        </div>

        <div className="my-5">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setMainError("");
            }}
          />
          {emailError && <p className="text-red-500 mb-3 mt-1">{emailError}</p>}
        </div>

        <div className={photo ? "my-5 flex gap-2" : "my-5"}>
          {photo && (
            <div className="h-16 w-28">
              <img
                src={imageData}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <label
            htmlFor="photo"
            className="flex items-center gap-1 shadow-lg px-3 py-1 cursor-pointer text-sm"
          >
            <HiOutlineUpload />
            Upload a profile picture
          </label>
          <input
            type="file"
            id="photo"
            className="hidden"
            onChange={(e) => handlePhoto(e)}
          />
        </div>

        <div className="my-5">
          <label htmlFor="password" className="block text-sm">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
              setMainError("");
            }}
          />
          {passwordError && (
            <p className="text-red-500 mb-3 mt-1">{passwordError}</p>
          )}
        </div>

        <div className="my-5">
          <label htmlFor="confirmPassword" className="block text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError("");
              setMainError("");
            }}
          />
          {confirmPasswordError && (
            <p className="text-red-500 mb-3 mt-1">{confirmPasswordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="my-3 py-2 bg-red-500 rounded-sm w-full text-white"
        >
          Register
        </button>
        <h2 className="text-center text-sm">
          Already have an account?
          <Link
            to="/"
            className="underline ml-1"
            onClick={() => props.setShowRegistrationForm(false)}
          >
            Login
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default Register;
