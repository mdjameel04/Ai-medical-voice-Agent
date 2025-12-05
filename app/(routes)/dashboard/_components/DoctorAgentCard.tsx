import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { IconArrowRight } from "@tabler/icons-react";
import React from 'react'

export type doctorAgent = {
  id: number,
  specialist: string,
  description: string,
  image: string,
  agentPrompt: string,
}

type props = {
  doctorAgent: doctorAgent
}

function DoctorAgentCard({ doctorAgent }: props) {
  return (
    <div className="bg-white p-3 rounded-xl shadow flex flex-col gap-3 h-full">
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={300}
        height={300}
        className="w-full h-[220px] object-cover rounded-xl"
      />

      <div>
        <h2 className="font-bold text-lg">{doctorAgent.specialist}</h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {doctorAgent.description}
        </p>
      </div>

      <Button className="mt-auto w-full flex items-center justify-between">
        Start Consultation
        <IconArrowRight size={20} />
      </Button>
    </div>
  )
}

export default DoctorAgentCard
