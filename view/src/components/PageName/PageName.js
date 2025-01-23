import React from "react";

const PageName = ({name}) =>{
    return(
        <div className="mt-[5%]">
          <div className="w-[300px] h-12 rounded-2xl bg-gray-800/80 ml-20 border-y-4 border-gray-200/40">
            <p className="text-white font-serif text-3xl flex justify-center items-center">
              {name}
            </p>
          </div>
        </div>
    )
}

export default PageName;

