"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import axios from 'axios';
import { doctorAgent } from './DoctorAgentCard';
import { ArrowRight,  Loader2 } from 'lucide-react';
import SuggestDoctorCard from './SuggestDoctorCard';
import { useRouter } from 'next/navigation';


function AddNewSessionDialog() {
    const [note, setnote] = useState<string>();
    const [loading, setloading] = useState(false);
  const [suggestedDoctor, setSuggestedDoctor] = useState<doctorAgent[]>();
const [SelectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
const router = useRouter()
    const OnClickNext = async () => {
        setloading(true)
        const result = await axios.post('/api/suggest-doctors', {
            notes: note
        })
    console.log(result.data);
    setSuggestedDoctor(result.data)
    setloading(false)
    }
  
    const onStartConsultation= async()=>{
     
    setloading(true)
        //save all info to database
        const result = await axios.post('/api/session-chat',{
            notes:note,
            SelectedDoctor:SelectedDoctor
        })
        console.log(result.data)
        if(result.data?.sessionId){
            console.log(result.data.sessionId)
            // Route new Conversation Screen 
          router.push('/dashboard/medical-agent/'+result.data.sessionId )   
        }
        setloading(false)
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='mt-3'>+ Start a Consultation </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle> Add Basic Details</DialogTitle>
                        <DialogDescription asChild>
                         { !suggestedDoctor?  <div>
                                <h2> Add Symptons or Any Other Details</h2>
                                <Textarea
                                    placeholder='Add Detail here...'
                                    className='h-[200px]'
                                    onChange={(e) => setnote(e.target.value)}
                                />
                            </div>: 
                            <div>
                                <h2> Select the Doctor</h2>
                            <div className='grid grid-cols-3 gap-3'>
                               {/* suggested Doctors */}
                            {suggestedDoctor.map((doctor,index)=>(
                <SuggestDoctorCard doctorAgent={doctor} key={index}
                setSelectedDoctor={()=>setSelectedDoctor(doctor)}
                //@ts-ignore
                SelectedDoctor={setSelectedDoctor}/>
                            ))}
                                </div>
                                </div>}
                        </DialogDescription>
                    </DialogHeader>

                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>

                 {!suggestedDoctor?   <Button disabled={!note || loading} onClick={() => OnClickNext()}>

                        Next{loading ?<Loader2 className='animate-spin'/> : <ArrowRight/>} </Button>
                    :<Button disabled={loading || !SelectedDoctor}   onClick={()=>onStartConsultation()}> Start Consultation</Button>}
                    {loading ?<Loader2 className='animate-spin'/> : <ArrowRight/>}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewSessionDialog
