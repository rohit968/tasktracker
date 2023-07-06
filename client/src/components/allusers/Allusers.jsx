import axios from "axios";
import { useEffect } from "react";

const Allusers = ({
  assign,
  setAssign,
  assignError,
  setAssignError,
  setMainError,
  users,
  setUsers,
}) => {
  useEffect(() => {
    const allusers = async () => {
      const result = await axios.get("/users");
      setUsers(result.data);
    };
    allusers();
  }, [setUsers]);

  return (
    <div className="my-5">
      <label htmlFor="assign" className="block text-sm">
        Assign to User
      </label>
      <select
        id="assign"
        value={assign}
        className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
        onChange={(e) => {
          setAssign(e.target.value);
          setAssignError("");
          setMainError("");
        }}
      >
        <option value="">Select User</option>
        {users?.map((user) => (
          <option value={user.name}>{user.name}</option>
        ))}
      </select>
      {assignError && <p className="text-red-500 mb-3 mt-1">{assignError}</p>}
    </div>
  );
};

export default Allusers;
