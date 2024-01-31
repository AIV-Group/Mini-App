import React from "react";

const TypingLoading = () => {
  return (
    <div className={`flex items-center gap-1 `}>
      <div className="bg-[#F5F5F5]  h-10 p-2 flex items-center rounded-2xl px-3 rounded-bl-none ">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingLoading;
