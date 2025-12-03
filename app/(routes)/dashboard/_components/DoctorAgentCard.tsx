import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { IconArrowRight } from "@tabler/icons-react";
import React from 'react'

type doctorAgent={
   id: number,
   specialist:string,
   description:string,
   image: string,
   agentPrompt:string, 
   
}
type props ={
    doctorAgent: doctorAgent
}

function DoctorAgentCard({doctorAgent}:props) {
  return (
    <div  >
    <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={300} className='w-full h-[250px] object-cover rounded-xl'/>
 <h2 className='font-bold text-lg'>{doctorAgent.specialist} </h2>
 <p className='line-clamp-2 mt-1 text-sm text-gray-500'>{doctorAgent.description} </p>
 <Button> Start Consulatation <IconArrowRight/> </Button>
    </div>
  )
}

export default DoctorAgentCard
