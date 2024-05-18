import React from "react";

const ServingCard = ({ winNum, ticket }) => {
  return (
    <div className="flex w-full justify-center items-center text-3xl">
      <div className="bg-success p-4 w-1/2 border-b-2 border-black">
        Window {winNum}
      </div>{" "}
      <div className="bg-accent p-4 w-1/2 border-b-2 border-black text-black">
        {ticket == null || ticket === undefined || ticket === "" ? (
          <span className="invisible">0</span>
        ) : (
          <span>{ticket}</span>
        )}
      </div>
    </div>
  );
};

export default ServingCard;
