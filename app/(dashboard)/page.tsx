"use client";

import Navbar from "./_components/navbar/navbar";
import Image from "next/image";
import EmptyDashboard from "./_components/empty-dashboard";
import {useOrganization} from "@clerk/nextjs";
const page = () => {
  const {organization} = useOrganization();
  return (
    <>
      <Navbar />

      <div className="h-[calc(100%-80px)] rounded  p-6 flex-1 ">
        {
          !organization? <EmptyDashboard />:
            
            <div>hi
            </div>
        }
      </div>
    </>
  );
};

export default page;
