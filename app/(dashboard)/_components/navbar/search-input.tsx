"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts"; 
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

 const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 500); 
  
  useEffect(() => {
  
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { search: debouncedValue },
      },
      { skipEmptyString: true, skipNull: true }
    );

    if (debouncedValue) { 
      router.push(url);
    }
  }, [debouncedValue, router]);

  return (
    <div className="w-full rounded relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className=" w-full pl-9"
        placeholder="Search boards"
        onChange={(event) => setValue(event.target.value)}
        type="text"
        value={value} 
      />
    </div>
  );
};


 export default  SearchInput;