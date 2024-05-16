import React, { useState } from "react";

const WindowManagerRow = ({ id, name, description, updateWindows }) => {
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);
  const cancel = () => {
    setEditedName(name);
    setEditedDescription(description);
    document.getElementById(`my_modal_${id}`).close();
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/editWindow", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type of the request body
        },
        body: JSON.stringify({
          id,
          name: editedName,
          description: editedDescription,
        }),
      });

      if (response.ok) {
        updateWindows();
        document.getElementById(`my_modal_${id}`).close();
      } else {
        console.log("Emrror AAA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/deleteWindow", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the content type of the request body
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (response.ok) {
        updateWindows();
        document.getElementById(`delete_modal_${id}`).close();
      } else {
        console.log("Emrror AAA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <th>{name}</th>
      <td>{description}</td>
      <td>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-primary text-white w-20"
          onClick={() => document.getElementById(`my_modal_${id}`).showModal()}
        >
          Edit
        </button>
        <dialog id={`my_modal_${id}`} className="modal">
          <div className="modal-box text-xl">
            <h3 className="font-bold text-3xl">Edit Window {name}</h3>
            <form onSubmit={handleEditSubmit}>
              <div>
                <input type="hidden" name="window_id" value={id} />
                <div className="label">
                  <span className="label-text text-xl">Window Name: </span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  name="window_name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div>
                <div className="label">
                  <span className="label-text text-xl">Window Name: </span>
                </div>
                <input
                  type="text"
                  name="window_description"
                  className="input input-bordered w-full max-w-xs"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
              <div className="divider"></div>
              <div className="flex w-full justify-between">
                <button className="btn" type="button" onClick={cancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </td>
      <td>
        <button
          className="btn bg-red-500 text-white"
          onClick={() =>
            document.getElementById(`delete_modal_${id}`).showModal()
          }
        >
          Delete
        </button>
        <dialog id={`delete_modal_${id}`} className="modal">
          <div className="modal-box text-xl">
            <h3 className="font-bold text-3xl text-red-500">
              Delete Window {name}
            </h3>
            <div className="divider"></div>
            <form onSubmit={handleDeleteSubmit}>
              <div>
                <h2 className="text-2xl mt-4 p-2">
                  Are You Sure you want to Remove Window {name}?
                </h2>
              </div>
              <div className="divider"></div>
              <div className="flex w-full justify-between">
                <button
                  className="btn"
                  type="button"
                  onClick={() =>
                    document.getElementById(`delete_modal_${id}`).close()
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-red-500 text-white hover:bg-red-700 w-20"
                >
                  Delete Window {name}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </td>
    </tr>
  );
};

export default WindowManagerRow;
