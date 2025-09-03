
import Weatherlogo from "../assets/weather.png"
import { Icon } from "@iconify/react";
import { useState } from "react";

export function NavbarComponent({setCity}) {
  const [input, setInput] = useState("")

   const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setCity(input.trim()); 
      setInput("");         
    }
  };

  return (
    <header  className="min-w-screen lg:px-10 px-3 h-16 flex items-center justify-between border-b bg-slate-200 border-b-slate-300" >
      <div className="flex">
        <img src={Weatherlogo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap lg:text-xl text-base font-semibold text-slate-600 ">Weather App</span>
      </div>
  
      <form onSubmit={handleSubmit} className="flex items-center md:w-1/3 w-1/2 ">   
          <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Icon icon="heroicons:adjustments-vertical-20-solid" width="20" height="20" color="#99a1af " />
              </div>
              <input value={input} onChange={(e) => setInput(e.target.value)}
              type="text"  className=" text-sm rounded-lg focus:ring-0 w-full ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 dark:text-white" placeholder="Search place name..." required />
          </div>
          <button type="submit"  className="p-2 ms-2 text-sm font-medium text-white rounded-lg bg-black">
              <Icon icon="hugeicons:search-area"   width="26" height="26"  />
          </button>
      </form>

    </header> 
  );
}
