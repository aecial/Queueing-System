import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Window = () => {
  const navigate = useNavigate();
  const { department } = useParams();
  const [socket, setSocket] = useState(null);
  const [now, setNow] = useState({});
  const [testItems, setTestItems] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [office, setOffice] = useState({});
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    // Create a new WebSocket connection when the component mounts
    const newSocket = io.connect("http://192.168.1.19:8080");
    setSocket(newSocket);

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);
  const getOffices = async () => {
    try {
      const response = await fetch(`/api/offices`);
      const windowApi = await response.json();
      setOffices(windowApi.offices);
      console.log(offices);
    } catch (error) {
      console.error(error);
    }
  };
  const firstReceiveTicket = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tickets/${department}`);
      const tickets = await response.json();
      setTestItems(tickets.tickets);
      const officeResponse = await fetch(`/api/department/${department}`);
      const resOffice = await officeResponse.json();
      setOffice({
        office: resOffice.dept.office.name,
        windowId: resOffice.dept.id,
        window: resOffice.dept.name,
      });
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const servingChecker = async () => {
    try {
      const response = await fetch(`/api/department/${department}`);
      const dept = await response.json();
      if (dept.dept.now_serving) {
        const rawNowServing = dept.dept.now_serving;
        const nowServing = rawNowServing.split("-");
        setNow({ id: nowServing[0].trim(), name: nowServing[1].trim() });
      } else {
        return;
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  const receiveTicket = async () => {
    try {
      const response = await fetch(`/api/tickets/${department}`);
      const tickets = await response.json();
      setTestItems(tickets.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  useEffect(() => {
    firstReceiveTicket();
    servingChecker();
    getOffices();
  }, []);
  useEffect(() => {
    if (socket) {
      // Join room
      socket.emit("join_room", department);

      // Listen for ticket updates
      socket.on("receive_ticket", () => {
        receiveTicket();
      });

      // Clean up event listener
      return () => {
        socket.removeAllListeners("receive_ticket");
      };
    }
  }, [socket, department]);
  function addTime(time) {
    console.log(time);
    socket.emit("add_time", { time, department });
  }
  function transferTicket(winId) {
    stopTimer();
    socket.emit("transfer_ticket", { transferId: winId, ticket: now.name });
    handleClick();
    document.getElementById("transfer_modal").close();
  }
  const handleClick = () => {
    if (testItems.length === 0) {
      logTime(); // Log time before reset
      setNow({});
      if (socket) {
        socket.emit("display_unified_ticket", {
          name: "",
          number: "",
          department,
        });
        socket.emit("remove_unified_ticket", { department });
      }
      setElapsedTime(0);
      return;
    } else {
      setNow(testItems[0]);
      if (socket) {
        socket.emit("display_unified_ticket", {
          name: testItems[0].name,
          number: testItems[0].id,
          department,
        });
      }
      socket.emit("remove_ticket", { id: testItems[0].id });
      setTestItems((prevItems) => prevItems.slice(1));
      logTime();
      startTimer(); // Start the timer
    }
  };

  const startTimer = () => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000;
      setElapsedTime(elapsedTime.toFixed(2));
    }, 10);
    setTimer(interval);
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const logTime = () => {
    if (elapsedTime === 0) {
      return;
    }
    console.log("Elapsed Time:", elapsedTime, "seconds");
    addTime(elapsedTime);
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white text-3xl">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-2">
          <div className="h-auto mb-10">
            <div className="flex flex-col w-full items-center justify-center mb-7 pt-6">
              <div className="flex justify-between w-full px-4">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/window")}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                    />
                  </svg>
                  Back
                </button>
                <h1>{office.office} OFFICE</h1>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/logout")}
                >
                  Logout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                </button>
              </div>
              <div className="divider"></div>
              <h3 className="text-4xl text-red-500 underline underline-offset-2">
                Window {office.window}
              </h3>
            </div>

            {now !== null || {} ? (
              <div className="flex justify-center gap-10 items-center ">
                <div className="card w-96 bg-base-100 shadow-xl image-full block ml-[150px]">
                  <figure>
                    <img
                      src="https://images.pexels.com/photos/7232830/pexels-photo-7232830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body text-white">
                    <h2 className="text-center text-white">{now.name}</h2>
                  </div>
                </div>
                {Object.keys(now).length !== 0 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      document.getElementById("transfer_modal").showModal()
                    }
                  >
                    Transfer
                  </button>
                ) : (
                  <button className="invisible btn btn-primary">
                    Transfer
                  </button>
                )}
              </div>
            ) : (
              <span></span>
            )}
            <dialog id="transfer_modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-2xl">Transfer Ticket</h3>
                <div className="divider"></div>
                <p className="py-4 text-xl">
                  Which window would you like to transfer the ticket?
                </p>
                <div className="flex flex-col">
                  {offices.map((data) => {
                    return (
                      <div key={data.id}>
                        <h1 className="text-xl text-center">{data.name}</h1>

                        <div className="grid grid-cols-3 gap-3">
                          {data.department.map((win) => {
                            return win.id === office.windowId ? (
                              ""
                            ) : (
                              <button
                                key={win.id}
                                className="btn btn-primary"
                                onClick={() => transferTicket(win.id)}
                              >
                                {win.name}
                              </button>
                            );
                          })}
                        </div>
                        <div className="divider"></div>
                      </div>
                    );
                  })}
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn text-white">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            <h2 className="text-center"> NOW SERVING</h2>
          </div>
          <div className="flex flex-col h-56 overflow-y-scroll border">
            {testItems.map((item) => {
              return (
                <div>
                  <p key={item.id}>{item.name}</p>
                  <div className="divider"></div>
                </div>
              );
            })}
          </div>
          {testItems.length === 0 && Object.keys(now).length === 0 ? (
            <button
              onClick={handleClick}
              className="border border-white p-1 w-full disabled:bg-red-600 "
              disabled
            >
              No Tickets Yet
            </button>
          ) : (
            <div className="flex justify-center items-center">
              <button
                onClick={() => {
                  stopTimer();
                  handleClick();
                }}
                className="btn btn-primary w-[30%] text-2xl mt-2"
              >
                {Object.keys(now).length === 0
                  ? "Start"
                  : testItems.length === 0 && Object.keys(now).length === 0
                  ? "No Tickets Yet"
                  : testItems.length === 0
                  ? "Done"
                  : "Next"}
              </button>
            </div>
          )}
          <p className="hidden">Elapsed Time: {elapsedTime} seconds</p>
        </div>
      )}
    </div>
  );
};

export default Window;
