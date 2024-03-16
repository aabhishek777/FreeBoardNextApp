import {UserButton} from "@clerk/nextjs";

const page = () => {
  return (
    <>
      

      <div className=" p-3 mt-3 flex sm:justify-evenly  justify-end">
        <div className=" sm:h-10 sm:flex  sm:w-[80%] ">
          <input style={{border:"2px solid black"}} className="w-full p-3 rounded h-full" type="text" />
        </div>
  
          <div className="">
            <UserProfile />
          </div>
      </div>

      hi
    </>
  );
};

export default page;

const UserProfile = () => <UserButton />;
