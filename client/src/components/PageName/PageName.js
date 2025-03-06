import React from "react";

const PageName = ({name}) =>{
    return(
        <div className="mt-[5%] flex lg:justify-start justify-center">
          <div className="w-[300px] h-12 rounded-2xl bg-gray-800/80 lg:ml-20 border-y-4 justify-center  border-gray-200/40">
            <p className="text-white font-serif text-3xl flex justify-center items-center">
              {name}
            </p>
          </div>
        </div>
    )
}

export default PageName;

