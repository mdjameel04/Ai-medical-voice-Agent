import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'

const Dashboard = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
         <h2 className='font-bold text-2xl'> My Dashboard</h2>
         <Button> + Consult with Doctors</Button>
      </div>
      <HistoryList/>
    </div>
  )
}

export default Dashboard