import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Card from "../components/card/Card";
import { Link } from "react-router-dom";
import Adminpage from "./Adminpage";

const Profile = () => {
  const { userData } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (userData?.userId) {
      axios
        .get("/tasks", { params: { userId: userData?.userId } })
        .then((res) => {
          setTasks(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userData?.userId, deleted]);

  const filteredTasks =
    status === "" ? [...tasks] : tasks.filter((task) => task.status === status);

  return (
    <div className="h-screen bg-sky-800 text-white pt-10">
      {userData?.name !== "admin" ? (
        <>
          <h1
            className="text-center text-2xl "
            style={{ textTransform: "capitalize" }}
          >
            {userData?.name}'s tasks
          </h1>
          <div className="px-4 mt-4 flex gap-4 text-sm">
            <div
              className="h-8 w-10 rounded-lg flex items-center justify-center bg-red-700 cursor-pointer"
              onClick={() => setStatus("")}
            >
              All
            </div>
            <div
              className="h-8 w-20 rounded-lg flex items-center justify-center bg-green-700 cursor-pointer"
              onClick={() => setStatus("Assigned")}
            >
              Assigned
            </div>
            <div
              className="h-8 w-32 rounded-lg flex items-center justify-center bg-yellow-500 cursor-pointer"
              onClick={() => setStatus("Work in Progress")}
            >
              Work in Progress
            </div>
            <div
              className="h-8 w-20   rounded-lg flex items-center justify-center bg-blue-500 cursor-pointer"
              onClick={() => setStatus("Completed")}
            >
              Completed
            </div>
          </div>

          <div className="flex gap-2 my-4 flex-wrap justify-center mt-10">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Card task={task} key={task._id} setDeleted={setDeleted} />
              ))
            ) : (
              <p>
                No task to display.
                <Link to="/taskform" className="text-red-500">
                  {" "}
                  Add task
                </Link>{" "}
                by clicking the button
              </p>
            )}
          </div>
        </>
      ) : (
        <Adminpage tasks={tasks} />
      )}
    </div>
  );
};

export default Profile;
