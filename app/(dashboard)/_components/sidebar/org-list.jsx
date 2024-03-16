import { useOrganizationList } from "@clerk/clerk-react";

import React from "react";
 
const JoinedOrganizationList = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!isLoaded) {
    return <>Loading</>;
  }
 
  return (
	  <>
		  
		
     {isLoaded&& <ul>
			  {userMemberships.data?.map((mem) => (
			
          <li key={mem.id} className=" ">
            <div  className="bg-black  rounded flex justify-center mt-3 p-2">{mem?.publicUserData?.firstName}</div>
          </li>
        ))}
      </ul>}
    </>
  );
};
 
export default JoinedOrganizationList;