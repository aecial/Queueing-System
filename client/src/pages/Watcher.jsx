import socket from "../lib/socket";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
const Watcher = () => {
  const { department } = useParams();
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getDepartments() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/departments`);
      const departments = await response.json();
      setDepartments(departments.departments);
    } catch (error) {
      console.error("Error fetching Department:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getDepartments();
  }, []);
  function joinRoom() {
    socket.emit("join_room", department);
  }
  useEffect(() => {
    joinRoom();
  }, []);
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  useEffect(() => {
    function projectTicket(number, name) {
      if (number === 0) {
        setName("");
        setNumber("");
      } else {
        setName(name);
        setNumber(number);
      }
    }
    socket.on("project_ticket", (data) => {
      projectTicket(Number(data.number), String(data.name));
    });
    return () => {
      socket.removeAllListeners("project_ticket");
    };
  }, [name]);
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5 flex flex-col gap-10 items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-4xl text-center flex gap-4">
            {departments.map((item) => {
              if (item.id == department) {
                return <p>{item.name}</p>;
              }
            })}
            Watcher
          </h1>
          <h1 className="text-2xl text-center">NOW SERVING :</h1>
          <p className="text-[150px]">
            {number} - {name}
          </p>
        </>
      )}
    </div>
  );
};

export default Watcher;
