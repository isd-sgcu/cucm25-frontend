import { useState } from 'react'
import ExportTicketHeader from '@/components/superadmin/ExportTicketHeader'
import ExportTicketForm from '@/components/superadmin/ExportTicketForm'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/th'
import dayjs from 'dayjs'

function SuperAdminExportTicket() {
  const now = dayjs()
  const [data, setData] = useState({
    startDate: now,
    startTime: now,
    endDate: now,
    endTime: now,
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='th'>
      <div className='flex flex-col gap-6'>
        <ExportTicketHeader />
        <ExportTicketForm data={data} setData={setData} />
      </div>
    </LocalizationProvider>
  )
}

export default SuperAdminExportTicket
