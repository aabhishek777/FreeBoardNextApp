"use client";

import Navbar from "./_components/navbar/navbar";
import Image from "next/image";
import EmptyDashboard from "./_components/empty-dashboard";
import {useOrganization} from "@clerk/nextjs";
import BoardList from "./_components/bord-list";
import {useParams} from "next/navigation";


interface DashbordPageProps{

  searchParams:{
  
    search?: string,
    favorite?:string
  }
}
const page = ({searchParams}:DashbordPageProps) => {
  const {organization}=useOrganization();
  return (
    <>
      <Navbar />

      <div className="h-[calc(100%-80px)]  p-6 flex-1 ">
        {
          !organization? <div className="h-full"><EmptyDashboard /></div>:
            
            <div className="h-full"><BoardList query={searchParams} orgId={organization.id } /></div>
        }
      </div>
    </>
  );
};

export default page;
