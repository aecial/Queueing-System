import React from "react";

const AddDepartment = () => {
  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Department Name</span>
        </div>
        <form action="/api/addDepartment" method="post">
          <input
            type="text"
            placeholder="Type here"
            name="name"
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary mt-4 w-full">
            Add
          </button>
        </form>
      </label>
    </div>
  );
};

export default AddDepartment;
