import React from "react";
import NewButton from './new-button'


const Sidebar = () => {
  return (
    <aside className="fixed pt-5 left-0 bg-blue-950 h-full w-[100px] flex p-3 flex-col gap-y-4 text-white items-center">
		  <NewButton />
    </aside>
  );
};

export default Sidebar;
