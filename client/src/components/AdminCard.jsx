import React from "react";

const AdminCard = ({ title, onClick, src }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-md shadow-white">
      <figure className="w-[300px] h-[300px] mx-auto">
        <img src={"/adminImages/" + src} alt="pic" />
      </figure>
      <div className="card-body">
        <div className="card-actions justify-center">
          <button
            onClick={onClick}
            className="btn btn-primary text-white text-xl w-56"
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
