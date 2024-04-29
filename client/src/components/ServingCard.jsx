import React from "react";

const ServingCard = ({ winNum, ticket }) => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="bg-success p-4 w-1/2 border-b-2 border-black">
        Window {winNum}
      </div>{" "}
      <div className="bg-accent p-4 w-1/2 border-b-2 border-black">
        {ticket ?? <span className="invisible">0</span>}
      </div>
    </div>
  );
};

export default ServingCard;
