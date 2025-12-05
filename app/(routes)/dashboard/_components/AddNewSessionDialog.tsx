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

function AddNewSessionDialog() {
    const [note, setnote] = useState<string>();
    const [loading, setloading] = useState(false);

    const OnClickNext = async () => {
        setloading(true)
        const result = await axios.post('/api/suggest-doctors', {
            notes: note
        })
    console.log(result.data);
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
                            <div>
                                <h2> Add Symptons or Any Other Details</h2>
                                <Textarea
                                    placeholder='Add Detail here...'
                                    className='h-[200px]'
                                    onChange={(e) => setnote(e.target.value)}
                                />
                            </div>
                        </DialogDescription>
                    </DialogHeader>

                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>

                    <Button disabled={!note} onClick={() => OnClickNext()}>Next</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewSessionDialog
