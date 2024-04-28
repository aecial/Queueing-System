import React from "react";

const Serving = () => {
  const windows = [1, 2, 3, 4, 5, 6, 7, 8];
  const nowServing = [
    "TED-225",
    "MAU-225",
    "TINY-225",
    "LABANG-225",
    "STAR-225",
  ];
  return (
    <div className="text-white min-w-screen min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl">NOW SERVING</h1>
      <div className="w-96  border border-white">
        <div className="grid grid-cols-2   border border-white gap-2 text-center">
          {windows.map((window) => {
            return <div className="w-full ">{window}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Serving;
