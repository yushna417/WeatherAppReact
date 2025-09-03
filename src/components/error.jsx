import { Icon } from "@iconify/react";
import Icons from "../assets/chartplotter.png"

export  function Page({message}) {
  return (
    <div className='min-h-[90vh]  w-full grid place-items-center'>
        <div className='h-72 lg:w-2/5 w-4/5 mx-auto bg-white/60 flex flex-col justify-evenly items-center rounded-2xl lg:p-0 p-5'>
            <img src={Icons} alt="Sunset" className="lg:w-40 w-30 lg:h-40 h-30  " />
            <p className='lg:text-2xl text-xl font-sans font-semibold text-center'>{message}</p>
        </div>
    </div>
  )
}
