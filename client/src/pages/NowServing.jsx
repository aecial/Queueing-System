import React from "react";
import ServingCard from "../components/ServingCard";

const NowServing = () => {
  const windows = [
    { id: 1, ticket: "TED-225" },
    { id: 2, ticket: "MAU-225" },
    { id: 3, ticket: "TINY-225" },
    { id: 4, ticket: "LABANG-225" },
    { id: 5, ticket: "STAR-225" },
    { id: 6, ticket: "TED-225" },
    { id: 7, ticket: "MAU-225" },
    { id: 8, ticket: "TINY-225" },
    { id: 9, ticket: "LABANG-225" },
    { id: 10, ticket: "STAR-225" },
    { id: 11, ticket: "TED-225" },
    { id: 12, ticket: "MAU-225" },
    { id: 13, ticket: "TINY-225" },
    { id: 14, ticket: "LABANG-225" },
    { id: 15, ticket: "STAR-225" },
    { id: 16, ticket: "TED-225" },
    { id: 17, ticket: "MAU-225" },
    { id: 18, ticket: "TINY-225" },
    { id: 19, ticket: "LABANG-225" },
    { id: 20, ticket: "STAR-225" },
    { id: 21, ticket: "STAR-225" },
  ];

  // Split the windows array into two arrays, each containing half of the windows
  const halfLength = Math.ceil(windows.length / 2);
  console.log(halfLength);
  const firstColumn = windows.slice(0, halfLength);
  console.log(firstColumn);
  const secondColumn = windows.slice(halfLength);
  console.log(secondColumn);

  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl">NOW SERVING</h1>
      <div className="w-[80%] max-h-screen">
        <div className="grid grid-cols-2 w-auto border gap-2 text-center">
          <div>
            {firstColumn.map((window) => (
              <ServingCard
                key={window.id}
                winNum={window.id}
                ticket={window.ticket}
              />
            ))}
          </div>
          <div>
            {secondColumn.map((window) => (
              <ServingCard
                key={window.id}
                winNum={window.id}
                ticket={window.ticket}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowServing;
