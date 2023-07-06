import React, { useState } from "react";
import Allusers from "../allusers/Allusers";
import TaskStatus from "../taskstatus/TaskStatus";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Taskform = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [status, setStatus] = useState(null);
  const [assign, setAssign] = useState(null);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    duedate: "",
    status: "",
    assign: "",
    main: "",
    adding: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: !title.trim() ? "Title is required" : "",
      description: !description.trim() ? "Description is required" : "",
      duedate: !duedate ? "Due date is required" : "",
      status: !status ? "Select the status of the task" : "",
      assign: assign.length <= 0 ? "Select a user to assign the task" : "",
      main: "",
      adding: "",
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("/addtask", {
        title,
        description,
        duedate,
        status,
        assign,
        assignedUserId: users.find((user) => user.name === assign)?._id,
      });
      setErrors({ ...newErrors, adding: true });
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setDuedate("");
        setStatus(null);
        setAssign(null);
        setErrors({ ...newErrors });
        navigate("/profile");
      }, 4000);
    } catch (error) {
      setErrors({ ...newErrors, main: error.response?.data?.message });
    }
  };

  const handleError = () => {
    setErrors({ ...errors, main: "" });
  };

  return (
    <section className="bg-sky-800  h-screen flex flex-col justify-center items-center relative -mt-10">
      <h1 className="text-white text-3xl">Create a new task</h1>
      <form
        className="bg-white mt-10 px-4 rounded-md w-5/6 md:w-3/5 lg:w-1/4"
        onSubmit={handleSubmit}
      >
        {errors.main && (
          <p
            className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5 py-1 rounded-md text-sm"
            onClick={handleError}
          >
            {errors.main}
          </p>
        )}
        {errors.adding && (
          <p className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5 py-1 rounded-md text-sm">
            {errors.adding} Adding the Task...
          </p>
        )}
        <div className="my-5">
          <label htmlFor="title" className="block text-sm">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: "", main: "" });
            }}
          />
          {errors.title && (
            <p className="text-red-500 mb-3 mt-1">{errors.title}</p>
          )}
        </div>

        <div className="my-5">
          <label htmlFor="description" className="block text-sm">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: "", main: "" });
            }}
          />
          {errors.description && (
            <p className="text-red-500 mb-3 mt-1">{errors.description}</p>
          )}
        </div>

        <div className="my-5">
          <label htmlFor="duedate" className="block text-sm">
            Due Date
          </label>
          <input
            type="date"
            id="duedate"
            value={duedate}
            className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              setDuedate(e.target.value);
              setErrors({ ...errors, duedate: "", main: "" });
            }}
          />
          {errors.duedate && (
            <p className="text-red-500 mb-3 mt-1">{errors.duedate}</p>
          )}
        </div>

        <TaskStatus
          status={status}
          setStatus={setStatus}
          statusError={errors.status}
          setStatusError={(statusError) =>
            setErrors({ ...errors, status: statusError, main: "" })
          }
          setMainError={(mainError) =>
            setErrors({ ...errors, main: mainError })
          }
        />

        <Allusers
          assign={assign}
          setAssign={setAssign}
          assignError={errors.assign}
          setAssignError={(assignError) =>
            setErrors({ ...errors, assign: assignError, main: "" })
          }
          setMainError={(mainError) =>
            setErrors({ ...errors, main: mainError })
          }
          users={users}
          setUsers={setUsers}
        />

        <button
          type="submit"
          className="bg-red-500 py-1 px-2 text-white rounded-sm block mx-auto mb-5"
        >
          Add task
        </button>
      </form>
    </section>
  );
};

export default Taskform;
