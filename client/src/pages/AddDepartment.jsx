import React from "react";

const AddDepartment = () => {
  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center text-4xl">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-4xl">Window Number</span>
        </div>
        <form action="/api/addDepartment" method="post">
          <input
            type="number"
            placeholder="ex. 1"
            name="name"
            min={1}
            className="input input-bordered w-full max-w-xs text-3xl"
          />
          <div className="label mt-5">
            <span className="label-text text-4xl">Window Service</span>
          </div>
          <input
            type="text"
            placeholder="ex. Business Requirements"
            name="description"
            className="input input-bordered w-full max-w-xs text-3xl"
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
