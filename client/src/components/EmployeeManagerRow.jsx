import React from "react";

const EmployeeManagerRow = ({ id, username, office }) => {
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
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id={`change_password_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">CHANGE PASSWORD</h3>
          <div className="divider"></div>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id={`delete_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">DELETE USER</h3>
          <div className="divider"></div>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </tr>
  );
};

export default EmployeeManagerRow;
