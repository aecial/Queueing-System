import React from "react";

const AdminCard = ({ title, onClick }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-lg shadow-white">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <div className="card-actions justify-center">
          <button
            onClick={onClick}
            className="btn btn-primary text-white text-2xl w-72"
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
