import React, { useEffect, useState } from "react";
import socket from "../lib/socket";
import SmallLoader from "../components/SmallLoader";
function generateRandomName() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 5;
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);
  let randomName = "";
  for (let i = 0; i < length; i++) {
    randomName += characters.charAt(randomValues[i] % characters.length);
  }
  return randomName;
}

const Kiosk = () => {
  const [department, setDepartment] = useState(0);
  const [windows, setWindows] = useState([]);
  const [alertView, setAlertView] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingWindows, setLoadingWindows] = useState(false);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [response, setResponse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [randomName, setRandomName] = useState(generateRandomName());
  const [selectedOffice, setSelectedOffice] = useState();

  const resetState = () => {
    setDepartment(0);
    setAlertView(false);
    setResponse(null);
    setModalOpen(false);
    setRandomName(generateRandomName());
    setSelectedOffice();
    setLoading(false);
    setLoadingWindows(false);
    setLoadingResponse(false);
  };

  useEffect(() => {
    async function getOffices() {
      setLoading(true);
      try {
        const response = await fetch("/api/offices");
        const departments = await response.json();
        setDepartments(departments.offices);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getOffices();
  }, []);

  useEffect(() => {
    setRandomName(generateRandomName());
  }, []);

  useEffect(() => {
    socket.off("response");
    socket.on("response", function (data) {
      setResponse(data);
      setLoadingResponse(false);
      setModalOpen(true);
    });
  }, []);

  const sendTicket = (dept) => {
    if (dept === 0) {
      setAlertView(true);
      setTimeout(() => {
        setAlertView(false);
      }, 5000);
    } else {
      setLoadingResponse(true);
      socket.emit("create_ticket", { name: randomName, department: dept });
      // resetState(); // Reset state after sending ticket
    }
  };

  const closeModal = () => {
    resetState(); // Reset state on modal close
  };
  const handleSelectOffice = (officeId) => {
    setSelectedOffice(officeId);
    async function getWindows() {
      setLoadingWindows(true);
      try {
        const response = await fetch(`/api/deptByOffice/${officeId}`);
        const information = await response.json();
        setWindows(information.department);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingWindows(false);
      }
    }
    getWindows();
  };
  const handleSend = (dept) => {
    setDepartment(dept);
    sendTicket(dept);
  };
  useEffect(() => {
    const handleSocketError = (error) => {
      if (error.code === "ECONNRESET") {
        console.error("Socket connection reset:", error.message);
      } else {
        console.error("Socket error:", error.message);
      }
    };
    socket.on("error", handleSocketError);

    return () => {
      socket.off("error", handleSocketError);
    };
  }, []);

  return (
    <div className="bg-slate-200 text-white min-h-screen w-screen overflow-hidden flex flex-col  items-center p-5">
      <div className="avatar flex flex-col gap-10">
        <div className="absolute left-[-550px] z-[1] w-60 mx-auto rounded-full ring ring-warning ring-offset-base-100 ring-offset-2">
          <img src="/OIP.jpeg" alt="LGU-LOGO" />
        </div>
        <h1 className="text-4xl text-black font-bold">
          LGU-GERONA QUEUEING SYSTEM
        </h1>
      </div>
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
          <span>Warning: Select a Window</span>
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
          <div className="modal-box bg-slate-100 text-black">
            <h3 className="font-bold text-4xl text-center">
              {response.office} OFFICE
            </h3>
            <div className="divider"></div>
            <h3 className="font-bold text-center mt-10 text-2xl text-red-500">
              Window: {response.departmentId}
            </h3>
            <h2 className="py-4 mt-4 text-[50px] border-2 border-black text-center">
              {response.name}
            </h2>
            <h3 className="font-bold text-center mt-4 text-xl">
              Purpose: {response.departmentDescription}
            </h3>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-success text-white"
                  onClick={closeModal}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
      {loadingResponse ? (
        <SmallLoader />
      ) : (
        <div className="w-screen flex flex-col items-center gap-3 z-10">
          {selectedOffice ? (
            <div className="text-black pt-5">
              {loadingWindows ? (
                <SmallLoader />
              ) : (
                <>
                  <h1 className="text-3xl text-center mb-10">SELECT WINDOW</h1>
                  <div className="grid grid-cols-3 gap-10">
                    {windows.map((window) => {
                      return (
                        <div className="flex flex-col">
                          <button
                            key={window.id}
                            onClick={() => handleSend(window.id)}
                            className="btn btn-success uppercase text-4xl text-white w-80 h-32 flex flex-col"
                          >
                            {window.name}

                            <span className=" text-xl">
                              ({window.description})
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="btn btn-primary w-44 mt-10"
                    onClick={resetState}
                  >
                    Back
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="text-black pt-32">
              {loading ? (
                <SmallLoader />
              ) : (
                <>
                  <h1 className="text-3xl text-center mb-10">SELECT OFFICE:</h1>
                  <div className="grid grid-cols-3 gap-10 z-10">
                    {departments.map((info) => {
                      return (
                        <button
                          key={info.id}
                          onClick={() => handleSelectOffice(info.id)}
                          className="btn btn-success uppercase text-4xl text-white w-56 h-24"
                        >
                          {info.name}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Kiosk;
