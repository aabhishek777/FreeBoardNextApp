import React from 'react'
import Image from 'next/image'
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Plus} from 'lucide-react'
import {CreateOrganization} from '@clerk/nextjs'
const EmptySearch = () => {
  return (
    <div className=" flex h-full justify-center items-center flex-col">
    <Image
      width={450}
      height={450}
      src="empty-search.svg"
      alt="empty-dashboard"
    />
    <h2 className=" font-semibold  text-2xl mt-6">No search found!</h2>
    <p className=" text-muted-foreground mt-5 mb-5">
      Search for something else.
    </p>
    
    {/* <Dialog >
      <DialogTrigger>
        <Button>
          <Plus className="mr-2"/>
          Add Orginzation
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <CreateOrganization/>
      </DialogContent>
    </Dialog> */}
  </div>
  )
}

export default EmptySearch