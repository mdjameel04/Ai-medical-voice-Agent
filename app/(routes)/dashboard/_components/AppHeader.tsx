import { UserButton } from '@clerk/nextjs'
import { div } from 'motion/react-client'
import Image from 'next/image'
import React from 'react'

function AppHeader() {

const menuOption =[
    {
        id:1,
        name : "Home",
        path : "/home"
    },
    {
        id:1,
        name : "History",
        path : "/history"
    },
    {
        id:1,
        name : "Pricing",
        path : "/pricing"
    },
    {
        id:1,
        name : "Profile",
        path : "/profile"
    },
]

  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40  ' >
      <Image src={'/logo.png'} alt='logo' width={180} height={90}/>
      <div className='hidden md:flex items-center gap-12'>
  {menuOption.map((option, index)=>(
    <div key={index} >
   <h2 className="hover:font-bold cursor-pointer" >{option.name} </h2>
    </div>
  ))}
  </div>
  <UserButton/>
    </div>
  )
}

export default AppHeader
