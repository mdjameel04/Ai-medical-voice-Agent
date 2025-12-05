import { NextRequest, NextResponse } from "next/server";
import {openai} from '@/config/OpenAiModel'
import { AIDoctorAgents } from "@/shared/list";

export async function POST(req: NextRequest) {
  const {notes} =await req.json()
    try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite-preview-09-2025", // VALID MODEL NAME
      messages: [
        {role:"system", content: JSON.stringify(AIDoctorAgents) },
        {role: "user",content: "User Notes/Symptons:"+notes+", Depends on user notes and symptons, please suggest list of doctors, return object in json only  " },
      ],
    });
    const rawResp=completion.choices[0].message
    //@ts-ignore
     const resp = rawResp.content.trim().replace('```json','').replace('```','')
     const JSONRes=JSON.parse(resp)
    return NextResponse.json(JSONRes)
    } catch (e) {
      return NextResponse.json(e)      
    }
}