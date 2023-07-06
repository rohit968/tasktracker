import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import TotalNumberofTasks from "../components/totalnumberoftasks/TotalNumberofTasks";

const Adminpage = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const graphRef = useRef();

  useEffect(() => {
    const allusers = async () => {
      const result = await axios.get("/users");
      setUsers(result.data);
    };
    allusers();
  }, []);

  useEffect(() => {
    axios.get("/alltasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  return (
    <div className="flex justify-center items-center">
      <TotalNumberofTasks tasks={tasks} users={users} graphRef={graphRef} />
    </div>
  );
};

export default Adminpage;
