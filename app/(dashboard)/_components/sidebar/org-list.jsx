import {useOrganizationList} from "@clerk/clerk-react";

import React from "react";
import {Item} from "./item";
import {Hint} from "@/components/hint";

const JoinedOrganizationList = () => {
  const {isLoaded, setActive, userMemberships} = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!isLoaded) {
    return <>Loading</>;
  }

  return (
    <>
      {isLoaded && (
        <ul>
          {userMemberships.data?.map((mem) => (
            <li key={mem.id} className="  ">
              <Hint
                label={mem?.organization?.name}
                side="right"
                align="center"
                sideOffset={5}
              >
                <div style={{padding: ".4rem"}} className="">
                  <Item
                    key={mem?.organization?.id}
                    id={mem?.organization?.id}
                    name={mem?.organization?.name}
                    imageUrl={mem?.organization?.imageUrl}
                  />
                </div>
              </Hint>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default JoinedOrganizationList;
