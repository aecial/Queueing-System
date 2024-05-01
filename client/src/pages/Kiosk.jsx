import React, { useEffect, useState } from "react";
import socket from "../lib/socket";
const Kiosk = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(0);
  const [alertView, setAlertView] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [response, setResponse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    async function getDepartments() {
      const response = await fetch("/api/departments");
      const departments = await response.json();
      setDepartments(departments.departments);
    }
    getDepartments();
  }, []);
  useEffect(() => {
    socket.off("response");

    socket.on("response", function (data) {
      setResponse(data);
      setModalOpen(true);
    });
  }, []);
  const sendTicket = () => {
    // console.log(department);
    // alert(`${name} - ${number}`);
    if (department === 0 || name === "") {
      console.log("return");
      setAlertView(true);
      setTimeout(() => {
        setAlertView(false);
      }, 5000);
    } else {
      socket.emit("create_ticket", { name, department });
      setName("");
      setDepartment(0);
    }
  };
  return (
    <div className="bg-gray-800 text-white min-h-screen p-5">
      <h1 className="text-4xl text-center">Kiosk</h1>
      {alertView ? (
        <div role="alert" className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Warning: Incomplete Details</span>
          <button
            onClick={() => setAlertView(false)}
            className="btn btn-sm btn-outline text-red-500 hover:text-white hover:bg-red-500"
          >
            X
          </button>
        </div>
      ) : (
        ""
      )}
      {response && (
        <dialog
          id="my_modal_5"
          className={
            "modal " +
            (modalOpen ? "modal-open" : "modal-close") +
            " modal-bottom sm:modal-middle"
          }
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              You have created a new Ticket!
            </h3>
            <h2 className="py-4 mt-4 text-4xl">
              #{response.id} - {response.name}
            </h2>
            <p className="text-red-500">
              Take a picture or write down your ticket
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" onClick={() => setModalOpen(false)}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
      <div className="min-w-screen flex flex-col p-20 items-center justify-center gap-3">
        <select
          className="select select-primary w-full max-w-xs"
          name="department"
          id="department"
          value={department}
          onChange={(e) => setDepartment(Number(e.target.value))}
        >
          <option value={0} disabled>
            SELECT A DEPARTMENT
          </option>
          {departments.map((departmentInfo) => {
            return (
              <option value={departmentInfo.id}>{departmentInfo.name}</option>
            );
          })}
        </select>
        <label
          htmlFor="name"
          className="input input-bordered input-primary flex items-center gap-2 w-full max-w-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            name="name"
            id="name"
            className="grow w-10"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button onClick={sendTicket} className="btn btn-primary w-[20%]">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Kiosk;
