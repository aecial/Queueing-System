import { useState } from "react";
const EmployeeManagerRow = ({
  id,
  username,
  office,
  officeId,
  updateUsersList,
}) => {
  const [currentOffice, setCurrentOffice] = useState(officeId);
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [confirmTyping, setConfirmTyping] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/deleteUser", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type of the request body
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (response.ok) {
        updateUsersList();
        document.getElementById(`delete_${id}`).close();
      } else {
        console.log("Emrror AAA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleTransfer = async () => {
    if (currentOffice === officeId) {
      return;
    } else {
      try {
        const response = await fetch("/api/transferOffice", {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Specify the content type of the request body
          },
          body: JSON.stringify({
            id,
            office: currentOffice,
          }),
        });

        if (response.ok) {
          updateUsersList();
        } else {
          console.log("Emrror AAA");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleUpdatePassword = async () => {
    if (newPass !== confirmNewPass) {
      return;
    } else {
      try {
        const response = await fetch("/api/updatePassword", {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Specify the content type of the request body
          },
          body: JSON.stringify({
            id,
            password: newPass,
          }),
        });

        if (response.ok) {
          updateUsersList();
        } else {
          console.log("Emrror AAA");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <tr>
      <td>{username}</td>
      <td>{office}</td>
      <td className="flex gap-x-2">
        <button
          className="btn btn-primary text-white"
          onClick={() =>
            document.getElementById(`change_office_${id}`).showModal()
          }
        >
          Change Office
        </button>
        <button
          className="btn btn-primary text-white"
          onClick={() =>
            document.getElementById(`change_password_${id}`).showModal()
          }
        >
          Change Password
        </button>
        <button
          className="btn bg-red-500 text-white"
          onClick={() => document.getElementById(`delete_${id}`).showModal()}
        >
          Delete
        </button>
      </td>
      <dialog id={`change_office_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">CHANGE OFFICE</h3>
          <div className="divider"></div>
          <div className="py-4 flex justify-center">
            <select
              value={currentOffice}
              onChange={(e) => setCurrentOffice(e.target.value)}
              className="select select-primary w-full max-w-xs"
            >
              <option value={1}>ASSESSOR</option>
              <option value={2}>BPLS</option>
              <option value={3}>TREASURY</option>
            </select>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-x-5">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => setCurrentOffice(officeId)}
              >
                Close
              </button>
              <button
                className="btn btn-success"
                disabled={officeId === currentOffice}
                onClick={handleTransfer}
              >
                Transfer Office
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id={`change_password_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">CHANGE PASSWORD</h3>
          <div className="divider"></div>
          <div className="py-4">
            <div className="label">
              <span className="label-text text-xl">New Password:</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </label>
            <div className="label">
              <span className="label-text text-xl">Confirm New Password:</span>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                value={confirmNewPass}
                onChange={(e) => setConfirmNewPass(e.target.value)}
              />
            </label>
            {newPass !== confirmNewPass && confirmTyping ? (
              <div className="label">
                <span className="label-text-alt text-red-500">
                  Password Do Not Match
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="modal-action">
            <div className="flex gap-x-5">
              <button
                className="btn"
                onClick={() => {
                  document.getElementById(`change_password_${id}`).close();
                  setNewPass("");
                  setConfirmNewPass("");
                }}
              >
                Close
              </button>
              <button
                disabled={
                  newPass !== confirmNewPass ||
                  newPass === "" ||
                  confirmNewPass === ""
                }
                className="btn btn-success"
                onClick={handleUpdatePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <dialog id={`delete_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">DELETE USER</h3>
          <div className="divider"></div>
          <div className="py-4">
            <h2>Are you sure you want to delete user: {username}?</h2>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-x-5">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
              <button
                className="btn bg-red-500 text-white hover:text-red-500"
                onClick={handleDelete}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </tr>
  );
};

export default EmployeeManagerRow;
