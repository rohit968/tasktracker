import React from "react";

const TaskStatus = ({
  status,
  setStatus,
  statusError,
  setMainError,
  setStatusError,
}) => {
  return (
    <div className="my-5">
      <label htmlFor="status" className="block text-sm">
        Status for the task
      </label>
      <div className="flex justify-center items-center space-x-2">
        <input
          type="radio"
          id="assigned"
          value="Assigned"
          checked={status === "Assigned"}
          className="sr-only"
          onChange={(e) => {
            setStatus(e.target.value);
            setStatusError("");
            setMainError("");
          }}
        />
        <label
          htmlFor="assigned"
          className={`bg-green-700 border border-gray-300 text-white rounded-md mb-2 px-3 py-1 cursor-pointer text-sm w-1/2 text-center ${
            status === "Assigned" ? "ring-2 ring-green-700" : ""
          }`}
        >
          Assigned
        </label>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <input
          type="radio"
          id="workInProgress"
          value="Work in Progress"
          checked={status === "Work in Progress"}
          className="sr-only"
          onChange={(e) => {
            setStatus(e.target.value);
            setStatusError("");
            setMainError("");
          }}
        />
        <label
          htmlFor="workInProgress"
          className={`bg-yellow-500 border  border-gray-300 text-white rounded-md mb-2 px-3 py-1 cursor-pointer text-sm w-1/2 text-center ${
            status === "Work in Progress" ? "ring-2 ring-yellow-600" : ""
          }`}
        >
          Work in Progress
        </label>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <input
          type="radio"
          id="completed"
          value="Completed"
          checked={status === "Completed"}
          className="sr-only"
          onChange={(e) => {
            setStatus(e.target.value);
            setStatusError("");
            setMainError("");
          }}
        />
        <label
          htmlFor="completed"
          className={`bg-blue-500 border border-gray-300 text-white rounded-md mb-2 px-3 py-1 cursor-pointer text-sm w-1/2 text-center ${
            status === "Completed" ? "ring-2 ring-blue-600" : ""
          }`}
        >
          Completed
        </label>
      </div>
      {statusError && <p className="text-red-500 mb-3 mt-1">{statusError}</p>}
    </div>
  );
};

export default TaskStatus;
