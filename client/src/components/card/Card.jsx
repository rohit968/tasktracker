import axios from "axios";
import React from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Card = ({ task, setDeleted }) => {
  const { title, description, duedate, status } = task;
  const navigate = useNavigate();

  const color =
    status === "Assigned"
      ? "border-green-700"
      : status === "Work in Progress"
      ? "border-yellow-500"
      : status === "Completed"
      ? "border-blue-500"
      : "";

  const date = duedate.split("T")[0];
  const [year, month, day] = date.split("-");
  const reversedDate = `${day}-${month}-${year}`;

  const handleEdit = () => {
    navigate(`/edit/${task._id}`);
  };

  const handleDelete = () => {
    try {
      axios.delete(`/delete/${task?._id}`).then(() => {
        setDeleted(true);
        navigate("/profile");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`w-44 h-40 rounded-lg p-2 flex flex-col justify-between bg-white text-black border-t-8 border-2 ${color}`}
    >
      <div>
        <h1 className="text-base mb-2 ">{title}</h1>
        <p className="text-slate-700 text-sm line-clamp-3">{description}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs">Due: {reversedDate}</p>
        <div className="flex  gap-2">
          <AiOutlineEdit
            className="bg-cyan-500 text-white rounded-md h-6  w-6 p-0.5 cursor-pointer"
            onClick={handleEdit}
          />
          <AiOutlineDelete
            className="bg-red-500 text-white rounded-md h-6  w-6 p-0.5 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
