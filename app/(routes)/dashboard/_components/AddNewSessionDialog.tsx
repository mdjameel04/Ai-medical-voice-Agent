"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { doctorAgent } from "./DoctorAgentCard";
import { ArrowRight, Loader2 } from "lucide-react";
import SuggestDoctorCard from "./SuggestDoctorCard";
import { useRouter } from "next/navigation";

function AddNewSessionDialog() {
  const [note, setnote] = useState<string>();
  const [loading, setloading] = useState(false);
  const [suggestedDoctor, setSuggestedDoctor] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const router = useRouter();

  const OnClickNext = async () => {
    setloading(true);
    const result = await axios.post("/api/suggest-doctors", { notes: note });
    setSuggestedDoctor(result.data);
    setloading(false);
  };

  const onStartConsultation = async () => {
    if (!selectedDoctor) return;
    setloading(true);

    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor, // ✅ send lowercase key matching backend
    });

    if (result.data?.SessionId) {
      router.push("/dashboard/medical-agent/" + result.data.SessionId);
    }

    setloading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-3">+ Start a Consultation</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Basic Details</DialogTitle>

            <DialogDescription asChild>
              {!suggestedDoctor ? (
                <div>
                  <h2>Add Symptoms or Any Other Details</h2>
                  <Textarea
                    placeholder="Add Details here..."
                    className="h-[200px]"
                    onChange={(e) => setnote(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <h2>Select the Doctor</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {suggestedDoctor.map((doctor, index) => (
                      <SuggestDoctorCard
                        key={index}
                        doctorAgent={doctor}
                        //@ts-ignore
                        selectedDoctor={selectedDoctor} // ✅ pass correct state
                        setSelectedDoctor={setSelectedDoctor} // ✅ pass setter
                      />
                    ))}
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          {!suggestedDoctor ? (
            <Button disabled={!note || loading} onClick={OnClickNext}>
              Next {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={onStartConsultation}
            >
              Start Consultation
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewSessionDialog;
