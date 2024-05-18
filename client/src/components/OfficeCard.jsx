import React from "react";
import ServingCard from "../components/ServingCard";
const OfficeCard = ({ data }) => {
  return (
    <div key={data.id} className="border border-yellow-500 p-2 w-[450px]">
      <h1 className="text-4xl">{data.name}</h1>
      <div className="divider"></div>
      {data.department.map((window) => {
        return <ServingCard winNum={window.name} ticket={window.now_serving} />;
      })}
    </div>
  );
};

export default OfficeCard;
