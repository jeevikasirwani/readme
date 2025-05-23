import React from "react";
import "tailwindcss";
function Quote() {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className=" mb-7 max-w-md text-center text-2xl font-bold">
        "The customer support i received was exceptional.The support team went
        above and beyond to address my concerns."
      </div>
      <div className="ml-20 max-w-md font-semibold text-xl ">
        julie winfield
      </div>
      <div className=" ml-20 max-w-md text-sm font-light text-slate-500">
        CEO | Acme Corp
      </div>
    </div>
  );
}

export default Quote;
