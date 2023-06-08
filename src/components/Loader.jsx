import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0">
      <div className="w-full h-full flex flex-col justify-center items-center bg-white bg-opacity-50 gap-2 sm:gap-3">
        <span className="animate-ping h-5 w-5 rounded-full bg-slate-300 opacity-75"></span>
        <div className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-300">
          LOADING
        </div>
      </div>
    </div>
  );
};

export default Loader;
